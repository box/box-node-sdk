/**
 * @fileoverview Event stream backed by the events API
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var Readable = require('stream').Readable,
	qs = require('querystring'),
	util = require('util'),
	Promise = require('bluebird');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

const DEFAULT_OPTIONS = Object.freeze({
	deduplicationFilterSize: 5000,
	retryDelay: 1000,
	fetchInterval: 1000
});

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Stream of Box events from a given client and point in time.
 * @param {BoxClient} client The client to use to get events
 * @param {string} streamPosition The point in time to start at
 * @param {Object} [options] Optional parameters
 * @param {int} [options.retryDelay=1000] Number of ms to wait before retrying after an error
 * @param {int} [options.deduplicationFilterSize=5000] Number of IDs to track for deduplication
 * @param {int} [options.fetchInterval=1000] Minimunm number of ms between calls for more events
 * @constructor
 * @extends Readable
 */
function EventStream(client, streamPosition, options) {

	Readable.call(this, {
		objectMode: true
	});

	/**
	 * @var {BoxClient} The client for making API calls
	 * @private
	 */
	this._client = client;

	/**
	 * @var {string} The latest stream position
	 * @private
	 */
	this._streamPosition = streamPosition;

	/**
	 * @var {?Object} The information for how to long poll
	 * @private
	 */
	this._longPollInfo = null;

	/**
	 * @var {int} The number of long poll requests we've made against one URL so far
	 * @private
	 */
	this._longPollRetries = 0;

	/**
	 * @var {Object.<string, boolean>} Hash of event IDs we've already pushed
	 * @private
	 */
	this._dedupHash = {};

	/**
	 * Rate limiting promise to ensure that events are not fetched too often,
	 * initially resolved to allow an immediate API call.
	 * @var {Promise}
	 * @private
	 */
	this._rateLimiter = Promise.resolve();

	this._options = Object.assign({}, DEFAULT_OPTIONS, options);
}

util.inherits(EventStream, Readable);

/**
 * Retrieve the url and params for long polling for new updates
 * @returns {Promise} Promise for testing purposes
 * @private
 */
EventStream.prototype.getLongPollInfo = function() {

	return this._client.events.getLongPollInfo()
		.then(longPollInfo => {

			// On getting new long poll info, reset everything
			this._longPollInfo = longPollInfo;
			this._longPollRetries = 0;

			this.doLongPoll();
		})
		.catch(err => {
			this.emit('error', err);

			// Only retry on resolvable errors
			if (!err.authExpired) {
				setTimeout(() => this.getLongPollInfo(), this._options.retryDelay);
			}
		});
};

/**
 * Long poll for notification of new events.	We do this rather than
 * polling for the events directly in order to minimize the number of API
 * calls necessary.
 * @returns {Promise} Promise for testing pruposes
 * @private
 */
EventStream.prototype.doLongPoll = function() {

	// If we're over the max number of retries, reset
	if (this._longPollRetries > this._longPollInfo.max_retries) {
		return this.getLongPollInfo();
	}

	var url = this._longPollInfo.url,
		qsDelim = url.indexOf('?'),
		query = {};

	// Break out the query params, otherwise the request URL gets messed up
	if (qsDelim > 0) {
		query = qs.parse(url.substr(qsDelim + 1));
		url = url.substr(0, qsDelim);
	}

	query.stream_position = this._streamPosition;

	var options = {
		qs: query,
		timeout: this._longPollInfo.retry_timeout * 1000
	};

	this._longPollRetries += 1;
	return this._client.wrapWithDefaultHandler(this._client.get)(url, options)
		.then(data => {

			if (data.message === 'reconnect') {
				this.getLongPollInfo();
				return;
			}

			// We don't expect any messages other than reconnect and new_change, so if
			// we get one just retry the long poll
			if (data.message !== 'new_change') {
				this.doLongPoll();
				return;
			}

			this.fetchEvents();
		})
		.catch(() => {
			setTimeout(() => this.getLongPollInfo(), this._options.retryDelay);
		});
};

/**
 * Fetch the latest group of events and push them into the stream
 * @returns {Promise} Promise for testing purposes
 * @private
 */
EventStream.prototype.fetchEvents = function() {

	var eventParams = {
		stream_position: this._streamPosition,
		limit: 500
	};

	// Get new events after the rate limiter expires
	return this._rateLimiter.then(() => this._client.events.get(eventParams)
			.then(events => {

				// Reset the rate limiter
				this._rateLimiter = Promise.delay(this._options.fetchInterval);

				// If the response wasn't what we expected, re-poll
				if (!events.entries || !events.next_stream_position) {
					this.doLongPoll();
					return;
				}

				this._streamPosition = events.next_stream_position;

				// De-duplicate the fetched events, since the API often returns
				// the same events at multiple subsequent stream positions
				var newEvents = events.entries.filter(event => !this._dedupHash[event.event_id]);

				// If there aren't any non-duplicate events, go back to polling
				if (!newEvents.length) {
					this.doLongPoll();
					return;
				}

				// Pause the stream to avoid race conditions while pushing in the new events.
				// Without this, _read() would be called again from inside each push(),
				// resulting in multiple parallel calls to fetchEvents().
				// See https://github.com/nodejs/node/issues/3203
				var wasPaused = this.isPaused();
				this.pause();

				// Push new events into the stream
				newEvents.forEach(event => {
					this._dedupHash[event.event_id] = true;
					this.push(event);
				});

				if (!wasPaused) {
					// This will deliver the events and trigger the next call to _read() once they have been consumed.
					this.resume();
				}

				// Once the deduplication filter gets too big, clean it up
				if (Object.keys(this._dedupHash).length >= this._options.deduplicationFilterSize) {
					this.cleanupDedupFilter(events.entries);
				}
			})
			.catch(err => {

				this.emit('error', err);
				setTimeout(() => this.getLongPollInfo(), this._options.retryDelay);
			})
	);
};

/**
 * Clean up the deduplication filter, to prevent it from growing
 * too big and eating up memory.	We look at the latest set of events
 * returned and assume that any IDs not in that set don't need to be
 * tracked for deduplication any more.
 * @param {Object[]} latestEvents The latest events from the API
 * @returns {void}
 * @private
 */
EventStream.prototype.cleanupDedupFilter = function(latestEvents) {

	var dedupIDs = Object.keys(this._dedupHash);

	dedupIDs.forEach(eventID => {

		var isEventCleared = !latestEvents.find(e => e.event_id === eventID);
		if (isEventCleared) {
			delete this._dedupHash[eventID];
		}
	});
};

/**
 * Implementation of the stream-internal read function.	This is called
 * by the stream whenever it needs more data, and will not be called again
 * until data is pushed into the stream.
 * @returns {void}
 * @private
 */
EventStream.prototype._read = function() {

	// Start the process of getting new events
	this.getLongPollInfo();
};

module.exports = EventStream;

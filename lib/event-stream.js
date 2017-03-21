/**
 * @fileoverview Event stream backed by the events API
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var Readable = require('stream').Readable,
	qs = require('querystring'),
	util = require('util');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

/** @const {int} The number of ms to wait before retrying after an error */
var RETRY_DELAY = 1000;

/** @const {int} Max number of IDs to track for deduplication before cleaning */
var MAX_DEDUP_SIZE = 5000;

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Stream of Box events from a given client and point in time.
 * @param {BoxClient} client The client to use to get events
 * @param {string} streamPosition The point in time to start at
 * @constructor
 * @extends Readable
 */
function EventStream(client, streamPosition) {

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
}

util.inherits(EventStream, Readable);

/**
 * Retrieve the url and params for long polling for new updates
 * @returns {void}
 * @private
 */
EventStream.prototype.getLongPollInfo = function() {

	var self = this;
	this._client.events.getLongPollInfo(function(err, longPollInfo) {

		if (err) {
			self.emit('error', err);

			// Only retry on resolvable errors
			if (!err.authExpired) {
				setTimeout(function() {
					self.getLongPollInfo();
				}, RETRY_DELAY);
			}

			return;
		}

		// On getting new long poll info, reset everything
		self._longPollInfo = longPollInfo;
		self._longPollRetries = 0;

		self.doLongPoll();
	});
};

/**
 * Long poll for notification of new events.	We do this rather than
 * polling for the events directly in order to minimize the number of API
 * calls necessary.
 * @returns {void}
 * @private
 */
EventStream.prototype.doLongPoll = function() {

	var self = this;

	// If we're over the max number of retries, reset
	if (this._longPollRetries > this._longPollInfo.max_retries) {
		this.getLongPollInfo();
		return;
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
	this._client.get(url, options, this._client.defaultResponseHandler(function(err, data) {

		if (err) {
			setTimeout(function() {
				self.getLongPollInfo();
			}, RETRY_DELAY);
			return;
		}

		if (data.message === 'reconnect') {
			self.getLongPollInfo();
			return;
		}

		// We don't expect any messages other than reconnect and new_change, so if
		// we get one just retry the long poll
		if (data.message !== 'new_change') {
			self.doLongPoll();
			return;
		}

		self.fetchEvents();
	}));
};

/**
 * Fetch the latest group of events and push them into the stream
 * @returns {void}
 * @private
 */
EventStream.prototype.fetchEvents = function() {

	var self = this,
		eventParams = {
			stream_position: this._streamPosition
		};

	this._client.events.get(eventParams, function(err, events) {

		if (err) {
			self.emit('error', err);
			setTimeout(function() {
				self.getLongPollInfo();
			}, RETRY_DELAY);
			return;
		}

		// If the response wasn't what we expected, re-poll
		if (!events.entries || !events.next_stream_position) {
			self.doLongPoll();
			return;
		}

		self._streamPosition = events.next_stream_position;

		// De-duplicate the fetched events, since the API often returns
		// the same events at multiple subsequent stream positions
		var newEvents = events.entries.filter(function(event) {
			return !self._dedupHash[event.event_id];
		});

		// If there aren't any non-duplicate events, go back to polling
		if (!newEvents.length) {
			self.doLongPoll();
			return;
		}

		// Push new events into the stream
		newEvents.forEach(function(event) {
			self._dedupHash[event.event_id] = true;
			self.push(event);
		});

		// Once the deduplication filter gets too big, clean it up
		if (Object.keys(self._dedupHash).length >= MAX_DEDUP_SIZE) {
			self.cleanupDedupFilter(events.entries);
		}
	});
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

	var self = this,
		dedupIDs = Object.keys(this._dedupHash);

	dedupIDs.forEach(function(eventID) {

		var isEventCleared = !latestEvents.find(function(e) {
			return e.event_id === eventID;
		});
		if (isEventCleared) {
			delete self._dedupHash[eventID];
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

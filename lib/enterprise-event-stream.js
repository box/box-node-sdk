/**
 * @fileoverview Enterprise event stream backed by the enterprise events API
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const Readable = require('stream').Readable,
	util = require('util');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

/** @const {int} The default polling interval (in seconds) */
const DEFAULT_POLLING_INTERVAL = 60;

/** @const {int} The default number of events to fetch in each poll */
const DEFAULT_CHUNK_SIZE = 500;

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Stream of Box enterprise events.
 *
 * By default, the stream starts from the current time.
 * Pass 'startDate' to start from a specific time.
 * Pass 'streamPosition' to start from a previous stream position, or '0' for all available past events (~1 year).
 * If pollingInterval = 0, then the stream will end when all available events have been delivered (no polling).
 *
 * @param {BoxClient} client - The client to use to get events
 * @param {Object} options - Options
 * @param {string} [options.streamPosition] - The stream position to start from (pass '0' for all past events)
 * @param {Date} [options.startDate] - The Date to start from
 * @param {Date} [options.endDate] - The Date to end at
 * @param {EnterpriseEventType[]} [options.eventTypeFilterArray] - Array of event types to return
 * @param {int} [options.pollingInterval=60] - Polling interval (in seconds).  Pass 0 for no polling.
 * @param {int} [options.chunkSize=500] - Number of events to fetch per call (max = 500)
 * @constructor
 * @extends Readable
 */
function EnterpriseEventStream(client, options) {

	Readable.call(this, {
		objectMode: true
	});

	/**
	 * @var {BoxClient} - The client for making API calls
	 * @private
	 */
	this._client = client;

	/**
	 * @var {Object} - Options
	 * @private
	 */
	this._options = Object.assign({}, options);

	// Handle the case where the caller passes streamPosition = 0 instead of streamPosition = '0'.
	if (!this._options.startDate && !this._options.streamPosition && this._options.streamPosition !== 0) {
		// If neither startDate nor streamPosition is specified, start from the current time.
		this._options.startDate = new Date();
	}

	if (!this._options.pollingInterval && this._options.pollingInterval !== 0) {
		this._options.pollingInterval = DEFAULT_POLLING_INTERVAL;
	}

	if (!this._options.chunkSize) {
		this._options.chunkSize = DEFAULT_CHUNK_SIZE;
	}

	/**
	 * @var {?string} - The current stream position
	 * @private
	 */
	this._streamPosition = this._options.streamPosition;

	/**
	 * @var {Object[]} - Received events
	 * @private
	 */
	this._eventBuffer = [];
}

util.inherits(EnterpriseEventStream, Readable);

/**
 * @returns {?string} - Returns null if no events have been fetched from Box yet.
 */
EnterpriseEventStream.prototype.getStreamPosition = function() {
	return this._streamPosition;
};

/**
 * Fetch the next chunk of events
 *
 * If there are no events, poll until events are available.
 * If an error occurs, emit the error but continuing polling as usual.
 * @param {Function} callback - Passed the array of events
 * @returns {void}
 * @private
 */
EnterpriseEventStream.prototype.fetchEvents = function(callback) {
	const self = this,
		options = {};

	// Use the current stream position.
	// Handle the case where the caller passes streamPosition === 0 instead of streamPosition === '0'.
	if (this._streamPosition || this._streamPosition === 0) {
		options.streamPosition = this._streamPosition;
	}

	if (this._options.startDate) {
		options.createdAfterDate = this._options.startDate;
	}

	if (this._options.endDate) {
		options.createdBeforeDate = this._options.endDate;
	}

	if (this._options.eventTypeFilterArray) {
		options.eventTypeFilterArray = this._options.eventTypeFilterArray;
	}

	if (this._options.chunkSize) {
		options.limit = this._options.chunkSize;
	}

	this._client.enterpriseEvents.get(options, function(err, result) {
		if (err) {
			self.emit('error', err);
			// If there was a "permanent" error, we would call the callback with it here.
			// But it's not clear which errors are truly permanent?
			// If Box is down or returning errors for an extended period, we still want to resume when it recovers.
			// So, continue polling at the regular frequency.
			// Don't use a shorter retry interval (to avoid DDOSing Box).
		} else if (result && result.entries) {
			// console.log(`Fetched events from ${options.streamPosition || options.createdAfterDate} (limit ${options.limit}) => ${result.entries.length} events (next ${result.next_stream_position})`);

			if (result.entries.length > 0) {
			// Only update the stream position if there were events returned.
			// The API currently returns next_stream_position = 0 if there are no events (maybe a bug?).
			// But we don't want to start over at the beginning in that case, so ignore it.
				self._streamPosition = result.next_stream_position;

				callback(null, result.entries);
				return;
			}
		}

		if (self._options.pollingInterval === 0) {
		// If polling is disabled, signal the end of the stream.
			callback();
			return;
		}

	// There were no events returned (or an error occurred), so schedule another poll.
		setTimeout(function() {
			self.fetchEvents(callback);
		}, self._options.pollingInterval * 1000);
	});
};

/**
 * Implementation of the stream-internal read function.	This is called
 * by the stream whenever it needs more data, and will not be called again
 * until data is pushed into the stream.
 * @returns {void}
 * @private
 */
EnterpriseEventStream.prototype._read = function() {
	if (this._eventBuffer.length > 0) {
		// If we already have events, push one into the stream.
		this.push(this._eventBuffer.shift());
	} else {
		// Otherwise, fetch the next chunk of events.
		const self = this;

		// This will poll forever until events are available.
		this.fetchEvents(function(err, events) {
			if (err || !events || events.length === 0) {
				// Close the stream if there was a "permanent" failure or we reached the end of the events.
				self.push(null);
				return;
			}

			self._eventBuffer = events;

		// Push the first event into the stream, which will cause _read() to get called again.
		// Note that if the stream has a 'data' event listener then _read() will get called synchronously
		// from inside push().
			self.push(self._eventBuffer.shift());
		});
	}
};

module.exports = EnterpriseEventStream;

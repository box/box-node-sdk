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

const DEFAULT_OPTIONS = Object.freeze({
	pollingInterval: 60,	// seconds
	chunkSize: 500

});// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Stream of Box enterprise events.
 *
 * By default, the stream starts from the current time.
 * Pass 'startDate' to start from a specific time.
 * Pass 'streamPosition' to start from a previous stream position, or '0' for all available past events (~1 year).
 * Once the stream catches up to the current time, it will begin polling every 'pollingInterval' seconds.
 * If 'pollingInterval' = 0, then the stream will end when it catches up to the current time (no polling).
 *
 * @param {BoxClient} client - The client to use to get events
 * @param {Object} [options] - Options
 * @param {string} [options.streamPosition] - The stream position to start from (pass '0' for all past events)
 * @param {string} [options.startDate] - The date to start from
 * @param {string} [options.endDate] - The date to end at
 * @param {EventType[]} [options.eventTypeFilter] - Array of event types to return
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
	this._options = Object.assign({}, DEFAULT_OPTIONS, options);

	// Handle the case where the caller passes streamPosition = 0 instead of streamPosition = '0'.
	if (!this._options.startDate && !this._options.streamPosition && this._options.streamPosition !== 0) {
		// If neither startDate nor streamPosition is specified, start from the current time.
		this._options.startDate = new Date().toISOString().replace(/\.000Z$/, '-00:00');
	}

	/**
	 * @var {?string} - The current stream position
	 * @private
	 */
	this._streamPosition = this._options.streamPosition;
}

util.inherits(EnterpriseEventStream, Readable);

/**
 * @returns {?string} - Returns null if no events have been fetched from Box yet.
 */
EnterpriseEventStream.prototype.getStreamPosition = function() {
	return this._streamPosition;
};

/**
 * Get the stream state.
 *
 * @returns {Object} - The stream state
 */
EnterpriseEventStream.prototype.getStreamState = function() {
	// We need to return both streamPosition and startDate, since streamPosition will be null until
	// the first set of events is returned from Box.
	return {
		streamPosition: this._streamPosition,
		startDate: this._options.startDate,
		endDate: this._options.endDate,
		eventTypeFilter: this._options.eventTypeFilter
	};
};

/**
 * Set the stream state.
 *
 * @param {Object} state - The stream state
 * @returns {void}
 */
EnterpriseEventStream.prototype.setStreamState = function(state) {
	// We need to set both streamPosition and startDate, since streamPosition will be null until
	// the first set of events is returned from Box.
	this._streamPosition = state.streamPosition;
	this._options.startDate = state.startDate;
	this._options.endDate = state.endDate;
	this._options.eventTypeFilter = state.eventTypeFilter;
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
		params = {
			stream_type: 'admin_logs'
		};

	// Use the current stream position.
	// Handle the case where the caller passes streamPosition === 0 instead of streamPosition === '0'.
	if (this._streamPosition || this._streamPosition === 0) {
		params.stream_position = this._streamPosition;
	}

	if (this._options.startDate) {
		params.created_after = this._options.startDate;
	}

	if (this._options.endDate) {
		params.created_before = this._options.endDate;
	}

	if (this._options.eventTypeFilter) {
		params.event_type = this._options.eventTypeFilter.join(',');
	}

	if (this._options.chunkSize) {
		params.limit = this._options.chunkSize;
	}

	this._client.events.get(params, function(err, result) {
		if (err) {
			self.emit('error', err);
			// If there was a "permanent" error, we would call the callback with it here.
			// But it's not clear which errors are truly permanent?
			// If Box is down or returning errors for an extended period, we still want to resume when it recovers.
			// So, continue polling at the regular frequency.
			// Don't use a shorter retry interval (to avoid DDOSing Box).
		}

		if (err || !result || !result.entries || result.entries.length === 0) {
			if (!self._options.pollingInterval) {
				// If polling is disabled, end the stream.
				callback();
				return;
			}

			// There were no events returned (or an error occurred), so schedule another poll.
			const delay = self._options.pollingInterval * 1000;

			// Stream readers can use this to flush buffered events to a downstream system.
			self.emit('wait', delay);

			setTimeout(function() {
				self.fetchEvents(callback);
			}, delay);
			return;
		}

		// Only update the stream position if there were events returned.
		// The API currently returns next_stream_position = 0 if there are no events (may be a bug?).
		// But we don't want to start over at the beginning in that case, so ignore it.
		self._streamPosition = result.next_stream_position;

		// Notify the reader of the new stream position.
		// Stream readers can respond to the 'newStreamState' event to persist the stream state.
		self.emit('newStreamState', self.getStreamState());

		callback(null, result.entries);
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
	// Fetch the next chunk of events.
	const self = this;

	// This will poll forever until events are available.
	this.fetchEvents(function(err, events) {
		if (err || !events || events.length === 0) {
			// Close the stream if there was a "permanent" failure or we reached the end of the events.
			self.push(null);
			return;
		}

		// Pause the stream to avoid race conditions while pushing in the new events.
		// Without this, _read() would be called again from inside each push(),
		// resulting in multiple parallel calls to fetchEvents().
		// See https://github.com/nodejs/node/issues/3203
		const wasPaused = self.isPaused();
		self.pause();

		// Push all of the events into the stream.
		events.forEach(function(event) {
			self.push(event);
		});

		if (!wasPaused) {
			// This will deliver the events and trigger the next call to _read() once they have been consumed.
			self.resume();
		}
	});
};

module.exports = EnterpriseEventStream;

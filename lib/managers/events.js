/**
 * @fileoverview Manager for the Box Events Resource
 */

'use strict';


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var urlPath = require('../util/url-path'),
	errors = require('../util/errors'),
	EventStream = require('../event-stream'),
	Promise = require('bluebird'),
	httpStatusCodes = require('http-status');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// Base path for all files endpoints
var BASE_PATH = '/events';

/** @const {string} */
var CURRENT_STREAM_POSITION = 'now';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Events' endpoints and actions.
 *
 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
 * @constructor
 */
function Events(client) {
	// Attach the client, for making API calls
	this.client = client;
}

Events.prototype.CURRENT_STREAM_POSITION = CURRENT_STREAM_POSITION;

/**
 * Requests a file object with the given ID.
 *
 * API Endpoint: '/events'
 * Method: GET
 *
 * @param {Function} [callback] Passed the current stream position if successful
 * @returns {Promise<string>} A promise resolving to the stream position
 */
Events.prototype.getCurrentStreamPosition = function(callback) {
	var params = {
		qs: {
			stream_position: CURRENT_STREAM_POSITION
		}
	};
	var apiPath = urlPath(BASE_PATH);
	return this.client.get(apiPath, params)
		.then(response => {

			if (response.statusCode !== httpStatusCodes.OK) {
				throw errors.buildUnexpectedResponseError(response);
			}

			return response.body.next_stream_position;
		})
		.asCallback(callback);
};

/**
 * Get a chunk of events
 *
 * API Endpoint: '/events'
 * Method: GET
 *
 * @param {Object} [qs] Query string options
 * @param {Function} [callback] Passed the current stream position if successful
 * @returns {Promise<Object>} A promise resolving to the collection of events
 */
Events.prototype.get = function(qs, callback) {

	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Get information for long-polling until new events are available
 *
 * API Endpoint: '/events'
 * Method: OPTIONS
 *
 * @param {Function} [callback] Passed the long poll info if successful
 * @returns {Promise<Object>} A promise resolving to the long poll info
 */
Events.prototype.getLongPollInfo = function(callback) {

	var apiPath = urlPath(BASE_PATH);
	return this.client.options(apiPath, {})
		.then(function(response) {

			if (response.statusCode !== httpStatusCodes.OK) {
				throw errors.buildUnexpectedResponseError(response);
			}

			var longpollInfo = response.body.entries.find(function(entry) {
				return entry.type === 'realtime_server';
			});

			if (!longpollInfo) {
				throw errors.buildResponseError('No valid long poll server specified', response);
			}

			return longpollInfo;
		})
		.asCallback(callback);
};

/**
 * Create a stream of events, using the long-poll API to wait for new events
 *
 * API Endpoint: '/events'
 * Method: OPTIONS
 *
 * @param {string} [streamPosition] Starting stream position
 * @param {Function} [callback] Passed the events stream if successful
 * @returns {Promise<EventStream>} A promise resolving to the event stream
 */
Events.prototype.getEventStream = function(streamPosition, callback) {

	var self = this;
	if (typeof streamPosition === 'string') {

		return Promise.resolve(new EventStream(self.client, streamPosition)).asCallback(callback);
	}

	// Fix up optional arguments
	callback = streamPosition;

	return this.getCurrentStreamPosition()
		.then(currentStreamPosition => new EventStream(self.client, currentStreamPosition))
		.asCallback(callback);
};

module.exports = Events;

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
 * @param {Function} callback Passed the current stream position if successful
 * @returns {void}
 */
Events.prototype.getCurrentStreamPosition = function(callback) {
	var params = {
		qs: {
			stream_position: CURRENT_STREAM_POSITION
		}
	};
	var apiPath = urlPath(BASE_PATH);
	this.client.get(apiPath, params, function(err, response) {

		if (err) {
			callback(err);
			return;
		}

		if (response.statusCode !== httpStatusCodes.OK) {
			callback(errors.buildUnexpectedResponseError(response));
			return;
		}

		callback(null, response.body.next_stream_position);
	});
};

/**
 * Get a chunk of events
 *
 * API Endpoint: '/events'
 * Method: GET
 *
 * @param {?Object} qs Query string options
 * @param {Function} callback Passed the current stream position if successful
 * @returns {void}
 */
Events.prototype.get = function(qs, callback) {

	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH);
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

Events.prototype.getLongPollInfo = function(callback) {

	var apiPath = urlPath(BASE_PATH);
	this.client.options(apiPath, {}, function(err, response) {

		if (err) {
			callback(err);
			return;
		}

		if (response.statusCode !== httpStatusCodes.OK) {
			callback(errors.buildUnexpectedResponseError(response));
			return;
		}

		var longpollInfo = response.body.entries.find(function(entry) {
			return entry.type === 'realtime_server';
		});

		if (!longpollInfo) {
			callback(errors.buildResponseError('No valid long poll server specified', response));
			return;
		}

		callback(null, longpollInfo);
	});
};

/**
 * Create a stream of events, using the long-poll API to wait for new events
 *
 * API Endpoint: '/events'
 * Method: OPTIONS
 *
 * @param {string} [streamPosition] Starting stream position
 * @param {Function} callback Passed the events stream if successful
 * @returns {void}
 */
Events.prototype.getEventStream = function(streamPosition, callback) {

	var self = this;
	if (typeof streamPosition === 'string') {


		setImmediate(function() {
			callback(null, new EventStream(self.client, streamPosition));
		});
		return;
	}

	// Fix up optional arguments
	callback = streamPosition;

	this.getCurrentStreamPosition(function(err, currentStreamPosition) {
		if (err) {
			callback(err);
			return;
		}

		callback(null, new EventStream(self.client, currentStreamPosition));
	});
};

module.exports = Events;

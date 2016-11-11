/**
 * @fileoverview A library for making requests to the Box API.
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var APIRequest = require('./api-request');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * A library for communicating with the Box API.
 *
 * @param {Config} config SDK configuration object instance.
 * @param {EventEmitter} eventBus The event bus for SDK events
 * @constructor
 */
function APIRequestManager(config, eventBus) {

	this.config = config;
	this.eventBus = eventBus;
}

/**
 * Make a request to the API, and get the response via callback.
 *
 * @param {Object} options The request options
 * @param {Function} callback Called with the response, or an error if there was
 *  a problem with the request.
 * @returns {void}
 */
APIRequestManager.prototype.makeRequest = function(options, callback) {
	// Add default APIRequestManager options to each request
	var requestConfig = this.config.extend({
		request: options
	});

	// Make the request
	var apiRequest = new APIRequest(requestConfig, this.eventBus);
	apiRequest.execute(callback);
};

/**
 * Make a request to the API, and return a read stream for the response.
 *
 * @param {Object} options The request options
 * @returns {Stream} The response stream, which can be piped or otherwise handled.
 */
APIRequestManager.prototype.makeStreamingRequest = function(options) {
	// Add default APIRequestManager options to each request
	var requestConfig = this.config.extend({
		request: options
	});

	// Make the request
	var apiRequest = new APIRequest(requestConfig, this.eventBus);
	apiRequest.execute();
	return apiRequest.getResponseStream();
};

/**
 * @module box-node-sdk/lib/api-request-manager
 * @see {@Link APIRequestManager}
 */
module.exports = APIRequestManager;

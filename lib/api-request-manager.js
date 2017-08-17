/**
 * @fileoverview A library for making requests to the Box API.
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var APIRequest = require('./api-request'),
	errors = require('./util/errors'),
	Promise = require('bluebird');

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
 * @returns {Promise<Response>} A promise resolving to the response object
 */
APIRequestManager.prototype.makeRequest = function(options) {
	// Add default APIRequestManager options to each request
	var requestConfig = this.config.extend({
		request: options
	});

	// Make the request
	var apiRequest = new APIRequest(requestConfig, this.eventBus);
	return Promise.fromCallback(callback => apiRequest.execute(callback))
		.catch(err => errors.unwrapAndThrow(err));
};

/**
 * Make a request to the API, and return a read stream for the response.
 *
 * @param {Object} options The request options
 * @returns {Stream.Readable} The response stream
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

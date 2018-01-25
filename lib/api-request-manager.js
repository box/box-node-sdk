/**
 * @fileoverview A library for making requests to the Box API.
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var APIRequest = require('./api-request'),
	Promise = require('bluebird'),
	qs = require('querystring'),
	merge = require('merge-options');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

/**
 * Remap params from legacy request stylke to axios style
 * @param {Object} params The legacy params
 * @returns {Object} The remapped params
 */
function remapLegacyParams(params) {

	if (params.body) {
		params.data = params.body;
		delete params.body;
	}

	if (params.form) {
		params.data = qs.stringify(params.form);
		delete params.form;
	}

	return params;
}

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

	this.defaults = {
		headers: Object.assign({}, this.config.request.headers),
		maxRedirects: 0,
		timeout: 60000,
		// @TODO(mwiller) 2018-01-24: See if we can remove this later
		validateStatus: () => true // For legacy compatibility, pass all statuses as successful response
	};
}

/**
 * Make a request to the API, and get the response via callback.
 *
 * @param {Object} options The request options
 * @returns {Promise<Response>} A promise resolving to the response object
 */
APIRequestManager.prototype.makeRequest = function(options) {

	// @TODO(mwiller) 2018-01-24: Develop better interface for SDK params
	var requestParams = remapLegacyParams(merge({}, this.defaults, options));

	// Make the request
	var apiRequest = new APIRequest(requestParams, this.config, this.eventBus);
	// Need to wrap with bluebird for higher levels of the SDK
	return Promise.resolve(apiRequest.execute());
};

/**
 * Make a request to the API, and return a read stream for the response.
 *
 * @param {Object} options The request options
 * @returns {Stream.Readable} The response stream
 */
APIRequestManager.prototype.makeStreamingRequest = function(options) {

	var requestParams = merge({}, this.defaults, options);

	// Make the request
	var apiRequest = new APIRequest(requestParams, this.config, this.eventBus);
	apiRequest.execute();
	return apiRequest.getResponseStream();
};

/**
 * @module box-node-sdk/lib/api-request-manager
 * @see {@Link APIRequestManager}
 */
module.exports = APIRequestManager;

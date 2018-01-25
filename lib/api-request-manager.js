/**
 * @fileoverview A library for making requests to the Box API.
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var APIRequest = require('./api-request'),
	qs = require('querystring'),
	FormData = require('form-data'),
	merge = require('merge-options');

/**
 * Append data to a multipart form
 * @param {FormData} form The form object
 * @param {string} key The form key
 * @param {*} data The data to add
 * @returns {void}
 */
function addToForm(form, key, data) {
	if (data && data.value && data.options) {
		form.append(key, data.value, data.options);
	} else {
		form.append(key, data);
	}
}

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

	if (params.qs) {
		params.params = params.qs;
		delete params.qs;
	}

	if (params.formData) {
		var form = new FormData();
		Object.keys(params.formData)
			.forEach(key => {
				var data = params.formData[key];
				if (Array.isArray(data)) {
					data.forEach(item => addToForm(form, key, item));
				} else {
					addToForm(form, key, data);
				}
			});
		params.data = form;
		Object.assign(params.headers, form.getHeaders());
		delete params.formData;
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
 * Make a request to the API
 *
 * @param {Object} options The request options
 * @returns {Promise<Response>} A promise resolving to the response object
 */
APIRequestManager.prototype.makeRequest = function(options) {

	// @TODO(mwiller) 2018-01-24: Develop better interface for SDK params!
	// This feels super hacky, but I don't want to have to update everything everywhere
	var requestParams = remapLegacyParams(merge({}, this.defaults, options));

	// Make the request
	var apiRequest = new APIRequest(requestParams, this.config, this.eventBus);
	return apiRequest.execute();
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

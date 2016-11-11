/**
 * @fileoverview Manager for the Device Pins resource
 * @author mwiller
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/device_pinners';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all Device Pin endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function DevicePins(client) {
	this.client = client;
}

/**
 * Get a specific device pinning record
 *
 * API Endpoint: '/device_pinners/:pinID'
 * Method: GET
 *
 * @param {string} pinID - The ID of the pin to retrieve
 * @param {?Object} options - Optional paramters, can be left null in many cases
 * @param {Function} callback - Passed the device pin if successful, error otherwise
 * @returns {void}
 */
DevicePins.prototype.get = function(pinID, options, callback) {

	var apiPath = urlPath(BASE_PATH, pinID),
		params = {
			qs: options
		};

	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Delete a specific device pinning record
 *
 * API Endpoint: '/device_pinners/:pinID'
 * Method: DELETE
 *
 * @param {string} pinID - The ID of the pin to delete
 * @param {?Object} options - Optional paramters, can be left null in many cases
 * @param {Function} callback - Passed nothing if successful, error otherwise
 * @returns {void}
 */
DevicePins.prototype.delete = function(pinID, options, callback) {

	var apiPath = urlPath(BASE_PATH, pinID),
		params = {
			qs: options
		};

	this.client.del(apiPath, params, this.client.defaultResponseHandler(callback));
};

module.exports = DevicePins;

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
var BASE_PATH = '/device_pinners',
	ENTERPRISES_PATH = '/enterprises',
	DEVICE_PINNERS_SUBRESOURCE = 'device_pinners';

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
 * @param {Object} [options] - Optional paramters, can be left null in many cases
 * @param {Function} [callback] - Passed the device pin if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the device pin object
 */
DevicePins.prototype.get = function(pinID, options, callback) {

	var apiPath = urlPath(BASE_PATH, pinID),
		params = {
			qs: options
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Delete a specific device pinning record
 *
 * API Endpoint: '/device_pinners/:pinID'
 * Method: DELETE
 *
 * @param {string} pinID - The ID of the pin to delete
 * @param {Object} [options] - Optional paramters, can be left null in many cases
 * @param {Function} [callback] - Passed nothing if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
DevicePins.prototype.delete = function(pinID, options, callback) {

	var apiPath = urlPath(BASE_PATH, pinID),
		params = {
			qs: options
		};

	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, params, callback);
};

/**
 * Get all device pin records for the current enterprise
 *
 * API Endpoint: '/enterprises/:enterpriseID/device_pinners'
 * Method: GET
 *
 * @param {Object} [options] - Optional paramters, can be left null in many cases
 * @param {Function} [callback] - Passed a list of device pins if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the collection of device pins
 */
DevicePins.prototype.getAll = function(options, callback) {

	return this.client.users.get(this.client.CURRENT_USER_ID, {fields: 'enterprise'})
		.then(data => {

			if (!data.enterprise || !data.enterprise.id) {
				throw new Error('User must be in an enterprise to view device pins');
			}

			var apiPath = urlPath(ENTERPRISES_PATH, data.enterprise.id, DEVICE_PINNERS_SUBRESOURCE),
				params = {
					qs: options
				};

			return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params);
		})
		.asCallback(callback);
};

module.exports = DevicePins;

/**
 * @fileoverview Manager for the Shared Items
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var errors = require('../util/errors'),
	httpStatusCodes = require('http-status');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/shared_items';


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Shared Item' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function SharedItems(client) {
	this.client = client;
}

/**
 * Requests a Box item associated with a shared link.
 *
 * API Endpoint: '/shared_items'
 * Method: GET
 *
 * @param {string} url - Shared Link URL
 * @param {string} [password] - Shared Link Password (null if no password)
 * @param {Object} [qs] - Optional additional querystring to add to the request. Can be left null in most cases.
 * @param {Function} [callback] - passed the shared item if it was successfully acquired
 * @returns {Promise<Object>} A promise resolving to the shared item object
 */
SharedItems.prototype.get = function(url, password, qs, callback) {
	var params = {
		qs: qs,
		headers: {
			BoxApi: this.client.buildSharedItemAuthHeader(url, password)
		}
	};

	// Handle the Special API Response
	return this.client.get(BASE_PATH, params)
		.then(response => {

			switch (response.statusCode) {

			// 200 - Shared Item Recieved
			case httpStatusCodes.OK:
				return response.body;

			// 403 - Incorrect or missing password
			// Propagate an error explaining that the password is either missing or incorrect
			case httpStatusCodes.FORBIDDEN:
				var errMessage = (password) ? 'password_incorrect' : 'password_missing';
				throw errors.buildResponseError(response, errMessage);

				// Unexpected Response
			default:
				throw errors.buildUnexpectedResponseError(response);
			}
		})
		.asCallback(callback);
};

/**
 * @module box-node-sdk/lib/managers/shared-items
 * @see {@Link SharedItems}
 */
module.exports = SharedItems;

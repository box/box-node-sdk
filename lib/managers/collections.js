/**
 * @fileoverview Manager for the Box Collection Resource
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/collections';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Collection' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Collections(client) {
	this.client = client;
}

/**
 * Requests all of a user's collection objects.
 *
 * API Endpoint: '/collections'
 * Method: GET
 *
 * @param {Function} [callback] - Called with a collection of collections if successful
 * @returns {Promise<Object>} A promise resolving to the collection of collections
 */
Collections.prototype.getAll = function(callback) {
	return this.client.wrapWithDefaultHandler(this.client.get)(BASE_PATH, {}, callback);
};

/**
 * Requests the items in the collection object with a given ID.
 *
 * API Endpoint: '/collections/:collectionID/items'
 * Method: GET
 *
 * @param {string} collectionID - Box ID of the collection with items being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the items information if they were acquired successfully
 * @returns {Promise<Object>} A promise resolving to the collection of items in the collection
 */
Collections.prototype.getItems = function(collectionID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, collectionID, 'items');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * @module box-node-sdk/lib/managers/collections
 * @see {@Link Collections}
 */
module.exports = Collections;

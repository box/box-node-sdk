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
var BASE_PATH = '/collections',
	FOLDERS_BASE_PATH = '/folders';

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
 * @param {Function} callback - Called with a collection of collections if successful
 * @returns {void}
 */
Collections.prototype.getAll = function(callback) {
	this.client.get(BASE_PATH, {}, this.client.defaultResponseHandler(callback));
};

/**
 * Requests the items in the collection object with a given ID.
 *
 * API Endpoint: '/collections/:collectionID/items'
 * Method: GET
 *
 * @param {string} collectionID - Box ID of the collection with items being requested
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the items information if they were acquired successfully
 * @returns {void}
 */
Collections.prototype.getItems = function(collectionID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, collectionID, 'items');
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * To add or remove an item from a collection, you do a PUT on that item and change the list of collections
 * it belongs to. Philosophically, this is similar to the way “move” operations work on files and folders:
 * you do a PUT on the item and change its parent. It’s the same idea with collections, except you’re changing
 * which collection(s) the item belongs to instead of the folder it belongs to. Currently the only collection
 * available is the favorites collection, and you’ll need to know it’s ID for the user that is making the API
 * call, since every user has a different favorites collection_id.
 * The Add/Remove API handling will check all ids passed in before performing any add/removal operations.
 * If any collection ids are malformed or do not exist in the user’s account, the API call will throw a 400.
 * Only if all of the collection ids are valid will the adds and removals be carried out.
 *
 * API Endpoint: '/folders/:folderID'
 * Method: PUT
 *
 * @param {String} folderID - The ID of the folder which add or remove from collection
 * @param {Array.<string>} collectionIDs - The list of collection IDs
 * @param {Function} callback - Passed the folder information if acquired successfully, error otherwise
 * @returns {void}
 */
Collections.prototype.update = function(folderID, collectionIDs, callback) {
	var apiPath = urlPath(FOLDERS_BASE_PATH, folderID),
		params = {
			body: {}
		};

	var	collections = collectionIDs.map(function(collectionID) {
		return {id: collectionID};
	});

	params.body.collections = collections;
	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};


/**
 * @module box-node-sdk/lib/managers/collections
 * @see {@Link Collections}
 */
module.exports = Collections;

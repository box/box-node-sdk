/**
 * @fileoverview Manager for the Box RecentItem Resource
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/recent_items';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'RecentItem' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function RecentItems(client) {
	this.client = client;
}

/**
 * Requests all items that have been accessed by a user in the last 90 days or the last 1000 items accessed.
 *
 * API Endpoint: '/recent_items'
 * Method: GET
 *
 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
 * @param {int} [options.limit] Maximum number of items to return
 * @param {string} [options.marker] The position marker for marker-based paging
 * @param {string} [options.fields] Comma-separated list of fields to include in the response
 * @param {Function} [callback] - Passed the items information if they were acquired successfully
 * @returns {Promise<Object>} A promise resolving to the collection of items in the collection
 */
RecentItems.prototype.get = function(options, callback) {
	var params = {
		qs: options
	};
	var apiPath = urlPath(BASE_PATH);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * @module box-node-sdk/lib/managers/recent-items
 * @see {@Link RecentItems}
 */
module.exports = RecentItems;

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
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {string} [qs.limit] Maximum number of items to return
 * @param {string} [qs.marker] The position marker for marker-based paging
 * @param {string} [qs.fields] Comma-separated list of fields to include in the response
 * @param {Function} [callback] - Passed the items information if they were acquired successfully
 * @returns {Promise<Object>} A promise resolving to the collection of items in the collection
 */
RecentItems.prototype.get = function(qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * @module box-node-sdk/lib/managers/recent-items
 * @see {@Link RecentItems}
 */
module.exports = RecentItems;

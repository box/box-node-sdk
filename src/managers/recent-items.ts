/**
 * @fileoverview Manager for the Box RecentItem Resource
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import BoxClient from '../box-client';
import urlPath from '../util/url-path';

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

const BASE_PATH = '/recent_items';

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
class RecentItems {
	client: BoxClient;

	constructor(client: BoxClient) {
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
	get(
		options?: {
			limit?: number;
			marker?: string;
			fields?: string;
		},
		callback?: Function
	) {
		var params = {
			qs: options,
		};
		var apiPath = urlPath(BASE_PATH);
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}
}

/**
 * @module box-node-sdk/lib/managers/recent-items
 * @see {@Link RecentItems}
 */
export = RecentItems;

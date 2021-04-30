/**
 * @fileoverview Manager for the Box Collection Resource
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import BoxClient from '../box-client';
import urlPath from '../util/url-path';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

const BASE_PATH = '/collections';

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
class Collections {
	client: BoxClient;

	constructor(client: BoxClient) {
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
	getAll(callback?: Function) {
		return this.client.wrapWithDefaultHandler(this.client.get)(
			BASE_PATH,
			{},
			callback
		);
	}

	/**
	 * Requests the items in the collection object with a given ID.
	 *
	 * API Endpoint: '/collections/:collectionID/items'
	 * Method: GET
	 *
	 * @param {string} collectionID - Box ID of the collection with items being requested
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the items information if they were acquired successfully
	 * @returns {Promise<Object>} A promise resolving to the collection of items in the collection
	 */
	getItems(
		collectionID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var params = {
			qs: options,
		};
		var apiPath = urlPath(BASE_PATH, collectionID, 'items');
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}
}

/**
 * @module box-node-sdk/lib/managers/collections
 * @see {@Link Collections}
 */
export = Collections;

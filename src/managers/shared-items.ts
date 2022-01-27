/**
 * @fileoverview Manager for the Shared Items
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import httpStatusCodes from 'http-status';
import BoxClient from '../box-client';
import errors from '../util/errors';

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

const BASE_PATH = '/shared_items';

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
class SharedItems {
	client: BoxClient;

	constructor(client: BoxClient) {
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
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - passed the shared item if it was successfully acquired
	 * @returns {Promise<Object>} A promise resolving to the shared item object
	 */
	get(
		url: string,
		password: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var params = {
			qs: options,
			headers: {
				BoxApi: this.client.buildSharedItemAuthHeader(url, password),
			},
		};

		// Handle the Special API Response
		return this.client
			.get(BASE_PATH, params)
			.then((response: any /* FIXME */) => {
				switch (response.status) {
					// 200 - Shared Item Recieved
					case httpStatusCodes.OK:
						return response.data;

					// 403 - Incorrect or missing password
					// Propagate an error explaining that the password is either missing or incorrect
					case httpStatusCodes.FORBIDDEN:
						var errMessage = password
							? 'Incorrect shared link password'
							: 'Shared link password missing';
						throw errors.buildResponseError(response, errMessage);

					// Unexpected Response
					default:
						throw errors.buildUnexpectedResponseError(response);
				}
			})
			.asCallback(callback);
	}
}

/**
 * @module box-node-sdk/lib/managers/shared-items
 * @see {@Link SharedItems}
 */
export = SharedItems;

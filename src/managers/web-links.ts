/**
 * @fileoverview Manager for the Web Links Resource
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import BoxClient from '../box-client';
import urlPath from '../util/url-path';

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

const BASE_PATH = '/web_links';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Weblinks' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
class WebLinks {
	client: BoxClient;

	constructor(client: BoxClient) {
		this.client = client;
	}

	/**
	 * Creates a web link object within a given folder.
	 *
	 * API Endpoint: '/web_links'
	 * Method: POST
	 *
	 * @param {string} url - URL you want the web link to point to. Must include http:// or https://
	 * @param {string} parentID - The ID of the parent folder where you're creating the web link
	 * @param {Object} [options] - Additional parameters
	 * @param {string} [options.name] - Name for the web link. Will default to the URL if empty.
	 * @param {string} [options.description] - Description of the web link. Will provide more context to users about the web link.
	 * @param {Function} [callback] - Passed the new web link information if it was acquired successfully, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the created weblink object
	 */
	create(
		url: string,
		parentID: string,
		options?: {
			name?: string;
			description?: string;
		},
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH),
			params = {
				body: {
					url,
					parent: {
						id: parentID,
					},
				},
			};

		Object.assign(params.body, options);

		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Use to get information about the web link.
	 *
	 * API Endpoint: '/web_links/:weblinkID'
	 * Method: GET
	 *
	 * @param {string} weblinkID - The Box ID of web link being requested
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the web-link information if it was acquired successfully, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the weblink object
	 */
	get(weblinkID: string, options?: Record<string, any>, callback?: Function) {
		var apiPath = urlPath(BASE_PATH, weblinkID),
			params = {
				qs: options,
			};

		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Updates information for a web link.
	 *
	 * API Endpoint: '/web_links/:weblinkID'
	 * Method: PUT
	 *
	 * @param {string} weblinkID - The Box ID of the web link being updated
	 * @param {Object} updates - Fields of the weblink to update
	 * @param {string} [updates.name] - Name for the web link. Will default to the URL if empty.
	 * @param {string} [updates.description] - Description of the web link. Will provide more context to users about the web link.
	 * @param {Function} [callback] - Passed the updated web link information if it was acquired successfully, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the updated web link object
	 */
	update(
		weblinkID: string,
		updates?: {
			name?: string;
			description?: string;
			collections?: string[];
		},
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, weblinkID),
			params = {
				body: updates,
			};

		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Deletes a web link and moves it to the trash
	 *
	 * API Endpoint: '/web_links/:weblinkID'
	 * Method: DELETE
	 *
	 * @param {string} weblinkID - The Box ID of the web link being moved to the trash
	 * @param {Function} [callback] - Empty body passed if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to nothing
	 */
	delete(weblinkID: string, callback?: Function) {
		var apiPath = urlPath(BASE_PATH, weblinkID);

		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			null,
			callback
		);
	}

	/**
	 * Move a web link into a new parent folder.
	 *
	 * API Endpoint: '/web_links/:webLinkID'
	 * Method: PUT
	 *
	 * @param {string} webLinkID - The Box ID of the web link being requested
	 * @param {string} newParentID - The Box ID for the new parent folder. '0' to move to All Files.
	 * @param {Function} [callback] - Passed the updated web link information if it was acquired successfully
	 * @returns {Promise<Object>} A promise resolving to the updated web link object
	 */
	move(webLinkID: string, newParentID: string, callback?: Function) {
		var params = {
			body: {
				parent: {
					id: newParentID,
				},
			},
		};
		var apiPath = urlPath(BASE_PATH, webLinkID);
		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Copy a web link into a new, different folder
	 *
	 * API Endpoint: '/web_links/:webLinkID/copy
	 * Method: POST
	 *
	 * @param {string} webLinkID - The Box ID of the web link being requested
	 * @param {string} newParentID - The Box ID for the new parent folder. '0' to copy to All Files.
	 * @param {Object} [options] - Optional parameters for the copy operation, can be left null in most cases
	 * @param {string} [options.name] - A new name to use if there is an identically-named item in the new parent folder
	 * @param {Function} [callback] - passed the new web link info if call was successful
	 * @returns {Promise<Object>} A promise resolving to the new web link object
	 */
	copy(
		webLinkID: string,
		newParentID: string,
		options?: {
			name?: string;
		},
		callback?: Function
	) {
		options = options || {};

		(options as Record<string, any>).parent = {
			id: newParentID,
		};

		var params = {
			body: options,
		};
		var apiPath = urlPath(BASE_PATH, webLinkID, '/copy');
		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Add a web link to a given collection
	 *
	 * API Endpoint: '/web_links/:webLinkID'
	 * Method: PUT
	 *
	 * @param {string} webLinkID - The web link to add to the collection
	 * @param {string} collectionID - The collection to add the web link to
	 * @param {Function} [callback] - Passed the updated web link if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the updated web link object
	 */
	addToCollection(
		webLinkID: string,
		collectionID: string,
		callback?: Function
	) {
		return this.get(webLinkID, { fields: 'collections' })
			.then((data: any /* FIXME */) => {
				var collections = data.collections || [];

				// Convert to correct format
				collections = collections.map((c: any /* FIXME */) => ({ id: c.id }));

				if (!collections.find((c: any /* FIXME */) => c.id === collectionID)) {
					collections.push({ id: collectionID });
				}

				return this.update(webLinkID, { collections });
			})
			.asCallback(callback);
	}

	/**
	 * Remove a web link from a given collection
	 *
	 * API Endpoint: '/web_links/:webLinkID'
	 * Method: PUT
	 *
	 * @param {string} webLinkID - The web link to remove from the collection
	 * @param {string} collectionID - The collection to remove the web link from
	 * @param {Function} [callback] - Passed the updated web link if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the updated web link object
	 */
	removeFromCollection(
		webLinkID: string,
		collectionID: string,
		callback?: Function
	) {
		return this.get(webLinkID, { fields: 'collections' })
			.then((data: any /* FIXME */) => {
				var collections = data.collections || [];
				// Convert to correct object format and remove the specified collection
				collections = collections
					.map((c: any /* FIXME */) => ({ id: c.id }))
					.filter((c: any /* FIXME */) => c.id !== collectionID);

				return this.update(webLinkID, { collections });
			})
			.asCallback(callback);
	}
}

export = WebLinks;

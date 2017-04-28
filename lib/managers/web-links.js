/**
 * @fileoverview Manager for the Web Links Resource
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/web_links';

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
function WebLinks(client) {
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
WebLinks.prototype.create = function(url, parentID, options, callback) {
	var apiPath = urlPath(BASE_PATH),
		params = {
			body: {
				url: url,
				parent: {
					id: parentID
				}
			}
		};

	Object.assign(params.body, options);

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Use to get information about the web link.
 *
 * API Endpoint: '/web_links/:weblinkID'
 * Method: GET
 *
 * @param {string} weblinkID - The Box ID of web link being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring
 * @param {Function} [callback] - Passed the web-link information if it was acquired successfully, error otherwise
 * @returns {Promise<Object>} A promise resolving to the weblink object
 */
WebLinks.prototype.get = function(weblinkID, qs, callback) {
	var apiPath = urlPath(BASE_PATH, weblinkID),
		params = {
			qs: qs
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Updates information for a web link.
 *
 * API Endpoint: '/web_links/:weblinkID'
 * Method: PUT
 *
 * @param {string} weblinkID - The Box ID of the web link being updated
 * @param {Object} options - Additional parameters
 * @param {string} [options.name] - Name for the web link. Will default to the URL if empty.
 * @param {string} [options.description] - Description of the web link. Will provide more context to users about the web link.
 * @param {Function} [callback] - Passed the updated web-link information if it was acquired successfully, error otherwise
 * @returns {Promise<Object>} A promise resolving to the updated web link object
 */
WebLinks.prototype.update = function(weblinkID, options, callback) {
	var apiPath = urlPath(BASE_PATH, weblinkID),
		params = {
			body: options
		};

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

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
WebLinks.prototype.delete = function(weblinkID, callback) {
	var apiPath = urlPath(BASE_PATH, weblinkID);

	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

module.exports = WebLinks;

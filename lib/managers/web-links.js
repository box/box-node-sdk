/**
 * @fileoverview Manager for the Web Links Resource
 * @author ptoth
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
 * @param {?Object} options - Additional parameters
 * @param {string} [options.name] - Name for the web link. Will default to the URL if empty.
 * @param {string} [options.description] - Description of the web link. Will provide more context to users about the web link.
 * @param {Function} callback - Passed the new web-link information if it was acquired successfully, error otherwise
 * @returns {void}
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

	if (options && options.name) {
		params.body.name = options.name;
	}

	if (options && options.description) {
		params.body.description = options.description;
	}

	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

module.exports = WebLinks;

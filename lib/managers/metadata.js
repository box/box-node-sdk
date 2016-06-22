/**
 * @fileoverview Manager for the Box Metadata Resource
 * @author mwiller
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var METADATA_SUBRESOURCE = 'metadata',
	PROPERTIES_TYPE = 'properties',
	BASE_PATH = '/files';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all metadata endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Metadata(client) {
	this.client = client;
}


Metadata.prototype = {

	/**
	 * Instantiates an instance of the 'properties' metadata type
	 *
	 * API Endpoint: '/files/{id}/metadata/properties'
	 * Method: POST
	 *
	 * @param {string} fileID - The ID of the file to add properties to
	 * @param {?Object} metadata - The set of keys and values to set as properties metadata
	 * @param {Function} callback - passed the properties metadata if successful
	 * @returns {void}
	 */
	createProperties: function(fileID, metadata, callback) {
		var params = {
			body: metadata || {}
		};

		var apiPath = urlPath(BASE_PATH, fileID, METADATA_SUBRESOURCE, PROPERTIES_TYPE);
		this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
	},

	/**
	 * Gets the value of the 'properties' metadata type
	 *
	 * API Endpoint: '/files/{id}/metadata/properties'
	 * Method: GET
	 *
	 * @param {string} fileID - The file ID to get properties for
	 * @param {Function} callback - passed the properties metadata if successful
	 * @returns {void}
	 */
	getProperties: function(fileID, callback) {
		var apiPath = urlPath(BASE_PATH, fileID, METADATA_SUBRESOURCE, PROPERTIES_TYPE);
		this.client.get(apiPath, null, this.client.defaultResponseHandler(callback));
	}
};

module.exports = Metadata;

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
var PROPERTIES_TEMPLATE = 'properties',
	BASE_PATH = '/metadata_templates',
	ENTERPRISE_SCOPE = 'enterprise',
	GLOBAL_SCOPE = 'global';

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

	templates: {
		PROPERTIES: PROPERTIES_TEMPLATE
	},

	scopes: {
		ENTERPRISE: ENTERPRISE_SCOPE,
		GLOBAL: GLOBAL_SCOPE
	},

	/**
	 * Retrieve the schema definition for a metadata template
	 *
	 * API Endpoint: '/metadata_templates/:scope/:template'
	 * Method: GET
	 *
	 * @param {string} scope - The scope of the template, e.g. "enterprise"
	 * @param {string} template - The template to retrieve
	 * @param {Function} callback - Called with the template schema if successful
	 * @returns {void}
	 */
	getTemplateSchema: function(scope, template, callback) {

		var apiPath = urlPath(BASE_PATH, scope, template, 'schema');
		this.client.get(apiPath, null, this.client.defaultResponseHandler(callback));
	},

	/**
	 * Get all templates in a given scope
	 *
	 * API Endpoint: '/metadata_templates/:scope'
	 * Method: GET
	 *
	 * @param {string} scope - The scope to retrieve templates for
	 * @param {Function} callback - Called with an array of templates when successful
	 * @returns {void}
	 */
	getTemplates: function(scope, callback) {

		var apiPath = urlPath(BASE_PATH, scope);
		this.client.get(apiPath, null, this.client.defaultResponseHandler(callback));
	}
};

module.exports = Metadata;

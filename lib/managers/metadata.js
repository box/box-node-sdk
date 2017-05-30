/**
 * @fileoverview Manager for the Box Metadata Resource
 */

'use strict';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/** @typedef {string} MetadataFieldType */

/**
 * Metadata enum option
 * @typedef {Object} MetadataEnumOption
 * @property {string} key The option value
 */

/**
 * Field definition for a metadata template
 * @typedef {Object} MetadataTemplateField
 * @property {MetadataFieldType} type The type of the field
 * @property {string} key The programmatic name of the field
 * @property {string} displayName The display name of the field
 * @property {MetadataEnumOption[]} [options] For enum fields, the options
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------
var PROPERTIES_TEMPLATE = 'properties',
	BASE_PATH = '/metadata_templates',
	SCHEMA_SUBRESOURCE = 'schema',
	ENTERPRISE_SCOPE = 'enterprise',
	GLOBAL_SCOPE = 'global';

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

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
	 * Valid metadata field types
	 * @readonly
	 * @enum {MetadataFieldType}
	 */
	fieldTypes: Object.freeze({
		STRING: 'string',
		ENUM: 'enum',
		NUMBER: 'float',
		DATE: 'date'
	}),

	/**
	 * Retrieve the schema definition for a metadata template
	 *
	 * API Endpoint: '/metadata_templates/:scope/:template'
	 * Method: GET
	 *
	 * @param {string} scope - The scope of the template, e.g. "enterprise"
	 * @param {string} template - The template to retrieve
	 * @param {Function} [callback] - Called with the template schema if successful
	 * @returns {Promise<Object>} A promise resolving to the template schema
	 */
	getTemplateSchema: function(scope, template, callback) {

		var apiPath = urlPath(BASE_PATH, scope, template, SCHEMA_SUBRESOURCE);
		return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, null, callback);
	},

	/**
	 * Get all templates in a given scope
	 *
	 * API Endpoint: '/metadata_templates/:scope'
	 * Method: GET
	 *
	 * @param {string} scope - The scope to retrieve templates for
	 * @param {Function} [callback] - Called with an array of templates when successful
	 * @returns {Promise<Object>} A promise resolving to the collection of templates
	 */
	getTemplates: function(scope, callback) {

		var apiPath = urlPath(BASE_PATH, scope);
		return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, null, callback);
	},

	/**
	 * Create a new metadata template
	 *
	 * API Endpoint: '/metadata_templates/schema',
	 * Method: POST
	 *
	 * @param {string} templateName - The name of the metadata template
	 * @param {MetadataTemplateField[]} fields - A list of fields for the template
	 * @param {Object} [options] - Optional parameters, can be left null in many cases
	 * @param {string} [options.templateKey] - The programmatic key for the template
	 * @param {bool} [options.hidden] - Whether the template should be hidden in the UI
	 * @param {string} [options.scope=enterprise] - The scope for the template, only 'enterprise' is supported for now
	 * @param {Function} [callback] - Passed the template if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the created template
	 */
	createTemplate: function(templateName, fields, options, callback) {

		var apiPath = urlPath(BASE_PATH, SCHEMA_SUBRESOURCE),
			params = {
				body: {
					scope: ENTERPRISE_SCOPE,
					displayName: templateName,
					fields: fields
				}
			};

		Object.assign(params.body, options);

		return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
	},

	/**
	 * Update a metadata template via one or more non-breaking operations.  Each
	 * operation is a an object descrbing one change to the template or its
	 * fields.
	 *
	 * API Endpoint: '/metadata_templates/:scope/:template/schema'
	 * Method: PUT
	 *
	 * @param {string} scope - The scope of the template to modify
	 * @param {string} template - The template to modify
	 * @param {Object[]} operations - The operations to perform
	 * @param {Function} [callback] - Passed the updated template if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the updated template
	 * @see {@link https://docs.box.com/reference#update-metadata-schema}
	 */
	updateTemplate: function(scope, template, operations, callback) {

		var apiPath = urlPath(BASE_PATH, scope, template, SCHEMA_SUBRESOURCE),
			params = {
				body: operations
			};

		return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
	}
};

module.exports = Metadata;

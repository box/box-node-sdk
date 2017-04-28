/**
 * @fileoverview Manager for the Box Search Resource
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var urlPath = require('../util/url-path'),
	Promise = require('bluebird');

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * Search metadata filter
 * @typedef {Object} SearchMetadataFilter
 * @property {string} templateKey The template to filter against
 * @property {string} scope The scope of the template, e.g. 'global' or 'enterprise'
 * @property {Object} filters Key/value filters against individual metadata template properties
 */

 /** @typedef {string} SearchScope */

 /** @typedef {string} SearchTrashContent */

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

var API_PATHS_SEARCH = '/search';

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

/**
 * Simple manager for interacting with the search endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Search(client) {
	this.client = client;
}

Search.prototype = {

	/**
	 * Valid search scopes
	 * @readonly
	 * @enum {SearchScope}
	 */
	scopes: Object.freeze({
		USER: 'user_content',
		ENTERPRISE: 'enterprise_content'
	}),

	/**
	 * Searches Box for the given query.
	 *
	 * @param {string} searchString - The query string to use for search
	 * @param {Object} [options] - Additional search filters. Can be left null in most cases.
	 * @param {SearchScope} [options.scope] - The scope on which you want search. Can be user_content for a search limited to the current user or enterprise_content to search an entire enterprise
	 * @param {string} [options.file_extensions] - Single or comma-delimited list of file extensions to filter against
	 * @param {string} [options.created_at_range] - Date range for filtering on item creation time, e.g. '2014-05-15T13:35:01-07:00,2014-05-17T13:35:01-07:00'
	 * @param {string} [options.updated_at_range] - Date range for filtering on item update time, e.g. '2014-05-15T13:35:01-07:00,2014-05-17T13:35:01-07:00'
	 * @param {string} [options.size_range] - Range of item sizes (in bytes) to filter on, as lower_bound,upper_bound.  Either bound can be ommitted, e.g. ',100000' for <= 100KB
	 * @param {string} [options.owner_user_ids] - Comma-delimited list of user IDs to filter item owner against
	 * @param {string} [options.ancestor_folder_ids] - Comma-delimited list of folder IDs, search results will contain only items in these folders (and folders within them)
	 * @param {string} [options.content_types] - Query within specified comma-delimited fields. The types can be name, description, file_content, comments, or tags
	 * @param {string} [options.type] - The type of objects you want to include in the search results. The type can be file, folder, or web_link
	 * @param {string} [options.trash_content=non_trashed_only] - Controls whether to search in the trash. The value can be trashed_only or non_trashed_only
	 * @param {SearchMetadataFilter[]} [options.mdfilters] - Searches for objects with a specific metadata object association.  Searches with the this parameter do not require a query string
	 * @param {int} [options.limit=30] - The number of search results to return, max 200
	 * @param {int} [options.offset=0] - The search result at which to start the response, must be a multiple of limit
	 * @param {APIRequest~Callback} [callback] - passed the new comment data if it was posted successfully
	 * @returns {Promise<Object>} A promise resolving to the collection of search results
	 */
	query: function(searchString, options, callback) {

		var apiPath = urlPath(API_PATHS_SEARCH),
			qs = options || {};

		qs.query = searchString;

		if (qs.mdfilters) {
			if (Array.isArray(qs.mdfilters)) {
				qs.mdfilters = JSON.stringify(qs.mdfilters);
			} else {
				return Promise.reject(new Error('Invalid mdfilters parameter: must be a valid array')).asCallback(callback);
			}
		}

		var params = {
			qs: qs
		};
		return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
	}

};

module.exports = Search;

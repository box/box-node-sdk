/**
 * @fileoverview Manager for the Box Search Resource
 * @author djordan
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var API_PATHS_SEARCH = '/search';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

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
	 * Searches Box for the given query.
	 *
	 * @param {string} searchString - The query string to use for search
	 * @param {?Object} qs - Optional additional querystring to add to the request. Can be left null in most cases.
	 * @param {APIRequest~Callback} callback - passed the new comment data if it was posted successfully
	 * @returns {void}
	 */
	query: function(searchString, qs, callback) {
		qs = qs || {};
		qs.query = searchString;
		var params = {
			qs: qs
		};
		this.client.get(API_PATHS_SEARCH, params, this.client.defaultResponseHandler(callback));
	}

};

module.exports = Search;

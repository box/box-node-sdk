/**
 * @fileoverview Manager for the Box User Resource
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/users',
	EMAIL_ALIASES_SUBRESOURCE = 'email_aliases',
	MEMBERSHIPS_SUBRESOURCE = 'memberships',
	CURRENT_USER_ID = 'me';


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'User' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Users(client) {
	this.client = client;
}

/** @const {string} */
Users.prototype.CURRENT_USER_ID = CURRENT_USER_ID;

/**
 * Requests information for the Box user info associated with a given ID
 *
 * API Endpoint: '/users/:id'
 * Method: GET
 *
 * @param {string} id - The ID of the user to retrieve
 * @param {?Object} qs - Optional additional querystring to add to the request. Can be left null in most cases.
 * @param {Function} callback - passed the user info if it was acquired successfully
 * @returns {void}
 */
Users.prototype.get = function(id, qs, callback) {
	var apiPath = urlPath(BASE_PATH, id),
		params = {
			qs: qs
		};

	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Update some information about a user.
 *
 * API Endpoint: '/users/:id'
 * Method: PUT
 *
 * @param {string} id - The ID of the user to update
 * @param {?Object} options - User fields to update
 * @param {Function} callback - Passed the updated user information if it was acquired successfully
 * @returns {void}
 */
Users.prototype.update = function(id, options, callback) {
	var apiPath = urlPath(BASE_PATH, id),
		params = {
			body: options
		};

	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Get all linked email addresses for a user.
 * @NOTE(mwiller) 2014-06-10: This does not include their primary email address!
 *
 * API Endpoint: '/users/:id/email_aliases'
 * Method: GET
 *
 * @param {string} id - The ID of the user to retrieve email alises for
 * @param {Function} callback - Passed the email aliases if successful
 * @returns {void}
 */
Users.prototype.getEmailAliases = function(id, callback) {
	var apiPath = urlPath(BASE_PATH, id, EMAIL_ALIASES_SUBRESOURCE);
	this.client.get(apiPath, null, this.client.defaultResponseHandler(callback));
};

/**
 * Add a linked email address to a user's account.
 *
 * API Endpoint: '/users/:id/email_aliases'
 * Method: POST
 *
 * @param {string} id - The ID of the user to add an email alias to
 * @param {string} email - The email address to add
 * @param {Function} callback - Passed the new alias if successful
 * @returns {void}
 */
Users.prototype.addEmailAlias = function(id, email, callback) {
	var apiPath = urlPath(BASE_PATH, id, EMAIL_ALIASES_SUBRESOURCE),
		params = {
			body: {
				email: email,
				is_confirmed: false // don't attempt to autoconfirm aliases for admins
			}
		};

	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Remove a linked email address from the current user by alias ID.
 *
 * API Endpoint: '/users/:id/email_aliases/:aliasID'
 * Method: DELETE
 *
 * @param {string} userID - The ID of the user to remove the email alias from
 * @param {string} aliasID - The ID of the linked email alias to remove
 * @param {Function} callback - Passed nothing on success
 * @returns {void}
 */
Users.prototype.removeEmailAlias = function(userID, aliasID, callback) {
	var apiPath = urlPath(BASE_PATH, userID, EMAIL_ALIASES_SUBRESOURCE, aliasID);
	this.client.del(apiPath, null, this.client.defaultResponseHandler(callback));
};


/**
 * Retrieves all of the group memberships for a given user. Note this is only available to group admins.
 *
 * API Endpoint: '/users/:id/memberships'
 * Method: GET
 *
 * @param {string} userID - The ID of the user to retrieve group memberships for
 * @param {?Object} qs - Optional additional querystring to add to the request. Can be left null in most cases.
 * @param {Function} callback - Passed the group membership information if it was acquired successfully, error otherwise
 * @returns {void}
 */
Users.prototype.getMemberships = function(userID, qs, callback) {
	var apiPath = urlPath(BASE_PATH, userID, MEMBERSHIPS_SUBRESOURCE),
		params = {
			qs: qs
		};

	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

// @NOTE(fschott) 2014-05-06: Still need to implement get, edit, create, etc.
//  The problem is that they are only available to enterprise admins, so we'll
//  first need to figure out how we want to handle access to those methods.
//  Remove this comment once we have.

/**
 * @module box-node-sdk/lib/managers/users
 * @see {@Link Users}
 */
module.exports = Users;

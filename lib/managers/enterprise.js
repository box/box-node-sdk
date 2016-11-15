/**
 * @fileoverview Manager for Enterprise resources
 */

'use strict';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/** @typedef {string} EnterpriseUserType */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------
var USERS_PATH = '/users',
	INVITES_PATH = '/invites';

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

/**
 * Simple manager for interacting with all Enterprise endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Enterprise(client) {
	this.client = client;
}

/**
 * List of valid user types
 * @readonly
 * @enum {EnterpriseUserType}
 */
Enterprise.prototype.userTypes = Object.freeze({
	ALL: 'all',
	MANAGED: 'managed',
	EXTERNAL: 'external'
});

/**
 * Get a list of users in the current enterprise
 *
 * API Endpoint: '/users'
 * Method: GET
 *
 * @param {?Object} options - Optional parameters, can be left null in most cases
 * @param {string} [options.filter_term] - Filter the results to only users starting with the filter_term in either the name or the login
 * @param {int} [options.limit=100] - The number of records to return
 * @param {int} [options.offset=0] - The record at which to start
 * @param {EnterpriseUserType} [options.user_type=managed] - The type of user to search for
 * @param {Function} callback - Passed the list of users if successful, error otherwise
 * @returns {void}
 */
Enterprise.prototype.getUsers = function(options, callback) {

	var apiPath = urlPath(USERS_PATH),
		params = {
			qs: options
		};

	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Invites a user to join the enterprise
 *
 * API Endpoint: '/invites'
 * Method: POST
 *
 * @param {string} enterpriseID - The ID of the enterprise to invite the user to
 * @param {string} email - The email address of the user to invite
 * @param {Function} callback - Passed the invite object if successful, error otherwise
 * @returns {void}
 */
Enterprise.prototype.inviteUser = function(enterpriseID, email, callback) {

	var apiPath = urlPath(INVITES_PATH),
		params = {
			body: {
				enterprise: {
					id: enterpriseID
				},
				actionable_by: {
					login: email
				}
			}
		};

	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

module.exports = Enterprise;

/**
 * @fileoverview Manager for Enterprise resources
 */

'use strict';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/** @typedef {string} EnterpriseUserType */

/** @typedef {string} EnterpriseRole */

/** @typedef {string} EnterpriseUserStatus */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------
var USERS_PATH = '/users',
	INVITES_PATH = '/invites',
	FOLDERS_SUBRESOURCE = 'folders',
	ROOT_FOLDER_ID = '0';

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
 * List of valid user statuses
 * @readonly
 * @enum {EnterpriseUserStatus}
 */
Enterprise.prototype.userStatuses = Object.freeze({
	ACTIVE: 'active',
	INACTIVE: 'inactive',
	CANNOT_DELETE_OR_EDIT: 'cannot_delete_edit',
	CANNOT_DELETE_EDIT_OR_UPLOAD: 'cannot_delete_edit_upload'
});

/**
 * List of valid roles
 * @readonly
 * @enum {EnterpriseRole}
 */
Enterprise.prototype.userRoles = Object.freeze({
	USER: 'user',
	COADMIN: 'coadmin'
});

/**
 * Get a list of users in the current enterprise
 *
 * API Endpoint: '/users'
 * Method: GET
 *
 * @param {Object} [options] - Optional parameters, can be left null in most cases
 * @param {string} [options.filter_term] - Filter the results to only users starting with the filter_term in either the name or the login
 * @param {int} [options.limit=100] - The number of records to return
 * @param {int} [options.offset=0] - The record at which to start
 * @param {EnterpriseUserType} [options.user_type=managed] - The type of user to search for
 * @param {Function} [callback] - Passed the list of users if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the collection of users
 */
Enterprise.prototype.getUsers = function(options, callback) {

	var apiPath = urlPath(USERS_PATH),
		params = {
			qs: options
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Invites a user to join the enterprise
 *
 * API Endpoint: '/invites'
 * Method: POST
 *
 * @param {string} enterpriseID - The ID of the enterprise to invite the user to
 * @param {string} email - The email address of the user to invite
 * @param {Function} [callback] - Passed the invite object if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the invite object
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

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Create a new user in the current enterprise
 *
 * API Endpoint: '/users'
 * Method: POST
 *
 * @param {string} login - The email address this user uses to login
 * @param {string} name - The name of this user
 * @param {Object} [options] - Optional parameters, can be left null in most cases
 * @param {EnterpriseRole} [options.role] - This user’s enterprise role
 * @param {string} [options.language] - The user's language
 * @param {bool} [options.is_sync_enabled] - Whether or not this user can use Box Sync
 * @param {string} [options.job_title] - The user’s job title
 * @param {string} [options.phone] - The user’s phone number
 * @param {string} [options.address] - The user’s address
 * @param {int} [options.space_amount] - The user’s total available storage space in bytes
 * @param {Array} [options.tracking_codes] - An array of key/value pairs set by the user’s admin
 * @param {EnterpriseUserStatus} [options.status] - The user's status
 * @param {bool} [options.can_see_managed_users] - Whether the user should be able to see other managed users
 * @param {string} [options.timezone] - The user's timezone
 * @param {bool} [options.is_exempt_from_device_limits] - Whether to exempt this user from Enterprise device limits
 * @param {bool} [options.is_exempt_from_login_verification] - Whether or not this user must use two-factor authentication
 * @param {Function} [callback] - Passed the created user if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the created user
 */
Enterprise.prototype.addUser = function(login, name, options, callback) {

	var apiPath = urlPath(USERS_PATH),
		params = {
			body: {login, name}
		};

	Object.assign(params.body, options);

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Create a new app user in the current enterprise
 *
 * API Endpoint: '/users'
 * Method: POST
 *
 * @param {string} name - The name of this user
 * @param {Object} [options] - Optional parameters, can be left null in most cases
 * @param {string} [options.language] - The user's language
 * @param {string} [options.job_title] - The user’s job title
 * @param {string} [options.phone] - The user’s phone number
 * @param {string} [options.address] - The user’s address
 * @param {int} [options.space_amount] - The user’s total available storage space in bytes
 * @param {string} [options.timezone] - The user's timezone
 * @param {Function} [callback] - Passed the created user if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the created user
 */
Enterprise.prototype.addAppUser = function(name, options, callback) {

	var apiPath = urlPath(USERS_PATH),
		params = {
			body: {
				name,
				is_platform_access_only: true
			}
		};

	Object.assign(params.body, options);

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Transfers all of a user's files into another user's account.
 *
 * API Endpoint: '/users/:sourceUserID/folders/0'
 * Method: PUT
 *
 * @param {string} sourceUserID - The ID of the user whose files will be transferred
 * @param {string} destUserID - The ID of the user to transfer the files to
 * @param {Function} [callback] - Passed the new folder which contains all the files if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the folder containing the transferred content
 */
Enterprise.prototype.transferUserContent = function(sourceUserID, destUserID, callback) {

	var apiPath = urlPath(USERS_PATH, sourceUserID, FOLDERS_SUBRESOURCE, ROOT_FOLDER_ID),
		params = {
			body: {
				owned_by: {id: destUserID}
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

module.exports = Enterprise;

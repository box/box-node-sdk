/**
 * @fileoverview Manager for the Box Enterprise
 * @author ptoth
 */

'use strict';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------
/**
 * Enterprise user role
 * @typedef {string} EnterpriseUserRole
 */

/**
 * Enterprise user status
 * @typedef {string} EnterpriseUserStatus
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/users';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Enterprise' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Enterprise(client) {
	this.client = client;
}

/**
 * Enum of valid enterprise user statuses
 *
 * @readonly
 * @enum {EnterpriseUserStatus}
 */
Enterprise.prototype.userStatuses = Object.freeze({
	ACTIVE: 'active',
	INACTIVE: 'inactive',
	CANNOT_DELETE_EDIT: 'cannot_delete_edit',
	CANNOT_DELETE_EDIT_UPLOAD: 'cannot_delete_edit_upload'
});

/**
* Enum of valid enterprise user roles
*
* @readonly
* @enum {EnterpriseUserRole}
*/
Enterprise.prototype.userRoles = Object.freeze({
	COADMIN: 'coadmin',
	USER: 'user'
});

/**
 * Used to provision a new user in an enterprise. This method only works for enterprise admins.
 *
 * API Endpoint: '/users'
 * Method: POST
 *
 * @param {string} login - The email address this user uses to login
 * @param {string} name - The name of this user
 * @param {?Object} options - Additional parameters
 * @param {EnterpriseUserRole} [options.role=user] - This user’s enterprise role. Can be coadmin or user
 * @param {string} [options.language=gb] - The language of this user
 * @param {boolean} [options.is_sync_enabled=true] - Whether or not this user can use Box Sync
 * @param {string} [options.job_title] - The user’s job title
 * @param {string} [options.phone] - The user’s phone number
 * @param {string} [options.address] - The user’s address
 * @param {int} [options.space_amount=10737418240] - The user’s total available space amount in bytes
 * @param {Array} [options.tracking_codes] - An array of key/value pairs set by the user’s admin
 * @param {boolean} [options.can_see_managed_users=true] - Whether this user can see other enterprise users in its contact list
 * @param {EnterpriseUserStatus} [options.status=active] - Can be active, inactive, cannot_delete_edit, or cannot_delete_edit_upload.
 * @param {string} [options.timezone=America/Los_Angeles] - The timezone of this user
 * @param {boolean} [options.is_exempt_from_device_limits=false] - Whether to exempt this user from Enterprise device limits
 * @param {boolean} [options.is_exempt_from_login_verification=false] - Whether or not this user must use two-factor authentication
 * @param {Function} callback - Passed the new user information if it was acquired successfully, error otherwise
 * @returns {void}
 */
Enterprise.prototype.createUser = function(login, name, options, callback) {
	var apiPath = urlPath(BASE_PATH),
		params = {
			body: options || {}
		};

	params.body.login = login;
	params.body.name = name;

	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

module.exports = Enterprise;

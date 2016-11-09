/**
 * @fileoverview Manager for the Box Collaboration Resource
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/collaborations';


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Collaboration' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Collaborations(client) {
	this.client = client;
}

/**
 * Requests a collaboration object with a given ID.
 *
 * API Endpoint: '/collaborations/:collaborationID'
 * Method: GET
 *
 * @param {string} collaborationID - Box ID of the collaboration being requested
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the collaboration information if it was acquired successfully
 * @returns {void}
 */
Collaborations.prototype.get = function(collaborationID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, collaborationID);
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Gets a user's pending collaborations
 *
 * API Endpoint: '/collaborations'
 * Method: GET
 *
 * @param {Function} callback - Called with a collection of pending collaborations if successful
 * @returns {void}
 */
Collaborations.prototype.getPending = function(callback) {
	var params = {
		qs: {
			status: 'pending'
		}
	};
	this.client.get(BASE_PATH, params, this.client.defaultResponseHandler(callback));
};

/**
 * Update some information about a given collaboration.
 *
 * API Endpoint: '/collaborations/:collaborationID'
 * Method: PUT
 *
 * @param {string} collaborationID - Box ID of the collaboration being requested
 * @param {?Object} options - Fields of the collaboration to be updated
 * @param {Function} callback - Passed the updated collaboration information if it was acquired successfully
 * @returns {void}
 */
Collaborations.prototype.update = function(collaborationID, options, callback) {
	var params = {
		body: options
	};

	var apiPath = urlPath(BASE_PATH, collaborationID);
	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Update the status of a pending collaboration.
 *
 * API Endpoint: '/collaborations/:collaborationID'
 * Method: PUT
 *
 * @param {string} collaborationID - Box ID of the collaboration being requested
 * @param {string} newStatus - The new collaboration status ('accepted'/'rejected')
 * @param {Function} callback - Passed the updated collaboration information if it was acquired successfully
 * @returns {void}
 */
Collaborations.prototype.respondToPending = function(collaborationID, newStatus, callback) {
	var options = {
		status: newStatus
	};
	this.update(collaborationID, options, callback);
};

/**
 * Invite a collaborator to a folder. You'll have to create the 'accessible_by' input object
 * yourself, but the method allows for multiple types of collaborator invites. See
 * {@link http://developers.box.com/docs/#collaborations-add-a-collaboration} for formatting
 * help.
 *
 * API Endpoint: '/collaborations
 * Method: POST
 *
 * @param {Object} accessibleBy - The accessible_by object expected by the API
 * @param {string} folderID - Box ID of the folder to which the user should be invited
 * @param {CollaborationRole} role - The role which the invited collaborator should have
 * @param {Function} callback - Called with the new collaboration if successful
 * @returns {void}
 */
Collaborations.prototype.create = function(accessibleBy, folderID, role, callback) {
	var params = {
		body: {
			item: {
				type: 'folder',
				id: folderID
			},
			accessible_by: accessibleBy,
			role: role
		}
	};
	this.client.post(BASE_PATH, params, this.client.defaultResponseHandler(callback));
};

/**
 * Invite a user to collaborate on a folder via their user ID.
 *
 * API Endpoint: '/collaborations
 * Method: POST
 *
 * @param {int} userID - The ID of the user you'll invite as a collaborator
 * @param {string} folderID - Box ID of the folder to which the user should be invited
 * @param {CollaborationRole} role - The role which the invited collaborator should have
 * @param {Function} callback - Called with the new collaboration if successful
 * @returns {void}
 */
Collaborations.prototype.createWithUserID = function(userID, folderID, role, callback) {
	var accessibleBy = {
		type: 'user',
		id: userID
	};
	this.create(accessibleBy, folderID, role, callback);
};

/**
 * Invite a user to collaborate on a folder via their user login email address.
 *
 * API Endpoint: '/collaborations
 * Method: POST
 *
 * @param {string} email - The collaborator's email address
 * @param {string} folderID - Box ID of the folder to which the user should be invited
 * @param {CollaborationRole} role - The role which the invited collaborator should have
 * @param {Function} callback - Called with the new collaboration if successful
 * @returns {void}
 */
Collaborations.prototype.createWithUserEmail = function(email, folderID, role, callback) {
	var accessibleBy = {
		type: 'user',
		login: email
	};
	this.create(accessibleBy, folderID, role, callback);
};

/**
 * Invite a group to collaborate on a folder via their group ID.
 *
 * API Endpoint: '/collaborations
 * Method: POST
 *
 * @param {int} groupID - The ID of the group you'll invite as a collaborator
 * @param {string} folderID - Box ID of the folder to which the group should be invited
 * @param {CollaborationRole} role - The role which the invited collaborator should have
 * @param {Function} callback - Called with the new collaboration if successful
 * @returns {void}
 */
Collaborations.prototype.createWithGroupID = function(groupID, folderID, role, callback) {
	var accessibleBy = {
		type: 'group',
		id: groupID
	};
	this.create(accessibleBy, folderID, role, callback);
};

/**
 * Delete a given collaboration.
 *
 * API Endpoint: '/collaborations/:collaborationID'
 * Method: DELETE
 *
 * @param {string} collaborationID - Box ID of the collaboration being requested
 * @param {Function} callback - Empty response body passed if successful.
 * @returns {void}
 */
Collaborations.prototype.delete = function(collaborationID, callback) {

	var apiPath = urlPath(BASE_PATH, collaborationID);
	this.client.del(apiPath, null, this.client.defaultResponseHandler(callback));
};


/**
 * @module box-node-sdk/lib/managers/collaborations
 * @see {@Link Collaborations}
 */
module.exports = Collaborations;

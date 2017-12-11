/**
 * @fileoverview Manager for the Box Collaboration Whitelist Resource
 */

'use strict';
// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * Collaboration Whitelist parameter constant
 * @typedef {string} CollaborationWhitelistDirection Determines the type of restriction for whitelisting for a domain
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/collaboration_whitelist_entries',
	TARGET_ENTRY_PATH = '/collaboration_whitelist_exempt_targets';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Collaboration Whitelist' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function CollaborationWhitelists(client) {
	this.client = client;
}

/**
 * Enum of valid collaboration whitelist directions
 *
 * @readonly
 * @enum {CollaborationWhitelistDirection}
 */
CollaborationWhitelists.prototype.collaborationWhitelistDirections = {
	INBOUND: 'inbound',
	OUTBOUND: 'outbound',
	BOTH: 'both'
};

/**
 * Used to create a collaboration whitelist.
 *
 * API Endpoint: '/collaboration_whitelist_entries'
 * Method: POST
 *
 * @param {string} domain - The domain to be added to the whitelist
 * @param {CollaborationWhitelistDirection} direction - Inbound refers to collaboration actions within an enterprise. Outbound
 *                                                      refers to collaboration actions external to an enterprise. Both refers to
 *                                                      collaboration actions taken within and external to an enterprise
 * @param {Function} callback - Passed the collaboration whitelist information if it was created successfully
 * @returns {Promise<Object>} A promise resolve to the collaboration whitelist object
 */
CollaborationWhitelists.prototype.create = function(domain, direction, callback) {

	var params = {
		body: {
			domain: domain,
			direction: direction
		}
	};

	var apiPath = urlPath(BASE_PATH);
	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Requests a collaboration whitelist object with a given ID.
 *
 * API Endpoint: '/collaboration_whitelist_entries/:collaborationWhitelistID'
 * Method: GET
 *
 * @param {string} collaborationWhitelistID - Box ID of the collaboration whitelist being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the collaboration whitelist information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the collaboration whitelist object
 */
CollaborationWhitelists.prototype.get = function(collaborationWhitelistID, qs, callback) {

	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, collaborationWhitelistID);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Requests all collaboration whitelist objects within an enterprise.
 *
 * API Endpoint: '/collaboration_whitelist_entries'
 * Method: GET
 *
 * @param {Object} [options] - Additional options. Can be left null in most cases.
 * @param {string} [options.limit] - The number of collaboration whitelists to retrieve
 * @param {string} [options.nextMarker] - Paging marker, retrieve records starting at this position in the list
 * @param {Function} [callback] - Passed a list of collaboration whitelists if successful, error otherwise
 * @param {Promise<Object>} - A promise resolving to the collection of collaboration whitelists
 */
CollaborationWhitelists.prototype.getAll = function(options, callback) {

	var params = {
		qs: options
	};

	var apiPath = urlPath(BASE_PATH);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Delete a given collaboration whitelist.
 *
 * API Endpoint: '/collaboration_whitelist_entries/:collaborationWhitelistID'
 * Method: DELETE
 *
 * @param {string} collaborationWhitelistID - Box ID of the collaboration whitelist being requested
 * @param {Function} [callback] - Empty response body passed if successful.
 * @returns {Promise<void>} A promise resolving to nothing
 */
CollaborationWhitelists.prototype.delete = function(collaborationWhitelistID, callback) {

	var apiPath = urlPath(BASE_PATH, collaborationWhitelistID);
	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Adds a Box User to the collaboration whitelist.
 *
 * API Endpoint: '/collaboration_whitelist_exempt_targets'
 * Method: GET
 *
 * @param {string} userID - The ID of the Box User to be added to the whitelist
 * @param {Function} callback - Passed a collaboration whitelist for user if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to a user collaboration whitelist
 */
CollaborationWhitelists.prototype.addUser = function(userID, callback) {

	var params = {
		body: {
			user: {
				id: userID,
				type: 'user'
			}
		}
	};

	var apiPath = urlPath(TARGET_ENTRY_PATH);
	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Retrieves information about a collaboration whitelist for user by whitelist ID.
 *
 * API Endpoint: '/collaboration_whitelist_exempt_targets/:userWhitelistID'
 * Method: GET
 *
 * @param {string} userWhitelistID - The ID of the collaboration whitelist
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the collaboration whitelist information for a user if it was acquired successfully
 * @returns {Promise<Object>} - A promise resolving to the collaboration whitelist object
 */
CollaborationWhitelists.prototype.getForUser = function(userWhitelistID, qs, callback) {

	var params = {
		qs: qs
	};

	var apiPath = urlPath(TARGET_ENTRY_PATH, userWhitelistID);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Retrieves information for all user collaboration whitelists.
 *
 * API Endpoint: '/collaboration_whitelist_exempt_targets'
 * Method: GET
 *
 * @param {Object} [options] - Additional options. Can be left null in most cases.
 * @param {string} [options.limit] - The number of user collaboration whitelists to retrieve
 * @param {string} [options.nextMarker] - Paging marker, retrieve records starting at this position in the list
 * @param {Function} callback - Passed a list of user collaboration whitelists if successful, error otherwise
 * @returns {Promise<Object>} - A promise resolving to the collection of user collaboration whitelists
 */
CollaborationWhitelists.prototype.getAllForUsers = function(options, callback) {

	var params = {
		qs: options
	};

	var apiPath = urlPath(TARGET_ENTRY_PATH);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Delete a given user collaboration whitelist.
 *
 * API Endpoint: '/collaboration_whitelist_exempt_targets/:userCollaborationWhitelistID'
 * Method: DELETE
 *
 * @param {string} userCollaborationWhitelistID - Box ID of the user collaboration whitelist being requested
 * @param {Function} [callback] - Empty response body passed if successful.
 * @returns {Promise<void>} A promise resolving to nothing
 */
CollaborationWhitelists.prototype.deleteForUser = function(userCollaborationWhitelistID, callback) {

	var apiPath = urlPath(TARGET_ENTRY_PATH, userCollaborationWhitelistID);
	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * @module box-node-sdk/lib/managers/collaboration-whitelists
 * @see {@Link CollaborationWhitelists}
 */
module.exports = CollaborationWhitelists;

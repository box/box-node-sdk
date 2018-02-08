/**
 * @fileoverview Manager for the Storage Policies resource
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------
var BASE_PATH = '/storage_policies',
	ASSIGNMENTS_PATH = '/storage_policy_assignments';

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

/**
 * Simple manager for interacting with all Retention Policies endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function StoragePolicies(client) {
	this.client = client;
}

StoragePolicies.prototype = {

    /**
     * Get information about a specific storage policy
     * @param {string} storagePolicyID The ID of the storage policy
     * @param {Object} [options] Optional parameters
     * @param {string} [options.fields] Comma-separated list of fields of the storage policy to retrieve
     * @param {Function} [callback] Passed the storage policy object if successful
     * @returns {Promise<Object>} Promise resolving to the storage policy object
     */
    get(storagePolicyID, options, callback) {

        var apiPath = urlPath(BASE_PATH, storagePolicyID),
            params = {
                qs: options
            };

        this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
    },

    /**
     * Get all available storage policies for the enterprise
     * @param {Object} [options] Optional parameters
     * @param {string} [options.fields] Comma-separated list of fields of the storage policy to retrieve
     * @param {Function} [callback] Passed a collection of storage policies if successful
     * @returns {Promise<Object>} Promise resolving to the collection of storage policies
     */
    getAll(options, callback) {

        var apiPath = urlPath(BASE_PATH),
            params = {
                qs: options
            };
        
        this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
    },

    /**
     * Assign a storage policy to a user
     * @param {string} storagePolicyID The ID of the storage policy to assign
     * @param {string} userID The ID of the user to assign the storage policy to
     * @param {Function} [callback] Passed the assignment object if successful
     * @returns {Promise<Object>} Promise resolving to the assignment object
     */
    assign(storagePolicyID, userID, callback) {

        var apiPath = urlPath(ASSIGNMENTS_PATH),
            params = {
                body: {
                    storage_policy: {
                        type: 'storage_policy',
                        id: storagePolicyID
                    },
                    assigned_to: {
                        type: 'user',
                        id: userID
                    }
                }
            };

        this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
    },

    /**
     * Get information about a specific storage policy asisgnment by ID
     * @param {string} assignmentID The ID of the assignment
     * @param {Function} [callback] Passed the assignment object if successful
     * @returns {Promise<Object>} Promise resolving to the assignment object
     */
    getAssignment(assignmentID, callback) {

        var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID);

        this.client.wrapWithDefaultHandler(this.client.get)(apiPath, null, callback);
    },

    /**
     * Gets the storage policy assignment for a specific user
     * @param {string} userID The ID of the user
     * @param {Function} [callback] Passed the assignment object if successful
     * @returns {Promise<Object>} Promise resolving to the assignment object
     */
    getAssignmentForTarget(userID, callback) {

        var apiPath = urlPath(ASSIGNMENTS_PATH),
            params = {
                qs: {
                    resolved_for_type: 'user',
                    resolved_for_id: userID
                }
            };

        this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
    },

    /**
     * Update a storage policy assignment
     * @param {string} assignmentID The ID of the storage policy assignment to update
     * @param {Object} updates The updates fields to apply
     * @param {Function} [callback] Passed the updated assignment object if successful
     * @returns {Promise<Object>} Promise resolving to the updated assignment object
     */
    updateAssignment(assignmentID, updates, callback) {

        var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID),
            params = {
                body: updates
            };

        this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
    },

    /**
     * Remove a storage policy assignment, returning the user to the default policy
     * @param {string} assignmentID The ID of the assignment to remove
     * @param {Function} [callback] Passed nothing if successful
     * @returns {Promise<void>} Promise resolving if the removal succeeds
     */
    removeAssignment(assignmentID, callback) {

        var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID);

        this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
    }
};
/**
 * @fileoverview Manager for the Storage Policies resource
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var urlPath = require('../util/url-path'),
	httpStatus = require('http-status'),
	errors = require('../util/errors');

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

		return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
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

		return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
	},

	/**
     * Assign a storage policy to a user
     * @param {string} storagePolicyID The ID of the storage policy to assign
     * @param {string} userID The ID of the user to assign the storage policy to
     * @param {Function} [callback] Passed the assignment object if successful
     * @returns {Promise<Object>} Promise resolving to the assignment object
     */
	assign(storagePolicyID, userID, callback) {

		return this.getAssignmentForTarget(userID)
			.then(assignment => {
				// Check if the assignment is already correct
				if (assignment.storage_policy.id === storagePolicyID) {
					return assignment;
				}

				// If the assignment is to an enterprise, we need to create a new
				// assignment for the user
				if (assignment.assigned_to.type === 'enterprise') {
					return this.createAssignment(storagePolicyID, userID);
				}

				// Update the user's existing assignment
				var update = {
					storage_policy: {
						type: 'storage_policy',
						id: storagePolicyID
					}
				};
				return this.updateAssignment(assignment.id, update);
			})
			.asCallback(callback);
	},

	/**
     * Get information about a specific storage policy asisgnment by ID
     * @param {string} assignmentID The ID of the assignment
     * @param {Function} [callback] Passed the assignment object if successful
     * @returns {Promise<Object>} Promise resolving to the assignment object
     */
	getAssignment(assignmentID, callback) {

		var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID);

		return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, null, callback);
	},

	/**
     * Gets the storage policy assignment for a specific user
     * @param {string} targetID The ID of the target
     * @param {Object} [options] Optional parameters
     * @param {string} [options.targetType=user] The type of the assignment target to resolve for
     * @param {Function} [callback] Passed the assignment object if successful
     * @returns {Promise<Object>} Promise resolving to the assignment object
     */
	getAssignmentForTarget(targetID, options, callback) {

		options = Object.assign({ targetType: 'user' }, options);

		var apiPath = urlPath(ASSIGNMENTS_PATH),
			params = {
				qs: {
					resolved_for_type: options.targetType,
					resolved_for_id: targetID
				}
			};

		return this.client.get(apiPath, params)
			.then(response => {

				if (response.statusCode !== httpStatus.OK) {
					// Unexpected status code, throw an error
					throw errors.buildUnexpectedResponseError(response);
				}

				// Unwrap the collection and give back just the assignment object
				return response.body.entries[0];
			})
			.asCallback(callback);
	},

	/**
     * Create a new storage policy assignment to a user
     * @param {string} storagePolicyID The ID of the storage policy to assign
     * @param {string} userID The ID of the user to assign the storage policy to
     * @param {Function} [callback] Passed the assignment object if successful
     * @returns {Promise<Object>} Promise resolving to the assignment object
     */
	createAssignment(storagePolicyID, userID, callback) {

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

		return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
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

		return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
	},

	/**
     * Remove a storage policy assignment, returning the user to the default policy
     * @param {string} assignmentID The ID of the assignment to remove
     * @param {Function} [callback] Passed nothing if successful
     * @returns {Promise<void>} Promise resolving if the removal succeeds
     */
	removeAssignment(assignmentID, callback) {

		var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID);

		return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
	}
};

module.exports = StoragePolicies;

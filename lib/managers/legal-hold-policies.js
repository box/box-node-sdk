/**
 * @fileoverview Manager for the Legal Hold Policies Resource
 */

'use strict';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * Policy assignment types, which specify what type of object the hold applies to
 * @typedef {string} LegalHoldPolicyAssignmentType
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------
var BASE_PATH = '/legal_hold_policies',
	ASSIGNMENTS_PATH = '/legal_hold_policy_assignments',
	FILE_VERSION_LEGAL_HOLDS_PATH = '/file_version_legal_holds',
	ASSIGNMENTS_SUBRESOURCE = 'assignments';

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

/**
 * Simple manager for interacting with all Legal Holds endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function LegalHoldPolicies(client) {
	this.client = client;
}

/**
 * Enum of valid policy assignment types, which specify what object the policy applies to
 * @readonly
 * @enum {LegalHoldPolicyAssignmentType}
 */
LegalHoldPolicies.prototype.assignmentTypes = Object.freeze({
	FOLDER: 'folder',
	USER: 'user',
	FILE: 'file',
	FILE_VERSION: 'file_version'
});

/**
 * Used to create a single legal hold policy for an enterprise
 *
 * API Endpoint: '/legal_hold_policies'
 * Method: POST
 *
 * @param {string} name - The name of the legal hold policy to be created
 * @param {Object} [options] - Additional parameters
 * @param {string} [options.description] - Description of the legal hold policy
 * @param {string} [options.filter_started_at] - Date filter, any Custodian assignments will apply only to file versions created or uploaded inside of the date range
 * @param {string} [options.filter_ended_at] - Date filter, any Custodian assignments will apply only to file versions created or uploaded inside of the date range
 * @param {boolean} [options.is_ongoing] - After initialization, Assignments under this Policy will continue applying to files based on events, indefinitely
 * @param {Function} [callback] - Passed the new policy information if it was acquired successfully, error otherwise
 * @returns {Promise<Object>} A promise resolving to the created policy
 */
LegalHoldPolicies.prototype.create = function(name, options, callback) {
	var apiPath = urlPath(BASE_PATH),
		params = {
			body: options || {}
		};

	params.body.policy_name = name;

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Fetches details about a specific legal hold policy
 *
 * API Endpoint: '/legal_hold_policies/:policyID'
 * Method: GET
 *
 * @param {string} policyID - The Box ID of the legal hold policy being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring
 * @param {Function} [callback] - Passed the policy information if it was acquired successfully, error otherwise
 * @returns {Promise<Object>} A promise resolving to the policy object
 */
LegalHoldPolicies.prototype.get = function(policyID, qs, callback) {
	var apiPath = urlPath(BASE_PATH, policyID),
		params = {
			qs: qs
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Update or modify a legal hold policy.
 *
 * API Endpoint: '/legal_hold_policies/:policyID'
 * Method: PUT
 *
 * @param {string} policyID - The Box ID of the legal hold policy to update
 * @param {Object} options - The information to be updated
 * @param {string} [options.policy_name] - Name of Legal Hold Policy
 * @param {string} [options.description] - Description of Legal Hold Policy
 * @param {string} [options.release_notes] - Notes around why the policy was released
 * @param {Function} [callback] - Passed the updated policy information if it was acquired successfully, error otherwise
 * @returns {Promise<Object>} A promise resolving to the updated policy
 */
LegalHoldPolicies.prototype.update = function(policyID, options, callback) {

	var apiPath = urlPath(BASE_PATH, policyID),
		params = {
			body: options
		};

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Fetches a list of legal hold policies for the enterprise
 *
 * API Endpoint: '/legal_hold_policies'
 * Method: GET
 *
 * @param {Object} [qs] - Additional options can be passed with the request via querystring
 * @param {string} [qs.policy_name] - A full or partial name to filter the legal hold policies by
 * @param {int} [qs.limit] - Limit result size to this number
 * @param {string} [qs.marker] - Paging marker, leave blank to start at the first page
 * @param {Function} [callback] - Passed the policy objects if they were acquired successfully, error otherwise
 * @returns {Promise<Object>} A promise resolving to the collection of policies
 */
LegalHoldPolicies.prototype.getAll = function(qs, callback) {
	var apiPath = urlPath(BASE_PATH),
		params = {
			qs: qs
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Sends request to delete an existing legal hold policy. Note that this is an
 * asynchronous process - the policy will not be fully deleted yet when the
 * response comes back.
 *
 * API Endpoint: '/legal_hold_policies/:policyID'
 * Method: DELETE
 *
 * @param {string} policyID - The legal hold policy to delete
 * @param {Function} [callback] - Passed nothing if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
LegalHoldPolicies.prototype.delete = function(policyID, callback) {

	var apiPath = urlPath(BASE_PATH, policyID);

	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Fetch a list of assignments for a given legal hold policy
 *
 * API Endpoint: '/legal_hold_policies/:policyID/assignments'
 * Method: GET
 *
 * @param {string} policyID - The Box ID of the legal hold policy to get assignments for
 * @param {Object} [qs] - Additional options can be passed with the request via querystring
 * @param {LegalHoldPolicyAssignmentType} [qs.assign_to_type] - Filter assignments of this type only
  * @param {string} [qs.assign_to_id] - Filter assignments to this ID only. Note that this will only show assignments applied directly to this entity.
 * @param {Function} [callback] - Passed the assignment objects if they were acquired successfully, error otherwise
 * @returns {Promise<Object>} A promise resolving to the collection of policy assignments
 */
LegalHoldPolicies.prototype.getAssignments = function(policyID, qs, callback) {

	var apiPath = urlPath(BASE_PATH, policyID, ASSIGNMENTS_SUBRESOURCE),
		params = {
			qs: qs
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Assign a lehal hold policy to an object
 *
 * API Endpoint: '/legal_hold_policy_assignments
 * Method: POST
 *
 * @param {string} policyID - The ID of the policy to assign
 * @param {LegalHoldPolicyAssignmentType} assignType - The type of object the policy will be assigned to
 * @param {string} assignID - The Box ID of the object to assign the legal hold policy to
 * @param {Function} [callback] - Passed the new assignment object if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the created assignment object
 */
LegalHoldPolicies.prototype.assign = function(policyID, assignType, assignID, callback) {

	var apiPath = urlPath(ASSIGNMENTS_PATH),
		params = {
			body: {
				policy_id: policyID,
				assign_to: {
					type: assignType,
					id: assignID
				}
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Fetch a specific policy assignment
 *
 * API Endpoint: '/legal_hold_policy_assignments/:assignmentID'
 * Method: GET
 *
 * @param {string} assignmentID - The Box ID of the policy assignment object to fetch
 * @param {Object} [qs] - Additional options can be passed with the request via querystring
 * @param {Function} [callback] - Passed the assignment object if it was acquired successfully, error otherwise
 * @returns {Promise<Object>} A promise resolving to the assignment object
 */
LegalHoldPolicies.prototype.getAssignment = function(assignmentID, qs, callback) {

	var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID),
		params = {
			qs: qs
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Sends request to delete an existing legal hold policy. Note that this is an
 * asynchronous process - the policy will not be fully deleted yet when the
 * response comes back.
 *
 * API Endpoint: '/legal_hold_policy_assignments/:assignmentID'
 * Method: DELETE
 *
 * @param {string} assignmentID - The legal hold policy assignment to delete
 * @param {Function} [callback] - Passed nothing if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
LegalHoldPolicies.prototype.deleteAssignment = function(assignmentID, callback) {

	var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID);

	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Get the specific legal hold record for a held file version.
 *
 * API Endpoint: '/file_version_legal_holds/:legalHoldID'
 * Method: GET
 *
 * @param {string} legalHoldID - The ID for the file legal hold record to retrieve
 * @param {Object} [qs] - Additional options can be passed with the request via querystring
 * @param {Function} [callback] - Pass the file version legal hold record if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the legal hold record
 */
LegalHoldPolicies.prototype.getFileVersionLegalHold = function(legalHoldID, qs, callback) {

	var apiPath = urlPath(FILE_VERSION_LEGAL_HOLDS_PATH, legalHoldID),
		params = {
			qs: qs
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Get a list of legal hold records for held file versions in an enterprise.
 *
 * API Endpoint: '/file_version_legal_holds'
 * Method: GET
 *
 * @param {string} policyID - ID of Legal Hold Policy to get File Version Legal Holds for
 * @param {Object} [qs] - Additional options can be passed with the request via querystring
 * @param {Function} [callback] - Pass the file version legal holds records if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the collection of all file version legal holds
 */
LegalHoldPolicies.prototype.getAllFileVersionLegalHolds = function(policyID, qs, callback) {

	var apiPath = urlPath(FILE_VERSION_LEGAL_HOLDS_PATH),
		params = {
			qs: qs || {}
		};

	params.qs.policy_id = policyID;

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

module.exports = LegalHoldPolicies;

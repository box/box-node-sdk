/**
 * @fileoverview Manager for the Tasks Resource
 */

'use strict';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/** @typedef {string} TaskResolutionState */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------
var BASE_PATH = '/tasks',
	ASSIGNMENTS_SUBRESOURCE = 'assignments',
	ASSIGNMENTS_PATH = '/task_assignments',
	REVIEW_ACTION = 'review';

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Tasks' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Tasks(client) {
	this.client = client;
}

/**
 * Enum of valid task resolution states
 * @readonly
 * @enum {TaskResolutionState}
 */
Tasks.prototype.resolutionStates = Object.freeze({
	COMPLETE: 'completed',
	INCOMPLETE: 'incomplete',
	APPROVED: 'approved',
	REJECTED: 'rejected'
});

/**
 * Used to create a single task for single user on a single file.
 *
 * API Endpoint: '/tasks'
 * Method: POST
 *
 * @param {string} fileID - The ID of the item this task is for
 * @param {Object} [options] - Additional parameters
 * @param {string} [options.message] - An optional message to include with the task
 * @param {string} [options.due_at] - The day at which this task is due
 * @returns {Promise<Object>} A promise resolving to the created task object
 */
Tasks.prototype.create = function(fileID, options) {

	var apiPath = urlPath(BASE_PATH),
		params = {
			body: {
				item: {
					type: 'file',
					id: fileID
				},
				action: REVIEW_ACTION
			}
		};

	Object.assign(params.body, options);

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params);
};

/**
 * Fetches a specific task.
 *
 * API Endpoint: '/tasks/:taskID'
 * Method: GET
 *
 * @param {string} taskID - The Box ID of the task being requested
 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
 * @returns {Promise<Object>} A promise resolving to the task object
 */
Tasks.prototype.get = function(taskID, options) {

	var apiPath = urlPath(BASE_PATH, taskID),
		params = {
			qs: options
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params);
};

/**
 * Updates a specific task.
 *
 * API Endpoint: '/tasks/:taskID'
 * Method: PUT
 *
 * @param {string} taskID - The Box ID of the task being updated
 * @param {Object} updates - Fields of the task object to update
 * @param {string} [updates.message] - An optional message to include with the task
 * @param {string} [updates.due_at] - The day at which this task is due
 * @returns {Promise<Object>} A promise resolving to the updated task object
 */
Tasks.prototype.update = function(taskID, updates) {

	var apiPath = urlPath(BASE_PATH, taskID),
		params = {
			body: updates
		};

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params);
};

/**
 * Permanently deletes a specific task.
 *
 * API Endpoint: '/tasks/:taskID'
 * Method: DELETE
 *
 * @param {string} taskID - The Box ID of the task being deleted
 * @returns {Promise<void>} A promise resolving to nothing
 */
Tasks.prototype.delete = function(taskID) {

	var apiPath = urlPath(BASE_PATH, taskID);

	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath);
};

/**
 * Get a list of assignments for a given task
 *
 * API Endpoint: '/tasks/:taskID/assignments'
 * Method: GET
 *
 * @param {string} taskID - The Box ID of the task to get assignments for
 * @param {Object} [options] - Additional parameters, can be left null in most cases
 * @returns {Promise<Object>} A promise resolving to the collection of assignment objects
 */
Tasks.prototype.getAssignments = function(taskID, options) {

	var apiPath = urlPath(BASE_PATH, taskID, ASSIGNMENTS_SUBRESOURCE),
		params = {
			qs: options
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params);
};

/**
 * Get a specific task assignment
 *
 * API Endpoint: '/task_assignments/:assignmentID'
 * Method: GET
 *
 * @param {string} assignmentID - The Box ID of the task assignment to retrieve
 * @param {Object} [options] - Additional parameters, can be left null in most cases
 * @returns {Promise<Object>} A promise resolving to the assignment object
 */
Tasks.prototype.getAssignment = function(assignmentID, options) {

	var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID),
		params = {
			qs: options
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params);
};

/**
 * Assign a task to a specific user by ID
 *
 * API Endpoint: '/task_assignments'
 * Method: POST
 *
 * @param {string} taskID - The Box ID of the task to assign
 * @param {string} userID - The ID of the user to assign the task to
 * @returns {Promise<Object>} A promise resolving to the new assignment object
 */
Tasks.prototype.assignByUserID = function(taskID, userID) {

	var apiPath = urlPath(ASSIGNMENTS_PATH),
		params = {
			body: {
				task: {
					type: 'task',
					id: taskID
				},
				assign_to: {
					id: userID
				}
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params);
};

/**
 * Assign a task to a specific user by email address
 *
 * API Endpoint: '/task_assignments'
 * Method: POST
 *
 * @param {string} taskID - The Box ID of the task to assign
 * @param {string} email - The email address of the user to assign the task to
 * @returns {Promise<Object>} A promise resolving to the new assignment object
 */
Tasks.prototype.assignByEmail = function(taskID, email) {

	var apiPath = urlPath(ASSIGNMENTS_PATH),
		params = {
			body: {
				task: {
					type: 'task',
					id: taskID
				},
				assign_to: {
					login: email
				}
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params);
};

/**
 * Update a task assignment.  This is used to resolve or complete a task.
 *
 * API Endpoint: '/task_assignments/:assignmentID'
 * Method: PUT
 *
 * @param {string} assignmentID - The Box ID of the task assignment to update
 * @param {Object} options - The fields of the assignment to update
 * @param {string} [options.message] - A message from the assignee about this task
 * @param {TaskResolutionState} [options.resolution_state] - Resolution of the task
 * @returns {Promise<Object>} A promise resolving to the updated assignment object
 */
Tasks.prototype.updateAssignment = function(assignmentID, options) {

	var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID),
		params = {
			body: options
		};

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params);
};

/**
 * Delete a task assignment.  This unassigns a user from the related task.
 *
 * API Endpoint: '/task_assignments/:assignmentID'
 * Method: DELETE
 *
 * @param {string} assignmentID - The Box ID of the task assignment to delete
 * @returns {Promise<void>} A promise resolving to nothing
 */
Tasks.prototype.deleteAssignment = function(assignmentID) {

	var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID);

	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath);
};

module.exports = Tasks;

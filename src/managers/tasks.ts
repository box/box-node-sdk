/**
 * @fileoverview Manager for the Tasks Resource
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import BoxClient from '../box-client';
import urlPath from '../util/url-path';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * Enum of valid task resolution states
 * @readonly
 * @enum {TaskResolutionState}
 */
enum TaskResolutionState {
	COMPLETE = 'completed',
	INCOMPLETE = 'incomplete',
	APPROVED = 'approved',
	REJECTED = 'rejected',
}

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

const BASE_PATH = '/tasks',
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
class Tasks {
	client: BoxClient;

	resolutionStates!: typeof TaskResolutionState;

	constructor(client: BoxClient) {
		this.client = client;
	}

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
	 * @param {Function} [callback] - Passed the new task information if it was acquired successfully, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the created task object
	 */
	create(
		fileID: string,
		options?: {
			message?: string;
			due_at?: string;
		},
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH),
			params = {
				body: {
					item: {
						type: 'file',
						id: fileID,
					},
					action: REVIEW_ACTION,
				},
			};

		Object.assign(params.body, options);

		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Fetches a specific task.
	 *
	 * API Endpoint: '/tasks/:taskID'
	 * Method: GET
	 *
	 * @param {string} taskID - The Box ID of the task being requested
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the task information if it was acquired successfully, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the task object
	 */
	get(taskID: string, options?: Record<string, any>, callback?: Function) {
		var apiPath = urlPath(BASE_PATH, taskID),
			params = {
				qs: options,
			};

		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

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
	 * @param {Function} [callback] - Passed the updated task information if it was acquired successfully, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the updated task object
	 */
	update(
		taskID: string,
		updates?: {
			message?: string;
			due_at?: string;
		},
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, taskID),
			params = {
				body: updates,
			};

		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Permanently deletes a specific task.
	 *
	 * API Endpoint: '/tasks/:taskID'
	 * Method: DELETE
	 *
	 * @param {string} taskID - The Box ID of the task being deleted
	 * @param {Function} [callback] - Empty body passed if successful, error otherwise
	 * @returns {Promise<void>} A promise resolving to nothing
	 */
	delete(taskID: string, callback?: Function) {
		var apiPath = urlPath(BASE_PATH, taskID);

		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			null,
			callback
		);
	}

	/**
	 * Get a list of assignments for a given task
	 *
	 * API Endpoint: '/tasks/:taskID/assignments'
	 * Method: GET
	 *
	 * @param {string} taskID - The Box ID of the task to get assignments for
	 * @param {Object} [options] - Additional parameters, can be left null in most cases
	 * @param {Function} [callback] - Passed the list of assignments if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the collection of assignment objects
	 */
	getAssignments(
		taskID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, taskID, ASSIGNMENTS_SUBRESOURCE),
			params = {
				qs: options,
			};

		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Get a specific task assignment
	 *
	 * API Endpoint: '/task_assignments/:assignmentID'
	 * Method: GET
	 *
	 * @param {string} assignmentID - The Box ID of the task assignment to retrieve
	 * @param {Object} [options] - Additional parameters, can be left null in most cases
	 * @param {Function} [callback] - Passed the task assignment if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the assignment object
	 */
	getAssignment(
		assignmentID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID),
			params = {
				qs: options,
			};

		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Assign a task to a specific user by ID
	 *
	 * API Endpoint: '/task_assignments'
	 * Method: POST
	 *
	 * @param {string} taskID - The Box ID of the task to assign
	 * @param {string} userID - The ID of the user to assign the task to
	 * @param {Function} [callback] - Passed the task assignment if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the new assignment object
	 */
	assignByUserID(taskID: string, userID: string, callback?: Function) {
		var apiPath = urlPath(ASSIGNMENTS_PATH),
			params = {
				body: {
					task: {
						type: 'task',
						id: taskID,
					},
					assign_to: {
						id: userID,
					},
				},
			};

		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Assign a task to a specific user by email address
	 *
	 * API Endpoint: '/task_assignments'
	 * Method: POST
	 *
	 * @param {string} taskID - The Box ID of the task to assign
	 * @param {string} email - The email address of the user to assign the task to
	 * @param {Function} [callback] - Passed the task assignment if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the new assignment object
	 */
	assignByEmail(taskID: string, email: string, callback?: Function) {
		var apiPath = urlPath(ASSIGNMENTS_PATH),
			params = {
				body: {
					task: {
						type: 'task',
						id: taskID,
					},
					assign_to: {
						login: email,
					},
				},
			};

		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

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
	 * @param {Function} [callback] - Passed the updated task assignment if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the updated assignment object
	 */
	updateAssignment(
		assignmentID: string,
		options?: {
			message?: string;
			resolution_state?: TaskResolutionState;
		},
		callback?: Function
	) {
		var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID),
			params = {
				body: options,
			};

		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Delete a task assignment.  This unassigns a user from the related task.
	 *
	 * API Endpoint: '/task_assignments/:assignmentID'
	 * Method: DELETE
	 *
	 * @param {string} assignmentID - The Box ID of the task assignment to delete
	 * @param {Function} [callback] - Passed nothing if successful, error otherwise
	 * @returns {Promise<void>} A promise resolving to nothing
	 */
	deleteAssignment(assignmentID: string, callback?: Function) {
		var apiPath = urlPath(ASSIGNMENTS_PATH, assignmentID);

		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			null,
			callback
		);
	}
}

/**
 * Enum of valid task resolution states
 * @readonly
 * @enum {TaskResolutionState}
 */
Tasks.prototype.resolutionStates = TaskResolutionState;

export = Tasks;

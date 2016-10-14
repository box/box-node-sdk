/**
 * @fileoverview Manager for the Tasks Resource
 * @author ptoth
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/tasks',
	REVIEW_ACTION = 'review';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

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
 * Used to create a single task for single user on a single file.
 *
 * API Endpoint: '/tasks'
 * Method: POST
 *
 * @param {String} fileID - The ID of the item this task is for
 * @param {String} message - An optional message to include with the task
 * @param {String} dueAt - The day at which this task is due
 * @param {Function} callback - Passed the new task information if it was acquired successfully, error otherwise
 * @returns {void}
 */
Tasks.prototype.create = function(fileID, message, dueAt, callback) {
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

	if (message) {
		params.body.message = message;
	}

	if (dueAt) {
		params.body.due_at = dueAt;
	}

	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

module.exports = Tasks;

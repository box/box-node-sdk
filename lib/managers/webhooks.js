/**
 * @fileoverview Manager for the Box Webhooks resource
 */
'use strict';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * A webhook trigger type constant
 * @typedef {string} WebhookTriggerType
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var urlPath = require('../util/url-path');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

// Base path for all webhooks endpoints
var BASE_PATH = '/webhooks';

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Webhooks' endpoints and actions.
 *
 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
 * @constructor
 */
function Webhooks(client) {
	// Attach the client, for making API calls
	this.client = client;
}

/**
 * Enum of valid webhooks event triggers
 *
 * @readonly
 * @enum {WebhookTriggerType}
 */
Webhooks.prototype.triggerTypes = {
	FILE: {
		UPLOADED: 'FILE.UPLOADED',
		PREVIEWED: 'FILE.PREVIEWED',
		DOWNLOADED: 'FILE.DOWNLOADED',
		TRASHED: 'FILE.TRASHED',
		DELETED: 'FILE.DELETED',
		RESTORED: 'FILE.RESTORED',
		COPIED: 'FILE.COPIED',
		MOVED: 'FILE.MOVED',
		LOCKED: 'FILE.LOCKED',
		UNLOCKED: 'FILE.UNLOCKED'
	},
	COMMENT: {
		CREATED: 'COMMENT.CREATED',
		UPDATED: 'COMMENT.UPDATED',
		DELETED: 'COMMENT.DELETED'
	},
	TASK_ASSIGNMENT: {
		CREATED: 'TASK_ASSIGNMENT.CREATED',
		UPDATED: 'TASK_ASSIGNMENT.UPDATED'
	},
	METADATA_INSTANCE: {
		CREATED: 'METADATA_INSTANCE.CREATED',
		UPDATED: 'METADATA_INSTANCE.UPDATED',
		DELETED: 'METADATA_INSTANCE.DELETED'
	},
	FOLDER: {
		CREATED: 'FOLDER.CREATED',
		DOWNLOADED: 'FOLDER.DOWNLOADED',
		RESTORED: 'FOLDER.RESTORED',
		DELETED: 'FOLDER.DELETED',
		COPIED: 'FOLDER.COPIED',
		MOVED: 'FOLDER.MOVED'
	},
	WEBHOOK: {
		DELETED: 'WEBHOOK.DELETED'
	}
};

/**
 * Create a new webhook on a given Box object, specified by type and ID.
 *
 * API Endpoint: '/webhooks'
 * Method: POST
 *
 * @param {string} targetID - Box ID  of the item to create webhook on
 * @param {ItemType} targetType - Type of item the webhook will be created on
 * @param {string} notificationURL - The URL of your application where Box will notify you of events triggers
 * @param {WebhookTriggerType[]} triggerTypes - Array of event types that trigger notification for the target
 * @param {Function} callback - Passed the new webhook information if it was acquired successfully
 * @returns {void}
 */
Webhooks.prototype.create = function(targetID, targetType, notificationURL, triggerTypes, callback) {
	var params = {
		body: {
			target: {
				id: targetID,
				objectType: targetType
			},
			address: notificationURL,
			triggers: triggerTypes
		}
	};

	var apiPath = urlPath(BASE_PATH);
	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Returns a webhook object with the specified Webhook ID
 *
 * API Endpoint: '/webhooks/:webhookID'
 * Method: GET
 *
 * @param {string} webhookID - ID of the webhook to retrieve
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the webhook information if it was acquired successfully
 * @returns {void}
 */
Webhooks.prototype.get = function(webhookID, qs, callback) {
	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, webhookID);
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Get a list of webhooks that are active for the current application and user.
 *
 * API Endpoint: '/webhooks'
 * Method: GET
 *
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {int} [qs.limit=100] - The number of webhooks to return
 * @param {string} [qs.marker] - Pagination marker
 * @param {Function} callback - Passed the list of webhooks if successful, error otherwise
 * @returns {void}
 */
Webhooks.prototype.getAll = function(qs, callback) {
	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH);
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Update a webhook
 *
 * API Endpoint: '/webhooks/:webhookID'
 * Method: PUT
 *
 * @param {string} webhookID - The ID of the webhook to be updated
 * @param {Object} options - Webhook fields to update
 * @param {string} [options.address] - The new URL used by Box to send a notification when webhook is triggered
 * @param {WebhookTriggerType[]} [options.triggers] - The new events that triggers a notification
 * @param {Function} callback - Passed the updated webhook information if successful, error otherwise
 * @returns {void}
 */
Webhooks.prototype.update = function(webhookID, options, callback) {
	var apiPath = urlPath(BASE_PATH, webhookID),
		params = {
			body: options
		};

	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Delete a specifed webhook by ID
 *
 * API Endpoint: '/webhooks/:webhookID'
 * Method: DELETE
 *
 * @param {string} webhookID - ID of webhook to be deleted
 * @param {Function} callback - Empty response body passed if successful.
 * @returns {void}
 */
Webhooks.prototype.delete = function(webhookID, callback) {
	var apiPath = urlPath(BASE_PATH, webhookID);
	this.client.del(apiPath, null, this.client.defaultResponseHandler(callback));
};

/**
 * @module box-node-sdk/lib/managers/webhooks
 * @see {@Link Webhooks}
 */
module.exports = Webhooks;

/**
* @fileoverview Webhook for the Box Webhooks Resource
*/
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var urlPath = require('../util/url-path');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// Base path for all webhooks endpoints
var BASE_PATH = '/webhooks';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

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
* If an event trigger is successfully attached to a file or folder then a JSON object representing the
* webhook is returned to you.
*
* API Endpoint: '/webhooks'
* Method: POST
*
* @param {string} targetID - File or Folder ID to create webhook on
* @param {ItemType} targetType - Value of FILE or FOLDER
* @param {string} notificationURL - The url of your application where Box will notify you of events triggers
* @param {WebhookTriggerType[]} triggerTypes - Array of event types that trigger notification for the target
* @param {Function} callback - Passed the webhook information if it was acquired successfully
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
* Returns a response object of webhooks
*
* API Endpoint: '/webhooks'
* Method: GET
*
* @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
* @param {Function} callback - Passed the webhook information if it was acquired successfully
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
* Returns the updated webhook object if you change the URL Box sends notifications to or the events that triggers the
* notifications
*
* API Endpoint: '/webhooks/:webhookID'
* Method: PUT
*
* @param {string} webhookID - The ID of the webhook to be updated
* @param {Object} options - Webhook fields to update - address and triggers
* @param {string} [options.address] - The new URL used by Box to send a notification when webhook is triggered
* @param {webhookTriggerType[]} [options.trigger] - The new events that triggers a notification
* @param {Function} callback - Passed the webhook information if it was acquired successfully
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

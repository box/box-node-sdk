/**
* @Webhookoverview Manager for the Box Webhooks Resource
* @author ccheng
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
* Returns a webhook object if creation succeeds.
*
* API Endpoint: '/webhooks'
* Method: POST
*
* @param {string} id - File or Folder ID to create webhook on
* @param {string} type - Value of 'file' or 'folder'
* @param {string} notificationURL - The url of your application where Box will notify you of events triggers
* @param {string[]} triggerTypes - Array of event types that trigger notification for the target
* @param {Function} callback - Passed the file information if it was acquired successfully
* @returns {void}
*/
Webhooks.prototype.createWebhook = function(id, type, notificationURL, triggerTypes, callback) {
	var params = {
		body: {
			target: {
				id: id,
				type: type
			},
			address: notificationURL,
			triggers: triggerTypes
		}
	};

	var apiPath = urlPath(BASE_PATH);
	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
* Returns a webhook object
*
* API Endpoint: '/webhooks/ID'
* Method: GET
*
* @param {string} webhookID - ID of the webhook to retrieve
* @param {Function} callback - Passed the file information if it was acquired successfully
* @returns {void}
*/
Webhooks.prototype.getWebhook = function(webhookID, callback) {
	var apiPath = urlPath(BASE_PATH, webhookID);
	this.client.get(apiPath, this.client.defaultResponseHandler(callback));
};

/**
* Returns a response object of webhooks
*
* API Endpoint: '/webhooks?limit=AN_INTEGER&marker=A_STRING'
* Method: GET
*
* @param {Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
* @param {Function} callback - Passed the file information if it was acquired successfully
* @returns {void}
*/
Webhooks.prototype.getAllWebhooks = function(qs, callback) {
	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH);
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
* Returns the updated webhook object
*
* API Endpoint: '/webhooks/ID'
* Method: PUT
*
* @param {String} webhookID - The ID of the webhook to be updated
* @param {?Object} options - Webhook fields to update - address and triggers
* @param {Function} callback - Passed the file information if it was acquired successfully
* @returns {void}
*/
Webhooks.prototype.updateWebhook = function(webhookID, options, callback) {
	var apiPath = urlPath(BASE_PATH, webhookID),
		params = {
			body: options
		};

	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
* Delete a webhook
*
* API Endpoint: '/webhooks/ID'
* Method: DELETE
*
* @param {string} webhookID - ID of webhook to be deleted
* @param {Function} callback - Passed the file information if it was acquired successfully
* @returns {void}
*/
Webhooks.prototype.deleteWebhook = function(webhookID, callback) {
	var apiPath = urlPath(BASE_PATH, webhookID);
	this.client.del(apiPath, null, this.client.defaultResponseHandler(callback));
};

/**
* @module box-node-sdk/lib/managers/webhooks
* @see {@Link Files}
*/
module.exports = Webhooks;

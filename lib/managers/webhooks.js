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
const crypto = require('crypto');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

// Base path for all webhooks endpoints
var BASE_PATH = '/webhooks';

// This prevents replay attacks
const MAX_MESSAGE_AGE = 10 * 60; // 10 minutes

/**
 * Compute the message signature
 * @see {@Link https://docs.box.com/reference#signatures}
 *
 * @param {string} body - The request body of the webhook message
 * @param {Object} headers - The request headers of the webhook message
 * @param {?string} signatureKey - The signature to verify the message with
 * @returns {?string} - The message signature (or null, if it can't be computed)
 * @private
 */
function computeSignature(body, headers, signatureKey) {
	if (!signatureKey) {
		return null;
	}

	if (headers['box-signature-version'] !== '1') {
		return null;
	}

	if (headers['box-signature-algorithm'] !== 'HmacSHA256') {
		return null;
	}

	let hmac = crypto.createHmac('sha256', signatureKey);
	hmac.update(body);
	hmac.update(headers['box-delivery-timestamp']);

	const signature = hmac.digest('base64');

	return signature;
}

/**
 * Validate the message signature
 * @see {@Link https://docs.box.com/reference#signatures}
 *
 * @param {string} body - The request body of the webhook message
 * @param {Object} headers - The request headers of the webhook message
 * @param {string} primarySignatureKey - The primary signature to verify the message with
 * @param {string} [secondarySignatureKey] - The secondary signature to verify the message with
 * @returns {boolean} - True or false
 * @private
 */
function validateSignature(body, headers, primarySignatureKey, secondarySignatureKey) {
	// Either the primary or secondary signature must match the corresponding signature from Box
	// (The use of two signatures allows the signing keys to be rotated one at a time)
	const primarySignature = computeSignature(body, headers, primarySignatureKey);

	if (primarySignature && primarySignature === headers['box-signature-primary']) {
		return true;
	}

	const secondarySignature = computeSignature(body, headers, secondarySignatureKey);

	if (secondarySignature && secondarySignature === headers['box-signature-secondary']) {
		return true;
	}

	return false;
}

/**
 * Validate that the delivery timestamp is not too far in the past (to prevent replay attacks)
 *
 * @param {Object} headers - The request headers of the webhook message
 * @param {int} maxMessageAge - The maximum message age (in seconds)
 * @returns {boolean} - True or false
 * @private
 */
function validateDeliveryTimestamp(headers, maxMessageAge) {
	const deliveryTime = Date.parse(headers['box-delivery-timestamp']);
	const currentTime = Date.now();
	const messageAge = (currentTime - deliveryTime) / 1000;

	if (messageAge > maxMessageAge) {
		return false;
	}

	return true;
}

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
 * Primary signature key to protect webhooks against attacks.
 * @static
 * @type {?string}
 */
Webhooks.primarySignatureKey = null;

/**
 * Secondary signature key to protect webhooks against attacks.
 * @static
 * @type {?string}
 */
Webhooks.secondarySignatureKey = null;


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
 * @param {Function} [callback] - Passed the new webhook information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the new webhook object
 */
Webhooks.prototype.create = function(targetID, targetType, notificationURL, triggerTypes, callback) {
	var params = {
		body: {
			target: {
				id: targetID,
				type: targetType
			},
			address: notificationURL,
			triggers: triggerTypes
		}
	};

	var apiPath = urlPath(BASE_PATH);
	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Returns a webhook object with the specified Webhook ID
 *
 * API Endpoint: '/webhooks/:webhookID'
 * Method: GET
 *
 * @param {string} webhookID - ID of the webhook to retrieve
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the webhook information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the webhook object
 */
Webhooks.prototype.get = function(webhookID, qs, callback) {
	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, webhookID);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Get a list of webhooks that are active for the current application and user.
 *
 * API Endpoint: '/webhooks'
 * Method: GET
 *
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {int} [qs.limit=100] - The number of webhooks to return
 * @param {string} [qs.marker] - Pagination marker
 * @param {Function} [callback] - Passed the list of webhooks if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the collection of webhooks
 */
Webhooks.prototype.getAll = function(qs, callback) {
	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
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
 * @param {Function} [callback] - Passed the updated webhook information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the updated webhook object
 */
Webhooks.prototype.update = function(webhookID, options, callback) {
	var apiPath = urlPath(BASE_PATH, webhookID),
		params = {
			body: options
		};

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Delete a specified webhook by ID
 *
 * API Endpoint: '/webhooks/:webhookID'
 * Method: DELETE
 *
 * @param {string} webhookID - ID of webhook to be deleted
 * @param {Function} [callback] - Empty response body passed if successful.
 * @returns {Promise<void>} A promise resolving to nothing
 */
Webhooks.prototype.delete = function(webhookID, callback) {
	var apiPath = urlPath(BASE_PATH, webhookID);
	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Sets primary and secondary signatures that are used to verify the Webhooks messages
 *
 * @param {string} primaryKey - The primary signature to verify the message with
 * @param {string} [secondaryKey] - The secondary signature to verify the message with
 * @returns {void}
 */
Webhooks.setSignatureKeys = function(primaryKey, secondaryKey) {
	Webhooks.primarySignatureKey = primaryKey;

	if (typeof secondaryKey === 'string') {
		Webhooks.secondarySignatureKey = secondaryKey;
	}
};

/**
 * Validate a webhook message by verifying the signature and the delivery timestamp
 *
 * @param {string} body - The request body of the webhook message
 * @param {Object} headers - The request headers of the webhook message
 * @param {string} [primaryKey] - The primary signature to verify the message with. If it is sent as a parameter,
     it overrides the static variable primarySignatureKey
 * @param {string} [secondaryKey] - The secondary signature to verify the message with. If it is sent as a parameter,
     it overrides the static variable primarySignatureKey
 * @param {int} [maxMessageAge] - The maximum message age (in seconds).  Defaults to 10 minutes
 * @returns {boolean} - True or false
 */
Webhooks.validateMessage = function(body, headers, primaryKey, secondaryKey, maxMessageAge) {
	if (!primaryKey && Webhooks.primarySignatureKey) {
		primaryKey = Webhooks.primarySignatureKey;
	}

	if (!secondaryKey && Webhooks.secondarySignatureKey) {
		secondaryKey = Webhooks.secondarySignatureKey;
	}

	if (typeof maxMessageAge !== 'number') {
		maxMessageAge = MAX_MESSAGE_AGE;
	}

	if (!validateSignature(body, headers, primaryKey, secondaryKey)) {
		return false;
	}

	if (!validateDeliveryTimestamp(headers, maxMessageAge)) {
		return false;
	}

	return true;
};

Webhooks.prototype.validateMessage = Webhooks.validateMessage;

/**
 * @module box-node-sdk/lib/managers/webhooks
 * @see {@Link Webhooks}
 */
module.exports = Webhooks;

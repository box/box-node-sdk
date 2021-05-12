/**
 * @fileoverview Manager for the Box Webhooks resource
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import urlPath from '../util/url-path';
import crypto from 'crypto';
import BoxClient from '../box-client';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * A webhook trigger type constant
 * @typedef {string} WebhookTriggerType
 */

enum WebhookTriggerType {
	FILE_UPLOADED = 'FILE.UPLOADED',
	FILE_PREVIEWED = 'FILE.PREVIEWED',
	FILE_DOWNLOADED = 'FILE.DOWNLOADED',
	FILE_TRASHED = 'FILE.TRASHED',
	FILE_DELETED = 'FILE.DELETED',
	FILE_RESTORED = 'FILE.RESTORED',
	FILE_COPIED = 'FILE.COPIED',
	FILE_MOVED = 'FILE.MOVED',
	FILE_LOCKED = 'FILE.LOCKED',
	FILE_UNLOCKED = 'FILE.UNLOCKED',
	FILE_RENAMED = 'FILE.RENAMED',

	COMMENT_CREATED = 'COMMENT.CREATED',
	COMMENT_UPDATED = 'COMMENT.UPDATED',
	COMMENT_DELETED = 'COMMENT.DELETED',

	TASK_ASSIGNMENT_CREATED = 'TASK_ASSIGNMENT.CREATED',
	TASK_ASSIGNMENT_UPDATED = 'TASK_ASSIGNMENT.UPDATED',

	METADATA_INSTANCE_CREATED = 'METADATA_INSTANCE.CREATED',
	METADATA_INSTANCE_UPDATED = 'METADATA_INSTANCE.UPDATED',
	METADATA_INSTANCE_DELETED = 'METADATA_INSTANCE.DELETED',

	FOLDER_CREATED = 'FOLDER.CREATED',
	FOLDER_DOWNLOADED = 'FOLDER.DOWNLOADED',
	FOLDER_RESTORED = 'FOLDER.RESTORED',
	FOLDER_DELETED = 'FOLDER.DELETED',
	FOLDER_COPIED = 'FOLDER.COPIED',
	FOLDER_MOVED = 'FOLDER.MOVED',
	FOLDER_TRASHED = 'FOLDER.TRASHED',
	FOLDER_RENAMED = 'FOLDER.RENAMED',

	WEBHOOK_DELETED = 'WEBHOOK.DELETED',

	COLLABORATION_CREATED = 'COLLABORATION.CREATED',
	COLLABORATION_ACCEPTED = 'COLLABORATION.ACCEPTED',
	COLLABORATION_REJECTED = 'COLLABORATION.REJECTED',
	COLLABORATION_REMOVED = 'COLLABORATION.REMOVED',
	COLLABORATION_UPDATED = 'COLLABORATION.UPDATED',

	SHARED_LINK_DELETED = 'SHARED_LINK.DELETED',
	SHARED_LINK_CREATED = 'SHARED_LINK.CREATED',
	SHARED_LINK_UPDATED = 'SHARED_LINK.UPDATED',
}

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

// Base path for all webhooks endpoints
const BASE_PATH = '/webhooks';

// This prevents replay attacks
const MAX_MESSAGE_AGE = 10 * 60; // 10 minutes

/**
 * Compute the message signature
 * @see {@Link https://developer.box.com/en/guides/webhooks/handle/setup-signatures/}
 *
 * @param {string} body - The request body of the webhook message
 * @param {Object} headers - The request headers of the webhook message
 * @param {?string} signatureKey - The signature to verify the message with
 * @returns {?string} - The message signature (or null, if it can't be computed)
 * @private
 */
function computeSignature(
	body: string,
	headers: Record<string, any>,
	signatureKey?: string
) {
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
 * @see {@Link https://developer.box.com/en/guides/webhooks/handle/verify-signatures/}
 *
 * @param {string} body - The request body of the webhook message
 * @param {Object} headers - The request headers of the webhook message
 * @param {string} [primarySignatureKey] - The primary signature to verify the message with
 * @param {string} [secondarySignatureKey] - The secondary signature to verify the message with
 * @returns {boolean} - True or false
 * @private
 */
function validateSignature(
	body: string,
	headers: Record<string, any>,
	primarySignatureKey?: string,
	secondarySignatureKey?: string
) {
	// Either the primary or secondary signature must match the corresponding signature from Box
	// (The use of two signatures allows the signing keys to be rotated one at a time)
	const primarySignature = computeSignature(body, headers, primarySignatureKey);

	if (
		primarySignature &&
		primarySignature === headers['box-signature-primary']
	) {
		return true;
	}

	const secondarySignature = computeSignature(
		body,
		headers,
		secondarySignatureKey
	);

	if (
		secondarySignature &&
		secondarySignature === headers['box-signature-secondary']
	) {
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
function validateDeliveryTimestamp(
	headers: Record<string, any>,
	maxMessageAge: number
) {
	const deliveryTime = Date.parse(headers['box-delivery-timestamp']);
	const currentTime = Date.now();
	const messageAge = (currentTime - deliveryTime) / 1000;

	if (messageAge > maxMessageAge) {
		return false;
	}

	return true;
}

/**
 * Stringify JSON with escaped multibyte Unicode characters to ensure computed signatures match PHP's default behavior
 *
 * @param {Object} body - The parsed JSON object
 * @returns {string} - Stringified JSON with escaped multibyte Unicode characters
 * @private
 */
function jsonStringifyWithEscapedUnicode(body: object) {
	return JSON.stringify(body).replace(
		/[\u007f-\uffff]/g,
		(char) => `\\u${`0000${char.charCodeAt(0).toString(16)}`.slice(-4)}`
	);
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
class Webhooks {
	/**
	 * Primary signature key to protect webhooks against attacks.
	 * @static
	 * @type {?string}
	 */
	static primarySignatureKey: string | null = null;

	/**
	 * Secondary signature key to protect webhooks against attacks.
	 * @static
	 * @type {?string}
	 */
	static secondarySignatureKey: string | null = null;

	/**
	 * Sets primary and secondary signatures that are used to verify the Webhooks messages
	 *
	 * @param {string} primaryKey - The primary signature to verify the message with
	 * @param {string} [secondaryKey] - The secondary signature to verify the message with
	 * @returns {void}
	 */
	static setSignatureKeys(primaryKey: string, secondaryKey?: string) {
		Webhooks.primarySignatureKey = primaryKey;

		if (typeof secondaryKey === 'string') {
			Webhooks.secondarySignatureKey = secondaryKey;
		}
	}

	/**
	 * Validate a webhook message by verifying the signature and the delivery timestamp
	 *
	 * @param {string|Object} body - The request body of the webhook message
	 * @param {Object} headers - The request headers of the webhook message
	 * @param {string} [primaryKey] - The primary signature to verify the message with. If it is sent as a parameter,
		 it overrides the static variable primarySignatureKey
	* @param {string} [secondaryKey] - The secondary signature to verify the message with. If it is sent as a parameter,
		it overrides the static variable primarySignatureKey
	* @param {int} [maxMessageAge] - The maximum message age (in seconds).  Defaults to 10 minutes
	* @returns {boolean} - True or false
	*/
	static validateMessage(
		body: string | object,
		headers: Record<string, string>,
		primaryKey?: string,
		secondaryKey?: string,
		maxMessageAge?: number
	) {
		if (!primaryKey && Webhooks.primarySignatureKey) {
			primaryKey = Webhooks.primarySignatureKey;
		}

		if (!secondaryKey && Webhooks.secondarySignatureKey) {
			secondaryKey = Webhooks.secondarySignatureKey;
		}

		if (typeof maxMessageAge !== 'number') {
			maxMessageAge = MAX_MESSAGE_AGE;
		}

		// For frameworks like Express that automatically parse JSON
		// bodies into Objects, re-stringify for signature testing
		if (typeof body === 'object') {
			// Escape forward slashes to ensure a matching signature
			body = jsonStringifyWithEscapedUnicode(body).replace(/\//g, '\\/');
		}

		if (!validateSignature(body, headers, primaryKey, secondaryKey)) {
			return false;
		}

		if (!validateDeliveryTimestamp(headers, maxMessageAge)) {
			return false;
		}

		return true;
	}

	client: BoxClient;

	triggerTypes!: Record<
		| 'FILE'
		| 'COMMENT'
		| 'TASK_ASSIGNMENT'
		| 'METADATA_INSTANCE'
		| 'FOLDER'
		| 'WEBHOOK'
		| 'COLLABORATION'
		| 'SHARED_LINK',
		Record<string, WebhookTriggerType>
	>;
	validateMessage!: typeof Webhooks.validateMessage;

	constructor(client: BoxClient) {
		// Attach the client, for making API calls
		this.client = client;
	}

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
	create(
		targetID: string,
		targetType: string,
		notificationURL: string,
		triggerTypes: WebhookTriggerType[],
		callback?: Function
	) {
		var params = {
			body: {
				target: {
					id: targetID,
					type: targetType,
				},
				address: notificationURL,
				triggers: triggerTypes,
			},
		};

		var apiPath = urlPath(BASE_PATH);
		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Returns a webhook object with the specified Webhook ID
	 *
	 * API Endpoint: '/webhooks/:webhookID'
	 * Method: GET
	 *
	 * @param {string} webhookID - ID of the webhook to retrieve
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the webhook information if it was acquired successfully
	 * @returns {Promise<Object>} A promise resolving to the webhook object
	 */
	get(webhookID: string, options?: Record<string, any>, callback?: Function) {
		var params = {
			qs: options,
		};

		var apiPath = urlPath(BASE_PATH, webhookID);
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Get a list of webhooks that are active for the current application and user.
	 *
	 * API Endpoint: '/webhooks'
	 * Method: GET
	 *
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {int} [options.limit=100] - The number of webhooks to return
	 * @param {string} [options.marker] - Pagination marker
	 * @param {Function} [callback] - Passed the list of webhooks if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the collection of webhooks
	 */
	getAll(
		options?: {
			limit?: number;
			marker?: string;
		},
		callback?: Function
	) {
		var params = {
			qs: options,
		};

		var apiPath = urlPath(BASE_PATH);
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Update a webhook
	 *
	 * API Endpoint: '/webhooks/:webhookID'
	 * Method: PUT
	 *
	 * @param {string} webhookID - The ID of the webhook to be updated
	 * @param {Object} updates - Webhook fields to update
	 * @param {string} [updates.address] - The new URL used by Box to send a notification when webhook is triggered
	 * @param {WebhookTriggerType[]} [updates.triggers] - The new events that triggers a notification
	 * @param {Function} [callback] - Passed the updated webhook information if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the updated webhook object
	 */
	update(
		webhookID: string,
		updates?: {
			address?: string;
			triggers?: WebhookTriggerType[];
		},
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, webhookID),
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
	 * Delete a specified webhook by ID
	 *
	 * API Endpoint: '/webhooks/:webhookID'
	 * Method: DELETE
	 *
	 * @param {string} webhookID - ID of webhook to be deleted
	 * @param {Function} [callback] - Empty response body passed if successful.
	 * @returns {Promise<void>} A promise resolving to nothing
	 */
	delete(webhookID: string, callback?: Function) {
		var apiPath = urlPath(BASE_PATH, webhookID);
		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			null,
			callback
		);
	}
}

/**
 * Enum of valid webhooks event triggers
 *
 * @readonly
 * @enum {WebhookTriggerType}
 */
Webhooks.prototype.triggerTypes = {
	FILE: {
		UPLOADED: WebhookTriggerType.FILE_UPLOADED,
		PREVIEWED: WebhookTriggerType.FILE_PREVIEWED,
		DOWNLOADED: WebhookTriggerType.FILE_DOWNLOADED,
		TRASHED: WebhookTriggerType.FILE_TRASHED,
		DELETED: WebhookTriggerType.FILE_DELETED,
		RESTORED: WebhookTriggerType.FILE_RESTORED,
		COPIED: WebhookTriggerType.FILE_COPIED,
		MOVED: WebhookTriggerType.FILE_MOVED,
		LOCKED: WebhookTriggerType.FILE_LOCKED,
		UNLOCKED: WebhookTriggerType.FILE_UNLOCKED,
		RENAMED: WebhookTriggerType.FILE_RENAMED,
	},
	COMMENT: {
		CREATED: WebhookTriggerType.COMMENT_CREATED,
		UPDATED: WebhookTriggerType.COMMENT_UPDATED,
		DELETED: WebhookTriggerType.COMMENT_DELETED,
	},
	TASK_ASSIGNMENT: {
		CREATED: WebhookTriggerType.TASK_ASSIGNMENT_CREATED,
		UPDATED: WebhookTriggerType.TASK_ASSIGNMENT_UPDATED,
	},
	METADATA_INSTANCE: {
		CREATED: WebhookTriggerType.METADATA_INSTANCE_CREATED,
		UPDATED: WebhookTriggerType.METADATA_INSTANCE_UPDATED,
		DELETED: WebhookTriggerType.METADATA_INSTANCE_DELETED,
	},
	FOLDER: {
		CREATED: WebhookTriggerType.FOLDER_CREATED,
		DOWNLOADED: WebhookTriggerType.FOLDER_DOWNLOADED,
		RESTORED: WebhookTriggerType.FOLDER_RESTORED,
		DELETED: WebhookTriggerType.FOLDER_DELETED,
		COPIED: WebhookTriggerType.FOLDER_COPIED,
		MOVED: WebhookTriggerType.FOLDER_MOVED,
		TRASHED: WebhookTriggerType.FOLDER_TRASHED,
		RENAMED: WebhookTriggerType.FOLDER_RENAMED,
	},
	WEBHOOK: {
		DELETED: WebhookTriggerType.WEBHOOK_DELETED,
	},
	COLLABORATION: {
		CREATED: WebhookTriggerType.COLLABORATION_CREATED,
		ACCEPTED: WebhookTriggerType.COLLABORATION_ACCEPTED,
		REJECTED: WebhookTriggerType.COLLABORATION_REJECTED,
		REMOVED: WebhookTriggerType.COLLABORATION_REMOVED,
		UPDATED: WebhookTriggerType.COLLABORATION_UPDATED,
	},
	SHARED_LINK: {
		DELETED: WebhookTriggerType.SHARED_LINK_DELETED,
		CREATED: WebhookTriggerType.SHARED_LINK_CREATED,
		UPDATED: WebhookTriggerType.SHARED_LINK_UPDATED,
	},
};

Webhooks.prototype.validateMessage = Webhooks.validateMessage;

/**
 * @module box-node-sdk/lib/managers/webhooks
 * @see {@Link Webhooks}
 */
export = Webhooks;

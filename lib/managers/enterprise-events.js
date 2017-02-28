/**
 * @fileoverview Manager for the Box Enterprise Events Resource
 */

'use strict';

// ------------------------------------------------------------------------------
// Typedefs and Callbacks
// ------------------------------------------------------------------------------

/**
 * An enterprise event type constant
 * @typedef {string} EnterpriseEventType
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var EnterpriseEventStream = require('../enterprise-event-stream');

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Manager for interacting with Enterprise Events.
 *
 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
 * @constructor
 */
function EnterpriseEvents(client) {
	// Attach the client, for making API calls
	this.client = client;
}

/**
 * Get a chunk of enterprise events.
 *
 * API Endpoint: '/events'
 * Method: GET
 *
 * @param {Object?} options - Options
 * @param {int} [options.limit=100] - Number of events to return (max = 500)
 * @param {string} [options.streamPosition] - The stream position to start from (pass 0 for all past events)
 * @param {EnterpriseEventType[]} [options.eventTypeFilterArray] - Array of event types to include
 * @param {Date} [options.createdAfterDate] - Date of the earliest events to include
 * @param {Date} [options.createdBeforeDate] - Date of the latest events to include
 * @param {Function} callback - Passed the events if successful
 * @returns {void}
 */
EnterpriseEvents.prototype.get = function(options, callback) {
	const eventParams = {
		stream_type: 'admin_logs'
	};

	if (options) {
		if (options.limit) {
			eventParams.limit = options.limit;
		}

		if (options.streamPosition || options.streamPosition === 0) {
			eventParams.stream_position = options.streamPosition;
		}

		if (options.eventTypeFilterArray) {
			eventParams.event_type = options.eventTypeFilterArray.join(',');
		}

		if (options.createdAfterDate) {
			eventParams.created_after = options.createdAfterDate.toISOString();
		}

		if (options.createdBeforeDate) {
			eventParams.created_before = options.createdBeforeDate.toISOString();
		}
	}

	this.client.events.get(eventParams, callback);
};

/**
 * Create a stream of enterprise events.
 *
 * By default, the stream starts from the current time.
 * Pass 'startDate' to start from a specific time.
 * Pass 'streamPosition' to start from a previous stream position, or 0 for all available past events (~1 year).
 * If 'pollingInterval' = 0, then the stream will end when all available events have been delivered (no polling).
 *
 * @param {Object} [options] - Options
 * @param {string} [options.streamPosition] - The stream position to start from (pass 0 for all past events)
 * @param {Date} [options.startDate] - The Date to start from
 * @param {Date} [options.endDate] - The Date to end at
 * @param {EnterpriseEventType[]} [options.eventTypeFilterArray] - Array of event types to return
 * @param {int} [options.pollingInterval=60] - Polling interval (in seconds).  Pass 0 for no polling.
 * @param {int} [options.chunkSize=500] - Number of events to fetch per call (max = 500)
 * @returns {EnterpriseEventStream} - The enterprise events stream
 */
EnterpriseEvents.prototype.getEventStream = function(options) {
	return new EnterpriseEventStream(this.client, options);
};

/**
 * Enum of enterprise event types
 *
 * @readonly
 * @enum {EnterpriseEventType}
 */
EnterpriseEvents.prototype.types = {
	ADD_DEVICE_ASSOCIATION: 'ADD_DEVICE_ASSOCIATION',
	ADD_LOGIN_ACTIVITY_DEVICE: 'ADD_LOGIN_ACTIVITY_DEVICE',
	ADMIN_LOGIN: 'ADMIN_LOGIN',
	APPLICATION_PUBLIC_KEY_ADDED: 'APPLICATION_PUBLIC_KEY_ADDED',
	APPLICATION_PUBLIC_KEY_DELETED: 'APPLICATION_PUBLIC_KEY_DELETED',
	CHANGE_ADMIN_ROLE: 'CHANGE_ADMIN_ROLE',
	COLLABORATION_ACCEPT: 'COLLABORATION_ACCEPT',
	COLLABORATION_EXPIRATION: 'COLLABORATION_EXPIRATION',
	COLLABORATION_INVITE: 'COLLABORATION_INVITE',
	COLLABORATION_REMOVE: 'COLLABORATION_REMOVE',
	COLLABORATION_ROLE_CHANGE: 'COLLABORATION_ROLE_CHANGE',
	CONTENT_ACCESS: 'CONTENT_ACCESS',
	CONTENT_WORKFLOW_AUTOMATION_ADD: 'CONTENT_WORKFLOW_AUTOMATION_ADD',
	CONTENT_WORKFLOW_UPLOAD_POLICY_VIOLATION: 'CONTENT_WORKFLOW_UPLOAD_POLICY_VIOLATION',
	COPY: 'COPY',
	DELETE: 'DELETE',
	DELETE_USER: 'DELETE_USER',
	DOWNLOAD: 'DOWNLOAD',
	EDIT: 'EDIT',
	EDIT_USER: 'EDIT_USER',
	ENABLE_TWO_FACTOR_AUTH: 'ENABLE_TWO_FACTOR_AUTH',
	ENTERPRISE_APP_AUTHORIZATION_DELETE: 'ENTERPRISE_APP_AUTHORIZATION_DELETE',
	FAILED_LOGIN: 'FAILED_LOGIN',
	FILE_MARKED_MALICIOUS: 'FILE_MARKED_MALICIOUS',
	GROUP_ADD_FILE: 'GROUP_ADD_FILE',
	GROUP_ADD_FOLDER: 'GROUP_ADD_FOLDER',
	GROUP_ADD_USER: 'GROUP_ADD_USER',
	GROUP_CREATION: 'GROUP_CREATION',
	GROUP_DELETION: 'GROUP_DELETION',
	GROUP_EDITED: 'GROUP_EDITED',
	GROUP_REMOVE_FILE: 'GROUP_REMOVE_FILE',
	GROUP_REMOVE_FOLDER: 'GROUP_REMOVE_FOLDER',
	GROUP_REMOVE_USER: 'GROUP_REMOVE_USER',
	ITEM_MODIFY: 'ITEM_MODIFY',
	ITEM_OPEN: 'ITEM_OPEN',
	ITEM_SHARED_UPDATE: 'ITEM_SHARED_UPDATE',
	ITEM_SYNC: 'ITEM_SYNC',
	ITEM_UNSYNC: 'ITEM_UNSYNC',
	LOCK: 'LOCK',
	LOGIN: 'LOGIN',
	METADATA_INSTANCE_CREATE: 'METADATA_INSTANCE_CREATE',
	METADATA_INSTANCE_DELETE: 'METADATA_INSTANCE_DELETE',
	METADATA_INSTANCE_UPDATE: 'METADATA_INSTANCE_UPDATE',
	MOVE: 'MOVE',
	NEW_USER: 'NEW_USER',
	PREVIEW: 'PREVIEW',
	REMOVE_DEVICE_ASSOCIATION: 'REMOVE_DEVICE_ASSOCIATION',
	REMOVE_LOGIN_ACTIVITY_DEVICE: 'REMOVE_LOGIN_ACTIVITY_DEVICE',
	RENAME: 'RENAME',
	SHARE: 'SHARE',
	SHARE_EXPIRATION: 'SHARE_EXPIRATION',
	STORAGE_EXPIRATION: 'STORAGE_EXPIRATION',
	TASK_ASSIGNMENT_UPDATE: 'TASK_ASSIGNMENT_UPDATE',
	TERMS_OF_SERVICE_AGREE: 'TERMS_OF_SERVICE_AGREE',
	TERMS_OF_SERVICE_REJECT: 'TERMS_OF_SERVICE_REJECT',
	UNDELETE: 'UNDELETE',
	UNLOCK: 'UNLOCK',
	UNSHARE: 'UNSHARE',
	UPDATE_COLLABORATION_EXPIRATION: 'UPDATE_COLLABORATION_EXPIRATION',
	UPDATE_SHARE_EXPIRATION: 'UPDATE_SHARE_EXPIRATION',
	UPLOAD: 'UPLOAD'
};

/**
 * Returns event.source.id, event.source.item_id, or event.source.api_key.
 *
 * @param {Object} event - An enterprise event
 * @returns {string?} - The id of the source of the event
 */
EnterpriseEvents.prototype.getSourceID = function(event) {
	return event.source && (event.source.id || event.source.item_id || event.source.api_key);
};

/**
 * Returns event.source.type or event.source.item_type.

 * @param {Object} event - An enterprise event
 * @returns {string?} - The type of the source of the event
 */
EnterpriseEvents.prototype.getSourceType = function(event) {
	return event.source && (event.source.type || event.source.item_type);
};

/**
 * Returns event.source.name or event.source.item_name.

 * @param {Object} event - An enterprise event
 * @returns {string?} - The name of the source of the event
 */
EnterpriseEvents.prototype.getSourceName = function(event) {
	return event.source && (event.source.name || event.source.item_name);
};

/**
 * Returns a one-line description of an enterprise event (for debugging).  For example:
 *
 * 2017-01-01T00:00:00-08:00 DOWNLOAD file: "A File" (fileID) by "A User" (userID) using "An App" (serviceID)
 *
 * @param {Object} event - An enterprise event
 * @returns {string} - A short description of the event
 */
EnterpriseEvents.prototype.getDescription = function(event) {
	const createdAt = event.created_at;
	const eventType = event.event_type;

	// Normalize the source of the event (user, item, or application).
	const sourceID = this.getSourceID(event);
	const sourceType = this.getSourceType(event);
	const sourceName = this.getSourceName(event);

	// The user who performed the action.
	const createdByID = event.created_by.id;
	const createdByName = event.created_by.name;

	// The service (app) used to perform the action.
	const serviceID = event.additional_details && event.additional_details.service_id;
	const serviceName = event.additional_details && event.additional_details.service_name;

	// Return a short description of the event.
	let description;

	if (sourceID && serviceID) {
		description = `${createdAt} ${eventType} ${sourceType}: "${sourceName}" (${sourceID}) by "${createdByName}" (${createdByID}) using "${serviceName}" (${serviceID})`;
	} else if (sourceID) {
		description = `${createdAt} ${eventType} ${sourceType}: "${sourceName}" (${sourceID}) by "${createdByName}" (${createdByID})`;
	} else if (serviceID) {
		description = `${createdAt} ${eventType} by "${createdByName}" (${createdByID}) using "${serviceName}" (${serviceID})`;
	} else {
		description = `${createdAt} ${eventType} by "${createdByName}" (${createdByID})`;
	}

	return description;
};

module.exports = EnterpriseEvents;

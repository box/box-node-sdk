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
 * @param {string} [options.streamPosition] - The stream position to start from (pass '0' for all past events)
 * @param {string} [options.eventTypeFilter] - Comma-separated list of event types to return
 * @param {string} [options.createdAfter] - Date of the earliest events to include
 * @param {string} [options.createdBefore] - Date of the latest events to include
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

		// Handle the case where the caller passes streamPosition === 0 instead of streamPosition === '0'.
		if (options.streamPosition || options.streamPosition === 0) {
			eventParams.stream_position = options.streamPosition;
		}

		if (options.eventTypeFilter) {
			eventParams.event_type = options.eventTypeFilter;
		}

		if (options.createdAfter) {
			eventParams.created_after = options.createdAfter;
		}

		if (options.createdBefore) {
			eventParams.created_before = options.createdBefore;
		}
	}

	this.client.events.get(eventParams, callback);
};

/**
 * Create a stream of enterprise events.
 *
 * By default, the stream starts from the current time.
 * Pass 'startDate' to start from a specific time.
 * Pass 'streamPosition' to start from a previous stream position, or '0' for all available past events (~1 year).
 * Once the stream catches up to the current time, it will begin polling every 'pollingInterval' seconds.
 * If 'pollingInterval' = 0, then the stream will end when it catches up to the current time (no polling).
 *
 * @param {Object} [options] - Options
 * @param {string} [options.streamPosition] - The stream position to start from (pass '0' for all past events)
 * @param {string} [options.startDate] - The date to start from
 * @param {string} [options.endDate] - The date to end at
 * @param {string} [options.eventTypeFilter] - Comma-separated list of event types to return
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
	GROUP_ADD_ITEM: 'GROUP_ADD_ITEM',
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
	METADATA_TEMPLATE_CREATE: 'METADATA_TEMPLATE_CREATE',
	METADATA_TEMPLATE_UPDATE: 'METADATA_TEMPLATE_UPDATE',
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

module.exports = EnterpriseEvents;

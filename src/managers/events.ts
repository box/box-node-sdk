/**
 * @fileoverview Manager for the Box Events Resource
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import { Promise } from 'bluebird';
import httpStatusCodes from 'http-status';
import BoxClient from '../box-client';
import errors from '../util/errors';
import urlPath from '../util/url-path';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * Enum of enterprise event types
 *
 * @readonly
 * @enum {EventType}
 */
enum EventType {
	ADD_DEVICE_ASSOCIATION = 'ADD_DEVICE_ASSOCIATION',
	ADD_LOGIN_ACTIVITY_DEVICE = 'ADD_LOGIN_ACTIVITY_DEVICE',
	ADMIN_LOGIN = 'ADMIN_LOGIN',
	APPLICATION_PUBLIC_KEY_ADDED = 'APPLICATION_PUBLIC_KEY_ADDED',
	APPLICATION_PUBLIC_KEY_DELETED = 'APPLICATION_PUBLIC_KEY_DELETED',
	CHANGE_ADMIN_ROLE = 'CHANGE_ADMIN_ROLE',
	COLLABORATION_ACCEPT = 'COLLABORATION_ACCEPT',
	COLLABORATION_EXPIRATION = 'COLLABORATION_EXPIRATION',
	COLLABORATION_INVITE = 'COLLABORATION_INVITE',
	COLLABORATION_REMOVE = 'COLLABORATION_REMOVE',
	COLLABORATION_ROLE_CHANGE = 'COLLABORATION_ROLE_CHANGE',
	COMMENT_CREATE = 'COMMENT_CREATE',
	COMMENT_DELETE = 'COMMENT_DELETE',
	COMMENT_EDIT = 'COMMENT_EDIT',
	CONTENT_ACCESS = 'CONTENT_ACCESS',
	CONTENT_WORKFLOW_AUTOMATION_ADD = 'CONTENT_WORKFLOW_AUTOMATION_ADD',
	CONTENT_WORKFLOW_UPLOAD_POLICY_VIOLATION = 'CONTENT_WORKFLOW_UPLOAD_POLICY_VIOLATION',
	COPY = 'COPY',
	DELETE = 'DELETE',
	DELETE_USER = 'DELETE_USER',
	DOWNLOAD = 'DOWNLOAD',
	EDIT = 'EDIT',
	EDIT_USER = 'EDIT_USER',
	EMAIL_ALIAS_CONFIRM = 'EMAIL_ALIAS_CONFIRM',
	ENABLE_TWO_FACTOR_AUTH = 'ENABLE_TWO_FACTOR_AUTH',
	ENTERPRISE_APP_AUTHORIZATION_DELETE = 'ENTERPRISE_APP_AUTHORIZATION_DELETE',
	FAILED_LOGIN = 'FAILED_LOGIN',
	FILE_MARKED_MALICIOUS = 'FILE_MARKED_MALICIOUS',
	FILE_WATERMARKED_DOWNLOAD = 'FILE_WATERMARKED_DOWNLOAD',
	GROUP_ADD_FILE = 'GROUP_ADD_FILE',
	GROUP_ADD_FOLDER = 'GROUP_ADD_FOLDER',
	GROUP_ADD_ITEM = 'GROUP_ADD_ITEM',
	GROUP_ADD_USER = 'GROUP_ADD_USER',
	GROUP_CREATION = 'GROUP_CREATION',
	GROUP_DELETION = 'GROUP_DELETION',
	GROUP_EDITED = 'GROUP_EDITED',
	GROUP_REMOVE_FILE = 'GROUP_REMOVE_FILE',
	GROUP_REMOVE_FOLDER = 'GROUP_REMOVE_FOLDER',
	GROUP_REMOVE_USER = 'GROUP_REMOVE_USER',
	ITEM_MODIFY = 'ITEM_MODIFY',
	ITEM_OPEN = 'ITEM_OPEN',
	ITEM_SHARED_UPDATE = 'ITEM_SHARED_UPDATE',
	ITEM_SYNC = 'ITEM_SYNC',
	ITEM_UNSYNC = 'ITEM_UNSYNC',
	LOCK = 'LOCK',
	LOGIN = 'LOGIN',
	METADATA_INSTANCE_CREATE = 'METADATA_INSTANCE_CREATE',
	METADATA_INSTANCE_DELETE = 'METADATA_INSTANCE_DELETE',
	METADATA_INSTANCE_UPDATE = 'METADATA_INSTANCE_UPDATE',
	METADATA_TEMPLATE_CREATE = 'METADATA_TEMPLATE_CREATE',
	METADATA_TEMPLATE_UPDATE = 'METADATA_TEMPLATE_UPDATE',
	MOVE = 'MOVE',
	NEW_USER = 'NEW_USER',
	PREVIEW = 'PREVIEW',
	REMOVE_DEVICE_ASSOCIATION = 'REMOVE_DEVICE_ASSOCIATION',
	REMOVE_LOGIN_ACTIVITY_DEVICE = 'REMOVE_LOGIN_ACTIVITY_DEVICE',
	RENAME = 'RENAME',
	SHARE = 'SHARE',
	SHARE_EXPIRATION = 'SHARE_EXPIRATION',
	STORAGE_EXPIRATION = 'STORAGE_EXPIRATION',
	TASK_ASSIGNMENT_CREATE = 'TASK_ASSIGNMENT_CREATE',
	TASK_ASSIGNMENT_UPDATE = 'TASK_ASSIGNMENT_UPDATE',
	TASK_CREATE = 'TASK_CREATE',
	TERMS_OF_SERVICE_AGREE = 'TERMS_OF_SERVICE_AGREE',
	TERMS_OF_SERVICE_REJECT = 'TERMS_OF_SERVICE_REJECT',
	UNDELETE = 'UNDELETE',
	UNLOCK = 'UNLOCK',
	UNSHARE = 'UNSHARE',
	UPDATE_COLLABORATION_EXPIRATION = 'UPDATE_COLLABORATION_EXPIRATION',
	UPDATE_SHARE_EXPIRATION = 'UPDATE_SHARE_EXPIRATION',
	UPLOAD = 'UPLOAD',
	WATERMARK_LABEL_CREATE = 'WATERMARK_LABEL_CREATE',
	WATERMARK_LABEL_DELETE = 'WATERMARK_LABEL_DELETE',
}

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var EventStream = require('../event-stream'),
	EnterpriseEventStream = require('../enterprise-event-stream');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// Base path for all files endpoints
const BASE_PATH = '/events';

/** @const {string} */
const CURRENT_STREAM_POSITION = 'now';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Events' endpoints and actions.
 *
 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
 * @constructor
 */
class Events {
	client: BoxClient;

	CURRENT_STREAM_POSITION!: string;
	enterpriseEventTypes!: typeof EventType;

	constructor(client: BoxClient) {
		// Attach the client, for making API calls
		this.client = client;
	}

	/**
	 * Get the current stream position.
	 *
	 * API Endpoint: '/events'
	 * Method: GET
	 *
	 * @param {Function} [callback] Passed the current stream position if successful
	 * @returns {Promise<string>} A promise resolving to the stream position
	 */
	getCurrentStreamPosition(callback?: Function) {
		var params = {
			qs: {
				stream_position: CURRENT_STREAM_POSITION,
			},
		};
		var apiPath = urlPath(BASE_PATH);
		return this.client
			.get(apiPath, params)
			.then((response: any /* FIXME */) => {
				if (response.statusCode !== httpStatusCodes.OK) {
					throw errors.buildUnexpectedResponseError(response);
				}

				return response.body.next_stream_position;
			})
			.asCallback(callback);
	}

	/**
	 * Get a chunk of events
	 *
	 * API Endpoint: '/events'
	 * Method: GET
	 *
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] Passed the current stream position if successful
	 * @returns {Promise<Object>} A promise resolving to the collection of events
	 */
	get(options?: Record<string, any>, callback?: Function) {
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
	 * Get information for long-polling until new events are available
	 *
	 * API Endpoint: '/events'
	 * Method: OPTIONS
	 *
	 * @param {Function} [callback] Passed the long poll info if successful
	 * @returns {Promise<Object>} A promise resolving to the long poll info
	 */
	getLongPollInfo(callback?: Function) {
		var apiPath = urlPath(BASE_PATH);
		return this.client
			.options(apiPath, {})
			.then((response: any /* FIXME */) => {
				if (response.statusCode !== httpStatusCodes.OK) {
					throw errors.buildUnexpectedResponseError(response);
				}

				var longpollInfo = response.body.entries.find(
					(entry: any /* FIXME */) => entry.type === 'realtime_server'
				);

				if (!longpollInfo) {
					throw errors.buildResponseError(
						'No valid long poll server specified',
						response
					);
				}

				return longpollInfo;
			})
			.asCallback(callback);
	}

	/**
	 * Create a stream of events, using the long-poll API to wait for new events.
	 *
	 * API Endpoint: '/events'
	 * Method: OPTIONS
	 *
	 * @param {string} [streamPosition] Starting stream position
	 * @param {Object} [options] Optional parameters for the event stream
	 * @param {int} [options.retryDelay=1000] Number of ms to wait before retrying after an error
	 * @param {int} [options.deduplicationFilterSize=5000] Number of IDs to track for deduplication
	 * @param {int} [options.fetchInterval=1000] Minimunm number of ms between calls for more events
	 * @param {Function} [callback] Passed the events stream if successful
	 * @returns {Promise<EventStream>} A promise resolving to the event stream
	 */
	getEventStream(
		streamPosition: string,
		options?: {
			retryDelay?: number;
			deduplicationFilterSize?: number;
			fetchInterval?: number;
		},
		callback?: Function
	) {
		var self = this;
		if (typeof streamPosition === 'string') {
			if (typeof options === 'function') {
				callback = options;
				options = {};
			}

			return Promise.resolve(
				new EventStream(self.client, streamPosition, options)
			).asCallback(callback);
		}

		// Fix up optional arguments
		callback = options as any /* FIXME */;
		options = streamPosition;
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		return this.getCurrentStreamPosition()
			.then(
				(currentStreamPosition: any /* FIXME */) =>
					new EventStream(self.client, currentStreamPosition, options)
			)
			.asCallback(callback);
	}

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
	 * @param {EventType[]} [options.eventTypeFilter] - Array of event types to return
	 * @param {int} [options.pollingInterval=60] - Polling interval (in seconds).  Pass 0 for no polling.
	 * @param {int} [options.chunkSize=500] - Number of events to fetch per call (max = 500)
	 * @param {Function} [callback] Passed the events stream if successful
	 * @returns {Promise<EnterpriseEventStream>} A promise resolving to the enterprise event stream
	 */
	getEnterpriseEventStream(
		options?: {
			streamPosition?: string;
			startDate?: string;
			endDate?: string;
			eventTypeFilter?: EventType[];
			pollingInterval?: number;
			chunkSize?: number;
		},
		callback?: Function
	) {
		var self = this;
		return Promise.resolve(
			new EnterpriseEventStream(self.client, options)
		).asCallback(callback);
	}
}

Events.prototype.CURRENT_STREAM_POSITION = CURRENT_STREAM_POSITION;

Events.prototype.enterpriseEventTypes = EventType;

export = Events;

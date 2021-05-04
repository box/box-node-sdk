/**
 * @fileoverview Manager for the Box Collaboration Resource
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import BoxClient from '../box-client';
import urlPath from '../util/url-path';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

type CollaborationRole = any /* FIXME */;
type ItemType = 'folder' | string /* FIXME */;

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
const BASE_PATH = '/collaborations';

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Collaboration' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
class Collaborations {
	client: BoxClient;

	constructor(client: BoxClient) {
		this.client = client;
	}

	/**
	 * Requests a collaboration object with a given ID.
	 *
	 * API Endpoint: '/collaborations/:collaborationID'
	 * Method: GET
	 *
	 * @param {string} collaborationID - Box ID of the collaboration being requested
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the collaboration information if it was acquired successfully
	 * @returns {Promise<Object>} A promise resolving to the collaboration object
	 */
	get(
		collaborationID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var params = {
			qs: options,
		};
		var apiPath = urlPath(BASE_PATH, collaborationID);
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Gets a user's pending collaborations
	 *
	 * API Endpoint: '/collaborations'
	 * Method: GET
	 *
	 * @param {Function} [callback] - Called with a collection of pending collaborations if successful
	 * @returns {Promise<Object>} A promise resolving to the collection of pending collaborations
	 */
	getPending(callback?: Function) {
		var params = {
			qs: {
				status: 'pending',
			},
		};
		return this.client.wrapWithDefaultHandler(this.client.get)(
			BASE_PATH,
			params,
			callback
		);
	}

	/**
	 * Update some information about a given collaboration.
	 *
	 * API Endpoint: '/collaborations/:collaborationID'
	 * Method: PUT
	 *
	 * @param {string} collaborationID - Box ID of the collaboration being requested
	 * @param {Object} updates - Fields of the collaboration to be updated
	 * @param {Function} [callback] - Passed the updated collaboration information if it was acquired successfully
	 * @returns {Promise<Object>} A promise resolving to the updated collaboration object
	 */
	update(
		collaborationID: string,
		updates: Record<string, any>,
		callback?: Function
	) {
		var params = {
			body: updates,
		};

		var apiPath = urlPath(BASE_PATH, collaborationID);
		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Update the status of a pending collaboration.
	 *
	 * API Endpoint: '/collaborations/:collaborationID'
	 * Method: PUT
	 *
	 * @param {string} collaborationID - Box ID of the collaboration being requested
	 * @param {string} newStatus - The new collaboration status ('accepted'/'rejected')
	 * @param {Function} [callback] - Passed the updated collaboration information if it was acquired successfully
	 * @returns {Promise<Object>} A promise resolving to the accepted collaboration object
	 */
	respondToPending(
		collaborationID: string,
		newStatus: string,
		callback?: Function
	) {
		var options = {
			status: newStatus,
		};
		return this.update(collaborationID, options, callback);
	}

	/**
	 * Invite a collaborator to a folder. You'll have to create the 'accessible_by' input object
	 * yourself, but the method allows for multiple types of collaborator invites. See
	 * {@link http://developers.box.com/docs/#collaborations-add-a-collaboration} for formatting
	 * help.
	 *
	 * API Endpoint: '/collaborations
	 * Method: POST
	 *
	 * @param {Object} accessibleBy - The accessible_by object expected by the API
	 * @param {string} itemID - Box ID of the item to which the user should be invited
	 * @param {CollaborationRole} role - The role which the invited collaborator should have
	 * @param {Object} [options] - Optional parameters for the collaboration
	 * @param {ItemType} [options.type=folder] - Type of object to be collaborated
	 * @param {boolean} [options.notify] - Determines if the user or group will receive email notifications
	 * @param {boolean} [options.can_view_path] - Whether view path collaboration feature is enabled or not
	 * @param {Function} [callback] - Called with the new collaboration if successful
	 * @returns {Promise<Object>} A promise resolving to the created collaboration object
	 */
	create(
		accessibleBy: Record<string, any>,
		itemID: string,
		role: CollaborationRole,
		options?:
			| {
					type?: ItemType;
					notify?: boolean;
					can_view_path?: boolean;
			  }
			| Function,
		callback?: Function
	) {
		var defaultOptions = {
			type: 'folder',
		};

		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		options = Object.assign({}, defaultOptions, options);

		var params: {
			body: Record<string, any>;
			qs?: Record<string, any>;
		} = {
			body: {
				item: {
					type: options.type,
					id: itemID,
				},
				accessible_by: accessibleBy,
				role,
			},
		};

		if (typeof options.can_view_path === 'boolean') {
			params.body.can_view_path = options.can_view_path;
		}

		if (typeof options.notify === 'boolean') {
			params.qs = {
				notify: options.notify,
			};
		}

		return this.client.wrapWithDefaultHandler(this.client.post)(
			BASE_PATH,
			params,
			callback
		);
	}

	/**
	 * Invite a user to collaborate on an item via their user ID.
	 *
	 * API Endpoint: '/collaborations
	 * Method: POST
	 *
	 * @param {int} userID - The ID of the user you'll invite as a collaborator
	 * @param {string} itemID - Box ID of the item to which the user should be invited
	 * @param {CollaborationRole} role - The role which the invited collaborator should have
	 * @param {Object} [options] - Optional parameters for the collaboration
	 * @param {ItemType} [options.type=folder] - Type of object to be collaborated
	 * @param {boolean} [options.notify] - Determines if the user will receive email notifications
	 * @param {boolean} [options.can_view_path] - Whether view path collaboration feature is enabled or not
	 * @param {Function} [callback] - Called with the new collaboration if successful
	 * @returns {Promise<Object>} A promise resolving to the created collaboration object
	 */
	createWithUserID(
		userID: number,
		itemID: string,
		role: CollaborationRole,
		options?:
			| {
					type?: ItemType;
					notify?: boolean;
					can_view_path?: boolean;
			  }
			| Function,
		callback?: Function
	) {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		var accessibleBy = {
			type: 'user',
			id: userID,
		};
		return this.create(accessibleBy, itemID, role, options, callback);
	}

	/**
	 * Invite a user to collaborate on an item via their user login email address.
	 *
	 * API Endpoint: '/collaborations
	 * Method: POST
	 *
	 * @param {string} email - The collaborator's email address
	 * @param {string} itemID - Box ID of the item to which the user should be invited
	 * @param {CollaborationRole} role - The role which the invited collaborator should have
	 * @param {Object} [options] - Optional parameters for the collaboration
	 * @param {ItemType} [options.type=folder] - Type of object to be collaborated
	 * @param {boolean} [options.notify] - Determines if the user will receive email notifications
	 * @param {boolean} [options.can_view_path] - Whether view path collaboration feature is enabled or not
	 * @param {Function} [callback] - Called with the new collaboration if successful
	 * @returns {Promise<Object>} A promise resolving to the created collaboration object
	 */
	createWithUserEmail(
		email: string,
		itemID: string,
		role: CollaborationRole,
		options?:
			| {
					type?: ItemType;
					notify?: boolean;
					can_view_path?: boolean;
			  }
			| Function,
		callback?: Function
	) {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		var accessibleBy = {
			type: 'user',
			login: email,
		};
		return this.create(accessibleBy, itemID, role, options, callback);
	}

	/**
	 * Invite a group to collaborate on an item via their group ID.
	 *
	 * API Endpoint: '/collaborations
	 * Method: POST
	 *
	 * @param {int} groupID - The ID of the group you'll invite as a collaborator
	 * @param {string} itemID - Box ID of the item to which the group should be invited
	 * @param {CollaborationRole} role - The role which the invited collaborator should have
	 * @param {Object} [options] - Optional parameters for the collaboration
	 * @param {ItemType} [options.type=folder] - Type of object to be collaborated
	 * @param {boolean} [options.notify] - Determines if the group will receive email notifications
	 * @param {boolean} [options.can_view_path] - Whether view path collaboration feature is enabled or not
	 * @param {Function} [callback] - Called with the new collaboration if successful
	 * @returns {Promise<Object>} A promise resolving to the created collaboration object
	 */
	createWithGroupID(
		groupID: number,
		itemID: string,
		role: CollaborationRole,
		options?:
			| {
					type?: ItemType;
					notify?: boolean;
					can_view_path?: boolean;
			  }
			| Function,
		callback?: Function
	) {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		var accessibleBy = {
			type: 'group',
			id: groupID,
		};
		return this.create(accessibleBy, itemID, role, options, callback);
	}

	/**
	 * Delete a given collaboration.
	 *
	 * API Endpoint: '/collaborations/:collaborationID'
	 * Method: DELETE
	 *
	 * @param {string} collaborationID - Box ID of the collaboration being requested
	 * @param {Function} [callback] - Empty response body passed if successful.
	 * @returns {Promise<void>} A promise resolving to nothing
	 */
	delete(collaborationID: string, callback?: Function) {
		var apiPath = urlPath(BASE_PATH, collaborationID);
		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			null,
			callback
		);
	}
}

/**
 * @module box-node-sdk/lib/managers/collaborations
 * @see {@Link Collaborations}
 */
export = Collaborations;

/**
 * @fileoverview Manager for the Box Folders Resource
 * @author fschott
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/folders';


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'Folder' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Folders(client) {
	this.client = client;
}

/**
 * Requests a folder object with the given ID.
 *
 * API Endpoint: '/folders/:folderID'
 * Method: GET
 *
 * @param {string} folderID - Box ID of the folder being requested
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the folder information if it was acquired successfully
 * @returns {void}
 */
Folders.prototype.get = function(folderID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, folderID);
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Requests items contained within a given folder.
 *
 * API Endpoint: '/folders/:folderID/items'
 * Method: GET
 *
 * @param {string} folderID - Box ID of the folder being requested
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the folder information if it was acquired successfully
 * @returns {void}
 */
Folders.prototype.getItems = function(folderID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, folderID, '/items');
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Requests collaborations on a given folder.
 *
 * API Endpoint: '/folders/:folderID/collaborations'
 * Method: GET
 *
 * @param {string} folderID - Box ID of the folder being requested
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the folder information if it was acquired successfully
 * @returns {void}
 */
Folders.prototype.getCollaborations = function(folderID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, folderID, '/collaborations');
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Creates a new Folder within a parent folder
 *
 * API Endpoint: '/folders
 * Method: POST
 *
 * @param {string} parentFolderID - Box folder id of the folder to add into
 * @param {string} name - The name for the new folder
 * @param {Function} callback - passed the new folder info if call was successful
 * @returns {void}
 */
Folders.prototype.create = function(parentFolderID, name, callback) {
	var params = {
		body: {
			name: name,
			parent: {
				id: parentFolderID
			}
		}
	};
	this.client.post(BASE_PATH, params, this.client.defaultResponseHandler(callback));
};

/**
 * Copy a folder into a new, different folder
 *
 * API Endpoint: '/folders/:folderID/copy
 * Method: POST
 *
 * @param {string} folderID - The Box ID of the folder being requested
 * @param {string} newParentID - The Box ID for the new parent folder. '0' to copy to All Files.
 * @param {Function} callback - passed the new folder info if call was successful
 * @returns {void}
 */
Folders.prototype.copy = function(folderID, newParentID, callback) {
	var params = {
		body: {
			parent: {
				id: newParentID
			}
		}
	};
	var apiPath = urlPath(BASE_PATH, folderID, '/copy');
	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Update some information about a given folder.
 *
 * API Endpoint: '/folders/:folderID'
 * Method: PUT
 *
 * @param {string} folderID - The Box ID of the folder being requested
 * @param {?Object} options - Additional options can be passed with the request via form body. Can be left null in most cases.
 * @param {Function} callback - Passed the updated folder information if it was acquired successfully
 * @returns {void}
 */
Folders.prototype.update = function(folderID, options, callback) {
	var params = {
		body: options
	};

	var apiPath = urlPath(BASE_PATH, folderID);
	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Move a folder into a new parent folder.
 *
 * API Endpoint: '/folders/:folderID'
 * Method: PUT
 *
 * @param {string} folderID - The Box ID of the folder being requested
 * @param {string} newParentID - The Box ID for the new parent folder. '0' to move to All Files.
 * @param {Function} callback - Passed the updated folder information if it was acquired successfully
 * @returns {void}
 */
Folders.prototype.move = function(folderID, newParentID, callback) {
	var params = {
		body: {
			parent: {
				id: newParentID
			}
		}
	};
	var apiPath = urlPath(BASE_PATH, folderID);
	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Delete a given folder.
 *
 * API Endpoint: '/folders/:folderID'
 * Method: DELETE
 *
 * @param {string} folderID - Box ID of the folder being requested
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Empty response body passed if successful.
 * @returns {void}
 */
Folders.prototype.delete = function(folderID, qs, callback) {
	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, folderID);
	this.client.del(apiPath, params, this.client.defaultResponseHandler(callback));
};


/**
 * @module box-node-sdk/lib/managers/folders
 * @see {@Link Folders}
 */
module.exports = Folders;

/**
 * @fileoverview Manager for the Box Folders Resource
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path'),
	errors = require('../util/errors');


// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var BASE_PATH = '/folders',
	WATERMARK_SUBRESOURCE = '/watermark';


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
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the folder information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the folder object
 */
Folders.prototype.get = function(folderID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, folderID);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Requests items contained within a given folder.
 *
 * API Endpoint: '/folders/:folderID/items'
 * Method: GET
 *
 * @param {string} folderID - Box ID of the folder being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the folder information if it was acquired successfully
 * @returns {Promise<Object>} A prmoise resolving to the collection of the items in the folder
 */
Folders.prototype.getItems = function(folderID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, folderID, '/items');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Requests collaborations on a given folder.
 *
 * API Endpoint: '/folders/:folderID/collaborations'
 * Method: GET
 *
 * @param {string} folderID - Box ID of the folder being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the folder information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the collection of collaborations
 */
Folders.prototype.getCollaborations = function(folderID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, folderID, '/collaborations');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Creates a new Folder within a parent folder
 *
 * API Endpoint: '/folders
 * Method: POST
 *
 * @param {string} parentFolderID - Box folder id of the folder to add into
 * @param {string} name - The name for the new folder
 * @param {Function} [callback] - passed the new folder info if call was successful
 * @returns {Promise<Object>} A promise resolving to the created folder object
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
	return this.client.wrapWithDefaultHandler(this.client.post)(BASE_PATH, params, callback);
};

/**
 * Copy a folder into a new, different folder
 *
 * API Endpoint: '/folders/:folderID/copy
 * Method: POST
 *
 * @param {string} folderID - The Box ID of the folder being requested
 * @param {string} newParentID - The Box ID for the new parent folder. '0' to copy to All Files.
 * @param {Object} [options] - Optional parameters for the copy operation, can be left null in most cases
 * @param {string} [options.name] - A new name to use if there is an identically-named item in the new parent folder
 * @param {Function} [callback] - passed the new folder info if call was successful
 * @returns {Promise<Object>} A promise resolving to the new folder object
 */
Folders.prototype.copy = function(folderID, newParentID, options, callback) {

	// @NOTE(mwiller) 2016-10-25: Shuffle arguments to maintain backward compatibility
	//  This can be removed at the v2.0 update
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	options = options || {};

	options.parent = {
		id: newParentID
	};

	var params = {
		body: options
	};
	var apiPath = urlPath(BASE_PATH, folderID, '/copy');
	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Update some information about a given folder.
 *
 * API Endpoint: '/folders/:folderID'
 * Method: PUT
 *
 * @param {string} folderID - The Box ID of the folder being requested
 * @param {Object} options - Folder fields to update
 * @param {Function} [callback] - Passed the updated folder information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the updated folder object
 */
Folders.prototype.update = function(folderID, options, callback) {
	var params = {
		body: options
	};

	var apiPath = urlPath(BASE_PATH, folderID);
	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Add a folder to a given collection
 *
 * API Endpoint: '/folders/:folderID'
 * Method: PUT
 *
 * @param {string} folderID - The folder to add to the collection
 * @param {string} collectionID - The collection to add the folder to
 * @param {Function} [callback] - Passed the updated folder if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the updated folder object
 */
Folders.prototype.addToCollection = function(folderID, collectionID, callback) {

	return this.get(folderID, {fields: 'collections'})
		.then(data => {

			var collections = data.collections || [];

			// Convert to correct format
			collections = collections.map(c => ({id: c.id}));

			if (!collections.find(c => c.id === collectionID)) {

				collections.push({id: collectionID});
			}

			return this.update(folderID, {collections});
		})
		.asCallback(callback);
};

/**
 * Remove a folder from a given collection
 *
 * API Endpoint: '/folders/:folderID'
 * Method: PUT
 *
 * @param {string} folderID - The folder to remove from the collection
 * @param {string} collectionID - The collection to remove the folder from
 * @param {Function} [callback] - Passed the updated folder if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the updated folder object
 */
Folders.prototype.removeFromCollection = function(folderID, collectionID, callback) {

	return this.get(folderID, {fields: 'collections'})
		.then(data => {

			var collections = data.collections || [];
			// Convert to correct object format and remove the specified collection
			collections = collections.map(c => ({id: c.id})).filter(c => c.id !== collectionID);

			return this.update(folderID, {collections});
		})
		.asCallback(callback);
};

/**
 * Move a folder into a new parent folder.
 *
 * API Endpoint: '/folders/:folderID'
 * Method: PUT
 *
 * @param {string} folderID - The Box ID of the folder being requested
 * @param {string} newParentID - The Box ID for the new parent folder. '0' to move to All Files.
 * @param {Function} [callback] - Passed the updated folder information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the updated folder object
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
	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Delete a given folder.
 *
 * API Endpoint: '/folders/:folderID'
 * Method: DELETE
 *
 * @param {string} folderID - Box ID of the folder being requested
 * @param {Object} [qs] - Optional query string params, can be left null in most cases
 * @param {Function} [callback] - Empty response body passed if successful.
 * @returns {Promise<void>} A promise resolving to nothing
 */
Folders.prototype.delete = function(folderID, qs, callback) {

	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, folderID);
	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, params, callback);
};

/**
 * Retrieves all metadata associated with a folder.
 *
 * API Endpoint: '/folders/:folderID/metadata'
 * Method: GET
 *
 * @param {string} folderID - the ID of the folder to get metadata for
 * @param {Function} [callback] - called with an array of metadata when successful
 * @returns {Promise<Object>} A promise resolving to the collection of metadata on the folder
 */
Folders.prototype.getAllMetadata = function(folderID, callback) {

	var apiPath = urlPath(BASE_PATH, folderID, 'metadata');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, null, callback);
};

/**
 * Retrieve a single metadata template instance for a folder.
 *
 * API Endpoint: '/folders/:folderID/metadata/:scope/:template'
 * Method: GET
 *
 * @param {string} folderID - The ID of the folder to retrive the metadata of
 * @param {string} scope - The scope of the metadata template, e.g. "global"
 * @param {string} template - The metadata template to retrieve
 * @param {Function} [callback] - Passed the metadata template if successful
 * @returns {Promise<Object>} A promise resolving to the metadata template
 */
Folders.prototype.getMetadata = function(folderID, scope, template, callback) {

	var apiPath = urlPath(BASE_PATH, folderID, 'metadata', scope, template);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, null, callback);
};

/**
 * Adds metadata to a folder.  Metadata must either match a template schema or
 * be placed into the unstructured "properties" template in global scope.
 *
 * API Endpoint: '/folders/:folderID/metadata/:scope/:template'
 * Method: POST
 *
 * @param {string} folderID - The ID of the folder to add metadata to
 * @param {string} scope - The scope of the metadata template, e.g. "enterprise"
 * @param {string} template - The metadata template schema to add
 * @param {Object} data - Key/value pairs tp add as metadata
 * @param {Function} [callback] - Called with error if unsuccessful
 * @returns {Promise<Object>} A promise resolving to the created metadata
 */
Folders.prototype.addMetadata = function(folderID, scope, template, data, callback) {

	var apiPath = urlPath(BASE_PATH, folderID, 'metadata', scope, template),
		params = {
			body: data
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Updates a metadata template instance with JSON Patch-formatted data.
 *
 * API Endpoint: '/folders/:folderID/metadata/:scope/:template'
 * Method: PUT
 *
 * @param {string} folderID - The folder to update metadata for
 * @param {string} scope - The scope of the template to update
 * @param {string} template - The template to update
 * @param {Object} patch - The patch data
 * @param {Function} [callback] - Called with updated metadata if successful
 * @returns {Promise<Object>} A promise resolving to the updated metadata
 */
Folders.prototype.updateMetadata = function(folderID, scope, template, patch, callback) {

	var apiPath = urlPath(BASE_PATH, folderID, 'metadata', scope, template),
		params = {
			body: patch,
			headers: {
				'Content-Type': 'application/json-patch+json'
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Deletes a metadata template from a folder.
 *
 * API Endpoint: '/folders/:folderID/metadata/:scope/:template'
 * Method: DELETE
 *
 * @param {string} folderID - The ID of the folder to remove metadata from
 * @param {string} scope - The scope of the metadata template
 * @param {string} template - The template to remove from the folder
 * @param {Function} [callback] - Called with nothing if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
Folders.prototype.deleteMetadata = function(folderID, scope, template, callback) {

	var apiPath = urlPath(BASE_PATH, folderID, 'metadata', scope, template);
	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Retrieves a folder that has been moved to the trash
 *
 * API Endpoint: '/folders/:folderID/trash'
 * Method: GET
 *
 * @param  {string} folderID  - The ID of the folder being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param  {Funnction} [callback]  - Passed the folder information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the trashed folder object
 */
Folders.prototype.getTrashedFolder = function(folderID, qs, callback) {
	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, folderID, 'trash');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Restores an item that has been moved to the trash. Default behavior is to restore the item
 * to the folder it was in before it was moved to the trash. If that parent folder no longer
 * exists or if there is now an item with the same name in that parent folder, the new parent
 * older and/or new name will need to be included in the request.
 *
 * API Endpoint: '/folders/:folderID'
 * Method: POST
 *
 * @param {string} folderID - The ID of the folder to restore
 * @param {Object} [options] - Optional parameters, can be left null
 * @param {?string} [options.name] - The new name for this item
 * @param {string} [options.parent_id] - The new parent folder for this item
 * @param {Function} [callback] - Called with folder information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the restored folder object
 */
Folders.prototype.restoreFromTrash = function(folderID, options, callback) {

	// Set up the parent_id parameter
	if (options && options.parent_id) {

		options.parent = {
			id: options.parent_id
		};

		delete options.parent_id;
	}

	var apiPath = urlPath(BASE_PATH, folderID),
		params = {
			body: options || {}
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Permanently deletes an folder that is in the trash. The item will no longer exist in Box. This action cannot be undone
 *
 * API Endpoint: '/folders/:folderID/trash'
 * Method: DELETE
 *
 * @param  {string} folderID Box ID of the folder being requested
 * @param  {Function} [callback] Called with nothing if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
Folders.prototype.deletePermanently = function(folderID, callback) {

	var apiPath = urlPath(BASE_PATH, folderID, '/trash');
	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Used to retrieve the watermark for a corresponding Box folder.
 *
 * API Endpoint: '/folders/:folderID/watermark'
 * Method: GET
 *
 * @param {string} folderID - The Box ID of the folder to get watermark for
 * @param {Object} [qs] - Additional options can be passed with the request via querystring
 * @param {Function} [callback] - Passed the watermark information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the watermark info
 */
Folders.prototype.getWatermark = function(folderID, qs, callback) {

	var apiPath = urlPath(BASE_PATH, folderID, WATERMARK_SUBRESOURCE),
		params = {
			qs: qs
		};

	return this.client.get(apiPath, params)
		.then(response => {

			if (response.statusCode !== 200) {
				throw errors.buildUnexpectedResponseError(response);
			}

			return response.body.watermark;
		})
		.asCallback(callback);
};

/**
 * Used to apply or update the watermark for a corresponding Box folder.
 *
 * API Endpoint: '/folders/:folderID/watermark'
 * Method: PUT
 *
 * @param {string} folderID - The Box ID of the folder to update watermark for
 * @param {Object} [options] - Optional parameters, can be left null
 * @param {Function} [callback] - Passed the watermark information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the watermark info
 */
Folders.prototype.applyWatermark = function(folderID, options, callback) {
	var apiPath = urlPath(BASE_PATH, folderID, WATERMARK_SUBRESOURCE),
		params = {
			body: {
				watermark: {
					imprint: 'default' // Currently the API only supports default imprint
				}
			}
		};

	Object.assign(params.body.watermark, options);

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Used to remove the watermark for a corresponding Box folder.
 *
 * API Endpoint: '/folders/:folderID/watermark'
 * Method: DELETE
 *
 * @param {string} folderID - The Box ID of the folder to remove watermark from
 * @param {Function} [callback] - Empty response body passed if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
Folders.prototype.removeWatermark = function(folderID, callback) {

	var apiPath = urlPath(BASE_PATH, folderID, WATERMARK_SUBRESOURCE);

	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};
/**
 * @module box-node-sdk/lib/managers/folders
 * @see {@Link Folders}
 */
module.exports = Folders;

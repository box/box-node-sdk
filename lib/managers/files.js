/**
 * @fileoverview Manager for the Box Files Resource
 */

'use strict';
// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * A representation request type constant
 * @typedef {string} FileRepresentationType Different representations we can request from reps endpoint
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

/**
 * @typedef {Object} UploadPart
 * @property {string} part_id An 8-character hexadecimal string identifying the part
 * @property {int} offset The byte offset of the part within the whole file
 * @property {int} size The size of the part in bytes
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

var urlPath = require('../util/url-path'),
	errors = require('../util/errors'),
	httpStatusCodes = require('http-status'),
	crypto = require('crypto'),
	Promise = require('bluebird'),
	ChunkedUploader = require('../chunked-uploader');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

// Base path for all files endpoints
var BASE_PATH = '/files',
	VERSIONS_SUBRESOURCE = '/versions',
	WATERMARK_SUBRESOURCE = '/watermark',
	UPLOAD_SESSION_SUBRESOURCE = '/upload_sessions';

// Enum of valid lock types
var lockTypes = {
	LOCK: 'lock',
	UNLOCK: 'unlock'
};

/**
 * Returns the multipart form value for file upload metadata.
 * @param {string} parentFolderID - the ID of the parent folder to upload to
 * @param {string} filename - the file name that the uploaded file should have
 * @returns {Object} - the form value expected by the API for the 'metadata' key
 * @private
 */
function createFileMetadataFormData(parentFolderID, filename) {
	// Although the filename and parent folder ID can be specified without using a
	// metadata form field, Platform has recommended that we use the metadata form
	// field to specify these parameters (one benefit is that UTF-8 characters can
	// be specified in the filename).
	return JSON.stringify({
		name: filename,
		parent: { id: parentFolderID }
	});
}

/**
 * Returns the multipart form value for file upload content.
 * @param {string|Buffer|Stream} content - the content of the file being uploaded
 * @returns {Object} - the form value expected by the API for the 'content' key
 * @private
 */
function createFileContentFormData(content) {
	// The upload API appears to look for a form field that contains a filename
	// property and assume that this form field contains the file content. Thus,
	// the value of name does not actually matter (as long as it does not conflict
	// with other field names). Similarly, the value of options.filename does not
	// matter either (as long as it exists), since the upload API will use the
	// filename specified in the metadata form field instead.
	return {
		value: content,
		options: { filename: 'unused' }
	};
}

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'File' endpoints and actions.
 *
 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
 * @constructor
 */
function Files(client) {
	// Attach the client, for making API calls
	this.client = client;
}

/**
 * Requests a file object with the given ID.
 *
 * API Endpoint: '/files/:fileID'
 * Method: GET
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the file information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the file object
 */
Files.prototype.get = function(fileID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, fileID);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Requests a download URL for a given file.
 *
 * API Endpoint: '/files/:fileID/content'
 * Method: GET
 * Special Expected Responses:
 *   202 ACCEPTED - Download isn't available yet. Returns an error.
 *   302 FOUND - Download is available. A Download URL is returned.
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the download URL if request was successful.
 * @returns {Promise<string>} A promise resolving to the file's download URL
 */
Files.prototype.getDownloadURL = function(fileID, qs, callback) {
	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, fileID, '/content');

	// Handle Special API Response
	return this.client.get(apiPath, params)
		.then(response => {

			switch (response.statusCode) {

				// 302 - Found
				// No data returned, but the location header points to a download link for that file.
			case httpStatusCodes.FOUND:
				return response.headers.location;

				// 202 - Download isn't ready yet.
			case httpStatusCodes.ACCEPTED:
				throw errors.buildResponseError(response, 'Download not ready at this time');

				// Unexpected Response
			default:
				throw errors.buildUnexpectedResponseError(response);
			}
		})
		.asCallback(callback);
};

/**
 * Requests a Readable Stream for the given file ID.
 *
 * API Endpoint: '/files/:fileID/content'
 * Method: GET
 * Special Expected Responses:
 *   202 ACCEPTED - Download isn't available yet. Returns an error.
 *   302 FOUND - Download is available. A Download stream is returned.
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - passed the readable stream if request was successful
 * @returns {Promise<Readable>} A promise resolving for the file stream
 */
Files.prototype.getReadStream = function(fileID, qs, callback) {

	// Get the download URL to download from
	return this.getDownloadURL(fileID, qs)
		// Return a read stream to download the file
		.then(url => this.client.get(url, { streaming: true }))
		.asCallback(callback);
};

/**
 * Requests a Thumbnail for a given file.
 *
 * API Endpoint: '/files/:fileID/thumbnail.png'
 * Method: GET
 * Special Expected Responses:
 *   200 OK - Thumbnail available. Returns a thumbnail file.
 *   202 ACCEPTED - Thumbnail isn't available yet. Returns a `location` URL for a generic placeholder thumbnail.
 *   302 FOUND - Unable to generate thumbnail. Returns a `location` URL for a generic placeholder thumbnail.
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the thumbnail file or the URL to a placeholder thumbnail if successful.
 * @returns {Promise<Object>} A promise resolving to the thumbnail information
 */
Files.prototype.getThumbnail = function(fileID, qs, callback) {
	var params = {
		qs: qs,
		json: false
	};

	var apiPath = urlPath(BASE_PATH, fileID, '/thumbnail.png');

	// Handle Special API Response
	return this.client.get(apiPath, params)
		.then(response => {

			switch (response.statusCode) {

				// 202 - Thumbnail will be generated, but is not ready yet
				// 302 - Thumbnail can not be generated
				// return the url for a thumbnail placeholder
			case httpStatusCodes.ACCEPTED:
			case httpStatusCodes.FOUND:
				return {
					statusCode: response.statusCode,
					location: response.headers.location
				};

				// 200 - Thumbnail image recieved
				// return the thumbnail file
			case httpStatusCodes.OK:
				return {
					statusCode: response.statusCode,
					file: response.body
				};

				// Unexpected Response
			default:
				throw errors.buildUnexpectedResponseError(response);
			}
		})
		.asCallback(callback);
};

/**
 * Gets the comments on a file.
 *
 * API Endpoint: '/files/:fileID/comments'
 * Method: GET
 *
 * @param {string} fileID - Box file id of the file
 * @param {Object} [qs] - Optional additional querystring to add to the request. Can be left null in most cases.
 * @param {Function} [callback] - passed the file comments if they were successfully acquired
 * @returns {Promise<Object>} A promise resolving to the collection of comments
 */
Files.prototype.getComments = function(fileID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, fileID, '/comments');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};


/**
 * Update some information about a given file.
 *
 * API Endpoint: '/files/:fileID'
 * Method: PUT
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {Object} options - File fields to update
 * @param {Function} [callback] - Passed the updated file information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the update file object
 */
Files.prototype.update = function(fileID, options, callback) {
	var params = {
		body: options
	};

	var apiPath = urlPath(BASE_PATH, fileID);
	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Add a file to a given collection
 *
 * API Endpoint: '/files/:fileID'
 * Method: PUT
 *
 * @param {string} fileID - The file to add to the collection
 * @param {string} collectionID - The collection to add the file to
 * @param {Function} [callback] - Passed the updated file if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the updated file object
 */
Files.prototype.addToCollection = function(fileID, collectionID, callback) {

	return this.get(fileID, { fields: 'collections' })
		.then(data => {

			var collections = data.collections || [];

			// Convert to correct format
			collections = collections.map(c => ({ id: c.id }));

			if (!collections.find(c => c.id === collectionID)) {

				collections.push({ id: collectionID });
			}

			return this.update(fileID, { collections });
		})
		.asCallback(callback);
};

/**
 * Remove a file from a given collection
 *
 * API Endpoint: '/files/:fileID'
 * Method: PUT
 *
 * @param {string} fileID - The file to remove from the collection
 * @param {string} collectionID - The collection to remove the file from
 * @param {Function} [callback] - Passed the updated file if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the updated file object
 */
Files.prototype.removeFromCollection = function(fileID, collectionID, callback) {

	return this.get(fileID, { fields: 'collections' })
		.then(data => {

			var collections = data.collections || [];
			// Convert to correct object format and remove the specified collection
			collections = collections.map(c => ({ id: c.id })).filter(c => c.id !== collectionID);

			return this.update(fileID, { collections });
		})
		.asCallback(callback);
};

/**
 * Move a file into a new parent folder.
 *
 * API Endpoint: '/files/:fileID'
 * Method: PUT
 *
 * @param {string} fileID - The Box ID of the file being requested
 * @param {string} newParentID - The Box ID for the new parent folder. '0' to move to All Files.
 * @param {Function} [callback] - Passed the updated file information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the updated file object
 */
Files.prototype.move = function(fileID, newParentID, callback) {
	var params = {
		body: {
			parent: {
				id: newParentID
			}
		}
	};
	var apiPath = urlPath(BASE_PATH, fileID);
	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Copy a file into a new folder.
 *
 * API Endpoint: '/files/:fileID/copy
 * Method: POST
 *
 * @param {string} fileID - The Box ID of the file being requested
 * @param {string} newParentID - The Box ID for the new parent folder. '0' to copy to All Files.
 * @param {Object} [options] - Optional parameters for the copy operation, can be left null in most cases
 * @param {string} [options.name] - A new name to use if there is an identically-named item in the new parent folder
 * @param {Function} [callback] - passed the new file info if call was successful
 * @returns {Promise<Object>} A promise resolving to the new file object
 */
Files.prototype.copy = function(fileID, newParentID, options, callback) {

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
	var apiPath = urlPath(BASE_PATH, fileID, '/copy');
	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Delete a given file.
 *
 * API Endpoint: '/files/:fileID'
 * Method: DELETE
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {Function} [callback] - Empty response body passed if successful.
 * @returns {Promise<void>} A promise resolving to nothing
 */
Files.prototype.delete = function(fileID, callback) {

	var apiPath = urlPath(BASE_PATH, fileID);
	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Get preflight information for a new file upload.  Without any file data,
 * this will return an upload URL and token to be used when uploading the file.
 * Using this upload URL will allow for the fastest upload, and the one-time
 * token can be passed to a worker or other client to actually perform the
 * upload with.  If file data (e.g. size, parent, name) is passed, it will be
 * validated as if the actual file were being uploaded.  This enables checking
 * of preconditions such as name uniqueness and available storage space before
 * attempting a large file upload.
 *
 * API Endpoint: '/files/content'
 * Method: OPTIONS
 *
 * @param {string} parentFolderID - The id of the parent folder to upload to
 * @param {Object} [fileData] - Optional data about the file to be uploaded
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Called with upload data if successful, or err if the upload would not succeed
 * @returns {Promise<Object>} A promise resolving to the upload data
 */
Files.prototype.preflightUploadFile = function(parentFolderID, fileData, qs, callback) {
	var params = {
		body: {
			parent: {
				id: parentFolderID
			}
		},
		qs: qs
	};

	if (fileData) {
		Object.assign(params.body, fileData);
	}
	var apiPath = urlPath(BASE_PATH, '/content');
	return this.client.wrapWithDefaultHandler(this.client.options)(apiPath, params, callback);
};

/**
 * Get preflight information for a file version upload.  Without any file data,
 * this will return an upload URL and token to be used when uploading the file.
 * Using this upload URL will allow for the fastest upload, and the one-time
 * token can be passed to a worker or other client to actually perform the
 * upload with.  If file data (e.g. size, parent, name) is passed, it will be
 * validated as if the actual file were being uploaded.  This enables checking
 * of preconditions such as name uniqueness and available storage space before
 * attempting a large file upload.
 *
 * API Endpoint: '/files/:fileID/content'
 * Method: OPTIONS
 *
 * @param {string} fileID - The file ID to which a new version will be uploaded
 * @param {Object} [fileData] - Optional data about the file to be uploaded
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Called with upload data if successful, or err if the upload would not succeed
 * @returns {Promise<Object>} A promise resolving to the upload data
 */
Files.prototype.preflightUploadNewFileVersion = function(fileID, fileData, qs, callback) {
	var params = {
		qs: qs
	};

	if (fileData) {
		params.body = fileData;
	}

	var apiPath = urlPath(BASE_PATH, fileID, '/content');
	return this.client.wrapWithDefaultHandler(this.client.options)(apiPath, params, callback);
};

/**
 * If there are previous versions of this file, this method can be used to promote one of the older
 * versions to the top of the stack. This actually mints a copy of the old version and puts it on
 * the top of the versions stack. The file will have the exact same contents, the same SHA1/etag,
 * and the same name as the original. Other properties such as comments do not get updated to their former values.
 *
 * API Endpoint: '/files/:fileID/versions/current'
 * Method: POST
 *
 * @param {string} fileID - The file ID which version will be promoted
 * @param {string} versionID - The ID of the file_version that you want to make current
 * @param {Function} [callback] - Passed the promoted file version information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the promoted file version
 */
Files.prototype.promoteVersion = function(fileID, versionID, callback) {
	var apiPath = urlPath(BASE_PATH, fileID, VERSIONS_SUBRESOURCE, '/current'),
		params = {
			body: {
				type: 'file_version',
				id: versionID
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Uploads a new file. Unlike non-upload methods, this method will not perform any retries.
 * This method currently does not support any optional parameters such as contentModifiedAt.
 *
 * API Endpoint: '/files/content'
 * Method: POST
 *
 * @param {string} parentFolderID - the id of the parent folder to upload to
 * @param {string} filename - the file name that the uploaded file should have
 * @param {string|Buffer|ReadStream} content - the content of the file. It can be a string, a Buffer, or a read stream
 * (like that returned by fs.createReadStream()).
 * @param {Function} [callback] - called with data about the upload if successful, or an error if the
 * upload failed
 * @returns {Promise<Object>} A promise resolving to the uploaded file
 */
Files.prototype.uploadFile = function(parentFolderID, filename, content, callback) {
	var apiPath = urlPath(BASE_PATH, '/content'),
		multipartFormData = {
			attributes: createFileMetadataFormData(parentFolderID, filename),
			content: createFileContentFormData(content)
		};

	return this.client.wrapWithDefaultHandler(this.client.upload)(apiPath, null, multipartFormData, callback);
};

/**
 * Uploads a new version of a file. Unlike non-upload methods, this method will not perform any retries.
 * This method currently does not support any optional parameters such as contentModifiedAt.
 *
 * API Endpoint: '/files/:fileID/content'
 * Method: POST
 *
 * @param {string} fileID - the id of the file to upload a new version of
 * @param {string|Buffer|Stream} content - the content of the file. It can be a string, a Buffer, or a read stream
 * (like that returned by fs.createReadStream()).
 * @param {Function} [callback] - called with data about the upload if successful, or an error if the
 * upload failed
 * @returns {Promise<Object>} A promise resolving to the uploaded file
 */
Files.prototype.uploadNewFileVersion = function(fileID, content, callback) {
	var apiPath = urlPath(BASE_PATH, fileID, '/content'),
		multipartFormData = {
			content: createFileContentFormData(content)
		};

	return this.client.wrapWithDefaultHandler(this.client.upload)(apiPath, null, multipartFormData, callback);
};

/**
 * Retrieves all metadata associated with a file.
 *
 * API Endpoint: '/files/:fileID/metadata'
 * Method: GET
 *
 * @param {string} fileID - the ID of the file to get metadata for
 * @param {Function} [callback] - called with an array of metadata when successful
 * @returns {Promise<Object>} A promise resolving to a collection of metadata on the file
 */
Files.prototype.getAllMetadata = function(fileID, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, null, callback);
};

/**
 * Retrieve a single metadata template instance for a file.
 *
 * API Endpoint: '/files/:fileID/metadata/:scope/:template'
 * Method: GET
 *
 * @param {string} fileID - The ID of the file to retrive the metadata of
 * @param {string} scope - The scope of the metadata template, e.g. "global"
 * @param {string} template - The metadata template to retrieve
 * @param {Function} [callback] - Passed the metadata template if successful
 * @returns {Promise<Object>} A promise resolving to the metadata template
 */
Files.prototype.getMetadata = function(fileID, scope, template, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template);
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, null, callback);
};

/**
 * Adds metadata to a file.  Metadata must either match a template schema or
 * be placed into the unstructured "properties" template in global scope.
 *
 * API Endpoint: '/files/:fileID/metadata/:scope/:template'
 * Method: POST
 *
 * @param {string} fileID - The ID of the file to add metadata to
 * @param {string} scope - The scope of the metadata template, e.g. "enterprise"
 * @param {string} template - The metadata template schema to add
 * @param {Object} data - Key/value pairs tp add as metadata
 * @param {Function} [callback] - Called with error if unsuccessful
 * @returns {Promise<Object>} A promise resolving to the new metadata
 */
Files.prototype.addMetadata = function(fileID, scope, template, data, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template),
		params = {
			body: data
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * Updates a metadata template instance with JSON Patch-formatted data.
 *
 * API Endpoint: '/files/:fileID/metadata/:scope/:template'
 * Method: PUT
 *
 * @param {string} fileID - The file to update metadata for
 * @param {string} scope - The scope of the template to update
 * @param {string} template - The template to update
 * @param {Object} patch - The patch data
 * @param {Function} [callback] - Called with updated metadata if successful
 * @returns {Promise<Object>} A promise resolving to the updated metadata
 */
Files.prototype.updateMetadata = function(fileID, scope, template, patch, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template),
		params = {
			body: patch,
			headers: {
				'Content-Type': 'application/json-patch+json'
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Deletes a metadata template from a file.
 *
 * API Endpoint: '/files/:fileID/metadata/:scope/:template'
 * Method: DELETE
 *
 * @param {string} fileID - The ID of the file to remove metadata from
 * @param {string} scope - The scope of the metadata template
 * @param {string} template - The template to remove from the file
 * @param {Function} [callback] - Called with nothing if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
Files.prototype.deleteMetadata = function(fileID, scope, template, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template);
	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Permanently deletes an item that is in the trash. The item will no longer exist in Box. This action cannot be undone.
 *
 * API Endpoint: '/files/:fileID/trash'
 * Method: DELETE
 *
 * @param {string} fileID - The ID of the file to remove metadata from
 * @param {Function} [callback] - Called with nothing if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
Files.prototype.deletePermanently = function(fileID, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, '/trash');
	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Retrieves a file that has been moved to the trash.
 *
 * API Endpoint: '/files/:fileID/trash'
 * Method: GET
 *
 * @param {string} fileID - The ID of the file being requested
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the trashed file information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the trashed file
 */
Files.prototype.getTrashedFile = function(fileID, qs, callback) {

	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, fileID, 'trash');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Retrieves all of the tasks for given file.
 *
 * API Endpoint: '/files/:fileID/tasks'
 * Method: GET
 *
 * @param {string} fileID - The ID of the file to get tasks for
 * @param {Object} [qs] - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} [callback] - Passed the file tasks if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to a collections of tasks on the file
 */
Files.prototype.getTasks = function(fileID, qs, callback) {

	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, fileID, '/tasks');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Used to retrieve an expiring URL for creating an embedded preview session.
 * The URL will expire after 60 seconds and the preview session will expire after 60 minutes.
 *
 * API Endpoint: '/files/:fileID?fields=expiring_embed_link'
 * Method: GET
 *
 * @param {string} fileID - The ID of the file to generate embed link for
 * @param {Function} [callback] - Passed with the embed link if successful, error otherwise
 * @returns {Promise<string>} A promise resolving to the file embed link URL
 */
Files.prototype.getEmbedLink = function(fileID, callback) {

	var params = {
		qs: {
			fields: 'expiring_embed_link'
		}
	};

	var apiPath = urlPath(BASE_PATH, fileID);
	return this.client.get(apiPath, params)
		.then(response => {

			if (response.statusCode !== httpStatusCodes.OK) {
				throw errors.buildUnexpectedResponseError(response);
			}

			return response.body.expiring_embed_link.url;
		})
		.asCallback(callback);
};

/**
 * Locks  a file.
 *
 * API Endpoint: '/files/:fileID'
 * Method: PUT
 *
 * @param {string} fileID - The ID of the file to lock
 * @param {Object} [options] - Optional parameters, can be left null in most cases
 * @param {?string} [options.expires_at] - The time the lock expires
 * @param {boolean} [options.is_download_prevented] - Whether or not the file can be downloaded while locked
 * @param {Function} [callback] - Passed with the locked file information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the locked file object
 */
Files.prototype.lock = function(fileID, options, callback) {

	var apiPath = urlPath(BASE_PATH, fileID),
		params = {
			body: {
				lock: {
					type: lockTypes.LOCK
				}
			}
		};

	Object.assign(params.body.lock, options);

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Unlocks a file.
 *
 * API Endpoint: '/files/:fileID'
 *  Method: PUT
 *
 * @param {string} fileID - The ID of the file to unlock
 * @param {Function} [callback] - Passed with the unlocked file information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the unlocked file object
 */
Files.prototype.unlock = function(fileID, callback) {

	var apiPath = urlPath(BASE_PATH, fileID),
		params = {
			body: {
				lock: {
					type: lockTypes.UNLOCK
				}
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.put)(apiPath, params, callback);
};

/**
 * Restores an item that has been moved to the trash. Default behavior is to
 * restore the item to the folder it was in before it was moved to the trash.
 * If that parent folder no longer exists or if there is now an item with the
 * same name in that parent folder, the new parent folder and/or new name will
 * need to be included in the request.
 *
 * API Endpoint: '/files/:fileID'
 * Method: POST
 *
 * @param {string} fileID - The ID of the file to restore
 * @param {Object} [options] - Optional parameters, can be left null in most cases
 * @param {string} [options.name] - The new name for this item
 * @param {string} [options.parent_id] - The new parent folder for this item
 * @param {Function} [callback] - Called with item information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the restored file object
 */
Files.prototype.restoreFromTrash = function(fileID, options, callback) {

	// Set up the parent_id parameter
	if (options && options.parent_id) {

		options.parent = {
			id: options.parent_id
		};

		delete options.parent_id;
	}

	var apiPath = urlPath(BASE_PATH, fileID),
		params = {
			body: options || {}
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
};

/**
 * If there are previous versions of this file, this method can be used to retrieve information
 * about the older versions.
 *
 * API Endpoint: '/files/:fileID/versions'
 * Method: GET
 *
 * @param {string} fileID - The ID of the file to view version for
 * @param {Object} [qs] - Additional options for the request, can be left null in most cases
 * @param {Function} [callback] - Passed a list of previous file versions if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the collection of file versions
 */
Files.prototype.getVersions = function(fileID, qs, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, VERSIONS_SUBRESOURCE),
		params = {
			qs: qs
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Used to retrieve the watermark for a corresponding Box file.
 *
 * API Endpoint: '/files/:fileID/watermark'
 * Method: GET
 *
 * @param {string} fileID - The Box ID of the file to get watermark for
 * @param {Object} [qs] - Additional options can be passed with the request via querystring
 * @param {Function} [callback] - Passed the watermark information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the watermark info
 */
Files.prototype.getWatermark = function(fileID, qs, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, WATERMARK_SUBRESOURCE),
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
 * Used to apply or update the watermark for a corresponding Box file.
 *
 * API Endpoint: '/files/:fileID/watermark'
 * Method: PUT
 *
 * @param {string} fileID - The Box ID of the file to update watermark for
 * @param {Object} [options] - Optional parameters, can be left null
 * @param {Function} [callback] - Passed the watermark information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the watermark info
 */
Files.prototype.applyWatermark = function(fileID, options, callback) {
	var apiPath = urlPath(BASE_PATH, fileID, WATERMARK_SUBRESOURCE),
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
 * Used to remove the watermark for a corresponding Box file.
 *
 * API Endpoint: '/files/:fileID/watermark'
 * Method: DELETE
 *
 * @param {string} fileID - The Box ID of the file to remove watermark from
 * @param {Function} [callback] - Empty response body passed if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
Files.prototype.removeWatermark = function(fileID, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, WATERMARK_SUBRESOURCE);

	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Discards a specific file version to the trash. Depending on the enterprise settings
 * for this user, the item will either be actually deleted from Box or moved to the trash.
 *
 * API Endpoint: '/files/:fileID/version/:versionID'
 * Method: DELETE
 *
 * @param {string} fileID - The file ID which old version will be moved to the trash or delete permanently
 * @param {string} versionID - The ID of the version to move to the trash or delete permanently
 * @param {Function} [callback] - Empty response body, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
Files.prototype.deleteVersion = function(fileID, versionID, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, VERSIONS_SUBRESOURCE, versionID);

	return this.client.wrapWithDefaultHandler(this.client.del)(apiPath, null, callback);
};

/**
 * Creates a session used to upload a new file in chunks..  This will first
 * verify that the file can be created and then open a session for uploading
 * pieces of the file.
 *
 * API Endpoint: '/files/upload_sessions'
 * Method: POST
 *
 * @param {string} folderID - The ID of the folder to upload the file to
 * @param {int} size - The size of the file that will be uploaded
 * @param {string} name - The name of the file to be created
 * @param {Function} [callback] - Passed the upload session info if successful
 * @returns {Promise<Object>} A promise resolving to the new upload session object
 */
Files.prototype.createUploadSession = function(folderID, size, name, callback) {

	var apiURL = this.client._uploadBaseURL + urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE),
		params = {
			body: {
				folder_id: folderID,
				file_size: size,
				file_name: name
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiURL, params, callback);
};

/**
 * Creates a session used to upload a new version of a file in chunks.  This
 * will first verify that the version can be created and then open a session for
 * uploading pieces of the file.
 *
 * API Endpoint: '/files/:fileID/upload_sessions'
 * Method: POST
 *
 * @param {string} fileID - The ID of the file to upload a new version of
 * @param {int} size - The size of the file that will be uploaded
 * @param {Function} [callback] - Passed the upload session info if successful
 * @returns {Promise<Object>} A promise resolving to the new upload session object
 */
Files.prototype.createNewVersionUploadSession = function(fileID, size, callback) {

	var apiURL = this.client._uploadBaseURL + urlPath(BASE_PATH, fileID, UPLOAD_SESSION_SUBRESOURCE),
		params = {
			body: {
				file_size: size
			}
		};

	return this.client.wrapWithDefaultHandler(this.client.post)(apiURL, params, callback);
};

/**
 * Uploads a chunk of a file to an open upload session
 *
 * API Endpoint: '/files/upload_sessions/:sessionID'
 * Method: PUT
 *
 * @param {string} sessionID - The ID of the upload session to upload to
 * @param {Buffer|string} part - The chunk of the file to upload
 * @param {int} offset - The byte position where the chunk begins in the file
 * @param {int} totalSize - The total size of the file being uploaded
 * @param {Function} [callback] - Passed the part definition if successful
 * @returns {Promise<Object>} A promise resolving to the part object
 */
Files.prototype.uploadPart = function(sessionID, part, offset, totalSize, callback) {

	var apiURL = this.client._uploadBaseURL + urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID),
		params = {
			headers: {
				'Content-Type': 'application/octet-stream',
				Digest: 'SHA=' + crypto.createHash('sha1').update(part).digest('base64'),
				'Content-Range': `bytes ${offset}-${offset + part.length - 1}/${totalSize}`
			},
			json: false,
			body: part
		};

	return this.client.put(apiURL, params)
		.then(response => {

			if (response.statusCode !== 200) {
				throw errors.buildUnexpectedResponseError(response);
			}

			return JSON.parse(response.body);
		})
		.asCallback(callback);
};

/**
 * Commit an upload session after all parts have been uploaded, creating the new file
 *
 * API Endpoint: '/files/upload_sessions/:sessionID/commit'
 * Method: POST
 *
 * @param {string} sessionID - The ID of the upload session to commit
 * @param {string} fileHash - The base64-encoded SHA-1 hash of the file being uploaded
 * @param {Object} [options] - Optional parameters set on the created file, can be left null
 * @param {UploadPart[]} [options.parts] The list of uploaded parts to be committed, will be fetched from the API otherwise
 * @param {Function} [callback] - Passed the new file information if successful
 * @returns {Promise<Object>} A promise resolving to the uploaded file object
 */
Files.prototype.commitUploadSession = function(sessionID, fileHash, options, callback) {

	options = options || {};

	var userParts;
	if (options.parts) {
		userParts = options.parts;
		delete options.parts;
	}

	var apiURL = this.client._uploadBaseURL + urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID, 'commit'),
		params = {
			headers: {
				Digest: 'SHA=' + fileHash
			},
			body: {
				attributes: options
			}
		};

	var fetchParts = (offset, fetchedParts) => {

		let pagingOptions = {
			limit: 1000,
			offset: offset
		};

		return this.getUploadSessionParts(sessionID, pagingOptions)
			.then(data => {

				fetchedParts = fetchedParts.concat(data.entries);

				if (data.offset + data.entries.length >= data.total_count) {
					return Promise.resolve(fetchedParts);
				}

				return fetchParts(offset + data.limit, fetchedParts);
			});
	};

	return (userParts ? Promise.resolve(userParts) : fetchParts(0, []))
		.then(parts => {

			// Commit the upload with the list of parts
			params.body.parts = parts;
			return this.client.post(apiURL, params);
		}).then(response => {

			if (response.statusCode === 201) {
				return response.body;
			}

			if (response.statusCode === 202) {
				var retryInterval = response.headers['retry-after'] || 1;
				return Promise.delay(retryInterval * 1000)
					.then(() => {

						// Ensure we don't have to fetch parts from the API again on retry
						options = Object.assign({}, options, { parts: params.body.parts });
						return this.commitUploadSession(sessionID, fileHash, options);
					});
			}

			throw errors.buildUnexpectedResponseError(response);
		})
		.asCallback(callback);
};

/**
 * Abort an upload session, discarding any chunks that were uploaded to it
 *
 * API Endpoint: '/files/upload_sessions/:sessionID'
 * Method: DELETE
 *
 * @param {string} sessionID - The ID of the upload session to commit
 * @param {Function} [callback] - Passed nothing if successful, error otherwise
 * @returns {Promise<void>} A promise resolving to nothing
 */
Files.prototype.abortUploadSession = function(sessionID, callback) {

	var apiURL = this.client._uploadBaseURL + urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID);

	return this.client.wrapWithDefaultHandler(this.client.del)(apiURL, null, callback);
};

/**
 * Get a list of all parts that have been uploaded to an upload session
 *
 * API Endpoint: '/files/upload_sessions/:sessionID/parts'
 * Method: GET
 *
 * @param {string} sessionID - The ID of the session to get a list of parts from
 * @param {Object} [options] - Optional parameters, can be left null
 * @param {string} [options.offset] - Paging offset for the list of parts
 * @param {int} [options.limit] - Maximum number of parts to return
 * @param {Function} [callback] - Passed the list of parts if successful
 * @returns {Promise<Object>} A promise resolving to the collection of uploaded parts
 */
Files.prototype.getUploadSessionParts = function(sessionID, options, callback) {

	var apiURL = this.client._uploadBaseURL + urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID, 'parts'),
		params = {
			qs: options
		};

	return this.client.wrapWithDefaultHandler(this.client.get)(apiURL, params, callback);
};

/**
 * Get the status of an upload session, e.g. whether or not is has started or
 * finished committing
 *
 * API Endpoint: '/files/upload_sessions/:sessionID'
 * Method: GET
 *
 * @param {string} sessionID - The ID of the upload session to get the status of
 * @param {Function} [callback] - Passed the session status if successful
 * @returns {Promise<Object>} A promise resolving to the upload session object
 */
Files.prototype.getUploadSession = function(sessionID, callback) {

	var apiURL = this.client._uploadBaseURL + urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID);

	return this.client.wrapWithDefaultHandler(this.client.get)(apiURL, null, callback);
};

/**
 * Upload a file in chunks, which is generally faster and more reliable for
 * large files.
 *
 * API Endpoint: '/files/upload_sessions'
 * Method: POST
 *
 * @param {string} folderID - The ID of the folder to upload the file to
 * @param {int} size - The size of the file that will be uploaded
 * @param {string} name - The name of the file to be created
 * @param {Buffer|string|Readable} file - The file to upload
 * @param {Object} [options] - Optional parameters for the upload
 * @param {int} [options.parallelism] The number of chunks to upload concurrently
 * @param {int} [options.retryInterval] The amount of time to wait before retrying a failed chunk upload, in ms
 * @param {Function} [callback] - Passed the uploader if successful
 * @returns {Promise<ChunkedUploader>} A promise resolving to the chunked uploader
 */
Files.prototype.getChunkedUploader = function(folderID, size, name, file, options, callback) {

	return this.createUploadSession(folderID, size, name)
		.then(sessionInfo => new ChunkedUploader(this.client, sessionInfo, file, size, options))
		.asCallback(callback);
};

/**
 * Upload a new file version in chunks, which is generally faster and more
 * reliable for large files.
 *
 * API Endpoint: '/files/:fileID/upload_sessions'
 * Method: POST
 *
 * @param {string} fileID - The ID of the file to upload a new version of
 * @param {int} size - The size of the file that will be uploaded
 * @param {Buffer|string|Readable} file - The file to upload
 * @param {Object} [options] - Optional parameters for the upload
 * @param {int} [options.parallelism] The number of chunks to upload concurrently
 * @param {int} [options.retryInterval] The amount of time to wait before retrying a failed chunk upload, in ms
 * @param {Function} [callback] - Passed the uploader if successful
 * @returns {Promise<ChunkedUploader>} A promise resolving to the chunked uploader
 */
Files.prototype.getNewVersionChunkedUploader = function(fileID, size, file, options, callback) {

	return this.createNewVersionUploadSession(fileID, size)
		.then(sessionInfo => new ChunkedUploader(this.client, sessionInfo, file, size, options))
		.asCallback(callback);
};

/**
 * Requests collaborations on a given file.
 *
 * API Endpoint: '/files/:fileID/collaborations'
 * Method: GET
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {Object} [options] - Additional options. Can be left null in most cases.
 * @param {int} [options.limit] - The maximum number of collaborations to return
 * @param {int} [options.offset] - Paging parameter for the collaborations collection
 * @param {string} [options.fields] - Comma-separated list of fields to return on the collaboration objects
 * @param {Function} [callback] - Passed the collaborations if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the collection of collaborations on the file
 */
Files.prototype.getCollaborations = function(fileID, options, callback) {
	var params = {
		qs: options
	};
	var apiPath = urlPath(BASE_PATH, fileID, '/collaborations');
	return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
};

/**
 * Enum of valid x-rep- hint values for generating representation info
 *
 * @readonly
 * @enum {FileRepresentationType}
 */
Files.prototype.representation = {
	PDF: '[pdf]',
	THUMBNAIL: '[jpg?dimensions=320x320]',
	IMAGE_MEDIUM: '[jpg?dimensions=1024x1024][png?dimensions=1024x1024]',
	IMAGE_LARGE: '[jpg?dimensions=2048x2048][png?dimensions=2048x2048]',
	EXTRACTED_TEXT: '[extracted_text]'
};
/**
 * Requests information for all representation objects generated for a specific Box file
 *
 * API Endpoint: '/files/:fileID?fields=representations'
 * Method : GET
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {client.files.representation} representationType - The x-rep-hints value the application should create a
 *    representation for. This value can either come from FileRepresentationType enum or manually created
 * @param {Function} [callback] - Passed an array of representaton objects if successful
 * @returns {Promise<Object>} A promise resolving to the representation response objects
*/
Files.prototype.getRepresentationInfo = function(fileID, representationType, callback) {
	var params = {
		qs: {
			fields: 'representations'
		},
		headers: {
			'x-rep-hints': representationType
		}
	};
	var apiPath = urlPath(BASE_PATH, fileID);

	return this.client.get(apiPath, params)
		.then(response => {
			switch (response.statusCode) {
			// 202 - A Box file representation will be generated, but is not ready yet
			case httpStatusCodes.ACCEPTED:
				throw errors.buildResponseError(response, 'Representation not ready at this time');

			// 200 - A Boxfile representation generated successfully
			// return the representation object
			case httpStatusCodes.OK:
				return response.body.representations;

			// Unexpected Response
			default:
				throw errors.buildUnexpectedResponseError(response);
			}
		})
		.asCallback(callback);
};
/**
 * @module box-node-sdk/lib/managers/files
 * @see {@Link Files}
 */
module.exports = Files;

/**
 * @fileoverview Manager for the Box Files Resource
 * @author fschott
 */

'use strict';


// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var urlPath = require('../util/url-path'),
	errors = require('../util/errors'),
	httpStatusCodes = require('http-status'),
	fs = require('fs'),
	path = require('path'),
	dateFormat = require('dateformat'),
	nodeSHA1 = require('node-sha1'),
	stream = require('stream');

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

// Base path for all files endpoints
var BASE_PATH = '/files';

/**
 * Return the file metadata for a local file, including name, size, content_created_at, and content_modified_at.
 *
 * @param {string} filePath - The path of the file
 * @param {Function} callback - Passed the file metadata object
 * @returns {void}
 * @private
 */
function getMetadataForFile(filePath, callback) {
	fs.stat(filePath, (err, stats) => {
		if (err) {
			callback(err);
			return;
		}

		callback(null, {
			name: path.basename(filePath),
			size: stats.size,
			content_created_at: dateFormat(stats.birthtime, 'isoDateTime'),
			content_modified_at: dateFormat(stats.mtime, 'isoDateTime')
		});
	});
}

/**
 * Return the file metadata for upload content.  If the content is a string or Buffer it returns the size.
 * If the content is a stream created by fs.createReadStream(), it returns the file's name, size,
 * content_created_at, and content_modified_at.  The size takes into account the start and end
 * options on fs.createReadStream().
 *
 * @param {string|Buffer|Stream} content - The upload content (string, Buffer, or read stream)
 * @param {Function} callback - Passed the file metadata object
 * @returns {void}
 * @private
 */
function getMetadataForContent(content, callback) {
	// Copied logic from FormData._trackLength() in form_data.js:75
	if (Buffer.isBuffer(content)) {
		// For a Buffer, we only know the size.
		callback(null, {size: content.length});
		return;
	} else if (typeof content === 'string') {
		// For a string, we only know the size.
		callback(null, {size: Buffer.byteLength(content)});
		return;
	} else if (content instanceof stream && content.hasOwnProperty('fd') && content.path) {
		// For a stream created by fs.createReadStream(), stat the underlying file.
		getMetadataForFile(content.path, (err, metadata) => {
			if (err) {
				callback(err);
				return;
			}

			// Take the stream's start and end options into account.
			// TODO: There may be a bug in Node fs.createReadStream
			// It doesn't respect the `end` option unless there is a `start` option.
			// https://github.com/joyent/node/issues/7819
			// Fix it when node fixes it (by using the commented out line instead)
			// if (content.end != undefined && content.end != Infinity) {
			if (content.end !== undefined && content.end !== Infinity && content.start !== undefined) {
				// Note: content.end is *inclusive*
				metadata.size = (content.end + 1) - (content.start ? content.start : 0);
			} else {
				metadata.size = metadata.size - (content.start ? content.start : 0);
			}

			callback(null, metadata);
		});
		return;
	}

	// Unknown content type
	callback(null, {});
}

/**
 * Returns the SHA1 hash for upload content.
 *
 * @param {string|Buffer|Stream} content - The upload content (string, Buffer, or read stream)
 * @param {Function} callback - Passed the SHA1 hash
 * @returns {void}
 * @private
 */
function getSHA1ForContent(content, callback) {
	nodeSHA1(content, callback);
}

/**
 * Returns the multipart form value for file upload metadata.
 * @param {?string} parentFolderID - the ID of the parent folder to upload to
 * @param {Object} fileData - the file data that the uploaded file should have (filename, mod dates, size, etc)
 * @returns {Object} - the form value expected by the API for the 'metadata' key
 * @private
 */
function createFileMetadataFormData(parentFolderID, fileData) {
	// Although the filename and parent folder ID can be specified without using a
	// metadata form field, Platform has recommended that we use the metadata form
	// field to specify these parameters (one benefit is that UTF-8 characters can
	// be specified in the filename).
	let metadata = Object.assign({}, fileData);

	if (parentFolderID) {
		metadata.parent = {id: parentFolderID};
	}

	return JSON.stringify(metadata);
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
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the file information if it was acquired successfully
 * @returns {void}
 */
Files.prototype.get = function(fileID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, fileID);
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
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
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the download URL if request was successful.
 * @returns {void}
 */
Files.prototype.getDownloadURL = function(fileID, qs, callback) {
	var params = {
		qs: qs
	};

	var apiPath = urlPath(BASE_PATH, fileID, '/content');

	// Handle Special API Response
	this.client.get(apiPath, params, function(err, response) {

		// Error - No successful request could be made
		if (err) {
			callback(err);
			return;
		}

		/* eslint-disable callback-return */
		switch (response.statusCode) {

			// 302 - Found
			// No data returned, but the location header points to a download link for that file.
		case httpStatusCodes.FOUND:
			callback(null, response.headers.location);
			return;

			// 202 - Download isn't ready yet.
		case httpStatusCodes.ACCEPTED:
			callback(errors.buildResponseError(response, 'Download not ready at this time'));
			return;

			// Unexpected Response
		default:
			callback(errors.buildUnexpectedResponseError(response));
			return;
		}
		/* eslint-enable callback-return */
	});
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
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - passed the readable stream if request was successful
 * @returns {void}
 */
Files.prototype.getReadStream = function(fileID, qs, callback) {
	var self = this;

	// Get the download URL to download from
	this.getDownloadURL(fileID, qs, function(err, url) {
		if (err) {
			callback(err);
			return;
		}

		// Return a read stream to download the file
		self.client.get(url, {streaming: true}, callback);
	});
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
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Passed the thumbnail file or the URL to a placeholder thumbnail if successful.
 * @returns {void}
 */
Files.prototype.getThumbnail = function(fileID, qs, callback) {
	var params = {
		qs: qs,
		json: false
	};

	var apiPath = urlPath(BASE_PATH, fileID, '/thumbnail.png');

	// Handle Special API Response
	this.client.get(apiPath, params, function(err, response) {

		// Error - No successful request could be made
		if (err) {
			callback(err);
			return;
		}

		/* eslint-disable callback-return */
		switch (response.statusCode) {

			// 202 - Thumbnail will be generated, but is not ready yet
			// 302 - Thumbnail can not be generated
			// return the url for a thumbnail placeholder
		case httpStatusCodes.ACCEPTED:
		case httpStatusCodes.FOUND:
			callback(null, {
				statusCode: response.statusCode,
				location: response.headers.location
			});
			return;

			// 200 - Thumbnail image recieved
			// return the thumbnail file
		case httpStatusCodes.OK:
			callback(null, {
				statusCode: response.statusCode,
				file: response.body
			});
			return;

			// Unexpected Response
		default:
			callback(errors.buildUnexpectedResponseError(response));
			return;
		}
		/* eslint-enable callback-return */
	});
};

/**
 * Gets the comments on a file.
 *
 * API Endpoint: '/files/:fileID/comments'
 * Method: GET
 *
 * @param {string} fileID - Box file id of the file
 * @param {?Object} qs - Optional additional querystring to add to the request. Can be left null in most cases.
 * @param {Function} callback - passed the file comments if they were successfully acquired
 * @returns {void}
 */
Files.prototype.getComments = function(fileID, qs, callback) {
	var params = {
		qs: qs
	};
	var apiPath = urlPath(BASE_PATH, fileID, '/comments');
	this.client.get(apiPath, params, this.client.defaultResponseHandler(callback));
};


/**
 * Update some information about a given file.
 *
 * API Endpoint: '/files/:fileID'
 * Method: PUT
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {?Object} options - File fields to update
 * @param {Function} callback - Passed the updated file information if it was acquired successfully
 * @returns {void}
 */
Files.prototype.update = function(fileID, options, callback) {
	var params = {
		body: options
	};

	var apiPath = urlPath(BASE_PATH, fileID);
	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};


/**
 * Move a file into a new parent folder.
 *
 * API Endpoint: '/files/:fileID'
 * Method: PUT
 *
 * @param {string} fileID - The Box ID of the file being requested
 * @param {string} newParentID - The Box ID for the new parent folder. '0' to move to All Files.
 * @param {Function} callback - Passed the updated file information if it was acquired successfully
 * @returns {void}
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
	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Copy a file into a new folder.
 *
 * API Endpoint: '/files/:fileID/copy
 * Method: POST
 *
 * @param {string} fileID - The Box ID of the file being requested
 * @param {string} newParentID - The Box ID for the new parent folder. '0' to copy to All Files.
 * @param {Function} callback - passed the new file info if call was successful
 * @returns {void}
 */
Files.prototype.copy = function(fileID, newParentID, callback) {
	var params = {
		body: {
			parent: {
				id: newParentID
			}
		}
	};
	var apiPath = urlPath(BASE_PATH, fileID, '/copy');
	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
};

/**
 * Delete a given file.
 *
 * API Endpoint: '/files/:fileID'
 * Method: DELETE
 *
 * @param {string} fileID - Box ID of the file being requested
 * @param {Function} callback - Empty response body passed if successful.
 * @returns {void}
 */
Files.prototype.delete = function(fileID, callback) {

	var apiPath = urlPath(BASE_PATH, fileID);
	this.client.del(apiPath, null, this.client.defaultResponseHandler(callback));
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
 * @param {?Object} fileData - Optional data about the file to be uploaded
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Called with upload data if successful, or err if the upload would not succeed
 * @returns {void}
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
	this.client.options(apiPath, params, this.client.defaultResponseHandler(callback));
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
 * @param {?Object} fileData - Optional data about the file to be uploaded
 * @param {?Object} qs - Additional options can be passed with the request via querystring. Can be left null in most cases.
 * @param {Function} callback - Called with upload data if successful, or err if the upload would not succeed
 * @returns {void}
 */
Files.prototype.preflightUploadNewFileVersion = function(fileID, fileData, qs, callback) {
	var params = {
		qs: qs
	};

	if (fileData) {
		params.body = fileData;
	}

	var apiPath = urlPath(BASE_PATH, fileID, '/content');
	this.client.options(apiPath, params, this.client.defaultResponseHandler(callback));
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
 * @param {string|Buffer|Stream} content - the content of the file. It can be a string, a Buffer, or a read stream
 * (like that returned by fs.createReadStream()).
 * @param {Function} callback - called with data about the upload if successful, or an error if the
 * upload failed
 * @returns {void}
 */
Files.prototype.uploadFile = function(parentFolderID, filename, content, callback) {
	var apiPath = urlPath(BASE_PATH, '/content'),
		multipartFormData = {
			content: createFileContentFormData(content),
			metadata: createFileMetadataFormData(parentFolderID, { name: filename })
		};

	this.client.upload(apiPath, null, multipartFormData, this.client.defaultResponseHandler(callback));
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
 * @param {Function} callback - called with data about the upload if successful, or an error if the
 * upload failed
 * @returns {void}
 */
Files.prototype.uploadNewFileVersion = function(fileID, content, callback) {
	var apiPath = urlPath(BASE_PATH, fileID, '/content'),
		multipartFormData = {
			content: createFileContentFormData(content)
		};

	this.client.upload(apiPath, null, multipartFormData, this.client.defaultResponseHandler(callback));
};

/**
 * Upload a file, using the pre-flight upload API to validate the upload so that
 * the content isn't uploaded if the file can't be created.  Uses the Box Accelerator network, if available,
 * to speed up uploads of large files.
 *
 * @param {string} parentFolderID - The id of the parent folder to upload to
 * @param {Object} fileAttributes - File name, size, create date, etc.
 * @param {string|Buffer|Stream} content - The upload content (string, Buffer, or read stream)
 * @param {Object} options - Upload options
 * @param {boolean} [options.usePreflight=true] - Call the pre-flight upload API before uploading the file. This
 * avoids uploading the file in the case of errors (e.g. storage_limit_exceeded, access_denied_insufficient_permissions, etc.)
 * @param {boolean} [options.useAccelerator=true] - Use Box Accelerator, if available. Requires the 'usePreflight' option
 * @param {Function} callback - Passed the file info of the uploaded file
 * @returns {void}
 * @private
 */
Files.prototype.uploadFileWithPreflight = function(parentFolderID, fileAttributes, content, options, callback) {
	options = Object.assign({
		usePreflight: true,
		useAccelerator: true
	}, options);

	if (options.usePreflight) {
		// Call the pre-flight upload API
		this.preflightUploadFile(parentFolderID, fileAttributes, null, (err, uploadData) => {
			if (err) {
				callback(err);
				return;
			}

			// Get the upload URL to use (may use a Box Accelerator node, if appropriate)
			const uploadURL = (options.useAccelerator) ? uploadData.upload_url : null;

			// Upload the file
			this.uploadFileUsingUploadURL(parentFolderID, fileAttributes, content, uploadURL, callback);
		});
		return;
	}
	// Just upload the file directly
	this.uploadFileUsingUploadURL(parentFolderID, fileAttributes, content, null, callback);
};

/**
 * Upload a new file version, using the pre-flight upload API to validate the upload so that
 * the content isn't uploaded if the file version can't be created.  Uses the Box Accelerator network, if available,
 * to speed up uploads of large files.

 * @param {string} fileID - The id of the file to upload a new version of
 * @param {Object} fileAttributes - File name, size, create date, etc.
 * @param {string|Buffer|Stream} content - The upload content (string, Buffer, or read stream)
 * @param {Object} options - Upload options
 * @param {boolean} [options.usePreflight=true] - Call the pre-flight upload API before uploading the file. This
 * avoids uploading the file in the case of errors (e.g. storage_limit_exceeded, access_denied_insufficient_permissions, etc.)
 * @param {boolean} [options.useAccelerator=true] - Use Box Accelerator, if available. Requires the 'usePreflight' option
 * @param {Function} callback - Passed the file info of the uploaded file
 * @returns {void}
 * @private
 */
Files.prototype.uploadNewFileVersionWithPreflight = function(fileID, fileAttributes, content, options, callback) {
	options = Object.assign({
		usePreflight: true,
		useAccelerator: true
	}, options);

	if (options.usePreflight) {
		// Call the pre-flight upload API
		this.preflightUploadNewFileVersion(fileID, fileAttributes, null, (err, uploadData) => {
			if (err) {
				callback(err);
				return;
			}
			// Get the upload URL to use (may use a Box Accelerator node, if appropriate)
			const uploadURL = (options.useAccelerator) ? uploadData.upload_url : null;

			// Upload the new version
			this.uploadNewFileVersionUsingUploadURL(fileID, fileAttributes, content, uploadURL, callback);
		});
		return;
	}
	// Just upload the new version directly
	this.uploadNewFileVersionUsingUploadURL(fileID, fileAttributes, content, null, callback);
};

/**
 * Upload a file, using a specific upload URL.
 *
 * @param {string} parentFolderID - The id of the parent folder to upload to
 * @param {Object} fileAttributes - File name, size, create date, etc.
 * @param {string|Buffer|Stream} content - The upload content (string, Buffer, or read stream)
 * @param {?string} uploadURL - The upload URL to use
 * @param {Function} callback - Passed the file info of the uploaded file
 * @returns {void}
 * @private
 */
Files.prototype.uploadFileUsingUploadURL = function(parentFolderID, fileAttributes, content, uploadURL, callback) {
	uploadURL = uploadURL || urlPath(BASE_PATH, '/content');

	let params = Object.assign({}, fileAttributes);
	params.parent = {id: parentFolderID};

	const multipartFormData = {
		content: createFileContentFormData(content),
		metadata: createFileMetadataFormData(parentFolderID, fileAttributes)
	};

	this.client.upload(uploadURL, null, multipartFormData, this.client.defaultResponseHandler(callback));
};

/**
 * Upload a new file version, using a specific upload URL.

 * @param {string} fileID - The id of the file to upload a new version of
 * @param {Object} fileAttributes - File name, size, create date, etc.
 * @param {string|Buffer|Stream} content - The upload content (string, Buffer, or read stream)
 * @param {?string} uploadURL - The upload URL to use
 * @param {Function} callback - Passed the file info of the uploaded file
 * @returns {void}
 * @private
 */
Files.prototype.uploadNewFileVersionUsingUploadURL = function(fileID, fileAttributes, content, uploadURL, callback) {
	uploadURL = uploadURL || urlPath(BASE_PATH, fileID, '/content');

	const multipartFormData = {
		content: createFileContentFormData(content),
		metadata: createFileMetadataFormData(null, fileAttributes)
	};

	this.client.upload(uploadURL, null, multipartFormData, this.client.defaultResponseHandler(callback));
};

/**
 * Upload a file, automatically passing the file metadata, including the name, size,
 * creation date, and modification date.  Uses the pre-flight upload API to validate the upload so that
 * the content isn't uploaded if the file can't be created.  Uses the Box Accelerator network, if available,
 * to speed up uploads of large files. Includes options to create a new file version if the file already exists
 * and to avoid uploading identical files.
 *
 * @param {string} parentFolderID - The id of the parent folder to upload to
 * @param {?Object} fileAttributes - You can override the attributes from the file's metadata (e.g. set 'name'
 * to use a different file name)
 * @param {string} fileAttributes.name - For files, defaults to the file's 'basename'.  Required option for strings and Buffers
 * @param {int} fileAttributes.size - Defaults to the size of the string, Buffer, or file
 * @param {string} fileAttributes.content_created_at - For files, defaults to the file's 'birthtime'
 * @param {string} fileAttributes.content_modified_at - For files, defaults to the file's 'mtime'
 * @param {string|Buffer|Stream} content - The upload content (string, Buffer, or read stream)
 * @param {?Object} options - Upload options
 * @param {boolean} [options.createNewVersion=false] - Create a new version of the file if a file with that name already exists
 * @param {boolean} [options.skipDuplicates=true] - Don't upload the file if the existing file has the same SHA-1
 * @param {boolean} [options.preserveTimestamps=true] - Preserve the file's creation date, and modification date.
 * If false, the file's timestamps will be set to the upload time
 * @param {boolean} [options.usePreflight=true] - Call the pre-flight upload API before uploading the file. This
 * avoids uploading the file in the case of errors (e.g. storage_limit_exceeded, access_denied_insufficient_permissions, etc.)
 * @param {boolean} [options.useAccelerator=true] - Use Box Accelerator, if available. Requires the 'usePreflight' option
 * @param {Function} callback - Passed the file info of the uploaded file
 * @returns {void}
 */
Files.prototype.uploadFileWithOptions = function(parentFolderID, fileAttributes, content, options, callback) {
	options = Object.assign({
		createNewVersion: false,
		skipDuplicates: true,
		preserveTimestamps: true,
		usePreflight: true,
		useAccelerator: true
	}, options);

	// Get the metadata
	getMetadataForContent(content, (err, fileData) => {
		if (err) {
			// Error getting the metadata
			callback(err);
			return;
		}

		if (!options.preserveTimestamps) {
			delete fileData.content_created_at;
			delete fileData.content_modified_at;
		}

		// Merge in additional attributes or overrides from fileAttributes
		if (fileAttributes) {
			Object.assign(fileData, fileAttributes);
		}

		// Ensure that we have a filename
		if (!fileData.name) {
			const err5 = new Error('Must specify file name for upload content');
			// TODO: Set err.type
			callback(err5);
			return;
		}

		// Try uploading the file (with pre-flight check and accelerator)
		this.uploadFileWithPreflight(parentFolderID, fileData, content, options, (err2, file) => {
			if (err2) {
				// Check if the upload failed due to an existing file of the same name
				if (options.createNewVersion &&
					err2.response &&
					err2.response.body &&
					err2.response.body.code === 'item_name_in_use' &&
					err2.response.body.context_info &&
					err2.response.body.context_info.conflicts &&
					// Can only updload a new version if the existing item is a file
					err2.response.body.context_info.conflicts.type === 'file' &&
					err2.response.body.context_info.conflicts.id) {
					// Get info about the existing file
					const {id, sha1} = err2.response.body.context_info.conflicts;

					// Check if the file is a duplicate
					if (options.skipDuplicates) {
						getSHA1ForContent(content, (err3, existingSHA1) => {
							if (err3) {
								// Error getting the SHA-1
								callback(err3);
								return;
							}

							if (sha1 === existingSHA1) {
								// Don't upload the file.
								const err4 = new Error('File not uploaded - existing file has same SHA-1');
								// TODO: Set err.type
								callback(err4);
								// TODO: Instead of returning an error, we could return the data from the existing item
								// callback(null, err.response.body.context_info.conflicts)
								return;
							}

							// Not a duplicate - upload the new version
							// TODO: Use etag to avoid possible race condition (existing file might have changed in the meanwhile)
							this.uploadNewFileVersionWithPreflight(id, fileData, content, options, callback);
						});
						return;
					}

					// Upload the new version
					// TODO: Use etag to avoid possible race condition (existing file might have changed in the meanwhile)
					this.uploadNewFileVersionWithPreflight(id, fileData, content, options, callback);
					return;
				}

				// There was some other error uploading the file
				callback(err2, file);
				return;
			}

			// The initial upload succeeded
			callback(null, file);
		});
	});
};

/**
 * Upload a new file version, automatically passing the file metadata, including the name, size,
 * creation date, and modification date.  Uses the pre-flight upload API to validate the upload so that
 * the content isn't uploaded if the file version can't be created.  Uses the Box Accelerator network, if available,
 * to speed up uploads of large files. Includes option to update the name of the file on Box.

 * @param {string} fileID - The id of the file to upload a new version of
 * @param {?Object} fileAttributes - You can override the attributes from the file's metadata (e.g. set 'name'
 * to use a different file name)
 * @param {string} fileAttributes.name - For files, defaults to the file's 'basename'.
 * @param {int} fileAttributes.size - Defaults to the size of the string, Buffer, or file
 * @param {string} fileAttributes.content_created_at - For files, defaults to the file's 'birthtime'
 * @param {string} fileAttributes.content_modified_at - For files, defaults to the file's 'mtime'
 * @param {string|Buffer|Stream} content - The upload content (string, Buffer, or read stream)
 * @param {?Object} options - Upload options
 * @param {boolean} [options.updateName=false] - Update the name of the file on Box to the name of the uploaded file
 * @param {boolean} [options.preserveTimestamps=true] - Preserve the file's creation date, and modification date.
 * If false, the file's timestamps will be set to the upload time
 * @param {boolean} [options.usePreflight=true] - Call the pre-flight upload API before uploading the file. This
 * avoids uploading the file in the case of errors (e.g. storage_limit_exceeded, access_denied_insufficient_permissions, etc.)
 * @param {boolean} [options.useAccelerator=true] - Use Box Accelerator, if available. Requires the 'usePreflight' option
 * @param {Function} callback - Passed the file info of the uploaded file
 * @returns {void}
 */
Files.prototype.uploadNewFileVersionWithOptions = function(fileID, fileAttributes, content, options, callback) {
	options = Object.assign({
		updateName: false,
		preserveTimestamps: true,
		usePreflight: true,
		useAccelerator: true
	}, options);

	// Get the metadata
	getMetadataForContent(content, (err, fileData) => {
		if (err) {
			// Error getting the metadata
			callback(err);
			return;
		}

		if (!options.updateName) {
			delete fileData.name;
		}

		if (!options.preserveTimestamps) {
			delete fileData.content_created_at;
			delete fileData.content_modified_at;
		}

		// Merge in additional attributes or overrides from fileAttributes
		if (fileAttributes) {
			Object.assign(fileData, fileAttributes);
		}

		// Upload the file (with pre-flight check and accelerator)
		this.uploadNewFileVersionWithPreflight(fileID, fileData, content, options, callback);
	});
};

/**
 * Retrieves all metadata associated with a file.
 *
 * API Endpoint: '/files/:fileID/metadata'
 * Method: GET
 *
 * @param {string} fileID - the ID of the file to get metadata for
 * @param {Function} callback - called with an array of metadata when successful
 * @returns {void}
 */
Files.prototype.getAllMetadata = function(fileID, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata');
	this.client.get(apiPath, null, this.client.defaultResponseHandler(callback));
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
 * @param {Function} callback - Passed the metadata template if successful
 * @returns {void}
 */
Files.prototype.getMetadata = function(fileID, scope, template, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template);
	this.client.get(apiPath, null, this.client.defaultResponseHandler(callback));
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
 * @param {Function} callback - Called with error if unsuccessful
 * @returns {void}
 */
Files.prototype.addMetadata = function(fileID, scope, template, data, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template),
		params = {
			body: data
		};

	this.client.post(apiPath, params, this.client.defaultResponseHandler(callback));
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
 * @param {Function} callback - Called with updated metadata if successful
 * @returns {void}
 */
Files.prototype.updateMetadata = function(fileID, scope, template, patch, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template),
		params = {
			body: patch,
			headers: {
				'Content-Type': 'application/json-patch+json'
			}
		};

	this.client.put(apiPath, params, this.client.defaultResponseHandler(callback));
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
 * @param {Function} callback - Called with nothing if successful, error otherwise
 * @returns {void}
 */
Files.prototype.deleteMetadata = function(fileID, scope, template, callback) {

	var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template);
	this.client.del(apiPath, null, this.client.defaultResponseHandler(callback));
};

/**
 * @module box-node-sdk/lib/managers/files
 * @see {@Link Files}
 */
module.exports = Files;

/**
 * @fileoverview Manager for the Box Files Resource
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import Promise from 'bluebird';
import crypto from 'crypto';
import httpStatusCodes from 'http-status';
import { Readable, Writable } from 'stream';
import urlTemplate from 'url-template';
import BoxClient from '../box-client';
import errors from '../util/errors';
import urlPath from '../util/url-path';
import * as schemas from "../schemas";

const ChunkedUploader = require('../chunked-uploader');

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * Enum of valid x-rep- hint values for generating representation info
 *
 * @readonly
 * @enum {FileRepresentationType}
 */
enum FileRepresentationType {
	PDF = '[pdf]',
	THUMBNAIL = '[jpg?dimensions=320x320]',
	IMAGE_MEDIUM = '[jpg?dimensions=1024x1024][png?dimensions=1024x1024]',
	IMAGE_LARGE = '[jpg?dimensions=2048x2048][png?dimensions=2048x2048]',
	EXTRACTED_TEXT = '[extracted_text]',
}

/**
 * @typedef {Object} UploadPart
 * @property {string} part_id An 8-character hexadecimal string identifying the part
 * @property {int} offset The byte offset of the part within the whole file
 * @property {int} size The size of the part in bytes
 */
type UploadPart = {
	part_id: string;
	offset: number;
	size: number;
};

/**
 * Enum of valid lock types
 *
 * @readonly
 * @enum {LockType}
 */
enum LockType {
	LOCK = 'lock',
	UNLOCK = 'unlock',
}

type FileSharedLinkAccess = 'open' | 'company' | 'collaborators' | null;

type FileSharedLinkPermissions = {
	/**
	 * If the shared link allows only to view files. This can only be set when access is set to open or company.
	 */
	can_view?: true,
	/**
	 * If the shared link allows only to download files. This can only be set when access is set to open or company.
	 */
	can_download?: boolean,
	/**
	 * If the shared link allows only to edit files. This can only be set when access is set to open or company.
	 */
	can_edit?: boolean,
}

type FileSharedLink = {
	/**
	 * The level of access for the shared link. This can be restricted to anyone with the link (open),
	 * only people within the company (company) and only those who have been invited to the file (collaborators).
	 *
	 * If not set, this field defaults to the access level specified by the enterprise admin.
	 * To create a shared link with this default setting pass the shared_link object with no access field.
	 * To remove access and change its value to default one pass the shared_link object with null value access field.
	 */
	access?: FileSharedLinkAccess,
	/**
	 * The password required to access the shared link. Set the password to null to remove it.
	 * A password can only be set when access is set to open.
	 */
	password?: string | null,
	/**
	 * The timestamp at which this shared link will expire. This field can only be set by users with paid accounts.
	 * The value must be greater than the current date and time.
	 * Example value: '2012-12-12T10:53:43-08:00'
	 */
	unshared_at?: string | null,
	/**
	 * Defines a custom vanity name to use in the shared link URL, for example vanity_name: "my-shared-link" will
	 * produce a shared link of "https://app.box.com/v/my-shared-link".
	 *
	 * Custom URLs should not be used when sharing sensitive content as vanity URLs are a lot easier to guess
	 * than regular shared links.
	 */
	vanity_name?: string | null,
	/**
	 * Defines what actions are allowed on a shared link.
	 */
	permissions?: FileSharedLinkPermissions
}

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

// Base path for all files endpoints
const BASE_PATH = '/files',
	VERSIONS_SUBRESOURCE = '/versions',
	WATERMARK_SUBRESOURCE = '/watermark',
	UPLOAD_SESSION_SUBRESOURCE = '/upload_sessions',
	ZIP_DOWNLOAD_PATH = '/zip_downloads';

/**
 * Returns the multipart form value for file upload metadata.
 * @param {string} parentFolderID - the ID of the parent folder to upload to
 * @param {string} filename - the file name that the uploaded file should have
 * @param {Object} [options] - Optional metadata
 * @returns {Object} - the form value expected by the API for the 'metadata' key
 * @private
 */
function createFileMetadataFormData(
	parentFolderID: string,
	filename: string,
	options?: Record<string, any>
) {
	// Although the filename and parent folder ID can be specified without using a
	// metadata form field, Platform has recommended that we use the metadata form
	// field to specify these parameters (one benefit is that UTF-8 characters can
	// be specified in the filename).
	var metadata = {
		name: filename,
		parent: { id: parentFolderID },
	};

	Object.assign(metadata, options);

	return JSON.stringify(metadata);
}

/**
 * Returns the multipart form value for file upload content.
 * @param {string|Buffer|Stream} content - the content of the file being uploaded
 * @param {Object} options - options for the content
 * @returns {Object} - the form value expected by the API for the 'content' key
 * @private
 */
function createFileContentFormData(
	content: string | Buffer | Readable,
	options?: Record<string, any>
) {
	// The upload API appears to look for a form field that contains a filename
	// property and assume that this form field contains the file content. Thus,
	// the value of name does not actually matter (as long as it does not conflict
	// with other field names). Similarly, the value of options.filename does not
	// matter either (as long as it exists), since the upload API will use the
	// filename specified in the metadata form field instead.
	return {
		value: content,
		options: Object.assign({ filename: 'unused' }, options),
	};
}

/**
 * Poll the representation info URL until representation is generated,
 * then return content URL template.
 * @param {BoxClient} client The client to use for making API calls
 * @param {string} infoURL The URL to use for getting representation info
 * @returns {Promise<string>} A promise resolving to the content URL template
 */
function pollRepresentationInfo(client: BoxClient, infoURL: string) {
	return client.get(infoURL).then((response: any /* FIXME */) => {
		if (response.statusCode !== 200) {
			throw errors.buildUnexpectedResponseError(response);
		}

		var info = response.body;

		switch (info.status.state) {
			case 'success':
			case 'viewable':
			case 'error':
				return info;
			case 'none':
			case 'pending':
				return Promise.delay(1000).then(() =>
					pollRepresentationInfo(client, infoURL)
				);
			default:
				throw new Error(`Unknown representation status: ${info.status.state}`);
		}
	});
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
class Files {
	client: BoxClient;

	representation!: typeof FileRepresentationType;

	constructor(client: BoxClient) {
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
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the file information if it was acquired successfully
	 * @returns {Promise<Object>} A promise resolving to the file object
	 */
	get(fileID: string, options?: Record<string, any>, callback?: Function) {
		var params = {
			qs: options,
		};
		var apiPath = urlPath(BASE_PATH, fileID);
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

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
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the download URL if request was successful.
	 * @returns {Promise<string>} A promise resolving to the file's download URL
	 */
	getDownloadURL(
		fileID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var params = {
			qs: options,
		};

		var apiPath = urlPath(BASE_PATH, fileID, '/content');

		// Handle Special API Response
		return this.client
			.get(apiPath, params)
			.then((response: any /* FIXME */) => {
				switch (response.statusCode) {
					// 302 - Found
					// No data returned, but the location header points to a download link for that file.
					case httpStatusCodes.FOUND:
						return response.headers.location;

					// 202 - Download isn't ready yet.
					case httpStatusCodes.ACCEPTED:
						throw errors.buildResponseError(
							response,
							'Download not ready at this time'
						);

					// Unexpected Response
					default:
						throw errors.buildUnexpectedResponseError(response);
				}
			})
			.asCallback(callback);
	}

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
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {string} [options.version] - ID of the version of this file to download
	 * @param {int[]} [options.byteRange] - starting and ending bytes of the file to read, e.g. [0, 99] to read the first 100 bytes
	 * @param {Function} [callback] - passed the readable stream if request was successful
	 * @returns {Promise<Readable>} A promise resolving for the file stream
	 */
	getReadStream(
		fileID: string,
		options?: {
			version?: string;
			byteRange?: number[];
		},
		callback?: Function
	) {
		options = options || {};

		var downloadStreamOptions = {
			streaming: true,
			headers: {} as Record<string, any>,
		};

		if (options.byteRange) {
			var range = options.byteRange;
			delete options.byteRange;
			downloadStreamOptions.headers.Range = `bytes=${range[0]}-${range[1]}`;
		}

		// Get the download URL to download from
		return (
			this.getDownloadURL(fileID, options)
				// Return a read stream to download the file
				.then((url: string) => this.client.get(url, downloadStreamOptions))
				.asCallback(callback)
		);
	}

	/**
	 * Gets the comments on a file.
	 *
	 * API Endpoint: '/files/:fileID/comments'
	 * Method: GET
	 *
	 * @param {string} fileID - Box file id of the file
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - passed the file comments if they were successfully acquired
	 * @returns {Promise<Object>} A promise resolving to the collection of comments
	 */
	getComments(
		fileID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var params = {
			qs: options,
		};
		var apiPath = urlPath(BASE_PATH, fileID, '/comments');
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Update some information about a given file.
	 *
	 * API Endpoint: '/files/:fileID'
	 * Method: PUT
	 *
	 * @param {string} fileID - Box ID of the file being requested
	 * @param {Object} updates - File fields to update
	 * @param {string} [updates.etag] Only apply the updates if the file etag matches
	 * @param {string} [updates.fields] Comma-separated list of fields to return
	 * @param {Function} [callback] - Passed the updated file information if it was acquired successfully
	 * @returns {Promise<Object>} A promise resolving to the update file object
	 */
	update(
		fileID: string,
		updates: {
			[key: string]: any;
			etag?: string;
			shared_link?: FileSharedLink;
			fields?: string;
		},
		callback?: Function
	) {
		var params: Record<string, any> = {
			body: updates,
		};

		if (updates && updates.etag) {
			params.headers = {
				'If-Match': updates.etag,
			};
			delete updates.etag;
		}

		if (updates && updates.fields) {
			params.qs = {
				fields: updates.fields,
			};
			delete updates.fields;
		}

		var apiPath = urlPath(BASE_PATH, fileID);
		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

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
	addToCollection(fileID: string, collectionID: string, callback?: Function) {
		return this.get(fileID, { fields: 'collections' })
			.then((data: Record<string, any>) => {
				var collections = data.collections || [];

				// Convert to correct format
				collections = collections.map((c: any /* FIXME */) => ({ id: c.id }));

				if (!collections.find((c: any /* FIXME */) => c.id === collectionID)) {
					collections.push({ id: collectionID });
				}

				return this.update(fileID, { collections });
			})
			.asCallback(callback);
	}

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
	removeFromCollection(
		fileID: string,
		collectionID: string,
		callback?: Function
	) {
		return this.get(fileID, { fields: 'collections' })
			.then((data: any /* FIXME */) => {
				var collections = data.collections || [];
				// Convert to correct object format and remove the specified collection
				collections = collections
					.map((c: any /* FIXME */) => ({ id: c.id }))
					.filter((c: any /* FIXME */) => c.id !== collectionID);

				return this.update(fileID, { collections });
			})
			.asCallback(callback);
	}

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
	move(fileID: string, newParentID: string, callback?: Function) {
		var params = {
			body: {
				parent: {
					id: newParentID,
				},
			},
		};
		var apiPath = urlPath(BASE_PATH, fileID);
		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

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
	copy(
		fileID: string,
		newParentID: string,
		options?:
			| {
					name?: string;
			  }
			| Function,
		callback?: Function
	) {
		// @NOTE(mwiller) 2016-10-25: Shuffle arguments to maintain backward compatibility
		//  This can be removed at the v2.0 update
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		options = options || {};

		(options as Record<string, any>).parent = {
			id: newParentID,
		};

		var params = {
			body: options,
		};
		var apiPath = urlPath(BASE_PATH, fileID, '/copy');
		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Delete a given file.
	 *
	 * API Endpoint: '/files/:fileID'
	 * Method: DELETE
	 *
	 * @param {string} fileID - Box ID of the file being requested
	 * @param {Object} [options] Optional parameters
	 * @param {string} [options.etag] Only delete the file if the etag value matches
	 * @param {Function} [callback] - Empty response body passed if successful.
	 * @returns {Promise<void>} A promise resolving to nothing
	 */
	delete(
		fileID: string,
		options?:
			| {
					[key: string]: any;
					etag?: string;
			  }
			| Function,
		callback?: Function
	) {
		// Switch around arguments if necessary for backwards compatibility
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		var params: Record<string, any> = {};

		if (options && options.etag) {
			params.headers = {
				'If-Match': options.etag,
			};
		}

		var apiPath = urlPath(BASE_PATH, fileID);
		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			params,
			callback
		);
	}

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
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Called with upload data if successful, or err if the upload would not succeed
	 * @returns {Promise<Object>} A promise resolving to the upload data
	 */
	preflightUploadFile(
		parentFolderID: string,
		fileData?: Record<string, any>,
		options?: Record<string, any>,
		callback?: Function
	) {
		var params = {
			body: {
				parent: {
					id: parentFolderID,
				},
			},
			qs: options,
		};

		if (fileData) {
			Object.assign(params.body, fileData);
		}
		var apiPath = urlPath(BASE_PATH, '/content');
		return this.client.wrapWithDefaultHandler(this.client.options)(
			apiPath,
			params,
			callback
		);
	}

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
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Called with upload data if successful, or err if the upload would not succeed
	 * @returns {Promise<Object>} A promise resolving to the upload data
	 */
	preflightUploadNewFileVersion(
		fileID: string,
		fileData?: Record<string, any>,
		options?: Record<string, any>,
		callback?: Function
	) {
		var params: Record<string, any> = {
			qs: options,
		};

		if (fileData) {
			params.body = fileData;
		}

		var apiPath = urlPath(BASE_PATH, fileID, '/content');
		return this.client.wrapWithDefaultHandler(this.client.options)(
			apiPath,
			params,
			callback
		);
	}

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
	promoteVersion(fileID: string, versionID: string, callback?: Function) {
		var apiPath = urlPath(BASE_PATH, fileID, VERSIONS_SUBRESOURCE, '/current'),
			params = {
				body: {
					type: 'file_version',
					id: versionID,
				},
			};

		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

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
	 * @param {Object} [options] - Optional parameters
	 * @param {string} [options.content_created_at] - RFC 3339 timestamp when the file was created
	 * @param {string} [options.content_modified_at] - RFC 3339 timestamp when the file was last modified
	 * @param {int} [options.content_length] - Optional length of the content. Required if content is a read stream of any type other than fs stream.
	 * @param {string} [options.description] - Optional description of the uploaded file.
	 * @param {Function} [callback] - called with data about the upload if successful, or an error if the
	 * upload failed
	 * @returns {Promise<Object>} A promise resolving to the uploaded file
	 */
	uploadFile(
		parentFolderID: string,
		filename: string,
		content: string | Buffer | Readable,
		options?:
			| {
					content_created_at?: string;
					content_modified_at?: string;
					content_length?: number;
					description?: string;
			  }
			| Function,
		callback?: Function
	) {
		// Shuffle around optional parameter
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		var formOptions: Record<string, any> = {};
		if (options && options.hasOwnProperty('content_length')) {
			formOptions.knownLength = options.content_length;
			// Delete content_length from options so it's not added to the attributes of the form
			delete options.content_length;
		}

		var apiPath = urlPath(BASE_PATH, '/content'),
			multipartFormData = {
				attributes: createFileMetadataFormData(
					parentFolderID,
					filename,
					options
				),
				content: createFileContentFormData(content, formOptions),
			};

		return this.client.wrapWithDefaultHandler(this.client.upload)(
			apiPath,
			null,
			multipartFormData,
			callback
		);
	}

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
	 * @param {Object} [options] - Optional parameters
	 * @param {string} [options.content_modified_at] - RFC 3339 timestamp when the file was last modified
	 * @param {string} [options.name] - A new name for the file
	 * @param {int} [options.content_length] - Optional length of the content. Required if content is a read stream of any type other than fs stream.
	 * @param {string} [options.description] - Optional description of the uploaded new file version.
	 * @param {Function} [callback] - called with data about the upload if successful, or an error if the
	 * upload failed
	 * @returns {Promise<Object>} A promise resolving to the uploaded file
	 */
	uploadNewFileVersion(
		fileID: string,
		content: string | Buffer | Readable,
		options?:
			| {
					content_modified_at?: string;
					name?: string;
					content_length?: number;
					description?: string;
			  }
			| Function,
		callback?: Function
	) {
		// Shuffle around optional parameter
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		var apiPath = urlPath(BASE_PATH, fileID, '/content'),
			multipartFormData: Record<string, any> = {};

		var formOptions: Record<string, any> = {};
		if (options) {
			if (options.hasOwnProperty('content_length')) {
				formOptions.knownLength = options.content_length;
				// Delete content_length from options so it's not added to the attributes of the form
				delete options.content_length;
			}
			multipartFormData.attributes = JSON.stringify(options);
		}

		multipartFormData.content = createFileContentFormData(content, formOptions);

		return this.client.wrapWithDefaultHandler(this.client.upload)(
			apiPath,
			null,
			multipartFormData,
			callback
		);
	}

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
	getAllMetadata(fileID: string, callback?: Function) {
		var apiPath = urlPath(BASE_PATH, fileID, 'metadata');
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			null,
			callback
		);
	}

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
	getMetadata(
		fileID: string,
		scope: string,
		template: string,
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template);
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			null,
			callback
		);
	}

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
	addMetadata(
		fileID: string,
		scope: string,
		template: string,
		data: Record<string, any>,
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template),
			params = {
				body: data,
			};

		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

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
	updateMetadata(
		fileID: string,
		scope: string,
		template: string,
		patch: Record<string, any>,
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template),
			params = {
				body: patch,
				headers: {
					'Content-Type': 'application/json-patch+json',
				},
			};

		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Sets metadata on a file, overwriting any metadata that exists for the provided keys.
	 *
	 * @param {string} fileID - The file to set metadata on
	 * @param {string} scope - The scope of the metadata template
	 * @param {string} template - The key of the metadata template
	 * @param {Object} metadata - The metadata to set
	 * @param {Function} [callback] - Called with updated metadata if successful
	 * @returns {Promise<Object>} A promise resolving to the updated metadata
	 */
	setMetadata(
		fileID: string,
		scope: string,
		template: string,
		metadata: Record<string, any>,
		callback?: Function
	) {
		return this.addMetadata(fileID, scope, template, metadata)
			.catch((err: any /* FIXME */) => {
				if (err.statusCode !== 409) {
					throw err;
				}

				// Metadata already exists on the file; update instead
				var updates = Object.keys(metadata).map((key) => ({
					op: 'add',
					path: `/${key}`,
					value: metadata[key],
				}));

				return this.updateMetadata(fileID, scope, template, updates);
			})
			.asCallback(callback);
	}

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
	deleteMetadata(
		fileID: string,
		scope: string,
		template: string,
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, fileID, 'metadata', scope, template);
		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			null,
			callback
		);
	}

	/**
	 * Permanently deletes an item that is in the trash. The item will no longer exist in Box. This action cannot be undone.
	 *
	 * API Endpoint: '/files/:fileID/trash'
	 * Method: DELETE
	 *
	 * @param {string} fileID - The ID of the file to remove metadata from
	 * @param {Object} [options] Optional parameters
	 * @param {string} [options.etag] Only delete the file if the etag matches
	 * @param {Function} [callback] - Called with nothing if successful, error otherwise
	 * @returns {Promise<void>} A promise resolving to nothing
	 */
	deletePermanently(
		fileID: string,
		options?:
			| {
					[key: string]: any;
					etag?: string;
			  }
			| Function,
		callback?: Function
	) {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		var params: Record<string, any> = {};

		if (options && options.etag) {
			params.headers = {
				'If-Match': options.etag,
			};
		}

		var apiPath = urlPath(BASE_PATH, fileID, '/trash');
		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Retrieves a file that has been moved to the trash.
	 *
	 * API Endpoint: '/files/:fileID/trash'
	 * Method: GET
	 *
	 * @param {string} fileID - The ID of the file being requested
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the trashed file information if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the trashed file
	 */
	getTrashedFile(
		fileID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var params = {
			qs: options,
		};

		var apiPath = urlPath(BASE_PATH, fileID, 'trash');
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Retrieves all of the tasks for given file.
	 *
	 * API Endpoint: '/files/:fileID/tasks'
	 * Method: GET
	 *
	 * @param {string} fileID - The ID of the file to get tasks for
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the file tasks if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to a collections of tasks on the file
	 */
	getTasks(fileID: string, options?: Record<string, any>, callback?: Function) {
		var params = {
			qs: options,
		};

		var apiPath = urlPath(BASE_PATH, fileID, '/tasks');
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

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
	getEmbedLink(fileID: string, callback?: Function) {
		var params = {
			qs: {
				fields: 'expiring_embed_link',
			},
		};

		var apiPath = urlPath(BASE_PATH, fileID);
		return this.client
			.get(apiPath, params)
			.then((response: any /* FIXME */) => {
				if (response.statusCode !== httpStatusCodes.OK) {
					throw errors.buildUnexpectedResponseError(response);
				}

				return response.body.expiring_embed_link.url;
			})
			.asCallback(callback);
	}

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
	lock(
		fileID: string,
		options?: {
			expires_at?: string;
			is_download_prevented?: boolean;
		},
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, fileID),
			params = {
				body: {
					lock: {
						type: LockType.LOCK,
					},
				},
			};

		Object.assign(params.body.lock, options);

		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

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
	unlock(fileID: string, callback?: Function) {
		var apiPath = urlPath(BASE_PATH, fileID),
			params = {
				body: {
					lock: null,
				},
			};

		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

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
	restoreFromTrash(
		fileID: string,
		options?: {
			name?: string;
			parent_id?: string;
		},
		callback?: Function
	) {
		// Set up the parent_id parameter
		if (options && options.parent_id) {
			(options as Record<string, any>).parent = {
				id: options.parent_id,
			};

			delete options.parent_id;
		}

		var apiPath = urlPath(BASE_PATH, fileID),
			params = {
				body: options || {},
			};

		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * If there are previous versions of this file, this method can be used to retrieve information
	 * about the older versions.
	 *
	 * API Endpoint: '/files/:fileID/versions'
	 * Method: GET
	 *
	 * @param {string} fileID - The ID of the file to view version for
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed a list of previous file versions if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the collection of file versions
	 */
	getVersions(
		fileID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, fileID, VERSIONS_SUBRESOURCE),
			params = {
				qs: options,
			};

		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Used to retrieve the watermark for a corresponding Box file.
	 *
	 * API Endpoint: '/files/:fileID/watermark'
	 * Method: GET
	 *
	 * @param {string} fileID - The Box ID of the file to get watermark for
	 * @param {Object} [options] - Additional options for the request. Can be left null in most cases.
	 * @param {Function} [callback] - Passed the watermark information if successful, error otherwise
	 * @returns {Promise<Object>} A promise resolving to the watermark info
	 */
	getWatermark(
		fileID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, fileID, WATERMARK_SUBRESOURCE),
			params = {
				qs: options,
			};

		return this.client
			.get(apiPath, params)
			.then((response: any /* FIXME */) => {
				if (response.statusCode !== 200) {
					throw errors.buildUnexpectedResponseError(response);
				}

				return response.body.watermark;
			})
			.asCallback(callback);
	}

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
	applyWatermark(
		fileID: string,
		options?: Record<string, any>,
		callback?: Function
	) {
		var apiPath = urlPath(BASE_PATH, fileID, WATERMARK_SUBRESOURCE),
			params = {
				body: {
					watermark: {
						imprint: 'default', // Currently the API only supports default imprint
					},
				},
			};

		Object.assign(params.body.watermark, options);

		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}

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
	removeWatermark(fileID: string, callback: Function) {
		var apiPath = urlPath(BASE_PATH, fileID, WATERMARK_SUBRESOURCE);

		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			null,
			callback
		);
	}

	/**
	 * Discards a specific file version to the trash. Depending on the enterprise settings
	 * for this user, the item will either be actually deleted from Box or moved to the trash.
	 *
	 * API Endpoint: '/files/:fileID/version/:versionID'
	 * Method: DELETE
	 *
	 * @param {string} fileID - The file ID which old version will be moved to the trash or delete permanently
	 * @param {string} versionID - The ID of the version to move to the trash or delete permanently
	 * @param {Object} [options] Optional parameters
	 * @param {string} [options.etag] Only delete the version of the file etag matches
	 * @param {Function} [callback] - Empty response body, error otherwise
	 * @returns {Promise<void>} A promise resolving to nothing
	 */
	deleteVersion(
		fileID: string,
		versionID: string,
		options?:
			| {
					[key: string]: any;
					etag?: string;
			  }
			| Function,
		callback?: Function
	) {
		// Switch around arguments if necessary for backwwards compatibility
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		var params = {};

		if (options && options.etag) {
			(params as Record<string, any>).headers = {
				'If-Match': options.etag,
			};
		}

		var apiPath = urlPath(BASE_PATH, fileID, VERSIONS_SUBRESOURCE, versionID);

		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			params,
			callback
		);
	}

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
	createUploadSession(
		folderID: string,
		size: number,
		name: string,
		callback?: Function
	) {
		var apiURL =
				this.client._uploadBaseURL +
				urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE),
			params = {
				body: {
					folder_id: folderID,
					file_size: size,
					file_name: name,
				},
			};

		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiURL,
			params,
			callback
		);
	}

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
	createNewVersionUploadSession(
		fileID: string,
		size: number,
		callback?: Function
	) {
		var apiURL =
				this.client._uploadBaseURL +
				urlPath(BASE_PATH, fileID, UPLOAD_SESSION_SUBRESOURCE),
			params = {
				body: {
					file_size: size,
				},
			};

		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiURL,
			params,
			callback
		);
	}

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
	uploadPart(
		sessionID: string,
		part: Buffer | string,
		offset: number,
		totalSize: number,
		callback?: Function
	) {
		var apiURL =
			this.client._uploadBaseURL +
			urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID);
		var hash = crypto.createHash('sha1').update(part).digest('base64');

		var params = {
			headers: {
				'Content-Type': 'application/octet-stream',
				Digest: `SHA=${hash}`,
				'Content-Range': `bytes ${offset}-${
					offset + part.length - 1
				}/${totalSize}`,
			},
			json: false,
			body: part,
		};

		return this.client
			.put(apiURL, params)
			.then((response: any /* FIXME */) => {
				if (response.statusCode !== 200) {
					throw errors.buildUnexpectedResponseError(response);
				}

				return JSON.parse(response.body);
			})
			.asCallback(callback);
	}

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
	 * @param {string} [options.description] - Optional description of the uploaded file.
	 * @param {Function} [callback] - Passed the new file information if successful
	 * @returns {Promise<Object>} A promise resolving to the uploaded file object
	 */
	commitUploadSession(
		sessionID: string,
		fileHash: string,
		options?: {
			parts?: UploadPart[];
			description?: string;
		},
		callback?: Function
	) {
		options = options || {};

		var userParts;
		if (options.parts) {
			userParts = options.parts;
			delete options.parts;
		}

		var apiURL =
				this.client._uploadBaseURL +
				urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID, 'commit'),
			params = {
				headers: {
					Digest: `SHA=${fileHash}`,
				},
				body: {
					attributes: options,
				} as Record<string, any>,
			};

		var fetchParts = (
			offset: any /* FIXME */,
			fetchedParts: any /* FIXME */
		) => {
			let pagingOptions = {
				limit: 1000,
				offset,
			};

			return this.getUploadSessionParts(sessionID, pagingOptions).then((
				data: any /* FIXME */
			) => {
				fetchedParts = fetchedParts.concat(data.entries);

				if (data.offset + data.entries.length >= data.total_count) {
					return Promise.resolve(fetchedParts);
				}

				return fetchParts(offset + data.limit, fetchedParts);
			});
		};

		return (userParts ? Promise.resolve(userParts) : fetchParts(0, []))
			.then((parts: any[] /* FIXME */) => {
				// Commit the upload with the list of parts
				params.body.parts = parts;
				return this.client.post(apiURL, params);
			})
			.then((response: any /* FIXME */) => {
				if (response.statusCode === 201) {
					return response.body;
				}

				if (response.statusCode === 202) {
					var retryInterval = response.headers['retry-after'] || 1;
					return Promise.delay(retryInterval * 1000).then(() => {
						// Ensure we don't have to fetch parts from the API again on retry
						options = Object.assign({}, options, { parts: params.body.parts });
						return this.commitUploadSession(sessionID, fileHash, options);
					});
				}

				throw errors.buildUnexpectedResponseError(response);
			})
			.asCallback(callback);
	}

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
	abortUploadSession(sessionID: string, callback?: Function) {
		var apiURL =
			this.client._uploadBaseURL +
			urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID);

		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiURL,
			null,
			callback
		);
	}

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
	getUploadSessionParts(
		sessionID: string,
		options?: {
			offset?: string;
			limit?: number;
		},
		callback?: Function
	) {
		var apiURL =
				this.client._uploadBaseURL +
				urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID, 'parts'),
			params = {
				qs: options,
			};

		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiURL,
			params,
			callback
		);
	}

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
	getUploadSession(sessionID: string, callback?: Function) {
		var apiURL =
			this.client._uploadBaseURL +
			urlPath(BASE_PATH, UPLOAD_SESSION_SUBRESOURCE, sessionID);

		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiURL,
			null,
			callback
		);
	}

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
	 * @param {Object} [options.fileAttributes] Attributes to set on the newly-uploaded file
	 * @param {Function} [callback] - Passed the uploader if successful
	 * @returns {Promise<ChunkedUploader>} A promise resolving to the chunked uploader
	 */
	getChunkedUploader(
		folderID: string,
		size: number,
		name: string,
		file: Buffer | string | Readable,
		options?: {
			parallelism?: number;
			retryInterval?: number;
			fileAttributes?: Record<string, any>;
		},
		callback?: Function
	) {
		if (file instanceof Readable) {
			// Need to pause the stream immediately to prevent certain libraries,
			// e.g. request from placing the stream into flowing mode and consuming bytes
			file.pause();
		}

		return this.createUploadSession(folderID, size, name)
			.then(
				(sessionInfo: any /* FIXME */) =>
					new ChunkedUploader(this.client, sessionInfo, file, size, options)
			)
			.asCallback(callback);
	}

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
	 * @param {Object} [options.fileAttributes] Attributes to set on the updated file object
	 * @param {Function} [callback] - Passed the uploader if successful
	 * @returns {Promise<ChunkedUploader>} A promise resolving to the chunked uploader
	 */
	getNewVersionChunkedUploader(
		fileID: string,
		size: number,
		file: Buffer | string | Readable,
		options?: {
			parallelism?: number;
			retryInterval?: number;
			fileAttributes?: Record<string, any>;
		},
		callback?: Function
	) {
		if (file instanceof Readable) {
			// Need to pause the stream immediately to prevent certain libraries,
			// e.g. request from placing the stream into flowing mode and consuming bytes
			file.pause();
		}

		return this.createNewVersionUploadSession(fileID, size)
			.then(
				(sessionInfo: any /* FIXME */) =>
					new ChunkedUploader(this.client, sessionInfo, file, size, options)
			)
			.asCallback(callback);
	}

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
	 * @returns {Promise<schemas.Collaborations>} A promise resolving to the collection of collaborations on the file
	 */
	getCollaborations(
		fileID: string,
		options?: {
			limit?: number;
			offset?: number;
			fields?: string;
		},
		callback?: Function
	): Promise<schemas.Collaborations> {
		var params = {
			qs: options,
		};
		var apiPath = urlPath(BASE_PATH, fileID, '/collaborations');
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}

	/**
	 * Requests information for all representation objects generated for a specific Box file
	 *
	 * API Endpoint: '/files/:fileID?fields=representations'
	 * Method : GET
	 *
	 * @param {string} fileID - Box ID of the file being requested
	 * @param {client.files.representation} representationType - The x-rep-hints value the application should create a
	 *    representation for. This value can either come from FileRepresentationType enum or manually created
	 * @param {Object} [options] - Additional options. Can be left empty
	 * @param {boolean} [options.generateRepresentations = false] - Set to true to return representation info where all states resolve to success.
	 * @param {Function} [callback] - Passed an array of representaton objects if successful
	 * @returns {Promise<Object>} A promise resolving to the representation response objects
	 */
	getRepresentationInfo(
		fileID: string,
		representationType: FileRepresentationType | string,
		options?:
			| {
					generateRepresentations?: boolean;
			  }
			| Function,
		callback?: Function
	) {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}
		if (!representationType && options && options.generateRepresentations) {
			throw new Error(
				'Must provide a valid X-Rep-Hints string to get representations with a success status'
			);
		}
		var params = {
			qs: {
				fields: 'representations',
			},
			headers: {
				'x-rep-hints': representationType,
			},
		};
		var apiPath = urlPath(BASE_PATH, fileID);

		return this.client
			.get(apiPath, params)
			.then((response: any /* FIXME */) => {
				switch (response.statusCode) {
					// 202 - A Box file representation will be generated, but is not ready yet
					case httpStatusCodes.ACCEPTED:
						throw errors.buildResponseError(
							response,
							'Representation not ready at this time'
						);

					// 200 - A Boxfile representation generated successfully
					// return the representation object
					case httpStatusCodes.OK:
						if (options && (options as any).generateRepresentations) {
							var data = response.body.representations.entries;
							var promiseArray = data.map((entry: any /* FIXME */) => {
								switch (entry.status.state) {
									case 'success':
									case 'viewable':
									case 'error':
										return Promise.resolve(entry);
									default:
										return pollRepresentationInfo(this.client, entry.info.url);
								}
							});

							return Promise.all(promiseArray).then((entries) => ({ entries }));
						}

						return response.body.representations;

					// Unexpected Response
					default:
						throw errors.buildUnexpectedResponseError(response);
				}
			})
			.asCallback(callback);
	}

	/**
	 * Get the contents of a representation of a file, e.g, the binary content of an image or pdf.
	 *
	 * API Endpoint: '/files/:fileID?fields=representations'
	 * Method : GET
	 *
	 * @param {string} fileID The file ID to get the representation of
	 * @param {string} representationType The X-Rep-Hints type to request
	 * @param {Object} [options] Optional parameters
	 * @param {string} [options.assetPath] Asset path for representations with multiple files
	 * @param {Function} [callback] Passed a stream over the representation contents if successful
	 * @returns {Promise<Readable>} A promise resolving to a stream over the representation contents
	 */
	getRepresentationContent(
		fileID: string,
		representationType: FileRepresentationType | string,
		options?: {
			assetPath?: string;
		},
		callback?: Function
	) {
		if (!representationType) {
			throw new Error('Must provide a valid X-Rep-Hints string');
		}

		options = Object.assign({ assetPath: '' }, options);

		return this.getRepresentationInfo(fileID, representationType)
			.then((reps: any /* FIXME */) => {
				var repInfo = reps.entries.pop();
				if (!repInfo) {
					throw new Error(
						'Could not get information for requested representation'
					);
				}
				if (!options?.assetPath && repInfo.properties?.paged == 'true') {
					options!.assetPath = `1.${repInfo.representation}`;
				}
				console.log('repInfo', JSON.parse(JSON.stringify(repInfo)));
				console.log('options', options);

				switch (repInfo.status.state) {
					case 'success':
					case 'viewable':
						return repInfo.content.url_template;
					case 'error':
						throw new Error('Representation had error status');
					case 'none':
					case 'pending':
						return pollRepresentationInfo(this.client, repInfo.info.url).then((
							info: any /* FIXME */
						) => {
							if (info.status.state === 'error') {
								throw new Error('Representation had error status');
							}
							return info.content.url_template;
						});
					default:
						throw new Error(
							`Unknown representation status: ${repInfo.status.state}`
						);
				}
			})
			.then((assetURLTemplate: string) => {
				var url = urlTemplate
					.parse(assetURLTemplate)
					.expand({ asset_path: options!.assetPath });
				return this.client.get(url, { streaming: true });
			})
			.asCallback(callback);
	}

	/**
	 * Creates a zip of multiple files and folders.
	 *
	 * API Endpoint: '/zip_downloads'
	 * Method: POST
	 *
	 * @param {name} name - The name of the zip file to be created
	 * @param {Array} items - Array of files or folders to be part of the created zip
	 * @param {Function} [callback] Passed a zip information object
	 * @returns {Promise<string>} A promise resolving to a zip information object
	 */
	createZip(name: string, items: any[] /* FIXME */, callback?: Function) {
		var params = {
			body: {
				download_file_name: name,
				items,
			},
		};

		return this.client.wrapWithDefaultHandler(this.client.post)(
			ZIP_DOWNLOAD_PATH,
			params,
			callback
		);
	}

	/**
	 * Creates a zip of multiple files and folders and downloads it.
	 *
	 * API Endpoint: '/zip_downloads'
	 * Method: GET
	 *
	 * @param {name} name - The name of the zip file to be created
	 * @param {Array} items - Array of files or folders to be part of the created zip
	 * @param {Stream} stream - Stream to pipe the readable stream of the zip file
	 * @param {Function} [callback] - Passed a zip download status object
	 * @returns {Promise<Readable>} A promise resolving to a zip download status object
	 */
	downloadZip(
		name: string,
		items: any[] /* FIXME */,
		stream: Writable,
		callback?: Function
	) {
		var downloadStreamOptions = {
			streaming: true,
			headers: {},
		};

		var params = {
			body: {
				download_file_name: name,
				items,
			},
		};

		return this.client
			.post(ZIP_DOWNLOAD_PATH, params)
			.then((response: any /* FIXME */) =>
				this.client
					.get(response.body.download_url, downloadStreamOptions)
					.then((responseStream: Readable) => {
						responseStream.pipe(stream);
						// eslint-disable-next-line promise/avoid-new
						return new Promise((resolve, reject) => {
							responseStream.on('end', () => resolve('Done downloading'));
							responseStream.on('error', (error) => reject(error));
						}).then(() =>
							this.client
								.get(response.body.status_url)
								.then((responseStatus: any /* FIXME */) => responseStatus.body)
						);
					})
			)
			.asCallback(callback);
	}
}

/**
 * Enum of valid x-rep- hint values for generating representation info
 *
 * @readonly
 * @enum {FileRepresentationType}
 */
Files.prototype.representation = FileRepresentationType;

/**
 * @module box-node-sdk/lib/managers/files
 * @see {@Link Files}
 */
export = Files;

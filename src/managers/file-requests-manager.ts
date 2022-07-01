import BoxClient from "../box-client";
import {FileRequest, FileRequestCopyRequest} from "../schemas";
import urlPath from "../util/url-path";

class FileRequestsManager {
	client: BoxClient;

	constructor(client: BoxClient) {
		// Attach the client, for making API calls
		this.client = client;
	}

	/**
	 * Gets File Request by ID.
	 * @param fileRequestId File Request ID
	 * @param {Function} [callback] Optional passed the user info if it was acquired successfully
	 * @returns {Promise<FileRequest>} Optional a promise with FileRequest details
	 */
	getById(fileRequestId: string, callback?: Function): Promise<FileRequest> {
		const apiPath = urlPath('file_requests', fileRequestId);
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath
		);
	}

	/**
	 * Delete File Request.
	 * @param fileRequestId File Request ID
	 * @param {Function} [callback] passed the user info if it was acquired successfully
	 * @returns {Promise<void>} Optional a promise resolving to nothing
	 */
	delete(fileRequestId: string,callback?: Function): Promise<FileRequest> {
		const apiPath = urlPath('file_requests', fileRequestId);
		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath
		);
	}

	/**
	 * Copies existing FileRequest to new folder
	 * @param fileRequestIdToCopy ID of file request to copy
	 * @param copyRequest Copy request details
	 * @param copyRequest.folder.id Required ID of folder to which file request will be copied
	 * @param copyRequest.folder.type Required type of folder. Value is always 'folder'
	 * @param copyRequest.title Optional new title of file request
	 * @param copyRequest.description Optional new description of file request
	 * @param copyRequest.expires_at Optional new date when file request expires
	 * @param copyRequest.is_description_required Optional is file request submitter required to provide a description
	 *   of the files they are submitting
	 * @param copyRequest.is_email_required Optional is file request submitter required to provide their email address
	 * @param copyRequest.status Optional new status of file request
	 * @param {Function} [callback] Optional passed the user info if it was acquired successfully
	 * @returns {Promise<`FileRequest>} Optional a promise with FileRequest details
	 */
	copy(fileRequestIdToCopy: string, copyRequest: FileRequestCopyRequest, callback?: Function): Promise<FileRequest> {
		const apiPath = urlPath('file_requests', fileRequestIdToCopy, 'copy');
		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			{body: copyRequest}
		);
	}
}

export = FileRequestsManager;

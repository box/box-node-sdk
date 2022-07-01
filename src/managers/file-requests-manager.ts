import BoxClient from "../box-client";
import * as schemas from '../schemas';
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
	 * @returns {Promise<schemas.FileRequest>} Promise with FileRequest details
	 */
	getById(fileRequestId: string): Promise<schemas.FileRequest> {
		const apiPath = urlPath('file_requests', fileRequestId);
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath
		);
	}

	/**
	 * Delete File Request.
	 * @param fileRequestId File Request ID
	 * @returns {Promise<void>} A promise resolving to nothing
	 */
	delete(fileRequestId: string): Promise<schemas.FileRequest> {
		const apiPath = urlPath('file_requests', fileRequestId);
		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath
		);
	}
}

export = FileRequestsManager;

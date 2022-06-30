import BoxClient from "../box-client";
import * as schemas from '../schemas';
import urlPath from "../util/url-path";

class FileRequestsManager {
	client: BoxClient;

	constructor(client: BoxClient) {
		// Attach the client, for making API calls
		this.client = client;
	}

	getById(fileRequestId: string): Promise<schemas.FileRequest> {
		const apiPath = urlPath('file_requests', fileRequestId);
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath
		);
	}
}

export = FileRequestsManager;

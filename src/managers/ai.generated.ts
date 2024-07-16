import BoxClient from '../box-client';
import urlPath from '../util/url-path';
import * as schemas from '../schemas';
/**
 */
class AIManager {
	client: BoxClient;
	/**
	 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
	 */
	constructor(client: BoxClient) {
		this.client = client;
	}
	/**
	 * Send AI question request
	 *
	 * Sends an AI request to supported LLMs and returns an answer specifically focused on the user's question given the provided context.
	 * @param {schemas.AiAsk} body
	 * @param {object} [options] Options for the request
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.AiResponse>} A promise resolving to the result or rejecting with an error
	 */
	ask(
		body: schemas.AiAsk,
		options?: {},
		callback?: Function
	): Promise<schemas.AiResponse> {
		const { ...queryParams } = options,
			apiPath = urlPath('ai', 'ask'),
			params = {
				qs: queryParams,
				body: body,
			};
		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}
	/**
	 * Send AI request to generate text
	 *
	 * Sends an AI request to supported LLMs and returns an answer specifically focused on the creation of new text.
	 * @param {schemas.AiTextGen} body
	 * @param {object} [options] Options for the request
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.AiResponse>} A promise resolving to the result or rejecting with an error
	 */
	textGen(
		body: schemas.AiTextGen,
		options?: {},
		callback?: Function
	): Promise<schemas.AiResponse> {
		const { ...queryParams } = options,
			apiPath = urlPath('ai', 'text_gen'),
			params = {
				qs: queryParams,
				body: body,
			};
		return this.client.wrapWithDefaultHandler(this.client.post)(
			apiPath,
			params,
			callback
		);
	}
}
export = AIManager;

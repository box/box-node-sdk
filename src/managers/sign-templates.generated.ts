import BoxClient from '../box-client';
import urlPath from '../util/url-path';
import * as schemas from '../schemas';
/**
 * Simple manager for interacting with all Sign Templates endpoints and actions.
 */
class SignTemplatesManager {
	client: BoxClient;
	/**
	 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
	 */
	constructor(client: BoxClient) {
		this.client = client;
	}
	/**
	 * Get Box Sign template by ID
	 *
	 * Fetches details of a specific Box Sign template.
	 * @param {object} options Options for the request
	 * @param {string} options.template_id The ID of a Box Sign template.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.SignTemplate>} A promise resolving to the result or rejecting with an error
	 */
	getById(
		options: {
			/**
			 * The ID of a Box Sign template.
			 */
			readonly template_id: string;
		},
		callback?: Function
	): Promise<schemas.SignTemplate> {
		const { template_id: templateId, ...queryParams } = options,
			apiPath = urlPath('sign_templates', templateId),
			params = {
				qs: queryParams,
			};
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}
	/**
	 * List Box Sign templates
	 *
	 * Gets Box Sign templates created by a user.
	 * @param {object} [options] Options for the request
	 * @param {string} [options.marker] Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`.
	 * @param {number} [options.limit] The maximum number of items to return per page.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.SignTemplates>} A promise resolving to the result or rejecting with an error
	 */
	getAll(
		options?: {
			/**
			 * Defines the position marker at which to begin returning results. This is
			 * used when paginating using marker-based pagination.
			 *
			 * This requires `usemarker` to be set to `true`.
			 */
			readonly marker?: string;
			/**
			 * The maximum number of items to return per page.
			 */
			readonly limit?: number;
		},
		callback?: Function
	): Promise<schemas.SignTemplates> {
		const { ...queryParams } = options,
			apiPath = urlPath('sign_templates'),
			params = {
				qs: queryParams,
			};
		return this.client.wrapWithDefaultHandler(this.client.get)(
			apiPath,
			params,
			callback
		);
	}
}
export = SignTemplatesManager;

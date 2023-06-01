import BoxClient from '../box-client';
import urlPath from '../util/url-path';
import * as schemas from '../schemas';
/**
 */
class IntegrationMappingsManager {
	client: BoxClient;
	/**
	 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
	 */
	constructor(client: BoxClient) {
		this.client = client;
	}
	/**
	 * List Slack integration mappings
	 *
	 * Lists [Slack integration mappings](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack) in a users' enterprise.
	 *
	 * You need Admin or Co-Admin role to
	 * use this endpoint.
	 * @param {object} [options] Options for the request
	 * @param {string} [options.marker] Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`.
	 * @param {number} [options.limit] The maximum number of items to return per page.
	 * @param {"channel"} [options.partner_item_type] Mapped item type, for which the mapping should be returned
	 * @param {string} [options.partner_item_id] ID of the mapped item, for which the mapping should be returned
	 * @param {string} [options.box_item_id] Box item ID, for which the mappings should be returned
	 * @param {"folder"} [options.box_item_type] Box item type, for which the mappings should be returned
	 * @param {boolean} [options.is_manually_created] Whether the mapping has been manually created
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.IntegrationMappings>} A promise resolving to the result or rejecting with an error
	 */
	getSlackIntegrationMappings(
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
			/**
			 * Mapped item type, for which the mapping should be returned
			 */
			readonly partner_item_type?: 'channel';
			/**
			 * ID of the mapped item, for which the mapping should be returned
			 */
			readonly partner_item_id?: string;
			/**
			 * Box item ID, for which the mappings should be returned
			 */
			readonly box_item_id?: string;
			/**
			 * Box item type, for which the mappings should be returned
			 */
			readonly box_item_type?: 'folder';
			/**
			 * Whether the mapping has been manually created
			 */
			readonly is_manually_created?: boolean;
		},
		callback?: Function
	): Promise<schemas.IntegrationMappings> {
		const { ...queryParams } = options,
			apiPath = urlPath('integration_mappings', 'slack'),
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
	 * Create Slack integration mapping
	 *
	 * Creates a [Slack integration mapping](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack)
	 * by mapping a Slack channel to a Box item.
	 *
	 * You need Admin or Co-Admin role to
	 * use this endpoint.
	 * @param {schemas.IntegrationMappingSlackCreateRequest} body
	 * @param {object} [options] Options for the request
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.IntegrationMapping>} A promise resolving to the result or rejecting with an error
	 */
	createSlackIntegrationMapping(
		body: schemas.IntegrationMappingSlackCreateRequest,
		options?: {},
		callback?: Function
	): Promise<schemas.IntegrationMapping> {
		const { ...queryParams } = options,
			apiPath = urlPath('integration_mappings', 'slack'),
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
	 * Update Slack integration mapping
	 *
	 * Updates a [Slack integration mapping](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack).
	 * Supports updating the Box folder ID and options.
	 *
	 * You need Admin or Co-Admin role to
	 * use this endpoint.
	 * @param {object} body
	 * @param {object} options Options for the request
	 * @param {string} options.integration_mapping_id An ID of an integration mapping
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.IntegrationMapping>} A promise resolving to the result or rejecting with an error
	 */
	updateSlackIntegrationMapping(
		body: object,
		options: {
			/**
			 * An ID of an integration mapping
			 */
			readonly integration_mapping_id: string;
		},
		callback?: Function
	): Promise<schemas.IntegrationMapping> {
		const { integration_mapping_id: integrationMappingId, ...queryParams } =
				options,
			apiPath = urlPath('integration_mappings', 'slack', integrationMappingId),
			params = {
				qs: queryParams,
				body: body,
			};
		return this.client.wrapWithDefaultHandler(this.client.put)(
			apiPath,
			params,
			callback
		);
	}
	/**
	 * Delete Slack integration mapping
	 *
	 * Deletes a [Slack integration mapping](https://support.box.com/hc/en-us/articles/4415585987859-Box-as-the-Content-Layer-for-Slack).
	 *
	 *
	 * You need Admin or Co-Admin role to
	 * use this endpoint.
	 * @param {object} options Options for the request
	 * @param {string} options.integration_mapping_id An ID of an integration mapping
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<void>} A promise resolving to the result or rejecting with an error
	 */
	deleteSlackIntegrationMappingById(
		options: {
			/**
			 * An ID of an integration mapping
			 */
			readonly integration_mapping_id: string;
		},
		callback?: Function
	): Promise<void> {
		const { integration_mapping_id: integrationMappingId, ...queryParams } =
				options,
			apiPath = urlPath('integration_mappings', 'slack', integrationMappingId),
			params = {
				qs: queryParams,
			};
		return this.client.wrapWithDefaultHandler(this.client.del)(
			apiPath,
			params,
			callback
		);
	}
}
export = IntegrationMappingsManager;

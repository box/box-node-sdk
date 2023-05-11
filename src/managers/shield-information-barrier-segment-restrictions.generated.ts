import BoxClient from '../box-client';
import urlPath from '../util/url-path';
import * as schemas from '../schemas';
/**
 */
class ShieldInformationBarrierSegmentRestrictionsManager {
	client: BoxClient;
	/**
	 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
	 */
	constructor(client: BoxClient) {
		this.client = client;
	}
	/**
	 * Get shield information barrier segment restriction by ID
	 *
	 * Retrieves a shield information barrier segment
	 * restriction based on provided ID.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_segment_restriction_id The ID of the shield information barrier segment Restriction.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierSegmentRestriction>} A promise resolving to the result or rejecting with an error
	 */
	getById(
		options: {
			/**
			 * The ID of the shield information barrier segment Restriction.
			 */
			readonly shield_information_barrier_segment_restriction_id: string;
		},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrierSegmentRestriction> {
		const {
				shield_information_barrier_segment_restriction_id:
					shieldInformationBarrierSegmentRestrictionId,
				...queryParams
			} = options,
			apiPath = urlPath(
				'shield_information_barrier_segment_restrictions',
				shieldInformationBarrierSegmentRestrictionId
			),
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
	 * List shield information barrier segment restrictions
	 *
	 * Lists shield information barrier segment restrictions
	 * based on provided segment ID.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_segment_id The ID of the shield information barrier segment.
	 * @param {string} [options.marker] Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`.
	 * @param {number} [options.limit] The maximum number of items to return per page.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<object>} A promise resolving to the result or rejecting with an error
	 */
	getAll(
		options: {
			/**
			 * The ID of the shield information barrier segment.
			 */
			readonly shield_information_barrier_segment_id: string;
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
	): Promise<object> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barrier_segment_restrictions'),
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
	 * Create shield information barrier segment restriction
	 *
	 * Creates a shield information barrier
	 * segment restriction object.
	 * @param {object} body
	 * @param {object} [options] Options for the request
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierSegmentRestriction>} A promise resolving to the result or rejecting with an error
	 */
	create(
		body: object,
		options?: {},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrierSegmentRestriction> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barrier_segment_restrictions'),
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
	 * Delete shield information barrier segment restriction by ID
	 *
	 * Delete shield information barrier segment restriction
	 * based on provided ID.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_segment_restriction_id The ID of the shield information barrier segment Restriction.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<void>} A promise resolving to the result or rejecting with an error
	 */
	deleteById(
		options: {
			/**
			 * The ID of the shield information barrier segment Restriction.
			 */
			readonly shield_information_barrier_segment_restriction_id: string;
		},
		callback?: Function
	): Promise<void> {
		const {
				shield_information_barrier_segment_restriction_id:
					shieldInformationBarrierSegmentRestrictionId,
				...queryParams
			} = options,
			apiPath = urlPath(
				'shield_information_barrier_segment_restrictions',
				shieldInformationBarrierSegmentRestrictionId
			),
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
export = ShieldInformationBarrierSegmentRestrictionsManager;

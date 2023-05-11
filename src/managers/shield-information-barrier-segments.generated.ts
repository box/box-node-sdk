import BoxClient from '../box-client';
import urlPath from '../util/url-path';
import * as schemas from '../schemas';
/**
 */
class ShieldInformationBarrierSegmentsManager {
	client: BoxClient;
	/**
	 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
	 */
	constructor(client: BoxClient) {
		this.client = client;
	}
	/**
	 * Get shield information barrier segment with specified ID
	 *
	 * Retrieves shield information barrier segment based on provided ID..
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_segment_id The ID of the shield information barrier segment.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierSegment>} A promise resolving to the result or rejecting with an error
	 */
	getById(
		options: {
			/**
			 * The ID of the shield information barrier segment.
			 */
			readonly shield_information_barrier_segment_id: string;
		},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrierSegment> {
		const {
				shield_information_barrier_segment_id:
					shieldInformationBarrierSegmentId,
				...queryParams
			} = options,
			apiPath = urlPath(
				'shield_information_barrier_segments',
				shieldInformationBarrierSegmentId
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
	 * List shield information barrier segments
	 *
	 * Retrieves a list of shield information barrier segment objects
	 * for the specified Information Barrier ID.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_id The ID of the shield information barrier.
	 * @param {string} [options.marker] Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`.
	 * @param {number} [options.limit] The maximum number of items to return per page.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<object>} A promise resolving to the result or rejecting with an error
	 */
	getAll(
		options: {
			/**
			 * The ID of the shield information barrier.
			 */
			readonly shield_information_barrier_id: string;
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
			apiPath = urlPath('shield_information_barrier_segments'),
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
	 * Create shield information barrier segment
	 *
	 * Creates a shield information barrier segment.
	 * @param {object} body
	 * @param {object} [options] Options for the request
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierSegment>} A promise resolving to the result or rejecting with an error
	 */
	create(
		body: object,
		options?: {},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrierSegment> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barrier_segments'),
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
	 * Update shield information barrier segment with specified ID
	 *
	 * Updates the shield information barrier segment based on provided ID..
	 * @param {object} body
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_segment_id The ID of the shield information barrier segment.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierSegment>} A promise resolving to the result or rejecting with an error
	 */
	update(
		body: object,
		options: {
			/**
			 * The ID of the shield information barrier segment.
			 */
			readonly shield_information_barrier_segment_id: string;
		},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrierSegment> {
		const {
				shield_information_barrier_segment_id:
					shieldInformationBarrierSegmentId,
				...queryParams
			} = options,
			apiPath = urlPath(
				'shield_information_barrier_segments',
				shieldInformationBarrierSegmentId
			),
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
	 * Delete shield information barrier segment
	 *
	 * Deletes the shield information barrier segment
	 * based on provided ID.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_segment_id The ID of the shield information barrier segment.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<void>} A promise resolving to the result or rejecting with an error
	 */
	deleteById(
		options: {
			/**
			 * The ID of the shield information barrier segment.
			 */
			readonly shield_information_barrier_segment_id: string;
		},
		callback?: Function
	): Promise<void> {
		const {
				shield_information_barrier_segment_id:
					shieldInformationBarrierSegmentId,
				...queryParams
			} = options,
			apiPath = urlPath(
				'shield_information_barrier_segments',
				shieldInformationBarrierSegmentId
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
export = ShieldInformationBarrierSegmentsManager;

import BoxClient from '../box-client';
import urlPath from '../util/url-path';
import * as schemas from '../schemas';
/**
 */
class ShieldInformationBarrierManager {
	client: BoxClient;
	/**
	 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
	 */
	constructor(client: BoxClient) {
		this.client = client;
	}
	/**
	 * Get shield information barrier with specified ID
	 *
	 * Get shield information barrier based on provided ID.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_id The ID of the shield information barrier.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrier>} A promise resolving to the result or rejecting with an error
	 */
	getById(
		options: {
			/**
			 * The ID of the shield information barrier.
			 */
			readonly shield_information_barrier_id: string;
		},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrier> {
		const {
				shield_information_barrier_id: shieldInformationBarrierId,
				...queryParams
			} = options,
			apiPath = urlPath(
				'shield_information_barriers',
				shieldInformationBarrierId
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
	 * List shield information barriers
	 *
	 * Retrieves a list of shield information barrier objects
	 * for the enterprise of JWT.
	 * @param {object} [options] Options for the request
	 * @param {string} [options.marker] Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination.
	 * @param {number} [options.limit] The maximum number of items to return per page.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarriers>} A promise resolving to the result or rejecting with an error
	 */
	getAll(
		options?: {
			/**
			 * Defines the position marker at which to begin returning results. This is
			 * used when paginating using marker-based pagination.
			 */
			readonly marker?: string;
			/**
			 * The maximum number of items to return per page.
			 */
			readonly limit?: number;
		},
		callback?: Function
	): Promise<schemas.ShieldInformationBarriers> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barriers'),
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
	 * Create shield information barrier
	 *
	 * Creates a shield information barrier to
	 * separate individuals/groups within the same
	 * firm and prevents confidential information passing between them.
	 * @param {object} body
	 * @param {object} [options] Options for the request
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrier>} A promise resolving to the result or rejecting with an error
	 */
	create(
		body: object,
		options?: {},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrier> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barriers'),
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
	 * Add changed status of shield information barrier with specified ID
	 *
	 * Change status of shield information barrier with the specified ID.
	 * @param {object} body
	 * @param {object} [options] Options for the request
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrier>} A promise resolving to the result or rejecting with an error
	 */
	changeStatusById(
		body: object,
		options?: {},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrier> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barriers', 'change_status'),
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
export = ShieldInformationBarrierManager;

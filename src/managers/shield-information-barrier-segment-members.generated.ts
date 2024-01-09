import BoxClient from '../box-client';
import urlPath from '../util/url-path';
import * as schemas from '../schemas';
/**
 */
class ShieldInformationBarrierSegmentMembersManager {
	client: BoxClient;
	/**
	 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
	 */
	constructor(client: BoxClient) {
		this.client = client;
	}
	/**
	 * Get shield information barrier segment member by ID
	 *
	 * Retrieves a shield information barrier
	 * segment member by its ID.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_segment_member_id The ID of the shield information barrier segment Member.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierSegmentMember>} A promise resolving to the result or rejecting with an error
	 */
	getById(
		options: {
			/**
			 * The ID of the shield information barrier segment Member.
			 */
			readonly shield_information_barrier_segment_member_id: string;
		},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrierSegmentMember> {
		const {
				shield_information_barrier_segment_member_id:
					shieldInformationBarrierSegmentMemberId,
				...queryParams
			} = options,
			apiPath = urlPath(
				'shield_information_barrier_segment_members',
				shieldInformationBarrierSegmentMemberId
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
	 * List shield information barrier segment members
	 *
	 * Lists shield information barrier segment members
	 * based on provided segment IDs.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_segment_id The ID of the shield information barrier segment.
	 * @param {string} [options.marker] Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`.
	 * @param {number} [options.limit] The maximum number of items to return per page.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierSegmentMembers>} A promise resolving to the result or rejecting with an error
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
	): Promise<schemas.ShieldInformationBarrierSegmentMembers> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barrier_segment_members'),
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
	 * Create shield information barrier segment member
	 *
	 * Creates a new shield information barrier segment member.
	 * @param {object} body
	 * @param {object} [options] Options for the request
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierSegmentMember>} A promise resolving to the result or rejecting with an error
	 */
	create(
		body: object,
		options?: {},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrierSegmentMember> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barrier_segment_members'),
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
	 * Delete shield information barrier segment member by ID
	 *
	 * Deletes a shield information barrier
	 * segment member based on provided ID.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_segment_member_id The ID of the shield information barrier segment Member.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<void>} A promise resolving to the result or rejecting with an error
	 */
	deleteById(
		options: {
			/**
			 * The ID of the shield information barrier segment Member.
			 */
			readonly shield_information_barrier_segment_member_id: string;
		},
		callback?: Function
	): Promise<void> {
		const {
				shield_information_barrier_segment_member_id:
					shieldInformationBarrierSegmentMemberId,
				...queryParams
			} = options,
			apiPath = urlPath(
				'shield_information_barrier_segment_members',
				shieldInformationBarrierSegmentMemberId
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
export = ShieldInformationBarrierSegmentMembersManager;

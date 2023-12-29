import BoxClient from '../box-client';
import urlPath from '../util/url-path';
import * as schemas from '../schemas';
/**
 */
class ShieldInformationBarrierReportsManager {
	client: BoxClient;
	/**
	 * @param {BoxClient} client The Box API Client that is responsible for making calls to the API
	 */
	constructor(client: BoxClient) {
		this.client = client;
	}
	/**
	 * Get shield information barrier report by ID
	 *
	 * Retrieves a shield information barrier report by its ID.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_report_id The ID of the shield information barrier Report.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierReport>} A promise resolving to the result or rejecting with an error
	 */
	getById(
		options: {
			/**
			 * The ID of the shield information barrier Report.
			 */
			readonly shield_information_barrier_report_id: string;
		},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrierReport> {
		const {
				shield_information_barrier_report_id: shieldInformationBarrierReportId,
				...queryParams
			} = options,
			apiPath = urlPath(
				'shield_information_barrier_reports',
				shieldInformationBarrierReportId
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
	 * List shield information barrier reports
	 *
	 * Lists shield information barrier reports.
	 * @param {object} options Options for the request
	 * @param {string} options.shield_information_barrier_id The ID of the shield information barrier.
	 * @param {string} [options.marker] Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`.
	 * @param {number} [options.limit] The maximum number of items to return per page.
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierReports>} A promise resolving to the result or rejecting with an error
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
	): Promise<schemas.ShieldInformationBarrierReports> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barrier_reports'),
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
	 * Create shield information barrier report
	 *
	 * Creates a shield information barrier report for a given barrier.
	 * @param {schemas.ShieldInformationBarrierReference} body
	 * @param {object} [options] Options for the request
	 * @param {Function} [callback] Passed the result if successful, error otherwise
	 * @returns {Promise<schemas.ShieldInformationBarrierReport>} A promise resolving to the result or rejecting with an error
	 */
	create(
		body: schemas.ShieldInformationBarrierReference,
		options?: {},
		callback?: Function
	): Promise<schemas.ShieldInformationBarrierReport> {
		const { ...queryParams } = options,
			apiPath = urlPath('shield_information_barrier_reports'),
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
export = ShieldInformationBarrierReportsManager;

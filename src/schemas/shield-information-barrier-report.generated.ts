import * as schemas from '.';
/**
 * Shield information barrier report
 *
 * A standard representation
 * of a shield information barrier report object
 */
export interface ShieldInformationBarrierReport
	extends schemas.ShieldInformationBarrierReportBase {
	shield_information_barrier?: schemas.ShieldInformationBarrierReference;
	/**
	 * Status of the shield information report
	 * Example: pending
	 */
	status?: 'pending' | 'error' | 'done' | 'cancelled';
	details?: schemas.ShieldInformationBarrierReportDetails;
	/**
	 * ISO date time string when this
	 * shield information barrier report object was created.
	 * Example: 2020-06-26T18:44:45.869Z
	 */
	created_at?: string;
	/**
	 * The user who created this shield information barrier report.
	 */
	created_by?: schemas.UserBase;
	/**
	 * ISO date time string when this
	 * shield information barrier report was updated.
	 * Example: 2020-07-26T18:44:45.869Z
	 */
	updated_at?: string;
}

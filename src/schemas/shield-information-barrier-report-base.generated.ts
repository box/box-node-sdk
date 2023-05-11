import * as schemas from '.';
/**
 * Shield information barrier report (Base)
 *
 * A base representation of a
 * shield information barrier report object
 */
export interface ShieldInformationBarrierReportBase {
	/**
	 * The unique identifier for the shield information barrier report
	 * Example: 11446498
	 */
	id?: string;
	/**
	 * The type of the shield information barrier report
	 * Example: shield_information_barrier_report
	 */
	type?: 'shield_information_barrier_report';
}

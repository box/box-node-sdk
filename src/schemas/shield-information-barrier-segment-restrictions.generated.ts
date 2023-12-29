import * as schemas from '.';
/**
 * List of Shield Information Barrier Segment Restrictions
 *
 * The part of an API response that describes marker
 * based pagination
 */
export interface ShieldInformationBarrierSegmentRestrictions {
	/**
	 * The limit that was used for these entries. This will be the same as the
	 * `limit` query parameter unless that value exceeded the maximum value
	 * allowed. The maximum value varies by API.
	 * Example: 1000
	 */
	limit?: number;
	/**
	 * The marker for the start of the next page of results.
	 * Example: JV9IRGZmieiBasejOG9yDCRNgd2ymoZIbjsxbJMjIs3kioVii
	 */
	next_marker?: string;
	/**
	 * A list of shield information barrier
	 * segment restriction objects
	 */
	entries?: schemas.ShieldInformationBarrierSegmentRestriction[];
}

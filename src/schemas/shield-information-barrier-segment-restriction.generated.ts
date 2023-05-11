import * as schemas from '.';
/**
 * Shield information barrier segment restriction
 *
 * A standard representation of a
 * segment restriction of a shield information barrier
 * object
 */
export interface ShieldInformationBarrierSegmentRestriction
	extends schemas.ShieldInformationBarrierSegmentRestrictionMini {
	shield_information_barrier?: schemas.ShieldInformationBarrierBase;
	/**
	 * ISO date time string when this
	 * shield information barrier
	 * Segment Restriction object was created.
	 * Example: 2020-06-26T18:44:45.869Z
	 */
	created_at?: string;
	/**
	 * The user who created this shield information barrier segment Restriction.
	 */
	created_by?: schemas.UserBase;
	/**
	 * ISO date time string when this
	 * shield information barrier segment
	 * Restriction was updated.
	 * Example: 2020-07-26T18:44:45.869Z
	 */
	updated_at?: string;
	/**
	 * The user that updated this shield information barrier segment Restriction.
	 */
	updated_by?: schemas.UserBase;
}

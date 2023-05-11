import * as schemas from '.';
/**
 * Shield information barrier segment member
 *
 * A standard representation of a
 * shield information barrier segment member object
 */
export interface ShieldInformationBarrierSegmentMember
	extends schemas.ShieldInformationBarrierSegmentMemberMini {
	shield_information_barrier?: schemas.ShieldInformationBarrierBase;
	/**
	 * The `type` and `id` of the requested
	 * shield information barrier segment.
	 */
	shield_information_barrier_segment?: object;
	/**
	 * The `type` and `id` of the requested shield information barrier segment member.
	 */
	user?: schemas.UserBase;
	/**
	 * ISO date time string when this shield
	 * information barrier object was created.
	 * Example: 2020-06-26T18:44:45.869Z
	 */
	created_at?: string;
	/**
	 * The user who created this shield information barrier segment member.
	 */
	created_by?: schemas.UserBase;
	/**
	 * ISO date time string when this
	 * shield information barrier segment Member was updated.
	 * Example: 2020-07-26T18:44:45.869Z
	 */
	updated_at?: string;
	/**
	 * The user that updated this shield information barrier segment Member.
	 */
	updated_by?: schemas.UserBase;
}

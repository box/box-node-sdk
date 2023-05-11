import * as schemas from '.';
/**
 * Shield information barrier segment member (Mini)
 *
 * A mini representation of a
 * shield information barrier segment member object
 */
export interface ShieldInformationBarrierSegmentMemberMini
	extends schemas.ShieldInformationBarrierSegmentMemberBase {
	/**
	 * The `type` and `id` of the requested shield information barrier segment member.
	 */
	user?: schemas.UserBase;
}

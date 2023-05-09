import * as schemas from '.';
/**
 * Shield information barrier segment restriction (Mini)
 *
 * A mini representation of
 * a segment restriction object for
 * the shield information barrier
 */
export interface ShieldInformationBarrierSegmentRestrictionMini
	extends schemas.ShieldInformationBarrierSegmentRestrictionBase {
	/**
	 * The `type` and `id` of the
	 * requested shield information barrier segment.
	 */
	shield_information_barrier_segment: object;
	/**
	 * The `type` and `id` of the
	 * restricted shield information barrier segment.
	 */
	restricted_segment: object;
}

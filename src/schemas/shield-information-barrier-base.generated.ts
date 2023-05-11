import * as schemas from '.';
/**
 * Shield information barrier (Base)
 *
 * A base representation of a
 * shield information barrier object
 */
export interface ShieldInformationBarrierBase {
	/**
	 * The unique identifier for the shield information barrier
	 * Example: 11446498
	 */
	id?: string;
	/**
	 * The type of the shield information barrier
	 * Example: shield_information_barrier
	 */
	type?: 'shield_information_barrier';
}

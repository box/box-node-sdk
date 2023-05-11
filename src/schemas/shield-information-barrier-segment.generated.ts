import * as schemas from '.';
/**
 * Shield information barrier segment
 *
 * A shield information barrier segment object
 */
export interface ShieldInformationBarrierSegment {
	/**
	 * The unique identifier for the shield information barrier segment
	 * Example: 11446498
	 */
	id?: string;
	/**
	 * The type of the shield information barrier segment
	 * Example: shield_information_barrier_segment
	 */
	type?: 'shield_information_barrier_segment';
	shield_information_barrier?: schemas.ShieldInformationBarrierBase;
	/**
	 * Name of the shield information barrier segment
	 * Example: Investment Banking
	 */
	name?: string;
	/**
	 * Description of the shield information barrier segment
	 * Example: 'Corporate division that engages in advisory_based financial
	 *  transactions on behalf of individuals, corporations, and governments.'
	 */
	description?: string;
	/**
	 * ISO date time string when this shield information
	 * barrier object was created.
	 * Example: 2020-06-26T18:44:45.869Z
	 */
	created_at?: string;
	/**
	 * The user who created this shield information barrier segment.
	 */
	created_by?: schemas.UserBase;
	/**
	 * ISO date time string when this
	 * shield information barrier segment was updated.
	 * Example: 2020-07-26T18:44:45.869Z
	 */
	updated_at?: string;
	/**
	 * The user that updated this shield information barrier segment.
	 */
	updated_by?: schemas.UserBase;
}

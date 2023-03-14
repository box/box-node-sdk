import * as schemas from '.';
/**
 * Shield information barrier
 *
 * A standard representation of a
 * shield information barrier object
 */
export interface ShieldInformationBarrier {
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
	/**
	 * The `type` and `id` of enterprise this barrier is under.
	 */
	enterprise?: schemas.EnterpriseBase;
	/**
	 * Status of the shield information barrier
	 * Example: draft
	 */
	status?: 'draft' | 'pending' | 'disabled' | 'enabled' | 'invalid';
	/**
	 * ISO date time string when this
	 * shield information barrier object was created.
	 * Example: 2020-06-26T18:44:45.869Z
	 */
	created_at?: string;
	/**
	 * The user who created this shield information barrier.
	 */
	created_by?: schemas.UserBase;
	/**
	 * ISO date time string when this shield information barrier was updated.
	 * Example: 2020-07-26T18:44:45.869Z
	 */
	updated_at?: string;
	/**
	 * The user that updated this shield information barrier.
	 */
	updated_by?: schemas.UserBase;
	/**
	 * ISO date time string when this shield information barrier was enabled.
	 * Example: 2020-07-26T18:44:45.869Z
	 */
	enabled_at?: string;
	/**
	 * The user that enabled this shield information barrier.
	 */
	enabled_by?: schemas.UserBase;
}

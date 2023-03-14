import * as schemas from '.';
/**
 * Enterprise (Base)
 *
 * A mini representation of a enterprise, used when
 * nested within another resource.
 */
export interface EnterpriseBase {
	/**
	 * The unique identifier for this enterprise
	 * Example: 1910967
	 */
	id?: string;
	/**
	 * `enterprise`
	 * Example: enterprise
	 */
	type?: 'enterprise';
}

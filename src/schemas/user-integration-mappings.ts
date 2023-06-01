import * as schemas from '.';
/**
 * User (Integration Mappings)
 *
 * A user representation for integration mappings
 * API purposes. Fields name and login are not required.
 */
export interface UserIntegrationMappings extends schemas.UserBase {
	/**
	 * The display name of this user
	 * Example: Aaron Levie
	 */
	name?: string;
	/**
	 * The primary email address of this user
	 * Example: ceo@example.com
	 */
	login?: string;
}

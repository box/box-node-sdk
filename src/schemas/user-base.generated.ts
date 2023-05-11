import * as schemas from '.';
/**
 * User (Base)
 *
 * A mini representation of a user, used when
 * nested within another resource.
 */
export interface UserBase {
	/**
	 * The unique identifier for this user
	 * Example: 11446498
	 */
	id?: string;
	/**
	 * `user`
	 * Example: user
	 */
	type: 'user';
}

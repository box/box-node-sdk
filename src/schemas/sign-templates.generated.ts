import * as schemas from '.';
/**
 * Box Sign templates
 *
 * The part of an API response that describes marker
 * based pagination
 */
export interface SignTemplates {
	/**
	 * A list of templates.
	 */
	entries?: schemas.SignTemplate[];
	/**
	 * The marker for the start of the previous page of results.
	 * Example: JV9IRGZmieiBasejOG9yDCRNgd2ymoZIbjsxbJMjIs3kioVii
	 */
	prev_marker?: string;
}

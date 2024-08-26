import * as schemas from '.';
/**
 * The citation of the LLM's answer reference
 *
 * The citation of the LLM's answer reference.
 */
export interface AiCitation {
	/**
	 * The specific content from where the answer was referenced.
	 * Example: Public APIs are key drivers of innovation and growth.
	 */
	content?: string;
	/**
	 * The id of the item.
	 * Example: 123
	 */
	id?: string;
	/**
	 * The type of the item.
	 * Example: file
	 */
	type?: 'file';
	/**
	 * The name of the item.
	 * Example: The importance of public APIs.pdf
	 */
	name?: string;
}

import * as schemas from '.';
/**
 * Sign Request Prefill Tag
 *
 * Prefill tags are used to prefill placeholders with signer input data. Only
 * one value field can be included.
 */
export interface SignRequestPrefillTag {
	/**
	 * This references the ID of a specific tag contained in a file of the sign request.
	 * Example: 1234
	 */
	document_tag_id?: string;
	/**
	 * Text prefill value
	 * Example: text
	 */
	text_value?: string;
	/**
	 * Checkbox prefill value
	 * Example: true
	 */
	checkbox_value?: boolean;
	/**
	 * Date prefill value
	 * Example: 2021-04-26
	 */
	date_value?: string;
}

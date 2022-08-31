import * as schemas from '.';
/**
 * Sign Request Signer Input
 *
 * Input created by a Signer on a Sign Request
 */
export interface SignRequestSignerInput extends schemas.SignRequestPrefillTag {
	/**
	 * Type of input
	 * Example: text
	 */
	type?: 'signature' | 'date' | 'text' | 'checkbox';
	/**
	 * Content type of input
	 * Example: signature
	 */
	content_type?:
		| 'initial'
		| 'stamp'
		| 'signature'
		| 'company'
		| 'title'
		| 'email'
		| 'full_name'
		| 'first_name'
		| 'last_name'
		| 'text'
		| 'date'
		| 'checkbox';
	/**
	 * Index of page that the input is on
	 * Example: 4
	 */
	page_index: number;
}

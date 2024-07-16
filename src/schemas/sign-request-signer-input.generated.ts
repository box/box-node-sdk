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
	type?: 'signature' | 'date' | 'text' | 'checkbox' | 'radio' | 'dropdown';
	/**
	 * Content type of input
	 * Example: signature
	 */
	content_type?:
		| 'signature'
		| 'initial'
		| 'stamp'
		| 'date'
		| 'checkbox'
		| 'text'
		| 'full_name'
		| 'first_name'
		| 'last_name'
		| 'company'
		| 'title'
		| 'email'
		| 'attachment'
		| 'radio'
		| 'dropdown';
	/**
	 * Index of page that the input is on
	 * Example: 4
	 */
	page_index: number;
	/**
	 * Whether this input was defined as read-only(immutable by signers) or not
	 * Example: true
	 */
	read_only?: boolean;
}

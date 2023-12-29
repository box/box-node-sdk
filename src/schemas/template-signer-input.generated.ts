import * as schemas from '.';
/**
 * Template Signer Input
 *
 * Input created by a Signer on a Template
 */
export interface TemplateSignerInput extends schemas.SignRequestPrefillTag {
	/**
	 * Type of input
	 * Example: text
	 */
	type?:
		| 'signature'
		| 'date'
		| 'text'
		| 'checkbox'
		| 'attachment'
		| 'radio'
		| 'dropdown';
	/**
	 * Content type of input
	 * Example: text
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
	 * Whether or not the input is required.
	 * Example: true
	 */
	is_required?: boolean;
	/**
	 * Index of page that the input is on.
	 * Example: 4
	 */
	page_index: number;
	/**
	 * Document identifier.
	 * Example: 123075213-eb54b537-8b25-445e-87c1-5a1c67d8cbd7
	 */
	document_id?: string;
	/**
	 * When the input is of the type `dropdown` this values will be filled with all the dropdown options.
	 * Example: Yes,No,Maybe
	 */
	dropdown_choices?: string[];
	/**
	 * When the input is of type `radio` they can be grouped to gather with this identifier.
	 * Example: da317330-225a-4c72-89ad-0d6dcaaf4df6
	 */
	group_id?: string;
	/**
	 * Where the input is located on a page.
	 */
	coordinates?: object;
	/**
	 * The size of the input.
	 */
	dimensions?: object;
	/**
	 * The label field is used especially for text, attachment, radio, and checkbox type inputs.
	 * Example: Legal name
	 */
	label?: string;
}

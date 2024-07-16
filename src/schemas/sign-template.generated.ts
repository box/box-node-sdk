import * as schemas from '.';
/**
 * Box Sign template
 *
 * A Box Sign template object
 */
export interface SignTemplate {
	/**
	 * object type
	 * Example: sign-template
	 */
	type?: 'sign-template';
	/**
	 * Template identifier.
	 * Example: 4206996024-14944f75-c34b-478a-95a1-264b1ff80d35
	 */
	id?: string;
	/**
	 * The name of the template.
	 * Example: Official contract
	 */
	name?: string;
	/**
	 * Subject of signature request email. This is cleaned by sign request. If this field is not passed, a default subject will be used.
	 * Example: Sign Request from Acme
	 */
	email_subject?: string;
	/**
	 * Message to include in signature request email. The field is cleaned through sanitization of specific characters. However, some html tags are allowed. Links included in the message are also converted to hyperlinks in the email. The message may contain the following html tags including `a`, `abbr`, `acronym`, `b`, `blockquote`, `code`, `em`, `i`, `ul`, `li`, `ol`, and `strong`. Be aware that when the text to html ratio is too high, the email may end up in spam filters. Custom styles on these tags are not allowed. If this field is not passed, a default message will be used.
	 * Example: Hello! Please sign the document below
	 */
	email_message?: string;
	/**
	 * Set the number of days after which the created signature request will automatically expire if not completed. By default, we do not apply any expiration date on signature requests, and the signature request does not expire.
	 * Example: 2
	 */
	days_valid?: number;
	/**
	 * The destination folder to place final, signed document and signing
	 * log. Only `ID` and `type` fields are required. The root folder,
	 * folder ID `0`, cannot be used.
	 */
	parent_folder?: schemas.FolderMini;
	/**
	 * List of files to create a signing document from. Only the ID and type fields are required for each file.
	 */
	source_files?: schemas.FileMini[];
	/**
	 * Indicates if the template input fields are editable or not.
	 */
	are_fields_locked?: boolean;
	/**
	 * Indicates if the template document options are editable or not, for example renaming the document.
	 * Example: true
	 */
	are_options_locked?: boolean;
	/**
	 * Indicates if the template signers are editable or not.
	 */
	are_recipients_locked?: boolean;
	/**
	 * Indicates if the template email settings are editable or not.
	 * Example: true
	 */
	are_email_settings_locked?: boolean;
	/**
	 * Indicates if the template files are editable or not. This includes deleting or renaming template files.
	 * Example: true
	 */
	are_files_locked?: boolean;
	/**
	 * Array of signers for the template.
	 *
	 * **Note**: It may happen that some signers specified in the template belong to conflicting [segments](r://shield-information-barrier-segment-member) (user groups).
	 * This means that due to the security policies, users are assigned to segments to prevent exchanges or communication that could lead to ethical conflicts.
	 * In such a case, an attempt to send a sign request based on a template that lists signers in conflicting segments will result in an error.
	 *
	 * Read more about [segments and ethical walls](https://support.box.com/hc/en-us/articles/9920431507603-Understanding-Information-Barriers#h_01GFVJEHQA06N7XEZ4GCZ9GFAQ).
	 */
	signers?: schemas.TemplateSigner[];
	/**
	 * Additional information on which fields are required and which fields are not editable.
	 */
	additional_info?: object;
	/**
	 * Box's ready-sign link feature enables you to create a link to a signature request that you've created from a template. Use this link when you want to post a signature request on a public form — such as an email, social media post, or web page — without knowing who the signers will be. Note: The ready-sign link feature is limited to Enterprise Plus customers and not available to Box Verified Enterprises.
	 */
	ready_sign_link?: object;
	/**
	 * Custom branding applied to notifications
	 * and signature requests.
	 */
	custom_branding?: object;
}

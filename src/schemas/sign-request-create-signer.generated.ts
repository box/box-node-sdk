import * as schemas from '.';
/**
 * Signer fields for Create Sign Request
 *
 * The schema for a Signer in a POST Sign Request request body
 */
export interface SignRequestCreateSigner {
	/**
	 * Email address of the signer
	 * Example: example@gmail.com
	 */
	email: string;
	/**
	 * Defines the role of the signer in the sign request. A `signer`
	 * must sign the document and an `approver` must approve the document. A
	 * `final_copy_reader` only receives the final signed document and signing
	 * log.
	 * Example: signer
	 * @default signer
	 */
	role?: 'signer' | 'approver' | 'final_copy_reader';
	/**
	 * Used in combination with an embed URL for a sender. After the
	 * sender signs, they are redirected to the next `in_person` signer.
	 * Example: true
	 */
	is_in_person?: boolean;
	/**
	 * Order of the signer
	 * Example: 2
	 */
	order?: number;
	/**
	 * User ID for the signer in an external application responsible
	 * for authentication when accessing the embed URL.
	 * Example: 1234
	 */
	embed_url_external_user_id?: string;
	/**
	 * The URL that a signer will be redirected
	 * to after signing a document. Defining this URL
	 * overrides default or global redirect URL
	 * settings for a specific signer.
	 * If no declined redirect URL is specified,
	 * this URL will be used for decline actions as well.
	 * Example: https://example.com
	 */
	redirect_url?: string;
	/**
	 * The URL that a signer will be redirect
	 * to after declining to sign a document.
	 * Defining this URL overrides default or global
	 * declined redirect URL settings for a specific signer.
	 * Example: https://declined-example.com
	 */
	declined_redirect_url?: string;
	/**
	 * If set to true, signer will need to login to a Box account
	 * before signing the request. If the signer does not have
	 * an existing account, they will have an option to create
	 * a free Box account.
	 * Example: true
	 */
	login_required?: boolean;
	/**
	 * If set, this phone number is be used to verify the signer
	 * via two factor authentication before they are able to sign the document.
	 * Example: 6314578901
	 */
	verification_phone_number?: string;
	/**
	 * If set, the signer is required to enter the password before they are able
	 * to sign a document. This field is write only.
	 * Example: SecretPassword123
	 */
	password?: string;
}

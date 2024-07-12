import * as schemas from '.';
/**
 * Signer fields used to create a Box Sign request object.
 *
 * The schema for a Signer object used in
 * for creating a Box Sign request object.
 */
export interface SignRequestCreateSigner {
	/**
	 * Email address of the signer.
	 * The email address of the signer is required when making signature requests, except when using templates that are configured to include emails.
	 * Example: example@gmail.com
	 */
	email?: string;
	/**
	 * Defines the role of the signer in the signature request. A `signer`
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
	 * If set to true, the signer will need to log in to a Box account
	 * before signing the request. If the signer does not have
	 * an existing account, they will have the option to create
	 * a free Box account. Cannot be selected in combination with
	 * `verification_phone_number`.
	 * Example: true
	 */
	login_required?: boolean;
	/**
	 * If set, this phone number will be used to verify the signer
	 * via two-factor authentication before they are able to sign the document.
	 * Cannot be selected in combination with `login_required`.
	 * Example: 6314578901
	 */
	verification_phone_number?: string;
	/**
	 * If set, the signer is required to enter the password before they are able
	 * to sign a document. This field is write only.
	 * Example: SecretPassword123
	 */
	password?: string;
	/**
	 * If set, signers who have the same value will be assigned to the same input and to the same signer group.
	 * A signer group is not a Box Group. It is an entity that belongs to a Sign Request and can only be
	 * used/accessed within this Sign Request. A signer group is expected to have more than one signer.
	 * If the provided value is only used for one signer, this value will be ignored and request will be handled
	 * as it was intended for an individual signer. The value provided can be any string and only used to
	 * determine which signers belongs to same group. A successful response will provide a generated UUID value
	 * instead for signers in the same signer group.
	 * Example: cd4ff89-8fc1-42cf-8b29-1890dedd26d7
	 */
	signer_group_id?: string;
	/**
	 * If true, no emails about the sign request will be sent
	 */
	suppress_notifications?: boolean;
}

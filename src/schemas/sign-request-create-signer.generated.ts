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
	 * sender signs, they will be redirected to the next `in_person` signer.
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
}

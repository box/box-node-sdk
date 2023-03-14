import * as schemas from '.';
/**
 * Sign Request
 *
 * A Sign Request Object
 */
export interface SignRequest extends schemas.SignRequestBase {
	/**
	 * object type
	 * Example: sign-request
	 */
	type?: 'sign-request';
	/**
	 * Array of signers for the sign request
	 */
	signers?: schemas.SignRequestSigner[];
	/**
	 * Force a specific color for the signature (blue, black, or red).
	 * Example: blue
	 */
	signature_color?: string;
	/**
	 * Sign request ID
	 * Example: 12345
	 */
	id?: string;
	/**
	 * This URL is returned if `is_document_preparation_needed` is
	 * set to `true` in the request. It is used to prepare the sign request
	 * via UI. The sign request is not sent until preparation is complete.
	 * Example: https://prepareurl.com
	 */
	prepare_url?: string;
	/**
	 * Reference to a file that holds a log of all signer activity for
	 * the request
	 */
	signing_log?: schemas.FileMini;
	/**
	 * Describes the status of the sign request
	 * Example: converting
	 */
	status?:
		| 'converting'
		| 'created'
		| 'sent'
		| 'viewed'
		| 'signed'
		| 'cancelled'
		| 'declined'
		| 'error_converting'
		| 'error_sending'
		| 'expired';
	/**
	 * List of files that will be signed, which are copies of the original
	 * source files. A new version of these files are created as signers sign
	 * and can be downloaded at any point in the signing process.
	 */
	sign_files?: object;
	/**
	 * Uses `days_valid` to calculate the date and time, in GMT, the sign request will expire if unsigned.
	 * Example: 2021-04-26T08:12:13.982Z
	 */
	auto_expire_at?: string;
	/**
	 * List of files to create a signing document from. Only the ID and type fields are required for each file. The array will be empty if the `source_files` are deleted.
	 */
	source_files?: schemas.FileMini[];
}

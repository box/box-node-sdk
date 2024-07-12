import * as schemas from '.';
/**
 * Box Sign request
 *
 * A Box Sign request object.
 */
export interface SignRequest extends schemas.SignRequestBase {
	/**
	 * object type
	 * Example: sign-request
	 */
	type?: 'sign-request';
	/**
	 * List of files to create a signing document from. This is currently limited to ten files. Only the ID and type fields are required for each file.
	 */
	source_files?: schemas.FileBase[];
	/**
	 * Array of signers for the signature request.
	 */
	signers?: schemas.SignRequestSigner[];
	/**
	 * Force a specific color for the signature (blue, black, or red).
	 * Example: blue
	 */
	signature_color?: string;
	/**
	 * Box Sign request ID.
	 * Example: 12345
	 */
	id?: string;
	/**
	 * This URL is returned if `is_document_preparation_needed` is
	 * set to `true` in the request. The parameter is used to prepare
	 * the signature request
	 * using the UI. The signature request is not
	 * sent until the preparation
	 * phase is complete.
	 * Example: https://prepareurl.com
	 */
	prepare_url?: string;
	/**
	 * Reference to a file that holds a log of all signer activity for
	 * the request.
	 */
	signing_log?: schemas.FileMini;
	/**
	 * Describes the status of the signature request.
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
		| 'expired'
		| 'finalizing'
		| 'error_finalizing';
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
	 * The destination folder to place final, signed document and signing
	 * log.
	 *
	 * When this value was not passed in when the signature request was
	 * created, then we will use a default folder which is either the parent
	 * folder of the first source file in the payload if we have the permission
	 * to upload to that folder or a folder called "My Sign Requests".
	 */
	parent_folder?: schemas.FolderMini;
}

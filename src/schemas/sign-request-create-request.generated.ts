import * as schemas from '.';
/**
 * Create a sign request
 *
 * A request to create a sign request object
 */
export interface SignRequestCreateRequest extends schemas.SignRequestBase {
	/**
	 * List of files to create a signing document from. This is currently limited to ten files. Only the ID and type fields are required for each file.
	 */
	source_files?: schemas.FileBase[];
	/**
	 * Array of signers for the sign request. 35 is the
	 * max number of signers permitted.
	 */
	signers: schemas.SignRequestCreateSigner[];
}

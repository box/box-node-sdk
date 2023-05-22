import * as schemas from '.';
/**
 * Create a sign request
 *
 * A request to create a sign request object
 */
export interface SignRequestCreateRequest extends schemas.SignRequestBase {
	/**
	 * List of files to create a signing document from. This is currently
	 * limited to 10 files. Only the ID and type fields are required
	 * for each file. The array will be empty if the `source_files`
	 * are deleted.
	 */
	source_files?: schemas.FileMini[];
	/**
	 * Force a specific signature color (blue, black, or red).
	 * Example: blue
	 */
	signature_color?: 'blue' | 'black' | 'red';
	/**
	 * Array of signers for the sign request. 35 is the
	 * max number of signers permitted.
	 */
	signers: schemas.SignRequestCreateSigner[];
}

import * as schemas from '.';
/**
 * Create a Box Sign request
 *
 * Creates a Box Sign request object.
 */
export interface SignRequestCreateRequest extends schemas.SignRequestBase {
	/**
	 * List of files to create a signing document from. This is currently limited to ten files. Only the ID and type fields are required for each file.
	 */
	source_files?: schemas.FileBase[];
	/**
	 * Force a specific color for the signature (blue, black, or red)
	 * Example: blue
	 */
	signature_color?: 'blue' | 'black' | 'red';
	/**
	 * Array of signers for the signature request. 35 is the
	 * max number of signers permitted.
	 *
	 * **Note**: It may happen that some signers belong to conflicting [segments](r://shield-information-barrier-segment-member) (user groups).
	 * This means that due to the security policies, users are assigned to segments to prevent exchanges or communication that could lead to ethical conflicts.
	 * In such a case, an attempt to send the sign request will result in an error.
	 *
	 * Read more about [segments and ethical walls](https://support.box.com/hc/en-us/articles/9920431507603-Understanding-Information-Barriers#h_01GFVJEHQA06N7XEZ4GCZ9GFAQ).
	 */
	signers: schemas.SignRequestCreateSigner[];
	/**
	 * The destination folder to place final, signed document and signing
	 * log. Only `ID` and `type` fields are required. The root folder,
	 * folder ID `0`, cannot be used and can also not be null.
	 *
	 * When this value is not passed in when the signature request, then
	 * we will use a default folder which is either the parent folder of
	 * the first source file in the payload if we have the permission to
	 * upload to that folder or a folder called "My Sign Requests".
	 */
	parent_folder?: schemas.FolderMini;
}

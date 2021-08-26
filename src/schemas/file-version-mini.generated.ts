import * as schemas from '.';
/**
 * File version (Mini)
 *
 * A mini representation of a file version, used when
 * nested within another resource.
 */
export interface FileVersionMini extends schemas.FileVersionBase {
	/**
	 * The SHA1 hash of this version of the file.
	 * Example: 134b65991ed521fcfe4724b7d814ab8ded5185dc
	 */
	sha1?: string;
}

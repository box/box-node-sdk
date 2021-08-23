import * as schemas from ".";
/**
 * File (Mini)
 * 
 * A mini representation of a file, used when
 * nested under another resource.
 */
export interface FileMini extends schemas.FileBase {
    /**
     */
    sequence_id?: string;
    /**
     * The name of the file
     * Example: Contract.pdf
     */
    name?: string;
    /**
     * The SHA1 hash of the file. This can be used to compare the contents
     * of a file on Box with a local file.
     * Example: 85136C79CBF9FE36BB9D05D0639C70C265C18D37
     */
    sha1?: string;
    /**
     */
    file_version?: schemas.FileVersionMini;
}

import * as schemas from ".";
/**
 * Folder (Mini)
 * 
 * A mini representation of a file version, used when
 * nested under another resource.
 */
export interface FolderMini extends schemas.FolderBase {
    /**
     */
    sequence_id?: string;
    /**
     * The name of the folder.
     * Example: Contracts
     */
    name?: string;
}

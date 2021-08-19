import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * Folder (Mini)
 * 
 * A mini representation of a file version, used when
 * nested under another resource.
 */
export interface FolderMini extends schemas.FolderBase {
    /**
     */
    sequenceId?: string;
    /**
     * The name of the folder.
     * Example: Contracts
     */
    name?: string;
}
export const FolderMini = new Serializable({
    serialize(value: FolderMini) {
        return {
            sequence_id: value.sequenceId,
            name: value.name
        };
    },
    deserialize(data: any): FolderMini {
        return {
            sequenceId: data.sequence_id,
            name: data.name
        };
    }
});

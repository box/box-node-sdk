import * as schemas from ".";
/**
 * Folder (Mini)
 * 
 * A mini representation of a file version, used when
 * nested under another resource.
 */
export interface FolderMini {
}
export const FolderMini = {
    serialize(value: FolderMini) {
        return {};
    },
    deserialize(data: any): FolderMini {
        return {};
    }
};

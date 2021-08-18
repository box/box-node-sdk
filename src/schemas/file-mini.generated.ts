import * as schemas from ".";
/**
 * File (Mini)
 * 
 * A mini representation of a file, used when
 * nested under another resource.
 */
export interface FileMini {
}
export const FileMini = {
    serialize(value: FileMini) {
        return {};
    },
    deserialize(data: any): FileMini {
        return {};
    }
};

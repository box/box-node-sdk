import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * File (Mini)
 * 
 * A mini representation of a file, used when
 * nested under another resource.
 */
export interface FileMini extends schemas.FileBase {
    /**
     */
    sequenceId?: string;
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
    fileVersion?: schemas.FileVersionMini;
}
export const FileMini = new Serializable({
    serialize(value: FileMini) {
        return {
            sequence_id: value.sequenceId,
            name: value.name,
            sha1: value.sha1,
            file_version: schemas.FileVersionMini.serialize(value.fileVersion)
        };
    },
    deserialize(data: any): FileMini {
        return {
            sequenceId: data.sequence_id,
            name: data.name,
            sha1: data.sha1,
            fileVersion: schemas.FileVersionMini.deserialize(data.file_version)
        };
    }
});

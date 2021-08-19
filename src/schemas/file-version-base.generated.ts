import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * File version (Base)
 * 
 * The bare basic representation of a file version, the minimal
 * amount of fields returned when using the `fields` query
 * parameter.
 */
export interface FileVersionBase {
    /**
     * The unique identifier that represent a file version.
     * Example: 12345
     */
    id?: string;
    /**
     * `file_version`
     * Example: file_version
     */
    type?: string;
}
export const FileVersionBase = new Serializable({
    serialize(value: FileVersionBase) {
        return {
            id: value.id,
            type: value.type
        };
    },
    deserialize(data: any): FileVersionBase {
        return {
            id: data.id,
            type: data.type
        };
    }
});

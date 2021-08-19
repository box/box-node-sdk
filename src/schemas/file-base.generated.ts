import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * File (Base)
 * 
 * The bare basic representation of a file, the minimal
 * amount of fields returned when using the `fields` query
 * parameter.
 */
export interface FileBase {
    /**
     * The unique identifier that represent a file.
     * 
     * The ID for any file can be determined
     * by visiting a file in the web application
     * and copying the ID from the URL. For example,
     * for the URL `https://*.app.box.com/files/123`
     * the `file_id` is `123`.
     * Example: 12345
     */
    id?: string;
    /**
     * The HTTP `etag` of this file. This can be used within some API
     * endpoints in the `If-Match` and `If-None-Match` headers to only
     * perform changes on the file if (no) changes have happened.
     * Example: 1
     */
    etag?: string;
    /**
     * `file`
     * Example: file
     */
    type?: string;
}
export const FileBase = new Serializable({
    serialize(value: FileBase) {
        return {
            id: value.id,
            etag: value.etag,
            type: value.type
        };
    },
    deserialize(data: any): FileBase {
        return {
            id: data.id,
            etag: data.etag,
            type: data.type
        };
    }
});

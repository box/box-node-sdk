import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * Folder (Base)
 * 
 * The bare basic representation of a folder, the minimal
 * amount of fields returned when using the `fields` query
 * parameter.
 */
export interface FolderBase {
    /**
     * The unique identifier that represent a folder.
     * 
     * The ID for any folder can be determined
     * by visiting a folder in the web application
     * and copying the ID from the URL. For example,
     * for the URL `https://*.app.box.com/folders/123`
     * the `folder_id` is `123`.
     * Example: 12345
     */
    id?: string;
    /**
     * The HTTP `etag` of this folder. This can be used within some API
     * endpoints in the `If-Match` and `If-None-Match` headers to only
     * perform changes on the folder if (no) changes have happened.
     * Example: 1
     */
    etag?: string;
    /**
     * `folder`
     * Example: folder
     */
    type?: string;
}
export const FolderBase = new Serializable({
    serialize(value: FolderBase) {
        return {
            id: value.id,
            etag: value.etag,
            type: value.type
        };
    },
    deserialize(data: any): FolderBase {
        return {
            id: data.id,
            etag: data.etag,
            type: data.type
        };
    }
});

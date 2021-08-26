import * as schemas from ".";
/**
 * File (Mini)
 * 
 * A mini representation of a file, used when
 * nested under another resource.
 */
export interface FileMini extends schemas.FileBase {
    /**
     * A numeric identifier that represents the most recent user event
     * that has been applied to this item.
     * 
     * This can be used in combination with the `GET /events`-endpoint
     * to filter out user events that would have occurred before this
     * identifier was read.
     * 
     * An example would be where a Box Drive-like application
     * would fetch an item via the API, and then listen to incoming
     * user events for changes to the item. The application would
     * ignore any user events where the `sequence_id` in the event
     * is smaller than or equal to the `sequence_id` in the originally
     * fetched resource.
     * Example: 3
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
     * The information about the current version of the file.
     */
    file_version?: schemas.FileVersionMini;
}

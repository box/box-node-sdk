import * as schemas from ".";
/**
 * Box Sign
 * 
 * The part of an API response that describes marker
 * based pagination
 */
export interface SignRequests {
    /**
     * The limit that was used for these entries. This will be the same as the
     * `limit` query parameter unless that value exceeded the maximum value
     * allowed. The maximum value varies by API.
     * Example: 1000
     */
    limit?: number;
    /**
     * The marker for the start of the next page of results.
     * Example: 3000
     */
    next_marker?: number;
    /**
     * The marker for the start of the previous page of results.
     * Example: 1000
     */
    prev_marker?: number;
    entries?: schemas.SignRequest[];
}

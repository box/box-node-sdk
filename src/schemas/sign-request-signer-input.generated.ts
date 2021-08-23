import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * Sign Request Signer Input
 * 
 * Input created by a Signer on a Sign Request
 */
export interface SignRequestSignerInput extends schemas.SignRequestPrefillTag {
    /**
     * Type of input
     * Example: text
     */
    type?: string;
    /**
     * Index of page that the input is on
     * Example: 4
     */
    page_index?: number;
}

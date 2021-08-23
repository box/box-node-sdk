import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * Signer fields for GET Sign Request response
 * 
 * The schema for a Signer in a GET Sign Request request body
 */
export interface SignRequestSigner extends schemas.SignRequestCreateSigner {
    /**
     * Set to `true` if the signer views the document
     * Example: true
     */
    has_viewed_document?: boolean;
    /**
     * Final decision made by the signer
     */
    signer_decision?: object;
    /**
     */
    inputs?: schemas.SignRequestSignerInput[];
    /**
     * URL to direct a signer to for signing
     * Example: https://example.com
     */
    embed_url?: string;
}

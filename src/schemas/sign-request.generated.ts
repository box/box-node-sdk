import * as schemas from ".";
import { Serializable } from "../util/serializable";
/**
 * Sign Request
 * 
 * A Sign Request Object
 */
export interface SignRequest extends schemas.SignRequestCreateRequest {
    /**
     * object type
     * Example: sign-request
     */
    type?: string;
    /**
     * Array of signers for the sign request
     */
    signers?: schemas.SignRequestSigner[];
    /**
     * Sign request ID
     * Example: 12345
     */
    id?: string;
    /**
     * This URL is returned if `is_document_preparation_needed` is
     * set to `true` in the request. It is used to prepare the sign request
     * via UI. The sign request is not sent until preparation is complete.
     * Example: https://prepareurl.com
     */
    prepare_url?: string;
    /**
     */
    signing_log?: schemas.FileMini;
    /**
     * Describes the status of the sign request
     * Example: converting
     */
    status?: string;
    /**
     * List of files that will be signed, which are copies of the original
     * source files. A new version of these files are created as signers sign
     * and can be downloaded at any point in the signing process.
     */
    sign_files?: object;
    /**
     * Uses `days_valid` to calculate the date and time, in GMT, the sign request will expire if unsigned.
     * Example: 2021-04-26T08:12:13.982Z
     */
    auto_expire_at?: string;
}

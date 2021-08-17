import BoxClient from "../box-client";
import urlPath from "../util/url-path";
/**
 * Class for API access
 */
class SignRequests {
    client: BoxClient;
    constructor(client: BoxClient) {
        this.client = client
    }
    /**
     * Get sign request by ID
     * 
     * Gets a sign request by ID.
     * @param {object} options
     * @param {string} options.sign_request_id The ID of the sign request
     * @param {Function} [callback] Passed the result if succesful, error otherwise
     * @returns {Promise<object>} A promise resolving to the result or rejecting with an error
     */
    get_sign_requests_id(options: {
        /**
         * The ID of the sign request
         */
        readonly sign_request_id: string;
    }, callback?: Function): Promise<object> {
        const apiPath = urlPath("sign_requests", options.sign_request_id), params = {
            qs: options
        };
        return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
    }
    /**
     * List sign requests
     * 
     * Gets sign requests created by a user.
     * @param {object} [options]
     * @param {string} [options.marker] Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`.
     * @param {number} [options.limit] The maximum number of items to return per page.
     * @param {Function} [callback] Passed the result if succesful, error otherwise
     * @returns {Promise<object>} A promise resolving to the result or rejecting with an error
     */
    get_sign_requests(options?: {
        /**
         * Defines the position marker at which to begin returning results. This is
         * used when paginating using marker-based pagination.
         * 
         * This requires `usemarker` to be set to `true`.
         */
        readonly marker?: string;
        /**
         * The maximum number of items to return per page.
         */
        readonly limit?: number;
    }, callback?: Function): Promise<object> {
        const apiPath = urlPath("sign_requests"), params = {
            qs: options
        };
        return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
    }
    /**
     * Create sign request
     * 
     * Creates a sign request. This involves preparing a document for signing and
     * sending the sign request to signers.
     * @param {SignRequestCreateRequest} body
     * @param {object} [options]
     * @param {Function} [callback] Passed the result if succesful, error otherwise
     * @returns {Promise<object>} A promise resolving to the result or rejecting with an error
     */
    post_sign_requests(body: SignRequestCreateRequest, options?: {}, callback?: Function): Promise<object> {
        const apiPath = urlPath("sign_requests"), params = {
            qs: options
        };
        return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
    }
    /**
     * Cancel sign request
     * 
     * Cancels a sign request.
     * @param {object} options
     * @param {string} options.sign_request_id The ID of the sign request
     * @param {Function} [callback] Passed the result if succesful, error otherwise
     * @returns {Promise<object>} A promise resolving to the result or rejecting with an error
     */
    post_sign_requests_id_cancel(options: {
        /**
         * The ID of the sign request
         */
        readonly sign_request_id: string;
    }, callback?: Function): Promise<object> {
        const apiPath = urlPath("sign_requests", options.sign_request_id, "cancel"), params = {
            qs: options
        };
        return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
    }
    /**
     * Resend sign request
     * 
     * Resends a sign request email to all outstanding signers.
     * @param {object} options
     * @param {string} options.sign_request_id The ID of the sign request
     * @param {Function} [callback] Passed the result if succesful, error otherwise
     * @returns {Promise<object>} A promise resolving to the result or rejecting with an error
     */
    post_sign_requests_id_resend(options: {
        /**
         * The ID of the sign request
         */
        readonly sign_request_id: string;
    }, callback?: Function): Promise<object> {
        const apiPath = urlPath("sign_requests", options.sign_request_id, "resend"), params = {
            qs: options
        };
        return this.client.wrapWithDefaultHandler(this.client.post)(apiPath, params, callback);
    }
}
/**
 * Create a sign request
 * 
 * A request to create a sign request object
 */
interface SignRequestCreateRequest {
    /**
     * Indicates if the sender should receive a `prepare_url` in the response to complete document preparation via UI.
     * Example: true
     */
    is_document_preparation_needed: boolean;
    /**
     * Disables the usage of signatures generated by typing (text)
     * Example: true
     * @default true
     */
    are_text_signatures_enabled: boolean;
    /**
     * Subject of sign request email. This is cleaned by sign request. If this field is not passed, a default subject will be used.
     * Example: Sign Request from Acme
     */
    email_subject: string;
    /**
     * Message to include in sign request email. The field is cleaned through sanitization of specific characters. However, some html tags are allowed. Links included in the message are also converted to hyperlinks in the email. The message may contain the following html tags including `a`, `abbr`, `acronym`, `b`, `blockquote`, `code`, `em`, `i`, `ul`, `li`, `ol`, and `strong`. Be aware that when the text to html ratio is too high, the email may end up in spam filters. Custom styles on these tags are not allowed. If this field is not passed, a default message will be used.
     * Example: Hello! Please sign the document below
     */
    email_message: string;
    /**
     * Reminds signers to sign a document on day 3, 8, 13 and 18. Reminders are only sent to outstanding signers.
     * Example: true
     */
    are_reminders_enabled: boolean;
    /**
     * Array of signers for the sign request. 35 is the max number of signers permitted.
     */
    signers: SignRequestCreateSigner[];
    /**
     * List of files to create a signing document from. This is currently limited to one file. Only the ID and type fields are required for each file.
     */
    source_files: FileMini[];
    /**
     */
    parent_folder: FolderMini;
    /**
     * When a document contains sign related tags in the content, you can prefill them using this `prefill_tags` by referencing the 'id' of the tag as the `external_id` field of the prefill tag.
     */
    prefill_tags: SignRequestPrefillTag[];
    /**
     * Number of days after which this request will automatically expire if not completed
     * Example: 2
     */
    days_valid: number;
    /**
     * This can be used to reference an ID in an external system that the sign request is related to.
     * Example: 123
     */
    external_id: string;
}
export = SignRequests;

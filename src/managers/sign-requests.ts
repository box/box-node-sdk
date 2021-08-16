import BoxClient from "../box-client";
import urlPath from "../util/url-path";
class SignRequests {
    client: BoxClient;
    constructor(client: BoxClient) {
        this.client = client
    }
    /**
     * List sign requests
     * Gets sign requests created by a user.
     * @param {object} [options]
     * @param {string} [options.marker] Defines the position marker at which to begin returning results. This is used when paginating using marker-based pagination. This requires `usemarker` to be set to `true`.
     * @param {integer} [options.limit] The maximum number of items to return per page.
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
        readonly limit?: integer;
    }, callback?: Function) {
        const apiPath = urlPath(BASE_PATH, weblinkId), params = {
            qs: options
        };
        return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
    }
    /**
     * Get sign request by ID
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
    }, callback?: Function) {
        const apiPath = urlPath(BASE_PATH, weblinkId), params = {
            qs: options
        };
        return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
    }
    /**
     * Create sign request
     * Creates a sign request. This involves preparing a document for signing and
     * sending the sign request to signers.
     * @param {object} [options]
     * @param {Function} [callback] Passed the result if succesful, error otherwise
     * @returns {Promise<object>} A promise resolving to the result or rejecting with an error
     */
    post_sign_requests(options?: {}, callback?: Function) {
        const apiPath = urlPath(BASE_PATH, weblinkId), params = {
            qs: options
        };
        return this.client.wrapWithDefaultHandler(this.client.get)(apiPath, params, callback);
    }
}

import * as schemas from '.';
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
	inputs?: schemas.SignRequestSignerInput[];
	/**
	 * URL to direct a signer to for signing
	 * Example: https://example.com
	 */
	embed_url?: string;
	/**
	 * This URL is specifically designed for
	 * signing documents within an HTML `iframe` tag.
	 * It will be returned in the response
	 * only if the `embed_url_external_user_id`
	 * parameter was passed in the
	 * `create sign request` call.
	 * Example: https://app.box.com/embed/sign/document/gfhr4222-a331-494b-808b-79bc7f3992a3/f14d7098-a331-494b-808b-79bc7f3992a4
	 */
	iframeable_embed_url?: string;
}

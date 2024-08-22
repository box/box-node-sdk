import * as schemas from '.';
/**
 * AI response (Full)
 *
 * AI ask response
 */
export interface AiResponseFull extends schemas.AiResponse {
	/**
	 * The citations of the LLM's answer reference.
	 */
	citations?: schemas.AiCitation[];
}

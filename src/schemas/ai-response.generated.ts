import * as schemas from '.';
/**
 * AI response
 *
 * AI response
 */
export interface AiResponse {
	/**
	 * The answer provided by the LLM.
	 * Example: Public APIs are important because of key and important reasons.
	 */
	answer: string;
	/**
	 * The ISO date formatted timestamp of when the answer to the prompt was created.
	 * Example: 2012-12-12T10:53:43-08:00
	 */
	created_at: string;
	/**
	 * The reason the response finishes.
	 * Example: done
	 */
	completion_reason?: string;
}

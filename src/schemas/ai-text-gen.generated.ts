import * as schemas from '.';
/**
 * AI text gen request
 *
 * AI text gen request object
 */
export interface AiTextGen {
	/**
	 * The prompt provided by the client to be answered by the LLM. The prompt's length is limited to 10000 characters.
	 * Example: Write an email to a client about the importance of public APIs.
	 */
	prompt: string;
	/**
	 * The items to be processed by the LLM, often files.
	 * The array can include **exactly one** element.
	 *
	 * **Note**: Box AI handles documents with text representations up to 1MB in size.
	 * If the file size exceeds 1MB, the first 1MB of text representation will be processed.
	 */
	items: {
		id?: string;
		type?: string;
		content?: string;
	}[];
	/**
	 * The history of prompts and answers previously passed to the LLM. This provides additional context to the LLM in generating the response.
	 */
	dialogue_history?: schemas.AiDialogueHistory[];
	ai_agent?: schemas.AiAgentTextGen;
}

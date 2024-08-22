import * as schemas from '.';
/**
 * AI ask request
 *
 * AI ask request object
 */
export interface AiAsk {
	/**
	 * The mode specifies if this request is for a single or multiple items. If you select `single_item_qa` the `items` array can have one element only. Selecting `multiple_item_qa` allows you to provide up to 25 items.
	 * Example: multiple_item_qa
	 */
	mode: 'multiple_item_qa' | 'single_item_qa';
	/**
	 * The prompt provided by the client to be answered by the LLM. The prompt's length is limited to 10000 characters.
	 * Example: What is the value provided by public APIs based on this document?
	 */
	prompt: string;
	/**
	 * The items to be processed by the LLM, often files.
	 *
	 * **Note**: Box AI handles documents with text representations up to 1MB in size, or a maximum of 25 files, whichever comes first.
	 * If the file size exceeds 1MB, the first 1MB of text representation will be processed.
	 * If you set `mode` parameter to `single_item_qa`, the `items` array can have one element only.
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
	/**
	 * A flag to indicate whether citations should be returned.
	 * Example: true
	 */
	include_citations?: boolean;
	ai_agent?: schemas.AiAgentAsk;
}

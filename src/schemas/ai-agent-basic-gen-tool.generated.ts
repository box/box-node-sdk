import * as schemas from '.';
/**
 * AI agent basic text generation tool
 *
 * AI agent basic tool used to generate text.
 */
export interface AiAgentBasicGenTool extends schemas.AiAgentLongTextTool {
	/**
	 * How the content should be included in a request to the LLM.
	 * When passing this parameter, you must include `{content}`.
	 * Example: ---{content}---
	 */
	content_template?: string;
}

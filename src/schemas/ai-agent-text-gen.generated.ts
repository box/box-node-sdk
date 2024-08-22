import * as schemas from '.';
/**
 * AI agent for text generation requests
 *
 * The AI agent used for generating text.
 */
export interface AiAgentTextGen {
	/**
	 * The type of AI agent used for generating text.
	 * Example: ai_agent_text_gen
	 */
	type: 'ai_agent_text_gen';
	basic_gen?: schemas.AiAgentBasicGenTool;
}

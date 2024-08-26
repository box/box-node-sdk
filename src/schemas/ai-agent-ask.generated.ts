import * as schemas from '.';
/**
 * AI agent for question requests
 *
 * The AI agent used to handle queries.
 */
export interface AiAgentAsk {
	/**
	 * The type of AI agent used to handle queries.
	 * Example: ai_agent_ask
	 */
	type: 'ai_agent_ask';
	long_text?: schemas.AiAgentLongTextTool;
	basic_text?: schemas.AiAgentBasicTextToolAsk;
	long_text_multi?: schemas.AiAgentLongTextTool;
	basic_text_multi?: schemas.AiAgentBasicTextToolAsk;
}

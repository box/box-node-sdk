import * as schemas from '.';
/**
 * AI agent basic text tool
 *
 * AI agent tool used to handle basic text.
 */
export interface AiAgentBasicTextToolAsk {
	/**
	 * The model used for the AI Agent for basic text.
	 * Example: openai__gpt_3_5_turbo
	 */
	model?: string;
	/**
	 * System messages try to help the LLM "understand" its role and what it is supposed to do.
	 * Example: You are a helpful travel assistant specialized in budget travel
	 */
	system_message?: string;
	/**
	 * The prompt template contains contextual information of the request and the user prompt.
	 *
	 * When passing `prompt_template` parameters, you **must include** inputs for `{current_date}`, `{user_question}`, and `{content}`.
	 * Example: It is `{current_date}`, and I have $8000 and want to spend a week in the Azores. What should I see?
	 */
	prompt_template?: string;
	/**
	 * The number of tokens for completion.
	 * Example: 8400
	 */
	num_tokens_for_completion?: number;
	/**
	 * The parameters for the LLM endpoint specific to OpenAI / Google models.
	 */
	llm_endpoint_params?: schemas.AiLlmEndpointParamsOpenAi;
}

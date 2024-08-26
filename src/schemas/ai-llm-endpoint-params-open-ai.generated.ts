import * as schemas from '.';
/**
 * AI LLM endpoint params OpenAI
 *
 * AI LLM endpoint params OpenAI object.
 */
export interface AiLlmEndpointParamsOpenAi {
	/**
	 * The type of the AI LLM endpoint params object for OpenAI.
	 * This parameter is **required**.
	 * Example: openai_params
	 */
	type: 'openai_params';
	/**
	 * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
	 * while lower values like 0.2 will make it more focused and deterministic.
	 * We generally recommend altering this or `top_p` but not both.
	 */
	temperature?: number;
	/**
	 * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results
	 * of the tokens with `top_p` probability mass. So 0.1 means only the tokens comprising the top 10% probability
	 * mass are considered. We generally recommend altering this or temperature but not both.
	 * Example: 1
	 */
	top_p?: number;
	/**
	 * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the
	 * text so far, decreasing the model's likelihood to repeat the same line verbatim.
	 * Example: 1.5
	 */
	frequency_penalty?: number;
	/**
	 * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far,
	 * increasing the model's likelihood to talk about new topics.
	 * Example: 1.5
	 */
	presence_penalty?: number;
	/**
	 * Up to 4 sequences where the API will stop generating further tokens.
	 * Example: <|im_end|>
	 */
	stop?: string;
}

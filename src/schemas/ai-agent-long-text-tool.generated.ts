import * as schemas from '.';
/**
 * AI agent long text tool
 *
 * AI agent tool used to to handle longer text.
 */
export interface AiAgentLongTextTool
	extends schemas.AiAgentBasicTextToolTextGen {
	embeddings?: object;
}

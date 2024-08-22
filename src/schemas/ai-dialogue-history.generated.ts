import * as schemas from '.';
/**
 * Dialogue history
 *
 * A context object that can hold prior prompts and answers.
 */
export interface AiDialogueHistory {
	/**
	 * The prompt previously provided by the client and answered by the LLM.
	 * Example: Make my email about public APIs sound more professional.
	 */
	prompt?: string;
	/**
	 * The answer previously provided by the LLM.
	 * Example: Here is the first draft of your professional email about public APIs.
	 */
	answer?: string;
	/**
	 * The ISO date formatted timestamp of when the previous answer to the prompt was created.
	 * Example: 2012-12-12T10:53:43-08:00
	 */
	created_at?: string;
}

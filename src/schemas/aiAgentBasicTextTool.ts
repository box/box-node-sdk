import { serializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.js';
import { deserializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.js';
import { serializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.js';
import { deserializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.js';
import { serializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.js';
import { deserializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.js';
import { serializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.js';
import { deserializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.js';
import { serializeAiLlmEndpointParams } from './aiLlmEndpointParams.js';
import { deserializeAiLlmEndpointParams } from './aiLlmEndpointParams.js';
import { serializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.js';
import { deserializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.js';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.js';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.js';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.js';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.js';
import { AiLlmEndpointParams } from './aiLlmEndpointParams.js';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgentBasicTextTool = AiAgentBasicTextToolBase & {
  /**
   * System messages try to help the LLM "understand" its role and what it is supposed to do. */
  readonly systemMessage?: string;
  /**
   * The prompt template contains contextual information of the request and the user prompt.
   * When passing `prompt_template` parameters, you **must include** inputs for `{user_question}` and `{content}`.
   * `{current_date}` is optional, depending on the use. */
  readonly promptTemplate?: string;
};
export function serializeAiAgentBasicTextTool(
  val: AiAgentBasicTextTool,
): SerializedData {
  const base: any = serializeAiAgentBasicTextToolBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentBasicTextTool"',
    });
  }
  return {
    ...base,
    ...{
      ['system_message']: val.systemMessage,
      ['prompt_template']: val.promptTemplate,
    },
  };
}
export function deserializeAiAgentBasicTextTool(
  val: SerializedData,
): AiAgentBasicTextTool {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentBasicTextTool"',
    });
  }
  if (!(val.system_message == void 0) && !sdIsString(val.system_message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_message" of type "AiAgentBasicTextTool"',
    });
  }
  const systemMessage: undefined | string =
    val.system_message == void 0 ? void 0 : val.system_message;
  if (!(val.prompt_template == void 0) && !sdIsString(val.prompt_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt_template" of type "AiAgentBasicTextTool"',
    });
  }
  const promptTemplate: undefined | string =
    val.prompt_template == void 0 ? void 0 : val.prompt_template;
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message: 'Expecting string for "model" of type "AiAgentBasicTextTool"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiAgentBasicTextTool"',
    });
  }
  const numTokensForCompletion: undefined | number =
    val.num_tokens_for_completion == void 0
      ? void 0
      : val.num_tokens_for_completion;
  const llmEndpointParams: undefined | AiLlmEndpointParams =
    val.llm_endpoint_params == void 0
      ? void 0
      : deserializeAiLlmEndpointParams(val.llm_endpoint_params);
  return {
    systemMessage: systemMessage,
    promptTemplate: promptTemplate,
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiAgentBasicTextTool;
}

import { serializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { deserializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { serializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { deserializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { serializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { deserializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { serializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { deserializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { serializeAiLlmEndpointParams } from './aiLlmEndpointParams';
import { deserializeAiLlmEndpointParams } from './aiLlmEndpointParams';
import { serializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase';
import { deserializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { AiLlmEndpointParams } from './aiLlmEndpointParams';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiAgentBasicTextToolTextGen = AiAgentBasicTextToolBase & {
  /**
   * System messages aim at helping the LLM understand its role and what it is supposed to do.
   * The input for `{current_date}` is optional, depending on the use. */
  readonly systemMessage?: string;
  /**
   * The prompt template contains contextual information of the request and the user prompt.
   *
   * When using the `prompt_template` parameter, you **must include** input for `{user_question}`.
   * Inputs for `{current_date}` and `{content}` are optional, depending on the use. */
  readonly promptTemplate?: string;
};
export function serializeAiAgentBasicTextToolTextGen(
  val: AiAgentBasicTextToolTextGen,
): SerializedData {
  const base: any = serializeAiAgentBasicTextToolBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentBasicTextToolTextGen"',
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
export function deserializeAiAgentBasicTextToolTextGen(
  val: SerializedData,
): AiAgentBasicTextToolTextGen {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentBasicTextToolTextGen"',
    });
  }
  if (!(val.system_message == void 0) && !sdIsString(val.system_message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_message" of type "AiAgentBasicTextToolTextGen"',
    });
  }
  const systemMessage: undefined | string =
    val.system_message == void 0 ? void 0 : val.system_message;
  if (!(val.prompt_template == void 0) && !sdIsString(val.prompt_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt_template" of type "AiAgentBasicTextToolTextGen"',
    });
  }
  const promptTemplate: undefined | string =
    val.prompt_template == void 0 ? void 0 : val.prompt_template;
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "model" of type "AiAgentBasicTextToolTextGen"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiAgentBasicTextToolTextGen"',
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
  } satisfies AiAgentBasicTextToolTextGen;
}

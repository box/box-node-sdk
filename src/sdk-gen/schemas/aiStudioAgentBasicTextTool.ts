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
import { serializeAiAgentBasicTextTool } from './aiAgentBasicTextTool.js';
import { deserializeAiAgentBasicTextTool } from './aiAgentBasicTextTool.js';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.js';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.js';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.js';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.js';
import { AiLlmEndpointParams } from './aiLlmEndpointParams.js';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.js';
import { AiAgentBasicTextTool } from './aiAgentBasicTextTool.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiStudioAgentBasicTextTool = AiAgentBasicTextTool & {
  /**
   * True if system message contains custom instructions placeholder, false otherwise. */
  readonly isCustomInstructionsIncluded?: boolean;
};
export function serializeAiStudioAgentBasicTextTool(
  val: AiStudioAgentBasicTextTool
): SerializedData {
  const base: any = serializeAiAgentBasicTextTool(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentBasicTextTool"',
    });
  }
  return {
    ...base,
    ...{
      ['is_custom_instructions_included']: val.isCustomInstructionsIncluded,
    },
  };
}
export function deserializeAiStudioAgentBasicTextTool(
  val: SerializedData
): AiStudioAgentBasicTextTool {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentBasicTextTool"',
    });
  }
  if (
    !(val.is_custom_instructions_included == void 0) &&
    !sdIsBoolean(val.is_custom_instructions_included)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_custom_instructions_included" of type "AiStudioAgentBasicTextTool"',
    });
  }
  const isCustomInstructionsIncluded: undefined | boolean =
    val.is_custom_instructions_included == void 0
      ? void 0
      : val.is_custom_instructions_included;
  if (!(val.system_message == void 0) && !sdIsString(val.system_message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_message" of type "AiStudioAgentBasicTextTool"',
    });
  }
  const systemMessage: undefined | string =
    val.system_message == void 0 ? void 0 : val.system_message;
  if (!(val.prompt_template == void 0) && !sdIsString(val.prompt_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt_template" of type "AiStudioAgentBasicTextTool"',
    });
  }
  const promptTemplate: undefined | string =
    val.prompt_template == void 0 ? void 0 : val.prompt_template;
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "model" of type "AiStudioAgentBasicTextTool"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiStudioAgentBasicTextTool"',
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
    isCustomInstructionsIncluded: isCustomInstructionsIncluded,
    systemMessage: systemMessage,
    promptTemplate: promptTemplate,
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiStudioAgentBasicTextTool;
}

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
import { serializeAiAgentBasicTextTool } from './aiAgentBasicTextTool';
import { deserializeAiAgentBasicTextTool } from './aiAgentBasicTextTool';
import { serializeAiAgentLongTextToolEmbeddingsField } from './aiAgentLongTextTool';
import { deserializeAiAgentLongTextToolEmbeddingsField } from './aiAgentLongTextTool';
import { serializeAiAgentLongTextTool } from './aiAgentLongTextTool';
import { deserializeAiAgentLongTextTool } from './aiAgentLongTextTool';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { AiLlmEndpointParams } from './aiLlmEndpointParams';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase';
import { AiAgentBasicTextTool } from './aiAgentBasicTextTool';
import { AiAgentLongTextToolEmbeddingsField } from './aiAgentLongTextTool';
import { AiAgentLongTextTool } from './aiAgentLongTextTool';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiStudioAgentLongTextTool = AiAgentLongTextTool & {
  /**
   * True if system message contains custom instructions placeholder, false otherwise. */
  readonly isCustomInstructionsIncluded?: boolean;
};
export function serializeAiStudioAgentLongTextTool(
  val: AiStudioAgentLongTextTool,
): SerializedData {
  const base: any = serializeAiAgentLongTextTool(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentLongTextTool"',
    });
  }
  return {
    ...base,
    ...{
      ['is_custom_instructions_included']: val.isCustomInstructionsIncluded,
    },
  };
}
export function deserializeAiStudioAgentLongTextTool(
  val: SerializedData,
): AiStudioAgentLongTextTool {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentLongTextTool"',
    });
  }
  if (
    !(val.is_custom_instructions_included == void 0) &&
    !sdIsBoolean(val.is_custom_instructions_included)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_custom_instructions_included" of type "AiStudioAgentLongTextTool"',
    });
  }
  const isCustomInstructionsIncluded: undefined | boolean =
    val.is_custom_instructions_included == void 0
      ? void 0
      : val.is_custom_instructions_included;
  const embeddings: undefined | AiAgentLongTextToolEmbeddingsField =
    val.embeddings == void 0
      ? void 0
      : deserializeAiAgentLongTextToolEmbeddingsField(val.embeddings);
  if (!(val.system_message == void 0) && !sdIsString(val.system_message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_message" of type "AiStudioAgentLongTextTool"',
    });
  }
  const systemMessage: undefined | string =
    val.system_message == void 0 ? void 0 : val.system_message;
  if (!(val.prompt_template == void 0) && !sdIsString(val.prompt_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt_template" of type "AiStudioAgentLongTextTool"',
    });
  }
  const promptTemplate: undefined | string =
    val.prompt_template == void 0 ? void 0 : val.prompt_template;
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "model" of type "AiStudioAgentLongTextTool"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiStudioAgentLongTextTool"',
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
    embeddings: embeddings,
    systemMessage: systemMessage,
    promptTemplate: promptTemplate,
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiStudioAgentLongTextTool;
}

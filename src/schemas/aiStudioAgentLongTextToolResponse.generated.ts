import { serializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { deserializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { serializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { deserializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { serializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { deserializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { serializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.generated.js';
import { deserializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.generated.js';
import { serializeAiLlmEndpointParams } from './aiLlmEndpointParams.generated.js';
import { deserializeAiLlmEndpointParams } from './aiLlmEndpointParams.generated.js';
import { serializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.generated.js';
import { deserializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.generated.js';
import { serializeAiAgentBasicTextTool } from './aiAgentBasicTextTool.generated.js';
import { deserializeAiAgentBasicTextTool } from './aiAgentBasicTextTool.generated.js';
import { serializeAiAgentLongTextToolEmbeddingsField } from './aiAgentLongTextTool.generated.js';
import { deserializeAiAgentLongTextToolEmbeddingsField } from './aiAgentLongTextTool.generated.js';
import { serializeAiAgentLongTextTool } from './aiAgentLongTextTool.generated.js';
import { deserializeAiAgentLongTextTool } from './aiAgentLongTextTool.generated.js';
import { serializeAiStudioAgentLongTextTool } from './aiStudioAgentLongTextTool.generated.js';
import { deserializeAiStudioAgentLongTextTool } from './aiStudioAgentLongTextTool.generated.js';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.generated.js';
import { AiLlmEndpointParams } from './aiLlmEndpointParams.generated.js';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.generated.js';
import { AiAgentBasicTextTool } from './aiAgentBasicTextTool.generated.js';
import { AiAgentLongTextToolEmbeddingsField } from './aiAgentLongTextTool.generated.js';
import { AiAgentLongTextTool } from './aiAgentLongTextTool.generated.js';
import { AiStudioAgentLongTextTool } from './aiStudioAgentLongTextTool.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiStudioAgentLongTextToolResponse = AiStudioAgentLongTextTool & {
  /**
   * Warnings concerning tool. */
  readonly warnings?: readonly string[];
};
export function serializeAiStudioAgentLongTextToolResponse(
  val: AiStudioAgentLongTextToolResponse,
): SerializedData {
  const base: any = serializeAiStudioAgentLongTextTool(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentLongTextToolResponse"',
    });
  }
  return {
    ...base,
    ...{
      ['warnings']:
        val.warnings == void 0
          ? val.warnings
          : (val.warnings.map(function (item: string): SerializedData {
              return item;
            }) as readonly any[]),
    },
  };
}
export function deserializeAiStudioAgentLongTextToolResponse(
  val: SerializedData,
): AiStudioAgentLongTextToolResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentLongTextToolResponse"',
    });
  }
  if (!(val.warnings == void 0) && !sdIsList(val.warnings)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "warnings" of type "AiStudioAgentLongTextToolResponse"',
    });
  }
  const warnings: undefined | readonly string[] =
    val.warnings == void 0
      ? void 0
      : sdIsList(val.warnings)
        ? (val.warnings.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "AiStudioAgentLongTextToolResponse"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (
    !(val.is_custom_instructions_included == void 0) &&
    !sdIsBoolean(val.is_custom_instructions_included)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_custom_instructions_included" of type "AiStudioAgentLongTextToolResponse"',
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
        'Expecting string for "system_message" of type "AiStudioAgentLongTextToolResponse"',
    });
  }
  const systemMessage: undefined | string =
    val.system_message == void 0 ? void 0 : val.system_message;
  if (!(val.prompt_template == void 0) && !sdIsString(val.prompt_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt_template" of type "AiStudioAgentLongTextToolResponse"',
    });
  }
  const promptTemplate: undefined | string =
    val.prompt_template == void 0 ? void 0 : val.prompt_template;
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "model" of type "AiStudioAgentLongTextToolResponse"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiStudioAgentLongTextToolResponse"',
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
    warnings: warnings,
    isCustomInstructionsIncluded: isCustomInstructionsIncluded,
    embeddings: embeddings,
    systemMessage: systemMessage,
    promptTemplate: promptTemplate,
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiStudioAgentLongTextToolResponse;
}

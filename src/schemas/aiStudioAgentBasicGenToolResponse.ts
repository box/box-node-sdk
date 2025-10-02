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
import { serializeAiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen';
import { deserializeAiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen';
import { serializeAiAgentLongTextToolTextGenEmbeddingsField } from './aiAgentLongTextToolTextGen';
import { deserializeAiAgentLongTextToolTextGenEmbeddingsField } from './aiAgentLongTextToolTextGen';
import { serializeAiAgentLongTextToolTextGen } from './aiAgentLongTextToolTextGen';
import { deserializeAiAgentLongTextToolTextGen } from './aiAgentLongTextToolTextGen';
import { serializeAiAgentBasicGenTool } from './aiAgentBasicGenTool';
import { deserializeAiAgentBasicGenTool } from './aiAgentBasicGenTool';
import { serializeAiStudioAgentBasicGenTool } from './aiStudioAgentBasicGenTool';
import { deserializeAiStudioAgentBasicGenTool } from './aiStudioAgentBasicGenTool';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { AiLlmEndpointParams } from './aiLlmEndpointParams';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase';
import { AiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen';
import { AiAgentLongTextToolTextGenEmbeddingsField } from './aiAgentLongTextToolTextGen';
import { AiAgentLongTextToolTextGen } from './aiAgentLongTextToolTextGen';
import { AiAgentBasicGenTool } from './aiAgentBasicGenTool';
import { AiStudioAgentBasicGenTool } from './aiStudioAgentBasicGenTool';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiStudioAgentBasicGenToolResponse = AiStudioAgentBasicGenTool & {
  /**
   * Warnings concerning tool. */
  readonly warnings?: readonly string[];
};
export function serializeAiStudioAgentBasicGenToolResponse(
  val: AiStudioAgentBasicGenToolResponse,
): SerializedData {
  const base: any = serializeAiStudioAgentBasicGenTool(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentBasicGenToolResponse"',
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
export function deserializeAiStudioAgentBasicGenToolResponse(
  val: SerializedData,
): AiStudioAgentBasicGenToolResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentBasicGenToolResponse"',
    });
  }
  if (!(val.warnings == void 0) && !sdIsList(val.warnings)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "warnings" of type "AiStudioAgentBasicGenToolResponse"',
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
                  'Expecting string for "AiStudioAgentBasicGenToolResponse"',
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
        'Expecting boolean for "is_custom_instructions_included" of type "AiStudioAgentBasicGenToolResponse"',
    });
  }
  const isCustomInstructionsIncluded: undefined | boolean =
    val.is_custom_instructions_included == void 0
      ? void 0
      : val.is_custom_instructions_included;
  if (!(val.content_template == void 0) && !sdIsString(val.content_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content_template" of type "AiStudioAgentBasicGenToolResponse"',
    });
  }
  const contentTemplate: undefined | string =
    val.content_template == void 0 ? void 0 : val.content_template;
  const embeddings: undefined | AiAgentLongTextToolTextGenEmbeddingsField =
    val.embeddings == void 0
      ? void 0
      : deserializeAiAgentLongTextToolTextGenEmbeddingsField(val.embeddings);
  if (!(val.system_message == void 0) && !sdIsString(val.system_message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_message" of type "AiStudioAgentBasicGenToolResponse"',
    });
  }
  const systemMessage: undefined | string =
    val.system_message == void 0 ? void 0 : val.system_message;
  if (!(val.prompt_template == void 0) && !sdIsString(val.prompt_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt_template" of type "AiStudioAgentBasicGenToolResponse"',
    });
  }
  const promptTemplate: undefined | string =
    val.prompt_template == void 0 ? void 0 : val.prompt_template;
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "model" of type "AiStudioAgentBasicGenToolResponse"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiStudioAgentBasicGenToolResponse"',
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
    contentTemplate: contentTemplate,
    embeddings: embeddings,
    systemMessage: systemMessage,
    promptTemplate: promptTemplate,
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiStudioAgentBasicGenToolResponse;
}

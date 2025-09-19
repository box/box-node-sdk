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
import { serializeAiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen.js';
import { deserializeAiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen.js';
import { serializeAiAgentLongTextToolTextGenEmbeddingsField } from './aiAgentLongTextToolTextGen.js';
import { deserializeAiAgentLongTextToolTextGenEmbeddingsField } from './aiAgentLongTextToolTextGen.js';
import { serializeAiAgentLongTextToolTextGen } from './aiAgentLongTextToolTextGen.js';
import { deserializeAiAgentLongTextToolTextGen } from './aiAgentLongTextToolTextGen.js';
import { serializeAiAgentBasicGenTool } from './aiAgentBasicGenTool.js';
import { deserializeAiAgentBasicGenTool } from './aiAgentBasicGenTool.js';
import { serializeAiStudioAgentBasicGenTool } from './aiStudioAgentBasicGenTool.js';
import { deserializeAiStudioAgentBasicGenTool } from './aiStudioAgentBasicGenTool.js';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.js';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.js';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.js';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.js';
import { AiLlmEndpointParams } from './aiLlmEndpointParams.js';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.js';
import { AiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen.js';
import { AiAgentLongTextToolTextGenEmbeddingsField } from './aiAgentLongTextToolTextGen.js';
import { AiAgentLongTextToolTextGen } from './aiAgentLongTextToolTextGen.js';
import { AiAgentBasicGenTool } from './aiAgentBasicGenTool.js';
import { AiStudioAgentBasicGenTool } from './aiStudioAgentBasicGenTool.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiStudioAgentBasicGenToolResponse = AiStudioAgentBasicGenTool & {
  /**
   * Warnings concerning tool. */
  readonly warnings?: readonly string[];
};
export function serializeAiStudioAgentBasicGenToolResponse(
  val: AiStudioAgentBasicGenToolResponse
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
  val: SerializedData
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

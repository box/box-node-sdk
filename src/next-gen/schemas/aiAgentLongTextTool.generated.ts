import { serializeAiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi.generated.js';
import { deserializeAiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi.generated.js';
import { serializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.generated.js';
import { deserializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.generated.js';
import { serializeAiAgentBasicTextTool } from './aiAgentBasicTextTool.generated.js';
import { deserializeAiAgentBasicTextTool } from './aiAgentBasicTextTool.generated.js';
import { AiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi.generated.js';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.generated.js';
import { AiAgentBasicTextTool } from './aiAgentBasicTextTool.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface AiAgentLongTextToolEmbeddingsStrategyField {
  /**
   * The strategy used for the AI agent for calculating embeddings. */
  readonly id?: string;
  /**
   * The number of tokens per chunk. */
  readonly numTokensPerChunk?: number;
  readonly rawData?: SerializedData;
}
export interface AiAgentLongTextToolEmbeddingsField {
  /**
   * The model used for the AI agent for calculating embeddings. */
  readonly model?: string;
  readonly strategy?: AiAgentLongTextToolEmbeddingsStrategyField;
  readonly rawData?: SerializedData;
}
export type AiAgentLongTextTool = AiAgentBasicTextTool & {
  readonly embeddings?: AiAgentLongTextToolEmbeddingsField;
};
export function serializeAiAgentLongTextToolEmbeddingsStrategyField(
  val: AiAgentLongTextToolEmbeddingsStrategyField,
): SerializedData {
  return { ['id']: val.id, ['num_tokens_per_chunk']: val.numTokensPerChunk };
}
export function deserializeAiAgentLongTextToolEmbeddingsStrategyField(
  val: SerializedData,
): AiAgentLongTextToolEmbeddingsStrategyField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AiAgentLongTextToolEmbeddingsStrategyField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "AiAgentLongTextToolEmbeddingsStrategyField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (
    !(val.num_tokens_per_chunk == void 0) &&
    !sdIsNumber(val.num_tokens_per_chunk)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_per_chunk" of type "AiAgentLongTextToolEmbeddingsStrategyField"',
    });
  }
  const numTokensPerChunk: undefined | number =
    val.num_tokens_per_chunk == void 0 ? void 0 : val.num_tokens_per_chunk;
  return {
    id: id,
    numTokensPerChunk: numTokensPerChunk,
  } satisfies AiAgentLongTextToolEmbeddingsStrategyField;
}
export function serializeAiAgentLongTextToolEmbeddingsField(
  val: AiAgentLongTextToolEmbeddingsField,
): SerializedData {
  return {
    ['model']: val.model,
    ['strategy']:
      val.strategy == void 0
        ? val.strategy
        : serializeAiAgentLongTextToolEmbeddingsStrategyField(val.strategy),
  };
}
export function deserializeAiAgentLongTextToolEmbeddingsField(
  val: SerializedData,
): AiAgentLongTextToolEmbeddingsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentLongTextToolEmbeddingsField"',
    });
  }
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "model" of type "AiAgentLongTextToolEmbeddingsField"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  const strategy: undefined | AiAgentLongTextToolEmbeddingsStrategyField =
    val.strategy == void 0
      ? void 0
      : deserializeAiAgentLongTextToolEmbeddingsStrategyField(val.strategy);
  return {
    model: model,
    strategy: strategy,
  } satisfies AiAgentLongTextToolEmbeddingsField;
}
export function serializeAiAgentLongTextTool(
  val: AiAgentLongTextTool,
): SerializedData {
  const base: any = serializeAiAgentBasicTextTool(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentLongTextTool"',
    });
  }
  return {
    ...base,
    ...{
      ['embeddings']:
        val.embeddings == void 0
          ? val.embeddings
          : serializeAiAgentLongTextToolEmbeddingsField(val.embeddings),
    },
  };
}
export function deserializeAiAgentLongTextTool(
  val: SerializedData,
): AiAgentLongTextTool {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentLongTextTool"',
    });
  }
  const embeddings: undefined | AiAgentLongTextToolEmbeddingsField =
    val.embeddings == void 0
      ? void 0
      : deserializeAiAgentLongTextToolEmbeddingsField(val.embeddings);
  if (!(val.system_message == void 0) && !sdIsString(val.system_message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_message" of type "AiAgentLongTextTool"',
    });
  }
  const systemMessage: undefined | string =
    val.system_message == void 0 ? void 0 : val.system_message;
  if (!(val.prompt_template == void 0) && !sdIsString(val.prompt_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt_template" of type "AiAgentLongTextTool"',
    });
  }
  const promptTemplate: undefined | string =
    val.prompt_template == void 0 ? void 0 : val.prompt_template;
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message: 'Expecting string for "model" of type "AiAgentLongTextTool"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiAgentLongTextTool"',
    });
  }
  const numTokensForCompletion: undefined | number =
    val.num_tokens_for_completion == void 0
      ? void 0
      : val.num_tokens_for_completion;
  const llmEndpointParams:
    | undefined
    | AiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi =
    val.llm_endpoint_params == void 0
      ? void 0
      : deserializeAiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi(
          val.llm_endpoint_params,
        );
  return {
    embeddings: embeddings,
    systemMessage: systemMessage,
    promptTemplate: promptTemplate,
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiAgentLongTextTool;
}

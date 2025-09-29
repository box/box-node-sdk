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
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { AiLlmEndpointParams } from './aiLlmEndpointParams';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase';
import { AiAgentBasicTextTool } from './aiAgentBasicTextTool';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
  const llmEndpointParams: undefined | AiLlmEndpointParams =
    val.llm_endpoint_params == void 0
      ? void 0
      : deserializeAiLlmEndpointParams(val.llm_endpoint_params);
  return {
    embeddings: embeddings,
    systemMessage: systemMessage,
    promptTemplate: promptTemplate,
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiAgentLongTextTool;
}

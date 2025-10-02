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
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { AiLlmEndpointParams } from './aiLlmEndpointParams';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase';
import { AiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface AiAgentLongTextToolTextGenEmbeddingsStrategyField {
  /**
   * The strategy used for the AI agent for calculating embeddings. */
  readonly id?: string;
  /**
   * The number of tokens per chunk. */
  readonly numTokensPerChunk?: number;
  readonly rawData?: SerializedData;
}
export interface AiAgentLongTextToolTextGenEmbeddingsField {
  /**
   * The model used for the AI agent for calculating embeddings. */
  readonly model?: string;
  readonly strategy?: AiAgentLongTextToolTextGenEmbeddingsStrategyField;
  readonly rawData?: SerializedData;
}
export type AiAgentLongTextToolTextGen = AiAgentBasicTextToolTextGen & {
  readonly embeddings?: AiAgentLongTextToolTextGenEmbeddingsField;
};
export function serializeAiAgentLongTextToolTextGenEmbeddingsStrategyField(
  val: AiAgentLongTextToolTextGenEmbeddingsStrategyField,
): SerializedData {
  return { ['id']: val.id, ['num_tokens_per_chunk']: val.numTokensPerChunk };
}
export function deserializeAiAgentLongTextToolTextGenEmbeddingsStrategyField(
  val: SerializedData,
): AiAgentLongTextToolTextGenEmbeddingsStrategyField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AiAgentLongTextToolTextGenEmbeddingsStrategyField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "AiAgentLongTextToolTextGenEmbeddingsStrategyField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (
    !(val.num_tokens_per_chunk == void 0) &&
    !sdIsNumber(val.num_tokens_per_chunk)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_per_chunk" of type "AiAgentLongTextToolTextGenEmbeddingsStrategyField"',
    });
  }
  const numTokensPerChunk: undefined | number =
    val.num_tokens_per_chunk == void 0 ? void 0 : val.num_tokens_per_chunk;
  return {
    id: id,
    numTokensPerChunk: numTokensPerChunk,
  } satisfies AiAgentLongTextToolTextGenEmbeddingsStrategyField;
}
export function serializeAiAgentLongTextToolTextGenEmbeddingsField(
  val: AiAgentLongTextToolTextGenEmbeddingsField,
): SerializedData {
  return {
    ['model']: val.model,
    ['strategy']:
      val.strategy == void 0
        ? val.strategy
        : serializeAiAgentLongTextToolTextGenEmbeddingsStrategyField(
            val.strategy,
          ),
  };
}
export function deserializeAiAgentLongTextToolTextGenEmbeddingsField(
  val: SerializedData,
): AiAgentLongTextToolTextGenEmbeddingsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AiAgentLongTextToolTextGenEmbeddingsField"',
    });
  }
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "model" of type "AiAgentLongTextToolTextGenEmbeddingsField"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  const strategy:
    | undefined
    | AiAgentLongTextToolTextGenEmbeddingsStrategyField =
    val.strategy == void 0
      ? void 0
      : deserializeAiAgentLongTextToolTextGenEmbeddingsStrategyField(
          val.strategy,
        );
  return {
    model: model,
    strategy: strategy,
  } satisfies AiAgentLongTextToolTextGenEmbeddingsField;
}
export function serializeAiAgentLongTextToolTextGen(
  val: AiAgentLongTextToolTextGen,
): SerializedData {
  const base: any = serializeAiAgentBasicTextToolTextGen(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentLongTextToolTextGen"',
    });
  }
  return {
    ...base,
    ...{
      ['embeddings']:
        val.embeddings == void 0
          ? val.embeddings
          : serializeAiAgentLongTextToolTextGenEmbeddingsField(val.embeddings),
    },
  };
}
export function deserializeAiAgentLongTextToolTextGen(
  val: SerializedData,
): AiAgentLongTextToolTextGen {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentLongTextToolTextGen"',
    });
  }
  const embeddings: undefined | AiAgentLongTextToolTextGenEmbeddingsField =
    val.embeddings == void 0
      ? void 0
      : deserializeAiAgentLongTextToolTextGenEmbeddingsField(val.embeddings);
  if (!(val.system_message == void 0) && !sdIsString(val.system_message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_message" of type "AiAgentLongTextToolTextGen"',
    });
  }
  const systemMessage: undefined | string =
    val.system_message == void 0 ? void 0 : val.system_message;
  if (!(val.prompt_template == void 0) && !sdIsString(val.prompt_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt_template" of type "AiAgentLongTextToolTextGen"',
    });
  }
  const promptTemplate: undefined | string =
    val.prompt_template == void 0 ? void 0 : val.prompt_template;
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "model" of type "AiAgentLongTextToolTextGen"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiAgentLongTextToolTextGen"',
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
  } satisfies AiAgentLongTextToolTextGen;
}

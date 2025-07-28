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
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.generated.js';
import { AiLlmEndpointParams } from './aiLlmEndpointParams.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface AiAgentSpreadsheetTool {
  /**
   * The model used for the AI agent for spreadsheets. For specific model values, see the [available models list](g://box-ai/supported-models). */
  readonly model?: string;
  /**
   * The number of tokens for completion. */
  readonly numTokensForCompletion?: number;
  readonly llmEndpointParams?: AiLlmEndpointParams;
  readonly rawData?: SerializedData;
}
export function serializeAiAgentSpreadsheetTool(
  val: AiAgentSpreadsheetTool,
): SerializedData {
  return {
    ['model']: val.model,
    ['num_tokens_for_completion']: val.numTokensForCompletion,
    ['llm_endpoint_params']:
      val.llmEndpointParams == void 0
        ? val.llmEndpointParams
        : serializeAiLlmEndpointParams(val.llmEndpointParams),
  };
}
export function deserializeAiAgentSpreadsheetTool(
  val: SerializedData,
): AiAgentSpreadsheetTool {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentSpreadsheetTool"',
    });
  }
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message: 'Expecting string for "model" of type "AiAgentSpreadsheetTool"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiAgentSpreadsheetTool"',
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
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiAgentSpreadsheetTool;
}

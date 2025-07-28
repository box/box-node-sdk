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
import { serializeAiAgentSpreadsheetTool } from './aiAgentSpreadsheetTool.generated.js';
import { deserializeAiAgentSpreadsheetTool } from './aiAgentSpreadsheetTool.generated.js';
import { serializeAiStudioAgentSpreadsheetTool } from './aiStudioAgentSpreadsheetTool.generated.js';
import { deserializeAiStudioAgentSpreadsheetTool } from './aiStudioAgentSpreadsheetTool.generated.js';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.generated.js';
import { AiLlmEndpointParams } from './aiLlmEndpointParams.generated.js';
import { AiAgentSpreadsheetTool } from './aiAgentSpreadsheetTool.generated.js';
import { AiStudioAgentSpreadsheetTool } from './aiStudioAgentSpreadsheetTool.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiStudioAgentSpreadsheetToolResponse =
  AiStudioAgentSpreadsheetTool & {
    /**
     * Warnings concerning tool. */
    readonly warnings?: readonly string[];
  };
export function serializeAiStudioAgentSpreadsheetToolResponse(
  val: AiStudioAgentSpreadsheetToolResponse,
): SerializedData {
  const base: any = serializeAiStudioAgentSpreadsheetTool(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentSpreadsheetToolResponse"',
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
export function deserializeAiStudioAgentSpreadsheetToolResponse(
  val: SerializedData,
): AiStudioAgentSpreadsheetToolResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentSpreadsheetToolResponse"',
    });
  }
  if (!(val.warnings == void 0) && !sdIsList(val.warnings)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "warnings" of type "AiStudioAgentSpreadsheetToolResponse"',
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
                  'Expecting string for "AiStudioAgentSpreadsheetToolResponse"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "model" of type "AiStudioAgentSpreadsheetToolResponse"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiStudioAgentSpreadsheetToolResponse"',
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
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiStudioAgentSpreadsheetToolResponse;
}

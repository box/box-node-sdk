import { serializeAiExtractResponse } from './aiExtractResponse';
import { deserializeAiExtractResponse } from './aiExtractResponse';
import { serializeAiAgentInfo } from './aiAgentInfo';
import { deserializeAiAgentInfo } from './aiAgentInfo';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { AiExtractResponse } from './aiExtractResponse';
import { AiAgentInfo } from './aiAgentInfo';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface AiExtractStructuredResponse {
  readonly answer: AiExtractResponse;
  /**
   * The ISO date formatted timestamp of when the answer to the prompt was created. */
  readonly createdAt: DateTime;
  /**
   * The reason the response finishes. */
  readonly completionReason?: string;
  /**
   * The confidence score levels and numeric values for each extracted field as a JSON dictionary. This can be empty if no field could be extracted. */
  readonly confidenceScore?: {
    readonly [key: string]: any;
  };
  readonly aiAgentInfo?: AiAgentInfo;
  readonly rawData?: SerializedData;
}
export function serializeAiExtractStructuredResponse(
  val: AiExtractStructuredResponse,
): SerializedData {
  return {
    ['answer']: serializeAiExtractResponse(val.answer),
    ['created_at']: serializeDateTime(val.createdAt),
    ['completion_reason']: val.completionReason,
    ['confidence_score']:
      val.confidenceScore == void 0
        ? val.confidenceScore
        : (Object.fromEntries(
            Object.entries(val.confidenceScore).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ]),
          ) as {
            readonly [key: string]: any;
          }),
    ['ai_agent_info']:
      val.aiAgentInfo == void 0
        ? val.aiAgentInfo
        : serializeAiAgentInfo(val.aiAgentInfo),
  };
}
export function deserializeAiExtractStructuredResponse(
  val: SerializedData,
): AiExtractStructuredResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiExtractStructuredResponse"',
    });
  }
  if (val.answer == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "answer" of type "AiExtractStructuredResponse" to be defined',
    });
  }
  const answer: AiExtractResponse = deserializeAiExtractResponse(val.answer);
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_at" of type "AiExtractStructuredResponse" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "AiExtractStructuredResponse"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  if (
    !(val.completion_reason == void 0) &&
    !sdIsString(val.completion_reason)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "completion_reason" of type "AiExtractStructuredResponse"',
    });
  }
  const completionReason: undefined | string =
    val.completion_reason == void 0 ? void 0 : val.completion_reason;
  if (!(val.confidence_score == void 0) && !sdIsMap(val.confidence_score)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "confidence_score" of type "AiExtractStructuredResponse"',
    });
  }
  const confidenceScore:
    | undefined
    | {
        readonly [key: string]: any;
      } =
    val.confidence_score == void 0
      ? void 0
      : sdIsMap(val.confidence_score)
        ? (Object.fromEntries(
            Object.entries(val.confidence_score).map(
              ([k, v]: [string, any]) => [
                k,
                (function (v: any): any {
                  return v;
                })(v),
              ],
            ),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  const aiAgentInfo: undefined | AiAgentInfo =
    val.ai_agent_info == void 0
      ? void 0
      : deserializeAiAgentInfo(val.ai_agent_info);
  return {
    answer: answer,
    createdAt: createdAt,
    completionReason: completionReason,
    confidenceScore: confidenceScore,
    aiAgentInfo: aiAgentInfo,
  } satisfies AiExtractStructuredResponse;
}

import { serializeAiExtractResponse } from './aiExtractResponse.generated.js';
import { deserializeAiExtractResponse } from './aiExtractResponse.generated.js';
import { serializeAiAgentInfo } from './aiAgentInfo.generated.js';
import { deserializeAiAgentInfo } from './aiAgentInfo.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { AiExtractResponse } from './aiExtractResponse.generated.js';
import { AiAgentInfo } from './aiAgentInfo.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface AiExtractStructuredResponse {
  readonly answer: AiExtractResponse;
  /**
   * The ISO date formatted timestamp of when the answer to the prompt was created. */
  readonly createdAt: DateTime;
  /**
   * The reason the response finishes. */
  readonly completionReason?: string;
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
  const aiAgentInfo: undefined | AiAgentInfo =
    val.ai_agent_info == void 0
      ? void 0
      : deserializeAiAgentInfo(val.ai_agent_info);
  return {
    answer: answer,
    createdAt: createdAt,
    completionReason: completionReason,
    aiAgentInfo: aiAgentInfo,
  } satisfies AiExtractStructuredResponse;
}

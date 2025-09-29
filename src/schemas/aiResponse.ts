import { serializeAiAgentInfo } from './aiAgentInfo';
import { deserializeAiAgentInfo } from './aiAgentInfo';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
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
export interface AiResponse {
  /**
   * The answer provided by the LLM. */
  readonly answer: string;
  /**
   * The ISO date formatted timestamp of when the answer to the prompt was created. */
  readonly createdAt: DateTime;
  /**
   * The reason the response finishes. */
  readonly completionReason?: string;
  readonly aiAgentInfo?: AiAgentInfo;
  readonly rawData?: SerializedData;
}
export function serializeAiResponse(val: AiResponse): SerializedData {
  return {
    ['answer']: val.answer,
    ['created_at']: serializeDateTime(val.createdAt),
    ['completion_reason']: val.completionReason,
    ['ai_agent_info']:
      val.aiAgentInfo == void 0
        ? val.aiAgentInfo
        : serializeAiAgentInfo(val.aiAgentInfo),
  };
}
export function deserializeAiResponse(val: SerializedData): AiResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiResponse"' });
  }
  if (val.answer == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "answer" of type "AiResponse" to be defined',
    });
  }
  if (!sdIsString(val.answer)) {
    throw new BoxSdkError({
      message: 'Expecting string for "answer" of type "AiResponse"',
    });
  }
  const answer: string = val.answer;
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "created_at" of type "AiResponse" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "AiResponse"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  if (
    !(val.completion_reason == void 0) &&
    !sdIsString(val.completion_reason)
  ) {
    throw new BoxSdkError({
      message: 'Expecting string for "completion_reason" of type "AiResponse"',
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
  } satisfies AiResponse;
}

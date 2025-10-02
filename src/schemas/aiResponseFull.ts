import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { serializeAiAgentInfo } from './aiAgentInfo';
import { deserializeAiAgentInfo } from './aiAgentInfo';
import { serializeAiResponse } from './aiResponse';
import { deserializeAiResponse } from './aiResponse';
import { serializeAiCitation } from './aiCitation';
import { deserializeAiCitation } from './aiCitation';
import { DateTime } from '../internal/utils';
import { AiAgentInfo } from './aiAgentInfo';
import { AiResponse } from './aiResponse';
import { AiCitation } from './aiCitation';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiResponseFull = AiResponse & {
  /**
   * The citations of the LLM's answer reference. */
  readonly citations?: readonly AiCitation[];
};
export function serializeAiResponseFull(val: AiResponseFull): SerializedData {
  const base: any = serializeAiResponse(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiResponseFull"' });
  }
  return {
    ...base,
    ...{
      ['citations']:
        val.citations == void 0
          ? val.citations
          : (val.citations.map(function (item: AiCitation): SerializedData {
              return serializeAiCitation(item);
            }) as readonly any[]),
    },
  };
}
export function deserializeAiResponseFull(val: SerializedData): AiResponseFull {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiResponseFull"' });
  }
  if (!(val.citations == void 0) && !sdIsList(val.citations)) {
    throw new BoxSdkError({
      message: 'Expecting array for "citations" of type "AiResponseFull"',
    });
  }
  const citations: undefined | readonly AiCitation[] =
    val.citations == void 0
      ? void 0
      : sdIsList(val.citations)
        ? (val.citations.map(function (itm: SerializedData): AiCitation {
            return deserializeAiCitation(itm);
          }) as readonly any[])
        : [];
  if (val.answer == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "answer" of type "AiResponseFull" to be defined',
    });
  }
  if (!sdIsString(val.answer)) {
    throw new BoxSdkError({
      message: 'Expecting string for "answer" of type "AiResponseFull"',
    });
  }
  const answer: string = val.answer;
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "created_at" of type "AiResponseFull" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "AiResponseFull"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  if (
    !(val.completion_reason == void 0) &&
    !sdIsString(val.completion_reason)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "completion_reason" of type "AiResponseFull"',
    });
  }
  const completionReason: undefined | string =
    val.completion_reason == void 0 ? void 0 : val.completion_reason;
  const aiAgentInfo: undefined | AiAgentInfo =
    val.ai_agent_info == void 0
      ? void 0
      : deserializeAiAgentInfo(val.ai_agent_info);
  return {
    citations: citations,
    answer: answer,
    createdAt: createdAt,
    completionReason: completionReason,
    aiAgentInfo: aiAgentInfo,
  } satisfies AiResponseFull;
}

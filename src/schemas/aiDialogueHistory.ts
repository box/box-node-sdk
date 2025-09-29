import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface AiDialogueHistory {
  /**
   * The prompt previously provided by the client and answered by the LLM. */
  readonly prompt?: string;
  /**
   * The answer previously provided by the LLM. */
  readonly answer?: string;
  /**
   * The ISO date formatted timestamp of when the previous answer to the prompt was created. */
  readonly createdAt?: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeAiDialogueHistory(
  val: AiDialogueHistory,
): SerializedData {
  return {
    ['prompt']: val.prompt,
    ['answer']: val.answer,
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
  };
}
export function deserializeAiDialogueHistory(
  val: SerializedData,
): AiDialogueHistory {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiDialogueHistory"',
    });
  }
  if (!(val.prompt == void 0) && !sdIsString(val.prompt)) {
    throw new BoxSdkError({
      message: 'Expecting string for "prompt" of type "AiDialogueHistory"',
    });
  }
  const prompt: undefined | string = val.prompt == void 0 ? void 0 : val.prompt;
  if (!(val.answer == void 0) && !sdIsString(val.answer)) {
    throw new BoxSdkError({
      message: 'Expecting string for "answer" of type "AiDialogueHistory"',
    });
  }
  const answer: undefined | string = val.answer == void 0 ? void 0 : val.answer;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "AiDialogueHistory"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  return {
    prompt: prompt,
    answer: answer,
    createdAt: createdAt,
  } satisfies AiDialogueHistory;
}

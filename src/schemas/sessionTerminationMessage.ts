import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface SessionTerminationMessage {
  /**
   * The unique identifier for the termination job status. */
  readonly message?: string;
  readonly rawData?: SerializedData;
}
export function serializeSessionTerminationMessage(
  val: SessionTerminationMessage,
): SerializedData {
  return { ['message']: val.message };
}
export function deserializeSessionTerminationMessage(
  val: SerializedData,
): SessionTerminationMessage {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SessionTerminationMessage"',
    });
  }
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "message" of type "SessionTerminationMessage"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  return { message: message } satisfies SessionTerminationMessage;
}

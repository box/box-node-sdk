import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface DocGenTagsProcessingMessageV2025R0 {
  /**
   * A message informing the user that document tags are still being processed. */
  readonly message: string;
  readonly rawData?: SerializedData;
}
export function serializeDocGenTagsProcessingMessageV2025R0(
  val: DocGenTagsProcessingMessageV2025R0,
): SerializedData {
  return { ['message']: val.message };
}
export function deserializeDocGenTagsProcessingMessageV2025R0(
  val: SerializedData,
): DocGenTagsProcessingMessageV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenTagsProcessingMessageV2025R0"',
    });
  }
  if (val.message == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "message" of type "DocGenTagsProcessingMessageV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "message" of type "DocGenTagsProcessingMessageV2025R0"',
    });
  }
  const message: string = val.message;
  return { message: message } satisfies DocGenTagsProcessingMessageV2025R0;
}

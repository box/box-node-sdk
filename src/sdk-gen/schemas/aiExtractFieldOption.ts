import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface AiExtractFieldOption {
  /**
   * A unique identifier for the option. */
  readonly key: string;
  readonly rawData?: SerializedData;
}
export function serializeAiExtractFieldOption(
  val: AiExtractFieldOption
): SerializedData {
  return { ['key']: val.key };
}
export function deserializeAiExtractFieldOption(
  val: SerializedData
): AiExtractFieldOption {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiExtractFieldOption"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "key" of type "AiExtractFieldOption" to be defined',
    });
  }
  if (!sdIsString(val.key)) {
    throw new BoxSdkError({
      message: 'Expecting string for "key" of type "AiExtractFieldOption"',
    });
  }
  const key: string = val.key;
  return { key: key } satisfies AiExtractFieldOption;
}

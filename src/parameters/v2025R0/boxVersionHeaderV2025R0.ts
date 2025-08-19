import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type BoxVersionHeaderV2025R0 = '2025.0' | string;
export function serializeBoxVersionHeaderV2025R0(
  val: BoxVersionHeaderV2025R0,
): SerializedData {
  return val;
}
export function deserializeBoxVersionHeaderV2025R0(
  val: SerializedData,
): BoxVersionHeaderV2025R0 {
  if (val == '2025.0') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize BoxVersionHeaderV2025R0",
  });
}

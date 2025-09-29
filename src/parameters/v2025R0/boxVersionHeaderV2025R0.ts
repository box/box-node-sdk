import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
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

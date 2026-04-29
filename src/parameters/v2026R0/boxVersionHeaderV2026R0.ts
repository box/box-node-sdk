import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type BoxVersionHeaderV2026R0 = '2026.0' | string;
export function serializeBoxVersionHeaderV2026R0(
  val: BoxVersionHeaderV2026R0,
): SerializedData {
  return val;
}
export function deserializeBoxVersionHeaderV2026R0(
  val: SerializedData,
): BoxVersionHeaderV2026R0 {
  if (val == '2026.0') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize BoxVersionHeaderV2026R0",
  });
}

import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type HubActionV2025R0 = 'add' | 'remove' | string;
export function serializeHubActionV2025R0(
  val: HubActionV2025R0,
): SerializedData {
  return val;
}
export function deserializeHubActionV2025R0(
  val: SerializedData,
): HubActionV2025R0 {
  if (val == 'add') {
    return val;
  }
  if (val == 'remove') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize HubActionV2025R0" });
}

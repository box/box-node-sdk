import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type MetadataInstanceValue =
  | string
  | number
  | number
  | readonly string[];
export function serializeMetadataInstanceValue(val: any): SerializedData {
  return val;
}
export function deserializeMetadataInstanceValue(
  val: SerializedData,
): MetadataInstanceValue {
  if (sdIsString(val)) {
    return val;
  }
  if (sdIsNumber(val)) {
    return val;
  }
  if (sdIsList(val) && val.every(sdIsString)) {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize MetadataInstanceValue" });
}

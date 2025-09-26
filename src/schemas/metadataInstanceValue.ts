import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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

import { serializeMetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange';
import { deserializeMetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange';
import { serializeMetadataFieldFilterDateRange } from './metadataFieldFilterDateRange';
import { deserializeMetadataFieldFilterDateRange } from './metadataFieldFilterDateRange';
import { MetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange';
import { MetadataFieldFilterDateRange } from './metadataFieldFilterDateRange';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type MetadataFilterValue =
  | string
  | number
  | readonly string[]
  | MetadataFieldFilterFloatRange
  | MetadataFieldFilterDateRange;
export function serializeMetadataFilterValue(val: any): SerializedData {
  if (sdIsString(val)) {
    return val;
  }
  if (sdIsNumber(val)) {
    return val;
  }
  if (sdIsList(val) && val.every(sdIsString)) {
    return val;
  }
  try {
    if (!(val.lt == void 0) && !sdIsNumber(val.lt)) {
      throw new BoxSdkError({
        message:
          'Expecting number for "lt" of type "MetadataFieldFilterFloatRange"',
      });
    }
    if (!(val.gt == void 0) && !sdIsNumber(val.gt)) {
      throw new BoxSdkError({
        message:
          'Expecting number for "gt" of type "MetadataFieldFilterFloatRange"',
      });
    }
    return serializeMetadataFieldFilterFloatRange(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return serializeMetadataFieldFilterDateRange(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({ message: "Can't serialize MetadataFilterValue" });
}
export function deserializeMetadataFilterValue(
  val: SerializedData,
): MetadataFilterValue {
  if (sdIsString(val)) {
    return val;
  }
  if (sdIsNumber(val)) {
    return val;
  }
  if (sdIsList(val) && val.every(sdIsString)) {
    return val;
  }
  try {
    return deserializeMetadataFieldFilterFloatRange(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeMetadataFieldFilterDateRange(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({ message: "Can't deserialize MetadataFilterValue" });
}

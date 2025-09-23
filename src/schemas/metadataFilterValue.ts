import { serializeMetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange.js';
import { deserializeMetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange.js';
import { serializeMetadataFieldFilterDateRange } from './metadataFieldFilterDateRange.js';
import { deserializeMetadataFieldFilterDateRange } from './metadataFieldFilterDateRange.js';
import { MetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange.js';
import { MetadataFieldFilterDateRange } from './metadataFieldFilterDateRange.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

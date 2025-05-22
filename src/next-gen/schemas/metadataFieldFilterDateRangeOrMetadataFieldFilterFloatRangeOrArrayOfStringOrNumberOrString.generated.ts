import { serializeMetadataFieldFilterDateRange } from './metadataFieldFilterDateRange.generated.js';
import { deserializeMetadataFieldFilterDateRange } from './metadataFieldFilterDateRange.generated.js';
import { serializeMetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange.generated.js';
import { deserializeMetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange.generated.js';
import { MetadataFieldFilterDateRange } from './metadataFieldFilterDateRange.generated.js';
import { MetadataFieldFilterFloatRange } from './metadataFieldFilterFloatRange.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type MetadataFieldFilterDateRangeOrMetadataFieldFilterFloatRangeOrArrayOfStringOrNumberOrString =

    | MetadataFieldFilterDateRange
    | MetadataFieldFilterFloatRange
    | readonly string[]
    | number
    | string;
export function serializeMetadataFieldFilterDateRangeOrMetadataFieldFilterFloatRangeOrArrayOfStringOrNumberOrString(
  val: any,
): SerializedData {
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
    return serializeMetadataFieldFilterDateRange(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return serializeMetadataFieldFilterFloatRange(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message:
      "Can't serialize MetadataFieldFilterDateRangeOrMetadataFieldFilterFloatRangeOrArrayOfStringOrNumberOrString",
  });
}
export function deserializeMetadataFieldFilterDateRangeOrMetadataFieldFilterFloatRangeOrArrayOfStringOrNumberOrString(
  val: SerializedData,
): MetadataFieldFilterDateRangeOrMetadataFieldFilterFloatRangeOrArrayOfStringOrNumberOrString {
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
    return deserializeMetadataFieldFilterDateRange(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeMetadataFieldFilterFloatRange(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize MetadataFieldFilterDateRangeOrMetadataFieldFilterFloatRangeOrArrayOfStringOrNumberOrString",
  });
}

import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface MetadataFieldFilterDateRange {
  /**
   * Specifies the (inclusive) upper bound for the metadata field
   * value. The value of a field must be lower than (`lt`) or
   * equal to this value for the search query to match this
   * template. */
  readonly lt?: DateTime;
  /**
   * Specifies the (inclusive) lower bound for the metadata field
   * value. The value of a field must be greater than (`gt`) or
   * equal to this value for the search query to match this
   * template. */
  readonly gt?: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeMetadataFieldFilterDateRange(
  val: MetadataFieldFilterDateRange,
): SerializedData {
  return {
    ['lt']: val.lt == void 0 ? val.lt : serializeDateTime(val.lt),
    ['gt']: val.gt == void 0 ? val.gt : serializeDateTime(val.gt),
  };
}
export function deserializeMetadataFieldFilterDateRange(
  val: SerializedData,
): MetadataFieldFilterDateRange {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataFieldFilterDateRange"',
    });
  }
  if (!(val.lt == void 0) && !sdIsString(val.lt)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "lt" of type "MetadataFieldFilterDateRange"',
    });
  }
  const lt: undefined | DateTime =
    val.lt == void 0 ? void 0 : deserializeDateTime(val.lt);
  if (!(val.gt == void 0) && !sdIsString(val.gt)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "gt" of type "MetadataFieldFilterDateRange"',
    });
  }
  const gt: undefined | DateTime =
    val.gt == void 0 ? void 0 : deserializeDateTime(val.gt);
  return { lt: lt, gt: gt } satisfies MetadataFieldFilterDateRange;
}

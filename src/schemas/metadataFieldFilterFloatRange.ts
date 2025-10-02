import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface MetadataFieldFilterFloatRange {
  /**
   * Specifies the (inclusive) upper bound for the metadata field
   * value. The value of a field must be lower than (`lt`) or
   * equal to this value for the search query to match this
   * template. */
  readonly lt?: number;
  /**
   * Specifies the (inclusive) lower bound for the metadata field
   * value. The value of a field must be greater than (`gt`) or
   * equal to this value for the search query to match this
   * template. */
  readonly gt?: number;
  readonly rawData?: SerializedData;
}
export function serializeMetadataFieldFilterFloatRange(
  val: MetadataFieldFilterFloatRange,
): SerializedData {
  return { ['lt']: val.lt, ['gt']: val.gt };
}
export function deserializeMetadataFieldFilterFloatRange(
  val: SerializedData,
): MetadataFieldFilterFloatRange {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataFieldFilterFloatRange"',
    });
  }
  if (!(val.lt == void 0) && !sdIsNumber(val.lt)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "lt" of type "MetadataFieldFilterFloatRange"',
    });
  }
  const lt: undefined | number = val.lt == void 0 ? void 0 : val.lt;
  if (!(val.gt == void 0) && !sdIsNumber(val.gt)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "gt" of type "MetadataFieldFilterFloatRange"',
    });
  }
  const gt: undefined | number = val.gt == void 0 ? void 0 : val.gt;
  return { lt: lt, gt: gt } satisfies MetadataFieldFilterFloatRange;
}

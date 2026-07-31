import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface QueryInsightsGroupByV2026R0 {
  /**
   * The fully qualified field name to group by. Supports metadata and item
   * properties. */
  readonly field: string;
  /**
   * The maximum number of buckets to return for the grouping. Defaults to `5`. */
  readonly bucketLimit?: number;
  readonly rawData?: SerializedData;
}
export function serializeQueryInsightsGroupByV2026R0(
  val: QueryInsightsGroupByV2026R0,
): SerializedData {
  return { ['field']: val.field, ['bucket_limit']: val.bucketLimit };
}
export function deserializeQueryInsightsGroupByV2026R0(
  val: SerializedData,
): QueryInsightsGroupByV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryInsightsGroupByV2026R0"',
    });
  }
  if (val.field == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "field" of type "QueryInsightsGroupByV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.field)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "field" of type "QueryInsightsGroupByV2026R0"',
    });
  }
  const field: string = val.field;
  if (!(val.bucket_limit == void 0) && !sdIsNumber(val.bucket_limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "bucket_limit" of type "QueryInsightsGroupByV2026R0"',
    });
  }
  const bucketLimit: undefined | number =
    val.bucket_limit == void 0 ? void 0 : val.bucket_limit;
  return {
    field: field,
    bucketLimit: bucketLimit,
  } satisfies QueryInsightsGroupByV2026R0;
}

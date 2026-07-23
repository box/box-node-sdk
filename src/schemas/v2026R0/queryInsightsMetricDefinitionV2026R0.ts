import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type QueryInsightsMetricDefinitionV2026R0TypeField =
  'sum' | 'avg' | 'min' | 'max' | 'count';
export interface QueryInsightsMetricDefinitionV2026R0 {
  /**
   * The aggregation function to apply. */
  readonly type: QueryInsightsMetricDefinitionV2026R0TypeField;
  /**
   * The fully qualified field name on which the metric is computed. */
  readonly field: string;
  readonly rawData?: SerializedData;
}
export function serializeQueryInsightsMetricDefinitionV2026R0TypeField(
  val: QueryInsightsMetricDefinitionV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeQueryInsightsMetricDefinitionV2026R0TypeField(
  val: SerializedData,
): QueryInsightsMetricDefinitionV2026R0TypeField {
  if (val == 'sum') {
    return val;
  }
  if (val == 'avg') {
    return val;
  }
  if (val == 'min') {
    return val;
  }
  if (val == 'max') {
    return val;
  }
  if (val == 'count') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize QueryInsightsMetricDefinitionV2026R0TypeField",
  });
}
export function serializeQueryInsightsMetricDefinitionV2026R0(
  val: QueryInsightsMetricDefinitionV2026R0,
): SerializedData {
  return {
    ['type']: serializeQueryInsightsMetricDefinitionV2026R0TypeField(val.type),
    ['field']: val.field,
  };
}
export function deserializeQueryInsightsMetricDefinitionV2026R0(
  val: SerializedData,
): QueryInsightsMetricDefinitionV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryInsightsMetricDefinitionV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "QueryInsightsMetricDefinitionV2026R0" to be defined',
    });
  }
  const type: QueryInsightsMetricDefinitionV2026R0TypeField =
    deserializeQueryInsightsMetricDefinitionV2026R0TypeField(val.type);
  if (val.field == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "field" of type "QueryInsightsMetricDefinitionV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.field)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "field" of type "QueryInsightsMetricDefinitionV2026R0"',
    });
  }
  const field: string = val.field;
  return {
    type: type,
    field: field,
  } satisfies QueryInsightsMetricDefinitionV2026R0;
}

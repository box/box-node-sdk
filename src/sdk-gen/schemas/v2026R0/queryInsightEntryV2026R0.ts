import { serializeQueryInsightMetricResultV2026R0 } from './queryInsightMetricResultV2026R0';
import { deserializeQueryInsightMetricResultV2026R0 } from './queryInsightMetricResultV2026R0';
import { QueryInsightMetricResultV2026R0 } from './queryInsightMetricResultV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type QueryInsightEntryV2026R0TypeField = 'group' | 'overall' | 'other';
export interface QueryInsightEntryV2026R0 {
  /**
   * The grouping key values associated with the entry. Contains one value per
   * `group_by` field for `group` entries, and is empty for `overall` and
   * `other` entries. */
  readonly key: readonly string[];
  /**
   * The type of insight entry, indicating how the associated metrics are
   * aggregated. */
  readonly type: QueryInsightEntryV2026R0TypeField;
  /**
   * A map of metric aliases to their computed results. For `other` entries, the
   * count is reported under the `totalCountBeyondTopGroups` key. */
  readonly metrics: {
    readonly [key: string]: QueryInsightMetricResultV2026R0;
  };
  readonly rawData?: SerializedData;
}
export function serializeQueryInsightEntryV2026R0TypeField(
  val: QueryInsightEntryV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeQueryInsightEntryV2026R0TypeField(
  val: SerializedData
): QueryInsightEntryV2026R0TypeField {
  if (val == 'group') {
    return val;
  }
  if (val == 'overall') {
    return val;
  }
  if (val == 'other') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize QueryInsightEntryV2026R0TypeField",
  });
}
export function serializeQueryInsightEntryV2026R0(
  val: QueryInsightEntryV2026R0
): SerializedData {
  return {
    ['key']: val.key.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
    ['type']: serializeQueryInsightEntryV2026R0TypeField(val.type),
    ['metrics']: Object.fromEntries(
      Object.entries(val.metrics).map(([k, v]: [string, any]) => [
        k,
        serializeQueryInsightMetricResultV2026R0(v),
      ])
    ) as {
      readonly [key: string]: any;
    },
  };
}
export function deserializeQueryInsightEntryV2026R0(
  val: SerializedData
): QueryInsightEntryV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryInsightEntryV2026R0"',
    });
  }
  if (val.key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "key" of type "QueryInsightEntryV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.key)) {
    throw new BoxSdkError({
      message: 'Expecting array for "key" of type "QueryInsightEntryV2026R0"',
    });
  }
  const key: readonly string[] = sdIsList(val.key)
    ? (val.key.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "QueryInsightEntryV2026R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "QueryInsightEntryV2026R0" to be defined',
    });
  }
  const type: QueryInsightEntryV2026R0TypeField =
    deserializeQueryInsightEntryV2026R0TypeField(val.type);
  if (val.metrics == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "metrics" of type "QueryInsightEntryV2026R0" to be defined',
    });
  }
  if (!sdIsMap(val.metrics)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "metrics" of type "QueryInsightEntryV2026R0"',
    });
  }
  const metrics: {
    readonly [key: string]: QueryInsightMetricResultV2026R0;
  } = sdIsMap(val.metrics)
    ? (Object.fromEntries(
        Object.entries(val.metrics).map(([k, v]: [string, any]) => [
          k,
          deserializeQueryInsightMetricResultV2026R0(v),
        ])
      ) as {
        readonly [key: string]: any;
      })
    : {};
  return {
    key: key,
    type: type,
    metrics: metrics,
  } satisfies QueryInsightEntryV2026R0;
}

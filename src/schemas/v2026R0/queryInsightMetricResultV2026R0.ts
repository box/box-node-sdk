import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface QueryInsightMetricResultV2026R0 {
  /**
   * The metric type that was computed. */
  readonly type: string;
  /**
   * The computed metric result(s), keyed by the metric function (for example
   * `sum`, `avg`, `min`, `max`, or `count`). */
  readonly values: {
    readonly [key: string]: number;
  };
  readonly rawData?: SerializedData;
}
export function serializeQueryInsightMetricResultV2026R0(
  val: QueryInsightMetricResultV2026R0,
): SerializedData {
  return { ['type']: val.type, ['values']: val.values };
}
export function deserializeQueryInsightMetricResultV2026R0(
  val: SerializedData,
): QueryInsightMetricResultV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryInsightMetricResultV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "QueryInsightMetricResultV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "QueryInsightMetricResultV2026R0"',
    });
  }
  const type: string = val.type;
  if (val.values == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "values" of type "QueryInsightMetricResultV2026R0" to be defined',
    });
  }
  if (!sdIsMap(val.values)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "values" of type "QueryInsightMetricResultV2026R0"',
    });
  }
  const values: {
    readonly [key: string]: number;
  } = sdIsMap(val.values)
    ? (Object.fromEntries(
        Object.entries(val.values).map(([k, v]: [string, any]) => [
          k,
          (function (v: any): any {
            if (!sdIsNumber(v)) {
              throw new BoxSdkError({
                message:
                  'Expecting number for "QueryInsightMetricResultV2026R0"',
              });
            }
            return v;
          })(v),
        ]),
      ) as {
        readonly [key: string]: any;
      })
    : {};
  return {
    type: type,
    values: values,
  } satisfies QueryInsightMetricResultV2026R0;
}

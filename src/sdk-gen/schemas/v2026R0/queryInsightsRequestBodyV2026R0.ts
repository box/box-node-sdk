import { serializeQueryAncestorReferenceV2026R0 } from './queryAncestorReferenceV2026R0';
import { deserializeQueryAncestorReferenceV2026R0 } from './queryAncestorReferenceV2026R0';
import { serializeQueryInsightsGroupByV2026R0 } from './queryInsightsGroupByV2026R0';
import { deserializeQueryInsightsGroupByV2026R0 } from './queryInsightsGroupByV2026R0';
import { serializeQueryInsightsMetricDefinitionV2026R0 } from './queryInsightsMetricDefinitionV2026R0';
import { deserializeQueryInsightsMetricDefinitionV2026R0 } from './queryInsightsMetricDefinitionV2026R0';
import { QueryAncestorReferenceV2026R0 } from './queryAncestorReferenceV2026R0';
import { QueryInsightsGroupByV2026R0 } from './queryInsightsGroupByV2026R0';
import { QueryInsightsMetricDefinitionV2026R0 } from './queryInsightsMetricDefinitionV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface QueryInsightsRequestBodyV2026R0QueryField {
  /**
   * A logical expression used to filter the dataset prior to metric
   * computation, similar to an SQL `WHERE` clause. May include
   * named parameters referenced as `:placeholder`. */
  readonly predicate: string;
  /**
   * A map of placeholder names (without the `:` prefix) to their values.
   * Required only when the predicate contains parameter placeholders. The
   * type of each value must match the type of the field it is compared to. */
  readonly params?: {
    readonly [key: string]: any;
  };
  /**
   * Restricts results to items contained within any of the specified
   * ancestors. The user must have access to every listed ancestor. When
   * omitted, insights are computed across all accessible items. */
  readonly ancestors?: readonly QueryAncestorReferenceV2026R0[];
  /**
   * Defines how data is grouped for insights computation. Currently only a
   * single grouping field is supported. */
  readonly groupBy?: readonly QueryInsightsGroupByV2026R0[];
  readonly rawData?: SerializedData;
}
export interface QueryInsightsRequestBodyV2026R0 {
  /**
   * The filtering and grouping definition. Filters are applied first, followed
   * by grouping, before metrics are computed. */
  readonly query: QueryInsightsRequestBodyV2026R0QueryField;
  /**
   * A map of user-defined metric aliases to their definitions. A maximum of 10
   * metrics may be defined. Each alias must be a unique, non-empty string of up
   * to 256 characters, containing only letters, digits, `_`, `-`, or `.`, and
   * must not start with a digit, `_`, `-`, or `.`. May be empty to request
   * only a total count. */
  readonly metrics: {
    readonly [key: string]: QueryInsightsMetricDefinitionV2026R0;
  };
  readonly rawData?: SerializedData;
}
export function serializeQueryInsightsRequestBodyV2026R0QueryField(
  val: QueryInsightsRequestBodyV2026R0QueryField
): SerializedData {
  return {
    ['predicate']: val.predicate,
    ['params']:
      val.params == void 0
        ? val.params
        : (Object.fromEntries(
            Object.entries(val.params).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ])
          ) as {
            readonly [key: string]: any;
          }),
    ['ancestors']:
      val.ancestors == void 0
        ? val.ancestors
        : (val.ancestors.map(function (
            item: QueryAncestorReferenceV2026R0
          ): SerializedData {
            return serializeQueryAncestorReferenceV2026R0(item);
          }) as readonly any[]),
    ['group_by']:
      val.groupBy == void 0
        ? val.groupBy
        : (val.groupBy.map(function (
            item: QueryInsightsGroupByV2026R0
          ): SerializedData {
            return serializeQueryInsightsGroupByV2026R0(item);
          }) as readonly any[]),
  };
}
export function deserializeQueryInsightsRequestBodyV2026R0QueryField(
  val: SerializedData
): QueryInsightsRequestBodyV2026R0QueryField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "QueryInsightsRequestBodyV2026R0QueryField"',
    });
  }
  if (val.predicate == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "predicate" of type "QueryInsightsRequestBodyV2026R0QueryField" to be defined',
    });
  }
  if (!sdIsString(val.predicate)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "predicate" of type "QueryInsightsRequestBodyV2026R0QueryField"',
    });
  }
  const predicate: string = val.predicate;
  if (!(val.params == void 0) && !sdIsMap(val.params)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "params" of type "QueryInsightsRequestBodyV2026R0QueryField"',
    });
  }
  const params:
    | undefined
    | {
        readonly [key: string]: any;
      } =
    val.params == void 0
      ? void 0
      : sdIsMap(val.params)
        ? (Object.fromEntries(
            Object.entries(val.params).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ])
          ) as {
            readonly [key: string]: any;
          })
        : {};
  if (!(val.ancestors == void 0) && !sdIsList(val.ancestors)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "ancestors" of type "QueryInsightsRequestBodyV2026R0QueryField"',
    });
  }
  const ancestors: undefined | readonly QueryAncestorReferenceV2026R0[] =
    val.ancestors == void 0
      ? void 0
      : sdIsList(val.ancestors)
        ? (val.ancestors.map(function (
            itm: SerializedData
          ): QueryAncestorReferenceV2026R0 {
            return deserializeQueryAncestorReferenceV2026R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.group_by == void 0) && !sdIsList(val.group_by)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "group_by" of type "QueryInsightsRequestBodyV2026R0QueryField"',
    });
  }
  const groupBy: undefined | readonly QueryInsightsGroupByV2026R0[] =
    val.group_by == void 0
      ? void 0
      : sdIsList(val.group_by)
        ? (val.group_by.map(function (
            itm: SerializedData
          ): QueryInsightsGroupByV2026R0 {
            return deserializeQueryInsightsGroupByV2026R0(itm);
          }) as readonly any[])
        : [];
  return {
    predicate: predicate,
    params: params,
    ancestors: ancestors,
    groupBy: groupBy,
  } satisfies QueryInsightsRequestBodyV2026R0QueryField;
}
export function serializeQueryInsightsRequestBodyV2026R0(
  val: QueryInsightsRequestBodyV2026R0
): SerializedData {
  return {
    ['query']: serializeQueryInsightsRequestBodyV2026R0QueryField(val.query),
    ['metrics']: Object.fromEntries(
      Object.entries(val.metrics).map(([k, v]: [string, any]) => [
        k,
        serializeQueryInsightsMetricDefinitionV2026R0(v),
      ])
    ) as {
      readonly [key: string]: any;
    },
  };
}
export function deserializeQueryInsightsRequestBodyV2026R0(
  val: SerializedData
): QueryInsightsRequestBodyV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryInsightsRequestBodyV2026R0"',
    });
  }
  if (val.query == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "query" of type "QueryInsightsRequestBodyV2026R0" to be defined',
    });
  }
  const query: QueryInsightsRequestBodyV2026R0QueryField =
    deserializeQueryInsightsRequestBodyV2026R0QueryField(val.query);
  if (val.metrics == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "metrics" of type "QueryInsightsRequestBodyV2026R0" to be defined',
    });
  }
  if (!sdIsMap(val.metrics)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "metrics" of type "QueryInsightsRequestBodyV2026R0"',
    });
  }
  const metrics: {
    readonly [key: string]: QueryInsightsMetricDefinitionV2026R0;
  } = sdIsMap(val.metrics)
    ? (Object.fromEntries(
        Object.entries(val.metrics).map(([k, v]: [string, any]) => [
          k,
          deserializeQueryInsightsMetricDefinitionV2026R0(v),
        ])
      ) as {
        readonly [key: string]: any;
      })
    : {};
  return {
    query: query,
    metrics: metrics,
  } satisfies QueryInsightsRequestBodyV2026R0;
}

import { serializeQueryAncestorReferenceV2026R0 } from './queryAncestorReferenceV2026R0';
import { deserializeQueryAncestorReferenceV2026R0 } from './queryAncestorReferenceV2026R0';
import { serializeQueryOrderByV2026R0 } from './queryOrderByV2026R0';
import { deserializeQueryOrderByV2026R0 } from './queryOrderByV2026R0';
import { QueryAncestorReferenceV2026R0 } from './queryAncestorReferenceV2026R0';
import { QueryOrderByV2026R0 } from './queryOrderByV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface QueryRequestBodyV2026R0QueryField {
  /**
   * A logical expression used to filter the dataset, similar to an SQL
   * `WHERE` clause. May include named parameters referenced as
   * `:placeholder`. */
  readonly predicate: string;
  /**
   * A map of placeholder names (without the `:` prefix) to their values.
   * Required only when the predicate contains parameter placeholders. The
   * type of each value must match the type of the field it is compared to. */
  readonly params?: {
    readonly [key: string]: any;
  };
  /**
   * Restricts results to the specified ancestor entities and their
   * recursive descendants. The user must have read access to every listed
   * ancestor. */
  readonly ancestors?: readonly QueryAncestorReferenceV2026R0[];
  readonly rawData?: SerializedData;
}
export interface QueryRequestBodyV2026R0 {
  /**
   * The query definition, including the filtering predicate and its optional
   * parameters and ancestor restrictions. */
  readonly query: QueryRequestBodyV2026R0QueryField;
  /**
   * The sorting criteria for the result set. Entries are applied sequentially
   * to define multi-level sorting. */
  readonly orderBy?: readonly QueryOrderByV2026R0[];
  /**
   * The maximum number of results to return. Defaults to `50` when not
   * provided. */
  readonly limit?: number;
  /**
   * Controls which additional fields are included in each result entry. Each
   * value must be one of: a fully qualified item field key (for example
   * `box:item:name`), a metadata template key to hydrate the full template (for
   * example `enterprise_12345678:project`), or a specific metadata template
   * field key to hydrate a single field from the template (for example
   * `enterprise_12345678:project:name`). When omitted, entries include only the
   * item type and identifier. */
  readonly fields?: readonly string[];
  /**
   * An opaque token returned from a previous response, used to continue
   * retrieval. When provided, all other request parameters must exactly match
   * those of the original request. */
  readonly marker?: string;
  readonly rawData?: SerializedData;
}
export function serializeQueryRequestBodyV2026R0QueryField(
  val: QueryRequestBodyV2026R0QueryField
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
  };
}
export function deserializeQueryRequestBodyV2026R0QueryField(
  val: SerializedData
): QueryRequestBodyV2026R0QueryField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryRequestBodyV2026R0QueryField"',
    });
  }
  if (val.predicate == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "predicate" of type "QueryRequestBodyV2026R0QueryField" to be defined',
    });
  }
  if (!sdIsString(val.predicate)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "predicate" of type "QueryRequestBodyV2026R0QueryField"',
    });
  }
  const predicate: string = val.predicate;
  if (!(val.params == void 0) && !sdIsMap(val.params)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "params" of type "QueryRequestBodyV2026R0QueryField"',
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
        'Expecting array for "ancestors" of type "QueryRequestBodyV2026R0QueryField"',
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
  return {
    predicate: predicate,
    params: params,
    ancestors: ancestors,
  } satisfies QueryRequestBodyV2026R0QueryField;
}
export function serializeQueryRequestBodyV2026R0(
  val: QueryRequestBodyV2026R0
): SerializedData {
  return {
    ['query']: serializeQueryRequestBodyV2026R0QueryField(val.query),
    ['order_by']:
      val.orderBy == void 0
        ? val.orderBy
        : (val.orderBy.map(function (
            item: QueryOrderByV2026R0
          ): SerializedData {
            return serializeQueryOrderByV2026R0(item);
          }) as readonly any[]),
    ['limit']: val.limit,
    ['fields']:
      val.fields == void 0
        ? val.fields
        : (val.fields.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['marker']: val.marker,
  };
}
export function deserializeQueryRequestBodyV2026R0(
  val: SerializedData
): QueryRequestBodyV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryRequestBodyV2026R0"',
    });
  }
  if (val.query == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "query" of type "QueryRequestBodyV2026R0" to be defined',
    });
  }
  const query: QueryRequestBodyV2026R0QueryField =
    deserializeQueryRequestBodyV2026R0QueryField(val.query);
  if (!(val.order_by == void 0) && !sdIsList(val.order_by)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "order_by" of type "QueryRequestBodyV2026R0"',
    });
  }
  const orderBy: undefined | readonly QueryOrderByV2026R0[] =
    val.order_by == void 0
      ? void 0
      : sdIsList(val.order_by)
        ? (val.order_by.map(function (
            itm: SerializedData
          ): QueryOrderByV2026R0 {
            return deserializeQueryOrderByV2026R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "QueryRequestBodyV2026R0"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.fields == void 0) && !sdIsList(val.fields)) {
    throw new BoxSdkError({
      message: 'Expecting array for "fields" of type "QueryRequestBodyV2026R0"',
    });
  }
  const fields: undefined | readonly string[] =
    val.fields == void 0
      ? void 0
      : sdIsList(val.fields)
        ? (val.fields.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "QueryRequestBodyV2026R0"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (!(val.marker == void 0) && !sdIsString(val.marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "marker" of type "QueryRequestBodyV2026R0"',
    });
  }
  const marker: undefined | string = val.marker == void 0 ? void 0 : val.marker;
  return {
    query: query,
    orderBy: orderBy,
    limit: limit,
    fields: fields,
    marker: marker,
  } satisfies QueryRequestBodyV2026R0;
}

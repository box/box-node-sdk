import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type MetadataQueryOrderByDirectionField = 'ASC' | 'DESC' | string;
export interface MetadataQueryOrderByField {
  /**
   * The metadata template field to order by.
   *
   * The `field_key` represents the `key` value of a field from the
   * metadata template being searched for. */
  readonly fieldKey?: string;
  /**
   * The direction to order by, either ascending or descending.
   *
   * The `ordering` direction must be the same for each item in the
   * array. */
  readonly direction?: MetadataQueryOrderByDirectionField;
  readonly rawData?: SerializedData;
}
export interface MetadataQuery {
  /**
   * Specifies the template used in the query. Must be in the form
   * `scope.templateKey`. Not all templates can be used in this field,
   * most notably the built-in, Box-provided classification templates
   * can not be used in a query. */
  readonly from: string;
  /**
   * The query to perform. A query is a logical expression that is very similar
   * to a SQL `SELECT` statement. Values in the search query can be turned into
   * parameters specified in the `query_param` arguments list to prevent having
   * to manually insert search values into the query string.
   *
   * For example, a value of `:amount` would represent the `amount` value in
   * `query_params` object. */
  readonly query?: string;
  /**
   * Set of arguments corresponding to the parameters specified in the
   * `query`. The type of each parameter used in the `query_params` must match
   * the type of the corresponding metadata template field. */
  readonly queryParams?: {
    readonly [key: string]: any;
  };
  /**
   * The ID of the folder that you are restricting the query to. A
   * value of zero will return results from all folders you have access
   * to. A non-zero value will only return results found in the folder
   * corresponding to the ID or in any of its subfolders. */
  readonly ancestorFolderId: string;
  /**
   * A list of template fields and directions to sort the metadata query
   * results by.
   *
   * The ordering `direction` must be the same for each item in the array. */
  readonly orderBy?: readonly MetadataQueryOrderByField[];
  /**
   * A value between 0 and 100 that indicates the maximum number of results
   * to return for a single request. This only specifies a maximum
   * boundary and will not guarantee the minimum number of results
   * returned. */
  readonly limit?: number;
  /**
   * Marker to use for requesting the next page. */
  readonly marker?: string;
  /**
   * By default, this endpoint returns only the most basic info about the items for
   * which the query matches. This attribute can be used to specify a list of
   * additional attributes to return for any item, including its metadata.
   *
   * This attribute takes a list of item fields, metadata template identifiers,
   * or metadata template field identifiers.
   *
   * For example:
   *
   * * `created_by` will add the details of the user who created the item to
   * the response.
   * * `metadata.<scope>.<templateKey>` will return the mini-representation
   * of the metadata instance identified by the `scope` and `templateKey`.
   * * `metadata.<scope>.<templateKey>.<field>` will return all the mini-representation
   * of the metadata instance identified by the `scope` and `templateKey` plus
   * the field specified by the `field` name. Multiple fields for the same
   * `scope` and `templateKey` can be defined. */
  readonly fields?: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeMetadataQueryOrderByDirectionField(
  val: MetadataQueryOrderByDirectionField,
): SerializedData {
  return val;
}
export function deserializeMetadataQueryOrderByDirectionField(
  val: SerializedData,
): MetadataQueryOrderByDirectionField {
  if (val == 'ASC') {
    return val;
  }
  if (val == 'DESC') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize MetadataQueryOrderByDirectionField",
  });
}
export function serializeMetadataQueryOrderByField(
  val: MetadataQueryOrderByField,
): SerializedData {
  return {
    ['field_key']: val.fieldKey,
    ['direction']:
      val.direction == void 0
        ? val.direction
        : serializeMetadataQueryOrderByDirectionField(val.direction),
  };
}
export function deserializeMetadataQueryOrderByField(
  val: SerializedData,
): MetadataQueryOrderByField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "MetadataQueryOrderByField"',
    });
  }
  if (!(val.field_key == void 0) && !sdIsString(val.field_key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "field_key" of type "MetadataQueryOrderByField"',
    });
  }
  const fieldKey: undefined | string =
    val.field_key == void 0 ? void 0 : val.field_key;
  const direction: undefined | MetadataQueryOrderByDirectionField =
    val.direction == void 0
      ? void 0
      : deserializeMetadataQueryOrderByDirectionField(val.direction);
  return {
    fieldKey: fieldKey,
    direction: direction,
  } satisfies MetadataQueryOrderByField;
}
export function serializeMetadataQuery(val: MetadataQuery): SerializedData {
  return {
    ['from']: val.from,
    ['query']: val.query,
    ['query_params']:
      val.queryParams == void 0
        ? val.queryParams
        : (Object.fromEntries(
            Object.entries(val.queryParams).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ]),
          ) as {
            readonly [key: string]: any;
          }),
    ['ancestor_folder_id']: val.ancestorFolderId,
    ['order_by']:
      val.orderBy == void 0
        ? val.orderBy
        : (val.orderBy.map(function (
            item: MetadataQueryOrderByField,
          ): SerializedData {
            return serializeMetadataQueryOrderByField(item);
          }) as readonly any[]),
    ['limit']: val.limit,
    ['marker']: val.marker,
    ['fields']:
      val.fields == void 0
        ? val.fields
        : (val.fields.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
  };
}
export function deserializeMetadataQuery(val: SerializedData): MetadataQuery {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "MetadataQuery"' });
  }
  if (val.from == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "from" of type "MetadataQuery" to be defined',
    });
  }
  if (!sdIsString(val.from)) {
    throw new BoxSdkError({
      message: 'Expecting string for "from" of type "MetadataQuery"',
    });
  }
  const from: string = val.from;
  if (!(val.query == void 0) && !sdIsString(val.query)) {
    throw new BoxSdkError({
      message: 'Expecting string for "query" of type "MetadataQuery"',
    });
  }
  const query: undefined | string = val.query == void 0 ? void 0 : val.query;
  if (!(val.query_params == void 0) && !sdIsMap(val.query_params)) {
    throw new BoxSdkError({
      message: 'Expecting object for "query_params" of type "MetadataQuery"',
    });
  }
  const queryParams:
    | undefined
    | {
        readonly [key: string]: any;
      } =
    val.query_params == void 0
      ? void 0
      : sdIsMap(val.query_params)
        ? (Object.fromEntries(
            Object.entries(val.query_params).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ]),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  if (val.ancestor_folder_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "ancestor_folder_id" of type "MetadataQuery" to be defined',
    });
  }
  if (!sdIsString(val.ancestor_folder_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "ancestor_folder_id" of type "MetadataQuery"',
    });
  }
  const ancestorFolderId: string = val.ancestor_folder_id;
  if (!(val.order_by == void 0) && !sdIsList(val.order_by)) {
    throw new BoxSdkError({
      message: 'Expecting array for "order_by" of type "MetadataQuery"',
    });
  }
  const orderBy: undefined | readonly MetadataQueryOrderByField[] =
    val.order_by == void 0
      ? void 0
      : sdIsList(val.order_by)
        ? (val.order_by.map(function (
            itm: SerializedData,
          ): MetadataQueryOrderByField {
            return deserializeMetadataQueryOrderByField(itm);
          }) as readonly any[])
        : [];
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "MetadataQuery"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.marker == void 0) && !sdIsString(val.marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "marker" of type "MetadataQuery"',
    });
  }
  const marker: undefined | string = val.marker == void 0 ? void 0 : val.marker;
  if (!(val.fields == void 0) && !sdIsList(val.fields)) {
    throw new BoxSdkError({
      message: 'Expecting array for "fields" of type "MetadataQuery"',
    });
  }
  const fields: undefined | readonly string[] =
    val.fields == void 0
      ? void 0
      : sdIsList(val.fields)
        ? (val.fields.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "MetadataQuery"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  return {
    from: from,
    query: query,
    queryParams: queryParams,
    ancestorFolderId: ancestorFolderId,
    orderBy: orderBy,
    limit: limit,
    marker: marker,
    fields: fields,
  } satisfies MetadataQuery;
}

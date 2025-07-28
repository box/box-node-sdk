import { serializeCollection } from './collection.generated.js';
import { deserializeCollection } from './collection.generated.js';
import { Collection } from './collection.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type CollectionsOrderDirectionField = 'ASC' | 'DESC' | string;
export interface CollectionsOrderField {
  /**
   * The field to order by. */
  readonly by?: string;
  /**
   * The direction to order by, either ascending or descending. */
  readonly direction?: CollectionsOrderDirectionField;
  readonly rawData?: SerializedData;
}
export interface Collections {
  /**
   * One greater than the offset of the last entry in the entire collection.
   * The total number of entries in the collection may be less than
   * `total_count`.
   *
   * This field is only returned for calls that use offset-based pagination.
   * For marker-based paginated APIs, this field will be omitted. */
  readonly totalCount?: number;
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The 0-based offset of the first entry in this set. This will be the same
   * as the `offset` query parameter.
   *
   * This field is only returned for calls that use offset-based pagination.
   * For marker-based paginated APIs, this field will be omitted. */
  readonly offset?: number;
  /**
   * The order by which items are returned.
   *
   * This field is only returned for calls that use offset-based pagination.
   * For marker-based paginated APIs, this field will be omitted. */
  readonly order?: readonly CollectionsOrderField[];
  /**
   * A list of collections. */
  readonly entries?: readonly Collection[];
  readonly rawData?: SerializedData;
}
export function serializeCollectionsOrderDirectionField(
  val: CollectionsOrderDirectionField,
): SerializedData {
  return val;
}
export function deserializeCollectionsOrderDirectionField(
  val: SerializedData,
): CollectionsOrderDirectionField {
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
    message: "Can't deserialize CollectionsOrderDirectionField",
  });
}
export function serializeCollectionsOrderField(
  val: CollectionsOrderField,
): SerializedData {
  return {
    ['by']: val.by,
    ['direction']:
      val.direction == void 0
        ? val.direction
        : serializeCollectionsOrderDirectionField(val.direction),
  };
}
export function deserializeCollectionsOrderField(
  val: SerializedData,
): CollectionsOrderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CollectionsOrderField"',
    });
  }
  if (!(val.by == void 0) && !sdIsString(val.by)) {
    throw new BoxSdkError({
      message: 'Expecting string for "by" of type "CollectionsOrderField"',
    });
  }
  const by: undefined | string = val.by == void 0 ? void 0 : val.by;
  const direction: undefined | CollectionsOrderDirectionField =
    val.direction == void 0
      ? void 0
      : deserializeCollectionsOrderDirectionField(val.direction);
  return { by: by, direction: direction } satisfies CollectionsOrderField;
}
export function serializeCollections(val: Collections): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['limit']: val.limit,
    ['offset']: val.offset,
    ['order']:
      val.order == void 0
        ? val.order
        : (val.order.map(function (
            item: CollectionsOrderField,
          ): SerializedData {
            return serializeCollectionsOrderField(item);
          }) as readonly any[]),
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: Collection): SerializedData {
            return serializeCollection(item);
          }) as readonly any[]),
  };
}
export function deserializeCollections(val: SerializedData): Collections {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Collections"' });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "Collections"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "Collections"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "Collections"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  if (!(val.order == void 0) && !sdIsList(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting array for "order" of type "Collections"',
    });
  }
  const order: undefined | readonly CollectionsOrderField[] =
    val.order == void 0
      ? void 0
      : sdIsList(val.order)
        ? (val.order.map(function (itm: SerializedData): CollectionsOrderField {
            return deserializeCollectionsOrderField(itm);
          }) as readonly any[])
        : [];
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Collections"',
    });
  }
  const entries: undefined | readonly Collection[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): Collection {
            return deserializeCollection(itm);
          }) as readonly any[])
        : [];
  return {
    totalCount: totalCount,
    limit: limit,
    offset: offset,
    order: order,
    entries: entries,
  } satisfies Collections;
}

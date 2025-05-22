import { serializeFileFullOrFolderMiniOrWebLink } from './fileFullOrFolderMiniOrWebLink.generated.js';
import { deserializeFileFullOrFolderMiniOrWebLink } from './fileFullOrFolderMiniOrWebLink.generated.js';
import { FileFullOrFolderMiniOrWebLink } from './fileFullOrFolderMiniOrWebLink.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ItemsOrderDirectionField = 'ASC' | 'DESC' | string;
export interface ItemsOrderField {
  /**
   * The field to order by */
  readonly by?: string;
  /**
   * The direction to order by, either ascending or descending */
  readonly direction?: ItemsOrderDirectionField;
  readonly rawData?: SerializedData;
}
export interface Items {
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  /**
   * The marker for the start of the previous page of results. */
  readonly prevMarker?: string | null;
  /**
   * One greater than the offset of the last entry in the entire collection.
   * The total number of entries in the collection may be less than
   * `total_count`.
   *
   * This field is only returned for calls that use offset-based pagination.
   * For marker-based paginated APIs, this field will be omitted. */
  readonly totalCount?: number;
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
  readonly order?: readonly ItemsOrderField[];
  /**
   * The items in this collection. */
  readonly entries?: readonly FileFullOrFolderMiniOrWebLink[];
  readonly rawData?: SerializedData;
}
export function serializeItemsOrderDirectionField(
  val: ItemsOrderDirectionField,
): SerializedData {
  return val;
}
export function deserializeItemsOrderDirectionField(
  val: SerializedData,
): ItemsOrderDirectionField {
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
    message: "Can't deserialize ItemsOrderDirectionField",
  });
}
export function serializeItemsOrderField(val: ItemsOrderField): SerializedData {
  return {
    ['by']: val.by,
    ['direction']:
      val.direction == void 0
        ? val.direction
        : serializeItemsOrderDirectionField(val.direction),
  };
}
export function deserializeItemsOrderField(
  val: SerializedData,
): ItemsOrderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "ItemsOrderField"' });
  }
  if (!(val.by == void 0) && !sdIsString(val.by)) {
    throw new BoxSdkError({
      message: 'Expecting string for "by" of type "ItemsOrderField"',
    });
  }
  const by: undefined | string = val.by == void 0 ? void 0 : val.by;
  const direction: undefined | ItemsOrderDirectionField =
    val.direction == void 0
      ? void 0
      : deserializeItemsOrderDirectionField(val.direction);
  return { by: by, direction: direction } satisfies ItemsOrderField;
}
export function serializeItems(val: Items): SerializedData {
  return {
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['prev_marker']: val.prevMarker,
    ['total_count']: val.totalCount,
    ['offset']: val.offset,
    ['order']:
      val.order == void 0
        ? val.order
        : (val.order.map(function (item: ItemsOrderField): SerializedData {
            return serializeItemsOrderField(item);
          }) as readonly any[]),
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: FileFullOrFolderMiniOrWebLink,
          ): SerializedData {
            return serializeFileFullOrFolderMiniOrWebLink(item);
          }) as readonly any[]),
  };
}
export function deserializeItems(val: SerializedData): Items {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Items"' });
  }
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "Items"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "next_marker" of type "Items"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.prev_marker == void 0) && !sdIsString(val.prev_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "prev_marker" of type "Items"',
    });
  }
  const prevMarker: undefined | string =
    val.prev_marker == void 0 ? void 0 : val.prev_marker;
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "Items"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "Items"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  if (!(val.order == void 0) && !sdIsList(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting array for "order" of type "Items"',
    });
  }
  const order: undefined | readonly ItemsOrderField[] =
    val.order == void 0
      ? void 0
      : sdIsList(val.order)
        ? (val.order.map(function (itm: SerializedData): ItemsOrderField {
            return deserializeItemsOrderField(itm);
          }) as readonly any[])
        : [];
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Items"',
    });
  }
  const entries: undefined | readonly FileFullOrFolderMiniOrWebLink[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): FileFullOrFolderMiniOrWebLink {
            return deserializeFileFullOrFolderMiniOrWebLink(itm);
          }) as readonly any[])
        : [];
  return {
    limit: limit,
    nextMarker: nextMarker,
    prevMarker: prevMarker,
    totalCount: totalCount,
    offset: offset,
    order: order,
    entries: entries,
  } satisfies Items;
}

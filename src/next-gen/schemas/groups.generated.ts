import { serializeGroupFull } from './groupFull.generated.js';
import { deserializeGroupFull } from './groupFull.generated.js';
import { GroupFull } from './groupFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type GroupsOrderDirectionField = 'ASC' | 'DESC' | string;
export interface GroupsOrderField {
  /**
   * The field to order by */
  readonly by?: string;
  /**
   * The direction to order by, either ascending or descending */
  readonly direction?: GroupsOrderDirectionField;
  readonly rawData?: SerializedData;
}
export interface Groups {
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
  readonly order?: readonly GroupsOrderField[];
  /**
   * A list of groups */
  readonly entries?: readonly GroupFull[];
  readonly rawData?: SerializedData;
}
export function serializeGroupsOrderDirectionField(
  val: GroupsOrderDirectionField,
): SerializedData {
  return val;
}
export function deserializeGroupsOrderDirectionField(
  val: SerializedData,
): GroupsOrderDirectionField {
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
    message: "Can't deserialize GroupsOrderDirectionField",
  });
}
export function serializeGroupsOrderField(
  val: GroupsOrderField,
): SerializedData {
  return {
    ['by']: val.by,
    ['direction']:
      val.direction == void 0
        ? val.direction
        : serializeGroupsOrderDirectionField(val.direction),
  };
}
export function deserializeGroupsOrderField(
  val: SerializedData,
): GroupsOrderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "GroupsOrderField"',
    });
  }
  if (!(val.by == void 0) && !sdIsString(val.by)) {
    throw new BoxSdkError({
      message: 'Expecting string for "by" of type "GroupsOrderField"',
    });
  }
  const by: undefined | string = val.by == void 0 ? void 0 : val.by;
  const direction: undefined | GroupsOrderDirectionField =
    val.direction == void 0
      ? void 0
      : deserializeGroupsOrderDirectionField(val.direction);
  return { by: by, direction: direction } satisfies GroupsOrderField;
}
export function serializeGroups(val: Groups): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['limit']: val.limit,
    ['offset']: val.offset,
    ['order']:
      val.order == void 0
        ? val.order
        : (val.order.map(function (item: GroupsOrderField): SerializedData {
            return serializeGroupsOrderField(item);
          }) as readonly any[]),
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: GroupFull): SerializedData {
            return serializeGroupFull(item);
          }) as readonly any[]),
  };
}
export function deserializeGroups(val: SerializedData): Groups {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Groups"' });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "Groups"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "Groups"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "Groups"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  if (!(val.order == void 0) && !sdIsList(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting array for "order" of type "Groups"',
    });
  }
  const order: undefined | readonly GroupsOrderField[] =
    val.order == void 0
      ? void 0
      : sdIsList(val.order)
        ? (val.order.map(function (itm: SerializedData): GroupsOrderField {
            return deserializeGroupsOrderField(itm);
          }) as readonly any[])
        : [];
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Groups"',
    });
  }
  const entries: undefined | readonly GroupFull[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): GroupFull {
            return deserializeGroupFull(itm);
          }) as readonly any[])
        : [];
  return {
    totalCount: totalCount,
    limit: limit,
    offset: offset,
    order: order,
    entries: entries,
  } satisfies Groups;
}

import { serializeUserFull } from './userFull.generated.js';
import { deserializeUserFull } from './userFull.generated.js';
import { UserFull } from './userFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type UsersOrderDirectionField = 'ASC' | 'DESC' | string;
export interface UsersOrderField {
  /**
   * The field to order by. */
  readonly by?: string;
  /**
   * The direction to order by, either ascending or descending. */
  readonly direction?: UsersOrderDirectionField;
  readonly rawData?: SerializedData;
}
export interface Users {
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
  readonly order?: readonly UsersOrderField[];
  /**
   * A list of users. */
  readonly entries?: readonly UserFull[];
  readonly rawData?: SerializedData;
}
export function serializeUsersOrderDirectionField(
  val: UsersOrderDirectionField,
): SerializedData {
  return val;
}
export function deserializeUsersOrderDirectionField(
  val: SerializedData,
): UsersOrderDirectionField {
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
    message: "Can't deserialize UsersOrderDirectionField",
  });
}
export function serializeUsersOrderField(val: UsersOrderField): SerializedData {
  return {
    ['by']: val.by,
    ['direction']:
      val.direction == void 0
        ? val.direction
        : serializeUsersOrderDirectionField(val.direction),
  };
}
export function deserializeUsersOrderField(
  val: SerializedData,
): UsersOrderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UsersOrderField"' });
  }
  if (!(val.by == void 0) && !sdIsString(val.by)) {
    throw new BoxSdkError({
      message: 'Expecting string for "by" of type "UsersOrderField"',
    });
  }
  const by: undefined | string = val.by == void 0 ? void 0 : val.by;
  const direction: undefined | UsersOrderDirectionField =
    val.direction == void 0
      ? void 0
      : deserializeUsersOrderDirectionField(val.direction);
  return { by: by, direction: direction } satisfies UsersOrderField;
}
export function serializeUsers(val: Users): SerializedData {
  return {
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['prev_marker']: val.prevMarker,
    ['total_count']: val.totalCount,
    ['offset']: val.offset,
    ['order']:
      val.order == void 0
        ? val.order
        : (val.order.map(function (item: UsersOrderField): SerializedData {
            return serializeUsersOrderField(item);
          }) as readonly any[]),
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: UserFull): SerializedData {
            return serializeUserFull(item);
          }) as readonly any[]),
  };
}
export function deserializeUsers(val: SerializedData): Users {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Users"' });
  }
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "Users"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "next_marker" of type "Users"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.prev_marker == void 0) && !sdIsString(val.prev_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "prev_marker" of type "Users"',
    });
  }
  const prevMarker: undefined | string =
    val.prev_marker == void 0 ? void 0 : val.prev_marker;
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "Users"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "Users"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  if (!(val.order == void 0) && !sdIsList(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting array for "order" of type "Users"',
    });
  }
  const order: undefined | readonly UsersOrderField[] =
    val.order == void 0
      ? void 0
      : sdIsList(val.order)
        ? (val.order.map(function (itm: SerializedData): UsersOrderField {
            return deserializeUsersOrderField(itm);
          }) as readonly any[])
        : [];
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Users"',
    });
  }
  const entries: undefined | readonly UserFull[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): UserFull {
            return deserializeUserFull(itm);
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
  } satisfies Users;
}

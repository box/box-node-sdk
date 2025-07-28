import { serializeCommentFull } from './commentFull.generated.js';
import { deserializeCommentFull } from './commentFull.generated.js';
import { CommentFull } from './commentFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type CommentsOrderDirectionField = 'ASC' | 'DESC' | string;
export interface CommentsOrderField {
  /**
   * The field to order by. */
  readonly by?: string;
  /**
   * The direction to order by, either ascending or descending. */
  readonly direction?: CommentsOrderDirectionField;
  readonly rawData?: SerializedData;
}
export interface Comments {
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
  readonly order?: readonly CommentsOrderField[];
  /**
   * A list of comments. */
  readonly entries?: readonly CommentFull[];
  readonly rawData?: SerializedData;
}
export function serializeCommentsOrderDirectionField(
  val: CommentsOrderDirectionField,
): SerializedData {
  return val;
}
export function deserializeCommentsOrderDirectionField(
  val: SerializedData,
): CommentsOrderDirectionField {
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
    message: "Can't deserialize CommentsOrderDirectionField",
  });
}
export function serializeCommentsOrderField(
  val: CommentsOrderField,
): SerializedData {
  return {
    ['by']: val.by,
    ['direction']:
      val.direction == void 0
        ? val.direction
        : serializeCommentsOrderDirectionField(val.direction),
  };
}
export function deserializeCommentsOrderField(
  val: SerializedData,
): CommentsOrderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CommentsOrderField"',
    });
  }
  if (!(val.by == void 0) && !sdIsString(val.by)) {
    throw new BoxSdkError({
      message: 'Expecting string for "by" of type "CommentsOrderField"',
    });
  }
  const by: undefined | string = val.by == void 0 ? void 0 : val.by;
  const direction: undefined | CommentsOrderDirectionField =
    val.direction == void 0
      ? void 0
      : deserializeCommentsOrderDirectionField(val.direction);
  return { by: by, direction: direction } satisfies CommentsOrderField;
}
export function serializeComments(val: Comments): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['limit']: val.limit,
    ['offset']: val.offset,
    ['order']:
      val.order == void 0
        ? val.order
        : (val.order.map(function (item: CommentsOrderField): SerializedData {
            return serializeCommentsOrderField(item);
          }) as readonly any[]),
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: CommentFull): SerializedData {
            return serializeCommentFull(item);
          }) as readonly any[]),
  };
}
export function deserializeComments(val: SerializedData): Comments {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Comments"' });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "Comments"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "Comments"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "Comments"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  if (!(val.order == void 0) && !sdIsList(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting array for "order" of type "Comments"',
    });
  }
  const order: undefined | readonly CommentsOrderField[] =
    val.order == void 0
      ? void 0
      : sdIsList(val.order)
        ? (val.order.map(function (itm: SerializedData): CommentsOrderField {
            return deserializeCommentsOrderField(itm);
          }) as readonly any[])
        : [];
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Comments"',
    });
  }
  const entries: undefined | readonly CommentFull[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): CommentFull {
            return deserializeCommentFull(itm);
          }) as readonly any[])
        : [];
  return {
    totalCount: totalCount,
    limit: limit,
    offset: offset,
    order: order,
    entries: entries,
  } satisfies Comments;
}

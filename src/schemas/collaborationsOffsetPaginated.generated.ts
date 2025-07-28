import { serializeCollaboration } from './collaboration.generated.js';
import { deserializeCollaboration } from './collaboration.generated.js';
import { Collaboration } from './collaboration.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface CollaborationsOffsetPaginated {
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
   * A list of collaborations. */
  readonly entries?: readonly Collaboration[];
  readonly rawData?: SerializedData;
}
export function serializeCollaborationsOffsetPaginated(
  val: CollaborationsOffsetPaginated,
): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['limit']: val.limit,
    ['offset']: val.offset,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: Collaboration): SerializedData {
            return serializeCollaboration(item);
          }) as readonly any[]),
  };
}
export function deserializeCollaborationsOffsetPaginated(
  val: SerializedData,
): CollaborationsOffsetPaginated {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CollaborationsOffsetPaginated"',
    });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_count" of type "CollaborationsOffsetPaginated"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "limit" of type "CollaborationsOffsetPaginated"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "offset" of type "CollaborationsOffsetPaginated"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "CollaborationsOffsetPaginated"',
    });
  }
  const entries: undefined | readonly Collaboration[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): Collaboration {
            return deserializeCollaboration(itm);
          }) as readonly any[])
        : [];
  return {
    totalCount: totalCount,
    limit: limit,
    offset: offset,
    entries: entries,
  } satisfies CollaborationsOffsetPaginated;
}

import { serializeUploadPart } from './uploadPart.generated.js';
import { deserializeUploadPart } from './uploadPart.generated.js';
import { UploadPart } from './uploadPart.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type UploadPartsOrderDirectionField = 'ASC' | 'DESC' | string;
export interface UploadPartsOrderField {
  /**
   * The field to order by */
  readonly by?: string;
  /**
   * The direction to order by, either ascending or descending */
  readonly direction?: UploadPartsOrderDirectionField;
  readonly rawData?: SerializedData;
}
export interface UploadParts {
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
  readonly order?: readonly UploadPartsOrderField[];
  /**
   * A list of uploaded chunks for an upload
   * session */
  readonly entries?: readonly UploadPart[];
  readonly rawData?: SerializedData;
}
export function serializeUploadPartsOrderDirectionField(
  val: UploadPartsOrderDirectionField,
): SerializedData {
  return val;
}
export function deserializeUploadPartsOrderDirectionField(
  val: SerializedData,
): UploadPartsOrderDirectionField {
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
    message: "Can't deserialize UploadPartsOrderDirectionField",
  });
}
export function serializeUploadPartsOrderField(
  val: UploadPartsOrderField,
): SerializedData {
  return {
    ['by']: val.by,
    ['direction']:
      val.direction == void 0
        ? val.direction
        : serializeUploadPartsOrderDirectionField(val.direction),
  };
}
export function deserializeUploadPartsOrderField(
  val: SerializedData,
): UploadPartsOrderField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UploadPartsOrderField"',
    });
  }
  if (!(val.by == void 0) && !sdIsString(val.by)) {
    throw new BoxSdkError({
      message: 'Expecting string for "by" of type "UploadPartsOrderField"',
    });
  }
  const by: undefined | string = val.by == void 0 ? void 0 : val.by;
  const direction: undefined | UploadPartsOrderDirectionField =
    val.direction == void 0
      ? void 0
      : deserializeUploadPartsOrderDirectionField(val.direction);
  return { by: by, direction: direction } satisfies UploadPartsOrderField;
}
export function serializeUploadParts(val: UploadParts): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['limit']: val.limit,
    ['offset']: val.offset,
    ['order']:
      val.order == void 0
        ? val.order
        : (val.order.map(function (
            item: UploadPartsOrderField,
          ): SerializedData {
            return serializeUploadPartsOrderField(item);
          }) as readonly any[]),
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: UploadPart): SerializedData {
            return serializeUploadPart(item);
          }) as readonly any[]),
  };
}
export function deserializeUploadParts(val: SerializedData): UploadParts {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UploadParts"' });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "total_count" of type "UploadParts"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "UploadParts"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.offset == void 0) && !sdIsNumber(val.offset)) {
    throw new BoxSdkError({
      message: 'Expecting number for "offset" of type "UploadParts"',
    });
  }
  const offset: undefined | number = val.offset == void 0 ? void 0 : val.offset;
  if (!(val.order == void 0) && !sdIsList(val.order)) {
    throw new BoxSdkError({
      message: 'Expecting array for "order" of type "UploadParts"',
    });
  }
  const order: undefined | readonly UploadPartsOrderField[] =
    val.order == void 0
      ? void 0
      : sdIsList(val.order)
        ? (val.order.map(function (itm: SerializedData): UploadPartsOrderField {
            return deserializeUploadPartsOrderField(itm);
          }) as readonly any[])
        : [];
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "UploadParts"',
    });
  }
  const entries: undefined | readonly UploadPart[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): UploadPart {
            return deserializeUploadPart(itm);
          }) as readonly any[])
        : [];
  return {
    totalCount: totalCount,
    limit: limit,
    offset: offset,
    order: order,
    entries: entries,
  } satisfies UploadParts;
}

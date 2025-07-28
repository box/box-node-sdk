import { serializeTermsOfServiceUserStatus } from './termsOfServiceUserStatus.generated.js';
import { deserializeTermsOfServiceUserStatus } from './termsOfServiceUserStatus.generated.js';
import { TermsOfServiceUserStatus } from './termsOfServiceUserStatus.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface TermsOfServiceUserStatuses {
  /**
   * The total number of objects. */
  readonly totalCount?: number;
  /**
   * A list of terms of service user statuses. */
  readonly entries?: readonly TermsOfServiceUserStatus[];
  readonly rawData?: SerializedData;
}
export function serializeTermsOfServiceUserStatuses(
  val: TermsOfServiceUserStatuses,
): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: TermsOfServiceUserStatus,
          ): SerializedData {
            return serializeTermsOfServiceUserStatus(item);
          }) as readonly any[]),
  };
}
export function deserializeTermsOfServiceUserStatuses(
  val: SerializedData,
): TermsOfServiceUserStatuses {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TermsOfServiceUserStatuses"',
    });
  }
  if (!(val.total_count == void 0) && !sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_count" of type "TermsOfServiceUserStatuses"',
    });
  }
  const totalCount: undefined | number =
    val.total_count == void 0 ? void 0 : val.total_count;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "TermsOfServiceUserStatuses"',
    });
  }
  const entries: undefined | readonly TermsOfServiceUserStatus[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): TermsOfServiceUserStatus {
            return deserializeTermsOfServiceUserStatus(itm);
          }) as readonly any[])
        : [];
  return {
    totalCount: totalCount,
    entries: entries,
  } satisfies TermsOfServiceUserStatuses;
}

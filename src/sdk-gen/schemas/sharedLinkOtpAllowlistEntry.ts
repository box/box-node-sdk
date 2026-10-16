import { serializeUserBase } from './userBase';
import { deserializeUserBase } from './userBase';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { UserBase } from './userBase';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SharedLinkOtpAllowlistEntryTypeField = 'email' | 'domain';
export interface SharedLinkOtpAllowlistEntry {
  /**
   * The kind of allowlist entry.
   *
   * * `email` - The entry matches a single email address.
   * * `domain` - The entry matches every email address under the
   *   given domain. */
  readonly type: SharedLinkOtpAllowlistEntryTypeField;
  /**
   * The value of the allowlist entry.
   *
   * * For `email` entries, the full email address (must contain `@`).
   * * For `domain` entries, the bare domain (e.g. `example.com`). */
  readonly value: string;
  /**
   * The date and time when the allowlist entry was added. */
  readonly createdAt: DateTime;
  readonly createdBy: UserBase;
  readonly rawData?: SerializedData;
}
export function serializeSharedLinkOtpAllowlistEntryTypeField(
  val: SharedLinkOtpAllowlistEntryTypeField
): SerializedData {
  return val;
}
export function deserializeSharedLinkOtpAllowlistEntryTypeField(
  val: SerializedData
): SharedLinkOtpAllowlistEntryTypeField {
  if (val == 'email') {
    return val;
  }
  if (val == 'domain') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SharedLinkOtpAllowlistEntryTypeField",
  });
}
export function serializeSharedLinkOtpAllowlistEntry(
  val: SharedLinkOtpAllowlistEntry
): SerializedData {
  return {
    ['type']: serializeSharedLinkOtpAllowlistEntryTypeField(val.type),
    ['value']: val.value,
    ['created_at']: serializeDateTime(val.createdAt),
    ['created_by']: serializeUserBase(val.createdBy),
  };
}
export function deserializeSharedLinkOtpAllowlistEntry(
  val: SerializedData
): SharedLinkOtpAllowlistEntry {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SharedLinkOtpAllowlistEntry"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "SharedLinkOtpAllowlistEntry" to be defined',
    });
  }
  const type: SharedLinkOtpAllowlistEntryTypeField =
    deserializeSharedLinkOtpAllowlistEntryTypeField(val.type);
  if (val.value == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "value" of type "SharedLinkOtpAllowlistEntry" to be defined',
    });
  }
  if (!sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "SharedLinkOtpAllowlistEntry"',
    });
  }
  const value: string = val.value;
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_at" of type "SharedLinkOtpAllowlistEntry" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "SharedLinkOtpAllowlistEntry"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  if (val.created_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_by" of type "SharedLinkOtpAllowlistEntry" to be defined',
    });
  }
  const createdBy: UserBase = deserializeUserBase(val.created_by);
  return {
    type: type,
    value: value,
    createdAt: createdAt,
    createdBy: createdBy,
  } satisfies SharedLinkOtpAllowlistEntry;
}

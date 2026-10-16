import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SharedLinkOtpAllowlistEntryWritableTypeField = 'email' | 'domain';
export interface SharedLinkOtpAllowlistEntryWritable {
  /**
   * The kind of allowlist entry.
   *
   * * `email` - The entry matches a single email address.
   * * `domain` - The entry matches every email address under the
   *   given domain. */
  readonly type: SharedLinkOtpAllowlistEntryWritableTypeField;
  /**
   * The value of the allowlist entry.
   *
   * * For `email` entries, the full email address (must contain `@`).
   * * For `domain` entries, the bare domain (e.g. `example.com`). */
  readonly value: string;
  readonly rawData?: SerializedData;
}
export function serializeSharedLinkOtpAllowlistEntryWritableTypeField(
  val: SharedLinkOtpAllowlistEntryWritableTypeField,
): SerializedData {
  return val;
}
export function deserializeSharedLinkOtpAllowlistEntryWritableTypeField(
  val: SerializedData,
): SharedLinkOtpAllowlistEntryWritableTypeField {
  if (val == 'email') {
    return val;
  }
  if (val == 'domain') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SharedLinkOtpAllowlistEntryWritableTypeField",
  });
}
export function serializeSharedLinkOtpAllowlistEntryWritable(
  val: SharedLinkOtpAllowlistEntryWritable,
): SerializedData {
  return {
    ['type']: serializeSharedLinkOtpAllowlistEntryWritableTypeField(val.type),
    ['value']: val.value,
  };
}
export function deserializeSharedLinkOtpAllowlistEntryWritable(
  val: SerializedData,
): SharedLinkOtpAllowlistEntryWritable {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SharedLinkOtpAllowlistEntryWritable"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "SharedLinkOtpAllowlistEntryWritable" to be defined',
    });
  }
  const type: SharedLinkOtpAllowlistEntryWritableTypeField =
    deserializeSharedLinkOtpAllowlistEntryWritableTypeField(val.type);
  if (val.value == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "value" of type "SharedLinkOtpAllowlistEntryWritable" to be defined',
    });
  }
  if (!sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "SharedLinkOtpAllowlistEntryWritable"',
    });
  }
  const value: string = val.value;
  return {
    type: type,
    value: value,
  } satisfies SharedLinkOtpAllowlistEntryWritable;
}

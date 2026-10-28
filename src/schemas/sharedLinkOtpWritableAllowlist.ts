import { serializeSharedLinkOtpAllowlistEntryWritable } from './sharedLinkOtpAllowlistEntryWritable';
import { deserializeSharedLinkOtpAllowlistEntryWritable } from './sharedLinkOtpAllowlistEntryWritable';
import { SharedLinkOtpAllowlistEntryWritable } from './sharedLinkOtpAllowlistEntryWritable';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SharedLinkOtpWritableAllowlistModeField = 'allowlist' | string;
export class SharedLinkOtpWritableAllowlist {
  /**
   * Set to `allowlist` to restrict OTP requests to emails matching an
   * entry on the `allowlist`. */
  readonly mode: SharedLinkOtpWritableAllowlistModeField =
    'allowlist' as SharedLinkOtpWritableAllowlistModeField;
  /**
   * The list of email and domain entries that are permitted to access the
   * shared link when `mode` is `allowlist`. Anonymous users whose
   * email matches an entry can request and verify a one-time-passcode.
   *
   * Providing this field replaces the entire existing allowlist; passing
   * an empty array clears all entries. Required when `mode` is `allowlist`. */
  readonly allowlist!: readonly SharedLinkOtpAllowlistEntryWritable[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SharedLinkOtpWritableAllowlist, 'mode'> &
      Partial<Pick<SharedLinkOtpWritableAllowlist, 'mode'>>,
  ) {
    if (fields.mode !== undefined) {
      this.mode = fields.mode;
    }
    if (fields.allowlist !== undefined) {
      this.allowlist = fields.allowlist;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SharedLinkOtpWritableAllowlistInput {
  /**
   * Set to `allowlist` to restrict OTP requests to emails matching an
   * entry on the `allowlist`. */
  readonly mode?: SharedLinkOtpWritableAllowlistModeField;
  /**
   * The list of email and domain entries that are permitted to access the
   * shared link when `mode` is `allowlist`. Anonymous users whose
   * email matches an entry can request and verify a one-time-passcode.
   *
   * Providing this field replaces the entire existing allowlist; passing
   * an empty array clears all entries. Required when `mode` is `allowlist`. */
  readonly allowlist: readonly SharedLinkOtpAllowlistEntryWritable[];
  readonly rawData?: SerializedData;
}
export function serializeSharedLinkOtpWritableAllowlistModeField(
  val: SharedLinkOtpWritableAllowlistModeField,
): SerializedData {
  return val;
}
export function deserializeSharedLinkOtpWritableAllowlistModeField(
  val: SerializedData,
): SharedLinkOtpWritableAllowlistModeField {
  if (val == 'allowlist') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SharedLinkOtpWritableAllowlistModeField",
  });
}
export function serializeSharedLinkOtpWritableAllowlist(
  val: SharedLinkOtpWritableAllowlist,
): SerializedData {
  return {
    ['mode']: serializeSharedLinkOtpWritableAllowlistModeField(val.mode),
    ['allowlist']: val.allowlist.map(function (
      item: SharedLinkOtpAllowlistEntryWritable,
    ): SerializedData {
      return serializeSharedLinkOtpAllowlistEntryWritable(item);
    }) as readonly any[],
  };
}
export function deserializeSharedLinkOtpWritableAllowlist(
  val: SerializedData,
): SharedLinkOtpWritableAllowlist {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SharedLinkOtpWritableAllowlist"',
    });
  }
  if (val.mode == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "mode" of type "SharedLinkOtpWritableAllowlist" to be defined',
    });
  }
  const mode: SharedLinkOtpWritableAllowlistModeField =
    deserializeSharedLinkOtpWritableAllowlistModeField(val.mode);
  if (val.allowlist == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "allowlist" of type "SharedLinkOtpWritableAllowlist" to be defined',
    });
  }
  if (!sdIsList(val.allowlist)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowlist" of type "SharedLinkOtpWritableAllowlist"',
    });
  }
  const allowlist: readonly SharedLinkOtpAllowlistEntryWritable[] = sdIsList(
    val.allowlist,
  )
    ? (val.allowlist.map(function (
        itm: SerializedData,
      ): SharedLinkOtpAllowlistEntryWritable {
        return deserializeSharedLinkOtpAllowlistEntryWritable(itm);
      }) as readonly any[])
    : [];
  return {
    mode: mode,
    allowlist: allowlist,
  } satisfies SharedLinkOtpWritableAllowlist;
}
export function serializeSharedLinkOtpWritableAllowlistInput(
  val: SharedLinkOtpWritableAllowlistInput,
): SerializedData {
  return {
    ['mode']:
      val.mode == void 0
        ? val.mode
        : serializeSharedLinkOtpWritableAllowlistModeField(val.mode),
    ['allowlist']: val.allowlist.map(function (
      item: SharedLinkOtpAllowlistEntryWritable,
    ): SerializedData {
      return serializeSharedLinkOtpAllowlistEntryWritable(item);
    }) as readonly any[],
  };
}
export function deserializeSharedLinkOtpWritableAllowlistInput(
  val: SerializedData,
): SharedLinkOtpWritableAllowlistInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SharedLinkOtpWritableAllowlistInput"',
    });
  }
  const mode: undefined | SharedLinkOtpWritableAllowlistModeField =
    val.mode == void 0
      ? void 0
      : deserializeSharedLinkOtpWritableAllowlistModeField(val.mode);
  if (val.allowlist == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "allowlist" of type "SharedLinkOtpWritableAllowlistInput" to be defined',
    });
  }
  if (!sdIsList(val.allowlist)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowlist" of type "SharedLinkOtpWritableAllowlistInput"',
    });
  }
  const allowlist: readonly SharedLinkOtpAllowlistEntryWritable[] = sdIsList(
    val.allowlist,
  )
    ? (val.allowlist.map(function (
        itm: SerializedData,
      ): SharedLinkOtpAllowlistEntryWritable {
        return deserializeSharedLinkOtpAllowlistEntryWritable(itm);
      }) as readonly any[])
    : [];
  return {
    mode: mode,
    allowlist: allowlist,
  } satisfies SharedLinkOtpWritableAllowlistInput;
}

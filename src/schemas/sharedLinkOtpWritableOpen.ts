import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SharedLinkOtpWritableOpenModeField = 'open' | string;
export class SharedLinkOtpWritableOpen {
  /**
   * Set to `open` to allow any anonymous recipient to request a
   * one-time-passcode to any email address. */
  readonly mode: SharedLinkOtpWritableOpenModeField =
    'open' as SharedLinkOtpWritableOpenModeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SharedLinkOtpWritableOpen, 'mode'> &
      Partial<Pick<SharedLinkOtpWritableOpen, 'mode'>>,
  ) {
    if (fields.mode !== undefined) {
      this.mode = fields.mode;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SharedLinkOtpWritableOpenInput {
  /**
   * Set to `open` to allow any anonymous recipient to request a
   * one-time-passcode to any email address. */
  readonly mode?: SharedLinkOtpWritableOpenModeField;
  readonly rawData?: SerializedData;
}
export function serializeSharedLinkOtpWritableOpenModeField(
  val: SharedLinkOtpWritableOpenModeField,
): SerializedData {
  return val;
}
export function deserializeSharedLinkOtpWritableOpenModeField(
  val: SerializedData,
): SharedLinkOtpWritableOpenModeField {
  if (val == 'open') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SharedLinkOtpWritableOpenModeField",
  });
}
export function serializeSharedLinkOtpWritableOpen(
  val: SharedLinkOtpWritableOpen,
): SerializedData {
  return { ['mode']: serializeSharedLinkOtpWritableOpenModeField(val.mode) };
}
export function deserializeSharedLinkOtpWritableOpen(
  val: SerializedData,
): SharedLinkOtpWritableOpen {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SharedLinkOtpWritableOpen"',
    });
  }
  if (val.mode == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "mode" of type "SharedLinkOtpWritableOpen" to be defined',
    });
  }
  const mode: SharedLinkOtpWritableOpenModeField =
    deserializeSharedLinkOtpWritableOpenModeField(val.mode);
  return { mode: mode } satisfies SharedLinkOtpWritableOpen;
}
export function serializeSharedLinkOtpWritableOpenInput(
  val: SharedLinkOtpWritableOpenInput,
): SerializedData {
  return {
    ['mode']:
      val.mode == void 0
        ? val.mode
        : serializeSharedLinkOtpWritableOpenModeField(val.mode),
  };
}
export function deserializeSharedLinkOtpWritableOpenInput(
  val: SerializedData,
): SharedLinkOtpWritableOpenInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SharedLinkOtpWritableOpenInput"',
    });
  }
  const mode: undefined | SharedLinkOtpWritableOpenModeField =
    val.mode == void 0
      ? void 0
      : deserializeSharedLinkOtpWritableOpenModeField(val.mode);
  return { mode: mode } satisfies SharedLinkOtpWritableOpenInput;
}

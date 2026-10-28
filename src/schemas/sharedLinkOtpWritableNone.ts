import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SharedLinkOtpWritableNoneModeField = 'none' | string;
export class SharedLinkOtpWritableNone {
  /**
   * Set to `none` to disable OTP enforcement for the shared link. */
  readonly mode: SharedLinkOtpWritableNoneModeField =
    'none' as SharedLinkOtpWritableNoneModeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SharedLinkOtpWritableNone, 'mode'> &
      Partial<Pick<SharedLinkOtpWritableNone, 'mode'>>,
  ) {
    if (fields.mode !== undefined) {
      this.mode = fields.mode;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SharedLinkOtpWritableNoneInput {
  /**
   * Set to `none` to disable OTP enforcement for the shared link. */
  readonly mode?: SharedLinkOtpWritableNoneModeField;
  readonly rawData?: SerializedData;
}
export function serializeSharedLinkOtpWritableNoneModeField(
  val: SharedLinkOtpWritableNoneModeField,
): SerializedData {
  return val;
}
export function deserializeSharedLinkOtpWritableNoneModeField(
  val: SerializedData,
): SharedLinkOtpWritableNoneModeField {
  if (val == 'none') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize SharedLinkOtpWritableNoneModeField",
  });
}
export function serializeSharedLinkOtpWritableNone(
  val: SharedLinkOtpWritableNone,
): SerializedData {
  return { ['mode']: serializeSharedLinkOtpWritableNoneModeField(val.mode) };
}
export function deserializeSharedLinkOtpWritableNone(
  val: SerializedData,
): SharedLinkOtpWritableNone {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SharedLinkOtpWritableNone"',
    });
  }
  if (val.mode == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "mode" of type "SharedLinkOtpWritableNone" to be defined',
    });
  }
  const mode: SharedLinkOtpWritableNoneModeField =
    deserializeSharedLinkOtpWritableNoneModeField(val.mode);
  return { mode: mode } satisfies SharedLinkOtpWritableNone;
}
export function serializeSharedLinkOtpWritableNoneInput(
  val: SharedLinkOtpWritableNoneInput,
): SerializedData {
  return {
    ['mode']:
      val.mode == void 0
        ? val.mode
        : serializeSharedLinkOtpWritableNoneModeField(val.mode),
  };
}
export function deserializeSharedLinkOtpWritableNoneInput(
  val: SerializedData,
): SharedLinkOtpWritableNoneInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SharedLinkOtpWritableNoneInput"',
    });
  }
  const mode: undefined | SharedLinkOtpWritableNoneModeField =
    val.mode == void 0
      ? void 0
      : deserializeSharedLinkOtpWritableNoneModeField(val.mode);
  return { mode: mode } satisfies SharedLinkOtpWritableNoneInput;
}

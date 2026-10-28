import { serializeSharedLinkOtpWritableNone } from './sharedLinkOtpWritableNone';
import { deserializeSharedLinkOtpWritableNone } from './sharedLinkOtpWritableNone';
import { serializeSharedLinkOtpWritableOpen } from './sharedLinkOtpWritableOpen';
import { deserializeSharedLinkOtpWritableOpen } from './sharedLinkOtpWritableOpen';
import { serializeSharedLinkOtpWritableAllowlist } from './sharedLinkOtpWritableAllowlist';
import { deserializeSharedLinkOtpWritableAllowlist } from './sharedLinkOtpWritableAllowlist';
import { SharedLinkOtpWritableNone } from './sharedLinkOtpWritableNone';
import { SharedLinkOtpWritableOpen } from './sharedLinkOtpWritableOpen';
import { SharedLinkOtpWritableAllowlist } from './sharedLinkOtpWritableAllowlist';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SharedLinkOtpWritable =
  | SharedLinkOtpWritableNone
  | SharedLinkOtpWritableOpen
  | SharedLinkOtpWritableAllowlist;
export function serializeSharedLinkOtpWritable(val: any): SerializedData {
  try {
    if (val.mode == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "mode" of type "SharedLinkOtpWritableNone" to be defined',
      });
    }
    return serializeSharedLinkOtpWritableNone(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    if (val.mode == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "mode" of type "SharedLinkOtpWritableOpen" to be defined',
      });
    }
    return serializeSharedLinkOtpWritableOpen(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    if (val.mode == void 0) {
      throw new BoxSdkError({
        message:
          'Expecting "mode" of type "SharedLinkOtpWritableAllowlist" to be defined',
      });
    }
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
    return serializeSharedLinkOtpWritableAllowlist(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({ message: "Can't serialize SharedLinkOtpWritable" });
}
export function deserializeSharedLinkOtpWritable(
  val: SerializedData,
): SharedLinkOtpWritable {
  try {
    return deserializeSharedLinkOtpWritableNone(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSharedLinkOtpWritableOpen(val);
  } catch (error) {
    void 0;
  } finally {
  }
  try {
    return deserializeSharedLinkOtpWritableAllowlist(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({ message: "Can't deserialize SharedLinkOtpWritable" });
}

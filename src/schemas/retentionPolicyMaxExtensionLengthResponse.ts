import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type RetentionPolicyMaxExtensionLengthResponseEnum = 'none' | string;
export type RetentionPolicyMaxExtensionLengthResponse =
  RetentionPolicyMaxExtensionLengthResponseEnum | string;
export function serializeRetentionPolicyMaxExtensionLengthResponseEnum(
  val: RetentionPolicyMaxExtensionLengthResponseEnum,
): SerializedData {
  return val;
}
export function deserializeRetentionPolicyMaxExtensionLengthResponseEnum(
  val: SerializedData,
): RetentionPolicyMaxExtensionLengthResponseEnum {
  if (val == 'none') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RetentionPolicyMaxExtensionLengthResponseEnum",
  });
}
export function serializeRetentionPolicyMaxExtensionLengthResponse(
  val: any,
): SerializedData {
  if (sdIsString(val)) {
    return val;
  }
  try {
    return serializeRetentionPolicyMaxExtensionLengthResponseEnum(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message: "Can't serialize RetentionPolicyMaxExtensionLengthResponse",
  });
}
export function deserializeRetentionPolicyMaxExtensionLengthResponse(
  val: SerializedData,
): RetentionPolicyMaxExtensionLengthResponse {
  if (sdIsString(val)) {
    return val;
  }
  try {
    return deserializeRetentionPolicyMaxExtensionLengthResponseEnum(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message: "Can't deserialize RetentionPolicyMaxExtensionLengthResponse",
  });
}

import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type RetentionPolicyMaxExtensionLengthRequestEnum = 'none' | string;
export type RetentionPolicyMaxExtensionLengthRequest =
  RetentionPolicyMaxExtensionLengthRequestEnum | string | number;
export function serializeRetentionPolicyMaxExtensionLengthRequestEnum(
  val: RetentionPolicyMaxExtensionLengthRequestEnum,
): SerializedData {
  return val;
}
export function deserializeRetentionPolicyMaxExtensionLengthRequestEnum(
  val: SerializedData,
): RetentionPolicyMaxExtensionLengthRequestEnum {
  if (val == 'none') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RetentionPolicyMaxExtensionLengthRequestEnum",
  });
}
export function serializeRetentionPolicyMaxExtensionLengthRequest(
  val: any,
): SerializedData {
  if (sdIsString(val)) {
    return val;
  }
  if (sdIsNumber(val)) {
    return val;
  }
  try {
    return serializeRetentionPolicyMaxExtensionLengthRequestEnum(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message: "Can't serialize RetentionPolicyMaxExtensionLengthRequest",
  });
}
export function deserializeRetentionPolicyMaxExtensionLengthRequest(
  val: SerializedData,
): RetentionPolicyMaxExtensionLengthRequest {
  if (sdIsString(val)) {
    return val;
  }
  if (sdIsNumber(val)) {
    return val;
  }
  try {
    return deserializeRetentionPolicyMaxExtensionLengthRequestEnum(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({
    message: "Can't deserialize RetentionPolicyMaxExtensionLengthRequest",
  });
}

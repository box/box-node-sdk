import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type UserOrGroupReferenceV2025R0TypeField = 'user' | 'group';
export interface UserOrGroupReferenceV2025R0 {
  /**
   * The type `user` or `group`. */
  readonly type?: UserOrGroupReferenceV2025R0TypeField;
  /**
   * The identifier of the user or group. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export function serializeUserOrGroupReferenceV2025R0TypeField(
  val: UserOrGroupReferenceV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeUserOrGroupReferenceV2025R0TypeField(
  val: SerializedData,
): UserOrGroupReferenceV2025R0TypeField {
  if (val == 'user') {
    return val;
  }
  if (val == 'group') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UserOrGroupReferenceV2025R0TypeField",
  });
}
export function serializeUserOrGroupReferenceV2025R0(
  val: UserOrGroupReferenceV2025R0,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeUserOrGroupReferenceV2025R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeUserOrGroupReferenceV2025R0(
  val: SerializedData,
): UserOrGroupReferenceV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserOrGroupReferenceV2025R0"',
    });
  }
  const type: undefined | UserOrGroupReferenceV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeUserOrGroupReferenceV2025R0TypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "UserOrGroupReferenceV2025R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { type: type, id: id } satisfies UserOrGroupReferenceV2025R0;
}

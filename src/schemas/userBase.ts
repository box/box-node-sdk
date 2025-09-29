import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type UserBaseTypeField = 'user';
export class UserBase {
  /**
   * The unique identifier for this user. */
  readonly id!: string;
  /**
   * The value will always be `user`. */
  readonly type: UserBaseTypeField = 'user' as UserBaseTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<UserBase, 'type'> & Partial<Pick<UserBase, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface UserBaseInput {
  /**
   * The unique identifier for this user. */
  readonly id: string;
  /**
   * The value will always be `user`. */
  readonly type?: UserBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeUserBaseTypeField(
  val: UserBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeUserBaseTypeField(
  val: SerializedData,
): UserBaseTypeField {
  if (val == 'user') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize UserBaseTypeField" });
}
export function serializeUserBase(val: UserBase): SerializedData {
  return { ['id']: val.id, ['type']: serializeUserBaseTypeField(val.type) };
}
export function deserializeUserBase(val: SerializedData): UserBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UserBase"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserBase"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "UserBase" to be defined',
    });
  }
  const type: UserBaseTypeField = deserializeUserBaseTypeField(val.type);
  return { id: id, type: type } satisfies UserBase;
}
export function serializeUserBaseInput(val: UserBaseInput): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeUserBaseTypeField(val.type),
  };
}
export function deserializeUserBaseInput(val: SerializedData): UserBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UserBaseInput"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserBaseInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | UserBaseTypeField =
    val.type == void 0 ? void 0 : deserializeUserBaseTypeField(val.type);
  return { id: id, type: type } satisfies UserBaseInput;
}

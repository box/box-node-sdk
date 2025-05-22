import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type UserBaseV2025R0TypeField = 'user';
export class UserBaseV2025R0 {
  /**
   * The unique identifier for this user */
  readonly id!: string;
  /**
   * user */
  readonly type: UserBaseV2025R0TypeField = 'user' as UserBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<UserBaseV2025R0, 'type'> &
      Partial<Pick<UserBaseV2025R0, 'type'>>,
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
export interface UserBaseV2025R0Input {
  /**
   * The unique identifier for this user */
  readonly id: string;
  /**
   * user */
  readonly type?: UserBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeUserBaseV2025R0TypeField(
  val: UserBaseV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeUserBaseV2025R0TypeField(
  val: SerializedData,
): UserBaseV2025R0TypeField {
  if (val == 'user') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UserBaseV2025R0TypeField",
  });
}
export function serializeUserBaseV2025R0(val: UserBaseV2025R0): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeUserBaseV2025R0TypeField(val.type),
  };
}
export function deserializeUserBaseV2025R0(
  val: SerializedData,
): UserBaseV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UserBaseV2025R0"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserBaseV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserBaseV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "UserBaseV2025R0" to be defined',
    });
  }
  const type: UserBaseV2025R0TypeField = deserializeUserBaseV2025R0TypeField(
    val.type,
  );
  return { id: id, type: type } satisfies UserBaseV2025R0;
}
export function serializeUserBaseV2025R0Input(
  val: UserBaseV2025R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeUserBaseV2025R0TypeField(val.type),
  };
}
export function deserializeUserBaseV2025R0Input(
  val: SerializedData,
): UserBaseV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserBaseV2025R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserBaseV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserBaseV2025R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | UserBaseV2025R0TypeField =
    val.type == void 0 ? void 0 : deserializeUserBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies UserBaseV2025R0Input;
}

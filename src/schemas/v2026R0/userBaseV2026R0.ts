import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type UserBaseV2026R0TypeField = 'user';
export class UserBaseV2026R0 {
  /**
   * The unique identifier for this user. */
  readonly id!: string;
  /**
   * The value will always be `user`. */
  readonly type: UserBaseV2026R0TypeField = 'user' as UserBaseV2026R0TypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<UserBaseV2026R0, 'type'> &
      Partial<Pick<UserBaseV2026R0, 'type'>>,
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
export interface UserBaseV2026R0Input {
  /**
   * The unique identifier for this user. */
  readonly id: string;
  /**
   * The value will always be `user`. */
  readonly type?: UserBaseV2026R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeUserBaseV2026R0TypeField(
  val: UserBaseV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeUserBaseV2026R0TypeField(
  val: SerializedData,
): UserBaseV2026R0TypeField {
  if (val == 'user') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UserBaseV2026R0TypeField",
  });
}
export function serializeUserBaseV2026R0(val: UserBaseV2026R0): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeUserBaseV2026R0TypeField(val.type),
  };
}
export function deserializeUserBaseV2026R0(
  val: SerializedData,
): UserBaseV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UserBaseV2026R0"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserBaseV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserBaseV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "UserBaseV2026R0" to be defined',
    });
  }
  const type: UserBaseV2026R0TypeField = deserializeUserBaseV2026R0TypeField(
    val.type,
  );
  return { id: id, type: type } satisfies UserBaseV2026R0;
}
export function serializeUserBaseV2026R0Input(
  val: UserBaseV2026R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeUserBaseV2026R0TypeField(val.type),
  };
}
export function deserializeUserBaseV2026R0Input(
  val: SerializedData,
): UserBaseV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserBaseV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserBaseV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserBaseV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | UserBaseV2026R0TypeField =
    val.type == void 0 ? void 0 : deserializeUserBaseV2026R0TypeField(val.type);
  return { id: id, type: type } satisfies UserBaseV2026R0Input;
}

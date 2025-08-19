import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type UserReferenceV2025R0TypeField = 'user';
export class UserReferenceV2025R0 {
  /**
   * The value is always `user`. */
  readonly type: UserReferenceV2025R0TypeField =
    'user' as UserReferenceV2025R0TypeField;
  /**
   * The unique identifier for the user. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<UserReferenceV2025R0, 'type'> &
      Partial<Pick<UserReferenceV2025R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface UserReferenceV2025R0Input {
  /**
   * The value is always `user`. */
  readonly type?: UserReferenceV2025R0TypeField;
  /**
   * The unique identifier for the user. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeUserReferenceV2025R0TypeField(
  val: UserReferenceV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeUserReferenceV2025R0TypeField(
  val: SerializedData,
): UserReferenceV2025R0TypeField {
  if (val == 'user') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize UserReferenceV2025R0TypeField",
  });
}
export function serializeUserReferenceV2025R0(
  val: UserReferenceV2025R0,
): SerializedData {
  return {
    ['type']: serializeUserReferenceV2025R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeUserReferenceV2025R0(
  val: SerializedData,
): UserReferenceV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserReferenceV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "UserReferenceV2025R0" to be defined',
    });
  }
  const type: UserReferenceV2025R0TypeField =
    deserializeUserReferenceV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserReferenceV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserReferenceV2025R0"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies UserReferenceV2025R0;
}
export function serializeUserReferenceV2025R0Input(
  val: UserReferenceV2025R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeUserReferenceV2025R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeUserReferenceV2025R0Input(
  val: SerializedData,
): UserReferenceV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserReferenceV2025R0Input"',
    });
  }
  const type: undefined | UserReferenceV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeUserReferenceV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "UserReferenceV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserReferenceV2025R0Input"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies UserReferenceV2025R0Input;
}

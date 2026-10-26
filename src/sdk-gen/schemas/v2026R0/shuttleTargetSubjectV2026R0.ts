import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleTargetSubjectV2026R0TypeField = 'user' | 'group';
export interface ShuttleTargetSubjectV2026R0 {
  /**
   * Whether the Box target is a user or a group. */
  readonly type: ShuttleTargetSubjectV2026R0TypeField;
  /**
   * The Box user or group ID. `null` when the mapping was not created
   * through this API and is identified by email (user) or name (group)
   * instead. Skip is represented by `target: null`, not a missing `id`.
   * Create and update always send `id`. */
  readonly id?: string | null;
  /**
   * The email address of the target. `null` when unknown. */
  readonly email?: string | null;
  /**
   * The display name of the target. `null` when unknown. */
  readonly name?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeShuttleTargetSubjectV2026R0TypeField(
  val: ShuttleTargetSubjectV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttleTargetSubjectV2026R0TypeField(
  val: SerializedData
): ShuttleTargetSubjectV2026R0TypeField {
  if (val == 'user') {
    return val;
  }
  if (val == 'group') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleTargetSubjectV2026R0TypeField",
  });
}
export function serializeShuttleTargetSubjectV2026R0(
  val: ShuttleTargetSubjectV2026R0
): SerializedData {
  return {
    ['type']: serializeShuttleTargetSubjectV2026R0TypeField(val.type),
    ['id']: val.id,
    ['email']: val.email,
    ['name']: val.name,
  };
}
export function deserializeShuttleTargetSubjectV2026R0(
  val: SerializedData
): ShuttleTargetSubjectV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleTargetSubjectV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleTargetSubjectV2026R0" to be defined',
    });
  }
  const type: ShuttleTargetSubjectV2026R0TypeField =
    deserializeShuttleTargetSubjectV2026R0TypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleTargetSubjectV2026R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email" of type "ShuttleTargetSubjectV2026R0"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttleTargetSubjectV2026R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    type: type,
    id: id,
    email: email,
    name: name,
  } satisfies ShuttleTargetSubjectV2026R0;
}

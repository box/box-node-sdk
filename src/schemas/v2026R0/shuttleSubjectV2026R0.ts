import { serializeShuttleSubjectRoleV2026R0 } from './shuttleSubjectRoleV2026R0';
import { deserializeShuttleSubjectRoleV2026R0 } from './shuttleSubjectRoleV2026R0';
import { ShuttleSubjectRoleV2026R0 } from './shuttleSubjectRoleV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleSubjectV2026R0TypeField = 'user' | 'group';
export interface ShuttleSubjectV2026R0 {
  /**
   * Whether this subject is a user or a group. */
  readonly type: ShuttleSubjectV2026R0TypeField;
  /**
   * The platform-native identifier of the subject. `null` when the system
   * does not provide one. */
  readonly id?: string | null;
  /**
   * The email address of the subject. `null` when unknown. */
  readonly email?: string | null;
  /**
   * The display name of the subject. `null` when unknown. */
  readonly name?: string | null;
  /**
   * Roles this subject holds on the source. `null` when no roles are known. */
  readonly roles?: readonly ShuttleSubjectRoleV2026R0[] | null;
  readonly rawData?: SerializedData;
}
export function serializeShuttleSubjectV2026R0TypeField(
  val: ShuttleSubjectV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleSubjectV2026R0TypeField(
  val: SerializedData,
): ShuttleSubjectV2026R0TypeField {
  if (val == 'user') {
    return val;
  }
  if (val == 'group') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleSubjectV2026R0TypeField",
  });
}
export function serializeShuttleSubjectV2026R0(
  val: ShuttleSubjectV2026R0,
): SerializedData {
  return {
    ['type']: serializeShuttleSubjectV2026R0TypeField(val.type),
    ['id']: val.id,
    ['email']: val.email,
    ['name']: val.name,
    ['roles']:
      val.roles == void 0
        ? val.roles
        : (val.roles.map(function (
            item: ShuttleSubjectRoleV2026R0,
          ): SerializedData {
            return serializeShuttleSubjectRoleV2026R0(item);
          }) as readonly any[]),
  };
}
export function deserializeShuttleSubjectV2026R0(
  val: SerializedData,
): ShuttleSubjectV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSubjectV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "ShuttleSubjectV2026R0" to be defined',
    });
  }
  const type: ShuttleSubjectV2026R0TypeField =
    deserializeShuttleSubjectV2026R0TypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleSubjectV2026R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email" of type "ShuttleSubjectV2026R0"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ShuttleSubjectV2026R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.roles == void 0) && !sdIsList(val.roles)) {
    throw new BoxSdkError({
      message: 'Expecting array for "roles" of type "ShuttleSubjectV2026R0"',
    });
  }
  const roles: undefined | readonly ShuttleSubjectRoleV2026R0[] =
    val.roles == void 0
      ? void 0
      : sdIsList(val.roles)
        ? (val.roles.map(function (
            itm: SerializedData,
          ): ShuttleSubjectRoleV2026R0 {
            return deserializeShuttleSubjectRoleV2026R0(itm);
          }) as readonly any[])
        : [];
  return {
    type: type,
    id: id,
    email: email,
    name: name,
    roles: roles,
  } satisfies ShuttleSubjectV2026R0;
}

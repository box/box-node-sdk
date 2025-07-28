import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeGroupMini } from './groupMini.generated.js';
import { deserializeGroupMini } from './groupMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { UserMini } from './userMini.generated.js';
import { GroupMini } from './groupMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type GroupMembershipTypeField = 'group_membership';
export type GroupMembershipRoleField = 'member' | 'admin' | string;
export interface GroupMembership {
  /**
   * The unique identifier for this group membership. */
  readonly id?: string;
  /**
   * The value will always be `group_membership`. */
  readonly type?: GroupMembershipTypeField;
  readonly user?: UserMini;
  readonly group?: GroupMini;
  /**
   * The role of the user in the group. */
  readonly role?: GroupMembershipRoleField;
  /**
   * The time this membership was created. */
  readonly createdAt?: DateTime;
  /**
   * The time this membership was last modified. */
  readonly modifiedAt?: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeGroupMembershipTypeField(
  val: GroupMembershipTypeField,
): SerializedData {
  return val;
}
export function deserializeGroupMembershipTypeField(
  val: SerializedData,
): GroupMembershipTypeField {
  if (val == 'group_membership') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GroupMembershipTypeField",
  });
}
export function serializeGroupMembershipRoleField(
  val: GroupMembershipRoleField,
): SerializedData {
  return val;
}
export function deserializeGroupMembershipRoleField(
  val: SerializedData,
): GroupMembershipRoleField {
  if (val == 'member') {
    return val;
  }
  if (val == 'admin') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize GroupMembershipRoleField",
  });
}
export function serializeGroupMembership(val: GroupMembership): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeGroupMembershipTypeField(val.type),
    ['user']: val.user == void 0 ? val.user : serializeUserMini(val.user),
    ['group']: val.group == void 0 ? val.group : serializeGroupMini(val.group),
    ['role']:
      val.role == void 0
        ? val.role
        : serializeGroupMembershipRoleField(val.role),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
  };
}
export function deserializeGroupMembership(
  val: SerializedData,
): GroupMembership {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "GroupMembership"' });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "GroupMembership"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | GroupMembershipTypeField =
    val.type == void 0 ? void 0 : deserializeGroupMembershipTypeField(val.type);
  const user: undefined | UserMini =
    val.user == void 0 ? void 0 : deserializeUserMini(val.user);
  const group: undefined | GroupMini =
    val.group == void 0 ? void 0 : deserializeGroupMini(val.group);
  const role: undefined | GroupMembershipRoleField =
    val.role == void 0 ? void 0 : deserializeGroupMembershipRoleField(val.role);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "GroupMembership"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "GroupMembership"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  return {
    id: id,
    type: type,
    user: user,
    group: group,
    role: role,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
  } satisfies GroupMembership;
}

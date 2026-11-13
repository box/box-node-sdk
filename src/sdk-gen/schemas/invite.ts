import { serializeUserMini } from './userMini';
import { deserializeUserMini } from './userMini';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { UserMini } from './userMini';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type InviteTypeField = 'invite';
export type InviteInvitedToTypeField = 'enterprise';
export interface InviteInvitedToField {
  /**
   * The unique identifier for this enterprise. */
  readonly id?: string;
  /**
   * The value will always be `enterprise`. */
  readonly type?: InviteInvitedToTypeField;
  /**
   * The name of the enterprise. */
  readonly name?: string;
  readonly rawData?: SerializedData;
}
export class Invite {
  /**
   * The unique identifier for this invite. */
  readonly id!: string;
  /**
   * The value will always be `invite`. */
  readonly type: InviteTypeField = 'invite' as InviteTypeField;
  /**
   * A representation of a Box enterprise. */
  readonly invitedTo?: InviteInvitedToField;
  readonly actionableBy?: UserMini;
  readonly invitedBy?: UserMini;
  /**
   * The status of the invite. */
  readonly status?: string;
  /**
   * When the invite was created. */
  readonly createdAt?: DateTime;
  /**
   * When the invite was modified. */
  readonly modifiedAt?: DateTime;
  /**
   * The date and time when the user is added to the enterprise
   * automatically, or `null` if the user has to accept the invite. */
  readonly autoRollInAt?: DateTime | null;
  /**
   * Whether the user is added to the enterprise automatically, without
   * having to accept the invite. When `true`, `auto_roll_in_at` contains
   * the date and time of the roll-in. */
  readonly isAutoRollIn?: boolean;
  readonly rawData?: SerializedData;
  constructor(fields: Omit<Invite, 'type'> & Partial<Pick<Invite, 'type'>>) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.invitedTo !== undefined) {
      this.invitedTo = fields.invitedTo;
    }
    if (fields.actionableBy !== undefined) {
      this.actionableBy = fields.actionableBy;
    }
    if (fields.invitedBy !== undefined) {
      this.invitedBy = fields.invitedBy;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
    }
    if (fields.autoRollInAt !== undefined) {
      this.autoRollInAt = fields.autoRollInAt;
    }
    if (fields.isAutoRollIn !== undefined) {
      this.isAutoRollIn = fields.isAutoRollIn;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface InviteInput {
  /**
   * The unique identifier for this invite. */
  readonly id: string;
  /**
   * The value will always be `invite`. */
  readonly type?: InviteTypeField;
  /**
   * A representation of a Box enterprise. */
  readonly invitedTo?: InviteInvitedToField;
  readonly actionableBy?: UserMini;
  readonly invitedBy?: UserMini;
  /**
   * The status of the invite. */
  readonly status?: string;
  /**
   * When the invite was created. */
  readonly createdAt?: DateTime;
  /**
   * When the invite was modified. */
  readonly modifiedAt?: DateTime;
  /**
   * The date and time when the user is added to the enterprise
   * automatically, or `null` if the user has to accept the invite. */
  readonly autoRollInAt?: DateTime | null;
  /**
   * Whether the user is added to the enterprise automatically, without
   * having to accept the invite. When `true`, `auto_roll_in_at` contains
   * the date and time of the roll-in. */
  readonly isAutoRollIn?: boolean;
  readonly rawData?: SerializedData;
}
export function serializeInviteTypeField(val: InviteTypeField): SerializedData {
  return val;
}
export function deserializeInviteTypeField(
  val: SerializedData
): InviteTypeField {
  if (val == 'invite') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize InviteTypeField" });
}
export function serializeInviteInvitedToTypeField(
  val: InviteInvitedToTypeField
): SerializedData {
  return val;
}
export function deserializeInviteInvitedToTypeField(
  val: SerializedData
): InviteInvitedToTypeField {
  if (val == 'enterprise') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize InviteInvitedToTypeField",
  });
}
export function serializeInviteInvitedToField(
  val: InviteInvitedToField
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeInviteInvitedToTypeField(val.type),
    ['name']: val.name,
  };
}
export function deserializeInviteInvitedToField(
  val: SerializedData
): InviteInvitedToField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "InviteInvitedToField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "InviteInvitedToField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | InviteInvitedToTypeField =
    val.type == void 0 ? void 0 : deserializeInviteInvitedToTypeField(val.type);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "InviteInvitedToField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return { id: id, type: type, name: name } satisfies InviteInvitedToField;
}
export function serializeInvite(val: Invite): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeInviteTypeField(val.type),
    ['invited_to']:
      val.invitedTo == void 0
        ? val.invitedTo
        : serializeInviteInvitedToField(val.invitedTo),
    ['actionable_by']:
      val.actionableBy == void 0
        ? val.actionableBy
        : serializeUserMini(val.actionableBy),
    ['invited_by']:
      val.invitedBy == void 0
        ? val.invitedBy
        : serializeUserMini(val.invitedBy),
    ['status']: val.status,
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
    ['auto_roll_in_at']:
      val.autoRollInAt == void 0
        ? val.autoRollInAt
        : serializeDateTime(val.autoRollInAt),
    ['is_auto_roll_in']: val.isAutoRollIn,
  };
}
export function deserializeInvite(val: SerializedData): Invite {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Invite"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "Invite" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "Invite"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "Invite" to be defined',
    });
  }
  const type: InviteTypeField = deserializeInviteTypeField(val.type);
  const invitedTo: undefined | InviteInvitedToField =
    val.invited_to == void 0
      ? void 0
      : deserializeInviteInvitedToField(val.invited_to);
  const actionableBy: undefined | UserMini =
    val.actionable_by == void 0
      ? void 0
      : deserializeUserMini(val.actionable_by);
  const invitedBy: undefined | UserMini =
    val.invited_by == void 0 ? void 0 : deserializeUserMini(val.invited_by);
  if (!(val.status == void 0) && !sdIsString(val.status)) {
    throw new BoxSdkError({
      message: 'Expecting string for "status" of type "Invite"',
    });
  }
  const status: undefined | string = val.status == void 0 ? void 0 : val.status;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "Invite"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "Invite"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.auto_roll_in_at == void 0) && !sdIsString(val.auto_roll_in_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "auto_roll_in_at" of type "Invite"',
    });
  }
  const autoRollInAt: undefined | DateTime =
    val.auto_roll_in_at == void 0
      ? void 0
      : deserializeDateTime(val.auto_roll_in_at);
  if (!(val.is_auto_roll_in == void 0) && !sdIsBoolean(val.is_auto_roll_in)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_auto_roll_in" of type "Invite"',
    });
  }
  const isAutoRollIn: undefined | boolean =
    val.is_auto_roll_in == void 0 ? void 0 : val.is_auto_roll_in;
  return {
    id: id,
    type: type,
    invitedTo: invitedTo,
    actionableBy: actionableBy,
    invitedBy: invitedBy,
    status: status,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    autoRollInAt: autoRollInAt,
    isAutoRollIn: isAutoRollIn,
  } satisfies Invite;
}
export function serializeInviteInput(val: InviteInput): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeInviteTypeField(val.type),
    ['invited_to']:
      val.invitedTo == void 0
        ? val.invitedTo
        : serializeInviteInvitedToField(val.invitedTo),
    ['actionable_by']:
      val.actionableBy == void 0
        ? val.actionableBy
        : serializeUserMini(val.actionableBy),
    ['invited_by']:
      val.invitedBy == void 0
        ? val.invitedBy
        : serializeUserMini(val.invitedBy),
    ['status']: val.status,
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
    ['auto_roll_in_at']:
      val.autoRollInAt == void 0
        ? val.autoRollInAt
        : serializeDateTime(val.autoRollInAt),
    ['is_auto_roll_in']: val.isAutoRollIn,
  };
}
export function deserializeInviteInput(val: SerializedData): InviteInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "InviteInput"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "InviteInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "InviteInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | InviteTypeField =
    val.type == void 0 ? void 0 : deserializeInviteTypeField(val.type);
  const invitedTo: undefined | InviteInvitedToField =
    val.invited_to == void 0
      ? void 0
      : deserializeInviteInvitedToField(val.invited_to);
  const actionableBy: undefined | UserMini =
    val.actionable_by == void 0
      ? void 0
      : deserializeUserMini(val.actionable_by);
  const invitedBy: undefined | UserMini =
    val.invited_by == void 0 ? void 0 : deserializeUserMini(val.invited_by);
  if (!(val.status == void 0) && !sdIsString(val.status)) {
    throw new BoxSdkError({
      message: 'Expecting string for "status" of type "InviteInput"',
    });
  }
  const status: undefined | string = val.status == void 0 ? void 0 : val.status;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "InviteInput"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "InviteInput"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.auto_roll_in_at == void 0) && !sdIsString(val.auto_roll_in_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "auto_roll_in_at" of type "InviteInput"',
    });
  }
  const autoRollInAt: undefined | DateTime =
    val.auto_roll_in_at == void 0
      ? void 0
      : deserializeDateTime(val.auto_roll_in_at);
  if (!(val.is_auto_roll_in == void 0) && !sdIsBoolean(val.is_auto_roll_in)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_auto_roll_in" of type "InviteInput"',
    });
  }
  const isAutoRollIn: undefined | boolean =
    val.is_auto_roll_in == void 0 ? void 0 : val.is_auto_roll_in;
  return {
    id: id,
    type: type,
    invitedTo: invitedTo,
    actionableBy: actionableBy,
    invitedBy: invitedBy,
    status: status,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    autoRollInAt: autoRollInAt,
    isAutoRollIn: isAutoRollIn,
  } satisfies InviteInput;
}

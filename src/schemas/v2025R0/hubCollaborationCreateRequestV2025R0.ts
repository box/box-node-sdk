import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type HubCollaborationCreateRequestV2025R0HubTypeField = 'hubs';
export class HubCollaborationCreateRequestV2025R0HubField {
  /**
   * The value will always be `hubs`. */
  readonly type: HubCollaborationCreateRequestV2025R0HubTypeField =
    'hubs' as HubCollaborationCreateRequestV2025R0HubTypeField;
  /**
   * ID of the object. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<HubCollaborationCreateRequestV2025R0HubField, 'type'> &
      Partial<Pick<HubCollaborationCreateRequestV2025R0HubField, 'type'>>,
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
export interface HubCollaborationCreateRequestV2025R0HubFieldInput {
  /**
   * The value will always be `hubs`. */
  readonly type?: HubCollaborationCreateRequestV2025R0HubTypeField;
  /**
   * ID of the object. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export interface HubCollaborationCreateRequestV2025R0AccessibleByField {
  /**
   * The type of collaborator to invite.
   * Possible values are `user` or `group`. */
  readonly type: string;
  /**
   * The ID of the user or group.
   *
   * Alternatively, use `login` to specify a user by email
   * address. */
  readonly id?: string;
  /**
   * The email address of the user who gets access to the item.
   *
   * Alternatively, use `id` to specify a user by user ID. */
  readonly login?: string;
  readonly rawData?: SerializedData;
}
export interface HubCollaborationCreateRequestV2025R0 {
  /**
   * Box Hubs reference. */
  readonly hub: HubCollaborationCreateRequestV2025R0HubField;
  /**
   * The user or group who gets access to the item. */
  readonly accessibleBy: HubCollaborationCreateRequestV2025R0AccessibleByField;
  /**
   * The level of access granted to a Box Hub.
   * Possible values are `editor`, `viewer`, and `co-owner`. */
  readonly role: string;
  readonly rawData?: SerializedData;
}
export function serializeHubCollaborationCreateRequestV2025R0HubTypeField(
  val: HubCollaborationCreateRequestV2025R0HubTypeField,
): SerializedData {
  return val;
}
export function deserializeHubCollaborationCreateRequestV2025R0HubTypeField(
  val: SerializedData,
): HubCollaborationCreateRequestV2025R0HubTypeField {
  if (val == 'hubs') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize HubCollaborationCreateRequestV2025R0HubTypeField",
  });
}
export function serializeHubCollaborationCreateRequestV2025R0HubField(
  val: HubCollaborationCreateRequestV2025R0HubField,
): SerializedData {
  return {
    ['type']: serializeHubCollaborationCreateRequestV2025R0HubTypeField(
      val.type,
    ),
    ['id']: val.id,
  };
}
export function deserializeHubCollaborationCreateRequestV2025R0HubField(
  val: SerializedData,
): HubCollaborationCreateRequestV2025R0HubField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "HubCollaborationCreateRequestV2025R0HubField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "HubCollaborationCreateRequestV2025R0HubField" to be defined',
    });
  }
  const type: HubCollaborationCreateRequestV2025R0HubTypeField =
    deserializeHubCollaborationCreateRequestV2025R0HubTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "HubCollaborationCreateRequestV2025R0HubField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "HubCollaborationCreateRequestV2025R0HubField"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies HubCollaborationCreateRequestV2025R0HubField;
}
export function serializeHubCollaborationCreateRequestV2025R0HubFieldInput(
  val: HubCollaborationCreateRequestV2025R0HubFieldInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeHubCollaborationCreateRequestV2025R0HubTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeHubCollaborationCreateRequestV2025R0HubFieldInput(
  val: SerializedData,
): HubCollaborationCreateRequestV2025R0HubFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "HubCollaborationCreateRequestV2025R0HubFieldInput"',
    });
  }
  const type: undefined | HubCollaborationCreateRequestV2025R0HubTypeField =
    val.type == void 0
      ? void 0
      : deserializeHubCollaborationCreateRequestV2025R0HubTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "HubCollaborationCreateRequestV2025R0HubFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "HubCollaborationCreateRequestV2025R0HubFieldInput"',
    });
  }
  const id: string = val.id;
  return {
    type: type,
    id: id,
  } satisfies HubCollaborationCreateRequestV2025R0HubFieldInput;
}
export function serializeHubCollaborationCreateRequestV2025R0AccessibleByField(
  val: HubCollaborationCreateRequestV2025R0AccessibleByField,
): SerializedData {
  return { ['type']: val.type, ['id']: val.id, ['login']: val.login };
}
export function deserializeHubCollaborationCreateRequestV2025R0AccessibleByField(
  val: SerializedData,
): HubCollaborationCreateRequestV2025R0AccessibleByField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "HubCollaborationCreateRequestV2025R0AccessibleByField"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "HubCollaborationCreateRequestV2025R0AccessibleByField" to be defined',
    });
  }
  if (!sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "HubCollaborationCreateRequestV2025R0AccessibleByField"',
    });
  }
  const type: string = val.type;
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "HubCollaborationCreateRequestV2025R0AccessibleByField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "login" of type "HubCollaborationCreateRequestV2025R0AccessibleByField"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  return {
    type: type,
    id: id,
    login: login,
  } satisfies HubCollaborationCreateRequestV2025R0AccessibleByField;
}
export function serializeHubCollaborationCreateRequestV2025R0(
  val: HubCollaborationCreateRequestV2025R0,
): SerializedData {
  return {
    ['hub']: serializeHubCollaborationCreateRequestV2025R0HubField(val.hub),
    ['accessible_by']:
      serializeHubCollaborationCreateRequestV2025R0AccessibleByField(
        val.accessibleBy,
      ),
    ['role']: val.role,
  };
}
export function deserializeHubCollaborationCreateRequestV2025R0(
  val: SerializedData,
): HubCollaborationCreateRequestV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubCollaborationCreateRequestV2025R0"',
    });
  }
  if (val.hub == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "hub" of type "HubCollaborationCreateRequestV2025R0" to be defined',
    });
  }
  const hub: HubCollaborationCreateRequestV2025R0HubField =
    deserializeHubCollaborationCreateRequestV2025R0HubField(val.hub);
  if (val.accessible_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "accessible_by" of type "HubCollaborationCreateRequestV2025R0" to be defined',
    });
  }
  const accessibleBy: HubCollaborationCreateRequestV2025R0AccessibleByField =
    deserializeHubCollaborationCreateRequestV2025R0AccessibleByField(
      val.accessible_by,
    );
  if (val.role == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "role" of type "HubCollaborationCreateRequestV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.role)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "role" of type "HubCollaborationCreateRequestV2025R0"',
    });
  }
  const role: string = val.role;
  return {
    hub: hub,
    accessibleBy: accessibleBy,
    role: role,
  } satisfies HubCollaborationCreateRequestV2025R0;
}

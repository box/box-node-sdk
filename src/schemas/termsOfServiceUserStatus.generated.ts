import { serializeTermsOfServiceBase } from './termsOfServiceBase.generated.js';
import { deserializeTermsOfServiceBase } from './termsOfServiceBase.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { TermsOfServiceBase } from './termsOfServiceBase.generated.js';
import { UserMini } from './userMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type TermsOfServiceUserStatusTypeField = 'terms_of_service_user_status';
export class TermsOfServiceUserStatus {
  /**
   * The unique identifier for this terms of service user status. */
  readonly id!: string;
  /**
   * The value will always be `terms_of_service_user_status`. */
  readonly type: TermsOfServiceUserStatusTypeField =
    'terms_of_service_user_status' as TermsOfServiceUserStatusTypeField;
  readonly tos?: TermsOfServiceBase;
  readonly user?: UserMini;
  /**
   * If the user has accepted the terms of services. */
  readonly isAccepted?: boolean;
  /**
   * When the legal item was created. */
  readonly createdAt?: DateTime;
  /**
   * When the legal item was modified. */
  readonly modifiedAt?: DateTime;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TermsOfServiceUserStatus, 'type'> &
      Partial<Pick<TermsOfServiceUserStatus, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.tos !== undefined) {
      this.tos = fields.tos;
    }
    if (fields.user !== undefined) {
      this.user = fields.user;
    }
    if (fields.isAccepted !== undefined) {
      this.isAccepted = fields.isAccepted;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface TermsOfServiceUserStatusInput {
  /**
   * The unique identifier for this terms of service user status. */
  readonly id: string;
  /**
   * The value will always be `terms_of_service_user_status`. */
  readonly type?: TermsOfServiceUserStatusTypeField;
  readonly tos?: TermsOfServiceBase;
  readonly user?: UserMini;
  /**
   * If the user has accepted the terms of services. */
  readonly isAccepted?: boolean;
  /**
   * When the legal item was created. */
  readonly createdAt?: DateTime;
  /**
   * When the legal item was modified. */
  readonly modifiedAt?: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeTermsOfServiceUserStatusTypeField(
  val: TermsOfServiceUserStatusTypeField,
): SerializedData {
  return val;
}
export function deserializeTermsOfServiceUserStatusTypeField(
  val: SerializedData,
): TermsOfServiceUserStatusTypeField {
  if (val == 'terms_of_service_user_status') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TermsOfServiceUserStatusTypeField",
  });
}
export function serializeTermsOfServiceUserStatus(
  val: TermsOfServiceUserStatus,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeTermsOfServiceUserStatusTypeField(val.type),
    ['tos']: val.tos == void 0 ? val.tos : serializeTermsOfServiceBase(val.tos),
    ['user']: val.user == void 0 ? val.user : serializeUserMini(val.user),
    ['is_accepted']: val.isAccepted,
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
export function deserializeTermsOfServiceUserStatus(
  val: SerializedData,
): TermsOfServiceUserStatus {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TermsOfServiceUserStatus"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TermsOfServiceUserStatus" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TermsOfServiceUserStatus"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "TermsOfServiceUserStatus" to be defined',
    });
  }
  const type: TermsOfServiceUserStatusTypeField =
    deserializeTermsOfServiceUserStatusTypeField(val.type);
  const tos: undefined | TermsOfServiceBase =
    val.tos == void 0 ? void 0 : deserializeTermsOfServiceBase(val.tos);
  const user: undefined | UserMini =
    val.user == void 0 ? void 0 : deserializeUserMini(val.user);
  if (!(val.is_accepted == void 0) && !sdIsBoolean(val.is_accepted)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_accepted" of type "TermsOfServiceUserStatus"',
    });
  }
  const isAccepted: undefined | boolean =
    val.is_accepted == void 0 ? void 0 : val.is_accepted;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "TermsOfServiceUserStatus"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "modified_at" of type "TermsOfServiceUserStatus"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  return {
    id: id,
    type: type,
    tos: tos,
    user: user,
    isAccepted: isAccepted,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
  } satisfies TermsOfServiceUserStatus;
}
export function serializeTermsOfServiceUserStatusInput(
  val: TermsOfServiceUserStatusInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTermsOfServiceUserStatusTypeField(val.type),
    ['tos']: val.tos == void 0 ? val.tos : serializeTermsOfServiceBase(val.tos),
    ['user']: val.user == void 0 ? val.user : serializeUserMini(val.user),
    ['is_accepted']: val.isAccepted,
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
export function deserializeTermsOfServiceUserStatusInput(
  val: SerializedData,
): TermsOfServiceUserStatusInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TermsOfServiceUserStatusInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "TermsOfServiceUserStatusInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TermsOfServiceUserStatusInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | TermsOfServiceUserStatusTypeField =
    val.type == void 0
      ? void 0
      : deserializeTermsOfServiceUserStatusTypeField(val.type);
  const tos: undefined | TermsOfServiceBase =
    val.tos == void 0 ? void 0 : deserializeTermsOfServiceBase(val.tos);
  const user: undefined | UserMini =
    val.user == void 0 ? void 0 : deserializeUserMini(val.user);
  if (!(val.is_accepted == void 0) && !sdIsBoolean(val.is_accepted)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_accepted" of type "TermsOfServiceUserStatusInput"',
    });
  }
  const isAccepted: undefined | boolean =
    val.is_accepted == void 0 ? void 0 : val.is_accepted;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "TermsOfServiceUserStatusInput"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "modified_at" of type "TermsOfServiceUserStatusInput"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  return {
    id: id,
    type: type,
    tos: tos,
    user: user,
    isAccepted: isAccepted,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
  } satisfies TermsOfServiceUserStatusInput;
}

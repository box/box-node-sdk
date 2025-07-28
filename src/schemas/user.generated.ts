import { serializeUserBaseTypeField } from './userBase.generated.js';
import { deserializeUserBaseTypeField } from './userBase.generated.js';
import { serializeUserBase } from './userBase.generated.js';
import { deserializeUserBase } from './userBase.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { UserBaseTypeField } from './userBase.generated.js';
import { UserBase } from './userBase.generated.js';
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
export type UserStatusField =
  | 'active'
  | 'inactive'
  | 'cannot_delete_edit'
  | 'cannot_delete_edit_upload'
  | string;
export interface UserNotificationEmailField {
  /**
   * The email address to send the notifications to. */
  readonly email?: string;
  /**
   * Specifies if this email address has been confirmed. */
  readonly isConfirmed?: boolean;
  readonly rawData?: SerializedData;
}
export class User extends UserMini {
  readonly createdAt?: DateTime;
  readonly modifiedAt?: DateTime;
  readonly language?: string;
  readonly timezone?: string;
  readonly spaceAmount?: number;
  readonly spaceUsed?: number;
  readonly maxUploadSize?: number;
  readonly status?: UserStatusField;
  readonly jobTitle?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly avatarUrl?: string;
  readonly notificationEmail?: UserNotificationEmailField | null;
  constructor(fields: User) {
    super(fields);
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
    }
    if (fields.language !== undefined) {
      this.language = fields.language;
    }
    if (fields.timezone !== undefined) {
      this.timezone = fields.timezone;
    }
    if (fields.spaceAmount !== undefined) {
      this.spaceAmount = fields.spaceAmount;
    }
    if (fields.spaceUsed !== undefined) {
      this.spaceUsed = fields.spaceUsed;
    }
    if (fields.maxUploadSize !== undefined) {
      this.maxUploadSize = fields.maxUploadSize;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
    }
    if (fields.jobTitle !== undefined) {
      this.jobTitle = fields.jobTitle;
    }
    if (fields.phone !== undefined) {
      this.phone = fields.phone;
    }
    if (fields.address !== undefined) {
      this.address = fields.address;
    }
    if (fields.avatarUrl !== undefined) {
      this.avatarUrl = fields.avatarUrl;
    }
    if (fields.notificationEmail !== undefined) {
      this.notificationEmail = fields.notificationEmail;
    }
  }
}
export function serializeUserStatusField(val: UserStatusField): SerializedData {
  return val;
}
export function deserializeUserStatusField(
  val: SerializedData,
): UserStatusField {
  if (val == 'active') {
    return val;
  }
  if (val == 'inactive') {
    return val;
  }
  if (val == 'cannot_delete_edit') {
    return val;
  }
  if (val == 'cannot_delete_edit_upload') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize UserStatusField" });
}
export function serializeUserNotificationEmailField(
  val: UserNotificationEmailField,
): SerializedData {
  return { ['email']: val.email, ['is_confirmed']: val.isConfirmed };
}
export function deserializeUserNotificationEmailField(
  val: SerializedData,
): UserNotificationEmailField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserNotificationEmailField"',
    });
  }
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email" of type "UserNotificationEmailField"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  if (!(val.is_confirmed == void 0) && !sdIsBoolean(val.is_confirmed)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_confirmed" of type "UserNotificationEmailField"',
    });
  }
  const isConfirmed: undefined | boolean =
    val.is_confirmed == void 0 ? void 0 : val.is_confirmed;
  return {
    email: email,
    isConfirmed: isConfirmed,
  } satisfies UserNotificationEmailField;
}
export function serializeUser(val: User): SerializedData {
  const base: any = serializeUserMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "User"' });
  }
  return {
    ...base,
    ...{
      ['created_at']:
        val.createdAt == void 0
          ? val.createdAt
          : serializeDateTime(val.createdAt),
      ['modified_at']:
        val.modifiedAt == void 0
          ? val.modifiedAt
          : serializeDateTime(val.modifiedAt),
      ['language']: val.language,
      ['timezone']: val.timezone,
      ['space_amount']: val.spaceAmount,
      ['space_used']: val.spaceUsed,
      ['max_upload_size']: val.maxUploadSize,
      ['status']:
        val.status == void 0
          ? val.status
          : serializeUserStatusField(val.status),
      ['job_title']: val.jobTitle,
      ['phone']: val.phone,
      ['address']: val.address,
      ['avatar_url']: val.avatarUrl,
      ['notification_email']:
        val.notificationEmail == void 0
          ? val.notificationEmail
          : serializeUserNotificationEmailField(val.notificationEmail),
    },
  };
}
export function deserializeUser(val: SerializedData): User {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "User"' });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "User"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "User"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.language == void 0) && !sdIsString(val.language)) {
    throw new BoxSdkError({
      message: 'Expecting string for "language" of type "User"',
    });
  }
  const language: undefined | string =
    val.language == void 0 ? void 0 : val.language;
  if (!(val.timezone == void 0) && !sdIsString(val.timezone)) {
    throw new BoxSdkError({
      message: 'Expecting string for "timezone" of type "User"',
    });
  }
  const timezone: undefined | string =
    val.timezone == void 0 ? void 0 : val.timezone;
  if (!(val.space_amount == void 0) && !sdIsNumber(val.space_amount)) {
    throw new BoxSdkError({
      message: 'Expecting number for "space_amount" of type "User"',
    });
  }
  const spaceAmount: undefined | number =
    val.space_amount == void 0 ? void 0 : val.space_amount;
  if (!(val.space_used == void 0) && !sdIsNumber(val.space_used)) {
    throw new BoxSdkError({
      message: 'Expecting number for "space_used" of type "User"',
    });
  }
  const spaceUsed: undefined | number =
    val.space_used == void 0 ? void 0 : val.space_used;
  if (!(val.max_upload_size == void 0) && !sdIsNumber(val.max_upload_size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "max_upload_size" of type "User"',
    });
  }
  const maxUploadSize: undefined | number =
    val.max_upload_size == void 0 ? void 0 : val.max_upload_size;
  const status: undefined | UserStatusField =
    val.status == void 0 ? void 0 : deserializeUserStatusField(val.status);
  if (!(val.job_title == void 0) && !sdIsString(val.job_title)) {
    throw new BoxSdkError({
      message: 'Expecting string for "job_title" of type "User"',
    });
  }
  const jobTitle: undefined | string =
    val.job_title == void 0 ? void 0 : val.job_title;
  if (!(val.phone == void 0) && !sdIsString(val.phone)) {
    throw new BoxSdkError({
      message: 'Expecting string for "phone" of type "User"',
    });
  }
  const phone: undefined | string = val.phone == void 0 ? void 0 : val.phone;
  if (!(val.address == void 0) && !sdIsString(val.address)) {
    throw new BoxSdkError({
      message: 'Expecting string for "address" of type "User"',
    });
  }
  const address: undefined | string =
    val.address == void 0 ? void 0 : val.address;
  if (!(val.avatar_url == void 0) && !sdIsString(val.avatar_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "avatar_url" of type "User"',
    });
  }
  const avatarUrl: undefined | string =
    val.avatar_url == void 0 ? void 0 : val.avatar_url;
  const notificationEmail: undefined | UserNotificationEmailField =
    val.notification_email == void 0
      ? void 0
      : deserializeUserNotificationEmailField(val.notification_email);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "User"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message: 'Expecting string for "login" of type "User"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "User" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "User"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "User" to be defined',
    });
  }
  const type: UserBaseTypeField = deserializeUserBaseTypeField(val.type);
  return {
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    language: language,
    timezone: timezone,
    spaceAmount: spaceAmount,
    spaceUsed: spaceUsed,
    maxUploadSize: maxUploadSize,
    status: status,
    jobTitle: jobTitle,
    phone: phone,
    address: address,
    avatarUrl: avatarUrl,
    notificationEmail: notificationEmail,
    name: name,
    login: login,
    id: id,
    type: type,
  } satisfies User;
}

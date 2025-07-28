import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { FolderMini } from './folderMini.generated.js';
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
export type FileRequestTypeField = 'file_request';
export type FileRequestStatusField = 'active' | 'inactive' | string;
export class FileRequest {
  /**
   * The unique identifier for this file request. */
  readonly id!: string;
  /**
   * The value will always be `file_request`. */
  readonly type: FileRequestTypeField = 'file_request' as FileRequestTypeField;
  /**
   * The title of file request. This is shown
   * in the Box UI to users uploading files.
   *
   * This defaults to title of the file request that was
   * copied to create this file request. */
  readonly title?: string;
  /**
   * The optional description of this file request. This is
   * shown in the Box UI to users uploading files.
   *
   * This defaults to description of the file request that was
   * copied to create this file request. */
  readonly description?: string | null;
  /**
   * The status of the file request. This defaults
   * to `active`.
   *
   * When the status is set to `inactive`, the file request
   * will no longer accept new submissions, and any visitor
   * to the file request URL will receive a `HTTP 404` status
   * code.
   *
   * This defaults to status of file request that was
   * copied to create this file request. */
  readonly status?: FileRequestStatusField;
  /**
   * Whether a file request submitter is required to provide
   * their email address.
   *
   * When this setting is set to true, the Box UI will show
   * an email field on the file request form.
   *
   * This defaults to setting of file request that was
   * copied to create this file request. */
  readonly isEmailRequired?: boolean;
  /**
   * Whether a file request submitter is required to provide
   * a description of the files they are submitting.
   *
   * When this setting is set to true, the Box UI will show
   * a description field on the file request form.
   *
   * This defaults to setting of file request that was
   * copied to create this file request. */
  readonly isDescriptionRequired?: boolean;
  /**
   * The date after which a file request will no longer accept new
   * submissions.
   *
   * After this date, the `status` will automatically be set to
   * `inactive`. */
  readonly expiresAt?: DateTime;
  readonly folder!: FolderMini;
  /**
   * The generated URL for this file request. This URL can be shared
   * with users to let them upload files to the associated folder. */
  readonly url?: string;
  /**
   * The HTTP `etag` of this file. This can be used in combination with
   * the `If-Match` header when updating a file request. By providing that
   * header, a change will only be performed on the  file request if the `etag`
   * on the file request still matches the `etag` provided in the `If-Match`
   * header. */
  readonly etag?: string | null;
  readonly createdBy?: UserMini;
  /**
   * The date and time when the file request was created. */
  readonly createdAt!: DateTime;
  readonly updatedBy?: UserMini;
  /**
   * The date and time when the file request was last updated. */
  readonly updatedAt!: DateTime;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<FileRequest, 'type'> & Partial<Pick<FileRequest, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.title !== undefined) {
      this.title = fields.title;
    }
    if (fields.description !== undefined) {
      this.description = fields.description;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
    }
    if (fields.isEmailRequired !== undefined) {
      this.isEmailRequired = fields.isEmailRequired;
    }
    if (fields.isDescriptionRequired !== undefined) {
      this.isDescriptionRequired = fields.isDescriptionRequired;
    }
    if (fields.expiresAt !== undefined) {
      this.expiresAt = fields.expiresAt;
    }
    if (fields.folder !== undefined) {
      this.folder = fields.folder;
    }
    if (fields.url !== undefined) {
      this.url = fields.url;
    }
    if (fields.etag !== undefined) {
      this.etag = fields.etag;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.updatedBy !== undefined) {
      this.updatedBy = fields.updatedBy;
    }
    if (fields.updatedAt !== undefined) {
      this.updatedAt = fields.updatedAt;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface FileRequestInput {
  /**
   * The unique identifier for this file request. */
  readonly id: string;
  /**
   * The value will always be `file_request`. */
  readonly type?: FileRequestTypeField;
  /**
   * The title of file request. This is shown
   * in the Box UI to users uploading files.
   *
   * This defaults to title of the file request that was
   * copied to create this file request. */
  readonly title?: string;
  /**
   * The optional description of this file request. This is
   * shown in the Box UI to users uploading files.
   *
   * This defaults to description of the file request that was
   * copied to create this file request. */
  readonly description?: string | null;
  /**
   * The status of the file request. This defaults
   * to `active`.
   *
   * When the status is set to `inactive`, the file request
   * will no longer accept new submissions, and any visitor
   * to the file request URL will receive a `HTTP 404` status
   * code.
   *
   * This defaults to status of file request that was
   * copied to create this file request. */
  readonly status?: FileRequestStatusField;
  /**
   * Whether a file request submitter is required to provide
   * their email address.
   *
   * When this setting is set to true, the Box UI will show
   * an email field on the file request form.
   *
   * This defaults to setting of file request that was
   * copied to create this file request. */
  readonly isEmailRequired?: boolean;
  /**
   * Whether a file request submitter is required to provide
   * a description of the files they are submitting.
   *
   * When this setting is set to true, the Box UI will show
   * a description field on the file request form.
   *
   * This defaults to setting of file request that was
   * copied to create this file request. */
  readonly isDescriptionRequired?: boolean;
  /**
   * The date after which a file request will no longer accept new
   * submissions.
   *
   * After this date, the `status` will automatically be set to
   * `inactive`. */
  readonly expiresAt?: DateTime;
  readonly folder: FolderMini;
  /**
   * The generated URL for this file request. This URL can be shared
   * with users to let them upload files to the associated folder. */
  readonly url?: string;
  /**
   * The HTTP `etag` of this file. This can be used in combination with
   * the `If-Match` header when updating a file request. By providing that
   * header, a change will only be performed on the  file request if the `etag`
   * on the file request still matches the `etag` provided in the `If-Match`
   * header. */
  readonly etag?: string | null;
  readonly createdBy?: UserMini;
  /**
   * The date and time when the file request was created. */
  readonly createdAt: DateTime;
  readonly updatedBy?: UserMini;
  /**
   * The date and time when the file request was last updated. */
  readonly updatedAt: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeFileRequestTypeField(
  val: FileRequestTypeField,
): SerializedData {
  return val;
}
export function deserializeFileRequestTypeField(
  val: SerializedData,
): FileRequestTypeField {
  if (val == 'file_request') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize FileRequestTypeField" });
}
export function serializeFileRequestStatusField(
  val: FileRequestStatusField,
): SerializedData {
  return val;
}
export function deserializeFileRequestStatusField(
  val: SerializedData,
): FileRequestStatusField {
  if (val == 'active') {
    return val;
  }
  if (val == 'inactive') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileRequestStatusField",
  });
}
export function serializeFileRequest(val: FileRequest): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeFileRequestTypeField(val.type),
    ['title']: val.title,
    ['description']: val.description,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeFileRequestStatusField(val.status),
    ['is_email_required']: val.isEmailRequired,
    ['is_description_required']: val.isDescriptionRequired,
    ['expires_at']:
      val.expiresAt == void 0
        ? val.expiresAt
        : serializeDateTime(val.expiresAt),
    ['folder']: serializeFolderMini(val.folder),
    ['url']: val.url,
    ['etag']: val.etag,
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMini(val.createdBy),
    ['created_at']: serializeDateTime(val.createdAt),
    ['updated_by']:
      val.updatedBy == void 0
        ? val.updatedBy
        : serializeUserMini(val.updatedBy),
    ['updated_at']: serializeDateTime(val.updatedAt),
  };
}
export function deserializeFileRequest(val: SerializedData): FileRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileRequest"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileRequest" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileRequest"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FileRequest" to be defined',
    });
  }
  const type: FileRequestTypeField = deserializeFileRequestTypeField(val.type);
  if (!(val.title == void 0) && !sdIsString(val.title)) {
    throw new BoxSdkError({
      message: 'Expecting string for "title" of type "FileRequest"',
    });
  }
  const title: undefined | string = val.title == void 0 ? void 0 : val.title;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "FileRequest"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const status: undefined | FileRequestStatusField =
    val.status == void 0
      ? void 0
      : deserializeFileRequestStatusField(val.status);
  if (
    !(val.is_email_required == void 0) &&
    !sdIsBoolean(val.is_email_required)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_email_required" of type "FileRequest"',
    });
  }
  const isEmailRequired: undefined | boolean =
    val.is_email_required == void 0 ? void 0 : val.is_email_required;
  if (
    !(val.is_description_required == void 0) &&
    !sdIsBoolean(val.is_description_required)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_description_required" of type "FileRequest"',
    });
  }
  const isDescriptionRequired: undefined | boolean =
    val.is_description_required == void 0
      ? void 0
      : val.is_description_required;
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "expires_at" of type "FileRequest"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  if (val.folder == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "folder" of type "FileRequest" to be defined',
    });
  }
  const folder: FolderMini = deserializeFolderMini(val.folder);
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "FileRequest"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "FileRequest"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "created_at" of type "FileRequest" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "FileRequest"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  const updatedBy: undefined | UserMini =
    val.updated_by == void 0 ? void 0 : deserializeUserMini(val.updated_by);
  if (val.updated_at == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "updated_at" of type "FileRequest" to be defined',
    });
  }
  if (!sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "updated_at" of type "FileRequest"',
    });
  }
  const updatedAt: DateTime = deserializeDateTime(val.updated_at);
  return {
    id: id,
    type: type,
    title: title,
    description: description,
    status: status,
    isEmailRequired: isEmailRequired,
    isDescriptionRequired: isDescriptionRequired,
    expiresAt: expiresAt,
    folder: folder,
    url: url,
    etag: etag,
    createdBy: createdBy,
    createdAt: createdAt,
    updatedBy: updatedBy,
    updatedAt: updatedAt,
  } satisfies FileRequest;
}
export function serializeFileRequestInput(
  val: FileRequestInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeFileRequestTypeField(val.type),
    ['title']: val.title,
    ['description']: val.description,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeFileRequestStatusField(val.status),
    ['is_email_required']: val.isEmailRequired,
    ['is_description_required']: val.isDescriptionRequired,
    ['expires_at']:
      val.expiresAt == void 0
        ? val.expiresAt
        : serializeDateTime(val.expiresAt),
    ['folder']: serializeFolderMini(val.folder),
    ['url']: val.url,
    ['etag']: val.etag,
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMini(val.createdBy),
    ['created_at']: serializeDateTime(val.createdAt),
    ['updated_by']:
      val.updatedBy == void 0
        ? val.updatedBy
        : serializeUserMini(val.updatedBy),
    ['updated_at']: serializeDateTime(val.updatedAt),
  };
}
export function deserializeFileRequestInput(
  val: SerializedData,
): FileRequestInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileRequestInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileRequestInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileRequestInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | FileRequestTypeField =
    val.type == void 0 ? void 0 : deserializeFileRequestTypeField(val.type);
  if (!(val.title == void 0) && !sdIsString(val.title)) {
    throw new BoxSdkError({
      message: 'Expecting string for "title" of type "FileRequestInput"',
    });
  }
  const title: undefined | string = val.title == void 0 ? void 0 : val.title;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "FileRequestInput"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const status: undefined | FileRequestStatusField =
    val.status == void 0
      ? void 0
      : deserializeFileRequestStatusField(val.status);
  if (
    !(val.is_email_required == void 0) &&
    !sdIsBoolean(val.is_email_required)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_email_required" of type "FileRequestInput"',
    });
  }
  const isEmailRequired: undefined | boolean =
    val.is_email_required == void 0 ? void 0 : val.is_email_required;
  if (
    !(val.is_description_required == void 0) &&
    !sdIsBoolean(val.is_description_required)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_description_required" of type "FileRequestInput"',
    });
  }
  const isDescriptionRequired: undefined | boolean =
    val.is_description_required == void 0
      ? void 0
      : val.is_description_required;
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "expires_at" of type "FileRequestInput"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  if (val.folder == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "folder" of type "FileRequestInput" to be defined',
    });
  }
  const folder: FolderMini = deserializeFolderMini(val.folder);
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "FileRequestInput"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "FileRequestInput"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_at" of type "FileRequestInput" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "FileRequestInput"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  const updatedBy: undefined | UserMini =
    val.updated_by == void 0 ? void 0 : deserializeUserMini(val.updated_by);
  if (val.updated_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "updated_at" of type "FileRequestInput" to be defined',
    });
  }
  if (!sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "updated_at" of type "FileRequestInput"',
    });
  }
  const updatedAt: DateTime = deserializeDateTime(val.updated_at);
  return {
    id: id,
    type: type,
    title: title,
    description: description,
    status: status,
    isEmailRequired: isEmailRequired,
    isDescriptionRequired: isDescriptionRequired,
    expiresAt: expiresAt,
    folder: folder,
    url: url,
    etag: etag,
    createdBy: createdBy,
    createdAt: createdAt,
    updatedBy: updatedBy,
    updatedAt: updatedAt,
  } satisfies FileRequestInput;
}

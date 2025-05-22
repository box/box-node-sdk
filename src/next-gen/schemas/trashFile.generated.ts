import { serializeFileVersionMini } from './fileVersionMini.generated.js';
import { deserializeFileVersionMini } from './fileVersionMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { FileVersionMini } from './fileVersionMini.generated.js';
import { UserMini } from './userMini.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type TrashFileTypeField = 'file';
export type TrashFilePathCollectionEntriesTypeField = 'folder';
export interface TrashFilePathCollectionEntriesField {
  /**
   * `folder` */
  readonly type?: TrashFilePathCollectionEntriesTypeField;
  /**
   * The unique identifier that represent a folder. */
  readonly id?: string;
  /**
   * This field is null for the Trash folder */
  readonly sequenceId?: string | null;
  /**
   * This field is null for the Trash folder */
  readonly etag?: string | null;
  /**
   * The name of the Trash folder. */
  readonly name?: string;
  readonly rawData?: SerializedData;
}
export interface TrashFilePathCollectionField {
  /**
   * The number of folders in this list. */
  readonly totalCount: number;
  /**
   * Array of folders for this item's path collection */
  readonly entries: readonly TrashFilePathCollectionEntriesField[];
  readonly rawData?: SerializedData;
}
export type TrashFileItemStatusField =
  | 'active'
  | 'trashed'
  | 'deleted'
  | string;
export class TrashFile {
  /**
   * The unique identifier that represent a file.
   *
   * The ID for any file can be determined
   * by visiting a file in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/files/123`
   * the `file_id` is `123`. */
  readonly id!: string;
  /**
   * The HTTP `etag` of this file. This can be used within some API
   * endpoints in the `If-Match` and `If-None-Match` headers to only
   * perform changes on the file if (no) changes have happened. */
  readonly etag?: string | null;
  /**
   * `file` */
  readonly type: TrashFileTypeField = 'file' as TrashFileTypeField;
  readonly sequenceId!: string;
  /**
   * The name of the file */
  readonly name?: string;
  /**
   * The SHA1 hash of the file. This can be used to compare the contents
   * of a file on Box with a local file. */
  readonly sha1!: string;
  readonly fileVersion?: FileVersionMini;
  /**
   * The optional description of this file */
  readonly description!: string;
  /**
   * The file size in bytes. Be careful parsing this integer as it can
   * get very large and cause an integer overflow. */
  readonly size!: number;
  readonly pathCollection!: TrashFilePathCollectionField;
  /**
   * The date and time when the file was created on Box. */
  readonly createdAt!: DateTime;
  /**
   * The date and time when the file was last updated on Box. */
  readonly modifiedAt!: DateTime;
  /**
   * The time at which this file was put in the trash. */
  readonly trashedAt?: DateTime | null;
  /**
   * The time at which this file is expected to be purged
   * from the trash. */
  readonly purgedAt?: DateTime | null;
  /**
   * The date and time at which this file was originally
   * created, which might be before it was uploaded to Box. */
  readonly contentCreatedAt?: DateTime | null;
  /**
   * The date and time at which this file was last updated,
   * which might be before it was uploaded to Box. */
  readonly contentModifiedAt?: DateTime | null;
  readonly createdBy?: UserMini;
  readonly modifiedBy!: UserMini;
  readonly ownedBy!: UserMini;
  /**
   * The shared link for this file. This will
   * be `null` if a file has been trashed, since the link will no longer
   * be active. */
  readonly sharedLink?: string | null;
  readonly parent?: FolderMini;
  /**
   * Defines if this item has been deleted or not.
   *
   * * `active` when the item has is not in the trash
   * * `trashed` when the item has been moved to the trash but not deleted
   * * `deleted` when the item has been permanently deleted. */
  readonly itemStatus!: TrashFileItemStatusField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TrashFile, 'type'> & Partial<Pick<TrashFile, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.etag !== undefined) {
      this.etag = fields.etag;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.sequenceId !== undefined) {
      this.sequenceId = fields.sequenceId;
    }
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.sha1 !== undefined) {
      this.sha1 = fields.sha1;
    }
    if (fields.fileVersion !== undefined) {
      this.fileVersion = fields.fileVersion;
    }
    if (fields.description !== undefined) {
      this.description = fields.description;
    }
    if (fields.size !== undefined) {
      this.size = fields.size;
    }
    if (fields.pathCollection !== undefined) {
      this.pathCollection = fields.pathCollection;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
    }
    if (fields.trashedAt !== undefined) {
      this.trashedAt = fields.trashedAt;
    }
    if (fields.purgedAt !== undefined) {
      this.purgedAt = fields.purgedAt;
    }
    if (fields.contentCreatedAt !== undefined) {
      this.contentCreatedAt = fields.contentCreatedAt;
    }
    if (fields.contentModifiedAt !== undefined) {
      this.contentModifiedAt = fields.contentModifiedAt;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.modifiedBy !== undefined) {
      this.modifiedBy = fields.modifiedBy;
    }
    if (fields.ownedBy !== undefined) {
      this.ownedBy = fields.ownedBy;
    }
    if (fields.sharedLink !== undefined) {
      this.sharedLink = fields.sharedLink;
    }
    if (fields.parent !== undefined) {
      this.parent = fields.parent;
    }
    if (fields.itemStatus !== undefined) {
      this.itemStatus = fields.itemStatus;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface TrashFileInput {
  /**
   * The unique identifier that represent a file.
   *
   * The ID for any file can be determined
   * by visiting a file in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/files/123`
   * the `file_id` is `123`. */
  readonly id: string;
  /**
   * The HTTP `etag` of this file. This can be used within some API
   * endpoints in the `If-Match` and `If-None-Match` headers to only
   * perform changes on the file if (no) changes have happened. */
  readonly etag?: string | null;
  /**
   * `file` */
  readonly type?: TrashFileTypeField;
  readonly sequenceId: string;
  /**
   * The name of the file */
  readonly name?: string;
  /**
   * The SHA1 hash of the file. This can be used to compare the contents
   * of a file on Box with a local file. */
  readonly sha1: string;
  readonly fileVersion?: FileVersionMini;
  /**
   * The optional description of this file */
  readonly description: string;
  /**
   * The file size in bytes. Be careful parsing this integer as it can
   * get very large and cause an integer overflow. */
  readonly size: number;
  readonly pathCollection: TrashFilePathCollectionField;
  /**
   * The date and time when the file was created on Box. */
  readonly createdAt: DateTime;
  /**
   * The date and time when the file was last updated on Box. */
  readonly modifiedAt: DateTime;
  /**
   * The time at which this file was put in the trash. */
  readonly trashedAt?: DateTime | null;
  /**
   * The time at which this file is expected to be purged
   * from the trash. */
  readonly purgedAt?: DateTime | null;
  /**
   * The date and time at which this file was originally
   * created, which might be before it was uploaded to Box. */
  readonly contentCreatedAt?: DateTime | null;
  /**
   * The date and time at which this file was last updated,
   * which might be before it was uploaded to Box. */
  readonly contentModifiedAt?: DateTime | null;
  readonly createdBy?: UserMini;
  readonly modifiedBy: UserMini;
  readonly ownedBy: UserMini;
  /**
   * The shared link for this file. This will
   * be `null` if a file has been trashed, since the link will no longer
   * be active. */
  readonly sharedLink?: string | null;
  readonly parent?: FolderMini;
  /**
   * Defines if this item has been deleted or not.
   *
   * * `active` when the item has is not in the trash
   * * `trashed` when the item has been moved to the trash but not deleted
   * * `deleted` when the item has been permanently deleted. */
  readonly itemStatus: TrashFileItemStatusField;
  readonly rawData?: SerializedData;
}
export function serializeTrashFileTypeField(
  val: TrashFileTypeField,
): SerializedData {
  return val;
}
export function deserializeTrashFileTypeField(
  val: SerializedData,
): TrashFileTypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize TrashFileTypeField" });
}
export function serializeTrashFilePathCollectionEntriesTypeField(
  val: TrashFilePathCollectionEntriesTypeField,
): SerializedData {
  return val;
}
export function deserializeTrashFilePathCollectionEntriesTypeField(
  val: SerializedData,
): TrashFilePathCollectionEntriesTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TrashFilePathCollectionEntriesTypeField",
  });
}
export function serializeTrashFilePathCollectionEntriesField(
  val: TrashFilePathCollectionEntriesField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTrashFilePathCollectionEntriesTypeField(val.type),
    ['id']: val.id,
    ['sequence_id']: val.sequenceId,
    ['etag']: val.etag,
    ['name']: val.name,
  };
}
export function deserializeTrashFilePathCollectionEntriesField(
  val: SerializedData,
): TrashFilePathCollectionEntriesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TrashFilePathCollectionEntriesField"',
    });
  }
  const type: undefined | TrashFilePathCollectionEntriesTypeField =
    val.type == void 0
      ? void 0
      : deserializeTrashFilePathCollectionEntriesTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TrashFilePathCollectionEntriesField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "sequence_id" of type "TrashFilePathCollectionEntriesField"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "etag" of type "TrashFilePathCollectionEntriesField"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "TrashFilePathCollectionEntriesField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    type: type,
    id: id,
    sequenceId: sequenceId,
    etag: etag,
    name: name,
  } satisfies TrashFilePathCollectionEntriesField;
}
export function serializeTrashFilePathCollectionField(
  val: TrashFilePathCollectionField,
): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']: val.entries.map(function (
      item: TrashFilePathCollectionEntriesField,
    ): SerializedData {
      return serializeTrashFilePathCollectionEntriesField(item);
    }) as readonly any[],
  };
}
export function deserializeTrashFilePathCollectionField(
  val: SerializedData,
): TrashFilePathCollectionField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TrashFilePathCollectionField"',
    });
  }
  if (val.total_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "total_count" of type "TrashFilePathCollectionField" to be defined',
    });
  }
  if (!sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_count" of type "TrashFilePathCollectionField"',
    });
  }
  const totalCount: number = val.total_count;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "TrashFilePathCollectionField" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "TrashFilePathCollectionField"',
    });
  }
  const entries: readonly TrashFilePathCollectionEntriesField[] = sdIsList(
    val.entries,
  )
    ? (val.entries.map(function (
        itm: SerializedData,
      ): TrashFilePathCollectionEntriesField {
        return deserializeTrashFilePathCollectionEntriesField(itm);
      }) as readonly any[])
    : [];
  return {
    totalCount: totalCount,
    entries: entries,
  } satisfies TrashFilePathCollectionField;
}
export function serializeTrashFileItemStatusField(
  val: TrashFileItemStatusField,
): SerializedData {
  return val;
}
export function deserializeTrashFileItemStatusField(
  val: SerializedData,
): TrashFileItemStatusField {
  if (val == 'active') {
    return val;
  }
  if (val == 'trashed') {
    return val;
  }
  if (val == 'deleted') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TrashFileItemStatusField",
  });
}
export function serializeTrashFile(val: TrashFile): SerializedData {
  return {
    ['id']: val.id,
    ['etag']: val.etag,
    ['type']: serializeTrashFileTypeField(val.type),
    ['sequence_id']: val.sequenceId,
    ['name']: val.name,
    ['sha1']: val.sha1,
    ['file_version']:
      val.fileVersion == void 0
        ? val.fileVersion
        : serializeFileVersionMini(val.fileVersion),
    ['description']: val.description,
    ['size']: val.size,
    ['path_collection']: serializeTrashFilePathCollectionField(
      val.pathCollection,
    ),
    ['created_at']: serializeDateTime(val.createdAt),
    ['modified_at']: serializeDateTime(val.modifiedAt),
    ['trashed_at']:
      val.trashedAt == void 0
        ? val.trashedAt
        : serializeDateTime(val.trashedAt),
    ['purged_at']:
      val.purgedAt == void 0 ? val.purgedAt : serializeDateTime(val.purgedAt),
    ['content_created_at']:
      val.contentCreatedAt == void 0
        ? val.contentCreatedAt
        : serializeDateTime(val.contentCreatedAt),
    ['content_modified_at']:
      val.contentModifiedAt == void 0
        ? val.contentModifiedAt
        : serializeDateTime(val.contentModifiedAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMini(val.createdBy),
    ['modified_by']: serializeUserMini(val.modifiedBy),
    ['owned_by']: serializeUserMini(val.ownedBy),
    ['shared_link']: val.sharedLink,
    ['parent']:
      val.parent == void 0 ? val.parent : serializeFolderMini(val.parent),
    ['item_status']: serializeTrashFileItemStatusField(val.itemStatus),
  };
}
export function deserializeTrashFile(val: SerializedData): TrashFile {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "TrashFile"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "TrashFile" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TrashFile"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "TrashFile"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "TrashFile" to be defined',
    });
  }
  const type: TrashFileTypeField = deserializeTrashFileTypeField(val.type);
  if (val.sequence_id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "sequence_id" of type "TrashFile" to be defined',
    });
  }
  if (!sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "TrashFile"',
    });
  }
  const sequenceId: string = val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "TrashFile"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.sha1 == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "sha1" of type "TrashFile" to be defined',
    });
  }
  if (!sdIsString(val.sha1)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sha1" of type "TrashFile"',
    });
  }
  const sha1: string = val.sha1;
  const fileVersion: undefined | FileVersionMini =
    val.file_version == void 0
      ? void 0
      : deserializeFileVersionMini(val.file_version);
  if (val.description == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "description" of type "TrashFile" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "TrashFile"',
    });
  }
  const description: string = val.description;
  if (val.size == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "size" of type "TrashFile" to be defined',
    });
  }
  if (!sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "TrashFile"',
    });
  }
  const size: number = val.size;
  if (val.path_collection == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "path_collection" of type "TrashFile" to be defined',
    });
  }
  const pathCollection: TrashFilePathCollectionField =
    deserializeTrashFilePathCollectionField(val.path_collection);
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "created_at" of type "TrashFile" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "TrashFile"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  if (val.modified_at == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "modified_at" of type "TrashFile" to be defined',
    });
  }
  if (!sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "TrashFile"',
    });
  }
  const modifiedAt: DateTime = deserializeDateTime(val.modified_at);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "trashed_at" of type "TrashFile"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "TrashFile"',
    });
  }
  const purgedAt: undefined | DateTime =
    val.purged_at == void 0 ? void 0 : deserializeDateTime(val.purged_at);
  if (
    !(val.content_created_at == void 0) &&
    !sdIsString(val.content_created_at)
  ) {
    throw new BoxSdkError({
      message: 'Expecting string for "content_created_at" of type "TrashFile"',
    });
  }
  const contentCreatedAt: undefined | DateTime =
    val.content_created_at == void 0
      ? void 0
      : deserializeDateTime(val.content_created_at);
  if (
    !(val.content_modified_at == void 0) &&
    !sdIsString(val.content_modified_at)
  ) {
    throw new BoxSdkError({
      message: 'Expecting string for "content_modified_at" of type "TrashFile"',
    });
  }
  const contentModifiedAt: undefined | DateTime =
    val.content_modified_at == void 0
      ? void 0
      : deserializeDateTime(val.content_modified_at);
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (val.modified_by == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "modified_by" of type "TrashFile" to be defined',
    });
  }
  const modifiedBy: UserMini = deserializeUserMini(val.modified_by);
  if (val.owned_by == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "owned_by" of type "TrashFile" to be defined',
    });
  }
  const ownedBy: UserMini = deserializeUserMini(val.owned_by);
  if (!(val.shared_link == void 0) && !sdIsString(val.shared_link)) {
    throw new BoxSdkError({
      message: 'Expecting string for "shared_link" of type "TrashFile"',
    });
  }
  const sharedLink: undefined | string =
    val.shared_link == void 0 ? void 0 : val.shared_link;
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  if (val.item_status == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "item_status" of type "TrashFile" to be defined',
    });
  }
  const itemStatus: TrashFileItemStatusField =
    deserializeTrashFileItemStatusField(val.item_status);
  return {
    id: id,
    etag: etag,
    type: type,
    sequenceId: sequenceId,
    name: name,
    sha1: sha1,
    fileVersion: fileVersion,
    description: description,
    size: size,
    pathCollection: pathCollection,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    trashedAt: trashedAt,
    purgedAt: purgedAt,
    contentCreatedAt: contentCreatedAt,
    contentModifiedAt: contentModifiedAt,
    createdBy: createdBy,
    modifiedBy: modifiedBy,
    ownedBy: ownedBy,
    sharedLink: sharedLink,
    parent: parent,
    itemStatus: itemStatus,
  } satisfies TrashFile;
}
export function serializeTrashFileInput(val: TrashFileInput): SerializedData {
  return {
    ['id']: val.id,
    ['etag']: val.etag,
    ['type']:
      val.type == void 0 ? val.type : serializeTrashFileTypeField(val.type),
    ['sequence_id']: val.sequenceId,
    ['name']: val.name,
    ['sha1']: val.sha1,
    ['file_version']:
      val.fileVersion == void 0
        ? val.fileVersion
        : serializeFileVersionMini(val.fileVersion),
    ['description']: val.description,
    ['size']: val.size,
    ['path_collection']: serializeTrashFilePathCollectionField(
      val.pathCollection,
    ),
    ['created_at']: serializeDateTime(val.createdAt),
    ['modified_at']: serializeDateTime(val.modifiedAt),
    ['trashed_at']:
      val.trashedAt == void 0
        ? val.trashedAt
        : serializeDateTime(val.trashedAt),
    ['purged_at']:
      val.purgedAt == void 0 ? val.purgedAt : serializeDateTime(val.purgedAt),
    ['content_created_at']:
      val.contentCreatedAt == void 0
        ? val.contentCreatedAt
        : serializeDateTime(val.contentCreatedAt),
    ['content_modified_at']:
      val.contentModifiedAt == void 0
        ? val.contentModifiedAt
        : serializeDateTime(val.contentModifiedAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMini(val.createdBy),
    ['modified_by']: serializeUserMini(val.modifiedBy),
    ['owned_by']: serializeUserMini(val.ownedBy),
    ['shared_link']: val.sharedLink,
    ['parent']:
      val.parent == void 0 ? val.parent : serializeFolderMini(val.parent),
    ['item_status']: serializeTrashFileItemStatusField(val.itemStatus),
  };
}
export function deserializeTrashFileInput(val: SerializedData): TrashFileInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "TrashFileInput"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "TrashFileInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TrashFileInput"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "TrashFileInput"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  const type: undefined | TrashFileTypeField =
    val.type == void 0 ? void 0 : deserializeTrashFileTypeField(val.type);
  if (val.sequence_id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "sequence_id" of type "TrashFileInput" to be defined',
    });
  }
  if (!sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "TrashFileInput"',
    });
  }
  const sequenceId: string = val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "TrashFileInput"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.sha1 == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "sha1" of type "TrashFileInput" to be defined',
    });
  }
  if (!sdIsString(val.sha1)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sha1" of type "TrashFileInput"',
    });
  }
  const sha1: string = val.sha1;
  const fileVersion: undefined | FileVersionMini =
    val.file_version == void 0
      ? void 0
      : deserializeFileVersionMini(val.file_version);
  if (val.description == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "description" of type "TrashFileInput" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "TrashFileInput"',
    });
  }
  const description: string = val.description;
  if (val.size == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "size" of type "TrashFileInput" to be defined',
    });
  }
  if (!sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "TrashFileInput"',
    });
  }
  const size: number = val.size;
  if (val.path_collection == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path_collection" of type "TrashFileInput" to be defined',
    });
  }
  const pathCollection: TrashFilePathCollectionField =
    deserializeTrashFilePathCollectionField(val.path_collection);
  if (val.created_at == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "created_at" of type "TrashFileInput" to be defined',
    });
  }
  if (!sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "TrashFileInput"',
    });
  }
  const createdAt: DateTime = deserializeDateTime(val.created_at);
  if (val.modified_at == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "modified_at" of type "TrashFileInput" to be defined',
    });
  }
  if (!sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "TrashFileInput"',
    });
  }
  const modifiedAt: DateTime = deserializeDateTime(val.modified_at);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "trashed_at" of type "TrashFileInput"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "TrashFileInput"',
    });
  }
  const purgedAt: undefined | DateTime =
    val.purged_at == void 0 ? void 0 : deserializeDateTime(val.purged_at);
  if (
    !(val.content_created_at == void 0) &&
    !sdIsString(val.content_created_at)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content_created_at" of type "TrashFileInput"',
    });
  }
  const contentCreatedAt: undefined | DateTime =
    val.content_created_at == void 0
      ? void 0
      : deserializeDateTime(val.content_created_at);
  if (
    !(val.content_modified_at == void 0) &&
    !sdIsString(val.content_modified_at)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content_modified_at" of type "TrashFileInput"',
    });
  }
  const contentModifiedAt: undefined | DateTime =
    val.content_modified_at == void 0
      ? void 0
      : deserializeDateTime(val.content_modified_at);
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (val.modified_by == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "modified_by" of type "TrashFileInput" to be defined',
    });
  }
  const modifiedBy: UserMini = deserializeUserMini(val.modified_by);
  if (val.owned_by == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "owned_by" of type "TrashFileInput" to be defined',
    });
  }
  const ownedBy: UserMini = deserializeUserMini(val.owned_by);
  if (!(val.shared_link == void 0) && !sdIsString(val.shared_link)) {
    throw new BoxSdkError({
      message: 'Expecting string for "shared_link" of type "TrashFileInput"',
    });
  }
  const sharedLink: undefined | string =
    val.shared_link == void 0 ? void 0 : val.shared_link;
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  if (val.item_status == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "item_status" of type "TrashFileInput" to be defined',
    });
  }
  const itemStatus: TrashFileItemStatusField =
    deserializeTrashFileItemStatusField(val.item_status);
  return {
    id: id,
    etag: etag,
    type: type,
    sequenceId: sequenceId,
    name: name,
    sha1: sha1,
    fileVersion: fileVersion,
    description: description,
    size: size,
    pathCollection: pathCollection,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    trashedAt: trashedAt,
    purgedAt: purgedAt,
    contentCreatedAt: contentCreatedAt,
    contentModifiedAt: contentModifiedAt,
    createdBy: createdBy,
    modifiedBy: modifiedBy,
    ownedBy: ownedBy,
    sharedLink: sharedLink,
    parent: parent,
    itemStatus: itemStatus,
  } satisfies TrashFileInput;
}

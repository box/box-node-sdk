import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
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
export type TrashFolderTypeField = 'folder';
export type TrashFolderPathCollectionEntriesTypeField = 'folder';
export interface TrashFolderPathCollectionEntriesField {
  /**
   * `folder` */
  readonly type?: TrashFolderPathCollectionEntriesTypeField;
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
export interface TrashFolderPathCollectionField {
  /**
   * The number of folders in this list. */
  readonly totalCount: number;
  /**
   * Array of folders for this item's path collection */
  readonly entries: readonly TrashFolderPathCollectionEntriesField[];
  readonly rawData?: SerializedData;
}
export type TrashFolderItemStatusField =
  | 'active'
  | 'trashed'
  | 'deleted'
  | string;
export class TrashFolder {
  /**
   * The unique identifier that represent a folder.
   *
   * The ID for any folder can be determined
   * by visiting a folder in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/folders/123`
   * the `folder_id` is `123`. */
  readonly id!: string;
  /**
   * The HTTP `etag` of this folder. This can be used within some API
   * endpoints in the `If-Match` and `If-None-Match` headers to only
   * perform changes on the folder if (no) changes have happened. */
  readonly etag?: string | null;
  /**
   * `folder` */
  readonly type: TrashFolderTypeField = 'folder' as TrashFolderTypeField;
  readonly sequenceId?: string;
  /**
   * The name of the folder. */
  readonly name!: string;
  /**
   * The date and time when the folder was created. This value may
   * be `null` for some folders such as the root folder or the trash
   * folder. */
  readonly createdAt?: DateTime | null;
  /**
   * The date and time when the folder was last updated. This value may
   * be `null` for some folders such as the root folder or the trash
   * folder. */
  readonly modifiedAt?: DateTime | null;
  readonly description!: string;
  /**
   * The folder size in bytes.
   *
   * Be careful parsing this integer as its
   * value can get very large. */
  readonly size!: number;
  readonly pathCollection!: TrashFolderPathCollectionField;
  readonly createdBy!: UserMini;
  readonly modifiedBy!: UserMini;
  /**
   * The time at which this folder was put in the trash. */
  readonly trashedAt?: DateTime | null;
  /**
   * The time at which this folder is expected to be purged
   * from the trash. */
  readonly purgedAt?: DateTime | null;
  /**
   * The date and time at which this folder was originally
   * created. */
  readonly contentCreatedAt?: DateTime | null;
  /**
   * The date and time at which this folder was last updated. */
  readonly contentModifiedAt?: DateTime | null;
  readonly ownedBy!: UserMini;
  /**
   * The shared link for this folder. This will
   * be `null` if a folder has been trashed, since the link will no longer
   * be active. */
  readonly sharedLink?: string | null;
  /**
   * The folder upload email for this folder. This will
   * be `null` if a folder has been trashed, since the upload will no longer
   * work. */
  readonly folderUploadEmail?: string | null;
  readonly parent?: FolderMini;
  /**
   * Defines if this item has been deleted or not.
   *
   * * `active` when the item has is not in the trash
   * * `trashed` when the item has been moved to the trash but not deleted
   * * `deleted` when the item has been permanently deleted. */
  readonly itemStatus!: TrashFolderItemStatusField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TrashFolder, 'type'> & Partial<Pick<TrashFolder, 'type'>>,
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
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
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
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.modifiedBy !== undefined) {
      this.modifiedBy = fields.modifiedBy;
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
    if (fields.ownedBy !== undefined) {
      this.ownedBy = fields.ownedBy;
    }
    if (fields.sharedLink !== undefined) {
      this.sharedLink = fields.sharedLink;
    }
    if (fields.folderUploadEmail !== undefined) {
      this.folderUploadEmail = fields.folderUploadEmail;
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
export interface TrashFolderInput {
  /**
   * The unique identifier that represent a folder.
   *
   * The ID for any folder can be determined
   * by visiting a folder in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/folders/123`
   * the `folder_id` is `123`. */
  readonly id: string;
  /**
   * The HTTP `etag` of this folder. This can be used within some API
   * endpoints in the `If-Match` and `If-None-Match` headers to only
   * perform changes on the folder if (no) changes have happened. */
  readonly etag?: string | null;
  /**
   * `folder` */
  readonly type?: TrashFolderTypeField;
  readonly sequenceId?: string;
  /**
   * The name of the folder. */
  readonly name: string;
  /**
   * The date and time when the folder was created. This value may
   * be `null` for some folders such as the root folder or the trash
   * folder. */
  readonly createdAt?: DateTime | null;
  /**
   * The date and time when the folder was last updated. This value may
   * be `null` for some folders such as the root folder or the trash
   * folder. */
  readonly modifiedAt?: DateTime | null;
  readonly description: string;
  /**
   * The folder size in bytes.
   *
   * Be careful parsing this integer as its
   * value can get very large. */
  readonly size: number;
  readonly pathCollection: TrashFolderPathCollectionField;
  readonly createdBy: UserMini;
  readonly modifiedBy: UserMini;
  /**
   * The time at which this folder was put in the trash. */
  readonly trashedAt?: DateTime | null;
  /**
   * The time at which this folder is expected to be purged
   * from the trash. */
  readonly purgedAt?: DateTime | null;
  /**
   * The date and time at which this folder was originally
   * created. */
  readonly contentCreatedAt?: DateTime | null;
  /**
   * The date and time at which this folder was last updated. */
  readonly contentModifiedAt?: DateTime | null;
  readonly ownedBy: UserMini;
  /**
   * The shared link for this folder. This will
   * be `null` if a folder has been trashed, since the link will no longer
   * be active. */
  readonly sharedLink?: string | null;
  /**
   * The folder upload email for this folder. This will
   * be `null` if a folder has been trashed, since the upload will no longer
   * work. */
  readonly folderUploadEmail?: string | null;
  readonly parent?: FolderMini;
  /**
   * Defines if this item has been deleted or not.
   *
   * * `active` when the item has is not in the trash
   * * `trashed` when the item has been moved to the trash but not deleted
   * * `deleted` when the item has been permanently deleted. */
  readonly itemStatus: TrashFolderItemStatusField;
  readonly rawData?: SerializedData;
}
export function serializeTrashFolderTypeField(
  val: TrashFolderTypeField,
): SerializedData {
  return val;
}
export function deserializeTrashFolderTypeField(
  val: SerializedData,
): TrashFolderTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize TrashFolderTypeField" });
}
export function serializeTrashFolderPathCollectionEntriesTypeField(
  val: TrashFolderPathCollectionEntriesTypeField,
): SerializedData {
  return val;
}
export function deserializeTrashFolderPathCollectionEntriesTypeField(
  val: SerializedData,
): TrashFolderPathCollectionEntriesTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TrashFolderPathCollectionEntriesTypeField",
  });
}
export function serializeTrashFolderPathCollectionEntriesField(
  val: TrashFolderPathCollectionEntriesField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTrashFolderPathCollectionEntriesTypeField(val.type),
    ['id']: val.id,
    ['sequence_id']: val.sequenceId,
    ['etag']: val.etag,
    ['name']: val.name,
  };
}
export function deserializeTrashFolderPathCollectionEntriesField(
  val: SerializedData,
): TrashFolderPathCollectionEntriesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TrashFolderPathCollectionEntriesField"',
    });
  }
  const type: undefined | TrashFolderPathCollectionEntriesTypeField =
    val.type == void 0
      ? void 0
      : deserializeTrashFolderPathCollectionEntriesTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TrashFolderPathCollectionEntriesField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "sequence_id" of type "TrashFolderPathCollectionEntriesField"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "etag" of type "TrashFolderPathCollectionEntriesField"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "TrashFolderPathCollectionEntriesField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    type: type,
    id: id,
    sequenceId: sequenceId,
    etag: etag,
    name: name,
  } satisfies TrashFolderPathCollectionEntriesField;
}
export function serializeTrashFolderPathCollectionField(
  val: TrashFolderPathCollectionField,
): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']: val.entries.map(function (
      item: TrashFolderPathCollectionEntriesField,
    ): SerializedData {
      return serializeTrashFolderPathCollectionEntriesField(item);
    }) as readonly any[],
  };
}
export function deserializeTrashFolderPathCollectionField(
  val: SerializedData,
): TrashFolderPathCollectionField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TrashFolderPathCollectionField"',
    });
  }
  if (val.total_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "total_count" of type "TrashFolderPathCollectionField" to be defined',
    });
  }
  if (!sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_count" of type "TrashFolderPathCollectionField"',
    });
  }
  const totalCount: number = val.total_count;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "TrashFolderPathCollectionField" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "TrashFolderPathCollectionField"',
    });
  }
  const entries: readonly TrashFolderPathCollectionEntriesField[] = sdIsList(
    val.entries,
  )
    ? (val.entries.map(function (
        itm: SerializedData,
      ): TrashFolderPathCollectionEntriesField {
        return deserializeTrashFolderPathCollectionEntriesField(itm);
      }) as readonly any[])
    : [];
  return {
    totalCount: totalCount,
    entries: entries,
  } satisfies TrashFolderPathCollectionField;
}
export function serializeTrashFolderItemStatusField(
  val: TrashFolderItemStatusField,
): SerializedData {
  return val;
}
export function deserializeTrashFolderItemStatusField(
  val: SerializedData,
): TrashFolderItemStatusField {
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
    message: "Can't deserialize TrashFolderItemStatusField",
  });
}
export function serializeTrashFolder(val: TrashFolder): SerializedData {
  return {
    ['id']: val.id,
    ['etag']: val.etag,
    ['type']: serializeTrashFolderTypeField(val.type),
    ['sequence_id']: val.sequenceId,
    ['name']: val.name,
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
    ['description']: val.description,
    ['size']: val.size,
    ['path_collection']: serializeTrashFolderPathCollectionField(
      val.pathCollection,
    ),
    ['created_by']: serializeUserMini(val.createdBy),
    ['modified_by']: serializeUserMini(val.modifiedBy),
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
    ['owned_by']: serializeUserMini(val.ownedBy),
    ['shared_link']: val.sharedLink,
    ['folder_upload_email']: val.folderUploadEmail,
    ['parent']:
      val.parent == void 0 ? val.parent : serializeFolderMini(val.parent),
    ['item_status']: serializeTrashFolderItemStatusField(val.itemStatus),
  };
}
export function deserializeTrashFolder(val: SerializedData): TrashFolder {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "TrashFolder"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "TrashFolder" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TrashFolder"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "TrashFolder"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "TrashFolder" to be defined',
    });
  }
  const type: TrashFolderTypeField = deserializeTrashFolderTypeField(val.type);
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "TrashFolder"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "TrashFolder" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "TrashFolder"',
    });
  }
  const name: string = val.name;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "TrashFolder"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "TrashFolder"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (val.description == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "description" of type "TrashFolder" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "TrashFolder"',
    });
  }
  const description: string = val.description;
  if (val.size == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "size" of type "TrashFolder" to be defined',
    });
  }
  if (!sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "TrashFolder"',
    });
  }
  const size: number = val.size;
  if (val.path_collection == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path_collection" of type "TrashFolder" to be defined',
    });
  }
  const pathCollection: TrashFolderPathCollectionField =
    deserializeTrashFolderPathCollectionField(val.path_collection);
  if (val.created_by == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "created_by" of type "TrashFolder" to be defined',
    });
  }
  const createdBy: UserMini = deserializeUserMini(val.created_by);
  if (val.modified_by == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "modified_by" of type "TrashFolder" to be defined',
    });
  }
  const modifiedBy: UserMini = deserializeUserMini(val.modified_by);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "trashed_at" of type "TrashFolder"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "TrashFolder"',
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
        'Expecting string for "content_created_at" of type "TrashFolder"',
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
        'Expecting string for "content_modified_at" of type "TrashFolder"',
    });
  }
  const contentModifiedAt: undefined | DateTime =
    val.content_modified_at == void 0
      ? void 0
      : deserializeDateTime(val.content_modified_at);
  if (val.owned_by == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "owned_by" of type "TrashFolder" to be defined',
    });
  }
  const ownedBy: UserMini = deserializeUserMini(val.owned_by);
  if (!(val.shared_link == void 0) && !sdIsString(val.shared_link)) {
    throw new BoxSdkError({
      message: 'Expecting string for "shared_link" of type "TrashFolder"',
    });
  }
  const sharedLink: undefined | string =
    val.shared_link == void 0 ? void 0 : val.shared_link;
  if (
    !(val.folder_upload_email == void 0) &&
    !sdIsString(val.folder_upload_email)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "folder_upload_email" of type "TrashFolder"',
    });
  }
  const folderUploadEmail: undefined | string =
    val.folder_upload_email == void 0 ? void 0 : val.folder_upload_email;
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  if (val.item_status == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "item_status" of type "TrashFolder" to be defined',
    });
  }
  const itemStatus: TrashFolderItemStatusField =
    deserializeTrashFolderItemStatusField(val.item_status);
  return {
    id: id,
    etag: etag,
    type: type,
    sequenceId: sequenceId,
    name: name,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    description: description,
    size: size,
    pathCollection: pathCollection,
    createdBy: createdBy,
    modifiedBy: modifiedBy,
    trashedAt: trashedAt,
    purgedAt: purgedAt,
    contentCreatedAt: contentCreatedAt,
    contentModifiedAt: contentModifiedAt,
    ownedBy: ownedBy,
    sharedLink: sharedLink,
    folderUploadEmail: folderUploadEmail,
    parent: parent,
    itemStatus: itemStatus,
  } satisfies TrashFolder;
}
export function serializeTrashFolderInput(
  val: TrashFolderInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['etag']: val.etag,
    ['type']:
      val.type == void 0 ? val.type : serializeTrashFolderTypeField(val.type),
    ['sequence_id']: val.sequenceId,
    ['name']: val.name,
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
    ['description']: val.description,
    ['size']: val.size,
    ['path_collection']: serializeTrashFolderPathCollectionField(
      val.pathCollection,
    ),
    ['created_by']: serializeUserMini(val.createdBy),
    ['modified_by']: serializeUserMini(val.modifiedBy),
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
    ['owned_by']: serializeUserMini(val.ownedBy),
    ['shared_link']: val.sharedLink,
    ['folder_upload_email']: val.folderUploadEmail,
    ['parent']:
      val.parent == void 0 ? val.parent : serializeFolderMini(val.parent),
    ['item_status']: serializeTrashFolderItemStatusField(val.itemStatus),
  };
}
export function deserializeTrashFolderInput(
  val: SerializedData,
): TrashFolderInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TrashFolderInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "TrashFolderInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TrashFolderInput"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "TrashFolderInput"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  const type: undefined | TrashFolderTypeField =
    val.type == void 0 ? void 0 : deserializeTrashFolderTypeField(val.type);
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "TrashFolderInput"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (val.name == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "name" of type "TrashFolderInput" to be defined',
    });
  }
  if (!sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "TrashFolderInput"',
    });
  }
  const name: string = val.name;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "TrashFolderInput"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "TrashFolderInput"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (val.description == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "description" of type "TrashFolderInput" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "TrashFolderInput"',
    });
  }
  const description: string = val.description;
  if (val.size == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "size" of type "TrashFolderInput" to be defined',
    });
  }
  if (!sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "TrashFolderInput"',
    });
  }
  const size: number = val.size;
  if (val.path_collection == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path_collection" of type "TrashFolderInput" to be defined',
    });
  }
  const pathCollection: TrashFolderPathCollectionField =
    deserializeTrashFolderPathCollectionField(val.path_collection);
  if (val.created_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "created_by" of type "TrashFolderInput" to be defined',
    });
  }
  const createdBy: UserMini = deserializeUserMini(val.created_by);
  if (val.modified_by == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "modified_by" of type "TrashFolderInput" to be defined',
    });
  }
  const modifiedBy: UserMini = deserializeUserMini(val.modified_by);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "trashed_at" of type "TrashFolderInput"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "TrashFolderInput"',
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
        'Expecting string for "content_created_at" of type "TrashFolderInput"',
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
        'Expecting string for "content_modified_at" of type "TrashFolderInput"',
    });
  }
  const contentModifiedAt: undefined | DateTime =
    val.content_modified_at == void 0
      ? void 0
      : deserializeDateTime(val.content_modified_at);
  if (val.owned_by == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "owned_by" of type "TrashFolderInput" to be defined',
    });
  }
  const ownedBy: UserMini = deserializeUserMini(val.owned_by);
  if (!(val.shared_link == void 0) && !sdIsString(val.shared_link)) {
    throw new BoxSdkError({
      message: 'Expecting string for "shared_link" of type "TrashFolderInput"',
    });
  }
  const sharedLink: undefined | string =
    val.shared_link == void 0 ? void 0 : val.shared_link;
  if (
    !(val.folder_upload_email == void 0) &&
    !sdIsString(val.folder_upload_email)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "folder_upload_email" of type "TrashFolderInput"',
    });
  }
  const folderUploadEmail: undefined | string =
    val.folder_upload_email == void 0 ? void 0 : val.folder_upload_email;
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  if (val.item_status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "item_status" of type "TrashFolderInput" to be defined',
    });
  }
  const itemStatus: TrashFolderItemStatusField =
    deserializeTrashFolderItemStatusField(val.item_status);
  return {
    id: id,
    etag: etag,
    type: type,
    sequenceId: sequenceId,
    name: name,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    description: description,
    size: size,
    pathCollection: pathCollection,
    createdBy: createdBy,
    modifiedBy: modifiedBy,
    trashedAt: trashedAt,
    purgedAt: purgedAt,
    contentCreatedAt: contentCreatedAt,
    contentModifiedAt: contentModifiedAt,
    ownedBy: ownedBy,
    sharedLink: sharedLink,
    folderUploadEmail: folderUploadEmail,
    parent: parent,
    itemStatus: itemStatus,
  } satisfies TrashFolderInput;
}

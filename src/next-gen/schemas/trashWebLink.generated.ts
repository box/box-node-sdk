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
export type TrashWebLinkTypeField = 'web_link';
export type TrashWebLinkPathCollectionEntriesTypeField = 'folder';
export interface TrashWebLinkPathCollectionEntriesField {
  /**
   * `folder` */
  readonly type?: TrashWebLinkPathCollectionEntriesTypeField;
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
export interface TrashWebLinkPathCollectionField {
  /**
   * The number of folders in this list. */
  readonly totalCount: number;
  /**
   * Array of folders for this item's path collection */
  readonly entries: readonly TrashWebLinkPathCollectionEntriesField[];
  readonly rawData?: SerializedData;
}
export type TrashWebLinkItemStatusField =
  | 'active'
  | 'trashed'
  | 'deleted'
  | string;
export interface TrashWebLink {
  /**
   * `web_link` */
  readonly type?: TrashWebLinkTypeField;
  /**
   * The unique identifier for this web link */
  readonly id?: string;
  readonly sequenceId?: string;
  /**
   * The entity tag of this web link. Used with `If-Match`
   * headers. */
  readonly etag?: string;
  /**
   * The name of the web link */
  readonly name?: string;
  /**
   * The URL this web link points to */
  readonly url?: string;
  readonly parent?: FolderMini;
  /**
   * The description accompanying the web link. This is
   * visible within the Box web application. */
  readonly description?: string;
  readonly pathCollection?: TrashWebLinkPathCollectionField;
  /**
   * When this file was created on Box’s servers. */
  readonly createdAt?: DateTime;
  /**
   * When this file was last updated on the Box
   * servers. */
  readonly modifiedAt?: DateTime;
  /**
   * When this file was last moved to the trash. */
  readonly trashedAt?: DateTime | null;
  /**
   * When this file will be permanently deleted. */
  readonly purgedAt?: DateTime | null;
  readonly createdBy?: UserMini;
  readonly modifiedBy?: UserMini;
  readonly ownedBy?: UserMini;
  /**
   * The shared link for this bookmark. This will
   * be `null` if a bookmark has been trashed, since the link will no longer
   * be active. */
  readonly sharedLink?: string | null;
  /**
   * Whether this item is deleted or not. Values include `active`,
   * `trashed` if the file has been moved to the trash, and `deleted` if
   * the file has been permanently deleted */
  readonly itemStatus?: TrashWebLinkItemStatusField;
  readonly rawData?: SerializedData;
}
export function serializeTrashWebLinkTypeField(
  val: TrashWebLinkTypeField,
): SerializedData {
  return val;
}
export function deserializeTrashWebLinkTypeField(
  val: SerializedData,
): TrashWebLinkTypeField {
  if (val == 'web_link') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize TrashWebLinkTypeField" });
}
export function serializeTrashWebLinkPathCollectionEntriesTypeField(
  val: TrashWebLinkPathCollectionEntriesTypeField,
): SerializedData {
  return val;
}
export function deserializeTrashWebLinkPathCollectionEntriesTypeField(
  val: SerializedData,
): TrashWebLinkPathCollectionEntriesTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TrashWebLinkPathCollectionEntriesTypeField",
  });
}
export function serializeTrashWebLinkPathCollectionEntriesField(
  val: TrashWebLinkPathCollectionEntriesField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTrashWebLinkPathCollectionEntriesTypeField(val.type),
    ['id']: val.id,
    ['sequence_id']: val.sequenceId,
    ['etag']: val.etag,
    ['name']: val.name,
  };
}
export function deserializeTrashWebLinkPathCollectionEntriesField(
  val: SerializedData,
): TrashWebLinkPathCollectionEntriesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TrashWebLinkPathCollectionEntriesField"',
    });
  }
  const type: undefined | TrashWebLinkPathCollectionEntriesTypeField =
    val.type == void 0
      ? void 0
      : deserializeTrashWebLinkPathCollectionEntriesTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "TrashWebLinkPathCollectionEntriesField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "sequence_id" of type "TrashWebLinkPathCollectionEntriesField"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "etag" of type "TrashWebLinkPathCollectionEntriesField"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "TrashWebLinkPathCollectionEntriesField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    type: type,
    id: id,
    sequenceId: sequenceId,
    etag: etag,
    name: name,
  } satisfies TrashWebLinkPathCollectionEntriesField;
}
export function serializeTrashWebLinkPathCollectionField(
  val: TrashWebLinkPathCollectionField,
): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']: val.entries.map(function (
      item: TrashWebLinkPathCollectionEntriesField,
    ): SerializedData {
      return serializeTrashWebLinkPathCollectionEntriesField(item);
    }) as readonly any[],
  };
}
export function deserializeTrashWebLinkPathCollectionField(
  val: SerializedData,
): TrashWebLinkPathCollectionField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TrashWebLinkPathCollectionField"',
    });
  }
  if (val.total_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "total_count" of type "TrashWebLinkPathCollectionField" to be defined',
    });
  }
  if (!sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_count" of type "TrashWebLinkPathCollectionField"',
    });
  }
  const totalCount: number = val.total_count;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "TrashWebLinkPathCollectionField" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "TrashWebLinkPathCollectionField"',
    });
  }
  const entries: readonly TrashWebLinkPathCollectionEntriesField[] = sdIsList(
    val.entries,
  )
    ? (val.entries.map(function (
        itm: SerializedData,
      ): TrashWebLinkPathCollectionEntriesField {
        return deserializeTrashWebLinkPathCollectionEntriesField(itm);
      }) as readonly any[])
    : [];
  return {
    totalCount: totalCount,
    entries: entries,
  } satisfies TrashWebLinkPathCollectionField;
}
export function serializeTrashWebLinkItemStatusField(
  val: TrashWebLinkItemStatusField,
): SerializedData {
  return val;
}
export function deserializeTrashWebLinkItemStatusField(
  val: SerializedData,
): TrashWebLinkItemStatusField {
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
    message: "Can't deserialize TrashWebLinkItemStatusField",
  });
}
export function serializeTrashWebLink(val: TrashWebLink): SerializedData {
  return {
    ['type']:
      val.type == void 0 ? val.type : serializeTrashWebLinkTypeField(val.type),
    ['id']: val.id,
    ['sequence_id']: val.sequenceId,
    ['etag']: val.etag,
    ['name']: val.name,
    ['url']: val.url,
    ['parent']:
      val.parent == void 0 ? val.parent : serializeFolderMini(val.parent),
    ['description']: val.description,
    ['path_collection']:
      val.pathCollection == void 0
        ? val.pathCollection
        : serializeTrashWebLinkPathCollectionField(val.pathCollection),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
    ['trashed_at']:
      val.trashedAt == void 0
        ? val.trashedAt
        : serializeDateTime(val.trashedAt),
    ['purged_at']:
      val.purgedAt == void 0 ? val.purgedAt : serializeDateTime(val.purgedAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMini(val.createdBy),
    ['modified_by']:
      val.modifiedBy == void 0
        ? val.modifiedBy
        : serializeUserMini(val.modifiedBy),
    ['owned_by']:
      val.ownedBy == void 0 ? val.ownedBy : serializeUserMini(val.ownedBy),
    ['shared_link']: val.sharedLink,
    ['item_status']:
      val.itemStatus == void 0
        ? val.itemStatus
        : serializeTrashWebLinkItemStatusField(val.itemStatus),
  };
}
export function deserializeTrashWebLink(val: SerializedData): TrashWebLink {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "TrashWebLink"' });
  }
  const type: undefined | TrashWebLinkTypeField =
    val.type == void 0 ? void 0 : deserializeTrashWebLinkTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TrashWebLink"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "TrashWebLink"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "TrashWebLink"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "TrashWebLink"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "TrashWebLink"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "TrashWebLink"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const pathCollection: undefined | TrashWebLinkPathCollectionField =
    val.path_collection == void 0
      ? void 0
      : deserializeTrashWebLinkPathCollectionField(val.path_collection);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "TrashWebLink"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "TrashWebLink"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "trashed_at" of type "TrashWebLink"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "TrashWebLink"',
    });
  }
  const purgedAt: undefined | DateTime =
    val.purged_at == void 0 ? void 0 : deserializeDateTime(val.purged_at);
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  const modifiedBy: undefined | UserMini =
    val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
  const ownedBy: undefined | UserMini =
    val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
  if (!(val.shared_link == void 0) && !sdIsString(val.shared_link)) {
    throw new BoxSdkError({
      message: 'Expecting string for "shared_link" of type "TrashWebLink"',
    });
  }
  const sharedLink: undefined | string =
    val.shared_link == void 0 ? void 0 : val.shared_link;
  const itemStatus: undefined | TrashWebLinkItemStatusField =
    val.item_status == void 0
      ? void 0
      : deserializeTrashWebLinkItemStatusField(val.item_status);
  return {
    type: type,
    id: id,
    sequenceId: sequenceId,
    etag: etag,
    name: name,
    url: url,
    parent: parent,
    description: description,
    pathCollection: pathCollection,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    trashedAt: trashedAt,
    purgedAt: purgedAt,
    createdBy: createdBy,
    modifiedBy: modifiedBy,
    ownedBy: ownedBy,
    sharedLink: sharedLink,
    itemStatus: itemStatus,
  } satisfies TrashWebLink;
}

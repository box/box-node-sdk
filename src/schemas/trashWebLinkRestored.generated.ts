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
export type TrashWebLinkRestoredTypeField = 'web_link';
export interface TrashWebLinkRestoredPathCollectionField {
  /**
   * The number of folders in this list. */
  readonly totalCount: number;
  /**
   * The parent folders for this item. */
  readonly entries: readonly FolderMini[];
  readonly rawData?: SerializedData;
}
export type TrashWebLinkRestoredItemStatusField =
  | 'active'
  | 'trashed'
  | 'deleted'
  | string;
export interface TrashWebLinkRestored {
  /**
   * The value will always be `web_link`. */
  readonly type?: TrashWebLinkRestoredTypeField;
  /**
   * The unique identifier for this web link. */
  readonly id?: string;
  readonly sequenceId: string;
  /**
   * The entity tag of this web link. Used with `If-Match`
   * headers. */
  readonly etag?: string;
  /**
   * The name of the web link. */
  readonly name?: string;
  /**
   * The URL this web link points to. */
  readonly url?: string;
  readonly parent?: FolderMini;
  /**
   * The description accompanying the web link. This is
   * visible within the Box web application. */
  readonly description?: string;
  readonly pathCollection: TrashWebLinkRestoredPathCollectionField;
  /**
   * When this file was created on Box’s servers. */
  readonly createdAt?: DateTime;
  /**
   * When this file was last updated on the Box
   * servers. */
  readonly modifiedAt?: DateTime;
  /**
   * The time at which this bookmark was put in the
   * trash - becomes `null` after restore. */
  readonly trashedAt?: string | null;
  /**
   * The time at which this bookmark will be permanently
   * deleted - becomes `null` after restore. */
  readonly purgedAt?: string | null;
  readonly createdBy?: UserMini;
  readonly modifiedBy?: UserMini;
  readonly ownedBy?: UserMini;
  /**
   * The shared link for this bookmark. This will
   * be `null` if a bookmark had been trashed, even though the original shared
   * link does become active again. */
  readonly sharedLink?: string | null;
  /**
   * Whether this item is deleted or not. Values include `active`,
   * `trashed` if the file has been moved to the trash, and `deleted` if
   * the file has been permanently deleted. */
  readonly itemStatus?: TrashWebLinkRestoredItemStatusField;
  readonly rawData?: SerializedData;
}
export function serializeTrashWebLinkRestoredTypeField(
  val: TrashWebLinkRestoredTypeField,
): SerializedData {
  return val;
}
export function deserializeTrashWebLinkRestoredTypeField(
  val: SerializedData,
): TrashWebLinkRestoredTypeField {
  if (val == 'web_link') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TrashWebLinkRestoredTypeField",
  });
}
export function serializeTrashWebLinkRestoredPathCollectionField(
  val: TrashWebLinkRestoredPathCollectionField,
): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']: val.entries.map(function (item: FolderMini): SerializedData {
      return serializeFolderMini(item);
    }) as readonly any[],
  };
}
export function deserializeTrashWebLinkRestoredPathCollectionField(
  val: SerializedData,
): TrashWebLinkRestoredPathCollectionField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TrashWebLinkRestoredPathCollectionField"',
    });
  }
  if (val.total_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "total_count" of type "TrashWebLinkRestoredPathCollectionField" to be defined',
    });
  }
  if (!sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_count" of type "TrashWebLinkRestoredPathCollectionField"',
    });
  }
  const totalCount: number = val.total_count;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "TrashWebLinkRestoredPathCollectionField" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "TrashWebLinkRestoredPathCollectionField"',
    });
  }
  const entries: readonly FolderMini[] = sdIsList(val.entries)
    ? (val.entries.map(function (itm: SerializedData): FolderMini {
        return deserializeFolderMini(itm);
      }) as readonly any[])
    : [];
  return {
    totalCount: totalCount,
    entries: entries,
  } satisfies TrashWebLinkRestoredPathCollectionField;
}
export function serializeTrashWebLinkRestoredItemStatusField(
  val: TrashWebLinkRestoredItemStatusField,
): SerializedData {
  return val;
}
export function deserializeTrashWebLinkRestoredItemStatusField(
  val: SerializedData,
): TrashWebLinkRestoredItemStatusField {
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
    message: "Can't deserialize TrashWebLinkRestoredItemStatusField",
  });
}
export function serializeTrashWebLinkRestored(
  val: TrashWebLinkRestored,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTrashWebLinkRestoredTypeField(val.type),
    ['id']: val.id,
    ['sequence_id']: val.sequenceId,
    ['etag']: val.etag,
    ['name']: val.name,
    ['url']: val.url,
    ['parent']:
      val.parent == void 0 ? val.parent : serializeFolderMini(val.parent),
    ['description']: val.description,
    ['path_collection']: serializeTrashWebLinkRestoredPathCollectionField(
      val.pathCollection,
    ),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['modified_at']:
      val.modifiedAt == void 0
        ? val.modifiedAt
        : serializeDateTime(val.modifiedAt),
    ['trashed_at']: val.trashedAt,
    ['purged_at']: val.purgedAt,
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
        : serializeTrashWebLinkRestoredItemStatusField(val.itemStatus),
  };
}
export function deserializeTrashWebLinkRestored(
  val: SerializedData,
): TrashWebLinkRestored {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TrashWebLinkRestored"',
    });
  }
  const type: undefined | TrashWebLinkRestoredTypeField =
    val.type == void 0
      ? void 0
      : deserializeTrashWebLinkRestoredTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TrashWebLinkRestored"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (val.sequence_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "sequence_id" of type "TrashWebLinkRestored" to be defined',
    });
  }
  if (!sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "sequence_id" of type "TrashWebLinkRestored"',
    });
  }
  const sequenceId: string = val.sequence_id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "TrashWebLinkRestored"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "TrashWebLinkRestored"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "TrashWebLinkRestored"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "TrashWebLinkRestored"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (val.path_collection == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "path_collection" of type "TrashWebLinkRestored" to be defined',
    });
  }
  const pathCollection: TrashWebLinkRestoredPathCollectionField =
    deserializeTrashWebLinkRestoredPathCollectionField(val.path_collection);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "TrashWebLinkRestored"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "modified_at" of type "TrashWebLinkRestored"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "trashed_at" of type "TrashWebLinkRestored"',
    });
  }
  const trashedAt: undefined | string =
    val.trashed_at == void 0 ? void 0 : val.trashed_at;
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "purged_at" of type "TrashWebLinkRestored"',
    });
  }
  const purgedAt: undefined | string =
    val.purged_at == void 0 ? void 0 : val.purged_at;
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  const modifiedBy: undefined | UserMini =
    val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
  const ownedBy: undefined | UserMini =
    val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
  if (!(val.shared_link == void 0) && !sdIsString(val.shared_link)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "shared_link" of type "TrashWebLinkRestored"',
    });
  }
  const sharedLink: undefined | string =
    val.shared_link == void 0 ? void 0 : val.shared_link;
  const itemStatus: undefined | TrashWebLinkRestoredItemStatusField =
    val.item_status == void 0
      ? void 0
      : deserializeTrashWebLinkRestoredItemStatusField(val.item_status);
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
  } satisfies TrashWebLinkRestored;
}

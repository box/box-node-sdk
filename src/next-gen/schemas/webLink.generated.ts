import { serializeWebLinkBaseTypeField } from './webLinkBase.generated.js';
import { deserializeWebLinkBaseTypeField } from './webLinkBase.generated.js';
import { serializeWebLinkBase } from './webLinkBase.generated.js';
import { deserializeWebLinkBase } from './webLinkBase.generated.js';
import { serializeWebLinkMini } from './webLinkMini.generated.js';
import { deserializeWebLinkMini } from './webLinkMini.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { WebLinkBaseTypeField } from './webLinkBase.generated.js';
import { WebLinkBase } from './webLinkBase.generated.js';
import { WebLinkMini } from './webLinkMini.generated.js';
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
export interface WebLinkPathCollectionField {
  /**
   * The number of folders in this list. */
  readonly totalCount: number;
  /**
   * The parent folders for this item */
  readonly entries: readonly FolderMini[];
  readonly rawData?: SerializedData;
}
export type WebLinkSharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export type WebLinkSharedLinkEffectiveAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export type WebLinkSharedLinkEffectivePermissionField =
  | 'can_edit'
  | 'can_download'
  | 'can_preview'
  | 'no_access'
  | string;
export interface WebLinkSharedLinkPermissionsField {
  /**
   * Defines if the shared link allows for the item to be downloaded. For
   * shared links on folders, this also applies to any items in the folder.
   *
   * This value can be set to `true` when the effective access level is
   * set to `open` or `company`, not `collaborators`. */
  readonly canDownload: boolean;
  /**
   * Defines if the shared link allows for the item to be previewed.
   *
   * This value is always `true`. For shared links on folders this also
   * applies to any items in the folder. */
  readonly canPreview: boolean;
  /**
   * Defines if the shared link allows for the item to be edited.
   *
   * This value can only be `true` if `can_download` is also `true` and if
   * the item has a type of `file`. */
  readonly canEdit: boolean;
  readonly rawData?: SerializedData;
}
export interface WebLinkSharedLinkField {
  /**
   * The URL that can be used to access the item on Box.
   *
   * This URL will display the item in Box's preview UI where the file
   * can be downloaded if allowed.
   *
   * This URL will continue to work even when a custom `vanity_url`
   * has been set for this shared link. */
  readonly url: string;
  /**
   * A URL that can be used to download the file. This URL can be used in
   * a browser to download the file. This URL includes the file
   * extension so that the file will be saved with the right file type.
   *
   * This property will be `null` for folders. */
  readonly downloadUrl?: string | null;
  /**
   * The "Custom URL" that can also be used to preview the item on Box.  Custom
   * URLs can only be created or modified in the Box Web application. */
  readonly vanityUrl?: string | null;
  /**
   * The custom name of a shared link, as used in the `vanity_url` field. */
  readonly vanityName?: string | null;
  /**
   * The access level for this shared link.
   *
   * * `open` - provides access to this item to anyone with this link
   * * `company` - only provides access to this item to people the same company
   * * `collaborators` - only provides access to this item to people who are
   *    collaborators on this item
   *
   * If this field is omitted when creating the shared link, the access level
   * will be set to the default access level specified by the enterprise admin. */
  readonly access?: WebLinkSharedLinkAccessField;
  /**
   * The effective access level for the shared link. This can be a more
   * restrictive access level than the value in the `access` field when the
   * enterprise settings restrict the allowed access levels. */
  readonly effectiveAccess: WebLinkSharedLinkEffectiveAccessField;
  /**
   * The effective permissions for this shared link.
   * These result in the more restrictive combination of
   * the share link permissions and the item permissions set
   * by the administrator, the owner, and any ancestor item
   * such as a folder. */
  readonly effectivePermission: WebLinkSharedLinkEffectivePermissionField;
  /**
   * The date and time when this link will be unshared. This field can only be
   * set by users with paid accounts. */
  readonly unsharedAt?: DateTime | null;
  /**
   * Defines if the shared link requires a password to access the item. */
  readonly isPasswordEnabled: boolean;
  /**
   * Defines if this link allows a user to preview, edit, and download an item.
   * These permissions refer to the shared link only and
   * do not supersede permissions applied to the item itself. */
  readonly permissions?: WebLinkSharedLinkPermissionsField;
  /**
   * The number of times this item has been downloaded. */
  readonly downloadCount: number;
  /**
   * The number of times this item has been previewed. */
  readonly previewCount: number;
  readonly rawData?: SerializedData;
}
export type WebLinkItemStatusField = 'active' | 'trashed' | 'deleted' | string;
export class WebLink extends WebLinkMini {
  readonly parent?: FolderMini;
  readonly description?: string;
  readonly pathCollection?: WebLinkPathCollectionField;
  readonly createdAt?: DateTime;
  readonly modifiedAt?: DateTime;
  readonly trashedAt?: DateTime | null;
  readonly purgedAt?: DateTime | null;
  readonly createdBy?: UserMini;
  readonly modifiedBy?: UserMini;
  readonly ownedBy?: UserMini;
  readonly sharedLink?: WebLinkSharedLinkField;
  readonly itemStatus?: WebLinkItemStatusField;
  constructor(fields: WebLink) {
    super(fields);
    if (fields.parent !== undefined) {
      this.parent = fields.parent;
    }
    if (fields.description !== undefined) {
      this.description = fields.description;
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
    if (fields.itemStatus !== undefined) {
      this.itemStatus = fields.itemStatus;
    }
  }
}
export function serializeWebLinkPathCollectionField(
  val: WebLinkPathCollectionField,
): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']: val.entries.map(function (item: FolderMini): SerializedData {
      return serializeFolderMini(item);
    }) as readonly any[],
  };
}
export function deserializeWebLinkPathCollectionField(
  val: SerializedData,
): WebLinkPathCollectionField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WebLinkPathCollectionField"',
    });
  }
  if (val.total_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "total_count" of type "WebLinkPathCollectionField" to be defined',
    });
  }
  if (!sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_count" of type "WebLinkPathCollectionField"',
    });
  }
  const totalCount: number = val.total_count;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "WebLinkPathCollectionField" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "WebLinkPathCollectionField"',
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
  } satisfies WebLinkPathCollectionField;
}
export function serializeWebLinkSharedLinkAccessField(
  val: WebLinkSharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeWebLinkSharedLinkAccessField(
  val: SerializedData,
): WebLinkSharedLinkAccessField {
  if (val == 'open') {
    return val;
  }
  if (val == 'company') {
    return val;
  }
  if (val == 'collaborators') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WebLinkSharedLinkAccessField",
  });
}
export function serializeWebLinkSharedLinkEffectiveAccessField(
  val: WebLinkSharedLinkEffectiveAccessField,
): SerializedData {
  return val;
}
export function deserializeWebLinkSharedLinkEffectiveAccessField(
  val: SerializedData,
): WebLinkSharedLinkEffectiveAccessField {
  if (val == 'open') {
    return val;
  }
  if (val == 'company') {
    return val;
  }
  if (val == 'collaborators') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WebLinkSharedLinkEffectiveAccessField",
  });
}
export function serializeWebLinkSharedLinkEffectivePermissionField(
  val: WebLinkSharedLinkEffectivePermissionField,
): SerializedData {
  return val;
}
export function deserializeWebLinkSharedLinkEffectivePermissionField(
  val: SerializedData,
): WebLinkSharedLinkEffectivePermissionField {
  if (val == 'can_edit') {
    return val;
  }
  if (val == 'can_download') {
    return val;
  }
  if (val == 'can_preview') {
    return val;
  }
  if (val == 'no_access') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WebLinkSharedLinkEffectivePermissionField",
  });
}
export function serializeWebLinkSharedLinkPermissionsField(
  val: WebLinkSharedLinkPermissionsField,
): SerializedData {
  return {
    ['can_download']: val.canDownload,
    ['can_preview']: val.canPreview,
    ['can_edit']: val.canEdit,
  };
}
export function deserializeWebLinkSharedLinkPermissionsField(
  val: SerializedData,
): WebLinkSharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WebLinkSharedLinkPermissionsField"',
    });
  }
  if (val.can_download == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_download" of type "WebLinkSharedLinkPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "WebLinkSharedLinkPermissionsField"',
    });
  }
  const canDownload: boolean = val.can_download;
  if (val.can_preview == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_preview" of type "WebLinkSharedLinkPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_preview)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_preview" of type "WebLinkSharedLinkPermissionsField"',
    });
  }
  const canPreview: boolean = val.can_preview;
  if (val.can_edit == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_edit" of type "WebLinkSharedLinkPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_edit)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_edit" of type "WebLinkSharedLinkPermissionsField"',
    });
  }
  const canEdit: boolean = val.can_edit;
  return {
    canDownload: canDownload,
    canPreview: canPreview,
    canEdit: canEdit,
  } satisfies WebLinkSharedLinkPermissionsField;
}
export function serializeWebLinkSharedLinkField(
  val: WebLinkSharedLinkField,
): SerializedData {
  return {
    ['url']: val.url,
    ['download_url']: val.downloadUrl,
    ['vanity_url']: val.vanityUrl,
    ['vanity_name']: val.vanityName,
    ['access']:
      val.access == void 0
        ? val.access
        : serializeWebLinkSharedLinkAccessField(val.access),
    ['effective_access']: serializeWebLinkSharedLinkEffectiveAccessField(
      val.effectiveAccess,
    ),
    ['effective_permission']:
      serializeWebLinkSharedLinkEffectivePermissionField(
        val.effectivePermission,
      ),
    ['unshared_at']:
      val.unsharedAt == void 0
        ? val.unsharedAt
        : serializeDateTime(val.unsharedAt),
    ['is_password_enabled']: val.isPasswordEnabled,
    ['permissions']:
      val.permissions == void 0
        ? val.permissions
        : serializeWebLinkSharedLinkPermissionsField(val.permissions),
    ['download_count']: val.downloadCount,
    ['preview_count']: val.previewCount,
  };
}
export function deserializeWebLinkSharedLinkField(
  val: SerializedData,
): WebLinkSharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WebLinkSharedLinkField"',
    });
  }
  if (val.url == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "url" of type "WebLinkSharedLinkField" to be defined',
    });
  }
  if (!sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "WebLinkSharedLinkField"',
    });
  }
  const url: string = val.url;
  if (!(val.download_url == void 0) && !sdIsString(val.download_url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "download_url" of type "WebLinkSharedLinkField"',
    });
  }
  const downloadUrl: undefined | string =
    val.download_url == void 0 ? void 0 : val.download_url;
  if (!(val.vanity_url == void 0) && !sdIsString(val.vanity_url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_url" of type "WebLinkSharedLinkField"',
    });
  }
  const vanityUrl: undefined | string =
    val.vanity_url == void 0 ? void 0 : val.vanity_url;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "WebLinkSharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  const access: undefined | WebLinkSharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeWebLinkSharedLinkAccessField(val.access);
  if (val.effective_access == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "effective_access" of type "WebLinkSharedLinkField" to be defined',
    });
  }
  const effectiveAccess: WebLinkSharedLinkEffectiveAccessField =
    deserializeWebLinkSharedLinkEffectiveAccessField(val.effective_access);
  if (val.effective_permission == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "effective_permission" of type "WebLinkSharedLinkField" to be defined',
    });
  }
  const effectivePermission: WebLinkSharedLinkEffectivePermissionField =
    deserializeWebLinkSharedLinkEffectivePermissionField(
      val.effective_permission,
    );
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "WebLinkSharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  if (val.is_password_enabled == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "is_password_enabled" of type "WebLinkSharedLinkField" to be defined',
    });
  }
  if (!sdIsBoolean(val.is_password_enabled)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_password_enabled" of type "WebLinkSharedLinkField"',
    });
  }
  const isPasswordEnabled: boolean = val.is_password_enabled;
  const permissions: undefined | WebLinkSharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeWebLinkSharedLinkPermissionsField(val.permissions);
  if (val.download_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "download_count" of type "WebLinkSharedLinkField" to be defined',
    });
  }
  if (!sdIsNumber(val.download_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "download_count" of type "WebLinkSharedLinkField"',
    });
  }
  const downloadCount: number = val.download_count;
  if (val.preview_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "preview_count" of type "WebLinkSharedLinkField" to be defined',
    });
  }
  if (!sdIsNumber(val.preview_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "preview_count" of type "WebLinkSharedLinkField"',
    });
  }
  const previewCount: number = val.preview_count;
  return {
    url: url,
    downloadUrl: downloadUrl,
    vanityUrl: vanityUrl,
    vanityName: vanityName,
    access: access,
    effectiveAccess: effectiveAccess,
    effectivePermission: effectivePermission,
    unsharedAt: unsharedAt,
    isPasswordEnabled: isPasswordEnabled,
    permissions: permissions,
    downloadCount: downloadCount,
    previewCount: previewCount,
  } satisfies WebLinkSharedLinkField;
}
export function serializeWebLinkItemStatusField(
  val: WebLinkItemStatusField,
): SerializedData {
  return val;
}
export function deserializeWebLinkItemStatusField(
  val: SerializedData,
): WebLinkItemStatusField {
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
    message: "Can't deserialize WebLinkItemStatusField",
  });
}
export function serializeWebLink(val: WebLink): SerializedData {
  const base: any = serializeWebLinkMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "WebLink"' });
  }
  return {
    ...base,
    ...{
      ['parent']:
        val.parent == void 0 ? val.parent : serializeFolderMini(val.parent),
      ['description']: val.description,
      ['path_collection']:
        val.pathCollection == void 0
          ? val.pathCollection
          : serializeWebLinkPathCollectionField(val.pathCollection),
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
      ['shared_link']:
        val.sharedLink == void 0
          ? val.sharedLink
          : serializeWebLinkSharedLinkField(val.sharedLink),
      ['item_status']:
        val.itemStatus == void 0
          ? val.itemStatus
          : serializeWebLinkItemStatusField(val.itemStatus),
    },
  };
}
export function deserializeWebLink(val: SerializedData): WebLink {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "WebLink"' });
  }
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "WebLink"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const pathCollection: undefined | WebLinkPathCollectionField =
    val.path_collection == void 0
      ? void 0
      : deserializeWebLinkPathCollectionField(val.path_collection);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "WebLink"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "WebLink"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "trashed_at" of type "WebLink"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "WebLink"',
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
  const sharedLink: undefined | WebLinkSharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeWebLinkSharedLinkField(val.shared_link);
  const itemStatus: undefined | WebLinkItemStatusField =
    val.item_status == void 0
      ? void 0
      : deserializeWebLinkItemStatusField(val.item_status);
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "WebLink"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "WebLink"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "WebLink"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "WebLink" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WebLink"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "WebLink" to be defined',
    });
  }
  const type: WebLinkBaseTypeField = deserializeWebLinkBaseTypeField(val.type);
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "WebLink"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  return {
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
    url: url,
    sequenceId: sequenceId,
    name: name,
    id: id,
    type: type,
    etag: etag,
  } satisfies WebLink;
}

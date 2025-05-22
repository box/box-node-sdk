import { serializeFolderBaseTypeField } from './folderBase.generated.js';
import { deserializeFolderBaseTypeField } from './folderBase.generated.js';
import { serializeFolderBase } from './folderBase.generated.js';
import { deserializeFolderBase } from './folderBase.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeItems } from './items.generated.js';
import { deserializeItems } from './items.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { FolderBaseTypeField } from './folderBase.generated.js';
import { FolderBase } from './folderBase.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { UserMini } from './userMini.generated.js';
import { Items } from './items.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface FolderPathCollectionField {
  /**
   * The number of folders in this list. */
  readonly totalCount: number;
  /**
   * The parent folders for this item */
  readonly entries: readonly FolderMini[];
  readonly rawData?: SerializedData;
}
export type FolderSharedLinkAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export type FolderSharedLinkEffectiveAccessField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export type FolderSharedLinkEffectivePermissionField =
  | 'can_edit'
  | 'can_download'
  | 'can_preview'
  | 'no_access'
  | string;
export interface FolderSharedLinkPermissionsField {
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
export interface FolderSharedLinkField {
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
  readonly access?: FolderSharedLinkAccessField;
  /**
   * The effective access level for the shared link. This can be a more
   * restrictive access level than the value in the `access` field when the
   * enterprise settings restrict the allowed access levels. */
  readonly effectiveAccess: FolderSharedLinkEffectiveAccessField;
  /**
   * The effective permissions for this shared link.
   * These result in the more restrictive combination of
   * the share link permissions and the item permissions set
   * by the administrator, the owner, and any ancestor item
   * such as a folder. */
  readonly effectivePermission: FolderSharedLinkEffectivePermissionField;
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
  readonly permissions?: FolderSharedLinkPermissionsField;
  /**
   * The number of times this item has been downloaded. */
  readonly downloadCount: number;
  /**
   * The number of times this item has been previewed. */
  readonly previewCount: number;
  readonly rawData?: SerializedData;
}
export type FolderFolderUploadEmailAccessField =
  | 'open'
  | 'collaborators'
  | string;
export interface FolderFolderUploadEmailField {
  /**
   * When this parameter has been set, users can email files
   * to the email address that has been automatically
   * created for this folder.
   *
   * To create an email address, set this property either when
   * creating or updating the folder.
   *
   * When set to `collaborators`, only emails from registered email
   * addresses for collaborators will be accepted. This includes
   * any email aliases a user might have registered.
   *
   * When set to `open` it will accept emails from any email
   * address. */
  readonly access?: FolderFolderUploadEmailAccessField;
  /**
   * The optional upload email address for this folder. */
  readonly email?: string;
  readonly rawData?: SerializedData;
}
export type FolderItemStatusField = 'active' | 'trashed' | 'deleted' | string;
export class Folder extends FolderMini {
  readonly createdAt?: DateTime | null;
  readonly modifiedAt?: DateTime | null;
  readonly description?: string;
  readonly size?: number;
  readonly pathCollection?: FolderPathCollectionField;
  readonly createdBy?: UserMini;
  readonly modifiedBy?: UserMini;
  readonly trashedAt?: DateTime | null;
  readonly purgedAt?: DateTime | null;
  readonly contentCreatedAt?: DateTime | null;
  readonly contentModifiedAt?: DateTime | null;
  readonly ownedBy?: UserMini;
  readonly sharedLink?: FolderSharedLinkField | null;
  readonly folderUploadEmail?: FolderFolderUploadEmailField | null;
  readonly parent?: FolderMini | null;
  readonly itemStatus?: FolderItemStatusField;
  readonly itemCollection?: Items;
  constructor(fields: Folder) {
    super(fields);
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
    if (fields.itemCollection !== undefined) {
      this.itemCollection = fields.itemCollection;
    }
  }
}
export function serializeFolderPathCollectionField(
  val: FolderPathCollectionField,
): SerializedData {
  return {
    ['total_count']: val.totalCount,
    ['entries']: val.entries.map(function (item: FolderMini): SerializedData {
      return serializeFolderMini(item);
    }) as readonly any[],
  };
}
export function deserializeFolderPathCollectionField(
  val: SerializedData,
): FolderPathCollectionField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderPathCollectionField"',
    });
  }
  if (val.total_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "total_count" of type "FolderPathCollectionField" to be defined',
    });
  }
  if (!sdIsNumber(val.total_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "total_count" of type "FolderPathCollectionField"',
    });
  }
  const totalCount: number = val.total_count;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "FolderPathCollectionField" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "FolderPathCollectionField"',
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
  } satisfies FolderPathCollectionField;
}
export function serializeFolderSharedLinkAccessField(
  val: FolderSharedLinkAccessField,
): SerializedData {
  return val;
}
export function deserializeFolderSharedLinkAccessField(
  val: SerializedData,
): FolderSharedLinkAccessField {
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
    message: "Can't deserialize FolderSharedLinkAccessField",
  });
}
export function serializeFolderSharedLinkEffectiveAccessField(
  val: FolderSharedLinkEffectiveAccessField,
): SerializedData {
  return val;
}
export function deserializeFolderSharedLinkEffectiveAccessField(
  val: SerializedData,
): FolderSharedLinkEffectiveAccessField {
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
    message: "Can't deserialize FolderSharedLinkEffectiveAccessField",
  });
}
export function serializeFolderSharedLinkEffectivePermissionField(
  val: FolderSharedLinkEffectivePermissionField,
): SerializedData {
  return val;
}
export function deserializeFolderSharedLinkEffectivePermissionField(
  val: SerializedData,
): FolderSharedLinkEffectivePermissionField {
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
    message: "Can't deserialize FolderSharedLinkEffectivePermissionField",
  });
}
export function serializeFolderSharedLinkPermissionsField(
  val: FolderSharedLinkPermissionsField,
): SerializedData {
  return {
    ['can_download']: val.canDownload,
    ['can_preview']: val.canPreview,
    ['can_edit']: val.canEdit,
  };
}
export function deserializeFolderSharedLinkPermissionsField(
  val: SerializedData,
): FolderSharedLinkPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderSharedLinkPermissionsField"',
    });
  }
  if (val.can_download == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_download" of type "FolderSharedLinkPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "FolderSharedLinkPermissionsField"',
    });
  }
  const canDownload: boolean = val.can_download;
  if (val.can_preview == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_preview" of type "FolderSharedLinkPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_preview)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_preview" of type "FolderSharedLinkPermissionsField"',
    });
  }
  const canPreview: boolean = val.can_preview;
  if (val.can_edit == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_edit" of type "FolderSharedLinkPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_edit)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_edit" of type "FolderSharedLinkPermissionsField"',
    });
  }
  const canEdit: boolean = val.can_edit;
  return {
    canDownload: canDownload,
    canPreview: canPreview,
    canEdit: canEdit,
  } satisfies FolderSharedLinkPermissionsField;
}
export function serializeFolderSharedLinkField(
  val: FolderSharedLinkField,
): SerializedData {
  return {
    ['url']: val.url,
    ['download_url']: val.downloadUrl,
    ['vanity_url']: val.vanityUrl,
    ['vanity_name']: val.vanityName,
    ['access']:
      val.access == void 0
        ? val.access
        : serializeFolderSharedLinkAccessField(val.access),
    ['effective_access']: serializeFolderSharedLinkEffectiveAccessField(
      val.effectiveAccess,
    ),
    ['effective_permission']: serializeFolderSharedLinkEffectivePermissionField(
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
        : serializeFolderSharedLinkPermissionsField(val.permissions),
    ['download_count']: val.downloadCount,
    ['preview_count']: val.previewCount,
  };
}
export function deserializeFolderSharedLinkField(
  val: SerializedData,
): FolderSharedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderSharedLinkField"',
    });
  }
  if (val.url == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "url" of type "FolderSharedLinkField" to be defined',
    });
  }
  if (!sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "FolderSharedLinkField"',
    });
  }
  const url: string = val.url;
  if (!(val.download_url == void 0) && !sdIsString(val.download_url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "download_url" of type "FolderSharedLinkField"',
    });
  }
  const downloadUrl: undefined | string =
    val.download_url == void 0 ? void 0 : val.download_url;
  if (!(val.vanity_url == void 0) && !sdIsString(val.vanity_url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_url" of type "FolderSharedLinkField"',
    });
  }
  const vanityUrl: undefined | string =
    val.vanity_url == void 0 ? void 0 : val.vanity_url;
  if (!(val.vanity_name == void 0) && !sdIsString(val.vanity_name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "vanity_name" of type "FolderSharedLinkField"',
    });
  }
  const vanityName: undefined | string =
    val.vanity_name == void 0 ? void 0 : val.vanity_name;
  const access: undefined | FolderSharedLinkAccessField =
    val.access == void 0
      ? void 0
      : deserializeFolderSharedLinkAccessField(val.access);
  if (val.effective_access == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "effective_access" of type "FolderSharedLinkField" to be defined',
    });
  }
  const effectiveAccess: FolderSharedLinkEffectiveAccessField =
    deserializeFolderSharedLinkEffectiveAccessField(val.effective_access);
  if (val.effective_permission == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "effective_permission" of type "FolderSharedLinkField" to be defined',
    });
  }
  const effectivePermission: FolderSharedLinkEffectivePermissionField =
    deserializeFolderSharedLinkEffectivePermissionField(
      val.effective_permission,
    );
  if (!(val.unshared_at == void 0) && !sdIsString(val.unshared_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "unshared_at" of type "FolderSharedLinkField"',
    });
  }
  const unsharedAt: undefined | DateTime =
    val.unshared_at == void 0 ? void 0 : deserializeDateTime(val.unshared_at);
  if (val.is_password_enabled == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "is_password_enabled" of type "FolderSharedLinkField" to be defined',
    });
  }
  if (!sdIsBoolean(val.is_password_enabled)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_password_enabled" of type "FolderSharedLinkField"',
    });
  }
  const isPasswordEnabled: boolean = val.is_password_enabled;
  const permissions: undefined | FolderSharedLinkPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeFolderSharedLinkPermissionsField(val.permissions);
  if (val.download_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "download_count" of type "FolderSharedLinkField" to be defined',
    });
  }
  if (!sdIsNumber(val.download_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "download_count" of type "FolderSharedLinkField"',
    });
  }
  const downloadCount: number = val.download_count;
  if (val.preview_count == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "preview_count" of type "FolderSharedLinkField" to be defined',
    });
  }
  if (!sdIsNumber(val.preview_count)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "preview_count" of type "FolderSharedLinkField"',
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
  } satisfies FolderSharedLinkField;
}
export function serializeFolderFolderUploadEmailAccessField(
  val: FolderFolderUploadEmailAccessField,
): SerializedData {
  return val;
}
export function deserializeFolderFolderUploadEmailAccessField(
  val: SerializedData,
): FolderFolderUploadEmailAccessField {
  if (val == 'open') {
    return val;
  }
  if (val == 'collaborators') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FolderFolderUploadEmailAccessField",
  });
}
export function serializeFolderFolderUploadEmailField(
  val: FolderFolderUploadEmailField,
): SerializedData {
  return {
    ['access']:
      val.access == void 0
        ? val.access
        : serializeFolderFolderUploadEmailAccessField(val.access),
    ['email']: val.email,
  };
}
export function deserializeFolderFolderUploadEmailField(
  val: SerializedData,
): FolderFolderUploadEmailField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderFolderUploadEmailField"',
    });
  }
  const access: undefined | FolderFolderUploadEmailAccessField =
    val.access == void 0
      ? void 0
      : deserializeFolderFolderUploadEmailAccessField(val.access);
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email" of type "FolderFolderUploadEmailField"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  return {
    access: access,
    email: email,
  } satisfies FolderFolderUploadEmailField;
}
export function serializeFolderItemStatusField(
  val: FolderItemStatusField,
): SerializedData {
  return val;
}
export function deserializeFolderItemStatusField(
  val: SerializedData,
): FolderItemStatusField {
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
  throw new BoxSdkError({ message: "Can't deserialize FolderItemStatusField" });
}
export function serializeFolder(val: Folder): SerializedData {
  const base: any = serializeFolderMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Folder"' });
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
      ['description']: val.description,
      ['size']: val.size,
      ['path_collection']:
        val.pathCollection == void 0
          ? val.pathCollection
          : serializeFolderPathCollectionField(val.pathCollection),
      ['created_by']:
        val.createdBy == void 0
          ? val.createdBy
          : serializeUserMini(val.createdBy),
      ['modified_by']:
        val.modifiedBy == void 0
          ? val.modifiedBy
          : serializeUserMini(val.modifiedBy),
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
      ['owned_by']:
        val.ownedBy == void 0 ? val.ownedBy : serializeUserMini(val.ownedBy),
      ['shared_link']:
        val.sharedLink == void 0
          ? val.sharedLink
          : serializeFolderSharedLinkField(val.sharedLink),
      ['folder_upload_email']:
        val.folderUploadEmail == void 0
          ? val.folderUploadEmail
          : serializeFolderFolderUploadEmailField(val.folderUploadEmail),
      ['parent']:
        val.parent == void 0 ? val.parent : serializeFolderMini(val.parent),
      ['item_status']:
        val.itemStatus == void 0
          ? val.itemStatus
          : serializeFolderItemStatusField(val.itemStatus),
      ['item_collection']:
        val.itemCollection == void 0
          ? val.itemCollection
          : serializeItems(val.itemCollection),
    },
  };
}
export function deserializeFolder(val: SerializedData): Folder {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Folder"' });
  }
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "Folder"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "Folder"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "Folder"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.size == void 0) && !sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "Folder"',
    });
  }
  const size: undefined | number = val.size == void 0 ? void 0 : val.size;
  const pathCollection: undefined | FolderPathCollectionField =
    val.path_collection == void 0
      ? void 0
      : deserializeFolderPathCollectionField(val.path_collection);
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  const modifiedBy: undefined | UserMini =
    val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "trashed_at" of type "Folder"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "Folder"',
    });
  }
  const purgedAt: undefined | DateTime =
    val.purged_at == void 0 ? void 0 : deserializeDateTime(val.purged_at);
  if (
    !(val.content_created_at == void 0) &&
    !sdIsString(val.content_created_at)
  ) {
    throw new BoxSdkError({
      message: 'Expecting string for "content_created_at" of type "Folder"',
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
      message: 'Expecting string for "content_modified_at" of type "Folder"',
    });
  }
  const contentModifiedAt: undefined | DateTime =
    val.content_modified_at == void 0
      ? void 0
      : deserializeDateTime(val.content_modified_at);
  const ownedBy: undefined | UserMini =
    val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
  const sharedLink: undefined | FolderSharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeFolderSharedLinkField(val.shared_link);
  const folderUploadEmail: undefined | FolderFolderUploadEmailField =
    val.folder_upload_email == void 0
      ? void 0
      : deserializeFolderFolderUploadEmailField(val.folder_upload_email);
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  const itemStatus: undefined | FolderItemStatusField =
    val.item_status == void 0
      ? void 0
      : deserializeFolderItemStatusField(val.item_status);
  const itemCollection: undefined | Items =
    val.item_collection == void 0
      ? void 0
      : deserializeItems(val.item_collection);
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "Folder"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "Folder"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "Folder" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "Folder"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "Folder"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "Folder" to be defined',
    });
  }
  const type: FolderBaseTypeField = deserializeFolderBaseTypeField(val.type);
  return {
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
    itemCollection: itemCollection,
    sequenceId: sequenceId,
    name: name,
    id: id,
    etag: etag,
    type: type,
  } satisfies Folder;
}

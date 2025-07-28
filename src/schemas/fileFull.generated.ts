import { serializeFileBaseTypeField } from './fileBase.generated.js';
import { deserializeFileBaseTypeField } from './fileBase.generated.js';
import { serializeFileBase } from './fileBase.generated.js';
import { deserializeFileBase } from './fileBase.generated.js';
import { serializeFileVersionMini } from './fileVersionMini.generated.js';
import { deserializeFileVersionMini } from './fileVersionMini.generated.js';
import { serializeFileMini } from './fileMini.generated.js';
import { deserializeFileMini } from './fileMini.generated.js';
import { serializeFilePathCollectionField } from './file.generated.js';
import { deserializeFilePathCollectionField } from './file.generated.js';
import { serializeFileSharedLinkField } from './file.generated.js';
import { deserializeFileSharedLinkField } from './file.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeFileItemStatusField } from './file.generated.js';
import { deserializeFileItemStatusField } from './file.generated.js';
import { serializeFile } from './file.generated.js';
import { deserializeFile } from './file.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeFileOrFolderScope } from './fileOrFolderScope.generated.js';
import { deserializeFileOrFolderScope } from './fileOrFolderScope.generated.js';
import { serializeMetadataFull } from './metadataFull.generated.js';
import { deserializeMetadataFull } from './metadataFull.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { FileBaseTypeField } from './fileBase.generated.js';
import { FileBase } from './fileBase.generated.js';
import { FileVersionMini } from './fileVersionMini.generated.js';
import { FileMini } from './fileMini.generated.js';
import { FilePathCollectionField } from './file.generated.js';
import { FileSharedLinkField } from './file.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { FileItemStatusField } from './file.generated.js';
import { File } from './file.generated.js';
import { UserMini } from './userMini.generated.js';
import { FileOrFolderScope } from './fileOrFolderScope.generated.js';
import { MetadataFull } from './metadataFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface FileFullPermissionsField {
  /**
   * Specifies if the current user can delete this item. */
  readonly canDelete: boolean;
  /**
   * Specifies if the current user can download this item. */
  readonly canDownload: boolean;
  /**
   * Specifies if the current user can invite new
   * users to collaborate on this item, and if the user can
   * update the role of a user already collaborated on this
   * item. */
  readonly canInviteCollaborator: boolean;
  /**
   * Specifies if the user can rename this item. */
  readonly canRename: boolean;
  /**
   * Specifies if the user can change the access level of an
   * existing shared link on this item. */
  readonly canSetShareAccess: boolean;
  /**
   * Specifies if the user can create a shared link for this item. */
  readonly canShare: boolean;
  /**
   * Specifies if the user can place annotations on this file. */
  readonly canAnnotate: boolean;
  /**
   * Specifies if the user can place comments on this file. */
  readonly canComment: boolean;
  /**
   * Specifies if the user can preview this file. */
  readonly canPreview: boolean;
  /**
   * Specifies if the user can upload a new version of this file. */
  readonly canUpload: boolean;
  /**
   * Specifies if the user view all annotations placed on this file. */
  readonly canViewAnnotationsAll: boolean;
  /**
   * Specifies if the user view annotations placed by themselves
   * on this file. */
  readonly canViewAnnotationsSelf: boolean;
  readonly rawData?: SerializedData;
}
export type FileFullLockTypeField = 'lock';
export type FileFullLockAppTypeField =
  | 'gsuite'
  | 'office_wopi'
  | 'office_wopiplus'
  | 'other'
  | string;
export interface FileFullLockField {
  /**
   * The unique identifier for this lock. */
  readonly id?: string;
  /**
   * The value will always be `lock`. */
  readonly type?: FileFullLockTypeField;
  readonly createdBy?: UserMini;
  /**
   * The time this lock was created at. */
  readonly createdAt?: DateTime;
  /**
   * The time this lock is to expire at, which might be in the past. */
  readonly expiredAt?: DateTime;
  /**
   * Whether or not the file can be downloaded while locked. */
  readonly isDownloadPrevented?: boolean;
  /**
   * If the lock is managed by an application rather than a user, this
   * field identifies the type of the application that holds the lock.
   * This is an open enum and may be extended with additional values in
   * the future. */
  readonly appType?: FileFullLockAppTypeField | null;
  readonly rawData?: SerializedData;
}
export type FileFullExpiringEmbedLinkTokenTypeField = 'bearer' | string;
export interface FileFullExpiringEmbedLinkField {
  /**
   * The requested access token. */
  readonly accessToken?: string;
  /**
   * The time in seconds by which this token will expire. */
  readonly expiresIn?: number;
  /**
   * The type of access token returned. */
  readonly tokenType?: FileFullExpiringEmbedLinkTokenTypeField;
  /**
   * The permissions that this access token permits,
   * providing a list of resources (files, folders, etc)
   * and the scopes permitted for each of those resources. */
  readonly restrictedTo?: readonly FileOrFolderScope[];
  /**
   * The actual expiring embed URL for this file, constructed
   * from the file ID and access tokens specified in this object. */
  readonly url?: string;
  readonly rawData?: SerializedData;
}
export interface FileFullWatermarkInfoField {
  /**
   * Specifies if this item has a watermark applied. */
  readonly isWatermarked?: boolean;
  readonly rawData?: SerializedData;
}
export type FileFullAllowedInviteeRolesField =
  | 'editor'
  | 'viewer'
  | 'previewer'
  | 'uploader'
  | 'previewer uploader'
  | 'viewer uploader'
  | 'co-owner'
  | string;
export interface FileFullMetadataField {
  readonly extraData?: {
    readonly [key: string]: {
      readonly [key: string]: MetadataFull;
    };
  };
  readonly rawData?: SerializedData;
}
export interface FileFullRepresentationsEntriesContentField {
  /**
   * The download URL that can be used to fetch the representation.
   * Make sure to make an authenticated API call to this endpoint.
   *
   * This URL is a template and will require the `{+asset_path}` to
   * be replaced by a path. In general, for unpaged representations
   * it can be replaced by an empty string.
   *
   * For paged representations, replace the `{+asset_path}` with the
   * page to request plus the extension for the file, for example
   * `1.pdf`.
   *
   * When requesting the download URL the following additional
   * query params can be passed along.
   *
   * * `set_content_disposition_type` - Sets the
   * `Content-Disposition` header in the API response with the
   * specified disposition type of either `inline` or `attachment`.
   * If not supplied, the `Content-Disposition` header is not
   * included in the response.
   *
   * * `set_content_disposition_filename` - Allows the application to
   *   define the representation's file name used in the
   *   `Content-Disposition` header.  If not defined, the filename
   *   is derived from the source file name in Box combined with the
   *   extension of the representation. */
  readonly urlTemplate?: string;
  readonly rawData?: SerializedData;
}
export interface FileFullRepresentationsEntriesInfoField {
  /**
   * The API URL that can be used to get more info on this file
   * representation. Make sure to make an authenticated API call
   * to this endpoint. */
  readonly url?: string;
  readonly rawData?: SerializedData;
}
export interface FileFullRepresentationsEntriesPropertiesField {
  /**
   * The width by height size of this representation in pixels. */
  readonly dimensions?: string;
  /**
   * Indicates if the representation is build up out of multiple
   * pages. */
  readonly paged?: string;
  /**
   * Indicates if the representation can be used as a thumbnail of
   * the file. */
  readonly thumb?: string;
  readonly rawData?: SerializedData;
}
export type FileFullRepresentationsEntriesStatusStateField =
  | 'success'
  | 'viewable'
  | 'pending'
  | 'none'
  | string;
export interface FileFullRepresentationsEntriesStatusField {
  /**
   * The status of the representation.
   *
   * * `success` defines the representation as ready to be viewed.
   * * `viewable` defines a video to be ready for viewing.
   * * `pending` defines the representation as to be generated. Retry
   *   this endpoint to re-check the status.
   * * `none` defines that the representation will be created when
   *   requested. Request the URL defined in the `info` object to
   *   trigger this generation. */
  readonly state?: FileFullRepresentationsEntriesStatusStateField;
  readonly rawData?: SerializedData;
}
export interface FileFullRepresentationsEntriesField {
  /**
   * An object containing the URL that can be used to actually fetch
   * the representation. */
  readonly content?: FileFullRepresentationsEntriesContentField;
  /**
   * An object containing the URL that can be used to fetch more info
   * on this representation. */
  readonly info?: FileFullRepresentationsEntriesInfoField;
  /**
   * An object containing the size and type of this presentation. */
  readonly properties?: FileFullRepresentationsEntriesPropertiesField;
  /**
   * Indicates the file type of the returned representation. */
  readonly representation?: string;
  /**
   * An object containing the status of this representation. */
  readonly status?: FileFullRepresentationsEntriesStatusField;
  readonly rawData?: SerializedData;
}
export interface FileFullRepresentationsField {
  /**
   * A list of files. */
  readonly entries?: readonly FileFullRepresentationsEntriesField[];
  readonly rawData?: SerializedData;
}
export interface FileFullClassificationField {
  /**
   * The name of the classification. */
  readonly name?: string;
  /**
   * An explanation of the meaning of this classification. */
  readonly definition?: string;
  /**
   * The color that is used to display the
   * classification label in a user-interface. Colors are defined by the admin
   * or co-admin who created the classification in the Box web app. */
  readonly color?: string;
  readonly rawData?: SerializedData;
}
export type FileFullSharedLinkPermissionOptionsField =
  | 'can_preview'
  | 'can_download'
  | 'can_edit'
  | string;
export class FileFull extends File {
  readonly versionNumber?: string;
  readonly commentCount?: number;
  readonly permissions?: FileFullPermissionsField;
  readonly tags?: readonly string[];
  readonly lock?: FileFullLockField | null;
  readonly extension?: string;
  readonly isPackage?: boolean;
  readonly expiringEmbedLink?: FileFullExpiringEmbedLinkField;
  readonly watermarkInfo?: FileFullWatermarkInfoField;
  readonly isAccessibleViaSharedLink?: boolean;
  readonly allowedInviteeRoles?: readonly FileFullAllowedInviteeRolesField[];
  readonly isExternallyOwned?: boolean;
  readonly hasCollaborations?: boolean;
  readonly metadata?: FileFullMetadataField;
  readonly expiresAt?: DateTime | null;
  readonly representations?: FileFullRepresentationsField;
  readonly classification?: FileFullClassificationField;
  readonly uploaderDisplayName?: string;
  readonly dispositionAt?: DateTime | null;
  readonly sharedLinkPermissionOptions?:
    | readonly FileFullSharedLinkPermissionOptionsField[]
    | null;
  readonly isAssociatedWithAppItem?: boolean;
  constructor(fields: FileFull) {
    super(fields);
    if (fields.versionNumber !== undefined) {
      this.versionNumber = fields.versionNumber;
    }
    if (fields.commentCount !== undefined) {
      this.commentCount = fields.commentCount;
    }
    if (fields.permissions !== undefined) {
      this.permissions = fields.permissions;
    }
    if (fields.tags !== undefined) {
      this.tags = fields.tags;
    }
    if (fields.lock !== undefined) {
      this.lock = fields.lock;
    }
    if (fields.extension !== undefined) {
      this.extension = fields.extension;
    }
    if (fields.isPackage !== undefined) {
      this.isPackage = fields.isPackage;
    }
    if (fields.expiringEmbedLink !== undefined) {
      this.expiringEmbedLink = fields.expiringEmbedLink;
    }
    if (fields.watermarkInfo !== undefined) {
      this.watermarkInfo = fields.watermarkInfo;
    }
    if (fields.isAccessibleViaSharedLink !== undefined) {
      this.isAccessibleViaSharedLink = fields.isAccessibleViaSharedLink;
    }
    if (fields.allowedInviteeRoles !== undefined) {
      this.allowedInviteeRoles = fields.allowedInviteeRoles;
    }
    if (fields.isExternallyOwned !== undefined) {
      this.isExternallyOwned = fields.isExternallyOwned;
    }
    if (fields.hasCollaborations !== undefined) {
      this.hasCollaborations = fields.hasCollaborations;
    }
    if (fields.metadata !== undefined) {
      this.metadata = fields.metadata;
    }
    if (fields.expiresAt !== undefined) {
      this.expiresAt = fields.expiresAt;
    }
    if (fields.representations !== undefined) {
      this.representations = fields.representations;
    }
    if (fields.classification !== undefined) {
      this.classification = fields.classification;
    }
    if (fields.uploaderDisplayName !== undefined) {
      this.uploaderDisplayName = fields.uploaderDisplayName;
    }
    if (fields.dispositionAt !== undefined) {
      this.dispositionAt = fields.dispositionAt;
    }
    if (fields.sharedLinkPermissionOptions !== undefined) {
      this.sharedLinkPermissionOptions = fields.sharedLinkPermissionOptions;
    }
    if (fields.isAssociatedWithAppItem !== undefined) {
      this.isAssociatedWithAppItem = fields.isAssociatedWithAppItem;
    }
  }
}
export function serializeFileFullPermissionsField(
  val: FileFullPermissionsField,
): SerializedData {
  return {
    ['can_delete']: val.canDelete,
    ['can_download']: val.canDownload,
    ['can_invite_collaborator']: val.canInviteCollaborator,
    ['can_rename']: val.canRename,
    ['can_set_share_access']: val.canSetShareAccess,
    ['can_share']: val.canShare,
    ['can_annotate']: val.canAnnotate,
    ['can_comment']: val.canComment,
    ['can_preview']: val.canPreview,
    ['can_upload']: val.canUpload,
    ['can_view_annotations_all']: val.canViewAnnotationsAll,
    ['can_view_annotations_self']: val.canViewAnnotationsSelf,
  };
}
export function deserializeFileFullPermissionsField(
  val: SerializedData,
): FileFullPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullPermissionsField"',
    });
  }
  if (val.can_delete == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_delete" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_delete)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_delete" of type "FileFullPermissionsField"',
    });
  }
  const canDelete: boolean = val.can_delete;
  if (val.can_download == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_download" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "FileFullPermissionsField"',
    });
  }
  const canDownload: boolean = val.can_download;
  if (val.can_invite_collaborator == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_invite_collaborator" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_invite_collaborator)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_invite_collaborator" of type "FileFullPermissionsField"',
    });
  }
  const canInviteCollaborator: boolean = val.can_invite_collaborator;
  if (val.can_rename == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_rename" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_rename)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_rename" of type "FileFullPermissionsField"',
    });
  }
  const canRename: boolean = val.can_rename;
  if (val.can_set_share_access == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_set_share_access" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_set_share_access)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_set_share_access" of type "FileFullPermissionsField"',
    });
  }
  const canSetShareAccess: boolean = val.can_set_share_access;
  if (val.can_share == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_share" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_share)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_share" of type "FileFullPermissionsField"',
    });
  }
  const canShare: boolean = val.can_share;
  if (val.can_annotate == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_annotate" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_annotate)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_annotate" of type "FileFullPermissionsField"',
    });
  }
  const canAnnotate: boolean = val.can_annotate;
  if (val.can_comment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_comment" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_comment)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_comment" of type "FileFullPermissionsField"',
    });
  }
  const canComment: boolean = val.can_comment;
  if (val.can_preview == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_preview" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_preview)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_preview" of type "FileFullPermissionsField"',
    });
  }
  const canPreview: boolean = val.can_preview;
  if (val.can_upload == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_upload" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_upload)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_upload" of type "FileFullPermissionsField"',
    });
  }
  const canUpload: boolean = val.can_upload;
  if (val.can_view_annotations_all == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_view_annotations_all" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_view_annotations_all)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_view_annotations_all" of type "FileFullPermissionsField"',
    });
  }
  const canViewAnnotationsAll: boolean = val.can_view_annotations_all;
  if (val.can_view_annotations_self == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_view_annotations_self" of type "FileFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_view_annotations_self)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_view_annotations_self" of type "FileFullPermissionsField"',
    });
  }
  const canViewAnnotationsSelf: boolean = val.can_view_annotations_self;
  return {
    canDelete: canDelete,
    canDownload: canDownload,
    canInviteCollaborator: canInviteCollaborator,
    canRename: canRename,
    canSetShareAccess: canSetShareAccess,
    canShare: canShare,
    canAnnotate: canAnnotate,
    canComment: canComment,
    canPreview: canPreview,
    canUpload: canUpload,
    canViewAnnotationsAll: canViewAnnotationsAll,
    canViewAnnotationsSelf: canViewAnnotationsSelf,
  } satisfies FileFullPermissionsField;
}
export function serializeFileFullLockTypeField(
  val: FileFullLockTypeField,
): SerializedData {
  return val;
}
export function deserializeFileFullLockTypeField(
  val: SerializedData,
): FileFullLockTypeField {
  if (val == 'lock') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize FileFullLockTypeField" });
}
export function serializeFileFullLockAppTypeField(
  val: FileFullLockAppTypeField,
): SerializedData {
  return val;
}
export function deserializeFileFullLockAppTypeField(
  val: SerializedData,
): FileFullLockAppTypeField {
  if (val == 'gsuite') {
    return val;
  }
  if (val == 'office_wopi') {
    return val;
  }
  if (val == 'office_wopiplus') {
    return val;
  }
  if (val == 'other') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileFullLockAppTypeField",
  });
}
export function serializeFileFullLockField(
  val: FileFullLockField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeFileFullLockTypeField(val.type),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMini(val.createdBy),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['expired_at']:
      val.expiredAt == void 0
        ? val.expiredAt
        : serializeDateTime(val.expiredAt),
    ['is_download_prevented']: val.isDownloadPrevented,
    ['app_type']:
      val.appType == void 0
        ? val.appType
        : serializeFileFullLockAppTypeField(val.appType),
  };
}
export function deserializeFileFullLockField(
  val: SerializedData,
): FileFullLockField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullLockField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileFullLockField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | FileFullLockTypeField =
    val.type == void 0 ? void 0 : deserializeFileFullLockTypeField(val.type);
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "FileFullLockField"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.expired_at == void 0) && !sdIsString(val.expired_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "expired_at" of type "FileFullLockField"',
    });
  }
  const expiredAt: undefined | DateTime =
    val.expired_at == void 0 ? void 0 : deserializeDateTime(val.expired_at);
  if (
    !(val.is_download_prevented == void 0) &&
    !sdIsBoolean(val.is_download_prevented)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_download_prevented" of type "FileFullLockField"',
    });
  }
  const isDownloadPrevented: undefined | boolean =
    val.is_download_prevented == void 0 ? void 0 : val.is_download_prevented;
  const appType: undefined | FileFullLockAppTypeField =
    val.app_type == void 0
      ? void 0
      : deserializeFileFullLockAppTypeField(val.app_type);
  return {
    id: id,
    type: type,
    createdBy: createdBy,
    createdAt: createdAt,
    expiredAt: expiredAt,
    isDownloadPrevented: isDownloadPrevented,
    appType: appType,
  } satisfies FileFullLockField;
}
export function serializeFileFullExpiringEmbedLinkTokenTypeField(
  val: FileFullExpiringEmbedLinkTokenTypeField,
): SerializedData {
  return val;
}
export function deserializeFileFullExpiringEmbedLinkTokenTypeField(
  val: SerializedData,
): FileFullExpiringEmbedLinkTokenTypeField {
  if (val == 'bearer') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileFullExpiringEmbedLinkTokenTypeField",
  });
}
export function serializeFileFullExpiringEmbedLinkField(
  val: FileFullExpiringEmbedLinkField,
): SerializedData {
  return {
    ['access_token']: val.accessToken,
    ['expires_in']: val.expiresIn,
    ['token_type']:
      val.tokenType == void 0
        ? val.tokenType
        : serializeFileFullExpiringEmbedLinkTokenTypeField(val.tokenType),
    ['restricted_to']:
      val.restrictedTo == void 0
        ? val.restrictedTo
        : (val.restrictedTo.map(function (
            item: FileOrFolderScope,
          ): SerializedData {
            return serializeFileOrFolderScope(item);
          }) as readonly any[]),
    ['url']: val.url,
  };
}
export function deserializeFileFullExpiringEmbedLinkField(
  val: SerializedData,
): FileFullExpiringEmbedLinkField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullExpiringEmbedLinkField"',
    });
  }
  if (!(val.access_token == void 0) && !sdIsString(val.access_token)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_token" of type "FileFullExpiringEmbedLinkField"',
    });
  }
  const accessToken: undefined | string =
    val.access_token == void 0 ? void 0 : val.access_token;
  if (!(val.expires_in == void 0) && !sdIsNumber(val.expires_in)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "expires_in" of type "FileFullExpiringEmbedLinkField"',
    });
  }
  const expiresIn: undefined | number =
    val.expires_in == void 0 ? void 0 : val.expires_in;
  const tokenType: undefined | FileFullExpiringEmbedLinkTokenTypeField =
    val.token_type == void 0
      ? void 0
      : deserializeFileFullExpiringEmbedLinkTokenTypeField(val.token_type);
  if (!(val.restricted_to == void 0) && !sdIsList(val.restricted_to)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "restricted_to" of type "FileFullExpiringEmbedLinkField"',
    });
  }
  const restrictedTo: undefined | readonly FileOrFolderScope[] =
    val.restricted_to == void 0
      ? void 0
      : sdIsList(val.restricted_to)
        ? (val.restricted_to.map(function (
            itm: SerializedData,
          ): FileOrFolderScope {
            return deserializeFileOrFolderScope(itm);
          }) as readonly any[])
        : [];
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "url" of type "FileFullExpiringEmbedLinkField"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  return {
    accessToken: accessToken,
    expiresIn: expiresIn,
    tokenType: tokenType,
    restrictedTo: restrictedTo,
    url: url,
  } satisfies FileFullExpiringEmbedLinkField;
}
export function serializeFileFullWatermarkInfoField(
  val: FileFullWatermarkInfoField,
): SerializedData {
  return { ['is_watermarked']: val.isWatermarked };
}
export function deserializeFileFullWatermarkInfoField(
  val: SerializedData,
): FileFullWatermarkInfoField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullWatermarkInfoField"',
    });
  }
  if (!(val.is_watermarked == void 0) && !sdIsBoolean(val.is_watermarked)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_watermarked" of type "FileFullWatermarkInfoField"',
    });
  }
  const isWatermarked: undefined | boolean =
    val.is_watermarked == void 0 ? void 0 : val.is_watermarked;
  return { isWatermarked: isWatermarked } satisfies FileFullWatermarkInfoField;
}
export function serializeFileFullAllowedInviteeRolesField(
  val: FileFullAllowedInviteeRolesField,
): SerializedData {
  return val;
}
export function deserializeFileFullAllowedInviteeRolesField(
  val: SerializedData,
): FileFullAllowedInviteeRolesField {
  if (val == 'editor') {
    return val;
  }
  if (val == 'viewer') {
    return val;
  }
  if (val == 'previewer') {
    return val;
  }
  if (val == 'uploader') {
    return val;
  }
  if (val == 'previewer uploader') {
    return val;
  }
  if (val == 'viewer uploader') {
    return val;
  }
  if (val == 'co-owner') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileFullAllowedInviteeRolesField",
  });
}
export function serializeFileFullMetadataField(
  val: FileFullMetadataField,
): SerializedData {
  return { ...{}, ...val.extraData };
}
export function deserializeFileFullMetadataField(
  val: SerializedData,
): FileFullMetadataField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullMetadataField"',
    });
  }
  if (!(val == void 0) && !sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "extraData" of type "FileFullMetadataField"',
    });
  }
  const extraData:
    | undefined
    | {
        readonly [key: string]: {
          readonly [key: string]: MetadataFull;
        };
      } =
    val == void 0
      ? void 0
      : sdIsMap(val)
        ? (Object.fromEntries(
            Object.entries(val).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return sdIsMap(v)
                  ? (Object.fromEntries(
                      Object.entries(v).map(([k, v]: [string, any]) => [
                        k,
                        deserializeMetadataFull(v),
                      ]),
                    ) as {
                      readonly [key: string]: any;
                    })
                  : {};
              })(v),
            ]),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  return { extraData: extraData } satisfies FileFullMetadataField;
}
export function serializeFileFullRepresentationsEntriesContentField(
  val: FileFullRepresentationsEntriesContentField,
): SerializedData {
  return { ['url_template']: val.urlTemplate };
}
export function deserializeFileFullRepresentationsEntriesContentField(
  val: SerializedData,
): FileFullRepresentationsEntriesContentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "FileFullRepresentationsEntriesContentField"',
    });
  }
  if (!(val.url_template == void 0) && !sdIsString(val.url_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "url_template" of type "FileFullRepresentationsEntriesContentField"',
    });
  }
  const urlTemplate: undefined | string =
    val.url_template == void 0 ? void 0 : val.url_template;
  return {
    urlTemplate: urlTemplate,
  } satisfies FileFullRepresentationsEntriesContentField;
}
export function serializeFileFullRepresentationsEntriesInfoField(
  val: FileFullRepresentationsEntriesInfoField,
): SerializedData {
  return { ['url']: val.url };
}
export function deserializeFileFullRepresentationsEntriesInfoField(
  val: SerializedData,
): FileFullRepresentationsEntriesInfoField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullRepresentationsEntriesInfoField"',
    });
  }
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "url" of type "FileFullRepresentationsEntriesInfoField"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  return { url: url } satisfies FileFullRepresentationsEntriesInfoField;
}
export function serializeFileFullRepresentationsEntriesPropertiesField(
  val: FileFullRepresentationsEntriesPropertiesField,
): SerializedData {
  return {
    ['dimensions']: val.dimensions,
    ['paged']: val.paged,
    ['thumb']: val.thumb,
  };
}
export function deserializeFileFullRepresentationsEntriesPropertiesField(
  val: SerializedData,
): FileFullRepresentationsEntriesPropertiesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "FileFullRepresentationsEntriesPropertiesField"',
    });
  }
  if (!(val.dimensions == void 0) && !sdIsString(val.dimensions)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "dimensions" of type "FileFullRepresentationsEntriesPropertiesField"',
    });
  }
  const dimensions: undefined | string =
    val.dimensions == void 0 ? void 0 : val.dimensions;
  if (!(val.paged == void 0) && !sdIsString(val.paged)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "paged" of type "FileFullRepresentationsEntriesPropertiesField"',
    });
  }
  const paged: undefined | string = val.paged == void 0 ? void 0 : val.paged;
  if (!(val.thumb == void 0) && !sdIsString(val.thumb)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "thumb" of type "FileFullRepresentationsEntriesPropertiesField"',
    });
  }
  const thumb: undefined | string = val.thumb == void 0 ? void 0 : val.thumb;
  return {
    dimensions: dimensions,
    paged: paged,
    thumb: thumb,
  } satisfies FileFullRepresentationsEntriesPropertiesField;
}
export function serializeFileFullRepresentationsEntriesStatusStateField(
  val: FileFullRepresentationsEntriesStatusStateField,
): SerializedData {
  return val;
}
export function deserializeFileFullRepresentationsEntriesStatusStateField(
  val: SerializedData,
): FileFullRepresentationsEntriesStatusStateField {
  if (val == 'success') {
    return val;
  }
  if (val == 'viewable') {
    return val;
  }
  if (val == 'pending') {
    return val;
  }
  if (val == 'none') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileFullRepresentationsEntriesStatusStateField",
  });
}
export function serializeFileFullRepresentationsEntriesStatusField(
  val: FileFullRepresentationsEntriesStatusField,
): SerializedData {
  return {
    ['state']:
      val.state == void 0
        ? val.state
        : serializeFileFullRepresentationsEntriesStatusStateField(val.state),
  };
}
export function deserializeFileFullRepresentationsEntriesStatusField(
  val: SerializedData,
): FileFullRepresentationsEntriesStatusField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "FileFullRepresentationsEntriesStatusField"',
    });
  }
  const state: undefined | FileFullRepresentationsEntriesStatusStateField =
    val.state == void 0
      ? void 0
      : deserializeFileFullRepresentationsEntriesStatusStateField(val.state);
  return { state: state } satisfies FileFullRepresentationsEntriesStatusField;
}
export function serializeFileFullRepresentationsEntriesField(
  val: FileFullRepresentationsEntriesField,
): SerializedData {
  return {
    ['content']:
      val.content == void 0
        ? val.content
        : serializeFileFullRepresentationsEntriesContentField(val.content),
    ['info']:
      val.info == void 0
        ? val.info
        : serializeFileFullRepresentationsEntriesInfoField(val.info),
    ['properties']:
      val.properties == void 0
        ? val.properties
        : serializeFileFullRepresentationsEntriesPropertiesField(
            val.properties,
          ),
    ['representation']: val.representation,
    ['status']:
      val.status == void 0
        ? val.status
        : serializeFileFullRepresentationsEntriesStatusField(val.status),
  };
}
export function deserializeFileFullRepresentationsEntriesField(
  val: SerializedData,
): FileFullRepresentationsEntriesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullRepresentationsEntriesField"',
    });
  }
  const content: undefined | FileFullRepresentationsEntriesContentField =
    val.content == void 0
      ? void 0
      : deserializeFileFullRepresentationsEntriesContentField(val.content);
  const info: undefined | FileFullRepresentationsEntriesInfoField =
    val.info == void 0
      ? void 0
      : deserializeFileFullRepresentationsEntriesInfoField(val.info);
  const properties: undefined | FileFullRepresentationsEntriesPropertiesField =
    val.properties == void 0
      ? void 0
      : deserializeFileFullRepresentationsEntriesPropertiesField(
          val.properties,
        );
  if (!(val.representation == void 0) && !sdIsString(val.representation)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "representation" of type "FileFullRepresentationsEntriesField"',
    });
  }
  const representation: undefined | string =
    val.representation == void 0 ? void 0 : val.representation;
  const status: undefined | FileFullRepresentationsEntriesStatusField =
    val.status == void 0
      ? void 0
      : deserializeFileFullRepresentationsEntriesStatusField(val.status);
  return {
    content: content,
    info: info,
    properties: properties,
    representation: representation,
    status: status,
  } satisfies FileFullRepresentationsEntriesField;
}
export function serializeFileFullRepresentationsField(
  val: FileFullRepresentationsField,
): SerializedData {
  return {
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: FileFullRepresentationsEntriesField,
          ): SerializedData {
            return serializeFileFullRepresentationsEntriesField(item);
          }) as readonly any[]),
  };
}
export function deserializeFileFullRepresentationsField(
  val: SerializedData,
): FileFullRepresentationsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullRepresentationsField"',
    });
  }
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "FileFullRepresentationsField"',
    });
  }
  const entries: undefined | readonly FileFullRepresentationsEntriesField[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): FileFullRepresentationsEntriesField {
            return deserializeFileFullRepresentationsEntriesField(itm);
          }) as readonly any[])
        : [];
  return { entries: entries } satisfies FileFullRepresentationsField;
}
export function serializeFileFullClassificationField(
  val: FileFullClassificationField,
): SerializedData {
  return {
    ['name']: val.name,
    ['definition']: val.definition,
    ['color']: val.color,
  };
}
export function deserializeFileFullClassificationField(
  val: SerializedData,
): FileFullClassificationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileFullClassificationField"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "FileFullClassificationField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.definition == void 0) && !sdIsString(val.definition)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "definition" of type "FileFullClassificationField"',
    });
  }
  const definition: undefined | string =
    val.definition == void 0 ? void 0 : val.definition;
  if (!(val.color == void 0) && !sdIsString(val.color)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "color" of type "FileFullClassificationField"',
    });
  }
  const color: undefined | string = val.color == void 0 ? void 0 : val.color;
  return {
    name: name,
    definition: definition,
    color: color,
  } satisfies FileFullClassificationField;
}
export function serializeFileFullSharedLinkPermissionOptionsField(
  val: FileFullSharedLinkPermissionOptionsField,
): SerializedData {
  return val;
}
export function deserializeFileFullSharedLinkPermissionOptionsField(
  val: SerializedData,
): FileFullSharedLinkPermissionOptionsField {
  if (val == 'can_preview') {
    return val;
  }
  if (val == 'can_download') {
    return val;
  }
  if (val == 'can_edit') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileFullSharedLinkPermissionOptionsField",
  });
}
export function serializeFileFull(val: FileFull): SerializedData {
  const base: any = serializeFile(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileFull"' });
  }
  return {
    ...base,
    ...{
      ['version_number']: val.versionNumber,
      ['comment_count']: val.commentCount,
      ['permissions']:
        val.permissions == void 0
          ? val.permissions
          : serializeFileFullPermissionsField(val.permissions),
      ['tags']:
        val.tags == void 0
          ? val.tags
          : (val.tags.map(function (item: string): SerializedData {
              return item;
            }) as readonly any[]),
      ['lock']:
        val.lock == void 0 ? val.lock : serializeFileFullLockField(val.lock),
      ['extension']: val.extension,
      ['is_package']: val.isPackage,
      ['expiring_embed_link']:
        val.expiringEmbedLink == void 0
          ? val.expiringEmbedLink
          : serializeFileFullExpiringEmbedLinkField(val.expiringEmbedLink),
      ['watermark_info']:
        val.watermarkInfo == void 0
          ? val.watermarkInfo
          : serializeFileFullWatermarkInfoField(val.watermarkInfo),
      ['is_accessible_via_shared_link']: val.isAccessibleViaSharedLink,
      ['allowed_invitee_roles']:
        val.allowedInviteeRoles == void 0
          ? val.allowedInviteeRoles
          : (val.allowedInviteeRoles.map(function (
              item: FileFullAllowedInviteeRolesField,
            ): SerializedData {
              return serializeFileFullAllowedInviteeRolesField(item);
            }) as readonly any[]),
      ['is_externally_owned']: val.isExternallyOwned,
      ['has_collaborations']: val.hasCollaborations,
      ['metadata']:
        val.metadata == void 0
          ? val.metadata
          : serializeFileFullMetadataField(val.metadata),
      ['expires_at']:
        val.expiresAt == void 0
          ? val.expiresAt
          : serializeDateTime(val.expiresAt),
      ['representations']:
        val.representations == void 0
          ? val.representations
          : serializeFileFullRepresentationsField(val.representations),
      ['classification']:
        val.classification == void 0
          ? val.classification
          : serializeFileFullClassificationField(val.classification),
      ['uploader_display_name']: val.uploaderDisplayName,
      ['disposition_at']:
        val.dispositionAt == void 0
          ? val.dispositionAt
          : serializeDateTime(val.dispositionAt),
      ['shared_link_permission_options']:
        val.sharedLinkPermissionOptions == void 0
          ? val.sharedLinkPermissionOptions
          : (val.sharedLinkPermissionOptions.map(function (
              item: FileFullSharedLinkPermissionOptionsField,
            ): SerializedData {
              return serializeFileFullSharedLinkPermissionOptionsField(item);
            }) as readonly any[]),
      ['is_associated_with_app_item']: val.isAssociatedWithAppItem,
    },
  };
}
export function deserializeFileFull(val: SerializedData): FileFull {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileFull"' });
  }
  if (!(val.version_number == void 0) && !sdIsString(val.version_number)) {
    throw new BoxSdkError({
      message: 'Expecting string for "version_number" of type "FileFull"',
    });
  }
  const versionNumber: undefined | string =
    val.version_number == void 0 ? void 0 : val.version_number;
  if (!(val.comment_count == void 0) && !sdIsNumber(val.comment_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "comment_count" of type "FileFull"',
    });
  }
  const commentCount: undefined | number =
    val.comment_count == void 0 ? void 0 : val.comment_count;
  const permissions: undefined | FileFullPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeFileFullPermissionsField(val.permissions);
  if (!(val.tags == void 0) && !sdIsList(val.tags)) {
    throw new BoxSdkError({
      message: 'Expecting array for "tags" of type "FileFull"',
    });
  }
  const tags: undefined | readonly string[] =
    val.tags == void 0
      ? void 0
      : sdIsList(val.tags)
        ? (val.tags.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "FileFull"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  const lock: undefined | FileFullLockField =
    val.lock == void 0 ? void 0 : deserializeFileFullLockField(val.lock);
  if (!(val.extension == void 0) && !sdIsString(val.extension)) {
    throw new BoxSdkError({
      message: 'Expecting string for "extension" of type "FileFull"',
    });
  }
  const extension: undefined | string =
    val.extension == void 0 ? void 0 : val.extension;
  if (!(val.is_package == void 0) && !sdIsBoolean(val.is_package)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_package" of type "FileFull"',
    });
  }
  const isPackage: undefined | boolean =
    val.is_package == void 0 ? void 0 : val.is_package;
  const expiringEmbedLink: undefined | FileFullExpiringEmbedLinkField =
    val.expiring_embed_link == void 0
      ? void 0
      : deserializeFileFullExpiringEmbedLinkField(val.expiring_embed_link);
  const watermarkInfo: undefined | FileFullWatermarkInfoField =
    val.watermark_info == void 0
      ? void 0
      : deserializeFileFullWatermarkInfoField(val.watermark_info);
  if (
    !(val.is_accessible_via_shared_link == void 0) &&
    !sdIsBoolean(val.is_accessible_via_shared_link)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_accessible_via_shared_link" of type "FileFull"',
    });
  }
  const isAccessibleViaSharedLink: undefined | boolean =
    val.is_accessible_via_shared_link == void 0
      ? void 0
      : val.is_accessible_via_shared_link;
  if (
    !(val.allowed_invitee_roles == void 0) &&
    !sdIsList(val.allowed_invitee_roles)
  ) {
    throw new BoxSdkError({
      message: 'Expecting array for "allowed_invitee_roles" of type "FileFull"',
    });
  }
  const allowedInviteeRoles:
    | undefined
    | readonly FileFullAllowedInviteeRolesField[] =
    val.allowed_invitee_roles == void 0
      ? void 0
      : sdIsList(val.allowed_invitee_roles)
        ? (val.allowed_invitee_roles.map(function (
            itm: SerializedData,
          ): FileFullAllowedInviteeRolesField {
            return deserializeFileFullAllowedInviteeRolesField(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.is_externally_owned == void 0) &&
    !sdIsBoolean(val.is_externally_owned)
  ) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_externally_owned" of type "FileFull"',
    });
  }
  const isExternallyOwned: undefined | boolean =
    val.is_externally_owned == void 0 ? void 0 : val.is_externally_owned;
  if (
    !(val.has_collaborations == void 0) &&
    !sdIsBoolean(val.has_collaborations)
  ) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "has_collaborations" of type "FileFull"',
    });
  }
  const hasCollaborations: undefined | boolean =
    val.has_collaborations == void 0 ? void 0 : val.has_collaborations;
  const metadata: undefined | FileFullMetadataField =
    val.metadata == void 0
      ? void 0
      : deserializeFileFullMetadataField(val.metadata);
  if (!(val.expires_at == void 0) && !sdIsString(val.expires_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "expires_at" of type "FileFull"',
    });
  }
  const expiresAt: undefined | DateTime =
    val.expires_at == void 0 ? void 0 : deserializeDateTime(val.expires_at);
  const representations: undefined | FileFullRepresentationsField =
    val.representations == void 0
      ? void 0
      : deserializeFileFullRepresentationsField(val.representations);
  const classification: undefined | FileFullClassificationField =
    val.classification == void 0
      ? void 0
      : deserializeFileFullClassificationField(val.classification);
  if (
    !(val.uploader_display_name == void 0) &&
    !sdIsString(val.uploader_display_name)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "uploader_display_name" of type "FileFull"',
    });
  }
  const uploaderDisplayName: undefined | string =
    val.uploader_display_name == void 0 ? void 0 : val.uploader_display_name;
  if (!(val.disposition_at == void 0) && !sdIsString(val.disposition_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "disposition_at" of type "FileFull"',
    });
  }
  const dispositionAt: undefined | DateTime =
    val.disposition_at == void 0
      ? void 0
      : deserializeDateTime(val.disposition_at);
  if (
    !(val.shared_link_permission_options == void 0) &&
    !sdIsList(val.shared_link_permission_options)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "shared_link_permission_options" of type "FileFull"',
    });
  }
  const sharedLinkPermissionOptions:
    | undefined
    | readonly FileFullSharedLinkPermissionOptionsField[] =
    val.shared_link_permission_options == void 0
      ? void 0
      : sdIsList(val.shared_link_permission_options)
        ? (val.shared_link_permission_options.map(function (
            itm: SerializedData,
          ): FileFullSharedLinkPermissionOptionsField {
            return deserializeFileFullSharedLinkPermissionOptionsField(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.is_associated_with_app_item == void 0) &&
    !sdIsBoolean(val.is_associated_with_app_item)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_associated_with_app_item" of type "FileFull"',
    });
  }
  const isAssociatedWithAppItem: undefined | boolean =
    val.is_associated_with_app_item == void 0
      ? void 0
      : val.is_associated_with_app_item;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "FileFull"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.size == void 0) && !sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "FileFull"',
    });
  }
  const size: undefined | number = val.size == void 0 ? void 0 : val.size;
  const pathCollection: undefined | FilePathCollectionField =
    val.path_collection == void 0
      ? void 0
      : deserializeFilePathCollectionField(val.path_collection);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "FileFull"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "FileFull"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.trashed_at == void 0) && !sdIsString(val.trashed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "trashed_at" of type "FileFull"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "FileFull"',
    });
  }
  const purgedAt: undefined | DateTime =
    val.purged_at == void 0 ? void 0 : deserializeDateTime(val.purged_at);
  if (
    !(val.content_created_at == void 0) &&
    !sdIsString(val.content_created_at)
  ) {
    throw new BoxSdkError({
      message: 'Expecting string for "content_created_at" of type "FileFull"',
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
      message: 'Expecting string for "content_modified_at" of type "FileFull"',
    });
  }
  const contentModifiedAt: undefined | DateTime =
    val.content_modified_at == void 0
      ? void 0
      : deserializeDateTime(val.content_modified_at);
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  const modifiedBy: undefined | UserMini =
    val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
  const ownedBy: undefined | UserMini =
    val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
  const sharedLink: undefined | FileSharedLinkField =
    val.shared_link == void 0
      ? void 0
      : deserializeFileSharedLinkField(val.shared_link);
  const parent: undefined | FolderMini =
    val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
  const itemStatus: undefined | FileItemStatusField =
    val.item_status == void 0
      ? void 0
      : deserializeFileItemStatusField(val.item_status);
  if (!(val.sequence_id == void 0) && !sdIsString(val.sequence_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sequence_id" of type "FileFull"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "FileFull"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.sha1 == void 0) && !sdIsString(val.sha1)) {
    throw new BoxSdkError({
      message: 'Expecting string for "sha1" of type "FileFull"',
    });
  }
  const sha1: undefined | string = val.sha1 == void 0 ? void 0 : val.sha1;
  const fileVersion: undefined | FileVersionMini =
    val.file_version == void 0
      ? void 0
      : deserializeFileVersionMini(val.file_version);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileFull" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileFull"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "FileFull"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FileFull" to be defined',
    });
  }
  const type: FileBaseTypeField = deserializeFileBaseTypeField(val.type);
  return {
    versionNumber: versionNumber,
    commentCount: commentCount,
    permissions: permissions,
    tags: tags,
    lock: lock,
    extension: extension,
    isPackage: isPackage,
    expiringEmbedLink: expiringEmbedLink,
    watermarkInfo: watermarkInfo,
    isAccessibleViaSharedLink: isAccessibleViaSharedLink,
    allowedInviteeRoles: allowedInviteeRoles,
    isExternallyOwned: isExternallyOwned,
    hasCollaborations: hasCollaborations,
    metadata: metadata,
    expiresAt: expiresAt,
    representations: representations,
    classification: classification,
    uploaderDisplayName: uploaderDisplayName,
    dispositionAt: dispositionAt,
    sharedLinkPermissionOptions: sharedLinkPermissionOptions,
    isAssociatedWithAppItem: isAssociatedWithAppItem,
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
    sequenceId: sequenceId,
    name: name,
    sha1: sha1,
    fileVersion: fileVersion,
    id: id,
    etag: etag,
    type: type,
  } satisfies FileFull;
}

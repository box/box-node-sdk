import { serializeFolderBaseTypeField } from './folderBase.generated.js';
import { deserializeFolderBaseTypeField } from './folderBase.generated.js';
import { serializeFolderBase } from './folderBase.generated.js';
import { deserializeFolderBase } from './folderBase.generated.js';
import { serializeFolderMini } from './folderMini.generated.js';
import { deserializeFolderMini } from './folderMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { serializeFolderPathCollectionField } from './folder.generated.js';
import { deserializeFolderPathCollectionField } from './folder.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeFolderSharedLinkField } from './folder.generated.js';
import { deserializeFolderSharedLinkField } from './folder.generated.js';
import { serializeFolderFolderUploadEmailField } from './folder.generated.js';
import { deserializeFolderFolderUploadEmailField } from './folder.generated.js';
import { serializeFolderItemStatusField } from './folder.generated.js';
import { deserializeFolderItemStatusField } from './folder.generated.js';
import { serializeItems } from './items.generated.js';
import { deserializeItems } from './items.generated.js';
import { serializeFolder } from './folder.generated.js';
import { deserializeFolder } from './folder.generated.js';
import { serializeMetadataFull } from './metadataFull.generated.js';
import { deserializeMetadataFull } from './metadataFull.generated.js';
import { FolderBaseTypeField } from './folderBase.generated.js';
import { FolderBase } from './folderBase.generated.js';
import { FolderMini } from './folderMini.generated.js';
import { DateTime } from '../internal/utils.js';
import { FolderPathCollectionField } from './folder.generated.js';
import { UserMini } from './userMini.generated.js';
import { FolderSharedLinkField } from './folder.generated.js';
import { FolderFolderUploadEmailField } from './folder.generated.js';
import { FolderItemStatusField } from './folder.generated.js';
import { Items } from './items.generated.js';
import { Folder } from './folder.generated.js';
import { MetadataFull } from './metadataFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FolderFullSyncStateField =
  | 'synced'
  | 'not_synced'
  | 'partially_synced'
  | string;
export interface FolderFullPermissionsField {
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
   * Specifies if the user can upload into this folder. */
  readonly canUpload: boolean;
  readonly rawData?: SerializedData;
}
export interface FolderFullMetadataField {
  readonly extraData?: {
    readonly [key: string]: {
      readonly [key: string]: MetadataFull;
    };
  };
  readonly rawData?: SerializedData;
}
export type FolderFullAllowedSharedLinkAccessLevelsField =
  | 'open'
  | 'company'
  | 'collaborators'
  | string;
export type FolderFullAllowedInviteeRolesField =
  | 'editor'
  | 'viewer'
  | 'previewer'
  | 'uploader'
  | 'previewer uploader'
  | 'viewer uploader'
  | 'co-owner'
  | string;
export interface FolderFullWatermarkInfoField {
  /**
   * Specifies if this item has a watermark applied. */
  readonly isWatermarked?: boolean;
  readonly rawData?: SerializedData;
}
export interface FolderFullClassificationField {
  /**
   * The name of the classification */
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
export class FolderFull extends Folder {
  readonly syncState?: FolderFullSyncStateField;
  readonly hasCollaborations?: boolean;
  readonly permissions?: FolderFullPermissionsField;
  readonly tags?: readonly string[];
  readonly canNonOwnersInvite?: boolean;
  readonly isExternallyOwned?: boolean;
  readonly metadata?: FolderFullMetadataField;
  readonly isCollaborationRestrictedToEnterprise?: boolean;
  readonly allowedSharedLinkAccessLevels?: readonly FolderFullAllowedSharedLinkAccessLevelsField[];
  readonly allowedInviteeRoles?: readonly FolderFullAllowedInviteeRolesField[];
  readonly watermarkInfo?: FolderFullWatermarkInfoField;
  readonly isAccessibleViaSharedLink?: boolean;
  readonly canNonOwnersViewCollaborators?: boolean;
  readonly classification?: FolderFullClassificationField;
  readonly isAssociatedWithAppItem?: boolean;
  constructor(fields: FolderFull) {
    super(fields);
    if (fields.syncState !== undefined) {
      this.syncState = fields.syncState;
    }
    if (fields.hasCollaborations !== undefined) {
      this.hasCollaborations = fields.hasCollaborations;
    }
    if (fields.permissions !== undefined) {
      this.permissions = fields.permissions;
    }
    if (fields.tags !== undefined) {
      this.tags = fields.tags;
    }
    if (fields.canNonOwnersInvite !== undefined) {
      this.canNonOwnersInvite = fields.canNonOwnersInvite;
    }
    if (fields.isExternallyOwned !== undefined) {
      this.isExternallyOwned = fields.isExternallyOwned;
    }
    if (fields.metadata !== undefined) {
      this.metadata = fields.metadata;
    }
    if (fields.isCollaborationRestrictedToEnterprise !== undefined) {
      this.isCollaborationRestrictedToEnterprise =
        fields.isCollaborationRestrictedToEnterprise;
    }
    if (fields.allowedSharedLinkAccessLevels !== undefined) {
      this.allowedSharedLinkAccessLevels = fields.allowedSharedLinkAccessLevels;
    }
    if (fields.allowedInviteeRoles !== undefined) {
      this.allowedInviteeRoles = fields.allowedInviteeRoles;
    }
    if (fields.watermarkInfo !== undefined) {
      this.watermarkInfo = fields.watermarkInfo;
    }
    if (fields.isAccessibleViaSharedLink !== undefined) {
      this.isAccessibleViaSharedLink = fields.isAccessibleViaSharedLink;
    }
    if (fields.canNonOwnersViewCollaborators !== undefined) {
      this.canNonOwnersViewCollaborators = fields.canNonOwnersViewCollaborators;
    }
    if (fields.classification !== undefined) {
      this.classification = fields.classification;
    }
    if (fields.isAssociatedWithAppItem !== undefined) {
      this.isAssociatedWithAppItem = fields.isAssociatedWithAppItem;
    }
  }
}
export function serializeFolderFullSyncStateField(
  val: FolderFullSyncStateField,
): SerializedData {
  return val;
}
export function deserializeFolderFullSyncStateField(
  val: SerializedData,
): FolderFullSyncStateField {
  if (val == 'synced') {
    return val;
  }
  if (val == 'not_synced') {
    return val;
  }
  if (val == 'partially_synced') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FolderFullSyncStateField",
  });
}
export function serializeFolderFullPermissionsField(
  val: FolderFullPermissionsField,
): SerializedData {
  return {
    ['can_delete']: val.canDelete,
    ['can_download']: val.canDownload,
    ['can_invite_collaborator']: val.canInviteCollaborator,
    ['can_rename']: val.canRename,
    ['can_set_share_access']: val.canSetShareAccess,
    ['can_share']: val.canShare,
    ['can_upload']: val.canUpload,
  };
}
export function deserializeFolderFullPermissionsField(
  val: SerializedData,
): FolderFullPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderFullPermissionsField"',
    });
  }
  if (val.can_delete == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_delete" of type "FolderFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_delete)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_delete" of type "FolderFullPermissionsField"',
    });
  }
  const canDelete: boolean = val.can_delete;
  if (val.can_download == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_download" of type "FolderFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_download)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_download" of type "FolderFullPermissionsField"',
    });
  }
  const canDownload: boolean = val.can_download;
  if (val.can_invite_collaborator == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_invite_collaborator" of type "FolderFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_invite_collaborator)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_invite_collaborator" of type "FolderFullPermissionsField"',
    });
  }
  const canInviteCollaborator: boolean = val.can_invite_collaborator;
  if (val.can_rename == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_rename" of type "FolderFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_rename)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_rename" of type "FolderFullPermissionsField"',
    });
  }
  const canRename: boolean = val.can_rename;
  if (val.can_set_share_access == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_set_share_access" of type "FolderFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_set_share_access)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_set_share_access" of type "FolderFullPermissionsField"',
    });
  }
  const canSetShareAccess: boolean = val.can_set_share_access;
  if (val.can_share == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_share" of type "FolderFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_share)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_share" of type "FolderFullPermissionsField"',
    });
  }
  const canShare: boolean = val.can_share;
  if (val.can_upload == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "can_upload" of type "FolderFullPermissionsField" to be defined',
    });
  }
  if (!sdIsBoolean(val.can_upload)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_upload" of type "FolderFullPermissionsField"',
    });
  }
  const canUpload: boolean = val.can_upload;
  return {
    canDelete: canDelete,
    canDownload: canDownload,
    canInviteCollaborator: canInviteCollaborator,
    canRename: canRename,
    canSetShareAccess: canSetShareAccess,
    canShare: canShare,
    canUpload: canUpload,
  } satisfies FolderFullPermissionsField;
}
export function serializeFolderFullMetadataField(
  val: FolderFullMetadataField,
): SerializedData {
  return { ...{}, ...val.extraData };
}
export function deserializeFolderFullMetadataField(
  val: SerializedData,
): FolderFullMetadataField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderFullMetadataField"',
    });
  }
  if (!(val == void 0) && !sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting object for "extraData" of type "FolderFullMetadataField"',
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
  return { extraData: extraData } satisfies FolderFullMetadataField;
}
export function serializeFolderFullAllowedSharedLinkAccessLevelsField(
  val: FolderFullAllowedSharedLinkAccessLevelsField,
): SerializedData {
  return val;
}
export function deserializeFolderFullAllowedSharedLinkAccessLevelsField(
  val: SerializedData,
): FolderFullAllowedSharedLinkAccessLevelsField {
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
    message: "Can't deserialize FolderFullAllowedSharedLinkAccessLevelsField",
  });
}
export function serializeFolderFullAllowedInviteeRolesField(
  val: FolderFullAllowedInviteeRolesField,
): SerializedData {
  return val;
}
export function deserializeFolderFullAllowedInviteeRolesField(
  val: SerializedData,
): FolderFullAllowedInviteeRolesField {
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
    message: "Can't deserialize FolderFullAllowedInviteeRolesField",
  });
}
export function serializeFolderFullWatermarkInfoField(
  val: FolderFullWatermarkInfoField,
): SerializedData {
  return { ['is_watermarked']: val.isWatermarked };
}
export function deserializeFolderFullWatermarkInfoField(
  val: SerializedData,
): FolderFullWatermarkInfoField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderFullWatermarkInfoField"',
    });
  }
  if (!(val.is_watermarked == void 0) && !sdIsBoolean(val.is_watermarked)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_watermarked" of type "FolderFullWatermarkInfoField"',
    });
  }
  const isWatermarked: undefined | boolean =
    val.is_watermarked == void 0 ? void 0 : val.is_watermarked;
  return {
    isWatermarked: isWatermarked,
  } satisfies FolderFullWatermarkInfoField;
}
export function serializeFolderFullClassificationField(
  val: FolderFullClassificationField,
): SerializedData {
  return {
    ['name']: val.name,
    ['definition']: val.definition,
    ['color']: val.color,
  };
}
export function deserializeFolderFullClassificationField(
  val: SerializedData,
): FolderFullClassificationField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderFullClassificationField"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "FolderFullClassificationField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.definition == void 0) && !sdIsString(val.definition)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "definition" of type "FolderFullClassificationField"',
    });
  }
  const definition: undefined | string =
    val.definition == void 0 ? void 0 : val.definition;
  if (!(val.color == void 0) && !sdIsString(val.color)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "color" of type "FolderFullClassificationField"',
    });
  }
  const color: undefined | string = val.color == void 0 ? void 0 : val.color;
  return {
    name: name,
    definition: definition,
    color: color,
  } satisfies FolderFullClassificationField;
}
export function serializeFolderFull(val: FolderFull): SerializedData {
  const base: any = serializeFolder(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FolderFull"' });
  }
  return {
    ...base,
    ...{
      ['sync_state']:
        val.syncState == void 0
          ? val.syncState
          : serializeFolderFullSyncStateField(val.syncState),
      ['has_collaborations']: val.hasCollaborations,
      ['permissions']:
        val.permissions == void 0
          ? val.permissions
          : serializeFolderFullPermissionsField(val.permissions),
      ['tags']:
        val.tags == void 0
          ? val.tags
          : (val.tags.map(function (item: string): SerializedData {
              return item;
            }) as readonly any[]),
      ['can_non_owners_invite']: val.canNonOwnersInvite,
      ['is_externally_owned']: val.isExternallyOwned,
      ['metadata']:
        val.metadata == void 0
          ? val.metadata
          : serializeFolderFullMetadataField(val.metadata),
      ['is_collaboration_restricted_to_enterprise']:
        val.isCollaborationRestrictedToEnterprise,
      ['allowed_shared_link_access_levels']:
        val.allowedSharedLinkAccessLevels == void 0
          ? val.allowedSharedLinkAccessLevels
          : (val.allowedSharedLinkAccessLevels.map(function (
              item: FolderFullAllowedSharedLinkAccessLevelsField,
            ): SerializedData {
              return serializeFolderFullAllowedSharedLinkAccessLevelsField(
                item,
              );
            }) as readonly any[]),
      ['allowed_invitee_roles']:
        val.allowedInviteeRoles == void 0
          ? val.allowedInviteeRoles
          : (val.allowedInviteeRoles.map(function (
              item: FolderFullAllowedInviteeRolesField,
            ): SerializedData {
              return serializeFolderFullAllowedInviteeRolesField(item);
            }) as readonly any[]),
      ['watermark_info']:
        val.watermarkInfo == void 0
          ? val.watermarkInfo
          : serializeFolderFullWatermarkInfoField(val.watermarkInfo),
      ['is_accessible_via_shared_link']: val.isAccessibleViaSharedLink,
      ['can_non_owners_view_collaborators']: val.canNonOwnersViewCollaborators,
      ['classification']:
        val.classification == void 0
          ? val.classification
          : serializeFolderFullClassificationField(val.classification),
      ['is_associated_with_app_item']: val.isAssociatedWithAppItem,
    },
  };
}
export function deserializeFolderFull(val: SerializedData): FolderFull {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FolderFull"' });
  }
  const syncState: undefined | FolderFullSyncStateField =
    val.sync_state == void 0
      ? void 0
      : deserializeFolderFullSyncStateField(val.sync_state);
  if (
    !(val.has_collaborations == void 0) &&
    !sdIsBoolean(val.has_collaborations)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "has_collaborations" of type "FolderFull"',
    });
  }
  const hasCollaborations: undefined | boolean =
    val.has_collaborations == void 0 ? void 0 : val.has_collaborations;
  const permissions: undefined | FolderFullPermissionsField =
    val.permissions == void 0
      ? void 0
      : deserializeFolderFullPermissionsField(val.permissions);
  if (!(val.tags == void 0) && !sdIsList(val.tags)) {
    throw new BoxSdkError({
      message: 'Expecting array for "tags" of type "FolderFull"',
    });
  }
  const tags: undefined | readonly string[] =
    val.tags == void 0
      ? void 0
      : sdIsList(val.tags)
        ? (val.tags.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "FolderFull"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (
    !(val.can_non_owners_invite == void 0) &&
    !sdIsBoolean(val.can_non_owners_invite)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_non_owners_invite" of type "FolderFull"',
    });
  }
  const canNonOwnersInvite: undefined | boolean =
    val.can_non_owners_invite == void 0 ? void 0 : val.can_non_owners_invite;
  if (
    !(val.is_externally_owned == void 0) &&
    !sdIsBoolean(val.is_externally_owned)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_externally_owned" of type "FolderFull"',
    });
  }
  const isExternallyOwned: undefined | boolean =
    val.is_externally_owned == void 0 ? void 0 : val.is_externally_owned;
  const metadata: undefined | FolderFullMetadataField =
    val.metadata == void 0
      ? void 0
      : deserializeFolderFullMetadataField(val.metadata);
  if (
    !(val.is_collaboration_restricted_to_enterprise == void 0) &&
    !sdIsBoolean(val.is_collaboration_restricted_to_enterprise)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_collaboration_restricted_to_enterprise" of type "FolderFull"',
    });
  }
  const isCollaborationRestrictedToEnterprise: undefined | boolean =
    val.is_collaboration_restricted_to_enterprise == void 0
      ? void 0
      : val.is_collaboration_restricted_to_enterprise;
  if (
    !(val.allowed_shared_link_access_levels == void 0) &&
    !sdIsList(val.allowed_shared_link_access_levels)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowed_shared_link_access_levels" of type "FolderFull"',
    });
  }
  const allowedSharedLinkAccessLevels:
    | undefined
    | readonly FolderFullAllowedSharedLinkAccessLevelsField[] =
    val.allowed_shared_link_access_levels == void 0
      ? void 0
      : sdIsList(val.allowed_shared_link_access_levels)
        ? (val.allowed_shared_link_access_levels.map(function (
            itm: SerializedData,
          ): FolderFullAllowedSharedLinkAccessLevelsField {
            return deserializeFolderFullAllowedSharedLinkAccessLevelsField(itm);
          }) as readonly any[])
        : [];
  if (
    !(val.allowed_invitee_roles == void 0) &&
    !sdIsList(val.allowed_invitee_roles)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowed_invitee_roles" of type "FolderFull"',
    });
  }
  const allowedInviteeRoles:
    | undefined
    | readonly FolderFullAllowedInviteeRolesField[] =
    val.allowed_invitee_roles == void 0
      ? void 0
      : sdIsList(val.allowed_invitee_roles)
        ? (val.allowed_invitee_roles.map(function (
            itm: SerializedData,
          ): FolderFullAllowedInviteeRolesField {
            return deserializeFolderFullAllowedInviteeRolesField(itm);
          }) as readonly any[])
        : [];
  const watermarkInfo: undefined | FolderFullWatermarkInfoField =
    val.watermark_info == void 0
      ? void 0
      : deserializeFolderFullWatermarkInfoField(val.watermark_info);
  if (
    !(val.is_accessible_via_shared_link == void 0) &&
    !sdIsBoolean(val.is_accessible_via_shared_link)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_accessible_via_shared_link" of type "FolderFull"',
    });
  }
  const isAccessibleViaSharedLink: undefined | boolean =
    val.is_accessible_via_shared_link == void 0
      ? void 0
      : val.is_accessible_via_shared_link;
  if (
    !(val.can_non_owners_view_collaborators == void 0) &&
    !sdIsBoolean(val.can_non_owners_view_collaborators)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_non_owners_view_collaborators" of type "FolderFull"',
    });
  }
  const canNonOwnersViewCollaborators: undefined | boolean =
    val.can_non_owners_view_collaborators == void 0
      ? void 0
      : val.can_non_owners_view_collaborators;
  const classification: undefined | FolderFullClassificationField =
    val.classification == void 0
      ? void 0
      : deserializeFolderFullClassificationField(val.classification);
  if (
    !(val.is_associated_with_app_item == void 0) &&
    !sdIsBoolean(val.is_associated_with_app_item)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_associated_with_app_item" of type "FolderFull"',
    });
  }
  const isAssociatedWithAppItem: undefined | boolean =
    val.is_associated_with_app_item == void 0
      ? void 0
      : val.is_associated_with_app_item;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "FolderFull"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "FolderFull"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "FolderFull"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.size == void 0) && !sdIsNumber(val.size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "size" of type "FolderFull"',
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
      message: 'Expecting string for "trashed_at" of type "FolderFull"',
    });
  }
  const trashedAt: undefined | DateTime =
    val.trashed_at == void 0 ? void 0 : deserializeDateTime(val.trashed_at);
  if (!(val.purged_at == void 0) && !sdIsString(val.purged_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "purged_at" of type "FolderFull"',
    });
  }
  const purgedAt: undefined | DateTime =
    val.purged_at == void 0 ? void 0 : deserializeDateTime(val.purged_at);
  if (
    !(val.content_created_at == void 0) &&
    !sdIsString(val.content_created_at)
  ) {
    throw new BoxSdkError({
      message: 'Expecting string for "content_created_at" of type "FolderFull"',
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
        'Expecting string for "content_modified_at" of type "FolderFull"',
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
      message: 'Expecting string for "sequence_id" of type "FolderFull"',
    });
  }
  const sequenceId: undefined | string =
    val.sequence_id == void 0 ? void 0 : val.sequence_id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "FolderFull"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FolderFull" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FolderFull"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "FolderFull"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FolderFull" to be defined',
    });
  }
  const type: FolderBaseTypeField = deserializeFolderBaseTypeField(val.type);
  return {
    syncState: syncState,
    hasCollaborations: hasCollaborations,
    permissions: permissions,
    tags: tags,
    canNonOwnersInvite: canNonOwnersInvite,
    isExternallyOwned: isExternallyOwned,
    metadata: metadata,
    isCollaborationRestrictedToEnterprise:
      isCollaborationRestrictedToEnterprise,
    allowedSharedLinkAccessLevels: allowedSharedLinkAccessLevels,
    allowedInviteeRoles: allowedInviteeRoles,
    watermarkInfo: watermarkInfo,
    isAccessibleViaSharedLink: isAccessibleViaSharedLink,
    canNonOwnersViewCollaborators: canNonOwnersViewCollaborators,
    classification: classification,
    isAssociatedWithAppItem: isAssociatedWithAppItem,
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
  } satisfies FolderFull;
}

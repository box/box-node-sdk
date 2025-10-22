import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface CollaborationPermissionsV2025R0 {
  /**
   * The co-owner role is enabled for collaboration. */
  readonly isCoOwnerRoleEnabled?: boolean;
  /**
   * The editor role is enabled for collaboration. */
  readonly isEditorRoleEnabled?: boolean;
  /**
   * The previewer role is enabled for collaboration. */
  readonly isPreviewerRoleEnabled?: boolean;
  /**
   * The previewer uploader role is enabled for collaboration. */
  readonly isPreviewerUploaderRoleEnabled?: boolean;
  /**
   * The uploader role is enabled for collaboration. */
  readonly isUploaderRoleEnabled?: boolean;
  /**
   * The viewer role is enabled for collaboration. */
  readonly isViewerRoleEnabled?: boolean;
  /**
   * The viewer uploader role is enabled for collaboration. */
  readonly isViewerUploaderRoleEnabled?: boolean;
  readonly rawData?: SerializedData;
}
export function serializeCollaborationPermissionsV2025R0(
  val: CollaborationPermissionsV2025R0,
): SerializedData {
  return {
    ['is_co_owner_role_enabled']: val.isCoOwnerRoleEnabled,
    ['is_editor_role_enabled']: val.isEditorRoleEnabled,
    ['is_previewer_role_enabled']: val.isPreviewerRoleEnabled,
    ['is_previewer_uploader_role_enabled']: val.isPreviewerUploaderRoleEnabled,
    ['is_uploader_role_enabled']: val.isUploaderRoleEnabled,
    ['is_viewer_role_enabled']: val.isViewerRoleEnabled,
    ['is_viewer_uploader_role_enabled']: val.isViewerUploaderRoleEnabled,
  };
}
export function deserializeCollaborationPermissionsV2025R0(
  val: SerializedData,
): CollaborationPermissionsV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CollaborationPermissionsV2025R0"',
    });
  }
  if (
    !(val.is_co_owner_role_enabled == void 0) &&
    !sdIsBoolean(val.is_co_owner_role_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_co_owner_role_enabled" of type "CollaborationPermissionsV2025R0"',
    });
  }
  const isCoOwnerRoleEnabled: undefined | boolean =
    val.is_co_owner_role_enabled == void 0
      ? void 0
      : val.is_co_owner_role_enabled;
  if (
    !(val.is_editor_role_enabled == void 0) &&
    !sdIsBoolean(val.is_editor_role_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_editor_role_enabled" of type "CollaborationPermissionsV2025R0"',
    });
  }
  const isEditorRoleEnabled: undefined | boolean =
    val.is_editor_role_enabled == void 0 ? void 0 : val.is_editor_role_enabled;
  if (
    !(val.is_previewer_role_enabled == void 0) &&
    !sdIsBoolean(val.is_previewer_role_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_previewer_role_enabled" of type "CollaborationPermissionsV2025R0"',
    });
  }
  const isPreviewerRoleEnabled: undefined | boolean =
    val.is_previewer_role_enabled == void 0
      ? void 0
      : val.is_previewer_role_enabled;
  if (
    !(val.is_previewer_uploader_role_enabled == void 0) &&
    !sdIsBoolean(val.is_previewer_uploader_role_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_previewer_uploader_role_enabled" of type "CollaborationPermissionsV2025R0"',
    });
  }
  const isPreviewerUploaderRoleEnabled: undefined | boolean =
    val.is_previewer_uploader_role_enabled == void 0
      ? void 0
      : val.is_previewer_uploader_role_enabled;
  if (
    !(val.is_uploader_role_enabled == void 0) &&
    !sdIsBoolean(val.is_uploader_role_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_uploader_role_enabled" of type "CollaborationPermissionsV2025R0"',
    });
  }
  const isUploaderRoleEnabled: undefined | boolean =
    val.is_uploader_role_enabled == void 0
      ? void 0
      : val.is_uploader_role_enabled;
  if (
    !(val.is_viewer_role_enabled == void 0) &&
    !sdIsBoolean(val.is_viewer_role_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_viewer_role_enabled" of type "CollaborationPermissionsV2025R0"',
    });
  }
  const isViewerRoleEnabled: undefined | boolean =
    val.is_viewer_role_enabled == void 0 ? void 0 : val.is_viewer_role_enabled;
  if (
    !(val.is_viewer_uploader_role_enabled == void 0) &&
    !sdIsBoolean(val.is_viewer_uploader_role_enabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_viewer_uploader_role_enabled" of type "CollaborationPermissionsV2025R0"',
    });
  }
  const isViewerUploaderRoleEnabled: undefined | boolean =
    val.is_viewer_uploader_role_enabled == void 0
      ? void 0
      : val.is_viewer_uploader_role_enabled;
  return {
    isCoOwnerRoleEnabled: isCoOwnerRoleEnabled,
    isEditorRoleEnabled: isEditorRoleEnabled,
    isPreviewerRoleEnabled: isPreviewerRoleEnabled,
    isPreviewerUploaderRoleEnabled: isPreviewerUploaderRoleEnabled,
    isUploaderRoleEnabled: isUploaderRoleEnabled,
    isViewerRoleEnabled: isViewerRoleEnabled,
    isViewerUploaderRoleEnabled: isViewerUploaderRoleEnabled,
  } satisfies CollaborationPermissionsV2025R0;
}

import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type HubUpdateRequestV2025R0CopyHubAccessField =
  'all' | 'company' | 'none' | string;
export interface HubUpdateRequestV2025R0 {
  /**
   * Title of the Box Hub. It cannot be empty and should be less than 50 characters. */
  readonly title?: string;
  /**
   * Description of the Box Hub. */
  readonly description?: string;
  /**
   * Indicates if AI features are enabled for the Box Hub. */
  readonly isAiEnabled?: boolean;
  /**
   * Indicates if collaboration is restricted to the enterprise. */
  readonly isCollaborationRestrictedToEnterprise?: boolean;
  /**
   * Indicates if non-owners can invite others to the Box Hub. */
  readonly canNonOwnersInvite?: boolean;
  /**
   * Indicates if a shared link can be created for the Box Hub. */
  readonly canSharedLinkBeCreated?: boolean;
  /**
   * Indicates if a public shared link can be created for the Box Hub. */
  readonly canPublicSharedLinkBeCreated?: boolean;
  /**
   * Specifies who is allowed to copy the Box Hub.
   *
   * * `all` - Any user with access to the Hub can copy it.
   * * `company` - Only users within the same enterprise as the Hub can copy it.
   * * `none` - No one can copy the Hub. */
  readonly copyHubAccess?: HubUpdateRequestV2025R0CopyHubAccessField;
  readonly rawData?: SerializedData;
}
export function serializeHubUpdateRequestV2025R0CopyHubAccessField(
  val: HubUpdateRequestV2025R0CopyHubAccessField
): SerializedData {
  return val;
}
export function deserializeHubUpdateRequestV2025R0CopyHubAccessField(
  val: SerializedData
): HubUpdateRequestV2025R0CopyHubAccessField {
  if (val == 'all') {
    return val;
  }
  if (val == 'company') {
    return val;
  }
  if (val == 'none') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubUpdateRequestV2025R0CopyHubAccessField",
  });
}
export function serializeHubUpdateRequestV2025R0(
  val: HubUpdateRequestV2025R0
): SerializedData {
  return {
    ['title']: val.title,
    ['description']: val.description,
    ['is_ai_enabled']: val.isAiEnabled,
    ['is_collaboration_restricted_to_enterprise']:
      val.isCollaborationRestrictedToEnterprise,
    ['can_non_owners_invite']: val.canNonOwnersInvite,
    ['can_shared_link_be_created']: val.canSharedLinkBeCreated,
    ['can_public_shared_link_be_created']: val.canPublicSharedLinkBeCreated,
    ['copy_hub_access']:
      val.copyHubAccess == void 0
        ? val.copyHubAccess
        : serializeHubUpdateRequestV2025R0CopyHubAccessField(val.copyHubAccess),
  };
}
export function deserializeHubUpdateRequestV2025R0(
  val: SerializedData
): HubUpdateRequestV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubUpdateRequestV2025R0"',
    });
  }
  if (!(val.title == void 0) && !sdIsString(val.title)) {
    throw new BoxSdkError({
      message: 'Expecting string for "title" of type "HubUpdateRequestV2025R0"',
    });
  }
  const title: undefined | string = val.title == void 0 ? void 0 : val.title;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "HubUpdateRequestV2025R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.is_ai_enabled == void 0) && !sdIsBoolean(val.is_ai_enabled)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_ai_enabled" of type "HubUpdateRequestV2025R0"',
    });
  }
  const isAiEnabled: undefined | boolean =
    val.is_ai_enabled == void 0 ? void 0 : val.is_ai_enabled;
  if (
    !(val.is_collaboration_restricted_to_enterprise == void 0) &&
    !sdIsBoolean(val.is_collaboration_restricted_to_enterprise)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_collaboration_restricted_to_enterprise" of type "HubUpdateRequestV2025R0"',
    });
  }
  const isCollaborationRestrictedToEnterprise: undefined | boolean =
    val.is_collaboration_restricted_to_enterprise == void 0
      ? void 0
      : val.is_collaboration_restricted_to_enterprise;
  if (
    !(val.can_non_owners_invite == void 0) &&
    !sdIsBoolean(val.can_non_owners_invite)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_non_owners_invite" of type "HubUpdateRequestV2025R0"',
    });
  }
  const canNonOwnersInvite: undefined | boolean =
    val.can_non_owners_invite == void 0 ? void 0 : val.can_non_owners_invite;
  if (
    !(val.can_shared_link_be_created == void 0) &&
    !sdIsBoolean(val.can_shared_link_be_created)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_shared_link_be_created" of type "HubUpdateRequestV2025R0"',
    });
  }
  const canSharedLinkBeCreated: undefined | boolean =
    val.can_shared_link_be_created == void 0
      ? void 0
      : val.can_shared_link_be_created;
  if (
    !(val.can_public_shared_link_be_created == void 0) &&
    !sdIsBoolean(val.can_public_shared_link_be_created)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_public_shared_link_be_created" of type "HubUpdateRequestV2025R0"',
    });
  }
  const canPublicSharedLinkBeCreated: undefined | boolean =
    val.can_public_shared_link_be_created == void 0
      ? void 0
      : val.can_public_shared_link_be_created;
  const copyHubAccess: undefined | HubUpdateRequestV2025R0CopyHubAccessField =
    val.copy_hub_access == void 0
      ? void 0
      : deserializeHubUpdateRequestV2025R0CopyHubAccessField(
          val.copy_hub_access
        );
  return {
    title: title,
    description: description,
    isAiEnabled: isAiEnabled,
    isCollaborationRestrictedToEnterprise:
      isCollaborationRestrictedToEnterprise,
    canNonOwnersInvite: canNonOwnersInvite,
    canSharedLinkBeCreated: canSharedLinkBeCreated,
    canPublicSharedLinkBeCreated: canPublicSharedLinkBeCreated,
    copyHubAccess: copyHubAccess,
  } satisfies HubUpdateRequestV2025R0;
}

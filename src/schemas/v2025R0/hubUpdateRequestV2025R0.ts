import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
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
  readonly rawData?: SerializedData;
}
export function serializeHubUpdateRequestV2025R0(
  val: HubUpdateRequestV2025R0,
): SerializedData {
  return {
    ['title']: val.title,
    ['description']: val.description,
    ['is_ai_enabled']: val.isAiEnabled,
    ['is_collaboration_restricted_to_enterprise']:
      val.isCollaborationRestrictedToEnterprise,
    ['can_non_owners_invite']: val.canNonOwnersInvite,
    ['can_shared_link_be_created']: val.canSharedLinkBeCreated,
  };
}
export function deserializeHubUpdateRequestV2025R0(
  val: SerializedData,
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
  return {
    title: title,
    description: description,
    isAiEnabled: isAiEnabled,
    isCollaborationRestrictedToEnterprise:
      isCollaborationRestrictedToEnterprise,
    canNonOwnersInvite: canNonOwnersInvite,
    canSharedLinkBeCreated: canSharedLinkBeCreated,
  } satisfies HubUpdateRequestV2025R0;
}

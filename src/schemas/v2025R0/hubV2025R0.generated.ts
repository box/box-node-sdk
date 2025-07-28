import { serializeHubBaseV2025R0TypeField } from './hubBaseV2025R0.generated.js';
import { deserializeHubBaseV2025R0TypeField } from './hubBaseV2025R0.generated.js';
import { serializeHubBaseV2025R0 } from './hubBaseV2025R0.generated.js';
import { deserializeHubBaseV2025R0 } from './hubBaseV2025R0.generated.js';
import { serializeUserMiniV2025R0 } from './userMiniV2025R0.generated.js';
import { deserializeUserMiniV2025R0 } from './userMiniV2025R0.generated.js';
import { serializeDateTime } from '../../internal/utils.js';
import { deserializeDateTime } from '../../internal/utils.js';
import { HubBaseV2025R0TypeField } from './hubBaseV2025R0.generated.js';
import { HubBaseV2025R0 } from './hubBaseV2025R0.generated.js';
import { UserMiniV2025R0 } from './userMiniV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { DateTime } from '../../internal/utils.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export class HubV2025R0 extends HubBaseV2025R0 {
  readonly title?: string;
  readonly description?: string;
  readonly createdAt?: DateTime;
  readonly updatedAt?: DateTime;
  readonly createdBy?: UserMiniV2025R0;
  readonly updatedBy?: UserMiniV2025R0;
  readonly viewCount?: number;
  readonly isAiEnabled?: boolean;
  readonly isCollaborationRestrictedToEnterprise?: boolean;
  readonly canNonOwnersInvite?: boolean;
  readonly canSharedLinkBeCreated?: boolean;
  constructor(fields: HubV2025R0) {
    super(fields);
    if (fields.title !== undefined) {
      this.title = fields.title;
    }
    if (fields.description !== undefined) {
      this.description = fields.description;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.updatedAt !== undefined) {
      this.updatedAt = fields.updatedAt;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.updatedBy !== undefined) {
      this.updatedBy = fields.updatedBy;
    }
    if (fields.viewCount !== undefined) {
      this.viewCount = fields.viewCount;
    }
    if (fields.isAiEnabled !== undefined) {
      this.isAiEnabled = fields.isAiEnabled;
    }
    if (fields.isCollaborationRestrictedToEnterprise !== undefined) {
      this.isCollaborationRestrictedToEnterprise =
        fields.isCollaborationRestrictedToEnterprise;
    }
    if (fields.canNonOwnersInvite !== undefined) {
      this.canNonOwnersInvite = fields.canNonOwnersInvite;
    }
    if (fields.canSharedLinkBeCreated !== undefined) {
      this.canSharedLinkBeCreated = fields.canSharedLinkBeCreated;
    }
  }
}
export function serializeHubV2025R0(val: HubV2025R0): SerializedData {
  const base: any = serializeHubBaseV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "HubV2025R0"' });
  }
  return {
    ...base,
    ...{
      ['title']: val.title,
      ['description']: val.description,
      ['created_at']:
        val.createdAt == void 0
          ? val.createdAt
          : serializeDateTime(val.createdAt),
      ['updated_at']:
        val.updatedAt == void 0
          ? val.updatedAt
          : serializeDateTime(val.updatedAt),
      ['created_by']:
        val.createdBy == void 0
          ? val.createdBy
          : serializeUserMiniV2025R0(val.createdBy),
      ['updated_by']:
        val.updatedBy == void 0
          ? val.updatedBy
          : serializeUserMiniV2025R0(val.updatedBy),
      ['view_count']: val.viewCount,
      ['is_ai_enabled']: val.isAiEnabled,
      ['is_collaboration_restricted_to_enterprise']:
        val.isCollaborationRestrictedToEnterprise,
      ['can_non_owners_invite']: val.canNonOwnersInvite,
      ['can_shared_link_be_created']: val.canSharedLinkBeCreated,
    },
  };
}
export function deserializeHubV2025R0(val: SerializedData): HubV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "HubV2025R0"' });
  }
  if (!(val.title == void 0) && !sdIsString(val.title)) {
    throw new BoxSdkError({
      message: 'Expecting string for "title" of type "HubV2025R0"',
    });
  }
  const title: undefined | string = val.title == void 0 ? void 0 : val.title;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "HubV2025R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "HubV2025R0"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.updated_at == void 0) && !sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "updated_at" of type "HubV2025R0"',
    });
  }
  const updatedAt: undefined | DateTime =
    val.updated_at == void 0 ? void 0 : deserializeDateTime(val.updated_at);
  const createdBy: undefined | UserMiniV2025R0 =
    val.created_by == void 0
      ? void 0
      : deserializeUserMiniV2025R0(val.created_by);
  const updatedBy: undefined | UserMiniV2025R0 =
    val.updated_by == void 0
      ? void 0
      : deserializeUserMiniV2025R0(val.updated_by);
  if (!(val.view_count == void 0) && !sdIsNumber(val.view_count)) {
    throw new BoxSdkError({
      message: 'Expecting number for "view_count" of type "HubV2025R0"',
    });
  }
  const viewCount: undefined | number =
    val.view_count == void 0 ? void 0 : val.view_count;
  if (!(val.is_ai_enabled == void 0) && !sdIsBoolean(val.is_ai_enabled)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_ai_enabled" of type "HubV2025R0"',
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
        'Expecting boolean for "is_collaboration_restricted_to_enterprise" of type "HubV2025R0"',
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
        'Expecting boolean for "can_non_owners_invite" of type "HubV2025R0"',
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
        'Expecting boolean for "can_shared_link_be_created" of type "HubV2025R0"',
    });
  }
  const canSharedLinkBeCreated: undefined | boolean =
    val.can_shared_link_be_created == void 0
      ? void 0
      : val.can_shared_link_be_created;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "HubV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "HubV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "HubV2025R0" to be defined',
    });
  }
  const type: HubBaseV2025R0TypeField = deserializeHubBaseV2025R0TypeField(
    val.type,
  );
  return {
    title: title,
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
    createdBy: createdBy,
    updatedBy: updatedBy,
    viewCount: viewCount,
    isAiEnabled: isAiEnabled,
    isCollaborationRestrictedToEnterprise:
      isCollaborationRestrictedToEnterprise,
    canNonOwnersInvite: canNonOwnersInvite,
    canSharedLinkBeCreated: canSharedLinkBeCreated,
    id: id,
    type: type,
  } satisfies HubV2025R0;
}

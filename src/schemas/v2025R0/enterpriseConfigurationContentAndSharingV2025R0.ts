import { serializeEnterpriseFeatureSettingsItemV2025R0 } from './enterpriseFeatureSettingsItemV2025R0';
import { deserializeEnterpriseFeatureSettingsItemV2025R0 } from './enterpriseFeatureSettingsItemV2025R0';
import { serializeEnterpriseConfigurationItemStringV2025R0 } from './enterpriseConfigurationItemStringV2025R0';
import { deserializeEnterpriseConfigurationItemStringV2025R0 } from './enterpriseConfigurationItemStringV2025R0';
import { serializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { deserializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { serializeSharedLinkPermissionsV2025R0 } from './sharedLinkPermissionsV2025R0';
import { deserializeSharedLinkPermissionsV2025R0 } from './sharedLinkPermissionsV2025R0';
import { serializeEnterpriseConfigurationItemBooleanV2025R0 } from './enterpriseConfigurationItemBooleanV2025R0';
import { deserializeEnterpriseConfigurationItemBooleanV2025R0 } from './enterpriseConfigurationItemBooleanV2025R0';
import { serializeCollaborationPermissionsV2025R0 } from './collaborationPermissionsV2025R0';
import { deserializeCollaborationPermissionsV2025R0 } from './collaborationPermissionsV2025R0';
import { serializeListUserV2025R0 } from './listUserV2025R0';
import { deserializeListUserV2025R0 } from './listUserV2025R0';
import { serializeEnterpriseConfigurationItemIntegerV2025R0 } from './enterpriseConfigurationItemIntegerV2025R0';
import { deserializeEnterpriseConfigurationItemIntegerV2025R0 } from './enterpriseConfigurationItemIntegerV2025R0';
import { EnterpriseFeatureSettingsItemV2025R0 } from './enterpriseFeatureSettingsItemV2025R0';
import { EnterpriseConfigurationItemStringV2025R0 } from './enterpriseConfigurationItemStringV2025R0';
import { EnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { SharedLinkPermissionsV2025R0 } from './sharedLinkPermissionsV2025R0';
import { EnterpriseConfigurationItemBooleanV2025R0 } from './enterpriseConfigurationItemBooleanV2025R0';
import { CollaborationPermissionsV2025R0 } from './collaborationPermissionsV2025R0';
import { ListUserV2025R0 } from './listUserV2025R0';
import { EnterpriseConfigurationItemIntegerV2025R0 } from './enterpriseConfigurationItemIntegerV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type EnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: SharedLinkPermissionsV2025R0;
  };
export type EnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: CollaborationPermissionsV2025R0;
  };
export type EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: readonly string[];
  };
export type EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField =
  EnterpriseConfigurationItemV2025R0 & {
    /**
     * The external collaboration status. */
    readonly value?: string | null;
  };
export type EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: readonly ListUserV2025R0[];
  };
export type EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: readonly ListUserV2025R0[];
  };
export interface EnterpriseConfigurationContentAndSharingV2025R0 {
  readonly enterpriseFeatureSettings?: readonly EnterpriseFeatureSettingsItemV2025R0[];
  readonly sharingItemType?: EnterpriseConfigurationItemStringV2025R0;
  readonly sharedLinkCompanyDefinition?: EnterpriseConfigurationItemStringV2025R0;
  readonly sharedLinkAccess?: EnterpriseConfigurationItemStringV2025R0;
  readonly sharedLinkDefaultAccess?: EnterpriseConfigurationItemStringV2025R0;
  readonly sharedLinkDefaultPermissionsSelected?: EnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField;
  readonly isOpenCustomUrlsDisabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isCustomDomainHiddenInSharedLink?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly collaborationPermissions?: EnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField;
  readonly defaultCollaborationRole?: EnterpriseConfigurationItemStringV2025R0;
  readonly isInvitePrivilegeRestricted?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly collaborationRestrictions?: EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField;
  readonly isCollaboratorInviteLinksDisabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isInviteGroupCollaboratorDisabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isOwnershipTransferRestricted?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly externalCollaborationStatus?: EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField;
  readonly externalCollaborationAllowlistUsers?: EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField;
  readonly isWatermarkingEnterpriseFeatureEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isRootContentCreationRestricted?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isTagCreationRestricted?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly tagCreationRestriction?: EnterpriseConfigurationItemStringV2025R0;
  readonly isEmailUploadsEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isCustomSettingsEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isFormsLoginRequired?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isFormsBrandingDefaultEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isCcFreeTrialActive?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isFileRequestEditorsAllowed?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isFileRequestBrandingDefaultEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isFileRequestLoginRequired?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isSharedLinksExpirationEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly sharedLinksExpirationDays?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly isPublicSharedLinksExpirationEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly publicSharedLinksExpirationDays?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly sharedExpirationTarget?: EnterpriseConfigurationItemStringV2025R0;
  readonly isSharedLinksExpirationNotificationEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly sharedLinksExpirationNotificationDays?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly isSharedLinksExpirationNotificationPrevented?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isAutoDeleteEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly autoDeleteDays?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly isAutoDeleteExpirationModificationPrevented?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly autoDeleteTarget?: EnterpriseConfigurationItemStringV2025R0;
  readonly isCollaborationExpirationEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly collaborationExpirationDays?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly isCollaborationExpirationModificationPrevented?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isCollaborationExpirationNotificationEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly collaborationExpirationTarget?: EnterpriseConfigurationItemStringV2025R0;
  readonly trashAutoClearTime?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly permanentDeletionAccess?: EnterpriseConfigurationItemStringV2025R0;
  readonly permanentDeletionAllowlistUsers?: EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField;
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField(
  val: EnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : serializeSharedLinkPermissionsV2025R0(val.value),
    },
  };
}
export function deserializeEnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField(
  val: SerializedData,
): EnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField"',
    });
  }
  const value: undefined | SharedLinkPermissionsV2025R0 =
    val.value == void 0
      ? void 0
      : deserializeSharedLinkPermissionsV2025R0(val.value);
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField;
}
export function serializeEnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField(
  val: EnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : serializeCollaborationPermissionsV2025R0(val.value),
    },
  };
}
export function deserializeEnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField(
  val: SerializedData,
): EnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField"',
    });
  }
  const value: undefined | CollaborationPermissionsV2025R0 =
    val.value == void 0
      ? void 0
      : deserializeCollaborationPermissionsV2025R0(val.value);
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField;
}
export function serializeEnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField(
  val: EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : (val.value.map(function (item: string): SerializedData {
              return item;
            }) as readonly any[]),
    },
  };
}
export function deserializeEnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField(
  val: SerializedData,
): EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField"',
    });
  }
  if (!(val.value == void 0) && !sdIsList(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "value" of type "EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField"',
    });
  }
  const value: undefined | readonly string[] =
    val.value == void 0
      ? void 0
      : sdIsList(val.value)
        ? (val.value.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField;
}
export function serializeEnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField(
  val: EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField"',
    });
  }
  return { ...base, ...{ ['value']: val.value } };
}
export function deserializeEnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField(
  val: SerializedData,
): EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField"',
    });
  }
  if (!(val.value == void 0) && !sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField"',
    });
  }
  const value: undefined | string = val.value == void 0 ? void 0 : val.value;
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField;
}
export function serializeEnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField(
  val: EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : (val.value.map(function (item: ListUserV2025R0): SerializedData {
              return serializeListUserV2025R0(item);
            }) as readonly any[]),
    },
  };
}
export function deserializeEnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField(
  val: SerializedData,
): EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField"',
    });
  }
  if (!(val.value == void 0) && !sdIsList(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "value" of type "EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField"',
    });
  }
  const value: undefined | readonly ListUserV2025R0[] =
    val.value == void 0
      ? void 0
      : sdIsList(val.value)
        ? (val.value.map(function (itm: SerializedData): ListUserV2025R0 {
            return deserializeListUserV2025R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField;
}
export function serializeEnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField(
  val: EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : (val.value.map(function (item: ListUserV2025R0): SerializedData {
              return serializeListUserV2025R0(item);
            }) as readonly any[]),
    },
  };
}
export function deserializeEnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField(
  val: SerializedData,
): EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField"',
    });
  }
  if (!(val.value == void 0) && !sdIsList(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "value" of type "EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField"',
    });
  }
  const value: undefined | readonly ListUserV2025R0[] =
    val.value == void 0
      ? void 0
      : sdIsList(val.value)
        ? (val.value.map(function (itm: SerializedData): ListUserV2025R0 {
            return deserializeListUserV2025R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField;
}
export function serializeEnterpriseConfigurationContentAndSharingV2025R0(
  val: EnterpriseConfigurationContentAndSharingV2025R0,
): SerializedData {
  return {
    ['enterprise_feature_settings']:
      val.enterpriseFeatureSettings == void 0
        ? val.enterpriseFeatureSettings
        : (val.enterpriseFeatureSettings.map(function (
            item: EnterpriseFeatureSettingsItemV2025R0,
          ): SerializedData {
            return serializeEnterpriseFeatureSettingsItemV2025R0(item);
          }) as readonly any[]),
    ['sharing_item_type']:
      val.sharingItemType == void 0
        ? val.sharingItemType
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.sharingItemType,
          ),
    ['shared_link_company_definition']:
      val.sharedLinkCompanyDefinition == void 0
        ? val.sharedLinkCompanyDefinition
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.sharedLinkCompanyDefinition,
          ),
    ['shared_link_access']:
      val.sharedLinkAccess == void 0
        ? val.sharedLinkAccess
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.sharedLinkAccess,
          ),
    ['shared_link_default_access']:
      val.sharedLinkDefaultAccess == void 0
        ? val.sharedLinkDefaultAccess
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.sharedLinkDefaultAccess,
          ),
    ['shared_link_default_permissions_selected']:
      val.sharedLinkDefaultPermissionsSelected == void 0
        ? val.sharedLinkDefaultPermissionsSelected
        : serializeEnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField(
            val.sharedLinkDefaultPermissionsSelected,
          ),
    ['is_open_custom_urls_disabled']:
      val.isOpenCustomUrlsDisabled == void 0
        ? val.isOpenCustomUrlsDisabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isOpenCustomUrlsDisabled,
          ),
    ['is_custom_domain_hidden_in_shared_link']:
      val.isCustomDomainHiddenInSharedLink == void 0
        ? val.isCustomDomainHiddenInSharedLink
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isCustomDomainHiddenInSharedLink,
          ),
    ['collaboration_permissions']:
      val.collaborationPermissions == void 0
        ? val.collaborationPermissions
        : serializeEnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField(
            val.collaborationPermissions,
          ),
    ['default_collaboration_role']:
      val.defaultCollaborationRole == void 0
        ? val.defaultCollaborationRole
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.defaultCollaborationRole,
          ),
    ['is_invite_privilege_restricted']:
      val.isInvitePrivilegeRestricted == void 0
        ? val.isInvitePrivilegeRestricted
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isInvitePrivilegeRestricted,
          ),
    ['collaboration_restrictions']:
      val.collaborationRestrictions == void 0
        ? val.collaborationRestrictions
        : serializeEnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField(
            val.collaborationRestrictions,
          ),
    ['is_collaborator_invite_links_disabled']:
      val.isCollaboratorInviteLinksDisabled == void 0
        ? val.isCollaboratorInviteLinksDisabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isCollaboratorInviteLinksDisabled,
          ),
    ['is_invite_group_collaborator_disabled']:
      val.isInviteGroupCollaboratorDisabled == void 0
        ? val.isInviteGroupCollaboratorDisabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isInviteGroupCollaboratorDisabled,
          ),
    ['is_ownership_transfer_restricted']:
      val.isOwnershipTransferRestricted == void 0
        ? val.isOwnershipTransferRestricted
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isOwnershipTransferRestricted,
          ),
    ['external_collaboration_status']:
      val.externalCollaborationStatus == void 0
        ? val.externalCollaborationStatus
        : serializeEnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField(
            val.externalCollaborationStatus,
          ),
    ['external_collaboration_allowlist_users']:
      val.externalCollaborationAllowlistUsers == void 0
        ? val.externalCollaborationAllowlistUsers
        : serializeEnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField(
            val.externalCollaborationAllowlistUsers,
          ),
    ['is_watermarking_enterprise_feature_enabled']:
      val.isWatermarkingEnterpriseFeatureEnabled == void 0
        ? val.isWatermarkingEnterpriseFeatureEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isWatermarkingEnterpriseFeatureEnabled,
          ),
    ['is_root_content_creation_restricted']:
      val.isRootContentCreationRestricted == void 0
        ? val.isRootContentCreationRestricted
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isRootContentCreationRestricted,
          ),
    ['is_tag_creation_restricted']:
      val.isTagCreationRestricted == void 0
        ? val.isTagCreationRestricted
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isTagCreationRestricted,
          ),
    ['tag_creation_restriction']:
      val.tagCreationRestriction == void 0
        ? val.tagCreationRestriction
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.tagCreationRestriction,
          ),
    ['is_email_uploads_enabled']:
      val.isEmailUploadsEnabled == void 0
        ? val.isEmailUploadsEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isEmailUploadsEnabled,
          ),
    ['is_custom_settings_enabled']:
      val.isCustomSettingsEnabled == void 0
        ? val.isCustomSettingsEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isCustomSettingsEnabled,
          ),
    ['is_forms_login_required']:
      val.isFormsLoginRequired == void 0
        ? val.isFormsLoginRequired
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isFormsLoginRequired,
          ),
    ['is_forms_branding_default_enabled']:
      val.isFormsBrandingDefaultEnabled == void 0
        ? val.isFormsBrandingDefaultEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isFormsBrandingDefaultEnabled,
          ),
    ['is_cc_free_trial_active']:
      val.isCcFreeTrialActive == void 0
        ? val.isCcFreeTrialActive
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isCcFreeTrialActive,
          ),
    ['is_file_request_editors_allowed']:
      val.isFileRequestEditorsAllowed == void 0
        ? val.isFileRequestEditorsAllowed
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isFileRequestEditorsAllowed,
          ),
    ['is_file_request_branding_default_enabled']:
      val.isFileRequestBrandingDefaultEnabled == void 0
        ? val.isFileRequestBrandingDefaultEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isFileRequestBrandingDefaultEnabled,
          ),
    ['is_file_request_login_required']:
      val.isFileRequestLoginRequired == void 0
        ? val.isFileRequestLoginRequired
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isFileRequestLoginRequired,
          ),
    ['is_shared_links_expiration_enabled']:
      val.isSharedLinksExpirationEnabled == void 0
        ? val.isSharedLinksExpirationEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isSharedLinksExpirationEnabled,
          ),
    ['shared_links_expiration_days']:
      val.sharedLinksExpirationDays == void 0
        ? val.sharedLinksExpirationDays
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.sharedLinksExpirationDays,
          ),
    ['is_public_shared_links_expiration_enabled']:
      val.isPublicSharedLinksExpirationEnabled == void 0
        ? val.isPublicSharedLinksExpirationEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isPublicSharedLinksExpirationEnabled,
          ),
    ['public_shared_links_expiration_days']:
      val.publicSharedLinksExpirationDays == void 0
        ? val.publicSharedLinksExpirationDays
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.publicSharedLinksExpirationDays,
          ),
    ['shared_expiration_target']:
      val.sharedExpirationTarget == void 0
        ? val.sharedExpirationTarget
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.sharedExpirationTarget,
          ),
    ['is_shared_links_expiration_notification_enabled']:
      val.isSharedLinksExpirationNotificationEnabled == void 0
        ? val.isSharedLinksExpirationNotificationEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isSharedLinksExpirationNotificationEnabled,
          ),
    ['shared_links_expiration_notification_days']:
      val.sharedLinksExpirationNotificationDays == void 0
        ? val.sharedLinksExpirationNotificationDays
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.sharedLinksExpirationNotificationDays,
          ),
    ['is_shared_links_expiration_notification_prevented']:
      val.isSharedLinksExpirationNotificationPrevented == void 0
        ? val.isSharedLinksExpirationNotificationPrevented
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isSharedLinksExpirationNotificationPrevented,
          ),
    ['is_auto_delete_enabled']:
      val.isAutoDeleteEnabled == void 0
        ? val.isAutoDeleteEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isAutoDeleteEnabled,
          ),
    ['auto_delete_days']:
      val.autoDeleteDays == void 0
        ? val.autoDeleteDays
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.autoDeleteDays,
          ),
    ['is_auto_delete_expiration_modification_prevented']:
      val.isAutoDeleteExpirationModificationPrevented == void 0
        ? val.isAutoDeleteExpirationModificationPrevented
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isAutoDeleteExpirationModificationPrevented,
          ),
    ['auto_delete_target']:
      val.autoDeleteTarget == void 0
        ? val.autoDeleteTarget
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.autoDeleteTarget,
          ),
    ['is_collaboration_expiration_enabled']:
      val.isCollaborationExpirationEnabled == void 0
        ? val.isCollaborationExpirationEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isCollaborationExpirationEnabled,
          ),
    ['collaboration_expiration_days']:
      val.collaborationExpirationDays == void 0
        ? val.collaborationExpirationDays
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.collaborationExpirationDays,
          ),
    ['is_collaboration_expiration_modification_prevented']:
      val.isCollaborationExpirationModificationPrevented == void 0
        ? val.isCollaborationExpirationModificationPrevented
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isCollaborationExpirationModificationPrevented,
          ),
    ['is_collaboration_expiration_notification_enabled']:
      val.isCollaborationExpirationNotificationEnabled == void 0
        ? val.isCollaborationExpirationNotificationEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isCollaborationExpirationNotificationEnabled,
          ),
    ['collaboration_expiration_target']:
      val.collaborationExpirationTarget == void 0
        ? val.collaborationExpirationTarget
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.collaborationExpirationTarget,
          ),
    ['trash_auto_clear_time']:
      val.trashAutoClearTime == void 0
        ? val.trashAutoClearTime
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.trashAutoClearTime,
          ),
    ['permanent_deletion_access']:
      val.permanentDeletionAccess == void 0
        ? val.permanentDeletionAccess
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.permanentDeletionAccess,
          ),
    ['permanent_deletion_allowlist_users']:
      val.permanentDeletionAllowlistUsers == void 0
        ? val.permanentDeletionAllowlistUsers
        : serializeEnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField(
            val.permanentDeletionAllowlistUsers,
          ),
  };
}
export function deserializeEnterpriseConfigurationContentAndSharingV2025R0(
  val: SerializedData,
): EnterpriseConfigurationContentAndSharingV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationContentAndSharingV2025R0"',
    });
  }
  if (
    !(val.enterprise_feature_settings == void 0) &&
    !sdIsList(val.enterprise_feature_settings)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "enterprise_feature_settings" of type "EnterpriseConfigurationContentAndSharingV2025R0"',
    });
  }
  const enterpriseFeatureSettings:
    | undefined
    | readonly EnterpriseFeatureSettingsItemV2025R0[] =
    val.enterprise_feature_settings == void 0
      ? void 0
      : sdIsList(val.enterprise_feature_settings)
        ? (val.enterprise_feature_settings.map(function (
            itm: SerializedData,
          ): EnterpriseFeatureSettingsItemV2025R0 {
            return deserializeEnterpriseFeatureSettingsItemV2025R0(itm);
          }) as readonly any[])
        : [];
  const sharingItemType: undefined | EnterpriseConfigurationItemStringV2025R0 =
    val.sharing_item_type == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.sharing_item_type,
        );
  const sharedLinkCompanyDefinition:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.shared_link_company_definition == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.shared_link_company_definition,
        );
  const sharedLinkAccess: undefined | EnterpriseConfigurationItemStringV2025R0 =
    val.shared_link_access == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.shared_link_access,
        );
  const sharedLinkDefaultAccess:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.shared_link_default_access == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.shared_link_default_access,
        );
  const sharedLinkDefaultPermissionsSelected:
    | undefined
    | EnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField =
    val.shared_link_default_permissions_selected == void 0
      ? void 0
      : deserializeEnterpriseConfigurationContentAndSharingV2025R0SharedLinkDefaultPermissionsSelectedField(
          val.shared_link_default_permissions_selected,
        );
  const isOpenCustomUrlsDisabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_open_custom_urls_disabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_open_custom_urls_disabled,
        );
  const isCustomDomainHiddenInSharedLink:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_custom_domain_hidden_in_shared_link == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_custom_domain_hidden_in_shared_link,
        );
  const collaborationPermissions:
    | undefined
    | EnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField =
    val.collaboration_permissions == void 0
      ? void 0
      : deserializeEnterpriseConfigurationContentAndSharingV2025R0CollaborationPermissionsField(
          val.collaboration_permissions,
        );
  const defaultCollaborationRole:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.default_collaboration_role == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.default_collaboration_role,
        );
  const isInvitePrivilegeRestricted:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_invite_privilege_restricted == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_invite_privilege_restricted,
        );
  const collaborationRestrictions:
    | undefined
    | EnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField =
    val.collaboration_restrictions == void 0
      ? void 0
      : deserializeEnterpriseConfigurationContentAndSharingV2025R0CollaborationRestrictionsField(
          val.collaboration_restrictions,
        );
  const isCollaboratorInviteLinksDisabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_collaborator_invite_links_disabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_collaborator_invite_links_disabled,
        );
  const isInviteGroupCollaboratorDisabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_invite_group_collaborator_disabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_invite_group_collaborator_disabled,
        );
  const isOwnershipTransferRestricted:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_ownership_transfer_restricted == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_ownership_transfer_restricted,
        );
  const externalCollaborationStatus:
    | undefined
    | EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField =
    val.external_collaboration_status == void 0
      ? void 0
      : deserializeEnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationStatusField(
          val.external_collaboration_status,
        );
  const externalCollaborationAllowlistUsers:
    | undefined
    | EnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField =
    val.external_collaboration_allowlist_users == void 0
      ? void 0
      : deserializeEnterpriseConfigurationContentAndSharingV2025R0ExternalCollaborationAllowlistUsersField(
          val.external_collaboration_allowlist_users,
        );
  const isWatermarkingEnterpriseFeatureEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_watermarking_enterprise_feature_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_watermarking_enterprise_feature_enabled,
        );
  const isRootContentCreationRestricted:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_root_content_creation_restricted == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_root_content_creation_restricted,
        );
  const isTagCreationRestricted:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_tag_creation_restricted == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_tag_creation_restricted,
        );
  const tagCreationRestriction:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.tag_creation_restriction == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.tag_creation_restriction,
        );
  const isEmailUploadsEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_email_uploads_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_email_uploads_enabled,
        );
  const isCustomSettingsEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_custom_settings_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_custom_settings_enabled,
        );
  const isFormsLoginRequired:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_forms_login_required == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_forms_login_required,
        );
  const isFormsBrandingDefaultEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_forms_branding_default_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_forms_branding_default_enabled,
        );
  const isCcFreeTrialActive:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_cc_free_trial_active == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_cc_free_trial_active,
        );
  const isFileRequestEditorsAllowed:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_file_request_editors_allowed == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_file_request_editors_allowed,
        );
  const isFileRequestBrandingDefaultEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_file_request_branding_default_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_file_request_branding_default_enabled,
        );
  const isFileRequestLoginRequired:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_file_request_login_required == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_file_request_login_required,
        );
  const isSharedLinksExpirationEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_shared_links_expiration_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_shared_links_expiration_enabled,
        );
  const sharedLinksExpirationDays:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.shared_links_expiration_days == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.shared_links_expiration_days,
        );
  const isPublicSharedLinksExpirationEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_public_shared_links_expiration_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_public_shared_links_expiration_enabled,
        );
  const publicSharedLinksExpirationDays:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.public_shared_links_expiration_days == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.public_shared_links_expiration_days,
        );
  const sharedExpirationTarget:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.shared_expiration_target == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.shared_expiration_target,
        );
  const isSharedLinksExpirationNotificationEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_shared_links_expiration_notification_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_shared_links_expiration_notification_enabled,
        );
  const sharedLinksExpirationNotificationDays:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.shared_links_expiration_notification_days == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.shared_links_expiration_notification_days,
        );
  const isSharedLinksExpirationNotificationPrevented:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_shared_links_expiration_notification_prevented == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_shared_links_expiration_notification_prevented,
        );
  const isAutoDeleteEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_auto_delete_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_auto_delete_enabled,
        );
  const autoDeleteDays: undefined | EnterpriseConfigurationItemIntegerV2025R0 =
    val.auto_delete_days == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.auto_delete_days,
        );
  const isAutoDeleteExpirationModificationPrevented:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_auto_delete_expiration_modification_prevented == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_auto_delete_expiration_modification_prevented,
        );
  const autoDeleteTarget: undefined | EnterpriseConfigurationItemStringV2025R0 =
    val.auto_delete_target == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.auto_delete_target,
        );
  const isCollaborationExpirationEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_collaboration_expiration_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_collaboration_expiration_enabled,
        );
  const collaborationExpirationDays:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.collaboration_expiration_days == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.collaboration_expiration_days,
        );
  const isCollaborationExpirationModificationPrevented:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_collaboration_expiration_modification_prevented == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_collaboration_expiration_modification_prevented,
        );
  const isCollaborationExpirationNotificationEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_collaboration_expiration_notification_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_collaboration_expiration_notification_enabled,
        );
  const collaborationExpirationTarget:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.collaboration_expiration_target == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.collaboration_expiration_target,
        );
  const trashAutoClearTime:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.trash_auto_clear_time == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.trash_auto_clear_time,
        );
  const permanentDeletionAccess:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.permanent_deletion_access == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.permanent_deletion_access,
        );
  const permanentDeletionAllowlistUsers:
    | undefined
    | EnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField =
    val.permanent_deletion_allowlist_users == void 0
      ? void 0
      : deserializeEnterpriseConfigurationContentAndSharingV2025R0PermanentDeletionAllowlistUsersField(
          val.permanent_deletion_allowlist_users,
        );
  return {
    enterpriseFeatureSettings: enterpriseFeatureSettings,
    sharingItemType: sharingItemType,
    sharedLinkCompanyDefinition: sharedLinkCompanyDefinition,
    sharedLinkAccess: sharedLinkAccess,
    sharedLinkDefaultAccess: sharedLinkDefaultAccess,
    sharedLinkDefaultPermissionsSelected: sharedLinkDefaultPermissionsSelected,
    isOpenCustomUrlsDisabled: isOpenCustomUrlsDisabled,
    isCustomDomainHiddenInSharedLink: isCustomDomainHiddenInSharedLink,
    collaborationPermissions: collaborationPermissions,
    defaultCollaborationRole: defaultCollaborationRole,
    isInvitePrivilegeRestricted: isInvitePrivilegeRestricted,
    collaborationRestrictions: collaborationRestrictions,
    isCollaboratorInviteLinksDisabled: isCollaboratorInviteLinksDisabled,
    isInviteGroupCollaboratorDisabled: isInviteGroupCollaboratorDisabled,
    isOwnershipTransferRestricted: isOwnershipTransferRestricted,
    externalCollaborationStatus: externalCollaborationStatus,
    externalCollaborationAllowlistUsers: externalCollaborationAllowlistUsers,
    isWatermarkingEnterpriseFeatureEnabled:
      isWatermarkingEnterpriseFeatureEnabled,
    isRootContentCreationRestricted: isRootContentCreationRestricted,
    isTagCreationRestricted: isTagCreationRestricted,
    tagCreationRestriction: tagCreationRestriction,
    isEmailUploadsEnabled: isEmailUploadsEnabled,
    isCustomSettingsEnabled: isCustomSettingsEnabled,
    isFormsLoginRequired: isFormsLoginRequired,
    isFormsBrandingDefaultEnabled: isFormsBrandingDefaultEnabled,
    isCcFreeTrialActive: isCcFreeTrialActive,
    isFileRequestEditorsAllowed: isFileRequestEditorsAllowed,
    isFileRequestBrandingDefaultEnabled: isFileRequestBrandingDefaultEnabled,
    isFileRequestLoginRequired: isFileRequestLoginRequired,
    isSharedLinksExpirationEnabled: isSharedLinksExpirationEnabled,
    sharedLinksExpirationDays: sharedLinksExpirationDays,
    isPublicSharedLinksExpirationEnabled: isPublicSharedLinksExpirationEnabled,
    publicSharedLinksExpirationDays: publicSharedLinksExpirationDays,
    sharedExpirationTarget: sharedExpirationTarget,
    isSharedLinksExpirationNotificationEnabled:
      isSharedLinksExpirationNotificationEnabled,
    sharedLinksExpirationNotificationDays:
      sharedLinksExpirationNotificationDays,
    isSharedLinksExpirationNotificationPrevented:
      isSharedLinksExpirationNotificationPrevented,
    isAutoDeleteEnabled: isAutoDeleteEnabled,
    autoDeleteDays: autoDeleteDays,
    isAutoDeleteExpirationModificationPrevented:
      isAutoDeleteExpirationModificationPrevented,
    autoDeleteTarget: autoDeleteTarget,
    isCollaborationExpirationEnabled: isCollaborationExpirationEnabled,
    collaborationExpirationDays: collaborationExpirationDays,
    isCollaborationExpirationModificationPrevented:
      isCollaborationExpirationModificationPrevented,
    isCollaborationExpirationNotificationEnabled:
      isCollaborationExpirationNotificationEnabled,
    collaborationExpirationTarget: collaborationExpirationTarget,
    trashAutoClearTime: trashAutoClearTime,
    permanentDeletionAccess: permanentDeletionAccess,
    permanentDeletionAllowlistUsers: permanentDeletionAllowlistUsers,
  } satisfies EnterpriseConfigurationContentAndSharingV2025R0;
}

import { serializeEnterpriseFeatureSettingsItemV2025R0 } from './enterpriseFeatureSettingsItemV2025R0';
import { deserializeEnterpriseFeatureSettingsItemV2025R0 } from './enterpriseFeatureSettingsItemV2025R0';
import { serializeEnterpriseConfigurationItemStringV2025R0 } from './enterpriseConfigurationItemStringV2025R0';
import { deserializeEnterpriseConfigurationItemStringV2025R0 } from './enterpriseConfigurationItemStringV2025R0';
import { serializeEnterpriseConfigurationItemBooleanV2025R0 } from './enterpriseConfigurationItemBooleanV2025R0';
import { deserializeEnterpriseConfigurationItemBooleanV2025R0 } from './enterpriseConfigurationItemBooleanV2025R0';
import { serializeEnterpriseConfigurationItemIntegerV2025R0 } from './enterpriseConfigurationItemIntegerV2025R0';
import { deserializeEnterpriseConfigurationItemIntegerV2025R0 } from './enterpriseConfigurationItemIntegerV2025R0';
import { serializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { deserializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { serializeUserTrackingCodeV2025R0 } from './userTrackingCodeV2025R0';
import { deserializeUserTrackingCodeV2025R0 } from './userTrackingCodeV2025R0';
import { EnterpriseFeatureSettingsItemV2025R0 } from './enterpriseFeatureSettingsItemV2025R0';
import { EnterpriseConfigurationItemStringV2025R0 } from './enterpriseConfigurationItemStringV2025R0';
import { EnterpriseConfigurationItemBooleanV2025R0 } from './enterpriseConfigurationItemBooleanV2025R0';
import { EnterpriseConfigurationItemIntegerV2025R0 } from './enterpriseConfigurationItemIntegerV2025R0';
import { EnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { UserTrackingCodeV2025R0 } from './userTrackingCodeV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: readonly UserTrackingCodeV2025R0[];
  };
export interface EnterpriseConfigurationUserSettingsV2025R0 {
  readonly enterpriseFeatureSettings?: readonly EnterpriseFeatureSettingsItemV2025R0[];
  readonly userInvitesExpirationTimeFrame?: EnterpriseConfigurationItemStringV2025R0;
  readonly isUsernameChangeRestricted?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isBoxSyncRestrictedForNewUsers?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isViewAllUsersEnabledForNewUsers?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isDeviceLimitExemptionEnabledForNewUsers?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isExternalCollaborationRestrictedForNewUsers?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isUnlimitedStorageEnabledForNewUsers?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly newUserDefaultStorageLimit?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly newUserDefaultTimezone?: EnterpriseConfigurationItemStringV2025R0;
  readonly newUserDefaultLanguage?: EnterpriseConfigurationItemStringV2025R0;
  readonly isEnterpriseSsoRequired?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isEnterpriseSsoInTesting?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isSsoAutoAddGroupsEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isSsoAutoAddUserToGroupsEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isSsoAutoRemoveUserFromGroupsEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly userTrackingCodes?: EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField;
  readonly numberOfUserTrackingCodesRemaining?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly isInstantLoginRestricted?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField(
  val: EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : (val.value.map(function (
              item: UserTrackingCodeV2025R0,
            ): SerializedData {
              return serializeUserTrackingCodeV2025R0(item);
            }) as readonly any[]),
    },
  };
}
export function deserializeEnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField(
  val: SerializedData,
): EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField"',
    });
  }
  if (!(val.value == void 0) && !sdIsList(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "value" of type "EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField"',
    });
  }
  const value: undefined | readonly UserTrackingCodeV2025R0[] =
    val.value == void 0
      ? void 0
      : sdIsList(val.value)
        ? (val.value.map(function (
            itm: SerializedData,
          ): UserTrackingCodeV2025R0 {
            return deserializeUserTrackingCodeV2025R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField;
}
export function serializeEnterpriseConfigurationUserSettingsV2025R0(
  val: EnterpriseConfigurationUserSettingsV2025R0,
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
    ['user_invites_expiration_time_frame']:
      val.userInvitesExpirationTimeFrame == void 0
        ? val.userInvitesExpirationTimeFrame
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.userInvitesExpirationTimeFrame,
          ),
    ['is_username_change_restricted']:
      val.isUsernameChangeRestricted == void 0
        ? val.isUsernameChangeRestricted
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isUsernameChangeRestricted,
          ),
    ['is_box_sync_restricted_for_new_users']:
      val.isBoxSyncRestrictedForNewUsers == void 0
        ? val.isBoxSyncRestrictedForNewUsers
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isBoxSyncRestrictedForNewUsers,
          ),
    ['is_view_all_users_enabled_for_new_users']:
      val.isViewAllUsersEnabledForNewUsers == void 0
        ? val.isViewAllUsersEnabledForNewUsers
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isViewAllUsersEnabledForNewUsers,
          ),
    ['is_device_limit_exemption_enabled_for_new_users']:
      val.isDeviceLimitExemptionEnabledForNewUsers == void 0
        ? val.isDeviceLimitExemptionEnabledForNewUsers
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isDeviceLimitExemptionEnabledForNewUsers,
          ),
    ['is_external_collaboration_restricted_for_new_users']:
      val.isExternalCollaborationRestrictedForNewUsers == void 0
        ? val.isExternalCollaborationRestrictedForNewUsers
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isExternalCollaborationRestrictedForNewUsers,
          ),
    ['is_unlimited_storage_enabled_for_new_users']:
      val.isUnlimitedStorageEnabledForNewUsers == void 0
        ? val.isUnlimitedStorageEnabledForNewUsers
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isUnlimitedStorageEnabledForNewUsers,
          ),
    ['new_user_default_storage_limit']:
      val.newUserDefaultStorageLimit == void 0
        ? val.newUserDefaultStorageLimit
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.newUserDefaultStorageLimit,
          ),
    ['new_user_default_timezone']:
      val.newUserDefaultTimezone == void 0
        ? val.newUserDefaultTimezone
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.newUserDefaultTimezone,
          ),
    ['new_user_default_language']:
      val.newUserDefaultLanguage == void 0
        ? val.newUserDefaultLanguage
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.newUserDefaultLanguage,
          ),
    ['is_enterprise_sso_required']:
      val.isEnterpriseSsoRequired == void 0
        ? val.isEnterpriseSsoRequired
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isEnterpriseSsoRequired,
          ),
    ['is_enterprise_sso_in_testing']:
      val.isEnterpriseSsoInTesting == void 0
        ? val.isEnterpriseSsoInTesting
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isEnterpriseSsoInTesting,
          ),
    ['is_sso_auto_add_groups_enabled']:
      val.isSsoAutoAddGroupsEnabled == void 0
        ? val.isSsoAutoAddGroupsEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isSsoAutoAddGroupsEnabled,
          ),
    ['is_sso_auto_add_user_to_groups_enabled']:
      val.isSsoAutoAddUserToGroupsEnabled == void 0
        ? val.isSsoAutoAddUserToGroupsEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isSsoAutoAddUserToGroupsEnabled,
          ),
    ['is_sso_auto_remove_user_from_groups_enabled']:
      val.isSsoAutoRemoveUserFromGroupsEnabled == void 0
        ? val.isSsoAutoRemoveUserFromGroupsEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isSsoAutoRemoveUserFromGroupsEnabled,
          ),
    ['user_tracking_codes']:
      val.userTrackingCodes == void 0
        ? val.userTrackingCodes
        : serializeEnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField(
            val.userTrackingCodes,
          ),
    ['number_of_user_tracking_codes_remaining']:
      val.numberOfUserTrackingCodesRemaining == void 0
        ? val.numberOfUserTrackingCodesRemaining
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.numberOfUserTrackingCodesRemaining,
          ),
    ['is_instant_login_restricted']:
      val.isInstantLoginRestricted == void 0
        ? val.isInstantLoginRestricted
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isInstantLoginRestricted,
          ),
  };
}
export function deserializeEnterpriseConfigurationUserSettingsV2025R0(
  val: SerializedData,
): EnterpriseConfigurationUserSettingsV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationUserSettingsV2025R0"',
    });
  }
  if (
    !(val.enterprise_feature_settings == void 0) &&
    !sdIsList(val.enterprise_feature_settings)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "enterprise_feature_settings" of type "EnterpriseConfigurationUserSettingsV2025R0"',
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
  const userInvitesExpirationTimeFrame:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.user_invites_expiration_time_frame == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.user_invites_expiration_time_frame,
        );
  const isUsernameChangeRestricted:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_username_change_restricted == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_username_change_restricted,
        );
  const isBoxSyncRestrictedForNewUsers:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_box_sync_restricted_for_new_users == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_box_sync_restricted_for_new_users,
        );
  const isViewAllUsersEnabledForNewUsers:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_view_all_users_enabled_for_new_users == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_view_all_users_enabled_for_new_users,
        );
  const isDeviceLimitExemptionEnabledForNewUsers:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_device_limit_exemption_enabled_for_new_users == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_device_limit_exemption_enabled_for_new_users,
        );
  const isExternalCollaborationRestrictedForNewUsers:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_external_collaboration_restricted_for_new_users == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_external_collaboration_restricted_for_new_users,
        );
  const isUnlimitedStorageEnabledForNewUsers:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_unlimited_storage_enabled_for_new_users == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_unlimited_storage_enabled_for_new_users,
        );
  const newUserDefaultStorageLimit:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.new_user_default_storage_limit == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.new_user_default_storage_limit,
        );
  const newUserDefaultTimezone:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.new_user_default_timezone == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.new_user_default_timezone,
        );
  const newUserDefaultLanguage:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.new_user_default_language == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.new_user_default_language,
        );
  const isEnterpriseSsoRequired:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_enterprise_sso_required == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_enterprise_sso_required,
        );
  const isEnterpriseSsoInTesting:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_enterprise_sso_in_testing == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_enterprise_sso_in_testing,
        );
  const isSsoAutoAddGroupsEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_sso_auto_add_groups_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_sso_auto_add_groups_enabled,
        );
  const isSsoAutoAddUserToGroupsEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_sso_auto_add_user_to_groups_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_sso_auto_add_user_to_groups_enabled,
        );
  const isSsoAutoRemoveUserFromGroupsEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_sso_auto_remove_user_from_groups_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_sso_auto_remove_user_from_groups_enabled,
        );
  const userTrackingCodes:
    | undefined
    | EnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField =
    val.user_tracking_codes == void 0
      ? void 0
      : deserializeEnterpriseConfigurationUserSettingsV2025R0UserTrackingCodesField(
          val.user_tracking_codes,
        );
  const numberOfUserTrackingCodesRemaining:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.number_of_user_tracking_codes_remaining == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.number_of_user_tracking_codes_remaining,
        );
  const isInstantLoginRestricted:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_instant_login_restricted == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_instant_login_restricted,
        );
  return {
    enterpriseFeatureSettings: enterpriseFeatureSettings,
    userInvitesExpirationTimeFrame: userInvitesExpirationTimeFrame,
    isUsernameChangeRestricted: isUsernameChangeRestricted,
    isBoxSyncRestrictedForNewUsers: isBoxSyncRestrictedForNewUsers,
    isViewAllUsersEnabledForNewUsers: isViewAllUsersEnabledForNewUsers,
    isDeviceLimitExemptionEnabledForNewUsers:
      isDeviceLimitExemptionEnabledForNewUsers,
    isExternalCollaborationRestrictedForNewUsers:
      isExternalCollaborationRestrictedForNewUsers,
    isUnlimitedStorageEnabledForNewUsers: isUnlimitedStorageEnabledForNewUsers,
    newUserDefaultStorageLimit: newUserDefaultStorageLimit,
    newUserDefaultTimezone: newUserDefaultTimezone,
    newUserDefaultLanguage: newUserDefaultLanguage,
    isEnterpriseSsoRequired: isEnterpriseSsoRequired,
    isEnterpriseSsoInTesting: isEnterpriseSsoInTesting,
    isSsoAutoAddGroupsEnabled: isSsoAutoAddGroupsEnabled,
    isSsoAutoAddUserToGroupsEnabled: isSsoAutoAddUserToGroupsEnabled,
    isSsoAutoRemoveUserFromGroupsEnabled: isSsoAutoRemoveUserFromGroupsEnabled,
    userTrackingCodes: userTrackingCodes,
    numberOfUserTrackingCodesRemaining: numberOfUserTrackingCodesRemaining,
    isInstantLoginRestricted: isInstantLoginRestricted,
  } satisfies EnterpriseConfigurationUserSettingsV2025R0;
}

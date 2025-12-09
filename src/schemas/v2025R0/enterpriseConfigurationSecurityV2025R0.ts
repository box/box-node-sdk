import { serializeEnterpriseConfigurationItemBooleanV2025R0 } from './enterpriseConfigurationItemBooleanV2025R0';
import { deserializeEnterpriseConfigurationItemBooleanV2025R0 } from './enterpriseConfigurationItemBooleanV2025R0';
import { serializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { deserializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { serializeEnterpriseConfigurationItemStringV2025R0 } from './enterpriseConfigurationItemStringV2025R0';
import { deserializeEnterpriseConfigurationItemStringV2025R0 } from './enterpriseConfigurationItemStringV2025R0';
import { serializeEnterpriseConfigurationItemIntegerV2025R0 } from './enterpriseConfigurationItemIntegerV2025R0';
import { deserializeEnterpriseConfigurationItemIntegerV2025R0 } from './enterpriseConfigurationItemIntegerV2025R0';
import { serializeExternalCollabSecuritySettingsV2025R0 } from './externalCollabSecuritySettingsV2025R0';
import { deserializeExternalCollabSecuritySettingsV2025R0 } from './externalCollabSecuritySettingsV2025R0';
import { serializeKeysafeSettingsV2025R0 } from './keysafeSettingsV2025R0';
import { deserializeKeysafeSettingsV2025R0 } from './keysafeSettingsV2025R0';
import { serializeCustomSessionDurationGroupItemV2025R0 } from './customSessionDurationGroupItemV2025R0';
import { deserializeCustomSessionDurationGroupItemV2025R0 } from './customSessionDurationGroupItemV2025R0';
import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { EnterpriseConfigurationItemBooleanV2025R0 } from './enterpriseConfigurationItemBooleanV2025R0';
import { EnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { EnterpriseConfigurationItemStringV2025R0 } from './enterpriseConfigurationItemStringV2025R0';
import { EnterpriseConfigurationItemIntegerV2025R0 } from './enterpriseConfigurationItemIntegerV2025R0';
import { ExternalCollabSecuritySettingsV2025R0 } from './externalCollabSecuritySettingsV2025R0';
import { KeysafeSettingsV2025R0 } from './keysafeSettingsV2025R0';
import { CustomSessionDurationGroupItemV2025R0 } from './customSessionDurationGroupItemV2025R0';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField =
  EnterpriseConfigurationItemV2025R0 & {
    /**
     * When an enterprise password reset was last applied. */
    readonly value?: DateTime | null;
  };
export type EnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: ExternalCollabSecuritySettingsV2025R0;
  };
export type EnterpriseConfigurationSecurityV2025R0KeysafeField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: KeysafeSettingsV2025R0;
  };
export type EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: readonly CustomSessionDurationGroupItemV2025R0[];
  };
export interface EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField {
  /**
   * Number of days before the user is required to authenticate again. */
  readonly days?: number | null;
  /**
   * Number of hours before the user is required to authenticate again. */
  readonly hours?: number | null;
  readonly rawData?: SerializedData;
}
export type EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField;
  };
export interface EnterpriseConfigurationSecurityV2025R0 {
  readonly isManagedUserSignupEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isManagedUserSignupNotificationEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isManagedUserSignupCorporateEmailEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isNewUserNotificationDailyDigestEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isManagedUserEmailChangeDisabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isMultiFactorAuthRequired?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isWeakPasswordPreventionEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isPasswordLeakDetectionEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly lastPasswordResetAt?: EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField;
  readonly isPasswordRequestNotificationEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isPasswordChangeNotificationEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isStrongPasswordForExtCollabEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly isManagedUserMigrationDisabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly joinLink?: EnterpriseConfigurationItemStringV2025R0;
  readonly joinUrl?: EnterpriseConfigurationItemStringV2025R0;
  readonly failedLoginAttemptsToTriggerAdminNotification?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly passwordMinLength?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly passwordMinUppercaseCharacters?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly passwordMinNumericCharacters?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly passwordMinSpecialCharacters?: EnterpriseConfigurationItemIntegerV2025R0;
  readonly passwordResetFrequency?: EnterpriseConfigurationItemStringV2025R0;
  readonly previousPasswordReuseLimit?: EnterpriseConfigurationItemStringV2025R0;
  readonly sessionDuration?: EnterpriseConfigurationItemStringV2025R0;
  readonly externalCollabMultiFactorAuthSettings?: EnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField;
  readonly keysafe?: EnterpriseConfigurationSecurityV2025R0KeysafeField;
  readonly isCustomSessionDurationEnabled?: EnterpriseConfigurationItemBooleanV2025R0;
  readonly customSessionDurationValue?: EnterpriseConfigurationItemStringV2025R0;
  readonly customSessionDurationGroups?: EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField;
  readonly multiFactorAuthType?: EnterpriseConfigurationItemStringV2025R0;
  readonly enforcedMfaFrequency?: EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField;
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField(
  val: EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']: val.value == void 0 ? val.value : serializeDateTime(val.value),
    },
  };
}
export function deserializeEnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField(
  val: SerializedData,
): EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField"',
    });
  }
  if (!(val.value == void 0) && !sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField"',
    });
  }
  const value: undefined | DateTime =
    val.value == void 0 ? void 0 : deserializeDateTime(val.value);
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField;
}
export function serializeEnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField(
  val: EnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : serializeExternalCollabSecuritySettingsV2025R0(val.value),
    },
  };
}
export function deserializeEnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField(
  val: SerializedData,
): EnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField"',
    });
  }
  const value: ExternalCollabSecuritySettingsV2025R0 | undefined =
    val.value == void 0
      ? void 0
      : deserializeExternalCollabSecuritySettingsV2025R0(val.value);
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField;
}
export function serializeEnterpriseConfigurationSecurityV2025R0KeysafeField(
  val: EnterpriseConfigurationSecurityV2025R0KeysafeField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0KeysafeField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : serializeKeysafeSettingsV2025R0(val.value),
    },
  };
}
export function deserializeEnterpriseConfigurationSecurityV2025R0KeysafeField(
  val: SerializedData,
): EnterpriseConfigurationSecurityV2025R0KeysafeField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0KeysafeField"',
    });
  }
  const value: KeysafeSettingsV2025R0 | undefined =
    val.value == void 0 ? void 0 : deserializeKeysafeSettingsV2025R0(val.value);
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationSecurityV2025R0KeysafeField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationSecurityV2025R0KeysafeField;
}
export function serializeEnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField(
  val: EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : (val.value.map(function (
              item: CustomSessionDurationGroupItemV2025R0,
            ): SerializedData {
              return serializeCustomSessionDurationGroupItemV2025R0(item);
            }) as readonly any[]),
    },
  };
}
export function deserializeEnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField(
  val: SerializedData,
): EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField"',
    });
  }
  if (!(val.value == void 0) && !sdIsList(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "value" of type "EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField"',
    });
  }
  const value: undefined | readonly CustomSessionDurationGroupItemV2025R0[] =
    val.value == void 0
      ? void 0
      : sdIsList(val.value)
        ? (val.value.map(function (
            itm: SerializedData,
          ): CustomSessionDurationGroupItemV2025R0 {
            return deserializeCustomSessionDurationGroupItemV2025R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField;
}
export function serializeEnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField(
  val: EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField,
): SerializedData {
  return { ['days']: val.days, ['hours']: val.hours };
}
export function deserializeEnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField(
  val: SerializedData,
): EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField"',
    });
  }
  if (!(val.days == void 0) && !sdIsNumber(val.days)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "days" of type "EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField"',
    });
  }
  const days: undefined | number = val.days == void 0 ? void 0 : val.days;
  if (!(val.hours == void 0) && !sdIsNumber(val.hours)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "hours" of type "EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField"',
    });
  }
  const hours: undefined | number = val.hours == void 0 ? void 0 : val.hours;
  return {
    days: days,
    hours: hours,
  } satisfies EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField;
}
export function serializeEnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField(
  val: EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : serializeEnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField(
              val.value,
            ),
    },
  };
}
export function deserializeEnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField(
  val: SerializedData,
): EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField"',
    });
  }
  const value:
    | undefined
    | EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField =
    val.value == void 0
      ? void 0
      : deserializeEnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyFieldValueField(
          val.value,
        );
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField;
}
export function serializeEnterpriseConfigurationSecurityV2025R0(
  val: EnterpriseConfigurationSecurityV2025R0,
): SerializedData {
  return {
    ['is_managed_user_signup_enabled']:
      val.isManagedUserSignupEnabled == void 0
        ? val.isManagedUserSignupEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isManagedUserSignupEnabled,
          ),
    ['is_managed_user_signup_notification_enabled']:
      val.isManagedUserSignupNotificationEnabled == void 0
        ? val.isManagedUserSignupNotificationEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isManagedUserSignupNotificationEnabled,
          ),
    ['is_managed_user_signup_corporate_email_enabled']:
      val.isManagedUserSignupCorporateEmailEnabled == void 0
        ? val.isManagedUserSignupCorporateEmailEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isManagedUserSignupCorporateEmailEnabled,
          ),
    ['is_new_user_notification_daily_digest_enabled']:
      val.isNewUserNotificationDailyDigestEnabled == void 0
        ? val.isNewUserNotificationDailyDigestEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isNewUserNotificationDailyDigestEnabled,
          ),
    ['is_managed_user_email_change_disabled']:
      val.isManagedUserEmailChangeDisabled == void 0
        ? val.isManagedUserEmailChangeDisabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isManagedUserEmailChangeDisabled,
          ),
    ['is_multi_factor_auth_required']:
      val.isMultiFactorAuthRequired == void 0
        ? val.isMultiFactorAuthRequired
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isMultiFactorAuthRequired,
          ),
    ['is_weak_password_prevention_enabled']:
      val.isWeakPasswordPreventionEnabled == void 0
        ? val.isWeakPasswordPreventionEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isWeakPasswordPreventionEnabled,
          ),
    ['is_password_leak_detection_enabled']:
      val.isPasswordLeakDetectionEnabled == void 0
        ? val.isPasswordLeakDetectionEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isPasswordLeakDetectionEnabled,
          ),
    ['last_password_reset_at']:
      val.lastPasswordResetAt == void 0
        ? val.lastPasswordResetAt
        : serializeEnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField(
            val.lastPasswordResetAt,
          ),
    ['is_password_request_notification_enabled']:
      val.isPasswordRequestNotificationEnabled == void 0
        ? val.isPasswordRequestNotificationEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isPasswordRequestNotificationEnabled,
          ),
    ['is_password_change_notification_enabled']:
      val.isPasswordChangeNotificationEnabled == void 0
        ? val.isPasswordChangeNotificationEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isPasswordChangeNotificationEnabled,
          ),
    ['is_strong_password_for_ext_collab_enabled']:
      val.isStrongPasswordForExtCollabEnabled == void 0
        ? val.isStrongPasswordForExtCollabEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isStrongPasswordForExtCollabEnabled,
          ),
    ['is_managed_user_migration_disabled']:
      val.isManagedUserMigrationDisabled == void 0
        ? val.isManagedUserMigrationDisabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isManagedUserMigrationDisabled,
          ),
    ['join_link']:
      val.joinLink == void 0
        ? val.joinLink
        : serializeEnterpriseConfigurationItemStringV2025R0(val.joinLink),
    ['join_url']:
      val.joinUrl == void 0
        ? val.joinUrl
        : serializeEnterpriseConfigurationItemStringV2025R0(val.joinUrl),
    ['failed_login_attempts_to_trigger_admin_notification']:
      val.failedLoginAttemptsToTriggerAdminNotification == void 0
        ? val.failedLoginAttemptsToTriggerAdminNotification
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.failedLoginAttemptsToTriggerAdminNotification,
          ),
    ['password_min_length']:
      val.passwordMinLength == void 0
        ? val.passwordMinLength
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.passwordMinLength,
          ),
    ['password_min_uppercase_characters']:
      val.passwordMinUppercaseCharacters == void 0
        ? val.passwordMinUppercaseCharacters
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.passwordMinUppercaseCharacters,
          ),
    ['password_min_numeric_characters']:
      val.passwordMinNumericCharacters == void 0
        ? val.passwordMinNumericCharacters
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.passwordMinNumericCharacters,
          ),
    ['password_min_special_characters']:
      val.passwordMinSpecialCharacters == void 0
        ? val.passwordMinSpecialCharacters
        : serializeEnterpriseConfigurationItemIntegerV2025R0(
            val.passwordMinSpecialCharacters,
          ),
    ['password_reset_frequency']:
      val.passwordResetFrequency == void 0
        ? val.passwordResetFrequency
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.passwordResetFrequency,
          ),
    ['previous_password_reuse_limit']:
      val.previousPasswordReuseLimit == void 0
        ? val.previousPasswordReuseLimit
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.previousPasswordReuseLimit,
          ),
    ['session_duration']:
      val.sessionDuration == void 0
        ? val.sessionDuration
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.sessionDuration,
          ),
    ['external_collab_multi_factor_auth_settings']:
      val.externalCollabMultiFactorAuthSettings == void 0
        ? val.externalCollabMultiFactorAuthSettings
        : serializeEnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField(
            val.externalCollabMultiFactorAuthSettings,
          ),
    ['keysafe']:
      val.keysafe == void 0
        ? val.keysafe
        : serializeEnterpriseConfigurationSecurityV2025R0KeysafeField(
            val.keysafe,
          ),
    ['is_custom_session_duration_enabled']:
      val.isCustomSessionDurationEnabled == void 0
        ? val.isCustomSessionDurationEnabled
        : serializeEnterpriseConfigurationItemBooleanV2025R0(
            val.isCustomSessionDurationEnabled,
          ),
    ['custom_session_duration_value']:
      val.customSessionDurationValue == void 0
        ? val.customSessionDurationValue
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.customSessionDurationValue,
          ),
    ['custom_session_duration_groups']:
      val.customSessionDurationGroups == void 0
        ? val.customSessionDurationGroups
        : serializeEnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField(
            val.customSessionDurationGroups,
          ),
    ['multi_factor_auth_type']:
      val.multiFactorAuthType == void 0
        ? val.multiFactorAuthType
        : serializeEnterpriseConfigurationItemStringV2025R0(
            val.multiFactorAuthType,
          ),
    ['enforced_mfa_frequency']:
      val.enforcedMfaFrequency == void 0
        ? val.enforcedMfaFrequency
        : serializeEnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField(
            val.enforcedMfaFrequency,
          ),
  };
}
export function deserializeEnterpriseConfigurationSecurityV2025R0(
  val: SerializedData,
): EnterpriseConfigurationSecurityV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseConfigurationSecurityV2025R0"',
    });
  }
  const isManagedUserSignupEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_managed_user_signup_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_managed_user_signup_enabled,
        );
  const isManagedUserSignupNotificationEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_managed_user_signup_notification_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_managed_user_signup_notification_enabled,
        );
  const isManagedUserSignupCorporateEmailEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_managed_user_signup_corporate_email_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_managed_user_signup_corporate_email_enabled,
        );
  const isNewUserNotificationDailyDigestEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_new_user_notification_daily_digest_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_new_user_notification_daily_digest_enabled,
        );
  const isManagedUserEmailChangeDisabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_managed_user_email_change_disabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_managed_user_email_change_disabled,
        );
  const isMultiFactorAuthRequired:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_multi_factor_auth_required == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_multi_factor_auth_required,
        );
  const isWeakPasswordPreventionEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_weak_password_prevention_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_weak_password_prevention_enabled,
        );
  const isPasswordLeakDetectionEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_password_leak_detection_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_password_leak_detection_enabled,
        );
  const lastPasswordResetAt:
    | undefined
    | EnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField =
    val.last_password_reset_at == void 0
      ? void 0
      : deserializeEnterpriseConfigurationSecurityV2025R0LastPasswordResetAtField(
          val.last_password_reset_at,
        );
  const isPasswordRequestNotificationEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_password_request_notification_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_password_request_notification_enabled,
        );
  const isPasswordChangeNotificationEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_password_change_notification_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_password_change_notification_enabled,
        );
  const isStrongPasswordForExtCollabEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_strong_password_for_ext_collab_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_strong_password_for_ext_collab_enabled,
        );
  const isManagedUserMigrationDisabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_managed_user_migration_disabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_managed_user_migration_disabled,
        );
  const joinLink: undefined | EnterpriseConfigurationItemStringV2025R0 =
    val.join_link == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(val.join_link);
  const joinUrl: undefined | EnterpriseConfigurationItemStringV2025R0 =
    val.join_url == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(val.join_url);
  const failedLoginAttemptsToTriggerAdminNotification:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.failed_login_attempts_to_trigger_admin_notification == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.failed_login_attempts_to_trigger_admin_notification,
        );
  const passwordMinLength:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.password_min_length == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.password_min_length,
        );
  const passwordMinUppercaseCharacters:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.password_min_uppercase_characters == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.password_min_uppercase_characters,
        );
  const passwordMinNumericCharacters:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.password_min_numeric_characters == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.password_min_numeric_characters,
        );
  const passwordMinSpecialCharacters:
    | undefined
    | EnterpriseConfigurationItemIntegerV2025R0 =
    val.password_min_special_characters == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemIntegerV2025R0(
          val.password_min_special_characters,
        );
  const passwordResetFrequency:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.password_reset_frequency == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.password_reset_frequency,
        );
  const previousPasswordReuseLimit:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.previous_password_reuse_limit == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.previous_password_reuse_limit,
        );
  const sessionDuration: undefined | EnterpriseConfigurationItemStringV2025R0 =
    val.session_duration == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.session_duration,
        );
  const externalCollabMultiFactorAuthSettings:
    | undefined
    | EnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField =
    val.external_collab_multi_factor_auth_settings == void 0
      ? void 0
      : deserializeEnterpriseConfigurationSecurityV2025R0ExternalCollabMultiFactorAuthSettingsField(
          val.external_collab_multi_factor_auth_settings,
        );
  const keysafe:
    | undefined
    | EnterpriseConfigurationSecurityV2025R0KeysafeField =
    val.keysafe == void 0
      ? void 0
      : deserializeEnterpriseConfigurationSecurityV2025R0KeysafeField(
          val.keysafe,
        );
  const isCustomSessionDurationEnabled:
    | undefined
    | EnterpriseConfigurationItemBooleanV2025R0 =
    val.is_custom_session_duration_enabled == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemBooleanV2025R0(
          val.is_custom_session_duration_enabled,
        );
  const customSessionDurationValue:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.custom_session_duration_value == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.custom_session_duration_value,
        );
  const customSessionDurationGroups:
    | undefined
    | EnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField =
    val.custom_session_duration_groups == void 0
      ? void 0
      : deserializeEnterpriseConfigurationSecurityV2025R0CustomSessionDurationGroupsField(
          val.custom_session_duration_groups,
        );
  const multiFactorAuthType:
    | undefined
    | EnterpriseConfigurationItemStringV2025R0 =
    val.multi_factor_auth_type == void 0
      ? void 0
      : deserializeEnterpriseConfigurationItemStringV2025R0(
          val.multi_factor_auth_type,
        );
  const enforcedMfaFrequency:
    | undefined
    | EnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField =
    val.enforced_mfa_frequency == void 0
      ? void 0
      : deserializeEnterpriseConfigurationSecurityV2025R0EnforcedMfaFrequencyField(
          val.enforced_mfa_frequency,
        );
  return {
    isManagedUserSignupEnabled: isManagedUserSignupEnabled,
    isManagedUserSignupNotificationEnabled:
      isManagedUserSignupNotificationEnabled,
    isManagedUserSignupCorporateEmailEnabled:
      isManagedUserSignupCorporateEmailEnabled,
    isNewUserNotificationDailyDigestEnabled:
      isNewUserNotificationDailyDigestEnabled,
    isManagedUserEmailChangeDisabled: isManagedUserEmailChangeDisabled,
    isMultiFactorAuthRequired: isMultiFactorAuthRequired,
    isWeakPasswordPreventionEnabled: isWeakPasswordPreventionEnabled,
    isPasswordLeakDetectionEnabled: isPasswordLeakDetectionEnabled,
    lastPasswordResetAt: lastPasswordResetAt,
    isPasswordRequestNotificationEnabled: isPasswordRequestNotificationEnabled,
    isPasswordChangeNotificationEnabled: isPasswordChangeNotificationEnabled,
    isStrongPasswordForExtCollabEnabled: isStrongPasswordForExtCollabEnabled,
    isManagedUserMigrationDisabled: isManagedUserMigrationDisabled,
    joinLink: joinLink,
    joinUrl: joinUrl,
    failedLoginAttemptsToTriggerAdminNotification:
      failedLoginAttemptsToTriggerAdminNotification,
    passwordMinLength: passwordMinLength,
    passwordMinUppercaseCharacters: passwordMinUppercaseCharacters,
    passwordMinNumericCharacters: passwordMinNumericCharacters,
    passwordMinSpecialCharacters: passwordMinSpecialCharacters,
    passwordResetFrequency: passwordResetFrequency,
    previousPasswordReuseLimit: previousPasswordReuseLimit,
    sessionDuration: sessionDuration,
    externalCollabMultiFactorAuthSettings:
      externalCollabMultiFactorAuthSettings,
    keysafe: keysafe,
    isCustomSessionDurationEnabled: isCustomSessionDurationEnabled,
    customSessionDurationValue: customSessionDurationValue,
    customSessionDurationGroups: customSessionDurationGroups,
    multiFactorAuthType: multiFactorAuthType,
    enforcedMfaFrequency: enforcedMfaFrequency,
  } satisfies EnterpriseConfigurationSecurityV2025R0;
}

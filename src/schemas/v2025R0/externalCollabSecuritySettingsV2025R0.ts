import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ExternalCollabSecuritySettingsV2025R0 {
  /**
   * List of domains that are not allowed for external collaboration. Applies if state is `denylist`. */
  readonly denylistDomains?: readonly string[];
  /**
   * List of email addresses that are not allowed for external collaboration. Applies if state is `denylist`. */
  readonly denylistEmails?: readonly string[];
  /**
   * List of domains that are allowed for external collaboration. Applies if state is `allowlist`. */
  readonly allowlistDomains?: readonly string[];
  /**
   * List of email addresses that are allowed for external collaboration. Applies if state is `allowlist`. */
  readonly allowlistEmails?: readonly string[];
  /**
   * The state of the external collaboration security settings. Possible values include `enabled`, `disabled`, `allowlist`, and `denylist`. */
  readonly state?: string | null;
  /**
   * The status of the scheduling to apply external collaboration security settings. Possible values include `in_progress`, `scheduled`, `completed`, `failed`, and `scheduled_immediate`. */
  readonly scheduledStatus?: string | null;
  /**
   * Scheduled at. */
  readonly scheduledAt?: DateTime | null;
  /**
   * Factor type for the external collaborators authentication. Possible values include `totp`, `any`, or `unknown`. */
  readonly factorTypeSettings?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeExternalCollabSecuritySettingsV2025R0(
  val: ExternalCollabSecuritySettingsV2025R0,
): SerializedData {
  return {
    ['denylist_domains']:
      val.denylistDomains == void 0
        ? val.denylistDomains
        : (val.denylistDomains.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['denylist_emails']:
      val.denylistEmails == void 0
        ? val.denylistEmails
        : (val.denylistEmails.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['allowlist_domains']:
      val.allowlistDomains == void 0
        ? val.allowlistDomains
        : (val.allowlistDomains.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['allowlist_emails']:
      val.allowlistEmails == void 0
        ? val.allowlistEmails
        : (val.allowlistEmails.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['state']: val.state,
    ['scheduled_status']: val.scheduledStatus,
    ['scheduled_at']:
      val.scheduledAt == void 0
        ? val.scheduledAt
        : serializeDateTime(val.scheduledAt),
    ['factor_type_settings']: val.factorTypeSettings,
  };
}
export function deserializeExternalCollabSecuritySettingsV2025R0(
  val: SerializedData,
): ExternalCollabSecuritySettingsV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ExternalCollabSecuritySettingsV2025R0"',
    });
  }
  if (!(val.denylist_domains == void 0) && !sdIsList(val.denylist_domains)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "denylist_domains" of type "ExternalCollabSecuritySettingsV2025R0"',
    });
  }
  const denylistDomains: undefined | readonly string[] =
    val.denylist_domains == void 0
      ? void 0
      : sdIsList(val.denylist_domains)
        ? (val.denylist_domains.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "ExternalCollabSecuritySettingsV2025R0"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (!(val.denylist_emails == void 0) && !sdIsList(val.denylist_emails)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "denylist_emails" of type "ExternalCollabSecuritySettingsV2025R0"',
    });
  }
  const denylistEmails: undefined | readonly string[] =
    val.denylist_emails == void 0
      ? void 0
      : sdIsList(val.denylist_emails)
        ? (val.denylist_emails.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "ExternalCollabSecuritySettingsV2025R0"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (!(val.allowlist_domains == void 0) && !sdIsList(val.allowlist_domains)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowlist_domains" of type "ExternalCollabSecuritySettingsV2025R0"',
    });
  }
  const allowlistDomains: undefined | readonly string[] =
    val.allowlist_domains == void 0
      ? void 0
      : sdIsList(val.allowlist_domains)
        ? (val.allowlist_domains.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "ExternalCollabSecuritySettingsV2025R0"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (!(val.allowlist_emails == void 0) && !sdIsList(val.allowlist_emails)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "allowlist_emails" of type "ExternalCollabSecuritySettingsV2025R0"',
    });
  }
  const allowlistEmails: undefined | readonly string[] =
    val.allowlist_emails == void 0
      ? void 0
      : sdIsList(val.allowlist_emails)
        ? (val.allowlist_emails.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "ExternalCollabSecuritySettingsV2025R0"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  if (!(val.state == void 0) && !sdIsString(val.state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "state" of type "ExternalCollabSecuritySettingsV2025R0"',
    });
  }
  const state: undefined | string = val.state == void 0 ? void 0 : val.state;
  if (!(val.scheduled_status == void 0) && !sdIsString(val.scheduled_status)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "scheduled_status" of type "ExternalCollabSecuritySettingsV2025R0"',
    });
  }
  const scheduledStatus: undefined | string =
    val.scheduled_status == void 0 ? void 0 : val.scheduled_status;
  if (!(val.scheduled_at == void 0) && !sdIsString(val.scheduled_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "scheduled_at" of type "ExternalCollabSecuritySettingsV2025R0"',
    });
  }
  const scheduledAt: undefined | DateTime =
    val.scheduled_at == void 0 ? void 0 : deserializeDateTime(val.scheduled_at);
  if (
    !(val.factor_type_settings == void 0) &&
    !sdIsString(val.factor_type_settings)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "factor_type_settings" of type "ExternalCollabSecuritySettingsV2025R0"',
    });
  }
  const factorTypeSettings: undefined | string =
    val.factor_type_settings == void 0 ? void 0 : val.factor_type_settings;
  return {
    denylistDomains: denylistDomains,
    denylistEmails: denylistEmails,
    allowlistDomains: allowlistDomains,
    allowlistEmails: allowlistEmails,
    state: state,
    scheduledStatus: scheduledStatus,
    scheduledAt: scheduledAt,
    factorTypeSettings: factorTypeSettings,
  } satisfies ExternalCollabSecuritySettingsV2025R0;
}

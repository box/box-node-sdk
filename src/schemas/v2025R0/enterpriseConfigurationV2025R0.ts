import { serializeEnterpriseConfigurationSecurityV2025R0 } from './enterpriseConfigurationSecurityV2025R0';
import { deserializeEnterpriseConfigurationSecurityV2025R0 } from './enterpriseConfigurationSecurityV2025R0';
import { serializeEnterpriseConfigurationContentAndSharingV2025R0 } from './enterpriseConfigurationContentAndSharingV2025R0';
import { deserializeEnterpriseConfigurationContentAndSharingV2025R0 } from './enterpriseConfigurationContentAndSharingV2025R0';
import { serializeEnterpriseConfigurationUserSettingsV2025R0 } from './enterpriseConfigurationUserSettingsV2025R0';
import { deserializeEnterpriseConfigurationUserSettingsV2025R0 } from './enterpriseConfigurationUserSettingsV2025R0';
import { serializeEnterpriseConfigurationShieldV2025R0 } from './enterpriseConfigurationShieldV2025R0';
import { deserializeEnterpriseConfigurationShieldV2025R0 } from './enterpriseConfigurationShieldV2025R0';
import { EnterpriseConfigurationSecurityV2025R0 } from './enterpriseConfigurationSecurityV2025R0';
import { EnterpriseConfigurationContentAndSharingV2025R0 } from './enterpriseConfigurationContentAndSharingV2025R0';
import { EnterpriseConfigurationUserSettingsV2025R0 } from './enterpriseConfigurationUserSettingsV2025R0';
import { EnterpriseConfigurationShieldV2025R0 } from './enterpriseConfigurationShieldV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type EnterpriseConfigurationV2025R0TypeField =
  'enterprise_configuration';
export interface EnterpriseConfigurationV2025R0 {
  /**
   * The identifier of the enterprise configuration which is the ID of the enterprise. */
  readonly id?: string;
  /**
   * The value will always be `enterprise_configuration`. */
  readonly type?: EnterpriseConfigurationV2025R0TypeField;
  readonly security?: EnterpriseConfigurationSecurityV2025R0;
  readonly contentAndSharing?: EnterpriseConfigurationContentAndSharingV2025R0;
  readonly userSettings?: EnterpriseConfigurationUserSettingsV2025R0;
  readonly shield?: EnterpriseConfigurationShieldV2025R0;
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseConfigurationV2025R0TypeField(
  val: EnterpriseConfigurationV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeEnterpriseConfigurationV2025R0TypeField(
  val: SerializedData,
): EnterpriseConfigurationV2025R0TypeField {
  if (val == 'enterprise_configuration') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize EnterpriseConfigurationV2025R0TypeField",
  });
}
export function serializeEnterpriseConfigurationV2025R0(
  val: EnterpriseConfigurationV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeEnterpriseConfigurationV2025R0TypeField(val.type),
    ['security']:
      val.security == void 0
        ? val.security
        : serializeEnterpriseConfigurationSecurityV2025R0(val.security),
    ['content_and_sharing']:
      val.contentAndSharing == void 0
        ? val.contentAndSharing
        : serializeEnterpriseConfigurationContentAndSharingV2025R0(
            val.contentAndSharing,
          ),
    ['user_settings']:
      val.userSettings == void 0
        ? val.userSettings
        : serializeEnterpriseConfigurationUserSettingsV2025R0(val.userSettings),
    ['shield']:
      val.shield == void 0
        ? val.shield
        : serializeEnterpriseConfigurationShieldV2025R0(val.shield),
  };
}
export function deserializeEnterpriseConfigurationV2025R0(
  val: SerializedData,
): EnterpriseConfigurationV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseConfigurationV2025R0"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "EnterpriseConfigurationV2025R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | EnterpriseConfigurationV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeEnterpriseConfigurationV2025R0TypeField(val.type);
  const security: EnterpriseConfigurationSecurityV2025R0 | undefined =
    val.security == void 0
      ? void 0
      : deserializeEnterpriseConfigurationSecurityV2025R0(val.security);
  const contentAndSharing:
    | EnterpriseConfigurationContentAndSharingV2025R0
    | undefined =
    val.content_and_sharing == void 0
      ? void 0
      : deserializeEnterpriseConfigurationContentAndSharingV2025R0(
          val.content_and_sharing,
        );
  const userSettings: EnterpriseConfigurationUserSettingsV2025R0 | undefined =
    val.user_settings == void 0
      ? void 0
      : deserializeEnterpriseConfigurationUserSettingsV2025R0(
          val.user_settings,
        );
  const shield: EnterpriseConfigurationShieldV2025R0 | undefined =
    val.shield == void 0
      ? void 0
      : deserializeEnterpriseConfigurationShieldV2025R0(val.shield);
  return {
    id: id,
    type: type,
    security: security,
    contentAndSharing: contentAndSharing,
    userSettings: userSettings,
    shield: shield,
  } satisfies EnterpriseConfigurationV2025R0;
}

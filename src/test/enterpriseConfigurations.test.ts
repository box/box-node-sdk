import { serializeEnterpriseConfigurationV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationV2025R0';
import { deserializeEnterpriseConfigurationV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationV2025R0';
import { serializeEnterpriseConfigurationUserSettingsV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationUserSettingsV2025R0';
import { deserializeEnterpriseConfigurationUserSettingsV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationUserSettingsV2025R0';
import { serializeEnterpriseConfigurationContentAndSharingV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationContentAndSharingV2025R0';
import { deserializeEnterpriseConfigurationContentAndSharingV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationContentAndSharingV2025R0';
import { serializeEnterpriseConfigurationSecurityV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationSecurityV2025R0';
import { deserializeEnterpriseConfigurationSecurityV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationSecurityV2025R0';
import { serializeEnterpriseConfigurationShieldV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationShieldV2025R0';
import { deserializeEnterpriseConfigurationShieldV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationShieldV2025R0';
import { BoxClient } from '@/client';
import { EnterpriseConfigurationV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationV2025R0';
import { GetEnterpriseConfigurationByIdV2025R0QueryParams } from '@/managers/enterpriseConfigurations';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { EnterpriseConfigurationUserSettingsV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationUserSettingsV2025R0';
import { EnterpriseConfigurationContentAndSharingV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationContentAndSharingV2025R0';
import { EnterpriseConfigurationSecurityV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationSecurityV2025R0';
import { EnterpriseConfigurationShieldV2025R0 } from '@/schemas/v2025R0/enterpriseConfigurationShieldV2025R0';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const adminClient: BoxClient = getDefaultClientWithUserSubject(
  getEnvVar('USER_ID'),
);
test('testGetEnterpriseConfigurationById', async function testGetEnterpriseConfigurationById(): Promise<any> {
  const enterpriseId: string = getEnvVar('ENTERPRISE_ID');
  const enterpriseConfiguration: EnterpriseConfigurationV2025R0 =
    await adminClient.enterpriseConfigurations.getEnterpriseConfigurationByIdV2025R0(
      enterpriseId,
      {
        categories: [
          'user_settings',
          'content_and_sharing',
          'security',
          'shield',
        ],
      } satisfies GetEnterpriseConfigurationByIdV2025R0QueryParams,
    );
  if (
    !(
      (toString(enterpriseConfiguration.type) as string) ==
      'enterprise_configuration'
    )
  ) {
    throw new Error('Assertion failed');
  }
  const userSettings: EnterpriseConfigurationUserSettingsV2025R0 =
    enterpriseConfiguration.userSettings!;
  if (!(userSettings.isEnterpriseSsoRequired!.value == false)) {
    throw new Error('Assertion failed');
  }
  if (!(userSettings.newUserDefaultLanguage!.value == 'English (US)')) {
    throw new Error('Assertion failed');
  }
  if (!(userSettings.newUserDefaultStorageLimit!.value == -1)) {
    throw new Error('Assertion failed');
  }
  const contentAndSharing: EnterpriseConfigurationContentAndSharingV2025R0 =
    enterpriseConfiguration.contentAndSharing!;
  if (
    !(
      contentAndSharing.collaborationPermissions!.value!.isEditorRoleEnabled ==
      true
    )
  ) {
    throw new Error('Assertion failed');
  }
  const security: EnterpriseConfigurationSecurityV2025R0 =
    enterpriseConfiguration.security!;
  if (!(security.isManagedUserSignupEnabled!.value! == false)) {
    throw new Error('Assertion failed');
  }
  const shield: EnterpriseConfigurationShieldV2025R0 =
    enterpriseConfiguration.shield!;
  if (!(shield.shieldRules!.length == 0)) {
    throw new Error('Assertion failed');
  }
});
export {};

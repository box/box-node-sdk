import { serializeShieldListV2025R0 } from '../schemas/v2025R0/shieldListV2025R0.generated.js';
import { deserializeShieldListV2025R0 } from '../schemas/v2025R0/shieldListV2025R0.generated.js';
import { serializeShieldListsCreateV2025R0 } from '../schemas/v2025R0/shieldListsCreateV2025R0.generated.js';
import { deserializeShieldListsCreateV2025R0 } from '../schemas/v2025R0/shieldListsCreateV2025R0.generated.js';
import { serializeShieldListContentCountryV2025R0TypeField } from '../schemas/v2025R0/shieldListContentCountryV2025R0.generated.js';
import { deserializeShieldListContentCountryV2025R0TypeField } from '../schemas/v2025R0/shieldListContentCountryV2025R0.generated.js';
import { serializeShieldListContentDomainV2025R0TypeField } from '../schemas/v2025R0/shieldListContentDomainV2025R0.generated.js';
import { deserializeShieldListContentDomainV2025R0TypeField } from '../schemas/v2025R0/shieldListContentDomainV2025R0.generated.js';
import { serializeShieldListContentEmailV2025R0TypeField } from '../schemas/v2025R0/shieldListContentEmailV2025R0.generated.js';
import { deserializeShieldListContentEmailV2025R0TypeField } from '../schemas/v2025R0/shieldListContentEmailV2025R0.generated.js';
import { serializeShieldListContentIpV2025R0TypeField } from '../schemas/v2025R0/shieldListContentIpV2025R0.generated.js';
import { deserializeShieldListContentIpV2025R0TypeField } from '../schemas/v2025R0/shieldListContentIpV2025R0.generated.js';
import { serializeShieldListsV2025R0 } from '../schemas/v2025R0/shieldListsV2025R0.generated.js';
import { deserializeShieldListsV2025R0 } from '../schemas/v2025R0/shieldListsV2025R0.generated.js';
import { serializeShieldListsUpdateV2025R0 } from '../schemas/v2025R0/shieldListsUpdateV2025R0.generated.js';
import { deserializeShieldListsUpdateV2025R0 } from '../schemas/v2025R0/shieldListsUpdateV2025R0.generated.js';
import { serializeShieldListContentCountryV2025R0 } from '../schemas/v2025R0/shieldListContentCountryV2025R0.generated.js';
import { deserializeShieldListContentCountryV2025R0 } from '../schemas/v2025R0/shieldListContentCountryV2025R0.generated.js';
import { serializeShieldListContentDomainV2025R0 } from '../schemas/v2025R0/shieldListContentDomainV2025R0.generated.js';
import { deserializeShieldListContentDomainV2025R0 } from '../schemas/v2025R0/shieldListContentDomainV2025R0.generated.js';
import { serializeShieldListContentEmailV2025R0 } from '../schemas/v2025R0/shieldListContentEmailV2025R0.generated.js';
import { deserializeShieldListContentEmailV2025R0 } from '../schemas/v2025R0/shieldListContentEmailV2025R0.generated.js';
import { serializeShieldListContentIpV2025R0 } from '../schemas/v2025R0/shieldListContentIpV2025R0.generated.js';
import { deserializeShieldListContentIpV2025R0 } from '../schemas/v2025R0/shieldListContentIpV2025R0.generated.js';
import { BoxClient } from '../client.generated.js';
import { ShieldListV2025R0 } from '../schemas/v2025R0/shieldListV2025R0.generated.js';
import { ShieldListsCreateV2025R0 } from '../schemas/v2025R0/shieldListsCreateV2025R0.generated.js';
import { ShieldListContentCountryV2025R0TypeField } from '../schemas/v2025R0/shieldListContentCountryV2025R0.generated.js';
import { ShieldListContentDomainV2025R0TypeField } from '../schemas/v2025R0/shieldListContentDomainV2025R0.generated.js';
import { ShieldListContentEmailV2025R0TypeField } from '../schemas/v2025R0/shieldListContentEmailV2025R0.generated.js';
import { ShieldListContentIpV2025R0TypeField } from '../schemas/v2025R0/shieldListContentIpV2025R0.generated.js';
import { ShieldListsV2025R0 } from '../schemas/v2025R0/shieldListsV2025R0.generated.js';
import { ShieldListsUpdateV2025R0 } from '../schemas/v2025R0/shieldListsUpdateV2025R0.generated.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { uploadNewFile } from './commons.generated.js';
import { createNewFolder } from './commons.generated.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { ShieldListContentCountryV2025R0 } from '../schemas/v2025R0/shieldListContentCountryV2025R0.generated.js';
import { ShieldListContentDomainV2025R0 } from '../schemas/v2025R0/shieldListContentDomainV2025R0.generated.js';
import { ShieldListContentEmailV2025R0 } from '../schemas/v2025R0/shieldListContentEmailV2025R0.generated.js';
import { ShieldListContentIpV2025R0 } from '../schemas/v2025R0/shieldListContentIpV2025R0.generated.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const userId: string = getEnvVar('USER_ID');
export const client: BoxClient = getDefaultClientWithUserSubject(userId);
test('testCreateGetUpdateDeleteShieldList', async function testCreateGetUpdateDeleteShieldList(): Promise<any> {
  const shieldListCountryName: string = ''.concat(
    getUuid(),
    'shieldListCountry',
  ) as string;
  const shieldListCountry: ShieldListV2025R0 =
    await client.shieldLists.createShieldListV2025R0({
      name: shieldListCountryName,
      description: 'A list of things that are shielded',
      content: new ShieldListContentCountryV2025R0({
        type: 'country' as ShieldListContentCountryV2025R0TypeField,
        countryCodes: ['US', 'PL'],
      }),
    } satisfies ShieldListsCreateV2025R0);
  const shieldListContentDomainName: string = ''.concat(
    getUuid(),
    'shieldListContentDomain',
  ) as string;
  const shieldListContentDomain: ShieldListV2025R0 =
    await client.shieldLists.createShieldListV2025R0({
      name: shieldListContentDomainName,
      description: 'A list of things that are shielded',
      content: new ShieldListContentDomainV2025R0({
        type: 'domain' as ShieldListContentDomainV2025R0TypeField,
        domains: ['box.com', 'example.com'],
      }),
    } satisfies ShieldListsCreateV2025R0);
  const shieldListContentEmailName: string = ''.concat(
    getUuid(),
    'shieldListContentEmail',
  ) as string;
  const shieldListContentEmail: ShieldListV2025R0 =
    await client.shieldLists.createShieldListV2025R0({
      name: shieldListContentEmailName,
      description: 'A list of things that are shielded',
      content: new ShieldListContentEmailV2025R0({
        type: 'email' as ShieldListContentEmailV2025R0TypeField,
        emailAddresses: ['test@box.com', 'test@example.com'],
      }),
    } satisfies ShieldListsCreateV2025R0);
  const shieldListContentIpName: string = ''.concat(
    getUuid(),
    'shieldListContentIp',
  ) as string;
  const shieldListContentIp: ShieldListV2025R0 =
    await client.shieldLists.createShieldListV2025R0({
      name: shieldListContentIpName,
      description: 'A list of things that are shielded',
      content: new ShieldListContentIpV2025R0({
        type: 'ip' as ShieldListContentIpV2025R0TypeField,
        ipAddresses: ['127.0.0.1', '80.12.12.12/24'],
      }),
    } satisfies ShieldListsCreateV2025R0);
  const shieldLists: ShieldListsV2025R0 =
    await client.shieldLists.getShieldListsV2025R0();
  if (!(shieldLists.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const getShieldListCountry: ShieldListV2025R0 =
    await client.shieldLists.getShieldListByIdV2025R0(shieldListCountry.id);
  if (!(getShieldListCountry.name == shieldListCountryName)) {
    throw new Error('Assertion failed');
  }
  if (
    !(getShieldListCountry.description == 'A list of things that are shielded')
  ) {
    throw new Error('Assertion failed');
  }
  await client.shieldLists.updateShieldListByIdV2025R0(shieldListCountry.id, {
    name: shieldListCountryName,
    description: 'Updated description',
    content: new ShieldListContentCountryV2025R0({
      type: 'country' as ShieldListContentCountryV2025R0TypeField,
      countryCodes: ['US'],
    }),
  } satisfies ShieldListsUpdateV2025R0);
  const getShieldListCountryUpdated: ShieldListV2025R0 =
    await client.shieldLists.getShieldListByIdV2025R0(shieldListCountry.id);
  if (!(getShieldListCountryUpdated.description == 'Updated description')) {
    throw new Error('Assertion failed');
  }
  await client.shieldLists.deleteShieldListByIdV2025R0(shieldListCountry.id);
  await client.shieldLists.deleteShieldListByIdV2025R0(
    shieldListContentDomain.id,
  );
  await client.shieldLists.deleteShieldListByIdV2025R0(
    shieldListContentEmail.id,
  );
  await client.shieldLists.deleteShieldListByIdV2025R0(shieldListContentIp.id);
});
export {};

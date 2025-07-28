import { serializeHubV2025R0 } from '../schemas/v2025R0/hubV2025R0.generated.js';
import { deserializeHubV2025R0 } from '../schemas/v2025R0/hubV2025R0.generated.js';
import { serializeHubCreateRequestV2025R0 } from '../schemas/v2025R0/hubCreateRequestV2025R0.generated.js';
import { deserializeHubCreateRequestV2025R0 } from '../schemas/v2025R0/hubCreateRequestV2025R0.generated.js';
import { serializeHubsV2025R0 } from '../schemas/v2025R0/hubsV2025R0.generated.js';
import { deserializeHubsV2025R0 } from '../schemas/v2025R0/hubsV2025R0.generated.js';
import { serializeGetHubsV2025R0QueryParamsDirectionField } from '../managers/hubs.generated.js';
import { deserializeGetHubsV2025R0QueryParamsDirectionField } from '../managers/hubs.generated.js';
import { serializeGetEnterpriseHubsV2025R0QueryParamsDirectionField } from '../managers/hubs.generated.js';
import { deserializeGetEnterpriseHubsV2025R0QueryParamsDirectionField } from '../managers/hubs.generated.js';
import { serializeHubUpdateRequestV2025R0 } from '../schemas/v2025R0/hubUpdateRequestV2025R0.generated.js';
import { deserializeHubUpdateRequestV2025R0 } from '../schemas/v2025R0/hubUpdateRequestV2025R0.generated.js';
import { serializeHubCopyRequestV2025R0 } from '../schemas/v2025R0/hubCopyRequestV2025R0.generated.js';
import { deserializeHubCopyRequestV2025R0 } from '../schemas/v2025R0/hubCopyRequestV2025R0.generated.js';
import { BoxClient } from '../client.generated.js';
import { HubV2025R0 } from '../schemas/v2025R0/hubV2025R0.generated.js';
import { HubCreateRequestV2025R0 } from '../schemas/v2025R0/hubCreateRequestV2025R0.generated.js';
import { HubsV2025R0 } from '../schemas/v2025R0/hubsV2025R0.generated.js';
import { GetHubsV2025R0QueryParams } from '../managers/hubs.generated.js';
import { GetHubsV2025R0QueryParamsDirectionField } from '../managers/hubs.generated.js';
import { GetEnterpriseHubsV2025R0QueryParams } from '../managers/hubs.generated.js';
import { GetEnterpriseHubsV2025R0QueryParamsDirectionField } from '../managers/hubs.generated.js';
import { HubUpdateRequestV2025R0 } from '../schemas/v2025R0/hubUpdateRequestV2025R0.generated.js';
import { HubCopyRequestV2025R0 } from '../schemas/v2025R0/hubCopyRequestV2025R0.generated.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClientWithUserSubject(
  getEnvVar('USER_ID'),
);
test('testCreateUpdateGetAndDeleteHubs', async function testCreateUpdateGetAndDeleteHubs(): Promise<any> {
  const hubTitle: string = getUuid();
  const hubDescription: string = 'new Hub description';
  const createdHub: HubV2025R0 = await client.hubs.createHubV2025R0({
    title: hubTitle,
    description: hubDescription,
  } satisfies HubCreateRequestV2025R0);
  if (!(createdHub.title! == hubTitle)) {
    throw new Error('Assertion failed');
  }
  if (!(createdHub.description! == hubDescription)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(createdHub.type) as string) == 'hubs')) {
    throw new Error('Assertion failed');
  }
  const hubId: string = createdHub.id;
  const usersHubs: HubsV2025R0 = await client.hubs.getHubsV2025R0({
    scope: 'all',
    sort: 'name',
    direction: 'ASC' as GetHubsV2025R0QueryParamsDirectionField,
  } satisfies GetHubsV2025R0QueryParams);
  if (!(usersHubs.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const enterpriseHubs: HubsV2025R0 =
    await client.hubs.getEnterpriseHubsV2025R0({
      sort: 'name',
      direction: 'ASC' as GetEnterpriseHubsV2025R0QueryParamsDirectionField,
    } satisfies GetEnterpriseHubsV2025R0QueryParams);
  if (!(enterpriseHubs.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const hubById: HubV2025R0 = await client.hubs.getHubByIdV2025R0(hubId);
  if (!(hubById.id == hubId)) {
    throw new Error('Assertion failed');
  }
  if (!(hubById.title! == hubTitle)) {
    throw new Error('Assertion failed');
  }
  if (!(hubById.description! == hubDescription)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(hubById.type) as string) == 'hubs')) {
    throw new Error('Assertion failed');
  }
  const newHubTitle: string = getUuid();
  const newHubDescription: string = 'updated Hub description';
  const updatedHub: HubV2025R0 = await client.hubs.updateHubByIdV2025R0(hubId, {
    title: newHubTitle,
    description: newHubDescription,
  } satisfies HubUpdateRequestV2025R0);
  if (!(updatedHub.title! == newHubTitle)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedHub.description! == newHubDescription)) {
    throw new Error('Assertion failed');
  }
  await client.hubs.deleteHubByIdV2025R0(hubId);
  await expect(async () => {
    await client.hubs.deleteHubByIdV2025R0(hubId);
  }).rejects.toThrow();
});
test('copyHub', async function copyHub(): Promise<any> {
  const hubTitle: string = getUuid();
  const hubDescription: string = 'new Hub description';
  const createdHub: HubV2025R0 = await client.hubs.createHubV2025R0({
    title: hubTitle,
    description: hubDescription,
  } satisfies HubCreateRequestV2025R0);
  const copiedHubTitle: string = getUuid();
  const copiedHubDescription: string = 'copied Hub description';
  const copiedHub: HubV2025R0 = await client.hubs.copyHubV2025R0(
    createdHub.id,
    {
      title: copiedHubTitle,
      description: copiedHubDescription,
    } satisfies HubCopyRequestV2025R0,
  );
  if (!!(copiedHub.id == createdHub.id)) {
    throw new Error('Assertion failed');
  }
  if (!(copiedHub.title! == copiedHubTitle)) {
    throw new Error('Assertion failed');
  }
  if (!(copiedHub.description! == copiedHubDescription)) {
    throw new Error('Assertion failed');
  }
  await client.hubs.deleteHubByIdV2025R0(createdHub.id);
  await client.hubs.deleteHubByIdV2025R0(copiedHub.id);
});
export {};

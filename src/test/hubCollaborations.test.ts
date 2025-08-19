import { serializeHubsV2025R0 } from '../schemas/v2025R0/hubsV2025R0.js';
import { deserializeHubsV2025R0 } from '../schemas/v2025R0/hubsV2025R0.js';
import { serializeGetHubsV2025R0QueryParamsDirectionField } from '../managers/hubs.js';
import { deserializeGetHubsV2025R0QueryParamsDirectionField } from '../managers/hubs.js';
import { serializeHubV2025R0 } from '../schemas/v2025R0/hubV2025R0.js';
import { deserializeHubV2025R0 } from '../schemas/v2025R0/hubV2025R0.js';
import { serializeUserFull } from '../schemas/userFull.js';
import { deserializeUserFull } from '../schemas/userFull.js';
import { serializeCreateUserRequestBody } from '../managers/users.js';
import { deserializeCreateUserRequestBody } from '../managers/users.js';
import { serializeHubCollaborationV2025R0 } from '../schemas/v2025R0/hubCollaborationV2025R0.js';
import { deserializeHubCollaborationV2025R0 } from '../schemas/v2025R0/hubCollaborationV2025R0.js';
import { serializeHubCollaborationCreateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.js';
import { deserializeHubCollaborationCreateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.js';
import { serializeHubCollaborationCreateRequestV2025R0HubField } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.js';
import { deserializeHubCollaborationCreateRequestV2025R0HubField } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.js';
import { serializeHubCollaborationCreateRequestV2025R0AccessibleByField } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.js';
import { deserializeHubCollaborationCreateRequestV2025R0AccessibleByField } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.js';
import { serializeHubCollaborationUpdateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationUpdateRequestV2025R0.js';
import { deserializeHubCollaborationUpdateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationUpdateRequestV2025R0.js';
import { serializeHubCollaborationsV2025R0 } from '../schemas/v2025R0/hubCollaborationsV2025R0.js';
import { deserializeHubCollaborationsV2025R0 } from '../schemas/v2025R0/hubCollaborationsV2025R0.js';
import { BoxClient } from '../client.js';
import { HubsV2025R0 } from '../schemas/v2025R0/hubsV2025R0.js';
import { GetHubsV2025R0QueryParams } from '../managers/hubs.js';
import { GetHubsV2025R0QueryParamsDirectionField } from '../managers/hubs.js';
import { HubV2025R0 } from '../schemas/v2025R0/hubV2025R0.js';
import { UserFull } from '../schemas/userFull.js';
import { CreateUserRequestBody } from '../managers/users.js';
import { HubCollaborationV2025R0 } from '../schemas/v2025R0/hubCollaborationV2025R0.js';
import { HubCollaborationCreateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.js';
import { HubCollaborationCreateRequestV2025R0HubField } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.js';
import { HubCollaborationCreateRequestV2025R0AccessibleByField } from '../schemas/v2025R0/hubCollaborationCreateRequestV2025R0.js';
import { HubCollaborationUpdateRequestV2025R0 } from '../schemas/v2025R0/hubCollaborationUpdateRequestV2025R0.js';
import { HubCollaborationsV2025R0 } from '../schemas/v2025R0/hubCollaborationsV2025R0.js';
import { GetHubCollaborationsV2025R0QueryParams } from '../managers/hubCollaborations.js';
import { getDefaultClientWithUserSubject } from './commons.js';
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
test('testCRUDHubCollaboration', async function testCRUDHubCollaboration(): Promise<any> {
  const hubs: HubsV2025R0 = await client.hubs.getHubsV2025R0({
    scope: 'all',
    sort: 'name',
    direction: 'ASC' as GetHubsV2025R0QueryParamsDirectionField,
  } satisfies GetHubsV2025R0QueryParams);
  const hub: HubV2025R0 = hubs.entries![0];
  const userName: string = getUuid();
  const userLogin: string = ''.concat(getUuid(), '@gmail.com') as string;
  const user: UserFull = await client.users.createUser({
    name: userName,
    login: userLogin,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  const createdCollaboration: HubCollaborationV2025R0 =
    await client.hubCollaborations.createHubCollaborationV2025R0({
      hub: new HubCollaborationCreateRequestV2025R0HubField({ id: hub.id }),
      accessibleBy: {
        type: 'user',
        id: user.id,
      } satisfies HubCollaborationCreateRequestV2025R0AccessibleByField,
      role: 'viewer',
    } satisfies HubCollaborationCreateRequestV2025R0);
  if (!!(createdCollaboration.id == '')) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(createdCollaboration.type) as string) == 'hub_collaboration')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(createdCollaboration.hub!.id == hub.id)) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(createdCollaboration.accessibleBy!.type) as string) == 'user')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(createdCollaboration.accessibleBy!.id == user.id)) {
    throw new Error('Assertion failed');
  }
  if (!(createdCollaboration.role == 'viewer')) {
    throw new Error('Assertion failed');
  }
  const updatedCollaboration: HubCollaborationV2025R0 =
    await client.hubCollaborations.updateHubCollaborationByIdV2025R0(
      createdCollaboration.id,
      { role: 'editor' } satisfies HubCollaborationUpdateRequestV2025R0,
    );
  if (!!(updatedCollaboration.id == '')) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(updatedCollaboration.type) as string) == 'hub_collaboration')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(updatedCollaboration.hub!.id == hub.id)) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(updatedCollaboration.accessibleBy!.type) as string) == 'user')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(updatedCollaboration.accessibleBy!.id == user.id)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedCollaboration.role == 'editor')) {
    throw new Error('Assertion failed');
  }
  const collaborations: HubCollaborationsV2025R0 =
    await client.hubCollaborations.getHubCollaborationsV2025R0({
      hubId: hub.id,
    } satisfies GetHubCollaborationsV2025R0QueryParams);
  if (!(collaborations.entries!.length >= 1)) {
    throw new Error('Assertion failed');
  }
  const retrievedCollaboration: HubCollaborationV2025R0 =
    await client.hubCollaborations.getHubCollaborationByIdV2025R0(
      createdCollaboration.id,
    );
  if (!(retrievedCollaboration.id == createdCollaboration.id)) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(retrievedCollaboration.type) as string) == 'hub_collaboration')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(retrievedCollaboration.hub!.id == hub.id)) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(retrievedCollaboration.accessibleBy!.type) as string) == 'user')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(retrievedCollaboration.accessibleBy!.id == user.id)) {
    throw new Error('Assertion failed');
  }
  if (!(retrievedCollaboration.role == 'editor')) {
    throw new Error('Assertion failed');
  }
  await client.hubCollaborations.deleteHubCollaborationByIdV2025R0(
    createdCollaboration.id,
  );
  await client.users.deleteUserById(user.id);
});
export {};

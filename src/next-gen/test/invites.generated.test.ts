import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeInvite } from '../schemas/invite.generated.js';
import { deserializeInvite } from '../schemas/invite.generated.js';
import { serializeCreateInviteRequestBody } from '../managers/invites.generated.js';
import { deserializeCreateInviteRequestBody } from '../managers/invites.generated.js';
import { serializeCreateInviteRequestBodyEnterpriseField } from '../managers/invites.generated.js';
import { deserializeCreateInviteRequestBodyEnterpriseField } from '../managers/invites.generated.js';
import { serializeCreateInviteRequestBodyActionableByField } from '../managers/invites.generated.js';
import { deserializeCreateInviteRequestBodyActionableByField } from '../managers/invites.generated.js';
import { BoxClient } from '../client.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { GetUserMeQueryParams } from '../managers/users.generated.js';
import { Invite } from '../schemas/invite.generated.js';
import { CreateInviteRequestBody } from '../managers/invites.generated.js';
import { CreateInviteRequestBodyEnterpriseField } from '../managers/invites.generated.js';
import { CreateInviteRequestBodyActionableByField } from '../managers/invites.generated.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
test('testInvites', async function testInvites(): Promise<any> {
  const userId: string = getEnvVar('USER_ID');
  const client: BoxClient = getDefaultClientWithUserSubject(userId);
  const currentUser: UserFull = await client.users.getUserMe({
    fields: ['enterprise' as string],
  } satisfies GetUserMeQueryParams);
  const email: string = getEnvVar('BOX_EXTERNAL_USER_EMAIL');
  const invitation: Invite = await client.invites.createInvite({
    enterprise: {
      id: currentUser.enterprise!.id!,
    } satisfies CreateInviteRequestBodyEnterpriseField,
    actionableBy: {
      login: email,
    } satisfies CreateInviteRequestBodyActionableByField,
  } satisfies CreateInviteRequestBody);
  if (!((toString(invitation.type) as string) == 'invite')) {
    throw new Error('Assertion failed');
  }
  if (!(invitation.invitedTo!.id == currentUser.enterprise!.id)) {
    throw new Error('Assertion failed');
  }
  if (!(invitation.actionableBy!.login == email)) {
    throw new Error('Assertion failed');
  }
  const getInvitation: Invite = await client.invites.getInviteById(
    invitation.id,
  );
  if (!(getInvitation.id == invitation.id)) {
    throw new Error('Assertion failed');
  }
});
export {};

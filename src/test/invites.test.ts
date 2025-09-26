import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeInvite } from '@/schemas/invite';
import { deserializeInvite } from '@/schemas/invite';
import { serializeCreateInviteRequestBody } from '@/managers/invites';
import { deserializeCreateInviteRequestBody } from '@/managers/invites';
import { serializeCreateInviteRequestBodyEnterpriseField } from '@/managers/invites';
import { deserializeCreateInviteRequestBodyEnterpriseField } from '@/managers/invites';
import { serializeCreateInviteRequestBodyActionableByField } from '@/managers/invites';
import { deserializeCreateInviteRequestBodyActionableByField } from '@/managers/invites';
import { BoxClient } from '@/client';
import { UserFull } from '@/schemas/userFull';
import { GetUserMeQueryParams } from '@/managers/users';
import { Invite } from '@/schemas/invite';
import { CreateInviteRequestBody } from '@/managers/invites';
import { CreateInviteRequestBodyEnterpriseField } from '@/managers/invites';
import { CreateInviteRequestBodyActionableByField } from '@/managers/invites';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
test('testInvites', async function testInvites(): Promise<any> {
  const userId: string = getEnvVar('USER_ID');
  const client: BoxClient = getDefaultClientWithUserSubject(userId);
  const currentUser: UserFull = await client.users.getUserMe({
    fields: ['enterprise'],
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

import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeSessionTerminationMessage } from '@/schemas/sessionTerminationMessage';
import { deserializeSessionTerminationMessage } from '@/schemas/sessionTerminationMessage';
import { serializeTerminateUsersSessionsRequestBody } from '@/managers/sessionTermination';
import { deserializeTerminateUsersSessionsRequestBody } from '@/managers/sessionTermination';
import { serializeGroupFull } from '@/schemas/groupFull';
import { deserializeGroupFull } from '@/schemas/groupFull';
import { serializeCreateGroupRequestBody } from '@/managers/groups';
import { deserializeCreateGroupRequestBody } from '@/managers/groups';
import { serializeTerminateGroupsSessionsRequestBody } from '@/managers/sessionTermination';
import { deserializeTerminateGroupsSessionsRequestBody } from '@/managers/sessionTermination';
import { BoxClient } from '@/client';
import { UserFull } from '@/schemas/userFull';
import { SessionTerminationMessage } from '@/schemas/sessionTerminationMessage';
import { TerminateUsersSessionsRequestBody } from '@/managers/sessionTermination';
import { GroupFull } from '@/schemas/groupFull';
import { CreateGroupRequestBody } from '@/managers/groups';
import { TerminateGroupsSessionsRequestBody } from '@/managers/sessionTermination';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { getDefaultClientWithUserSubject } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testSessionTerminationUser', async function testSessionTerminationUser(): Promise<any> {
  const adminClient: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const user: UserFull = await adminClient.users.getUserMe();
  const result: SessionTerminationMessage =
    await client.sessionTermination.terminateUsersSessions({
      userIds: [getEnvVar('USER_ID')],
      userLogins: [user.login!],
    } satisfies TerminateUsersSessionsRequestBody);
  if (
    !(
      result.message ==
      'Request is successful, please check the admin events for the status of the job'
    )
  ) {
    throw new Error('Assertion failed');
  }
});
test('testSessionTerminationGroup', async function testSessionTerminationGroup(): Promise<any> {
  const groupName: string = getUuid();
  const group: GroupFull = await client.groups.createGroup({
    name: groupName,
  } satisfies CreateGroupRequestBody);
  const result: SessionTerminationMessage =
    await client.sessionTermination.terminateGroupsSessions({
      groupIds: [group.id],
    } satisfies TerminateGroupsSessionsRequestBody);
  if (
    !(
      result.message ==
      'Request is successful, please check the admin events for the status of the job'
    )
  ) {
    throw new Error('Assertion failed');
  }
  await client.groups.deleteGroupById(group.id);
});
export {};

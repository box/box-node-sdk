import { serializeUserFull } from '../schemas/userFull.js';
import { deserializeUserFull } from '../schemas/userFull.js';
import { serializeSessionTerminationMessage } from '../schemas/sessionTerminationMessage.js';
import { deserializeSessionTerminationMessage } from '../schemas/sessionTerminationMessage.js';
import { serializeTerminateUsersSessionsRequestBody } from '../managers/sessionTermination.js';
import { deserializeTerminateUsersSessionsRequestBody } from '../managers/sessionTermination.js';
import { serializeGroupFull } from '../schemas/groupFull.js';
import { deserializeGroupFull } from '../schemas/groupFull.js';
import { serializeCreateGroupRequestBody } from '../managers/groups.js';
import { deserializeCreateGroupRequestBody } from '../managers/groups.js';
import { serializeTerminateGroupsSessionsRequestBody } from '../managers/sessionTermination.js';
import { deserializeTerminateGroupsSessionsRequestBody } from '../managers/sessionTermination.js';
import { BoxClient } from '../client.js';
import { UserFull } from '../schemas/userFull.js';
import { SessionTerminationMessage } from '../schemas/sessionTerminationMessage.js';
import { TerminateUsersSessionsRequestBody } from '../managers/sessionTermination.js';
import { GroupFull } from '../schemas/groupFull.js';
import { CreateGroupRequestBody } from '../managers/groups.js';
import { TerminateGroupsSessionsRequestBody } from '../managers/sessionTermination.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { getDefaultClientWithUserSubject } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testSessionTerminationUser', async function testSessionTerminationUser(): Promise<any> {
  const adminClient: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID')
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

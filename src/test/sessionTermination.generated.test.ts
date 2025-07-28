import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeSessionTerminationMessage } from '../schemas/sessionTerminationMessage.generated.js';
import { deserializeSessionTerminationMessage } from '../schemas/sessionTerminationMessage.generated.js';
import { serializeTerminateUsersSessionsRequestBody } from '../managers/sessionTermination.generated.js';
import { deserializeTerminateUsersSessionsRequestBody } from '../managers/sessionTermination.generated.js';
import { serializeGroupFull } from '../schemas/groupFull.generated.js';
import { deserializeGroupFull } from '../schemas/groupFull.generated.js';
import { serializeCreateGroupRequestBody } from '../managers/groups.generated.js';
import { deserializeCreateGroupRequestBody } from '../managers/groups.generated.js';
import { serializeTerminateGroupsSessionsRequestBody } from '../managers/sessionTermination.generated.js';
import { deserializeTerminateGroupsSessionsRequestBody } from '../managers/sessionTermination.generated.js';
import { BoxClient } from '../client.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { SessionTerminationMessage } from '../schemas/sessionTerminationMessage.generated.js';
import { TerminateUsersSessionsRequestBody } from '../managers/sessionTermination.generated.js';
import { GroupFull } from '../schemas/groupFull.generated.js';
import { CreateGroupRequestBody } from '../managers/groups.generated.js';
import { TerminateGroupsSessionsRequestBody } from '../managers/sessionTermination.generated.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
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

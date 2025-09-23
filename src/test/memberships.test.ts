import { serializeUserFull } from '../schemas/userFull.js';
import { deserializeUserFull } from '../schemas/userFull.js';
import { serializeCreateUserRequestBody } from '../managers/users.js';
import { deserializeCreateUserRequestBody } from '../managers/users.js';
import { serializeGroupMemberships } from '../schemas/groupMemberships.js';
import { deserializeGroupMemberships } from '../schemas/groupMemberships.js';
import { serializeGroupFull } from '../schemas/groupFull.js';
import { deserializeGroupFull } from '../schemas/groupFull.js';
import { serializeCreateGroupRequestBody } from '../managers/groups.js';
import { deserializeCreateGroupRequestBody } from '../managers/groups.js';
import { serializeGroupMembership } from '../schemas/groupMembership.js';
import { deserializeGroupMembership } from '../schemas/groupMembership.js';
import { serializeCreateGroupMembershipRequestBody } from '../managers/memberships.js';
import { deserializeCreateGroupMembershipRequestBody } from '../managers/memberships.js';
import { serializeCreateGroupMembershipRequestBodyUserField } from '../managers/memberships.js';
import { deserializeCreateGroupMembershipRequestBodyUserField } from '../managers/memberships.js';
import { serializeCreateGroupMembershipRequestBodyGroupField } from '../managers/memberships.js';
import { deserializeCreateGroupMembershipRequestBodyGroupField } from '../managers/memberships.js';
import { serializeUpdateGroupMembershipByIdRequestBody } from '../managers/memberships.js';
import { deserializeUpdateGroupMembershipByIdRequestBody } from '../managers/memberships.js';
import { serializeUpdateGroupMembershipByIdRequestBodyRoleField } from '../managers/memberships.js';
import { deserializeUpdateGroupMembershipByIdRequestBodyRoleField } from '../managers/memberships.js';
import { UpdateGroupMembershipByIdOptionalsInput } from '../managers/memberships.js';
import { UpdateGroupMembershipByIdOptionals } from '../managers/memberships.js';
import { BoxClient } from '../client.js';
import { UserFull } from '../schemas/userFull.js';
import { CreateUserRequestBody } from '../managers/users.js';
import { GroupMemberships } from '../schemas/groupMemberships.js';
import { GroupFull } from '../schemas/groupFull.js';
import { CreateGroupRequestBody } from '../managers/groups.js';
import { GroupMembership } from '../schemas/groupMembership.js';
import { CreateGroupMembershipRequestBody } from '../managers/memberships.js';
import { CreateGroupMembershipRequestBodyUserField } from '../managers/memberships.js';
import { CreateGroupMembershipRequestBodyGroupField } from '../managers/memberships.js';
import { UpdateGroupMembershipByIdRequestBody } from '../managers/memberships.js';
import { UpdateGroupMembershipByIdRequestBodyRoleField } from '../managers/memberships.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testMemberships', async function testMemberships(): Promise<any> {
  const user: UserFull = await client.users.createUser({
    name: getUuid(),
    login: ''.concat(getUuid(), '@boxdemo.com') as string,
  } satisfies CreateUserRequestBody);
  const userMemberships: GroupMemberships =
    await client.memberships.getUserMemberships(user.id);
  if (!(userMemberships.totalCount == 0)) {
    throw new Error('Assertion failed');
  }
  const group: GroupFull = await client.groups.createGroup({
    name: getUuid(),
  } satisfies CreateGroupRequestBody);
  const groupMemberships: GroupMemberships =
    await client.memberships.getGroupMemberships(group.id);
  if (!(groupMemberships.totalCount == 0)) {
    throw new Error('Assertion failed');
  }
  const groupMembership: GroupMembership =
    await client.memberships.createGroupMembership({
      user: { id: user.id } satisfies CreateGroupMembershipRequestBodyUserField,
      group: {
        id: group.id,
      } satisfies CreateGroupMembershipRequestBodyGroupField,
    } satisfies CreateGroupMembershipRequestBody);
  if (!(groupMembership.user!.id == user.id)) {
    throw new Error('Assertion failed');
  }
  if (!(groupMembership.group!.id == group.id)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(groupMembership.role) as string) == 'member')) {
    throw new Error('Assertion failed');
  }
  const getGroupMembership: GroupMembership =
    await client.memberships.getGroupMembershipById(groupMembership.id!);
  if (!(getGroupMembership.id == groupMembership.id)) {
    throw new Error('Assertion failed');
  }
  const updatedGroupMembership: GroupMembership =
    await client.memberships.updateGroupMembershipById(groupMembership.id!, {
      requestBody: {
        role: 'admin' as UpdateGroupMembershipByIdRequestBodyRoleField,
      } satisfies UpdateGroupMembershipByIdRequestBody,
    } satisfies UpdateGroupMembershipByIdOptionalsInput);
  if (!(updatedGroupMembership.id == groupMembership.id)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(updatedGroupMembership.role) as string) == 'admin')) {
    throw new Error('Assertion failed');
  }
  await client.memberships.deleteGroupMembershipById(groupMembership.id!);
  await expect(async () => {
    await client.memberships.getGroupMembershipById(groupMembership.id!);
  }).rejects.toThrow();
  await client.groups.deleteGroupById(group.id);
  await client.users.deleteUserById(user.id);
});
export {};

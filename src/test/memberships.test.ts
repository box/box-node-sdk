import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeCreateUserRequestBody } from '@/managers/users';
import { deserializeCreateUserRequestBody } from '@/managers/users';
import { serializeGroupMemberships } from '@/schemas/groupMemberships';
import { deserializeGroupMemberships } from '@/schemas/groupMemberships';
import { serializeGroupFull } from '@/schemas/groupFull';
import { deserializeGroupFull } from '@/schemas/groupFull';
import { serializeCreateGroupRequestBody } from '@/managers/groups';
import { deserializeCreateGroupRequestBody } from '@/managers/groups';
import { serializeGroupMembership } from '@/schemas/groupMembership';
import { deserializeGroupMembership } from '@/schemas/groupMembership';
import { serializeCreateGroupMembershipRequestBody } from '@/managers/memberships';
import { deserializeCreateGroupMembershipRequestBody } from '@/managers/memberships';
import { serializeCreateGroupMembershipRequestBodyUserField } from '@/managers/memberships';
import { deserializeCreateGroupMembershipRequestBodyUserField } from '@/managers/memberships';
import { serializeCreateGroupMembershipRequestBodyGroupField } from '@/managers/memberships';
import { deserializeCreateGroupMembershipRequestBodyGroupField } from '@/managers/memberships';
import { serializeUpdateGroupMembershipByIdRequestBody } from '@/managers/memberships';
import { deserializeUpdateGroupMembershipByIdRequestBody } from '@/managers/memberships';
import { serializeUpdateGroupMembershipByIdRequestBodyRoleField } from '@/managers/memberships';
import { deserializeUpdateGroupMembershipByIdRequestBodyRoleField } from '@/managers/memberships';
import { UpdateGroupMembershipByIdOptionalsInput } from '@/managers/memberships';
import { UpdateGroupMembershipByIdOptionals } from '@/managers/memberships';
import { BoxClient } from '@/client';
import { UserFull } from '@/schemas/userFull';
import { CreateUserRequestBody } from '@/managers/users';
import { GroupMemberships } from '@/schemas/groupMemberships';
import { GroupFull } from '@/schemas/groupFull';
import { CreateGroupRequestBody } from '@/managers/groups';
import { GroupMembership } from '@/schemas/groupMembership';
import { CreateGroupMembershipRequestBody } from '@/managers/memberships';
import { CreateGroupMembershipRequestBodyUserField } from '@/managers/memberships';
import { CreateGroupMembershipRequestBodyGroupField } from '@/managers/memberships';
import { UpdateGroupMembershipByIdRequestBody } from '@/managers/memberships';
import { UpdateGroupMembershipByIdRequestBodyRoleField } from '@/managers/memberships';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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

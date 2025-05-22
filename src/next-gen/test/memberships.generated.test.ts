import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeCreateUserRequestBody } from '../managers/users.generated.js';
import { deserializeCreateUserRequestBody } from '../managers/users.generated.js';
import { serializeGroupMemberships } from '../schemas/groupMemberships.generated.js';
import { deserializeGroupMemberships } from '../schemas/groupMemberships.generated.js';
import { serializeGroupFull } from '../schemas/groupFull.generated.js';
import { deserializeGroupFull } from '../schemas/groupFull.generated.js';
import { serializeCreateGroupRequestBody } from '../managers/groups.generated.js';
import { deserializeCreateGroupRequestBody } from '../managers/groups.generated.js';
import { serializeGroupMembership } from '../schemas/groupMembership.generated.js';
import { deserializeGroupMembership } from '../schemas/groupMembership.generated.js';
import { serializeCreateGroupMembershipRequestBody } from '../managers/memberships.generated.js';
import { deserializeCreateGroupMembershipRequestBody } from '../managers/memberships.generated.js';
import { serializeCreateGroupMembershipRequestBodyUserField } from '../managers/memberships.generated.js';
import { deserializeCreateGroupMembershipRequestBodyUserField } from '../managers/memberships.generated.js';
import { serializeCreateGroupMembershipRequestBodyGroupField } from '../managers/memberships.generated.js';
import { deserializeCreateGroupMembershipRequestBodyGroupField } from '../managers/memberships.generated.js';
import { serializeUpdateGroupMembershipByIdRequestBody } from '../managers/memberships.generated.js';
import { deserializeUpdateGroupMembershipByIdRequestBody } from '../managers/memberships.generated.js';
import { serializeUpdateGroupMembershipByIdRequestBodyRoleField } from '../managers/memberships.generated.js';
import { deserializeUpdateGroupMembershipByIdRequestBodyRoleField } from '../managers/memberships.generated.js';
import { UpdateGroupMembershipByIdOptionalsInput } from '../managers/memberships.generated.js';
import { UpdateGroupMembershipByIdOptionals } from '../managers/memberships.generated.js';
import { BoxClient } from '../client.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { CreateUserRequestBody } from '../managers/users.generated.js';
import { GroupMemberships } from '../schemas/groupMemberships.generated.js';
import { GroupFull } from '../schemas/groupFull.generated.js';
import { CreateGroupRequestBody } from '../managers/groups.generated.js';
import { GroupMembership } from '../schemas/groupMembership.generated.js';
import { CreateGroupMembershipRequestBody } from '../managers/memberships.generated.js';
import { CreateGroupMembershipRequestBodyUserField } from '../managers/memberships.generated.js';
import { CreateGroupMembershipRequestBodyGroupField } from '../managers/memberships.generated.js';
import { UpdateGroupMembershipByIdRequestBody } from '../managers/memberships.generated.js';
import { UpdateGroupMembershipByIdRequestBodyRoleField } from '../managers/memberships.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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

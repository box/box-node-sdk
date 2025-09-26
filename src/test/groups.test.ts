import { serializeGroups } from '@/schemas/groups';
import { deserializeGroups } from '@/schemas/groups';
import { serializeGroupFull } from '@/schemas/groupFull';
import { deserializeGroupFull } from '@/schemas/groupFull';
import { serializeCreateGroupRequestBody } from '@/managers/groups';
import { deserializeCreateGroupRequestBody } from '@/managers/groups';
import { serializeUpdateGroupByIdRequestBody } from '@/managers/groups';
import { deserializeUpdateGroupByIdRequestBody } from '@/managers/groups';
import { GetGroupByIdOptionalsInput } from '@/managers/groups';
import { UpdateGroupByIdOptionalsInput } from '@/managers/groups';
import { GetGroupByIdOptionals } from '@/managers/groups';
import { UpdateGroupByIdOptionals } from '@/managers/groups';
import { BoxClient } from '@/client';
import { Groups } from '@/schemas/groups';
import { GroupFull } from '@/schemas/groupFull';
import { CreateGroupRequestBody } from '@/managers/groups';
import { GetGroupByIdQueryParams } from '@/managers/groups';
import { UpdateGroupByIdRequestBody } from '@/managers/groups';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('test_get_groups', async function test_get_groups(): Promise<any> {
  const groups: Groups = await client.groups.getGroups();
  if (!(groups.totalCount! >= 0)) {
    throw new Error('Assertion failed');
  }
});
test('test_create_get_delete_group', async function test_create_get_delete_group(): Promise<any> {
  const groupName: string = getUuid();
  const groupDescription: string = 'Group description';
  const group: GroupFull = await client.groups.createGroup({
    name: groupName,
    description: groupDescription,
  } satisfies CreateGroupRequestBody);
  if (!(group.name == groupName)) {
    throw new Error('Assertion failed');
  }
  const groupById: GroupFull = await client.groups.getGroupById(group.id, {
    queryParams: {
      fields: ['id', 'name', 'description', 'group_type'],
    } satisfies GetGroupByIdQueryParams,
  } satisfies GetGroupByIdOptionalsInput);
  if (!(groupById.id == group.id)) {
    throw new Error('Assertion failed');
  }
  if (!(groupById.description == groupDescription)) {
    throw new Error('Assertion failed');
  }
  const updatedGroupName: string = getUuid();
  const updatedGroup: GroupFull = await client.groups.updateGroupById(
    group.id,
    {
      requestBody: {
        name: updatedGroupName,
      } satisfies UpdateGroupByIdRequestBody,
    } satisfies UpdateGroupByIdOptionalsInput,
  );
  if (!(updatedGroup.name == updatedGroupName)) {
    throw new Error('Assertion failed');
  }
  await client.groups.deleteGroupById(group.id);
  await expect(async () => {
    await client.groups.getGroupById(group.id);
  }).rejects.toThrow();
});
export {};

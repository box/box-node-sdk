import { serializeGroups } from '../schemas/groups.js';
import { deserializeGroups } from '../schemas/groups.js';
import { serializeGroupFull } from '../schemas/groupFull.js';
import { deserializeGroupFull } from '../schemas/groupFull.js';
import { serializeCreateGroupRequestBody } from '../managers/groups.js';
import { deserializeCreateGroupRequestBody } from '../managers/groups.js';
import { serializeUpdateGroupByIdRequestBody } from '../managers/groups.js';
import { deserializeUpdateGroupByIdRequestBody } from '../managers/groups.js';
import { GetGroupByIdOptionalsInput } from '../managers/groups.js';
import { UpdateGroupByIdOptionalsInput } from '../managers/groups.js';
import { GetGroupByIdOptionals } from '../managers/groups.js';
import { UpdateGroupByIdOptionals } from '../managers/groups.js';
import { BoxClient } from '../client.js';
import { Groups } from '../schemas/groups.js';
import { GroupFull } from '../schemas/groupFull.js';
import { CreateGroupRequestBody } from '../managers/groups.js';
import { GetGroupByIdQueryParams } from '../managers/groups.js';
import { UpdateGroupByIdRequestBody } from '../managers/groups.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

import { serializeGroups } from '../schemas/groups.generated.js';
import { deserializeGroups } from '../schemas/groups.generated.js';
import { serializeGroupFull } from '../schemas/groupFull.generated.js';
import { deserializeGroupFull } from '../schemas/groupFull.generated.js';
import { serializeCreateGroupRequestBody } from '../managers/groups.generated.js';
import { deserializeCreateGroupRequestBody } from '../managers/groups.generated.js';
import { serializeUpdateGroupByIdRequestBody } from '../managers/groups.generated.js';
import { deserializeUpdateGroupByIdRequestBody } from '../managers/groups.generated.js';
import { GetGroupByIdOptionalsInput } from '../managers/groups.generated.js';
import { UpdateGroupByIdOptionalsInput } from '../managers/groups.generated.js';
import { GetGroupByIdOptionals } from '../managers/groups.generated.js';
import { UpdateGroupByIdOptionals } from '../managers/groups.generated.js';
import { BoxClient } from '../client.generated.js';
import { Groups } from '../schemas/groups.generated.js';
import { GroupFull } from '../schemas/groupFull.generated.js';
import { CreateGroupRequestBody } from '../managers/groups.generated.js';
import { GetGroupByIdQueryParams } from '../managers/groups.generated.js';
import { UpdateGroupByIdRequestBody } from '../managers/groups.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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
      fields: [
        'id' as string,
        'name' as string,
        'description' as string,
        'group_type' as string,
      ],
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

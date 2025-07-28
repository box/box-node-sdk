import { serializeUsers } from '../schemas/users.generated.js';
import { deserializeUsers } from '../schemas/users.generated.js';
import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeCreateUserRequestBody } from '../managers/users.generated.js';
import { deserializeCreateUserRequestBody } from '../managers/users.generated.js';
import { serializeUpdateUserByIdRequestBody } from '../managers/users.generated.js';
import { deserializeUpdateUserByIdRequestBody } from '../managers/users.generated.js';
import { UpdateUserByIdOptionalsInput } from '../managers/users.generated.js';
import { UpdateUserByIdOptionals } from '../managers/users.generated.js';
import { BoxClient } from '../client.generated.js';
import { Users } from '../schemas/users.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { CreateUserRequestBody } from '../managers/users.generated.js';
import { UpdateUserByIdRequestBody } from '../managers/users.generated.js';
import { getUuid } from '../internal/utils.js';
import { createNull } from '../internal/utils.js';
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
test('test_get_users', async function test_get_users(): Promise<any> {
  const users: Users = await client.users.getUsers();
  if (!(users.totalCount! >= 0)) {
    throw new Error('Assertion failed');
  }
});
test('test_get_user_me', async function test_get_user_me(): Promise<any> {
  const currentUser: UserFull = await client.users.getUserMe();
  if (!((toString(currentUser.type) as string) == 'user')) {
    throw new Error('Assertion failed');
  }
});
test('test_create_update_get_delete_user', async function test_create_update_get_delete_user(): Promise<any> {
  const userName: string = getUuid();
  const userLogin: string = ''.concat(getUuid(), '@gmail.com') as string;
  const user: UserFull = await client.users.createUser({
    name: userName,
    login: userLogin,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  if (!(user.name == userName)) {
    throw new Error('Assertion failed');
  }
  const userById: UserFull = await client.users.getUserById(user.id);
  if (!(userById.id == user.id)) {
    throw new Error('Assertion failed');
  }
  const updatedUserName: string = getUuid();
  const updatedUser: UserFull = await client.users.updateUserById(user.id, {
    requestBody: { name: updatedUserName } satisfies UpdateUserByIdRequestBody,
  } satisfies UpdateUserByIdOptionalsInput);
  if (!(updatedUser.name == updatedUserName)) {
    throw new Error('Assertion failed');
  }
  await client.users.deleteUserById(user.id);
});
export {};

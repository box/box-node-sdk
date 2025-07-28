import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeCreateUserRequestBody } from '../managers/users.generated.js';
import { deserializeCreateUserRequestBody } from '../managers/users.generated.js';
import { serializeEmailAliases } from '../schemas/emailAliases.generated.js';
import { deserializeEmailAliases } from '../schemas/emailAliases.generated.js';
import { serializeEmailAlias } from '../schemas/emailAlias.generated.js';
import { deserializeEmailAlias } from '../schemas/emailAlias.generated.js';
import { serializeCreateUserEmailAliasRequestBody } from '../managers/emailAliases.generated.js';
import { deserializeCreateUserEmailAliasRequestBody } from '../managers/emailAliases.generated.js';
import { BoxClient } from '../client.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { CreateUserRequestBody } from '../managers/users.generated.js';
import { EmailAliases } from '../schemas/emailAliases.generated.js';
import { EmailAlias } from '../schemas/emailAlias.generated.js';
import { CreateUserEmailAliasRequestBody } from '../managers/emailAliases.generated.js';
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
test('testEmailAliases', async function testEmailAliases(): Promise<any> {
  const newUserName: string = getUuid();
  const newUserLogin: string = ''.concat(getUuid(), '@boxdemo.com') as string;
  const newUser: UserFull = await client.users.createUser({
    name: newUserName,
    login: newUserLogin,
  } satisfies CreateUserRequestBody);
  const aliases: EmailAliases = await client.emailAliases.getUserEmailAliases(
    newUser.id,
  );
  if (!(aliases.totalCount == 0)) {
    throw new Error('Assertion failed');
  }
  const newAliasEmail: string = ''.concat(newUser.id, '@boxdemo.com') as string;
  const newAlias: EmailAlias = await client.emailAliases.createUserEmailAlias(
    newUser.id,
    { email: newAliasEmail } satisfies CreateUserEmailAliasRequestBody,
  );
  const updatedAliases: EmailAliases =
    await client.emailAliases.getUserEmailAliases(newUser.id);
  if (!(updatedAliases.totalCount == 1)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedAliases.entries![0].email == newAliasEmail)) {
    throw new Error('Assertion failed');
  }
  await client.emailAliases.deleteUserEmailAliasById(newUser.id, newAlias.id!);
  const finalAliases: EmailAliases =
    await client.emailAliases.getUserEmailAliases(newUser.id);
  if (!(finalAliases.totalCount == 0)) {
    throw new Error('Assertion failed');
  }
  await client.users.deleteUserById(newUser.id);
});
export {};

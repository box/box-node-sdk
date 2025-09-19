import { serializeUserFull } from '../schemas/userFull.js';
import { deserializeUserFull } from '../schemas/userFull.js';
import { serializeCreateUserRequestBody } from '../managers/users.js';
import { deserializeCreateUserRequestBody } from '../managers/users.js';
import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeTransferOwnedFolderRequestBody } from '../managers/transfer.js';
import { deserializeTransferOwnedFolderRequestBody } from '../managers/transfer.js';
import { serializeTransferOwnedFolderRequestBodyOwnedByField } from '../managers/transfer.js';
import { deserializeTransferOwnedFolderRequestBodyOwnedByField } from '../managers/transfer.js';
import { TransferOwnedFolderOptionalsInput } from '../managers/transfer.js';
import { DeleteFolderByIdOptionalsInput } from '../managers/folders.js';
import { DeleteUserByIdOptionalsInput } from '../managers/users.js';
import { TransferOwnedFolderOptionals } from '../managers/transfer.js';
import { DeleteFolderByIdOptionals } from '../managers/folders.js';
import { DeleteUserByIdOptionals } from '../managers/users.js';
import { BoxClient } from '../client.js';
import { UserFull } from '../schemas/userFull.js';
import { CreateUserRequestBody } from '../managers/users.js';
import { FolderFull } from '../schemas/folderFull.js';
import { TransferOwnedFolderRequestBody } from '../managers/transfer.js';
import { TransferOwnedFolderRequestBodyOwnedByField } from '../managers/transfer.js';
import { TransferOwnedFolderQueryParams } from '../managers/transfer.js';
import { DeleteFolderByIdQueryParams } from '../managers/folders.js';
import { DeleteUserByIdQueryParams } from '../managers/users.js';
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
test('testTransferUserContent', async function testTransferUserContent(): Promise<any> {
  const sourceUserName: string = getUuid();
  const sourceUser: UserFull = await client.users.createUser({
    name: sourceUserName,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  const targetUser: UserFull = await client.users.getUserMe();
  const transferredFolder: FolderFull =
    await client.transfer.transferOwnedFolder(
      sourceUser.id,
      {
        ownedBy: {
          id: targetUser.id,
        } satisfies TransferOwnedFolderRequestBodyOwnedByField,
      } satisfies TransferOwnedFolderRequestBody,
      {
        queryParams: { notify: false } satisfies TransferOwnedFolderQueryParams,
      } satisfies TransferOwnedFolderOptionalsInput
    );
  if (!(transferredFolder.ownedBy!.id == targetUser.id)) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(transferredFolder.id, {
    queryParams: { recursive: true } satisfies DeleteFolderByIdQueryParams,
  } satisfies DeleteFolderByIdOptionalsInput);
  await client.users.deleteUserById(sourceUser.id, {
    queryParams: {
      notify: false,
      force: true,
    } satisfies DeleteUserByIdQueryParams,
  } satisfies DeleteUserByIdOptionalsInput);
});
export {};

import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeCreateUserRequestBody } from '@/managers/users';
import { deserializeCreateUserRequestBody } from '@/managers/users';
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeTransferOwnedFolderRequestBody } from '@/managers/transfer';
import { deserializeTransferOwnedFolderRequestBody } from '@/managers/transfer';
import { serializeTransferOwnedFolderRequestBodyOwnedByField } from '@/managers/transfer';
import { deserializeTransferOwnedFolderRequestBodyOwnedByField } from '@/managers/transfer';
import { TransferOwnedFolderOptionalsInput } from '@/managers/transfer';
import { DeleteFolderByIdOptionalsInput } from '@/managers/folders';
import { DeleteUserByIdOptionalsInput } from '@/managers/users';
import { TransferOwnedFolderOptionals } from '@/managers/transfer';
import { DeleteFolderByIdOptionals } from '@/managers/folders';
import { DeleteUserByIdOptionals } from '@/managers/users';
import { BoxClient } from '@/client';
import { UserFull } from '@/schemas/userFull';
import { CreateUserRequestBody } from '@/managers/users';
import { FolderFull } from '@/schemas/folderFull';
import { TransferOwnedFolderRequestBody } from '@/managers/transfer';
import { TransferOwnedFolderRequestBodyOwnedByField } from '@/managers/transfer';
import { TransferOwnedFolderQueryParams } from '@/managers/transfer';
import { DeleteFolderByIdQueryParams } from '@/managers/folders';
import { DeleteUserByIdQueryParams } from '@/managers/users';
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
      } satisfies TransferOwnedFolderOptionalsInput,
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

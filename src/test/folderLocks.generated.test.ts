import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeFolderLocks } from '../schemas/folderLocks.generated.js';
import { deserializeFolderLocks } from '../schemas/folderLocks.generated.js';
import { serializeFolderLock } from '../schemas/folderLock.generated.js';
import { deserializeFolderLock } from '../schemas/folderLock.generated.js';
import { serializeCreateFolderLockRequestBody } from '../managers/folderLocks.generated.js';
import { deserializeCreateFolderLockRequestBody } from '../managers/folderLocks.generated.js';
import { serializeCreateFolderLockRequestBodyFolderField } from '../managers/folderLocks.generated.js';
import { deserializeCreateFolderLockRequestBodyFolderField } from '../managers/folderLocks.generated.js';
import { serializeCreateFolderLockRequestBodyLockedOperationsField } from '../managers/folderLocks.generated.js';
import { deserializeCreateFolderLockRequestBodyLockedOperationsField } from '../managers/folderLocks.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { FolderLocks } from '../schemas/folderLocks.generated.js';
import { GetFolderLocksQueryParams } from '../managers/folderLocks.generated.js';
import { FolderLock } from '../schemas/folderLock.generated.js';
import { CreateFolderLockRequestBody } from '../managers/folderLocks.generated.js';
import { CreateFolderLockRequestBodyFolderField } from '../managers/folderLocks.generated.js';
import { CreateFolderLockRequestBodyLockedOperationsField } from '../managers/folderLocks.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { createNewFolder } from './commons.generated.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testFolderLocks', async function testFolderLocks(): Promise<any> {
  const folder: FolderFull = await createNewFolder();
  const folderLocks: FolderLocks = await client.folderLocks.getFolderLocks({
    folderId: folder.id,
  } satisfies GetFolderLocksQueryParams);
  if (!(folderLocks.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  const folderLock: FolderLock = await client.folderLocks.createFolderLock({
    folder: {
      id: folder.id,
      type: 'folder',
    } satisfies CreateFolderLockRequestBodyFolderField,
    lockedOperations: {
      move: true,
      delete: true,
    } satisfies CreateFolderLockRequestBodyLockedOperationsField,
  } satisfies CreateFolderLockRequestBody);
  if (!(folderLock.folder!.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (!(folderLock.lockedOperations!.move == true)) {
    throw new Error('Assertion failed');
  }
  if (!(folderLock.lockedOperations!.delete == true)) {
    throw new Error('Assertion failed');
  }
  await client.folderLocks.deleteFolderLockById(folderLock.id!);
  await expect(async () => {
    await client.folderLocks.deleteFolderLockById(folderLock.id!);
  }).rejects.toThrow();
  const newFolderLocks: FolderLocks = await client.folderLocks.getFolderLocks({
    folderId: folder.id,
  } satisfies GetFolderLocksQueryParams);
  if (!(newFolderLocks.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(folder.id);
});
export {};

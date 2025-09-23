import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeFolderLocks } from '../schemas/folderLocks.js';
import { deserializeFolderLocks } from '../schemas/folderLocks.js';
import { serializeFolderLock } from '../schemas/folderLock.js';
import { deserializeFolderLock } from '../schemas/folderLock.js';
import { serializeCreateFolderLockRequestBody } from '../managers/folderLocks.js';
import { deserializeCreateFolderLockRequestBody } from '../managers/folderLocks.js';
import { serializeCreateFolderLockRequestBodyFolderField } from '../managers/folderLocks.js';
import { deserializeCreateFolderLockRequestBodyFolderField } from '../managers/folderLocks.js';
import { serializeCreateFolderLockRequestBodyLockedOperationsField } from '../managers/folderLocks.js';
import { deserializeCreateFolderLockRequestBodyLockedOperationsField } from '../managers/folderLocks.js';
import { BoxClient } from '../client.js';
import { FolderFull } from '../schemas/folderFull.js';
import { FolderLocks } from '../schemas/folderLocks.js';
import { GetFolderLocksQueryParams } from '../managers/folderLocks.js';
import { FolderLock } from '../schemas/folderLock.js';
import { CreateFolderLockRequestBody } from '../managers/folderLocks.js';
import { CreateFolderLockRequestBodyFolderField } from '../managers/folderLocks.js';
import { CreateFolderLockRequestBodyLockedOperationsField } from '../managers/folderLocks.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { createNewFolder } from './commons.js';
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

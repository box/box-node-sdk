import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeFolderLocks } from '@/schemas/folderLocks';
import { deserializeFolderLocks } from '@/schemas/folderLocks';
import { serializeFolderLock } from '@/schemas/folderLock';
import { deserializeFolderLock } from '@/schemas/folderLock';
import { serializeCreateFolderLockRequestBody } from '@/managers/folderLocks';
import { deserializeCreateFolderLockRequestBody } from '@/managers/folderLocks';
import { serializeCreateFolderLockRequestBodyFolderField } from '@/managers/folderLocks';
import { deserializeCreateFolderLockRequestBodyFolderField } from '@/managers/folderLocks';
import { serializeCreateFolderLockRequestBodyLockedOperationsField } from '@/managers/folderLocks';
import { deserializeCreateFolderLockRequestBodyLockedOperationsField } from '@/managers/folderLocks';
import { BoxClient } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { FolderLocks } from '@/schemas/folderLocks';
import { GetFolderLocksQueryParams } from '@/managers/folderLocks';
import { FolderLock } from '@/schemas/folderLock';
import { CreateFolderLockRequestBody } from '@/managers/folderLocks';
import { CreateFolderLockRequestBodyFolderField } from '@/managers/folderLocks';
import { CreateFolderLockRequestBodyLockedOperationsField } from '@/managers/folderLocks';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { createNewFolder } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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

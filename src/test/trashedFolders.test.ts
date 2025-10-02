import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeCreateFolderRequestBody } from '@/managers/folders';
import { deserializeCreateFolderRequestBody } from '@/managers/folders';
import { serializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { deserializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { serializeTrashFolder } from '@/schemas/trashFolder';
import { deserializeTrashFolder } from '@/schemas/trashFolder';
import { serializeTrashFolderRestored } from '@/schemas/trashFolderRestored';
import { deserializeTrashFolderRestored } from '@/schemas/trashFolderRestored';
import { BoxClient } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { CreateFolderRequestBody } from '@/managers/folders';
import { CreateFolderRequestBodyParentField } from '@/managers/folders';
import { TrashFolder } from '@/schemas/trashFolder';
import { TrashFolderRestored } from '@/schemas/trashFolderRestored';
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
test('testTrashedFolders', async function testTrashedFolders(): Promise<any> {
  const folder: FolderFull = await client.folders.createFolder({
    name: getUuid(),
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  await client.folders.deleteFolderById(folder.id);
  const fromTrash: TrashFolder =
    await client.trashedFolders.getTrashedFolderById(folder.id);
  if (!(fromTrash.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (!(fromTrash.name == folder.name)) {
    throw new Error('Assertion failed');
  }
  await expect(async () => {
    await client.folders.getFolderById(folder.id);
  }).rejects.toThrow();
  const restoredFolder: TrashFolderRestored =
    await client.trashedFolders.restoreFolderFromTrash(folder.id);
  const fromApi: FolderFull = await client.folders.getFolderById(folder.id);
  if (!(restoredFolder.id == fromApi.id)) {
    throw new Error('Assertion failed');
  }
  if (!(restoredFolder.name == fromApi.name)) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(folder.id);
  await client.trashedFolders.deleteTrashedFolderById(folder.id);
  await expect(async () => {
    await client.trashedFolders.getTrashedFolderById(folder.id);
  }).rejects.toThrow();
});
export {};

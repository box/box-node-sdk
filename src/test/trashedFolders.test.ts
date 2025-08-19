import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { serializeTrashFolder } from '../schemas/trashFolder.js';
import { deserializeTrashFolder } from '../schemas/trashFolder.js';
import { serializeTrashFolderRestored } from '../schemas/trashFolderRestored.js';
import { deserializeTrashFolderRestored } from '../schemas/trashFolderRestored.js';
import { BoxClient } from '../client.js';
import { FolderFull } from '../schemas/folderFull.js';
import { CreateFolderRequestBody } from '../managers/folders.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.js';
import { TrashFolder } from '../schemas/trashFolder.js';
import { TrashFolderRestored } from '../schemas/trashFolderRestored.js';
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

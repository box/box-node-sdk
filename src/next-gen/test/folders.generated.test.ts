import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeUpdateFolderByIdRequestBody } from '../managers/folders.generated.js';
import { deserializeUpdateFolderByIdRequestBody } from '../managers/folders.generated.js';
import { serializeCopyFolderRequestBody } from '../managers/folders.generated.js';
import { deserializeCopyFolderRequestBody } from '../managers/folders.generated.js';
import { serializeCopyFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeCopyFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeUpdateFolderByIdRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeUpdateFolderByIdRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeItems } from '../schemas/items.generated.js';
import { deserializeItems } from '../schemas/items.generated.js';
import { GetFolderByIdOptionalsInput } from '../managers/folders.generated.js';
import { UpdateFolderByIdOptionalsInput } from '../managers/folders.generated.js';
import { GetFolderByIdOptionals } from '../managers/folders.generated.js';
import { UpdateFolderByIdOptionals } from '../managers/folders.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { GetFolderByIdQueryParams } from '../managers/folders.generated.js';
import { CreateFolderRequestBody } from '../managers/folders.generated.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { UpdateFolderByIdRequestBody } from '../managers/folders.generated.js';
import { CopyFolderRequestBody } from '../managers/folders.generated.js';
import { CopyFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { UpdateFolderByIdRequestBodyParentField } from '../managers/folders.generated.js';
import { Items } from '../schemas/items.generated.js';
import { getUuid } from '../internal/utils.js';
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
test('test_get_folder_info', async function test_get_folder_info(): Promise<any> {
  const rootFolder: FolderFull = await client.folders.getFolderById('0');
  if (!(rootFolder.id == '0')) {
    throw new Error('Assertion failed');
  }
  if (!(rootFolder.name == 'All Files')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(rootFolder.type) as string) == 'folder')) {
    throw new Error('Assertion failed');
  }
});
test('test_get_folder_full_info_with_extra_fields', async function test_get_folder_full_info_with_extra_fields(): Promise<any> {
  const rootFolder: FolderFull = await client.folders.getFolderById('0', {
    queryParams: {
      fields: ['has_collaborations' as string, 'tags' as string],
    } satisfies GetFolderByIdQueryParams,
  } satisfies GetFolderByIdOptionalsInput);
  if (!(rootFolder.id == '0')) {
    throw new Error('Assertion failed');
  }
  if (!(rootFolder.hasCollaborations == false)) {
    throw new Error('Assertion failed');
  }
  const tagsLength: number = rootFolder.tags!.length;
  if (!(tagsLength == 0)) {
    throw new Error('Assertion failed');
  }
});
test('test_create_and_delete_folder', async function test_create_and_delete_folder(): Promise<any> {
  const newFolderName: string = getUuid();
  const newFolder: FolderFull = await client.folders.createFolder({
    name: newFolderName,
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  const createdFolder: FolderFull = await client.folders.getFolderById(
    newFolder.id,
  );
  if (!(createdFolder.name == newFolderName)) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(newFolder.id);
  await expect(async () => {
    await client.folders.getFolderById(newFolder.id);
  }).rejects.toThrow();
});
test('test_update_folder', async function test_update_folder(): Promise<any> {
  const folderToUpdateName: string = getUuid();
  const folderToUpdate: FolderFull = await client.folders.createFolder({
    name: folderToUpdateName,
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  const updatedName: string = getUuid();
  const updatedFolder: FolderFull = await client.folders.updateFolderById(
    folderToUpdate.id,
    {
      requestBody: {
        name: updatedName,
        description: 'Updated description',
      } satisfies UpdateFolderByIdRequestBody,
    } satisfies UpdateFolderByIdOptionalsInput,
  );
  if (!(updatedFolder.name == updatedName)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedFolder.description == 'Updated description')) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(updatedFolder.id);
});
test('test_copy_move_folder_and_list_folder_items', async function test_copy_move_folder_and_list_folder_items(): Promise<any> {
  const folderOriginName: string = getUuid();
  const folderOrigin: FolderFull = await client.folders.createFolder({
    name: folderOriginName,
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  const copiedFolderName: string = getUuid();
  const copiedFolder: FolderFull = await client.folders.copyFolder(
    folderOrigin.id,
    {
      parent: { id: '0' } satisfies CopyFolderRequestBodyParentField,
      name: copiedFolderName,
    } satisfies CopyFolderRequestBody,
  );
  if (!(copiedFolder.parent!.id == '0')) {
    throw new Error('Assertion failed');
  }
  const movedFolderName: string = getUuid();
  const movedFolder: FolderFull = await client.folders.updateFolderById(
    copiedFolder.id,
    {
      requestBody: {
        parent: {
          id: folderOrigin.id,
        } satisfies UpdateFolderByIdRequestBodyParentField,
        name: movedFolderName,
      } satisfies UpdateFolderByIdRequestBody,
    } satisfies UpdateFolderByIdOptionalsInput,
  );
  if (!(movedFolder.parent!.id == folderOrigin.id)) {
    throw new Error('Assertion failed');
  }
  const folderItems: Items = await client.folders.getFolderItems(
    folderOrigin.id,
  );
  if (!(folderItems.entries![0].id == movedFolder.id)) {
    throw new Error('Assertion failed');
  }
  if (!(folderItems.entries![0].name == movedFolderName)) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(movedFolder.id);
  await client.folders.deleteFolderById(folderOrigin.id);
});
export {};

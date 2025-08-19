import { serializeAppItemAssociations } from '../schemas/appItemAssociations.js';
import { deserializeAppItemAssociations } from '../schemas/appItemAssociations.js';
import { serializeAppItemAssociation } from '../schemas/appItemAssociation.js';
import { deserializeAppItemAssociation } from '../schemas/appItemAssociation.js';
import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { GetFileByIdOptionalsInput } from '../managers/files.js';
import { GetFolderByIdOptionalsInput } from '../managers/folders.js';
import { GetFileByIdOptionals } from '../managers/files.js';
import { GetFolderByIdOptionals } from '../managers/folders.js';
import { BoxClient } from '../client.js';
import { AppItemAssociations } from '../schemas/appItemAssociations.js';
import { AppItemAssociation } from '../schemas/appItemAssociation.js';
import { FileFull } from '../schemas/fileFull.js';
import { GetFileByIdQueryParams } from '../managers/files.js';
import { FolderFull } from '../schemas/folderFull.js';
import { GetFolderByIdQueryParams } from '../managers/folders.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
test('testListFileAppItemAssocations', async function testListFileAppItemAssocations(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const fileId: string = getEnvVar('APP_ITEM_ASSOCIATION_FILE_ID');
  const fileAppItemAssociations: AppItemAssociations =
    await client.appItemAssociations.getFileAppItemAssociations(fileId);
  if (!(fileAppItemAssociations.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  const association: AppItemAssociation = fileAppItemAssociations.entries![0];
  if (!!(association.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(association.appItem.applicationType) as string) == 'hubs')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(association.appItem.type) as string) == 'app_item')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(association.item.type) as string) == 'file')) {
    throw new Error('Assertion failed');
  }
  if (!(association.item.id == fileId)) {
    throw new Error('Assertion failed');
  }
  const file: FileFull = await client.files.getFileById(fileId, {
    queryParams: {
      fields: ['is_associated_with_app_item'],
    } satisfies GetFileByIdQueryParams,
  } satisfies GetFileByIdOptionalsInput);
  if (!(file.isAssociatedWithAppItem! == true)) {
    throw new Error('Assertion failed');
  }
});
test('testListFolderAppItemAssocations', async function testListFolderAppItemAssocations(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const folderId: string = getEnvVar('APP_ITEM_ASSOCIATION_FOLDER_ID');
  const folderAppItemAssociations: AppItemAssociations =
    await client.appItemAssociations.getFolderAppItemAssociations(folderId);
  if (!(folderAppItemAssociations.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  const association: AppItemAssociation = folderAppItemAssociations.entries![0];
  if (!!(association.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(association.appItem.applicationType) as string) == 'hubs')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(association.appItem.type) as string) == 'app_item')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(association.item.type) as string) == 'folder')) {
    throw new Error('Assertion failed');
  }
  if (!(association.item.id == folderId)) {
    throw new Error('Assertion failed');
  }
  const folder: FolderFull = await client.folders.getFolderById(folderId, {
    queryParams: {
      fields: ['is_associated_with_app_item'],
    } satisfies GetFolderByIdQueryParams,
  } satisfies GetFolderByIdOptionalsInput);
  if (!(folder.isAssociatedWithAppItem! == true)) {
    throw new Error('Assertion failed');
  }
});
export {};

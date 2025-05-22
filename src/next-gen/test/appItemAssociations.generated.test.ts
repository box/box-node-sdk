import { serializeAppItemAssociations } from '../schemas/appItemAssociations.generated.js';
import { deserializeAppItemAssociations } from '../schemas/appItemAssociations.generated.js';
import { serializeAppItemAssociation } from '../schemas/appItemAssociation.generated.js';
import { deserializeAppItemAssociation } from '../schemas/appItemAssociation.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { GetFileByIdOptionalsInput } from '../managers/files.generated.js';
import { GetFolderByIdOptionalsInput } from '../managers/folders.generated.js';
import { GetFileByIdOptionals } from '../managers/files.generated.js';
import { GetFolderByIdOptionals } from '../managers/folders.generated.js';
import { BoxClient } from '../client.generated.js';
import { AppItemAssociations } from '../schemas/appItemAssociations.generated.js';
import { AppItemAssociation } from '../schemas/appItemAssociation.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { GetFileByIdQueryParams } from '../managers/files.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { GetFolderByIdQueryParams } from '../managers/folders.generated.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
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
      fields: ['is_associated_with_app_item' as string],
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
      fields: ['is_associated_with_app_item' as string],
    } satisfies GetFolderByIdQueryParams,
  } satisfies GetFolderByIdOptionalsInput);
  if (!(folder.isAssociatedWithAppItem! == true)) {
    throw new Error('Assertion failed');
  }
});
export {};

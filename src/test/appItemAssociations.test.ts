import { serializeAppItemAssociations } from '@/schemas/appItemAssociations';
import { deserializeAppItemAssociations } from '@/schemas/appItemAssociations';
import { serializeAppItemAssociation } from '@/schemas/appItemAssociation';
import { deserializeAppItemAssociation } from '@/schemas/appItemAssociation';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { GetFileByIdOptionalsInput } from '@/managers/files';
import { GetFolderByIdOptionalsInput } from '@/managers/folders';
import { GetFileByIdOptionals } from '@/managers/files';
import { GetFolderByIdOptionals } from '@/managers/folders';
import { BoxClient } from '@/client';
import { AppItemAssociations } from '@/schemas/appItemAssociations';
import { AppItemAssociation } from '@/schemas/appItemAssociation';
import { FileFull } from '@/schemas/fileFull';
import { GetFileByIdQueryParams } from '@/managers/files';
import { FolderFull } from '@/schemas/folderFull';
import { GetFolderByIdQueryParams } from '@/managers/folders';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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

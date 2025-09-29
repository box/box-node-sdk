import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeCreateFolderRequestBody } from '@/managers/folders';
import { deserializeCreateFolderRequestBody } from '@/managers/folders';
import { serializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { deserializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { serializeAddShareLinkToFolderRequestBody } from '@/managers/sharedLinksFolders';
import { deserializeAddShareLinkToFolderRequestBody } from '@/managers/sharedLinksFolders';
import { serializeAddShareLinkToFolderRequestBodySharedLinkField } from '@/managers/sharedLinksFolders';
import { deserializeAddShareLinkToFolderRequestBodySharedLinkField } from '@/managers/sharedLinksFolders';
import { serializeAddShareLinkToFolderRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFolders';
import { deserializeAddShareLinkToFolderRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFolders';
import { serializeUpdateSharedLinkOnFolderRequestBody } from '@/managers/sharedLinksFolders';
import { deserializeUpdateSharedLinkOnFolderRequestBody } from '@/managers/sharedLinksFolders';
import { serializeUpdateSharedLinkOnFolderRequestBodySharedLinkField } from '@/managers/sharedLinksFolders';
import { deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkField } from '@/managers/sharedLinksFolders';
import { serializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFolders';
import { deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFolders';
import { serializeRemoveSharedLinkFromFolderRequestBody } from '@/managers/sharedLinksFolders';
import { deserializeRemoveSharedLinkFromFolderRequestBody } from '@/managers/sharedLinksFolders';
import { FindFolderForSharedLinkHeadersInput } from '@/managers/sharedLinksFolders';
import { BoxClient } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { CreateFolderRequestBody } from '@/managers/folders';
import { CreateFolderRequestBodyParentField } from '@/managers/folders';
import { AddShareLinkToFolderRequestBody } from '@/managers/sharedLinksFolders';
import { AddShareLinkToFolderRequestBodySharedLinkField } from '@/managers/sharedLinksFolders';
import { AddShareLinkToFolderRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFolders';
import { AddShareLinkToFolderQueryParams } from '@/managers/sharedLinksFolders';
import { GetSharedLinkForFolderQueryParams } from '@/managers/sharedLinksFolders';
import { FindFolderForSharedLinkQueryParams } from '@/managers/sharedLinksFolders';
import { FindFolderForSharedLinkHeaders } from '@/managers/sharedLinksFolders';
import { UpdateSharedLinkOnFolderRequestBody } from '@/managers/sharedLinksFolders';
import { UpdateSharedLinkOnFolderRequestBodySharedLinkField } from '@/managers/sharedLinksFolders';
import { UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFolders';
import { UpdateSharedLinkOnFolderQueryParams } from '@/managers/sharedLinksFolders';
import { RemoveSharedLinkFromFolderRequestBody } from '@/managers/sharedLinksFolders';
import { RemoveSharedLinkFromFolderQueryParams } from '@/managers/sharedLinksFolders';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { getDefaultClientWithUserSubject } from './commons';
import { createNull } from '@/internal/utils';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testSharedLinksFolders', async function testSharedLinksFolders(): Promise<any> {
  const folder: FolderFull = await client.folders.createFolder({
    name: getUuid(),
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  await client.sharedLinksFolders.addShareLinkToFolder(
    folder.id,
    {
      sharedLink: {
        access: 'open' as AddShareLinkToFolderRequestBodySharedLinkAccessField,
        password: 'Secret123@',
      } satisfies AddShareLinkToFolderRequestBodySharedLinkField,
    } satisfies AddShareLinkToFolderRequestBody,
    { fields: 'shared_link' } satisfies AddShareLinkToFolderQueryParams,
  );
  const folderFromApi: FolderFull =
    await client.sharedLinksFolders.getSharedLinkForFolder(folder.id, {
      fields: 'shared_link',
    } satisfies GetSharedLinkForFolderQueryParams);
  if (!((toString(folderFromApi.sharedLink!.access) as string) == 'open')) {
    throw new Error('Assertion failed');
  }
  const userId: string = getEnvVar('USER_ID');
  const userClient: BoxClient = getDefaultClientWithUserSubject(userId);
  const folderFromSharedLinkPassword: FolderFull =
    await userClient.sharedLinksFolders.findFolderForSharedLink(
      {} satisfies FindFolderForSharedLinkQueryParams,
      {
        boxapi: ''.concat(
          'shared_link=',
          folderFromApi.sharedLink!.url,
          '&shared_link_password=Secret123@',
        ) as string,
      } satisfies FindFolderForSharedLinkHeadersInput,
    );
  if (!(folder.id == folderFromSharedLinkPassword.id)) {
    throw new Error('Assertion failed');
  }
  await expect(async () => {
    await userClient.sharedLinksFolders.findFolderForSharedLink(
      {} satisfies FindFolderForSharedLinkQueryParams,
      {
        boxapi: ''.concat(
          'shared_link=',
          folderFromApi.sharedLink!.url,
          '&shared_link_password=incorrectPassword',
        ) as string,
      } satisfies FindFolderForSharedLinkHeadersInput,
    );
  }).rejects.toThrow();
  const updatedFolder: FolderFull =
    await client.sharedLinksFolders.updateSharedLinkOnFolder(
      folder.id,
      {
        sharedLink: {
          access:
            'collaborators' as UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField,
        } satisfies UpdateSharedLinkOnFolderRequestBodySharedLinkField,
      } satisfies UpdateSharedLinkOnFolderRequestBody,
      { fields: 'shared_link' } satisfies UpdateSharedLinkOnFolderQueryParams,
    );
  if (
    !((toString(updatedFolder.sharedLink!.access) as string) == 'collaborators')
  ) {
    throw new Error('Assertion failed');
  }
  await client.sharedLinksFolders.removeSharedLinkFromFolder(
    folder.id,
    {
      sharedLink: createNull(),
    } satisfies RemoveSharedLinkFromFolderRequestBody,
    { fields: 'shared_link' } satisfies RemoveSharedLinkFromFolderQueryParams,
  );
  const folderFromApiAfterRemove: FolderFull =
    await client.sharedLinksFolders.getSharedLinkForFolder(folder.id, {
      fields: 'shared_link',
    } satisfies GetSharedLinkForFolderQueryParams);
  if (!(folderFromApiAfterRemove.sharedLink == void 0)) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(folder.id);
});
export {};

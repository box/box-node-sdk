import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { serializeAddShareLinkToFolderRequestBody } from '../managers/sharedLinksFolders.js';
import { deserializeAddShareLinkToFolderRequestBody } from '../managers/sharedLinksFolders.js';
import { serializeAddShareLinkToFolderRequestBodySharedLinkField } from '../managers/sharedLinksFolders.js';
import { deserializeAddShareLinkToFolderRequestBodySharedLinkField } from '../managers/sharedLinksFolders.js';
import { serializeAddShareLinkToFolderRequestBodySharedLinkAccessField } from '../managers/sharedLinksFolders.js';
import { deserializeAddShareLinkToFolderRequestBodySharedLinkAccessField } from '../managers/sharedLinksFolders.js';
import { serializeUpdateSharedLinkOnFolderRequestBody } from '../managers/sharedLinksFolders.js';
import { deserializeUpdateSharedLinkOnFolderRequestBody } from '../managers/sharedLinksFolders.js';
import { serializeUpdateSharedLinkOnFolderRequestBodySharedLinkField } from '../managers/sharedLinksFolders.js';
import { deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkField } from '../managers/sharedLinksFolders.js';
import { serializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField } from '../managers/sharedLinksFolders.js';
import { deserializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField } from '../managers/sharedLinksFolders.js';
import { serializeRemoveSharedLinkFromFolderRequestBody } from '../managers/sharedLinksFolders.js';
import { deserializeRemoveSharedLinkFromFolderRequestBody } from '../managers/sharedLinksFolders.js';
import { FindFolderForSharedLinkHeadersInput } from '../managers/sharedLinksFolders.js';
import { BoxClient } from '../client.js';
import { FolderFull } from '../schemas/folderFull.js';
import { CreateFolderRequestBody } from '../managers/folders.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.js';
import { AddShareLinkToFolderRequestBody } from '../managers/sharedLinksFolders.js';
import { AddShareLinkToFolderRequestBodySharedLinkField } from '../managers/sharedLinksFolders.js';
import { AddShareLinkToFolderRequestBodySharedLinkAccessField } from '../managers/sharedLinksFolders.js';
import { AddShareLinkToFolderQueryParams } from '../managers/sharedLinksFolders.js';
import { GetSharedLinkForFolderQueryParams } from '../managers/sharedLinksFolders.js';
import { FindFolderForSharedLinkQueryParams } from '../managers/sharedLinksFolders.js';
import { FindFolderForSharedLinkHeaders } from '../managers/sharedLinksFolders.js';
import { UpdateSharedLinkOnFolderRequestBody } from '../managers/sharedLinksFolders.js';
import { UpdateSharedLinkOnFolderRequestBodySharedLinkField } from '../managers/sharedLinksFolders.js';
import { UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField } from '../managers/sharedLinksFolders.js';
import { UpdateSharedLinkOnFolderQueryParams } from '../managers/sharedLinksFolders.js';
import { RemoveSharedLinkFromFolderRequestBody } from '../managers/sharedLinksFolders.js';
import { RemoveSharedLinkFromFolderQueryParams } from '../managers/sharedLinksFolders.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { getDefaultClientWithUserSubject } from './commons.js';
import { createNull } from '../internal/utils.js';
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
    { fields: 'shared_link' } satisfies AddShareLinkToFolderQueryParams
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
          '&shared_link_password=Secret123@'
        ) as string,
      } satisfies FindFolderForSharedLinkHeadersInput
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
          '&shared_link_password=incorrectPassword'
        ) as string,
      } satisfies FindFolderForSharedLinkHeadersInput
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
      { fields: 'shared_link' } satisfies UpdateSharedLinkOnFolderQueryParams
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
    { fields: 'shared_link' } satisfies RemoveSharedLinkFromFolderQueryParams
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

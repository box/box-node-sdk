import { serializeFiles } from '../schemas/files.js';
import { deserializeFiles } from '../schemas/files.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { serializeAddShareLinkToFileRequestBody } from '../managers/sharedLinksFiles.js';
import { deserializeAddShareLinkToFileRequestBody } from '../managers/sharedLinksFiles.js';
import { serializeAddShareLinkToFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.js';
import { deserializeAddShareLinkToFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.js';
import { serializeAddShareLinkToFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.js';
import { deserializeAddShareLinkToFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.js';
import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeUpdateSharedLinkOnFileRequestBody } from '../managers/sharedLinksFiles.js';
import { deserializeUpdateSharedLinkOnFileRequestBody } from '../managers/sharedLinksFiles.js';
import { serializeUpdateSharedLinkOnFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.js';
import { deserializeUpdateSharedLinkOnFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.js';
import { serializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.js';
import { deserializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.js';
import { serializeRemoveSharedLinkFromFileRequestBody } from '../managers/sharedLinksFiles.js';
import { deserializeRemoveSharedLinkFromFileRequestBody } from '../managers/sharedLinksFiles.js';
import { FindFileForSharedLinkHeadersInput } from '../managers/sharedLinksFiles.js';
import { BoxClient } from '../client.js';
import { Files } from '../schemas/files.js';
import { UploadFileRequestBody } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { AddShareLinkToFileRequestBody } from '../managers/sharedLinksFiles.js';
import { AddShareLinkToFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.js';
import { AddShareLinkToFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.js';
import { AddShareLinkToFileQueryParams } from '../managers/sharedLinksFiles.js';
import { FileFull } from '../schemas/fileFull.js';
import { GetSharedLinkForFileQueryParams } from '../managers/sharedLinksFiles.js';
import { FindFileForSharedLinkQueryParams } from '../managers/sharedLinksFiles.js';
import { FindFileForSharedLinkHeaders } from '../managers/sharedLinksFiles.js';
import { UpdateSharedLinkOnFileRequestBody } from '../managers/sharedLinksFiles.js';
import { UpdateSharedLinkOnFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.js';
import { UpdateSharedLinkOnFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.js';
import { UpdateSharedLinkOnFileQueryParams } from '../managers/sharedLinksFiles.js';
import { RemoveSharedLinkFromFileRequestBody } from '../managers/sharedLinksFiles.js';
import { RemoveSharedLinkFromFileQueryParams } from '../managers/sharedLinksFiles.js';
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
test('testSharedLinksFiles', async function testSharedLinksFiles(): Promise<any> {
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: getUuid(),
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: generateByteStream(10),
  } satisfies UploadFileRequestBody);
  const fileId: string = uploadedFiles.entries![0].id;
  await client.sharedLinksFiles.addShareLinkToFile(
    fileId,
    {
      sharedLink: {
        access: 'open' as AddShareLinkToFileRequestBodySharedLinkAccessField,
        password: 'Secret123@',
      } satisfies AddShareLinkToFileRequestBodySharedLinkField,
    } satisfies AddShareLinkToFileRequestBody,
    { fields: 'shared_link' } satisfies AddShareLinkToFileQueryParams
  );
  const fileFromApi: FileFull =
    await client.sharedLinksFiles.getSharedLinkForFile(fileId, {
      fields: 'shared_link',
    } satisfies GetSharedLinkForFileQueryParams);
  if (!((toString(fileFromApi.sharedLink!.access) as string) == 'open')) {
    throw new Error('Assertion failed');
  }
  const userId: string = getEnvVar('USER_ID');
  const userClient: BoxClient = getDefaultClientWithUserSubject(userId);
  const fileFromSharedLinkPassword: FileFull =
    await userClient.sharedLinksFiles.findFileForSharedLink(
      {} satisfies FindFileForSharedLinkQueryParams,
      {
        boxapi: ''.concat(
          'shared_link=',
          fileFromApi.sharedLink!.url,
          '&shared_link_password=Secret123@'
        ) as string,
      } satisfies FindFileForSharedLinkHeadersInput
    );
  if (!(fileId == fileFromSharedLinkPassword.id)) {
    throw new Error('Assertion failed');
  }
  await expect(async () => {
    await userClient.sharedLinksFiles.findFileForSharedLink(
      {} satisfies FindFileForSharedLinkQueryParams,
      {
        boxapi: ''.concat(
          'shared_link=',
          fileFromApi.sharedLink!.url,
          '&shared_link_password=incorrectPassword'
        ) as string,
      } satisfies FindFileForSharedLinkHeadersInput
    );
  }).rejects.toThrow();
  const updatedFile: FileFull =
    await client.sharedLinksFiles.updateSharedLinkOnFile(
      fileId,
      {
        sharedLink: {
          access:
            'collaborators' as UpdateSharedLinkOnFileRequestBodySharedLinkAccessField,
        } satisfies UpdateSharedLinkOnFileRequestBodySharedLinkField,
      } satisfies UpdateSharedLinkOnFileRequestBody,
      { fields: 'shared_link' } satisfies UpdateSharedLinkOnFileQueryParams
    );
  if (
    !((toString(updatedFile.sharedLink!.access) as string) == 'collaborators')
  ) {
    throw new Error('Assertion failed');
  }
  await client.sharedLinksFiles.removeSharedLinkFromFile(
    fileId,
    { sharedLink: createNull() } satisfies RemoveSharedLinkFromFileRequestBody,
    { fields: 'shared_link' } satisfies RemoveSharedLinkFromFileQueryParams
  );
  const fileFromApiAfterRemove: FileFull =
    await client.sharedLinksFiles.getSharedLinkForFile(fileId, {
      fields: 'shared_link',
    } satisfies GetSharedLinkForFileQueryParams);
  if (!(fileFromApiAfterRemove.sharedLink == void 0)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(fileId);
});
export {};

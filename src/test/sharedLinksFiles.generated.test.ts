import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeAddShareLinkToFileRequestBody } from '../managers/sharedLinksFiles.generated.js';
import { deserializeAddShareLinkToFileRequestBody } from '../managers/sharedLinksFiles.generated.js';
import { serializeAddShareLinkToFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.generated.js';
import { deserializeAddShareLinkToFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.generated.js';
import { serializeAddShareLinkToFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.generated.js';
import { deserializeAddShareLinkToFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeUpdateSharedLinkOnFileRequestBody } from '../managers/sharedLinksFiles.generated.js';
import { deserializeUpdateSharedLinkOnFileRequestBody } from '../managers/sharedLinksFiles.generated.js';
import { serializeUpdateSharedLinkOnFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.generated.js';
import { deserializeUpdateSharedLinkOnFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.generated.js';
import { serializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.generated.js';
import { deserializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.generated.js';
import { serializeRemoveSharedLinkFromFileRequestBody } from '../managers/sharedLinksFiles.generated.js';
import { deserializeRemoveSharedLinkFromFileRequestBody } from '../managers/sharedLinksFiles.generated.js';
import { FindFileForSharedLinkHeadersInput } from '../managers/sharedLinksFiles.generated.js';
import { BoxClient } from '../client.generated.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { AddShareLinkToFileRequestBody } from '../managers/sharedLinksFiles.generated.js';
import { AddShareLinkToFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.generated.js';
import { AddShareLinkToFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.generated.js';
import { AddShareLinkToFileQueryParams } from '../managers/sharedLinksFiles.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { GetSharedLinkForFileQueryParams } from '../managers/sharedLinksFiles.generated.js';
import { FindFileForSharedLinkQueryParams } from '../managers/sharedLinksFiles.generated.js';
import { FindFileForSharedLinkHeaders } from '../managers/sharedLinksFiles.generated.js';
import { UpdateSharedLinkOnFileRequestBody } from '../managers/sharedLinksFiles.generated.js';
import { UpdateSharedLinkOnFileRequestBodySharedLinkField } from '../managers/sharedLinksFiles.generated.js';
import { UpdateSharedLinkOnFileRequestBodySharedLinkAccessField } from '../managers/sharedLinksFiles.generated.js';
import { UpdateSharedLinkOnFileQueryParams } from '../managers/sharedLinksFiles.generated.js';
import { RemoveSharedLinkFromFileRequestBody } from '../managers/sharedLinksFiles.generated.js';
import { RemoveSharedLinkFromFileQueryParams } from '../managers/sharedLinksFiles.generated.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
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
    { fields: 'shared_link' } satisfies AddShareLinkToFileQueryParams,
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
          '&shared_link_password=Secret123@',
        ) as string,
      } satisfies FindFileForSharedLinkHeadersInput,
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
          '&shared_link_password=incorrectPassword',
        ) as string,
      } satisfies FindFileForSharedLinkHeadersInput,
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
      { fields: 'shared_link' } satisfies UpdateSharedLinkOnFileQueryParams,
    );
  if (
    !((toString(updatedFile.sharedLink!.access) as string) == 'collaborators')
  ) {
    throw new Error('Assertion failed');
  }
  await client.sharedLinksFiles.removeSharedLinkFromFile(
    fileId,
    { sharedLink: createNull() } satisfies RemoveSharedLinkFromFileRequestBody,
    { fields: 'shared_link' } satisfies RemoveSharedLinkFromFileQueryParams,
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

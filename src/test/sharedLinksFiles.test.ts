import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeAddShareLinkToFileRequestBody } from '@/managers/sharedLinksFiles';
import { deserializeAddShareLinkToFileRequestBody } from '@/managers/sharedLinksFiles';
import { serializeAddShareLinkToFileRequestBodySharedLinkField } from '@/managers/sharedLinksFiles';
import { deserializeAddShareLinkToFileRequestBodySharedLinkField } from '@/managers/sharedLinksFiles';
import { serializeAddShareLinkToFileRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFiles';
import { deserializeAddShareLinkToFileRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFiles';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeUpdateSharedLinkOnFileRequestBody } from '@/managers/sharedLinksFiles';
import { deserializeUpdateSharedLinkOnFileRequestBody } from '@/managers/sharedLinksFiles';
import { serializeUpdateSharedLinkOnFileRequestBodySharedLinkField } from '@/managers/sharedLinksFiles';
import { deserializeUpdateSharedLinkOnFileRequestBodySharedLinkField } from '@/managers/sharedLinksFiles';
import { serializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFiles';
import { deserializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFiles';
import { serializeRemoveSharedLinkFromFileRequestBody } from '@/managers/sharedLinksFiles';
import { deserializeRemoveSharedLinkFromFileRequestBody } from '@/managers/sharedLinksFiles';
import { FindFileForSharedLinkHeadersInput } from '@/managers/sharedLinksFiles';
import { BoxClient } from '@/client';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { AddShareLinkToFileRequestBody } from '@/managers/sharedLinksFiles';
import { AddShareLinkToFileRequestBodySharedLinkField } from '@/managers/sharedLinksFiles';
import { AddShareLinkToFileRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFiles';
import { AddShareLinkToFileQueryParams } from '@/managers/sharedLinksFiles';
import { FileFull } from '@/schemas/fileFull';
import { GetSharedLinkForFileQueryParams } from '@/managers/sharedLinksFiles';
import { FindFileForSharedLinkQueryParams } from '@/managers/sharedLinksFiles';
import { FindFileForSharedLinkHeaders } from '@/managers/sharedLinksFiles';
import { UpdateSharedLinkOnFileRequestBody } from '@/managers/sharedLinksFiles';
import { UpdateSharedLinkOnFileRequestBodySharedLinkField } from '@/managers/sharedLinksFiles';
import { UpdateSharedLinkOnFileRequestBodySharedLinkAccessField } from '@/managers/sharedLinksFiles';
import { UpdateSharedLinkOnFileQueryParams } from '@/managers/sharedLinksFiles';
import { RemoveSharedLinkFromFileRequestBody } from '@/managers/sharedLinksFiles';
import { RemoveSharedLinkFromFileQueryParams } from '@/managers/sharedLinksFiles';
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

import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeGetFileThumbnailUrlExtension } from '../managers/files.generated.js';
import { deserializeGetFileThumbnailUrlExtension } from '../managers/files.generated.js';
import { serializeGetFileThumbnailByIdExtension } from '../managers/files.generated.js';
import { deserializeGetFileThumbnailByIdExtension } from '../managers/files.generated.js';
import { serializeTrashFile } from '../schemas/trashFile.generated.js';
import { deserializeTrashFile } from '../schemas/trashFile.generated.js';
import { serializeUpdateFileByIdRequestBody } from '../managers/files.generated.js';
import { deserializeUpdateFileByIdRequestBody } from '../managers/files.generated.js';
import { serializeUpdateFileByIdRequestBodyLockField } from '../managers/files.generated.js';
import { deserializeUpdateFileByIdRequestBodyLockField } from '../managers/files.generated.js';
import { serializeUpdateFileByIdRequestBodyLockAccessField } from '../managers/files.generated.js';
import { deserializeUpdateFileByIdRequestBodyLockAccessField } from '../managers/files.generated.js';
import { serializeCopyFileRequestBody } from '../managers/files.generated.js';
import { deserializeCopyFileRequestBody } from '../managers/files.generated.js';
import { serializeCopyFileRequestBodyParentField } from '../managers/files.generated.js';
import { deserializeCopyFileRequestBodyParentField } from '../managers/files.generated.js';
import { GetFileByIdOptionalsInput } from '../managers/files.generated.js';
import { UpdateFileByIdOptionalsInput } from '../managers/files.generated.js';
import { GetFileByIdOptionals } from '../managers/files.generated.js';
import { UpdateFileByIdOptionals } from '../managers/files.generated.js';
import { BoxClient } from '../client.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { GetFileThumbnailUrlExtension } from '../managers/files.generated.js';
import { Buffer } from '../internal/utils.js';
import { GetFileThumbnailByIdExtension } from '../managers/files.generated.js';
import { GetFileByIdQueryParams } from '../managers/files.generated.js';
import { GetFileByIdHeaders } from '../managers/files.generated.js';
import { TrashFile } from '../schemas/trashFile.generated.js';
import { UpdateFileByIdRequestBody } from '../managers/files.generated.js';
import { UpdateFileByIdRequestBodyLockField } from '../managers/files.generated.js';
import { UpdateFileByIdRequestBodyLockAccessField } from '../managers/files.generated.js';
import { UpdateFileByIdQueryParams } from '../managers/files.generated.js';
import { CopyFileRequestBody } from '../managers/files.generated.js';
import { CopyFileRequestBodyParentField } from '../managers/files.generated.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { readByteStream } from '../internal/utils.js';
import { generateByteStreamFromBuffer } from '../internal/utils.js';
import { generateByteBuffer } from '../internal/utils.js';
import { bufferEquals } from '../internal/utils.js';
import { ByteStream } from '../internal/utils.js';
import { createNull } from '../internal/utils.js';
import { uploadNewFile } from './commons.generated.js';
import { getDefaultClient } from './commons.generated.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
export async function uploadFile(
  fileName: string,
  fileStream: ByteStream,
): Promise<FileFull> {
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: fileName,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: fileStream,
  } satisfies UploadFileRequestBody);
  return uploadedFiles.entries![0];
}
test('testGetFileThumbnailUrl', async function testGetFileThumbnailUrl(): Promise<any> {
  const thumbnailFileName: string = getUuid();
  const thumbnailContentStream: ByteStream = generateByteStream(1024 * 1024);
  const thumbnailFile: FileFull = await uploadFile(
    thumbnailFileName,
    thumbnailContentStream,
  );
  const downloadUrl: string = await client.files.getFileThumbnailUrl(
    thumbnailFile.id,
    'png' as GetFileThumbnailUrlExtension,
  );
  if (!!(downloadUrl == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!(downloadUrl.includes('https://') as boolean)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(thumbnailFile.id);
});
test('testGetFileThumbnail', async function testGetFileThumbnail(): Promise<any> {
  const thumbnailFileName: string = getUuid();
  const thumbnailBuffer: Buffer = generateByteBuffer(1024 * 1024);
  const thumbnailContentStream: ByteStream =
    generateByteStreamFromBuffer(thumbnailBuffer);
  const thumbnailFile: FileFull = await uploadFile(
    thumbnailFileName,
    thumbnailContentStream,
  );
  const thumbnail: undefined | ByteStream =
    await client.files.getFileThumbnailById(
      thumbnailFile.id,
      'png' as GetFileThumbnailByIdExtension,
    );
  if (
    !!(bufferEquals(await readByteStream(thumbnail!), thumbnailBuffer) == true)
  ) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(thumbnailFile.id);
});
test('testGetFileFullExtraFields', async function testGetFileFullExtraFields(): Promise<any> {
  const newFileName: string = getUuid();
  const fileStream: ByteStream = generateByteStream(1024 * 1024);
  const uploadedFile: FileFull = await uploadFile(newFileName, fileStream);
  const file: FileFull = await client.files.getFileById(uploadedFile.id, {
    queryParams: {
      fields: ['is_externally_owned' as string, 'has_collaborations' as string],
    } satisfies GetFileByIdQueryParams,
  } satisfies GetFileByIdOptionalsInput);
  if (!(file.isExternallyOwned == false)) {
    throw new Error('Assertion failed');
  }
  if (!(file.hasCollaborations == false)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(file.id);
});
test('testCreateGetAndDeleteFile', async function testCreateGetAndDeleteFile(): Promise<any> {
  const newFileName: string = getUuid();
  const updatedContentStream: ByteStream = generateByteStream(1024 * 1024);
  const uploadedFile: FileFull = await uploadFile(
    newFileName,
    updatedContentStream,
  );
  const file: FileFull = await client.files.getFileById(uploadedFile.id);
  await expect(async () => {
    await client.files.getFileById(uploadedFile.id, {
      queryParams: {
        fields: ['name' as string],
      } satisfies GetFileByIdQueryParams,
      headers: new GetFileByIdHeaders({
        extraHeaders: { ['if-none-match']: file.etag! },
      }),
    } satisfies GetFileByIdOptionalsInput);
  }).rejects.toThrow();
  if (!(file.name == newFileName)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(uploadedFile.id);
  const trashedFile: TrashFile = await client.trashedFiles.getTrashedFileById(
    uploadedFile.id,
  );
  if (!(file.id == trashedFile.id)) {
    throw new Error('Assertion failed');
  }
});
test('testUpdateFile', async function testUpdateFile(): Promise<any> {
  const fileToUpdate: FileFull = await uploadNewFile();
  const updatedName: string = getUuid();
  const updatedFile: FileFull = await client.files.updateFileById(
    fileToUpdate.id,
    {
      requestBody: {
        name: updatedName,
        description: 'Updated description',
      } satisfies UpdateFileByIdRequestBody,
    } satisfies UpdateFileByIdOptionalsInput,
  );
  if (!(updatedFile.name == updatedName)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedFile.description == 'Updated description')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(updatedFile.id);
});
test('testFileLock', async function testFileLock(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  const fileWithLock: FileFull = await client.files.updateFileById(file.id, {
    requestBody: {
      lock: {
        access: 'lock' as UpdateFileByIdRequestBodyLockAccessField,
      } satisfies UpdateFileByIdRequestBodyLockField,
    } satisfies UpdateFileByIdRequestBody,
    queryParams: {
      fields: ['lock' as string],
    } satisfies UpdateFileByIdQueryParams,
  } satisfies UpdateFileByIdOptionalsInput);
  if (!!(fileWithLock.lock == void 0)) {
    throw new Error('Assertion failed');
  }
  const fileWithoutLock: FileFull = await client.files.updateFileById(file.id, {
    requestBody: { lock: createNull() } satisfies UpdateFileByIdRequestBody,
    queryParams: {
      fields: ['lock' as string],
    } satisfies UpdateFileByIdQueryParams,
  } satisfies UpdateFileByIdOptionalsInput);
  if (!(fileWithoutLock.lock == void 0)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(file.id);
});
test('testCopyFile', async function testCopyFile(): Promise<any> {
  const fileOrigin: FileFull = await uploadNewFile();
  const copiedFileName: string = getUuid();
  const copiedFile: FileFull = await client.files.copyFile(fileOrigin.id, {
    parent: { id: '0' } satisfies CopyFileRequestBodyParentField,
    name: copiedFileName,
  } satisfies CopyFileRequestBody);
  if (!(copiedFile.parent!.id == '0')) {
    throw new Error('Assertion failed');
  }
  if (!(copiedFile.name == copiedFileName)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(fileOrigin.id);
  await client.files.deleteFileById(copiedFile.id);
});
export {};

import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeGetFileThumbnailUrlExtension } from '@/managers/files';
import { deserializeGetFileThumbnailUrlExtension } from '@/managers/files';
import { serializeGetFileThumbnailByIdExtension } from '@/managers/files';
import { deserializeGetFileThumbnailByIdExtension } from '@/managers/files';
import { serializeTrashFile } from '@/schemas/trashFile';
import { deserializeTrashFile } from '@/schemas/trashFile';
import { serializeUpdateFileByIdRequestBody } from '@/managers/files';
import { deserializeUpdateFileByIdRequestBody } from '@/managers/files';
import { serializeUpdateFileByIdRequestBodyLockField } from '@/managers/files';
import { deserializeUpdateFileByIdRequestBodyLockField } from '@/managers/files';
import { serializeUpdateFileByIdRequestBodyLockAccessField } from '@/managers/files';
import { deserializeUpdateFileByIdRequestBodyLockAccessField } from '@/managers/files';
import { serializeCopyFileRequestBody } from '@/managers/files';
import { deserializeCopyFileRequestBody } from '@/managers/files';
import { serializeCopyFileRequestBodyParentField } from '@/managers/files';
import { deserializeCopyFileRequestBodyParentField } from '@/managers/files';
import { GetFileByIdOptionalsInput } from '@/managers/files';
import { UpdateFileByIdOptionalsInput } from '@/managers/files';
import { GetFileByIdOptionals } from '@/managers/files';
import { UpdateFileByIdOptionals } from '@/managers/files';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { GetFileThumbnailUrlExtension } from '@/managers/files';
import { Buffer } from '@/internal/utils';
import { GetFileThumbnailByIdExtension } from '@/managers/files';
import { GetFileByIdQueryParams } from '@/managers/files';
import { GetFileByIdHeaders } from '@/managers/files';
import { TrashFile } from '@/schemas/trashFile';
import { UpdateFileByIdRequestBody } from '@/managers/files';
import { UpdateFileByIdRequestBodyLockField } from '@/managers/files';
import { UpdateFileByIdRequestBodyLockAccessField } from '@/managers/files';
import { UpdateFileByIdQueryParams } from '@/managers/files';
import { CopyFileRequestBody } from '@/managers/files';
import { CopyFileRequestBodyParentField } from '@/managers/files';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { readByteStream } from '@/internal/utils';
import { generateByteStreamFromBuffer } from '@/internal/utils';
import { generateByteBuffer } from '@/internal/utils';
import { bufferEquals } from '@/internal/utils';
import { ByteStream } from '@/internal/utils';
import { createNull } from '@/internal/utils';
import { uploadNewFile } from './commons';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
      fields: ['is_externally_owned', 'has_collaborations'],
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
      queryParams: { fields: ['name'] } satisfies GetFileByIdQueryParams,
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
    queryParams: { fields: ['lock'] } satisfies UpdateFileByIdQueryParams,
  } satisfies UpdateFileByIdOptionalsInput);
  if (!!(fileWithLock.lock == void 0)) {
    throw new Error('Assertion failed');
  }
  const fileWithoutLock: FileFull = await client.files.updateFileById(file.id, {
    requestBody: { lock: createNull() } satisfies UpdateFileByIdRequestBody,
    queryParams: { fields: ['lock'] } satisfies UpdateFileByIdQueryParams,
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

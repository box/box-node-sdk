import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeUploadFileVersionRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileVersionRequestBodyAttributesField } from '@/managers/uploads';
import { serializeFileVersions } from '@/schemas/fileVersions';
import { deserializeFileVersions } from '@/schemas/fileVersions';
import { serializeFileVersionFull } from '@/schemas/fileVersionFull';
import { deserializeFileVersionFull } from '@/schemas/fileVersionFull';
import { serializePromoteFileVersionRequestBody } from '@/managers/fileVersions';
import { deserializePromoteFileVersionRequestBody } from '@/managers/fileVersions';
import { serializePromoteFileVersionRequestBodyTypeField } from '@/managers/fileVersions';
import { deserializePromoteFileVersionRequestBodyTypeField } from '@/managers/fileVersions';
import { serializeUpdateFileVersionByIdRequestBody } from '@/managers/fileVersions';
import { deserializeUpdateFileVersionByIdRequestBody } from '@/managers/fileVersions';
import { PromoteFileVersionOptionalsInput } from '@/managers/fileVersions';
import { GetFileVersionByIdOptionalsInput } from '@/managers/fileVersions';
import { UpdateFileVersionByIdOptionalsInput } from '@/managers/fileVersions';
import { PromoteFileVersionOptionals } from '@/managers/fileVersions';
import { GetFileVersionByIdOptionals } from '@/managers/fileVersions';
import { UpdateFileVersionByIdOptionals } from '@/managers/fileVersions';
import { BoxClient } from '@/client';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { UploadFileVersionRequestBody } from '@/managers/uploads';
import { UploadFileVersionRequestBodyAttributesField } from '@/managers/uploads';
import { FileVersions } from '@/schemas/fileVersions';
import { FileVersionFull } from '@/schemas/fileVersionFull';
import { PromoteFileVersionRequestBody } from '@/managers/fileVersions';
import { PromoteFileVersionRequestBodyTypeField } from '@/managers/fileVersions';
import { GetFileVersionByIdQueryParams } from '@/managers/fileVersions';
import { UpdateFileVersionByIdRequestBody } from '@/managers/fileVersions';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { createNull } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testCreateListGetPromoteFileVersion', async function testCreateListGetPromoteFileVersion(): Promise<any> {
  const oldName: string = getUuid();
  const newName: string = getUuid();
  const files: Files = await client.uploads.uploadFile({
    attributes: {
      name: oldName,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: generateByteStream(10),
  } satisfies UploadFileRequestBody);
  const file: FileFull = files.entries![0];
  if (!(file.name == oldName)) {
    throw new Error('Assertion failed');
  }
  if (!(file.size == 10)) {
    throw new Error('Assertion failed');
  }
  const newFiles: Files = await client.uploads.uploadFileVersion(file.id, {
    attributes: {
      name: newName,
    } satisfies UploadFileVersionRequestBodyAttributesField,
    file: generateByteStream(20),
  } satisfies UploadFileVersionRequestBody);
  const newFile: FileFull = newFiles.entries![0];
  if (!(newFile.name == newName)) {
    throw new Error('Assertion failed');
  }
  if (!(newFile.size == 20)) {
    throw new Error('Assertion failed');
  }
  const fileVersions: FileVersions = await client.fileVersions.getFileVersions(
    file.id,
  );
  if (!(fileVersions.totalCount == 1)) {
    throw new Error('Assertion failed');
  }
  const fileVersion: FileVersionFull =
    await client.fileVersions.getFileVersionById(
      file.id,
      fileVersions.entries![0].id,
    );
  if (!(fileVersion.id == fileVersions.entries![0].id)) {
    throw new Error('Assertion failed');
  }
  await client.fileVersions.promoteFileVersion(file.id, {
    requestBody: {
      id: fileVersions.entries![0].id,
      type: 'file_version' as PromoteFileVersionRequestBodyTypeField,
    } satisfies PromoteFileVersionRequestBody,
  } satisfies PromoteFileVersionOptionalsInput);
  const fileWithPromotedVersion: FileFull = await client.files.getFileById(
    file.id,
  );
  if (!(fileWithPromotedVersion.name == oldName)) {
    throw new Error('Assertion failed');
  }
  if (!(fileWithPromotedVersion.size == 10)) {
    throw new Error('Assertion failed');
  }
  await client.fileVersions.deleteFileVersionById(file.id, fileVersion.id);
  await client.files.deleteFileById(file.id);
});
test('testRemoveAndRestoreFileVersion', async function testRemoveAndRestoreFileVersion(): Promise<any> {
  const oldName: string = getUuid();
  const newName: string = getUuid();
  const files: Files = await client.uploads.uploadFile({
    attributes: {
      name: oldName,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: generateByteStream(10),
  } satisfies UploadFileRequestBody);
  const file: FileFull = files.entries![0];
  await client.uploads.uploadFileVersion(file.id, {
    attributes: {
      name: newName,
    } satisfies UploadFileVersionRequestBodyAttributesField,
    file: generateByteStream(20),
  } satisfies UploadFileVersionRequestBody);
  const fileVersions: FileVersions = await client.fileVersions.getFileVersions(
    file.id,
  );
  if (!(fileVersions.totalCount == 1)) {
    throw new Error('Assertion failed');
  }
  const fileVersion: FileVersionFull =
    await client.fileVersions.getFileVersionById(
      file.id,
      fileVersions.entries![0].id,
      {
        queryParams: {
          fields: ['trashed_at', 'trashed_by', 'restored_at', 'restored_by'],
        } satisfies GetFileVersionByIdQueryParams,
      } satisfies GetFileVersionByIdOptionalsInput,
    );
  if (!(fileVersion.trashedAt == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!(fileVersion.trashedBy == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!(fileVersion.restoredAt == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!(fileVersion.restoredBy == void 0)) {
    throw new Error('Assertion failed');
  }
  await client.fileVersions.deleteFileVersionById(file.id, fileVersion.id);
  const deletedFileVersion: FileVersionFull =
    await client.fileVersions.getFileVersionById(
      file.id,
      fileVersions.entries![0].id,
      {
        queryParams: {
          fields: ['trashed_at', 'trashed_by', 'restored_at', 'restored_by'],
        } satisfies GetFileVersionByIdQueryParams,
      } satisfies GetFileVersionByIdOptionalsInput,
    );
  if (!!(deletedFileVersion.trashedAt == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(deletedFileVersion.trashedBy == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!(deletedFileVersion.restoredAt == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!(deletedFileVersion.restoredBy == void 0)) {
    throw new Error('Assertion failed');
  }
  await client.fileVersions.updateFileVersionById(file.id, fileVersion.id, {
    requestBody: {
      trashedAt: createNull(),
    } satisfies UpdateFileVersionByIdRequestBody,
  } satisfies UpdateFileVersionByIdOptionalsInput);
  const restoredFileVersion: FileVersionFull =
    await client.fileVersions.getFileVersionById(
      file.id,
      fileVersions.entries![0].id,
      {
        queryParams: {
          fields: ['trashed_at', 'trashed_by', 'restored_at', 'restored_by'],
        } satisfies GetFileVersionByIdQueryParams,
      } satisfies GetFileVersionByIdOptionalsInput,
    );
  if (!(restoredFileVersion.trashedAt == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!(restoredFileVersion.trashedBy == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(restoredFileVersion.restoredAt == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(restoredFileVersion.restoredBy == void 0)) {
    throw new Error('Assertion failed');
  }
  await client.fileVersions.deleteFileVersionById(file.id, fileVersion.id);
  await client.files.deleteFileById(file.id);
});
export {};

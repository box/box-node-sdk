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
import { serializeUploadWithPreflightCheckRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadWithPreflightCheckRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadWithPreflightCheckRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadWithPreflightCheckRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeUploadUrl } from '@/schemas/uploadUrl';
import { deserializeUploadUrl } from '@/schemas/uploadUrl';
import { serializePreflightFileUploadCheckRequestBody } from '@/managers/uploads';
import { deserializePreflightFileUploadCheckRequestBody } from '@/managers/uploads';
import { serializePreflightFileUploadCheckRequestBodyParentField } from '@/managers/uploads';
import { deserializePreflightFileUploadCheckRequestBodyParentField } from '@/managers/uploads';
import { UploadFileOptionalsInput } from '@/managers/uploads';
import { UploadFileOptionals } from '@/managers/uploads';
import { ByteStream } from '@/internal/utils';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { UploadFileVersionRequestBody } from '@/managers/uploads';
import { UploadFileVersionRequestBodyAttributesField } from '@/managers/uploads';
import { CancellationToken } from '@/internal/utils';
import { UploadFileQueryParams } from '@/managers/uploads';
import { UploadFileHeaders } from '@/managers/uploads';
import { UploadWithPreflightCheckRequestBody } from '@/managers/uploads';
import { UploadWithPreflightCheckRequestBodyAttributesField } from '@/managers/uploads';
import { UploadWithPreflightCheckRequestBodyAttributesParentField } from '@/managers/uploads';
import { UploadUrl } from '@/schemas/uploadUrl';
import { PreflightFileUploadCheckRequestBody } from '@/managers/uploads';
import { PreflightFileUploadCheckRequestBodyParentField } from '@/managers/uploads';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { createTokenAndCancelAfter } from '@/internal/utils';
import { BoxClient } from '@/client';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testUploadFileAndFileVersion', async function testUploadFileAndFileVersion(): Promise<any> {
  const newFileName: string = getUuid();
  const fileContentStream: ByteStream = generateByteStream(1024 * 1024);
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: newFileName,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: fileContentStream,
  } satisfies UploadFileRequestBody);
  const uploadedFile: FileFull = uploadedFiles.entries![0];
  if (!(uploadedFile.name == newFileName)) {
    throw new Error('Assertion failed');
  }
  const newFileVersionName: string = getUuid();
  const newFileContentStream: ByteStream = generateByteStream(1024 * 1024);
  const uploadedFilesVersion: Files = await client.uploads.uploadFileVersion(
    uploadedFile.id,
    {
      attributes: {
        name: newFileVersionName,
      } satisfies UploadFileVersionRequestBodyAttributesField,
      file: newFileContentStream,
    } satisfies UploadFileVersionRequestBody,
  );
  const newFileVersion: FileFull = uploadedFilesVersion.entries![0];
  if (!(newFileVersion.name == newFileVersionName)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(newFileVersion.id);
});
test('testRequestCancellation', async function testRequestCancellation(): Promise<any> {
  const fileSize: number = 1024 * 1024;
  const fileName: string = getUuid();
  const fileByteStream: ByteStream = generateByteStream(fileSize);
  const cancellationToken: CancellationToken = createTokenAndCancelAfter(1);
  await expect(async () => {
    await client.uploads.uploadFile(
      {
        attributes: {
          name: fileName,
          parent: {
            id: '0',
          } satisfies UploadFileRequestBodyAttributesParentField,
        } satisfies UploadFileRequestBodyAttributesField,
        file: fileByteStream,
      } satisfies UploadFileRequestBody,
      {
        queryParams: {} satisfies UploadFileQueryParams,
        headers: new UploadFileHeaders({}),
        cancellationToken: cancellationToken,
      } satisfies UploadFileOptionalsInput,
    );
  }).rejects.toThrow();
});
test('testUploadFileWithPreflightCheck', async function testUploadFileWithPreflightCheck(): Promise<any> {
  const newFileName: string = getUuid();
  const fileContentStream: ByteStream = generateByteStream(1024 * 1024);
  await expect(async () => {
    await client.uploads.uploadWithPreflightCheck({
      attributes: {
        name: newFileName,
        size: -1,
        parent: {
          id: '0',
        } satisfies UploadWithPreflightCheckRequestBodyAttributesParentField,
      } satisfies UploadWithPreflightCheckRequestBodyAttributesField,
      file: fileContentStream,
    } satisfies UploadWithPreflightCheckRequestBody);
  }).rejects.toThrow();
  const uploadFilesWithPreflight: Files =
    await client.uploads.uploadWithPreflightCheck({
      attributes: {
        name: newFileName,
        size: 1024 * 1024,
        parent: {
          id: '0',
        } satisfies UploadWithPreflightCheckRequestBodyAttributesParentField,
      } satisfies UploadWithPreflightCheckRequestBodyAttributesField,
      file: fileContentStream,
    } satisfies UploadWithPreflightCheckRequestBody);
  const file: FileFull = uploadFilesWithPreflight.entries![0];
  if (!(file.name == newFileName)) {
    throw new Error('Assertion failed');
  }
  if (!(file.size == 1024 * 1024)) {
    throw new Error('Assertion failed');
  }
  await expect(async () => {
    await client.uploads.uploadWithPreflightCheck({
      attributes: {
        name: newFileName,
        size: 1024 * 1024,
        parent: {
          id: '0',
        } satisfies UploadWithPreflightCheckRequestBodyAttributesParentField,
      } satisfies UploadWithPreflightCheckRequestBodyAttributesField,
      file: fileContentStream,
    } satisfies UploadWithPreflightCheckRequestBody);
  }).rejects.toThrow();
  await client.files.deleteFileById(file.id);
});
test('testPreflightCheck', async function testPreflightCheck(): Promise<any> {
  const newFileName: string = getUuid();
  const preflightCheckResult: UploadUrl =
    await client.uploads.preflightFileUploadCheck({
      name: newFileName,
      size: 1024 * 1024,
      parent: {
        id: '0',
      } satisfies PreflightFileUploadCheckRequestBodyParentField,
    } satisfies PreflightFileUploadCheckRequestBody);
  if (!!(preflightCheckResult.uploadUrl == '')) {
    throw new Error('Assertion failed');
  }
});
export {};

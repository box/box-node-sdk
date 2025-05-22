import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeUploadFileVersionRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileVersionRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadWithPreflightCheckRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadWithPreflightCheckRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadWithPreflightCheckRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadWithPreflightCheckRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeUploadUrl } from '../schemas/uploadUrl.generated.js';
import { deserializeUploadUrl } from '../schemas/uploadUrl.generated.js';
import { serializePreflightFileUploadCheckRequestBody } from '../managers/uploads.generated.js';
import { deserializePreflightFileUploadCheckRequestBody } from '../managers/uploads.generated.js';
import { serializePreflightFileUploadCheckRequestBodyParentField } from '../managers/uploads.generated.js';
import { deserializePreflightFileUploadCheckRequestBodyParentField } from '../managers/uploads.generated.js';
import { UploadFileOptionalsInput } from '../managers/uploads.generated.js';
import { UploadFileOptionals } from '../managers/uploads.generated.js';
import { ByteStream } from '../internal/utils.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { UploadFileVersionRequestBody } from '../managers/uploads.generated.js';
import { UploadFileVersionRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { CancellationToken } from '../internal/utils.js';
import { UploadFileQueryParams } from '../managers/uploads.generated.js';
import { UploadFileHeaders } from '../managers/uploads.generated.js';
import { UploadWithPreflightCheckRequestBody } from '../managers/uploads.generated.js';
import { UploadWithPreflightCheckRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadWithPreflightCheckRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { UploadUrl } from '../schemas/uploadUrl.generated.js';
import { PreflightFileUploadCheckRequestBody } from '../managers/uploads.generated.js';
import { PreflightFileUploadCheckRequestBodyParentField } from '../managers/uploads.generated.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { createTokenAndCancelAfter } from '../internal/utils.js';
import { BoxClient } from '../client.generated.js';
import { getDefaultClient } from './commons.generated.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

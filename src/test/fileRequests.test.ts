import { serializeFileRequest } from '@/schemas/fileRequest';
import { deserializeFileRequest } from '@/schemas/fileRequest';
import { serializeFileRequestCopyRequest } from '@/schemas/fileRequestCopyRequest';
import { deserializeFileRequestCopyRequest } from '@/schemas/fileRequestCopyRequest';
import { serializeFileRequestCopyRequestFolderField } from '@/schemas/fileRequestCopyRequest';
import { deserializeFileRequestCopyRequestFolderField } from '@/schemas/fileRequestCopyRequest';
import { serializeFileRequestCopyRequestFolderTypeField } from '@/schemas/fileRequestCopyRequest';
import { deserializeFileRequestCopyRequestFolderTypeField } from '@/schemas/fileRequestCopyRequest';
import { serializeFileRequestUpdateRequest } from '@/schemas/fileRequestUpdateRequest';
import { deserializeFileRequestUpdateRequest } from '@/schemas/fileRequestUpdateRequest';
import { BoxClient } from '@/client';
import { FileRequest } from '@/schemas/fileRequest';
import { FileRequestCopyRequest } from '@/schemas/fileRequestCopyRequest';
import { FileRequestCopyRequestFolderField } from '@/schemas/fileRequestCopyRequest';
import { FileRequestCopyRequestFolderTypeField } from '@/schemas/fileRequestCopyRequest';
import { FileRequestUpdateRequest } from '@/schemas/fileRequestUpdateRequest';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
test('testGetCopyUpdateDeleteFileRequest', async function testGetCopyUpdateDeleteFileRequest(): Promise<any> {
  const fileRequestId: string = getEnvVar('BOX_FILE_REQUEST_ID');
  const userId: string = getEnvVar('USER_ID');
  const client: BoxClient = getDefaultClientWithUserSubject(userId);
  const fileRequest: FileRequest =
    await client.fileRequests.getFileRequestById(fileRequestId);
  if (!(fileRequest.id == fileRequestId)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(fileRequest.type) as string) == 'file_request')) {
    throw new Error('Assertion failed');
  }
  const copiedFileRequest: FileRequest =
    await client.fileRequests.createFileRequestCopy(fileRequestId, {
      folder: {
        id: fileRequest.folder.id,
        type: 'folder' as FileRequestCopyRequestFolderTypeField,
      } satisfies FileRequestCopyRequestFolderField,
    } satisfies FileRequestCopyRequest);
  if (!!(copiedFileRequest.id == fileRequestId)) {
    throw new Error('Assertion failed');
  }
  if (!(copiedFileRequest.title == fileRequest.title)) {
    throw new Error('Assertion failed');
  }
  if (!(copiedFileRequest.description == fileRequest.description)) {
    throw new Error('Assertion failed');
  }
  const updatedFileRequest: FileRequest =
    await client.fileRequests.updateFileRequestById(copiedFileRequest.id, {
      title: 'updated title',
      description: 'updated description',
    } satisfies FileRequestUpdateRequest);
  if (!(updatedFileRequest.id == copiedFileRequest.id)) {
    throw new Error('Assertion failed');
  }
  if (!(updatedFileRequest.title == 'updated title')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedFileRequest.description == 'updated description')) {
    throw new Error('Assertion failed');
  }
  await client.fileRequests.deleteFileRequestById(updatedFileRequest.id);
  await expect(async () => {
    await client.fileRequests.getFileRequestById(updatedFileRequest.id);
  }).rejects.toThrow();
});
export {};

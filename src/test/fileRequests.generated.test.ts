import { serializeFileRequest } from '../schemas/fileRequest.generated.js';
import { deserializeFileRequest } from '../schemas/fileRequest.generated.js';
import { serializeFileRequestCopyRequest } from '../schemas/fileRequestCopyRequest.generated.js';
import { deserializeFileRequestCopyRequest } from '../schemas/fileRequestCopyRequest.generated.js';
import { serializeFileRequestCopyRequestFolderField } from '../schemas/fileRequestCopyRequest.generated.js';
import { deserializeFileRequestCopyRequestFolderField } from '../schemas/fileRequestCopyRequest.generated.js';
import { serializeFileRequestCopyRequestFolderTypeField } from '../schemas/fileRequestCopyRequest.generated.js';
import { deserializeFileRequestCopyRequestFolderTypeField } from '../schemas/fileRequestCopyRequest.generated.js';
import { serializeFileRequestUpdateRequest } from '../schemas/fileRequestUpdateRequest.generated.js';
import { deserializeFileRequestUpdateRequest } from '../schemas/fileRequestUpdateRequest.generated.js';
import { BoxClient } from '../client.generated.js';
import { FileRequest } from '../schemas/fileRequest.generated.js';
import { FileRequestCopyRequest } from '../schemas/fileRequestCopyRequest.generated.js';
import { FileRequestCopyRequestFolderField } from '../schemas/fileRequestCopyRequest.generated.js';
import { FileRequestCopyRequestFolderTypeField } from '../schemas/fileRequestCopyRequest.generated.js';
import { FileRequestUpdateRequest } from '../schemas/fileRequestUpdateRequest.generated.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

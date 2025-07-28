import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeTrashFile } from '../schemas/trashFile.generated.js';
import { deserializeTrashFile } from '../schemas/trashFile.generated.js';
import { serializeTrashFileRestored } from '../schemas/trashFileRestored.generated.js';
import { deserializeTrashFileRestored } from '../schemas/trashFileRestored.generated.js';
import { BoxClient } from '../client.generated.js';
import { ByteStream } from '../internal/utils.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { TrashFile } from '../schemas/trashFile.generated.js';
import { TrashFileRestored } from '../schemas/trashFileRestored.generated.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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
test('testTrashedFiles', async function testTrashedFiles(): Promise<any> {
  const fileSize: number = 1024 * 1024;
  const fileName: string = getUuid();
  const fileByteStream: ByteStream = generateByteStream(fileSize);
  const files: Files = await client.uploads.uploadFile({
    attributes: {
      name: fileName,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: fileByteStream,
  } satisfies UploadFileRequestBody);
  const file: FileFull = files.entries![0];
  await client.files.deleteFileById(file.id);
  const fromTrash: TrashFile = await client.trashedFiles.getTrashedFileById(
    file.id,
  );
  if (!(fromTrash.id == file.id)) {
    throw new Error('Assertion failed');
  }
  if (!(fromTrash.name == file.name)) {
    throw new Error('Assertion failed');
  }
  const fromApiAfterTrashed: FileFull = await client.files.getFileById(file.id);
  if (!((toString(fromApiAfterTrashed.itemStatus) as string) == 'trashed')) {
    throw new Error('Assertion failed');
  }
  const restoredFile: TrashFileRestored =
    await client.trashedFiles.restoreFileFromTrash(file.id);
  const fromApiAfterRestore: FileFull = await client.files.getFileById(file.id);
  if (!(restoredFile.id == fromApiAfterRestore.id)) {
    throw new Error('Assertion failed');
  }
  if (!(restoredFile.name == fromApiAfterRestore.name)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(fromApiAfterRestore.itemStatus) as string) == 'active')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(file.id);
  await client.trashedFiles.deleteTrashedFileById(file.id);
  await expect(async () => {
    await client.trashedFiles.getTrashedFileById(file.id);
  }).rejects.toThrow();
});
export {};

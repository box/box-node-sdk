import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeTrashFile } from '@/schemas/trashFile';
import { deserializeTrashFile } from '@/schemas/trashFile';
import { serializeTrashFileRestored } from '@/schemas/trashFileRestored';
import { deserializeTrashFileRestored } from '@/schemas/trashFileRestored';
import { BoxClient } from '@/client';
import { ByteStream } from '@/internal/utils';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { TrashFile } from '@/schemas/trashFile';
import { TrashFileRestored } from '@/schemas/trashFileRestored';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { getDefaultClient } from './commons';
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

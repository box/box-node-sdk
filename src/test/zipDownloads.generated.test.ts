import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeZipDownloadRequest } from '../schemas/zipDownloadRequest.generated.js';
import { deserializeZipDownloadRequest } from '../schemas/zipDownloadRequest.generated.js';
import { serializeZipDownloadRequestItemsField } from '../schemas/zipDownloadRequest.generated.js';
import { deserializeZipDownloadRequestItemsField } from '../schemas/zipDownloadRequest.generated.js';
import { serializeZipDownloadRequestItemsTypeField } from '../schemas/zipDownloadRequest.generated.js';
import { deserializeZipDownloadRequestItemsTypeField } from '../schemas/zipDownloadRequest.generated.js';
import { serializeZipDownload } from '../schemas/zipDownload.generated.js';
import { deserializeZipDownload } from '../schemas/zipDownload.generated.js';
import { serializeZipDownloadStatus } from '../schemas/zipDownloadStatus.generated.js';
import { deserializeZipDownloadStatus } from '../schemas/zipDownloadStatus.generated.js';
import { BoxClient } from '../client.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { ByteStream } from '../internal/utils.js';
import { ZipDownloadRequest } from '../schemas/zipDownloadRequest.generated.js';
import { ZipDownloadRequestItemsField } from '../schemas/zipDownloadRequest.generated.js';
import { ZipDownloadRequestItemsTypeField } from '../schemas/zipDownloadRequest.generated.js';
import { ZipDownload } from '../schemas/zipDownload.generated.js';
import { ZipDownloadStatus } from '../schemas/zipDownloadStatus.generated.js';
import { getDefaultClient } from './commons.generated.js';
import { uploadNewFile } from './commons.generated.js';
import { createNewFolder } from './commons.generated.js';
import { bufferEquals } from '../internal/utils.js';
import { readByteStream } from '../internal/utils.js';
import { generateByteBuffer } from '../internal/utils.js';
import { dateTimeToString } from '../internal/utils.js';
import { DateTime } from '../internal/utils.js';
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
test('testZipDownload', async function testZipDownload(): Promise<any> {
  const file1: FileFull = await uploadNewFile();
  const file2: FileFull = await uploadNewFile();
  const folder1: FolderFull = await createNewFolder();
  const zipStream: ByteStream = await client.zipDownloads.downloadZip({
    items: [
      {
        id: file1.id,
        type: 'file' as ZipDownloadRequestItemsTypeField,
      } satisfies ZipDownloadRequestItemsField,
      {
        id: file2.id,
        type: 'file' as ZipDownloadRequestItemsTypeField,
      } satisfies ZipDownloadRequestItemsField,
      {
        id: folder1.id,
        type: 'folder' as ZipDownloadRequestItemsTypeField,
      } satisfies ZipDownloadRequestItemsField,
    ],
    downloadFileName: 'zip',
  } satisfies ZipDownloadRequest);
  if (
    !(
      bufferEquals(await readByteStream(zipStream), generateByteBuffer(10)) ==
      false
    )
  ) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(file1.id);
  await client.files.deleteFileById(file2.id);
  await client.folders.deleteFolderById(folder1.id);
});
test('testManualZipDownloadAndCheckStatus', async function testManualZipDownloadAndCheckStatus(): Promise<any> {
  const file1: FileFull = await uploadNewFile();
  const file2: FileFull = await uploadNewFile();
  const folder1: FolderFull = await createNewFolder();
  const zipDownload: ZipDownload = await client.zipDownloads.createZipDownload({
    items: [
      {
        id: file1.id,
        type: 'file' as ZipDownloadRequestItemsTypeField,
      } satisfies ZipDownloadRequestItemsField,
      {
        id: file2.id,
        type: 'file' as ZipDownloadRequestItemsTypeField,
      } satisfies ZipDownloadRequestItemsField,
      {
        id: folder1.id,
        type: 'folder' as ZipDownloadRequestItemsTypeField,
      } satisfies ZipDownloadRequestItemsField,
    ],
    downloadFileName: 'zip',
  } satisfies ZipDownloadRequest);
  if (!!(zipDownload.downloadUrl == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(zipDownload.statusUrl == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(dateTimeToString(zipDownload.expiresAt!) == '')) {
    throw new Error('Assertion failed');
  }
  const zipStream: ByteStream = await client.zipDownloads.getZipDownloadContent(
    zipDownload.downloadUrl!,
  );
  if (
    !(
      bufferEquals(await readByteStream(zipStream), generateByteBuffer(10)) ==
      false
    )
  ) {
    throw new Error('Assertion failed');
  }
  const zipDownloadStatus: ZipDownloadStatus =
    await client.zipDownloads.getZipDownloadStatus(zipDownload.statusUrl!);
  if (!(zipDownloadStatus.totalFileCount == 2)) {
    throw new Error('Assertion failed');
  }
  if (!(zipDownloadStatus.downloadedFileCount == 2)) {
    throw new Error('Assertion failed');
  }
  if (!(zipDownloadStatus.skippedFileCount == 0)) {
    throw new Error('Assertion failed');
  }
  if (!(zipDownloadStatus.skippedFolderCount == 0)) {
    throw new Error('Assertion failed');
  }
  if (!!((toString(zipDownloadStatus.state) as string) == 'failed')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(file1.id);
  await client.files.deleteFileById(file2.id);
  await client.folders.deleteFolderById(folder1.id);
});
export {};

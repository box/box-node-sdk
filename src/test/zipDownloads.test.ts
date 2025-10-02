import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeZipDownloadRequest } from '@/schemas/zipDownloadRequest';
import { deserializeZipDownloadRequest } from '@/schemas/zipDownloadRequest';
import { serializeZipDownloadRequestItemsField } from '@/schemas/zipDownloadRequest';
import { deserializeZipDownloadRequestItemsField } from '@/schemas/zipDownloadRequest';
import { serializeZipDownloadRequestItemsTypeField } from '@/schemas/zipDownloadRequest';
import { deserializeZipDownloadRequestItemsTypeField } from '@/schemas/zipDownloadRequest';
import { serializeZipDownload } from '@/schemas/zipDownload';
import { deserializeZipDownload } from '@/schemas/zipDownload';
import { serializeZipDownloadStatus } from '@/schemas/zipDownloadStatus';
import { deserializeZipDownloadStatus } from '@/schemas/zipDownloadStatus';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { FolderFull } from '@/schemas/folderFull';
import { ByteStream } from '@/internal/utils';
import { ZipDownloadRequest } from '@/schemas/zipDownloadRequest';
import { ZipDownloadRequestItemsField } from '@/schemas/zipDownloadRequest';
import { ZipDownloadRequestItemsTypeField } from '@/schemas/zipDownloadRequest';
import { ZipDownload } from '@/schemas/zipDownload';
import { ZipDownloadStatus } from '@/schemas/zipDownloadStatus';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { createNewFolder } from './commons';
import { bufferEquals } from '@/internal/utils';
import { readByteStream } from '@/internal/utils';
import { generateByteBuffer } from '@/internal/utils';
import { dateTimeToString } from '@/internal/utils';
import { DateTime } from '@/internal/utils';
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

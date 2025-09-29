import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeWatermark } from '@/schemas/watermark';
import { deserializeWatermark } from '@/schemas/watermark';
import { serializeUpdateFileWatermarkRequestBody } from '@/managers/fileWatermarks';
import { deserializeUpdateFileWatermarkRequestBody } from '@/managers/fileWatermarks';
import { serializeUpdateFileWatermarkRequestBodyWatermarkField } from '@/managers/fileWatermarks';
import { deserializeUpdateFileWatermarkRequestBodyWatermarkField } from '@/managers/fileWatermarks';
import { serializeUpdateFileWatermarkRequestBodyWatermarkImprintField } from '@/managers/fileWatermarks';
import { deserializeUpdateFileWatermarkRequestBodyWatermarkImprintField } from '@/managers/fileWatermarks';
import { BoxClient } from '@/client';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { Watermark } from '@/schemas/watermark';
import { UpdateFileWatermarkRequestBody } from '@/managers/fileWatermarks';
import { UpdateFileWatermarkRequestBodyWatermarkField } from '@/managers/fileWatermarks';
import { UpdateFileWatermarkRequestBodyWatermarkImprintField } from '@/managers/fileWatermarks';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testCreateGetDeleteFileWatermark', async function testCreateGetDeleteFileWatermark(): Promise<any> {
  const fileName: string = ''.concat(getUuid(), '.txt') as string;
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: fileName,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: generateByteStream(10),
  } satisfies UploadFileRequestBody);
  const file: FileFull = uploadedFiles.entries![0];
  const createdWatermark: Watermark =
    await client.fileWatermarks.updateFileWatermark(file.id, {
      watermark: new UpdateFileWatermarkRequestBodyWatermarkField({
        imprint:
          'default' as UpdateFileWatermarkRequestBodyWatermarkImprintField,
      }),
    } satisfies UpdateFileWatermarkRequestBody);
  const watermark: Watermark = await client.fileWatermarks.getFileWatermark(
    file.id,
  );
  await client.fileWatermarks.deleteFileWatermark(file.id);
  await expect(async () => {
    await client.fileWatermarks.getFileWatermark(file.id);
  }).rejects.toThrow();
  await client.files.deleteFileById(file.id);
});
export {};

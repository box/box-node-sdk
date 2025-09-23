import { serializeFiles } from '../schemas/files.js';
import { deserializeFiles } from '../schemas/files.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeWatermark } from '../schemas/watermark.js';
import { deserializeWatermark } from '../schemas/watermark.js';
import { serializeUpdateFileWatermarkRequestBody } from '../managers/fileWatermarks.js';
import { deserializeUpdateFileWatermarkRequestBody } from '../managers/fileWatermarks.js';
import { serializeUpdateFileWatermarkRequestBodyWatermarkField } from '../managers/fileWatermarks.js';
import { deserializeUpdateFileWatermarkRequestBodyWatermarkField } from '../managers/fileWatermarks.js';
import { serializeUpdateFileWatermarkRequestBodyWatermarkImprintField } from '../managers/fileWatermarks.js';
import { deserializeUpdateFileWatermarkRequestBodyWatermarkImprintField } from '../managers/fileWatermarks.js';
import { BoxClient } from '../client.js';
import { Files } from '../schemas/files.js';
import { UploadFileRequestBody } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { FileFull } from '../schemas/fileFull.js';
import { Watermark } from '../schemas/watermark.js';
import { UpdateFileWatermarkRequestBody } from '../managers/fileWatermarks.js';
import { UpdateFileWatermarkRequestBodyWatermarkField } from '../managers/fileWatermarks.js';
import { UpdateFileWatermarkRequestBodyWatermarkImprintField } from '../managers/fileWatermarks.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

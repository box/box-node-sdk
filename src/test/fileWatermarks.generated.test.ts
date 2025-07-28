import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeWatermark } from '../schemas/watermark.generated.js';
import { deserializeWatermark } from '../schemas/watermark.generated.js';
import { serializeUpdateFileWatermarkRequestBody } from '../managers/fileWatermarks.generated.js';
import { deserializeUpdateFileWatermarkRequestBody } from '../managers/fileWatermarks.generated.js';
import { serializeUpdateFileWatermarkRequestBodyWatermarkField } from '../managers/fileWatermarks.generated.js';
import { deserializeUpdateFileWatermarkRequestBodyWatermarkField } from '../managers/fileWatermarks.generated.js';
import { serializeUpdateFileWatermarkRequestBodyWatermarkImprintField } from '../managers/fileWatermarks.generated.js';
import { deserializeUpdateFileWatermarkRequestBodyWatermarkImprintField } from '../managers/fileWatermarks.generated.js';
import { BoxClient } from '../client.generated.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { Watermark } from '../schemas/watermark.generated.js';
import { UpdateFileWatermarkRequestBody } from '../managers/fileWatermarks.generated.js';
import { UpdateFileWatermarkRequestBodyWatermarkField } from '../managers/fileWatermarks.generated.js';
import { UpdateFileWatermarkRequestBodyWatermarkImprintField } from '../managers/fileWatermarks.generated.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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

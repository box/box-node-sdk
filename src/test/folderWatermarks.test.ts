import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { serializeWatermark } from '../schemas/watermark.js';
import { deserializeWatermark } from '../schemas/watermark.js';
import { serializeUpdateFolderWatermarkRequestBody } from '../managers/folderWatermarks.js';
import { deserializeUpdateFolderWatermarkRequestBody } from '../managers/folderWatermarks.js';
import { serializeUpdateFolderWatermarkRequestBodyWatermarkField } from '../managers/folderWatermarks.js';
import { deserializeUpdateFolderWatermarkRequestBodyWatermarkField } from '../managers/folderWatermarks.js';
import { serializeUpdateFolderWatermarkRequestBodyWatermarkImprintField } from '../managers/folderWatermarks.js';
import { deserializeUpdateFolderWatermarkRequestBodyWatermarkImprintField } from '../managers/folderWatermarks.js';
import { BoxClient } from '../client.js';
import { FolderFull } from '../schemas/folderFull.js';
import { CreateFolderRequestBody } from '../managers/folders.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.js';
import { Watermark } from '../schemas/watermark.js';
import { UpdateFolderWatermarkRequestBody } from '../managers/folderWatermarks.js';
import { UpdateFolderWatermarkRequestBodyWatermarkField } from '../managers/folderWatermarks.js';
import { UpdateFolderWatermarkRequestBodyWatermarkImprintField } from '../managers/folderWatermarks.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testCreateGetDeleteFolderWatermark', async function testCreateGetDeleteFolderWatermark(): Promise<any> {
  const folderName: string = getUuid();
  const folder: FolderFull = await client.folders.createFolder({
    name: folderName,
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  const createdWatermark: Watermark =
    await client.folderWatermarks.updateFolderWatermark(folder.id, {
      watermark: new UpdateFolderWatermarkRequestBodyWatermarkField({
        imprint:
          'default' as UpdateFolderWatermarkRequestBodyWatermarkImprintField,
      }),
    } satisfies UpdateFolderWatermarkRequestBody);
  const watermark: Watermark = await client.folderWatermarks.getFolderWatermark(
    folder.id,
  );
  await client.folderWatermarks.deleteFolderWatermark(folder.id);
  await expect(async () => {
    await client.folderWatermarks.getFolderWatermark(folder.id);
  }).rejects.toThrow();
  await client.folders.deleteFolderById(folder.id);
});
export {};

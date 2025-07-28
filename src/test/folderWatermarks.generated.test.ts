import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeWatermark } from '../schemas/watermark.generated.js';
import { deserializeWatermark } from '../schemas/watermark.generated.js';
import { serializeUpdateFolderWatermarkRequestBody } from '../managers/folderWatermarks.generated.js';
import { deserializeUpdateFolderWatermarkRequestBody } from '../managers/folderWatermarks.generated.js';
import { serializeUpdateFolderWatermarkRequestBodyWatermarkField } from '../managers/folderWatermarks.generated.js';
import { deserializeUpdateFolderWatermarkRequestBodyWatermarkField } from '../managers/folderWatermarks.generated.js';
import { serializeUpdateFolderWatermarkRequestBodyWatermarkImprintField } from '../managers/folderWatermarks.generated.js';
import { deserializeUpdateFolderWatermarkRequestBodyWatermarkImprintField } from '../managers/folderWatermarks.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { CreateFolderRequestBody } from '../managers/folders.generated.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { Watermark } from '../schemas/watermark.generated.js';
import { UpdateFolderWatermarkRequestBody } from '../managers/folderWatermarks.generated.js';
import { UpdateFolderWatermarkRequestBodyWatermarkField } from '../managers/folderWatermarks.generated.js';
import { UpdateFolderWatermarkRequestBodyWatermarkImprintField } from '../managers/folderWatermarks.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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

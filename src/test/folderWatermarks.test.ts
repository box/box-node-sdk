import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeCreateFolderRequestBody } from '@/managers/folders';
import { deserializeCreateFolderRequestBody } from '@/managers/folders';
import { serializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { deserializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { serializeWatermark } from '@/schemas/watermark';
import { deserializeWatermark } from '@/schemas/watermark';
import { serializeUpdateFolderWatermarkRequestBody } from '@/managers/folderWatermarks';
import { deserializeUpdateFolderWatermarkRequestBody } from '@/managers/folderWatermarks';
import { serializeUpdateFolderWatermarkRequestBodyWatermarkField } from '@/managers/folderWatermarks';
import { deserializeUpdateFolderWatermarkRequestBodyWatermarkField } from '@/managers/folderWatermarks';
import { serializeUpdateFolderWatermarkRequestBodyWatermarkImprintField } from '@/managers/folderWatermarks';
import { deserializeUpdateFolderWatermarkRequestBodyWatermarkImprintField } from '@/managers/folderWatermarks';
import { BoxClient } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { CreateFolderRequestBody } from '@/managers/folders';
import { CreateFolderRequestBodyParentField } from '@/managers/folders';
import { Watermark } from '@/schemas/watermark';
import { UpdateFolderWatermarkRequestBody } from '@/managers/folderWatermarks';
import { UpdateFolderWatermarkRequestBodyWatermarkField } from '@/managers/folderWatermarks';
import { UpdateFolderWatermarkRequestBodyWatermarkImprintField } from '@/managers/folderWatermarks';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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

import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeItems } from '@/schemas/items';
import { deserializeItems } from '@/schemas/items';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { Items } from '@/schemas/items';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testListTrashedItems', async function testListTrashedItems(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  await client.files.deleteFileById(file.id);
  const trashedItems: Items = await client.trashedItems.getTrashedItems();
  if (!(trashedItems.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
});
export {};

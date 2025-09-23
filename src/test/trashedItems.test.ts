import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeItems } from '../schemas/items.js';
import { deserializeItems } from '../schemas/items.js';
import { BoxClient } from '../client.js';
import { FileFull } from '../schemas/fileFull.js';
import { Items } from '../schemas/items.js';
import { getDefaultClient } from './commons.js';
import { uploadNewFile } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

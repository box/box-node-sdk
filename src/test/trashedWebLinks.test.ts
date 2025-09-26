import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeWebLink } from '@/schemas/webLink';
import { deserializeWebLink } from '@/schemas/webLink';
import { serializeCreateWebLinkRequestBody } from '@/managers/webLinks';
import { deserializeCreateWebLinkRequestBody } from '@/managers/webLinks';
import { serializeCreateWebLinkRequestBodyParentField } from '@/managers/webLinks';
import { deserializeCreateWebLinkRequestBodyParentField } from '@/managers/webLinks';
import { serializeTrashWebLink } from '@/schemas/trashWebLink';
import { deserializeTrashWebLink } from '@/schemas/trashWebLink';
import { serializeTrashWebLinkRestored } from '@/schemas/trashWebLinkRestored';
import { deserializeTrashWebLinkRestored } from '@/schemas/trashWebLinkRestored';
import { BoxClient } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { WebLink } from '@/schemas/webLink';
import { CreateWebLinkRequestBody } from '@/managers/webLinks';
import { CreateWebLinkRequestBodyParentField } from '@/managers/webLinks';
import { TrashWebLink } from '@/schemas/trashWebLink';
import { TrashWebLinkRestored } from '@/schemas/trashWebLinkRestored';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
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
test('testTrashedWebLinks', async function testTrashedWebLinks(): Promise<any> {
  const url: string = 'https://www.box.com';
  const parent: FolderFull = await client.folders.getFolderById('0');
  const name: string = getUuid();
  const description: string = 'Weblink description';
  const weblink: WebLink = await client.webLinks.createWebLink({
    url: url,
    parent: { id: parent.id } satisfies CreateWebLinkRequestBodyParentField,
    name: name,
    description: description,
  } satisfies CreateWebLinkRequestBody);
  await client.webLinks.deleteWebLinkById(weblink.id);
  const fromTrash: TrashWebLink =
    await client.trashedWebLinks.getTrashedWebLinkById(weblink.id);
  if (!(fromTrash.id == weblink.id)) {
    throw new Error('Assertion failed');
  }
  if (!(fromTrash.name == weblink.name)) {
    throw new Error('Assertion failed');
  }
  const fromApiAfterTrashed: WebLink = await client.webLinks.getWebLinkById(
    weblink.id,
  );
  if (!((toString(fromApiAfterTrashed.itemStatus) as string) == 'trashed')) {
    throw new Error('Assertion failed');
  }
  const restoredWeblink: TrashWebLinkRestored =
    await client.trashedWebLinks.restoreWeblinkFromTrash(weblink.id);
  const fromApi: WebLink = await client.webLinks.getWebLinkById(weblink.id);
  if (!(restoredWeblink.id == fromApi.id)) {
    throw new Error('Assertion failed');
  }
  if (!(restoredWeblink.name == fromApi.name)) {
    throw new Error('Assertion failed');
  }
  await client.webLinks.deleteWebLinkById(weblink.id);
  await client.trashedWebLinks.deleteTrashedWebLinkById(weblink.id);
  await expect(async () => {
    await client.trashedWebLinks.getTrashedWebLinkById(weblink.id);
  }).rejects.toThrow();
});
export {};

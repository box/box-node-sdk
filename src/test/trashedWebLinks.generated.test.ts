import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeWebLink } from '../schemas/webLink.generated.js';
import { deserializeWebLink } from '../schemas/webLink.generated.js';
import { serializeCreateWebLinkRequestBody } from '../managers/webLinks.generated.js';
import { deserializeCreateWebLinkRequestBody } from '../managers/webLinks.generated.js';
import { serializeCreateWebLinkRequestBodyParentField } from '../managers/webLinks.generated.js';
import { deserializeCreateWebLinkRequestBodyParentField } from '../managers/webLinks.generated.js';
import { serializeTrashWebLink } from '../schemas/trashWebLink.generated.js';
import { deserializeTrashWebLink } from '../schemas/trashWebLink.generated.js';
import { serializeTrashWebLinkRestored } from '../schemas/trashWebLinkRestored.generated.js';
import { deserializeTrashWebLinkRestored } from '../schemas/trashWebLinkRestored.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { WebLink } from '../schemas/webLink.generated.js';
import { CreateWebLinkRequestBody } from '../managers/webLinks.generated.js';
import { CreateWebLinkRequestBodyParentField } from '../managers/webLinks.generated.js';
import { TrashWebLink } from '../schemas/trashWebLink.generated.js';
import { TrashWebLinkRestored } from '../schemas/trashWebLinkRestored.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

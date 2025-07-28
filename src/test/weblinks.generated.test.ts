import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeWebLink } from '../schemas/webLink.generated.js';
import { deserializeWebLink } from '../schemas/webLink.generated.js';
import { serializeCreateWebLinkRequestBody } from '../managers/webLinks.generated.js';
import { deserializeCreateWebLinkRequestBody } from '../managers/webLinks.generated.js';
import { serializeCreateWebLinkRequestBodyParentField } from '../managers/webLinks.generated.js';
import { deserializeCreateWebLinkRequestBodyParentField } from '../managers/webLinks.generated.js';
import { serializeUpdateWebLinkByIdRequestBody } from '../managers/webLinks.generated.js';
import { deserializeUpdateWebLinkByIdRequestBody } from '../managers/webLinks.generated.js';
import { serializeUpdateWebLinkByIdRequestBodySharedLinkField } from '../managers/webLinks.generated.js';
import { deserializeUpdateWebLinkByIdRequestBodySharedLinkField } from '../managers/webLinks.generated.js';
import { serializeUpdateWebLinkByIdRequestBodySharedLinkAccessField } from '../managers/webLinks.generated.js';
import { deserializeUpdateWebLinkByIdRequestBodySharedLinkAccessField } from '../managers/webLinks.generated.js';
import { UpdateWebLinkByIdOptionalsInput } from '../managers/webLinks.generated.js';
import { UpdateWebLinkByIdOptionals } from '../managers/webLinks.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { WebLink } from '../schemas/webLink.generated.js';
import { CreateWebLinkRequestBody } from '../managers/webLinks.generated.js';
import { CreateWebLinkRequestBodyParentField } from '../managers/webLinks.generated.js';
import { UpdateWebLinkByIdRequestBody } from '../managers/webLinks.generated.js';
import { UpdateWebLinkByIdRequestBodySharedLinkField } from '../managers/webLinks.generated.js';
import { UpdateWebLinkByIdRequestBodySharedLinkAccessField } from '../managers/webLinks.generated.js';
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
test('test_createGetDeleteWeblink', async function test_createGetDeleteWeblink(): Promise<any> {
  const url: string = 'https://www.box.com';
  const parent: FolderFull = await client.folders.getFolderById('0');
  const name: string = getUuid();
  const description: string = 'Weblink description';
  const password: string = 'super-secret-password';
  const weblink: WebLink = await client.webLinks.createWebLink({
    url: url,
    parent: { id: parent.id } satisfies CreateWebLinkRequestBodyParentField,
    name: name,
    description: description,
  } satisfies CreateWebLinkRequestBody);
  if (!(weblink.url == url)) {
    throw new Error('Assertion failed');
  }
  if (!(weblink.parent!.id == parent.id)) {
    throw new Error('Assertion failed');
  }
  if (!(weblink.name == name)) {
    throw new Error('Assertion failed');
  }
  if (!(weblink.description == description)) {
    throw new Error('Assertion failed');
  }
  const weblinkById: WebLink = await client.webLinks.getWebLinkById(weblink.id);
  if (!(weblinkById.id == weblink.id)) {
    throw new Error('Assertion failed');
  }
  if (!(weblinkById.url == url)) {
    throw new Error('Assertion failed');
  }
  const updatedName: string = getUuid();
  const updatedWeblink: WebLink = await client.webLinks.updateWebLinkById(
    weblink.id,
    {
      requestBody: {
        name: updatedName,
        sharedLink: {
          access: 'open' as UpdateWebLinkByIdRequestBodySharedLinkAccessField,
          password: password,
        } satisfies UpdateWebLinkByIdRequestBodySharedLinkField,
      } satisfies UpdateWebLinkByIdRequestBody,
    } satisfies UpdateWebLinkByIdOptionalsInput,
  );
  if (!(updatedWeblink.name == updatedName)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(updatedWeblink.sharedLink!.access!) as string) == 'open')) {
    throw new Error('Assertion failed');
  }
  await client.webLinks.deleteWebLinkById(weblink.id);
  const deletedWeblink: WebLink = await client.webLinks.getWebLinkById(
    weblink.id,
  );
  if (!((toString(deletedWeblink.itemStatus!) as string) == 'trashed')) {
    throw new Error('Assertion failed');
  }
});
export {};

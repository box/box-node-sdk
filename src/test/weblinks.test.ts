import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeWebLink } from '@/schemas/webLink';
import { deserializeWebLink } from '@/schemas/webLink';
import { serializeCreateWebLinkRequestBody } from '@/managers/webLinks';
import { deserializeCreateWebLinkRequestBody } from '@/managers/webLinks';
import { serializeCreateWebLinkRequestBodyParentField } from '@/managers/webLinks';
import { deserializeCreateWebLinkRequestBodyParentField } from '@/managers/webLinks';
import { serializeUpdateWebLinkByIdRequestBody } from '@/managers/webLinks';
import { deserializeUpdateWebLinkByIdRequestBody } from '@/managers/webLinks';
import { serializeUpdateWebLinkByIdRequestBodySharedLinkField } from '@/managers/webLinks';
import { deserializeUpdateWebLinkByIdRequestBodySharedLinkField } from '@/managers/webLinks';
import { serializeUpdateWebLinkByIdRequestBodySharedLinkAccessField } from '@/managers/webLinks';
import { deserializeUpdateWebLinkByIdRequestBodySharedLinkAccessField } from '@/managers/webLinks';
import { UpdateWebLinkByIdOptionalsInput } from '@/managers/webLinks';
import { UpdateWebLinkByIdOptionals } from '@/managers/webLinks';
import { BoxClient } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { WebLink } from '@/schemas/webLink';
import { CreateWebLinkRequestBody } from '@/managers/webLinks';
import { CreateWebLinkRequestBodyParentField } from '@/managers/webLinks';
import { UpdateWebLinkByIdRequestBody } from '@/managers/webLinks';
import { UpdateWebLinkByIdRequestBodySharedLinkField } from '@/managers/webLinks';
import { UpdateWebLinkByIdRequestBodySharedLinkAccessField } from '@/managers/webLinks';
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

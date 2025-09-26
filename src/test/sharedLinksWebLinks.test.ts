import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeWebLink } from '@/schemas/webLink';
import { deserializeWebLink } from '@/schemas/webLink';
import { serializeCreateWebLinkRequestBody } from '@/managers/webLinks';
import { deserializeCreateWebLinkRequestBody } from '@/managers/webLinks';
import { serializeCreateWebLinkRequestBodyParentField } from '@/managers/webLinks';
import { deserializeCreateWebLinkRequestBodyParentField } from '@/managers/webLinks';
import { serializeAddShareLinkToWebLinkRequestBody } from '@/managers/sharedLinksWebLinks';
import { deserializeAddShareLinkToWebLinkRequestBody } from '@/managers/sharedLinksWebLinks';
import { serializeAddShareLinkToWebLinkRequestBodySharedLinkField } from '@/managers/sharedLinksWebLinks';
import { deserializeAddShareLinkToWebLinkRequestBodySharedLinkField } from '@/managers/sharedLinksWebLinks';
import { serializeAddShareLinkToWebLinkRequestBodySharedLinkAccessField } from '@/managers/sharedLinksWebLinks';
import { deserializeAddShareLinkToWebLinkRequestBodySharedLinkAccessField } from '@/managers/sharedLinksWebLinks';
import { serializeUpdateSharedLinkOnWebLinkRequestBody } from '@/managers/sharedLinksWebLinks';
import { deserializeUpdateSharedLinkOnWebLinkRequestBody } from '@/managers/sharedLinksWebLinks';
import { serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkField } from '@/managers/sharedLinksWebLinks';
import { deserializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkField } from '@/managers/sharedLinksWebLinks';
import { serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField } from '@/managers/sharedLinksWebLinks';
import { deserializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField } from '@/managers/sharedLinksWebLinks';
import { serializeRemoveSharedLinkFromWebLinkRequestBody } from '@/managers/sharedLinksWebLinks';
import { deserializeRemoveSharedLinkFromWebLinkRequestBody } from '@/managers/sharedLinksWebLinks';
import { FindWebLinkForSharedLinkHeadersInput } from '@/managers/sharedLinksWebLinks';
import { BoxClient } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { WebLink } from '@/schemas/webLink';
import { CreateWebLinkRequestBody } from '@/managers/webLinks';
import { CreateWebLinkRequestBodyParentField } from '@/managers/webLinks';
import { AddShareLinkToWebLinkRequestBody } from '@/managers/sharedLinksWebLinks';
import { AddShareLinkToWebLinkRequestBodySharedLinkField } from '@/managers/sharedLinksWebLinks';
import { AddShareLinkToWebLinkRequestBodySharedLinkAccessField } from '@/managers/sharedLinksWebLinks';
import { AddShareLinkToWebLinkQueryParams } from '@/managers/sharedLinksWebLinks';
import { GetSharedLinkForWebLinkQueryParams } from '@/managers/sharedLinksWebLinks';
import { FindWebLinkForSharedLinkQueryParams } from '@/managers/sharedLinksWebLinks';
import { FindWebLinkForSharedLinkHeaders } from '@/managers/sharedLinksWebLinks';
import { UpdateSharedLinkOnWebLinkRequestBody } from '@/managers/sharedLinksWebLinks';
import { UpdateSharedLinkOnWebLinkRequestBodySharedLinkField } from '@/managers/sharedLinksWebLinks';
import { UpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField } from '@/managers/sharedLinksWebLinks';
import { UpdateSharedLinkOnWebLinkQueryParams } from '@/managers/sharedLinksWebLinks';
import { RemoveSharedLinkFromWebLinkRequestBody } from '@/managers/sharedLinksWebLinks';
import { RemoveSharedLinkFromWebLinkQueryParams } from '@/managers/sharedLinksWebLinks';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { getDefaultClientWithUserSubject } from './commons';
import { createNull } from '@/internal/utils';
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
test('testSharedLinksWebLinks', async function testSharedLinksWebLinks(): Promise<any> {
  const parent: FolderFull = await client.folders.getFolderById('0');
  const webLink: WebLink = await client.webLinks.createWebLink({
    url: 'https://www.box.com',
    parent: { id: parent.id } satisfies CreateWebLinkRequestBodyParentField,
    name: getUuid(),
    description: 'Weblink description',
  } satisfies CreateWebLinkRequestBody);
  const webLinkId: string = webLink.id;
  await client.sharedLinksWebLinks.addShareLinkToWebLink(
    webLinkId,
    {
      sharedLink: {
        access: 'open' as AddShareLinkToWebLinkRequestBodySharedLinkAccessField,
        password: 'Secret123@',
      } satisfies AddShareLinkToWebLinkRequestBodySharedLinkField,
    } satisfies AddShareLinkToWebLinkRequestBody,
    { fields: 'shared_link' } satisfies AddShareLinkToWebLinkQueryParams,
  );
  const webLinkFromApi: WebLink =
    await client.sharedLinksWebLinks.getSharedLinkForWebLink(webLinkId, {
      fields: 'shared_link',
    } satisfies GetSharedLinkForWebLinkQueryParams);
  if (!((toString(webLinkFromApi.sharedLink!.access) as string) == 'open')) {
    throw new Error('Assertion failed');
  }
  const userId: string = getEnvVar('USER_ID');
  const userClient: BoxClient = getDefaultClientWithUserSubject(userId);
  const webLinkFromSharedLinkPassword: WebLink =
    await userClient.sharedLinksWebLinks.findWebLinkForSharedLink(
      {} satisfies FindWebLinkForSharedLinkQueryParams,
      {
        boxapi: ''.concat(
          'shared_link=',
          webLinkFromApi.sharedLink!.url,
          '&shared_link_password=Secret123@',
        ) as string,
      } satisfies FindWebLinkForSharedLinkHeadersInput,
    );
  if (!(webLinkId == webLinkFromSharedLinkPassword.id)) {
    throw new Error('Assertion failed');
  }
  await expect(async () => {
    await userClient.sharedLinksWebLinks.findWebLinkForSharedLink(
      {} satisfies FindWebLinkForSharedLinkQueryParams,
      {
        boxapi: ''.concat(
          'shared_link=',
          webLinkFromApi.sharedLink!.url,
          '&shared_link_password=incorrectPassword',
        ) as string,
      } satisfies FindWebLinkForSharedLinkHeadersInput,
    );
  }).rejects.toThrow();
  const updatedWebLink: WebLink =
    await client.sharedLinksWebLinks.updateSharedLinkOnWebLink(
      webLinkId,
      {
        sharedLink: {
          access:
            'collaborators' as UpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField,
        } satisfies UpdateSharedLinkOnWebLinkRequestBodySharedLinkField,
      } satisfies UpdateSharedLinkOnWebLinkRequestBody,
      { fields: 'shared_link' } satisfies UpdateSharedLinkOnWebLinkQueryParams,
    );
  if (
    !(
      (toString(updatedWebLink.sharedLink!.access) as string) == 'collaborators'
    )
  ) {
    throw new Error('Assertion failed');
  }
  await client.sharedLinksWebLinks.removeSharedLinkFromWebLink(
    webLinkId,
    {
      sharedLink: createNull(),
    } satisfies RemoveSharedLinkFromWebLinkRequestBody,
    { fields: 'shared_link' } satisfies RemoveSharedLinkFromWebLinkQueryParams,
  );
  const webLinkFromApiAfterRemove: WebLink =
    await client.sharedLinksWebLinks.getSharedLinkForWebLink(webLinkId, {
      fields: 'shared_link',
    } satisfies GetSharedLinkForWebLinkQueryParams);
  if (!(webLinkFromApiAfterRemove.sharedLink == void 0)) {
    throw new Error('Assertion failed');
  }
  await client.webLinks.deleteWebLinkById(webLinkId);
});
export {};

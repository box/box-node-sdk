import { serializeAppItem } from '@/schemas/appItem';
import { deserializeAppItem } from '@/schemas/appItem';
import { FindAppItemForSharedLinkHeadersInput } from '@/managers/sharedLinksAppItems';
import { BoxClient } from '@/client';
import { AppItem } from '@/schemas/appItem';
import { FindAppItemForSharedLinkHeaders } from '@/managers/sharedLinksAppItems';
import { getEnvVar } from '@/internal/utils';
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
test('testSharedLinksAppItems', async function testSharedLinksAppItems(): Promise<any> {
  const appItemSharedLink: string = getEnvVar('APP_ITEM_SHARED_LINK');
  const appItem: AppItem =
    await client.sharedLinksAppItems.findAppItemForSharedLink({
      boxapi: ''.concat('shared_link=', appItemSharedLink) as string,
    } satisfies FindAppItemForSharedLinkHeadersInput);
  if (!((toString(appItem.type) as string) == 'app_item')) {
    throw new Error('Assertion failed');
  }
  if (!(appItem.applicationType == 'hubs')) {
    throw new Error('Assertion failed');
  }
});
export {};

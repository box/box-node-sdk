import { serializeAppItem } from '../schemas/appItem.generated.js';
import { deserializeAppItem } from '../schemas/appItem.generated.js';
import { FindAppItemForSharedLinkHeadersInput } from '../managers/sharedLinksAppItems.generated.js';
import { BoxClient } from '../client.generated.js';
import { AppItem } from '../schemas/appItem.generated.js';
import { FindAppItemForSharedLinkHeaders } from '../managers/sharedLinksAppItems.generated.js';
import { getEnvVar } from '../internal/utils.js';
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

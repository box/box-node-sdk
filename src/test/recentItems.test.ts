import { serializeRecentItems } from '@/schemas/recentItems';
import { deserializeRecentItems } from '@/schemas/recentItems';
import { BoxClient } from '@/client';
import { RecentItems } from '@/schemas/recentItems';
import { decodeBase64 } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
test('testRecentItems', async function testRecentItems(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const recentItems: RecentItems = await client.recentItems.getRecentItems();
  if (!(recentItems.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
});
export {};

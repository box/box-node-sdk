import { serializeStoragePolicies } from '../schemas/storagePolicies.generated.js';
import { deserializeStoragePolicies } from '../schemas/storagePolicies.generated.js';
import { serializeStoragePolicy } from '../schemas/storagePolicy.generated.js';
import { deserializeStoragePolicy } from '../schemas/storagePolicy.generated.js';
import { BoxClient } from '../client.generated.js';
import { StoragePolicies } from '../schemas/storagePolicies.generated.js';
import { StoragePolicy } from '../schemas/storagePolicy.generated.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const userId: string = getEnvVar('USER_ID');
test('testGetStoragePolicies', async function testGetStoragePolicies(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(userId);
  const storagePolicies: StoragePolicies =
    await client.storagePolicies.getStoragePolicies();
  const storagePolicy: StoragePolicy = storagePolicies.entries![0];
  if (!((toString(storagePolicy.type) as string) == 'storage_policy')) {
    throw new Error('Assertion failed');
  }
  const getStoragePolicy: StoragePolicy =
    await client.storagePolicies.getStoragePolicyById(storagePolicy.id);
  if (!(getStoragePolicy.id == storagePolicy.id)) {
    throw new Error('Assertion failed');
  }
});
export {};

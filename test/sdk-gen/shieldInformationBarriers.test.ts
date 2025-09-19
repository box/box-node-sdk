import { serializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { deserializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { serializeShieldInformationBarriers } from '../schemas/shieldInformationBarriers.js';
import { deserializeShieldInformationBarriers } from '../schemas/shieldInformationBarriers.js';
import { serializeUpdateShieldInformationBarrierStatusRequestBody } from '../managers/shieldInformationBarriers.js';
import { deserializeUpdateShieldInformationBarrierStatusRequestBody } from '../managers/shieldInformationBarriers.js';
import { serializeUpdateShieldInformationBarrierStatusRequestBodyStatusField } from '../managers/shieldInformationBarriers.js';
import { deserializeUpdateShieldInformationBarrierStatusRequestBodyStatusField } from '../managers/shieldInformationBarriers.js';
import { BoxClient } from '../client.js';
import { ShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { ShieldInformationBarriers } from '../schemas/shieldInformationBarriers.js';
import { UpdateShieldInformationBarrierStatusRequestBody } from '../managers/shieldInformationBarriers.js';
import { UpdateShieldInformationBarrierStatusRequestBodyStatusField } from '../managers/shieldInformationBarriers.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.js';
import { getOrCreateShieldInformationBarrier } from './commons.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
test('testShieldInformationBarriers', async function testShieldInformationBarriers(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID')
  );
  const enterpriseId: string = getEnvVar('ENTERPRISE_ID');
  const barrier: ShieldInformationBarrier =
    await getOrCreateShieldInformationBarrier(client, enterpriseId);
  if (!((toString(barrier.status!) as string) == 'draft')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(barrier.type!) as string) == 'shield_information_barrier')) {
    throw new Error('Assertion failed');
  }
  if (!(barrier.enterprise!.id == enterpriseId)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(barrier.enterprise!.type) as string) == 'enterprise')) {
    throw new Error('Assertion failed');
  }
  const barrierId: string = barrier.id!;
  const barrierFromApi: ShieldInformationBarrier =
    await client.shieldInformationBarriers.getShieldInformationBarrierById(
      barrierId
    );
  if (!(barrierFromApi.id! == barrierId)) {
    throw new Error('Assertion failed');
  }
  const barriers: ShieldInformationBarriers =
    await client.shieldInformationBarriers.getShieldInformationBarriers();
  if (!(barriers.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  await expect(async () => {
    await client.shieldInformationBarriers.updateShieldInformationBarrierStatus(
      {
        id: barrierId,
        status:
          'disabled' as UpdateShieldInformationBarrierStatusRequestBodyStatusField,
      } satisfies UpdateShieldInformationBarrierStatusRequestBody
    );
  }).rejects.toThrow();
});
export {};

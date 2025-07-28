import { serializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { deserializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { serializeShieldInformationBarriers } from '../schemas/shieldInformationBarriers.generated.js';
import { deserializeShieldInformationBarriers } from '../schemas/shieldInformationBarriers.generated.js';
import { serializeUpdateShieldInformationBarrierStatusRequestBody } from '../managers/shieldInformationBarriers.generated.js';
import { deserializeUpdateShieldInformationBarrierStatusRequestBody } from '../managers/shieldInformationBarriers.generated.js';
import { serializeUpdateShieldInformationBarrierStatusRequestBodyStatusField } from '../managers/shieldInformationBarriers.generated.js';
import { deserializeUpdateShieldInformationBarrierStatusRequestBodyStatusField } from '../managers/shieldInformationBarriers.generated.js';
import { BoxClient } from '../client.generated.js';
import { ShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { ShieldInformationBarriers } from '../schemas/shieldInformationBarriers.generated.js';
import { UpdateShieldInformationBarrierStatusRequestBody } from '../managers/shieldInformationBarriers.generated.js';
import { UpdateShieldInformationBarrierStatusRequestBodyStatusField } from '../managers/shieldInformationBarriers.generated.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { getOrCreateShieldInformationBarrier } from './commons.generated.js';
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
    getEnvVar('USER_ID'),
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
      barrierId,
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
      } satisfies UpdateShieldInformationBarrierStatusRequestBody,
    );
  }).rejects.toThrow();
});
export {};

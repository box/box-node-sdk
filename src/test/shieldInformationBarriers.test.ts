import { serializeShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { deserializeShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { serializeShieldInformationBarriers } from '@/schemas/shieldInformationBarriers';
import { deserializeShieldInformationBarriers } from '@/schemas/shieldInformationBarriers';
import { serializeUpdateShieldInformationBarrierStatusRequestBody } from '@/managers/shieldInformationBarriers';
import { deserializeUpdateShieldInformationBarrierStatusRequestBody } from '@/managers/shieldInformationBarriers';
import { serializeUpdateShieldInformationBarrierStatusRequestBodyStatusField } from '@/managers/shieldInformationBarriers';
import { deserializeUpdateShieldInformationBarrierStatusRequestBodyStatusField } from '@/managers/shieldInformationBarriers';
import { BoxClient } from '@/client';
import { ShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { ShieldInformationBarriers } from '@/schemas/shieldInformationBarriers';
import { UpdateShieldInformationBarrierStatusRequestBody } from '@/managers/shieldInformationBarriers';
import { UpdateShieldInformationBarrierStatusRequestBodyStatusField } from '@/managers/shieldInformationBarriers';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { getOrCreateShieldInformationBarrier } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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

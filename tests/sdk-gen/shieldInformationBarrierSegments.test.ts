import { serializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { deserializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { serializeShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.js';
import { deserializeShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.js';
import { serializeCreateShieldInformationBarrierSegmentRequestBody } from '../managers/shieldInformationBarrierSegments.js';
import { deserializeCreateShieldInformationBarrierSegmentRequestBody } from '../managers/shieldInformationBarrierSegments.js';
import { serializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.js';
import { deserializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.js';
import { serializeShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.js';
import { deserializeShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.js';
import { serializeShieldInformationBarrierSegments } from '../schemas/shieldInformationBarrierSegments.js';
import { deserializeShieldInformationBarrierSegments } from '../schemas/shieldInformationBarrierSegments.js';
import { serializeUpdateShieldInformationBarrierSegmentByIdRequestBody } from '../managers/shieldInformationBarrierSegments.js';
import { deserializeUpdateShieldInformationBarrierSegmentByIdRequestBody } from '../managers/shieldInformationBarrierSegments.js';
import { UpdateShieldInformationBarrierSegmentByIdOptionalsInput } from '../managers/shieldInformationBarrierSegments.js';
import { UpdateShieldInformationBarrierSegmentByIdOptionals } from '../managers/shieldInformationBarrierSegments.js';
import { BoxClient } from '../client.js';
import { ShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { ShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.js';
import { CreateShieldInformationBarrierSegmentRequestBody } from '../managers/shieldInformationBarrierSegments.js';
import { ShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.js';
import { ShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.js';
import { ShieldInformationBarrierSegments } from '../schemas/shieldInformationBarrierSegments.js';
import { GetShieldInformationBarrierSegmentsQueryParams } from '../managers/shieldInformationBarrierSegments.js';
import { UpdateShieldInformationBarrierSegmentByIdRequestBody } from '../managers/shieldInformationBarrierSegments.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
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
test('testShieldInformationBarrierSegments', async function testShieldInformationBarrierSegments(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID')
  );
  const enterpriseId: string = getEnvVar('ENTERPRISE_ID');
  const barrier: ShieldInformationBarrier =
    await getOrCreateShieldInformationBarrier(client, enterpriseId);
  const barrierId: string = barrier.id!;
  const segmentName: string = getUuid();
  const segmentDescription: string = 'barrier segment description';
  const segment: ShieldInformationBarrierSegment =
    await client.shieldInformationBarrierSegments.createShieldInformationBarrierSegment(
      {
        shieldInformationBarrier: {
          id: barrierId,
          type: 'shield_information_barrier' as ShieldInformationBarrierBaseTypeField,
        } satisfies ShieldInformationBarrierBase,
        name: segmentName,
        description: segmentDescription,
      } satisfies CreateShieldInformationBarrierSegmentRequestBody
    );
  if (!(segment.name! == segmentName)) {
    throw new Error('Assertion failed');
  }
  const segments: ShieldInformationBarrierSegments =
    await client.shieldInformationBarrierSegments.getShieldInformationBarrierSegments(
      {
        shieldInformationBarrierId: barrierId,
      } satisfies GetShieldInformationBarrierSegmentsQueryParams
    );
  if (!(segments.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const segmentId: string = segment.id!;
  const segmentFromApi: ShieldInformationBarrierSegment =
    await client.shieldInformationBarrierSegments.getShieldInformationBarrierSegmentById(
      segmentId
    );
  if (
    !(
      (toString(segmentFromApi.type!) as string) ==
      'shield_information_barrier_segment'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!(segmentFromApi.id! == segmentId)) {
    throw new Error('Assertion failed');
  }
  if (!(segmentFromApi.name! == segmentName)) {
    throw new Error('Assertion failed');
  }
  if (!(segmentFromApi.description! == segmentDescription)) {
    throw new Error('Assertion failed');
  }
  if (!(segmentFromApi.shieldInformationBarrier!.id == barrierId)) {
    throw new Error('Assertion failed');
  }
  const updatedSegmentDescription: string =
    'updated barrier segment description';
  const updatedSegment: ShieldInformationBarrierSegment =
    await client.shieldInformationBarrierSegments.updateShieldInformationBarrierSegmentById(
      segmentId,
      {
        requestBody: {
          description: updatedSegmentDescription,
        } satisfies UpdateShieldInformationBarrierSegmentByIdRequestBody,
      } satisfies UpdateShieldInformationBarrierSegmentByIdOptionalsInput
    );
  if (!(updatedSegment.description! == updatedSegmentDescription)) {
    throw new Error('Assertion failed');
  }
  await client.shieldInformationBarrierSegments.deleteShieldInformationBarrierSegmentById(
    segmentId
  );
  await expect(async () => {
    await client.shieldInformationBarrierSegments.getShieldInformationBarrierSegmentById(
      segmentId
    );
  }).rejects.toThrow();
});
export {};

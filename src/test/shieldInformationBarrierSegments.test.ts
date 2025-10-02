import { serializeShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { deserializeShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { serializeShieldInformationBarrierSegment } from '@/schemas/shieldInformationBarrierSegment';
import { deserializeShieldInformationBarrierSegment } from '@/schemas/shieldInformationBarrierSegment';
import { serializeCreateShieldInformationBarrierSegmentRequestBody } from '@/managers/shieldInformationBarrierSegments';
import { deserializeCreateShieldInformationBarrierSegmentRequestBody } from '@/managers/shieldInformationBarrierSegments';
import { serializeShieldInformationBarrierBase } from '@/schemas/shieldInformationBarrierBase';
import { deserializeShieldInformationBarrierBase } from '@/schemas/shieldInformationBarrierBase';
import { serializeShieldInformationBarrierBaseTypeField } from '@/schemas/shieldInformationBarrierBase';
import { deserializeShieldInformationBarrierBaseTypeField } from '@/schemas/shieldInformationBarrierBase';
import { serializeShieldInformationBarrierSegments } from '@/schemas/shieldInformationBarrierSegments';
import { deserializeShieldInformationBarrierSegments } from '@/schemas/shieldInformationBarrierSegments';
import { serializeUpdateShieldInformationBarrierSegmentByIdRequestBody } from '@/managers/shieldInformationBarrierSegments';
import { deserializeUpdateShieldInformationBarrierSegmentByIdRequestBody } from '@/managers/shieldInformationBarrierSegments';
import { UpdateShieldInformationBarrierSegmentByIdOptionalsInput } from '@/managers/shieldInformationBarrierSegments';
import { UpdateShieldInformationBarrierSegmentByIdOptionals } from '@/managers/shieldInformationBarrierSegments';
import { BoxClient } from '@/client';
import { ShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { ShieldInformationBarrierSegment } from '@/schemas/shieldInformationBarrierSegment';
import { CreateShieldInformationBarrierSegmentRequestBody } from '@/managers/shieldInformationBarrierSegments';
import { ShieldInformationBarrierBase } from '@/schemas/shieldInformationBarrierBase';
import { ShieldInformationBarrierBaseTypeField } from '@/schemas/shieldInformationBarrierBase';
import { ShieldInformationBarrierSegments } from '@/schemas/shieldInformationBarrierSegments';
import { GetShieldInformationBarrierSegmentsQueryParams } from '@/managers/shieldInformationBarrierSegments';
import { UpdateShieldInformationBarrierSegmentByIdRequestBody } from '@/managers/shieldInformationBarrierSegments';
import { getEnvVar } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
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
test('testShieldInformationBarrierSegments', async function testShieldInformationBarrierSegments(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
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
      } satisfies CreateShieldInformationBarrierSegmentRequestBody,
    );
  if (!(segment.name! == segmentName)) {
    throw new Error('Assertion failed');
  }
  const segments: ShieldInformationBarrierSegments =
    await client.shieldInformationBarrierSegments.getShieldInformationBarrierSegments(
      {
        shieldInformationBarrierId: barrierId,
      } satisfies GetShieldInformationBarrierSegmentsQueryParams,
    );
  if (!(segments.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const segmentId: string = segment.id!;
  const segmentFromApi: ShieldInformationBarrierSegment =
    await client.shieldInformationBarrierSegments.getShieldInformationBarrierSegmentById(
      segmentId,
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
      } satisfies UpdateShieldInformationBarrierSegmentByIdOptionalsInput,
    );
  if (!(updatedSegment.description! == updatedSegmentDescription)) {
    throw new Error('Assertion failed');
  }
  await client.shieldInformationBarrierSegments.deleteShieldInformationBarrierSegmentById(
    segmentId,
  );
  await expect(async () => {
    await client.shieldInformationBarrierSegments.getShieldInformationBarrierSegmentById(
      segmentId,
    );
  }).rejects.toThrow();
});
export {};

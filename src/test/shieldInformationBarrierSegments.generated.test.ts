import { serializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { deserializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { serializeShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.generated.js';
import { deserializeShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.generated.js';
import { serializeCreateShieldInformationBarrierSegmentRequestBody } from '../managers/shieldInformationBarrierSegments.generated.js';
import { deserializeCreateShieldInformationBarrierSegmentRequestBody } from '../managers/shieldInformationBarrierSegments.generated.js';
import { serializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { serializeShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.generated.js';
import { serializeShieldInformationBarrierSegments } from '../schemas/shieldInformationBarrierSegments.generated.js';
import { deserializeShieldInformationBarrierSegments } from '../schemas/shieldInformationBarrierSegments.generated.js';
import { serializeUpdateShieldInformationBarrierSegmentByIdRequestBody } from '../managers/shieldInformationBarrierSegments.generated.js';
import { deserializeUpdateShieldInformationBarrierSegmentByIdRequestBody } from '../managers/shieldInformationBarrierSegments.generated.js';
import { UpdateShieldInformationBarrierSegmentByIdOptionalsInput } from '../managers/shieldInformationBarrierSegments.generated.js';
import { UpdateShieldInformationBarrierSegmentByIdOptionals } from '../managers/shieldInformationBarrierSegments.generated.js';
import { BoxClient } from '../client.generated.js';
import { ShieldInformationBarrier } from '../schemas/shieldInformationBarrier.generated.js';
import { ShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.generated.js';
import { CreateShieldInformationBarrierSegmentRequestBody } from '../managers/shieldInformationBarrierSegments.generated.js';
import { ShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.generated.js';
import { ShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.generated.js';
import { ShieldInformationBarrierSegments } from '../schemas/shieldInformationBarrierSegments.generated.js';
import { GetShieldInformationBarrierSegmentsQueryParams } from '../managers/shieldInformationBarrierSegments.generated.js';
import { UpdateShieldInformationBarrierSegmentByIdRequestBody } from '../managers/shieldInformationBarrierSegments.generated.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
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

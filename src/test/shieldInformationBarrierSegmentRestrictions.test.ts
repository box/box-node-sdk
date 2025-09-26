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
import { serializeShieldInformationBarrierSegmentRestriction } from '@/schemas/shieldInformationBarrierSegmentRestriction';
import { deserializeShieldInformationBarrierSegmentRestriction } from '@/schemas/shieldInformationBarrierSegmentRestriction';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBody } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBody } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { serializeShieldInformationBarrierSegmentRestrictions } from '@/schemas/shieldInformationBarrierSegmentRestrictions';
import { deserializeShieldInformationBarrierSegmentRestrictions } from '@/schemas/shieldInformationBarrierSegmentRestrictions';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { BoxClient } from '@/client';
import { ShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { ShieldInformationBarrierSegment } from '@/schemas/shieldInformationBarrierSegment';
import { CreateShieldInformationBarrierSegmentRequestBody } from '@/managers/shieldInformationBarrierSegments';
import { ShieldInformationBarrierBase } from '@/schemas/shieldInformationBarrierBase';
import { ShieldInformationBarrierBaseTypeField } from '@/schemas/shieldInformationBarrierBase';
import { ShieldInformationBarrierSegmentRestriction } from '@/schemas/shieldInformationBarrierSegmentRestriction';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBody } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { ShieldInformationBarrierSegmentRestrictions } from '@/schemas/shieldInformationBarrierSegmentRestrictions';
import { GetShieldInformationBarrierSegmentRestrictionsQueryParams } from '@/managers/shieldInformationBarrierSegmentRestrictions';
import { getEnvVar } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { getOrCreateShieldInformationBarrier } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
test('testShieldInformationBarrierSegmentRestrictions', async function testShieldInformationBarrierSegmentRestrictions(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const enterpriseId: string = getEnvVar('ENTERPRISE_ID');
  const barrier: ShieldInformationBarrier =
    await getOrCreateShieldInformationBarrier(client, enterpriseId);
  const barrierId: string = barrier.id!;
  const segment: ShieldInformationBarrierSegment =
    await client.shieldInformationBarrierSegments.createShieldInformationBarrierSegment(
      {
        shieldInformationBarrier: {
          id: barrierId,
          type: 'shield_information_barrier' as ShieldInformationBarrierBaseTypeField,
        } satisfies ShieldInformationBarrierBase,
        name: getUuid(),
        description: 'barrier segment description',
      } satisfies CreateShieldInformationBarrierSegmentRequestBody,
    );
  const segmentId: string = segment.id!;
  const segmentToRestrict: ShieldInformationBarrierSegment =
    await client.shieldInformationBarrierSegments.createShieldInformationBarrierSegment(
      {
        shieldInformationBarrier: {
          id: barrierId,
          type: 'shield_information_barrier' as ShieldInformationBarrierBaseTypeField,
        } satisfies ShieldInformationBarrierBase,
        name: getUuid(),
        description: 'barrier segment description',
      } satisfies CreateShieldInformationBarrierSegmentRequestBody,
    );
  const segmentToRestrictId: string = segmentToRestrict.id!;
  const segmentRestriction: ShieldInformationBarrierSegmentRestriction =
    await client.shieldInformationBarrierSegmentRestrictions.createShieldInformationBarrierSegmentRestriction(
      {
        restrictedSegment: {
          id: segmentToRestrictId,
          type: 'shield_information_barrier_segment' as CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField,
        } satisfies CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField,
        shieldInformationBarrierSegment: {
          id: segmentId,
          type: 'shield_information_barrier_segment' as CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField,
        } satisfies CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField,
        type: 'shield_information_barrier_segment_restriction' as CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField,
      } satisfies CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput,
    );
  const segmentRestrictionId: string = segmentRestriction.id!;
  if (!(segmentRestriction.shieldInformationBarrierSegment.id == segmentId)) {
    throw new Error('Assertion failed');
  }
  const segmentRestrictions: ShieldInformationBarrierSegmentRestrictions =
    await client.shieldInformationBarrierSegmentRestrictions.getShieldInformationBarrierSegmentRestrictions(
      {
        shieldInformationBarrierSegmentId: segmentId,
      } satisfies GetShieldInformationBarrierSegmentRestrictionsQueryParams,
    );
  if (!(segmentRestrictions.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const segmentRestrictionFromApi: ShieldInformationBarrierSegmentRestriction =
    await client.shieldInformationBarrierSegmentRestrictions.getShieldInformationBarrierSegmentRestrictionById(
      segmentRestrictionId,
    );
  if (!(segmentRestrictionFromApi.id! == segmentRestrictionId)) {
    throw new Error('Assertion failed');
  }
  if (
    !(segmentRestrictionFromApi.shieldInformationBarrierSegment.id == segmentId)
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(segmentRestrictionFromApi.restrictedSegment.id == segmentToRestrictId)
  ) {
    throw new Error('Assertion failed');
  }
  if (!(segmentRestrictionFromApi.shieldInformationBarrier!.id == barrierId)) {
    throw new Error('Assertion failed');
  }
  await client.shieldInformationBarrierSegmentRestrictions.deleteShieldInformationBarrierSegmentRestrictionById(
    segmentRestrictionId,
  );
  await expect(async () => {
    await client.shieldInformationBarrierSegmentRestrictions.getShieldInformationBarrierSegmentRestrictionById(
      segmentRestrictionId,
    );
  }).rejects.toThrow();
  await client.shieldInformationBarrierSegments.deleteShieldInformationBarrierSegmentById(
    segmentId,
  );
  await client.shieldInformationBarrierSegments.deleteShieldInformationBarrierSegmentById(
    segmentToRestrictId,
  );
});
export {};

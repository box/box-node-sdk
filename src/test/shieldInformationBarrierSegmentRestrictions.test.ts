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
import { serializeShieldInformationBarrierSegmentRestriction } from '../schemas/shieldInformationBarrierSegmentRestriction.js';
import { deserializeShieldInformationBarrierSegmentRestriction } from '../schemas/shieldInformationBarrierSegmentRestriction.js';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBody } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBody } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { deserializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { serializeShieldInformationBarrierSegmentRestrictions } from '../schemas/shieldInformationBarrierSegmentRestrictions.js';
import { deserializeShieldInformationBarrierSegmentRestrictions } from '../schemas/shieldInformationBarrierSegmentRestrictions.js';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyInput } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { BoxClient } from '../client.js';
import { ShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { ShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.js';
import { CreateShieldInformationBarrierSegmentRequestBody } from '../managers/shieldInformationBarrierSegments.js';
import { ShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.js';
import { ShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.js';
import { ShieldInformationBarrierSegmentRestriction } from '../schemas/shieldInformationBarrierSegmentRestriction.js';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBody } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { CreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { ShieldInformationBarrierSegmentRestrictions } from '../schemas/shieldInformationBarrierSegmentRestrictions.js';
import { GetShieldInformationBarrierSegmentRestrictionsQueryParams } from '../managers/shieldInformationBarrierSegmentRestrictions.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.js';
import { getOrCreateShieldInformationBarrier } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

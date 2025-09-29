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
import { serializeShieldInformationBarrierSegmentMember } from '@/schemas/shieldInformationBarrierSegmentMember';
import { deserializeShieldInformationBarrierSegmentMember } from '@/schemas/shieldInformationBarrierSegmentMember';
import { serializeCreateShieldInformationBarrierSegmentMemberRequestBody } from '@/managers/shieldInformationBarrierSegmentMembers';
import { deserializeCreateShieldInformationBarrierSegmentMemberRequestBody } from '@/managers/shieldInformationBarrierSegmentMembers';
import { serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField } from '@/managers/shieldInformationBarrierSegmentMembers';
import { deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField } from '@/managers/shieldInformationBarrierSegmentMembers';
import { serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField } from '@/managers/shieldInformationBarrierSegmentMembers';
import { deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField } from '@/managers/shieldInformationBarrierSegmentMembers';
import { serializeUserBase } from '@/schemas/userBase';
import { deserializeUserBase } from '@/schemas/userBase';
import { serializeShieldInformationBarrierSegmentMembers } from '@/schemas/shieldInformationBarrierSegmentMembers';
import { deserializeShieldInformationBarrierSegmentMembers } from '@/schemas/shieldInformationBarrierSegmentMembers';
import { BoxClient } from '@/client';
import { ShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { ShieldInformationBarrierSegment } from '@/schemas/shieldInformationBarrierSegment';
import { CreateShieldInformationBarrierSegmentRequestBody } from '@/managers/shieldInformationBarrierSegments';
import { ShieldInformationBarrierBase } from '@/schemas/shieldInformationBarrierBase';
import { ShieldInformationBarrierBaseTypeField } from '@/schemas/shieldInformationBarrierBase';
import { ShieldInformationBarrierSegmentMember } from '@/schemas/shieldInformationBarrierSegmentMember';
import { CreateShieldInformationBarrierSegmentMemberRequestBody } from '@/managers/shieldInformationBarrierSegmentMembers';
import { CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField } from '@/managers/shieldInformationBarrierSegmentMembers';
import { CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField } from '@/managers/shieldInformationBarrierSegmentMembers';
import { UserBase } from '@/schemas/userBase';
import { ShieldInformationBarrierSegmentMembers } from '@/schemas/shieldInformationBarrierSegmentMembers';
import { GetShieldInformationBarrierSegmentMembersQueryParams } from '@/managers/shieldInformationBarrierSegmentMembers';
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
test('testShieldInformationBarrierSegmentMembers', async function testShieldInformationBarrierSegmentMembers(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const enterpriseId: string = getEnvVar('ENTERPRISE_ID');
  const barrier: ShieldInformationBarrier =
    await getOrCreateShieldInformationBarrier(client, enterpriseId);
  const barrierId: string = barrier.id!;
  const segmentName: string = getUuid();
  const segment: ShieldInformationBarrierSegment =
    await client.shieldInformationBarrierSegments.createShieldInformationBarrierSegment(
      {
        shieldInformationBarrier: {
          id: barrierId,
          type: 'shield_information_barrier' as ShieldInformationBarrierBaseTypeField,
        } satisfies ShieldInformationBarrierBase,
        name: segmentName,
      } satisfies CreateShieldInformationBarrierSegmentRequestBody,
    );
  if (!(segment.name! == segmentName)) {
    throw new Error('Assertion failed');
  }
  const segmentMember: ShieldInformationBarrierSegmentMember =
    await client.shieldInformationBarrierSegmentMembers.createShieldInformationBarrierSegmentMember(
      {
        shieldInformationBarrierSegment: {
          id: segment.id!,
          type: 'shield_information_barrier_segment' as CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField,
        } satisfies CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField,
        user: new UserBase({ id: getEnvVar('USER_ID') }),
      } satisfies CreateShieldInformationBarrierSegmentMemberRequestBody,
    );
  if (!(segmentMember.user!.id == getEnvVar('USER_ID'))) {
    throw new Error('Assertion failed');
  }
  if (!(segmentMember.shieldInformationBarrierSegment!.id == segment.id!)) {
    throw new Error('Assertion failed');
  }
  const segmentMembers: ShieldInformationBarrierSegmentMembers =
    await client.shieldInformationBarrierSegmentMembers.getShieldInformationBarrierSegmentMembers(
      {
        shieldInformationBarrierSegmentId: segment.id!,
      } satisfies GetShieldInformationBarrierSegmentMembersQueryParams,
    );
  if (!(segmentMembers.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const segmentMemberGet: ShieldInformationBarrierSegmentMember =
    await client.shieldInformationBarrierSegmentMembers.getShieldInformationBarrierSegmentMemberById(
      segmentMember.id!,
    );
  if (!(segmentMemberGet.id! == segmentMember.id!)) {
    throw new Error('Assertion failed');
  }
  await client.shieldInformationBarrierSegmentMembers.deleteShieldInformationBarrierSegmentMemberById(
    segmentMember.id!,
  );
  await expect(async () => {
    await client.shieldInformationBarrierSegmentMembers.getShieldInformationBarrierSegmentMemberById(
      segmentMember.id!,
    );
  }).rejects.toThrow();
  await client.shieldInformationBarrierSegments.deleteShieldInformationBarrierSegmentById(
    segment.id!,
  );
});
export {};

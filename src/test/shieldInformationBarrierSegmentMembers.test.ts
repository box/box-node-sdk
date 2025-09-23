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
import { serializeShieldInformationBarrierSegmentMember } from '../schemas/shieldInformationBarrierSegmentMember.js';
import { deserializeShieldInformationBarrierSegmentMember } from '../schemas/shieldInformationBarrierSegmentMember.js';
import { serializeCreateShieldInformationBarrierSegmentMemberRequestBody } from '../managers/shieldInformationBarrierSegmentMembers.js';
import { deserializeCreateShieldInformationBarrierSegmentMemberRequestBody } from '../managers/shieldInformationBarrierSegmentMembers.js';
import { serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField } from '../managers/shieldInformationBarrierSegmentMembers.js';
import { deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField } from '../managers/shieldInformationBarrierSegmentMembers.js';
import { serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField } from '../managers/shieldInformationBarrierSegmentMembers.js';
import { deserializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField } from '../managers/shieldInformationBarrierSegmentMembers.js';
import { serializeUserBase } from '../schemas/userBase.js';
import { deserializeUserBase } from '../schemas/userBase.js';
import { serializeShieldInformationBarrierSegmentMembers } from '../schemas/shieldInformationBarrierSegmentMembers.js';
import { deserializeShieldInformationBarrierSegmentMembers } from '../schemas/shieldInformationBarrierSegmentMembers.js';
import { BoxClient } from '../client.js';
import { ShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { ShieldInformationBarrierSegment } from '../schemas/shieldInformationBarrierSegment.js';
import { CreateShieldInformationBarrierSegmentRequestBody } from '../managers/shieldInformationBarrierSegments.js';
import { ShieldInformationBarrierBase } from '../schemas/shieldInformationBarrierBase.js';
import { ShieldInformationBarrierBaseTypeField } from '../schemas/shieldInformationBarrierBase.js';
import { ShieldInformationBarrierSegmentMember } from '../schemas/shieldInformationBarrierSegmentMember.js';
import { CreateShieldInformationBarrierSegmentMemberRequestBody } from '../managers/shieldInformationBarrierSegmentMembers.js';
import { CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField } from '../managers/shieldInformationBarrierSegmentMembers.js';
import { CreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField } from '../managers/shieldInformationBarrierSegmentMembers.js';
import { UserBase } from '../schemas/userBase.js';
import { ShieldInformationBarrierSegmentMembers } from '../schemas/shieldInformationBarrierSegmentMembers.js';
import { GetShieldInformationBarrierSegmentMembersQueryParams } from '../managers/shieldInformationBarrierSegmentMembers.js';
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

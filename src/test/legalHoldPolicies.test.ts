import { serializeDateTime } from '@/internal/utils';
import { deserializeDateTime } from '@/internal/utils';
import { serializeLegalHoldPolicy } from '@/schemas/legalHoldPolicy';
import { deserializeLegalHoldPolicy } from '@/schemas/legalHoldPolicy';
import { serializeCreateLegalHoldPolicyRequestBody } from '@/managers/legalHoldPolicies';
import { deserializeCreateLegalHoldPolicyRequestBody } from '@/managers/legalHoldPolicies';
import { serializeLegalHoldPolicies } from '@/schemas/legalHoldPolicies';
import { deserializeLegalHoldPolicies } from '@/schemas/legalHoldPolicies';
import { serializeUpdateLegalHoldPolicyByIdRequestBody } from '@/managers/legalHoldPolicies';
import { deserializeUpdateLegalHoldPolicyByIdRequestBody } from '@/managers/legalHoldPolicies';
import { UpdateLegalHoldPolicyByIdOptionalsInput } from '@/managers/legalHoldPolicies';
import { UpdateLegalHoldPolicyByIdOptionals } from '@/managers/legalHoldPolicies';
import { DateTime } from '@/internal/utils';
import { LegalHoldPolicy } from '@/schemas/legalHoldPolicy';
import { CreateLegalHoldPolicyRequestBody } from '@/managers/legalHoldPolicies';
import { LegalHoldPolicies } from '@/schemas/legalHoldPolicies';
import { UpdateLegalHoldPolicyByIdRequestBody } from '@/managers/legalHoldPolicies';
import { getUuid } from '@/internal/utils';
import { dateTimeFromString } from '@/internal/utils';
import { dateTimeToString } from '@/internal/utils';
import { BoxClient } from '@/client';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testCreateNotOngoingLegalHoldPolicy', async function testCreateNotOngoingLegalHoldPolicy(): Promise<any> {
  const legalHoldPolicyName: string = getUuid();
  const legalHoldDescription: string = 'test description';
  const filterStartedAt: DateTime = dateTimeFromString(
    '2021-01-01T00:00:00-08:00',
  );
  const filterEndedAt: DateTime = dateTimeFromString(
    '2022-01-01T00:00:00-08:00',
  );
  const legalHoldPolicy: LegalHoldPolicy =
    await client.legalHoldPolicies.createLegalHoldPolicy({
      policyName: legalHoldPolicyName,
      description: legalHoldDescription,
      isOngoing: false,
      filterStartedAt: filterStartedAt,
      filterEndedAt: filterEndedAt,
    } satisfies CreateLegalHoldPolicyRequestBody);
  if (!(legalHoldPolicy.policyName == legalHoldPolicyName)) {
    throw new Error('Assertion failed');
  }
  if (!(legalHoldPolicy.description == legalHoldDescription)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      dateTimeToString(legalHoldPolicy.filterStartedAt!) ==
      dateTimeToString(filterStartedAt)
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      dateTimeToString(legalHoldPolicy.filterEndedAt!) ==
      dateTimeToString(filterEndedAt)
    )
  ) {
    throw new Error('Assertion failed');
  }
  await client.legalHoldPolicies.deleteLegalHoldPolicyById(legalHoldPolicy.id);
});
test('testCreateUpdateGetDeleteLegalHoldPolicy', async function testCreateUpdateGetDeleteLegalHoldPolicy(): Promise<any> {
  const legalHoldPolicyName: string = getUuid();
  const legalHoldDescription: string = 'test description';
  const legalHoldPolicy: LegalHoldPolicy =
    await client.legalHoldPolicies.createLegalHoldPolicy({
      policyName: legalHoldPolicyName,
      description: legalHoldDescription,
      isOngoing: true,
    } satisfies CreateLegalHoldPolicyRequestBody);
  if (!(legalHoldPolicy.policyName == legalHoldPolicyName)) {
    throw new Error('Assertion failed');
  }
  if (!(legalHoldPolicy.description == legalHoldDescription)) {
    throw new Error('Assertion failed');
  }
  const legalHoldPolicyId: string = legalHoldPolicy.id;
  const legalHoldPolicyById: LegalHoldPolicy =
    await client.legalHoldPolicies.getLegalHoldPolicyById(legalHoldPolicyId);
  if (!(legalHoldPolicyById.id == legalHoldPolicyId)) {
    throw new Error('Assertion failed');
  }
  const legalHoldPolicies: LegalHoldPolicies =
    await client.legalHoldPolicies.getLegalHoldPolicies();
  if (!(legalHoldPolicies.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const updatedLegalHoldPolicyName: string = getUuid();
  const updatedLegalHoldPolicy: LegalHoldPolicy =
    await client.legalHoldPolicies.updateLegalHoldPolicyById(
      legalHoldPolicyId,
      {
        requestBody: {
          policyName: updatedLegalHoldPolicyName,
        } satisfies UpdateLegalHoldPolicyByIdRequestBody,
      } satisfies UpdateLegalHoldPolicyByIdOptionalsInput,
    );
  if (!(updatedLegalHoldPolicy.policyName == updatedLegalHoldPolicyName)) {
    throw new Error('Assertion failed');
  }
  await client.legalHoldPolicies.deleteLegalHoldPolicyById(legalHoldPolicyId);
});
export {};

import { serializeRetentionPolicy } from '@/schemas/retentionPolicy';
import { deserializeRetentionPolicy } from '@/schemas/retentionPolicy';
import { serializeCreateRetentionPolicyRequestBody } from '@/managers/retentionPolicies';
import { deserializeCreateRetentionPolicyRequestBody } from '@/managers/retentionPolicies';
import { serializeCreateRetentionPolicyRequestBodyPolicyTypeField } from '@/managers/retentionPolicies';
import { deserializeCreateRetentionPolicyRequestBodyPolicyTypeField } from '@/managers/retentionPolicies';
import { serializeCreateRetentionPolicyRequestBodyDispositionActionField } from '@/managers/retentionPolicies';
import { deserializeCreateRetentionPolicyRequestBodyDispositionActionField } from '@/managers/retentionPolicies';
import { serializeCreateRetentionPolicyRequestBodyRetentionTypeField } from '@/managers/retentionPolicies';
import { deserializeCreateRetentionPolicyRequestBodyRetentionTypeField } from '@/managers/retentionPolicies';
import { serializeRetentionPolicies } from '@/schemas/retentionPolicies';
import { deserializeRetentionPolicies } from '@/schemas/retentionPolicies';
import { serializeUpdateRetentionPolicyByIdRequestBody } from '@/managers/retentionPolicies';
import { deserializeUpdateRetentionPolicyByIdRequestBody } from '@/managers/retentionPolicies';
import { UpdateRetentionPolicyByIdOptionalsInput } from '@/managers/retentionPolicies';
import { UpdateRetentionPolicyByIdOptionals } from '@/managers/retentionPolicies';
import { RetentionPolicy } from '@/schemas/retentionPolicy';
import { CreateRetentionPolicyRequestBody } from '@/managers/retentionPolicies';
import { CreateRetentionPolicyRequestBodyPolicyTypeField } from '@/managers/retentionPolicies';
import { CreateRetentionPolicyRequestBodyDispositionActionField } from '@/managers/retentionPolicies';
import { CreateRetentionPolicyRequestBodyRetentionTypeField } from '@/managers/retentionPolicies';
import { RetentionPolicies } from '@/schemas/retentionPolicies';
import { UpdateRetentionPolicyByIdRequestBody } from '@/managers/retentionPolicies';
import { getUuid } from '@/internal/utils';
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
test('testCreateUpdateGetDeleteRetentionPolicy', async function testCreateUpdateGetDeleteRetentionPolicy(): Promise<any> {
  const retentionPolicyName: string = getUuid();
  const retentionDescription: string = 'test description';
  const retentionPolicy: RetentionPolicy =
    await client.retentionPolicies.createRetentionPolicy({
      policyName: retentionPolicyName,
      policyType: 'finite' as CreateRetentionPolicyRequestBodyPolicyTypeField,
      areOwnersNotified: true,
      canOwnerExtendRetention: true,
      description: retentionDescription,
      dispositionAction:
        'remove_retention' as CreateRetentionPolicyRequestBodyDispositionActionField,
      retentionLength: '1',
      retentionType:
        'modifiable' as CreateRetentionPolicyRequestBodyRetentionTypeField,
    } satisfies CreateRetentionPolicyRequestBody);
  if (!(retentionPolicy.policyName == retentionPolicyName)) {
    throw new Error('Assertion failed');
  }
  if (!(retentionPolicy.description == retentionDescription)) {
    throw new Error('Assertion failed');
  }
  const retentionPolicyById: RetentionPolicy =
    await client.retentionPolicies.getRetentionPolicyById(retentionPolicy.id);
  if (!(retentionPolicyById.id == retentionPolicy.id)) {
    throw new Error('Assertion failed');
  }
  const retentionPolicies: RetentionPolicies =
    await client.retentionPolicies.getRetentionPolicies();
  if (!(retentionPolicies.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const updatedRetentionPolicyName: string = getUuid();
  const updatedRetentionPolicy: RetentionPolicy =
    await client.retentionPolicies.updateRetentionPolicyById(
      retentionPolicy.id,
      {
        requestBody: {
          policyName: updatedRetentionPolicyName,
        } satisfies UpdateRetentionPolicyByIdRequestBody,
      } satisfies UpdateRetentionPolicyByIdOptionalsInput,
    );
  if (!(updatedRetentionPolicy.policyName == updatedRetentionPolicyName)) {
    throw new Error('Assertion failed');
  }
  await client.retentionPolicies.deleteRetentionPolicyById(retentionPolicy.id);
});
export {};

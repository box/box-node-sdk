import { serializeRetentionPolicy } from '../schemas/retentionPolicy.js';
import { deserializeRetentionPolicy } from '../schemas/retentionPolicy.js';
import { serializeCreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.js';
import { deserializeCreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.js';
import { serializeCreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.js';
import { deserializeCreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.js';
import { serializeCreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.js';
import { deserializeCreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.js';
import { serializeCreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.js';
import { deserializeCreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.js';
import { serializeRetentionPolicies } from '../schemas/retentionPolicies.js';
import { deserializeRetentionPolicies } from '../schemas/retentionPolicies.js';
import { serializeUpdateRetentionPolicyByIdRequestBody } from '../managers/retentionPolicies.js';
import { deserializeUpdateRetentionPolicyByIdRequestBody } from '../managers/retentionPolicies.js';
import { UpdateRetentionPolicyByIdOptionalsInput } from '../managers/retentionPolicies.js';
import { UpdateRetentionPolicyByIdOptionals } from '../managers/retentionPolicies.js';
import { RetentionPolicy } from '../schemas/retentionPolicy.js';
import { CreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.js';
import { CreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.js';
import { CreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.js';
import { CreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.js';
import { RetentionPolicies } from '../schemas/retentionPolicies.js';
import { UpdateRetentionPolicyByIdRequestBody } from '../managers/retentionPolicies.js';
import { getUuid } from '../internal/utils.js';
import { BoxClient } from '../client.js';
import { getDefaultClient } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
      } satisfies UpdateRetentionPolicyByIdOptionalsInput
    );
  if (!(updatedRetentionPolicy.policyName == updatedRetentionPolicyName)) {
    throw new Error('Assertion failed');
  }
  await client.retentionPolicies.deleteRetentionPolicyById(retentionPolicy.id);
});
export {};

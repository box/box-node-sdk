import { serializeRetentionPolicy } from '../schemas/retentionPolicy.generated.js';
import { deserializeRetentionPolicy } from '../schemas/retentionPolicy.generated.js';
import { serializeCreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.generated.js';
import { deserializeCreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.generated.js';
import { serializeCreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.generated.js';
import { deserializeCreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.generated.js';
import { serializeCreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.generated.js';
import { deserializeCreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.generated.js';
import { serializeCreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.generated.js';
import { deserializeCreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.generated.js';
import { serializeRetentionPolicies } from '../schemas/retentionPolicies.generated.js';
import { deserializeRetentionPolicies } from '../schemas/retentionPolicies.generated.js';
import { serializeUpdateRetentionPolicyByIdRequestBody } from '../managers/retentionPolicies.generated.js';
import { deserializeUpdateRetentionPolicyByIdRequestBody } from '../managers/retentionPolicies.generated.js';
import { UpdateRetentionPolicyByIdOptionalsInput } from '../managers/retentionPolicies.generated.js';
import { UpdateRetentionPolicyByIdOptionals } from '../managers/retentionPolicies.generated.js';
import { RetentionPolicy } from '../schemas/retentionPolicy.generated.js';
import { CreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.generated.js';
import { CreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.generated.js';
import { CreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.generated.js';
import { CreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.generated.js';
import { RetentionPolicies } from '../schemas/retentionPolicies.generated.js';
import { UpdateRetentionPolicyByIdRequestBody } from '../managers/retentionPolicies.generated.js';
import { getUuid } from '../internal/utils.js';
import { BoxClient } from '../client.generated.js';
import { getDefaultClient } from './commons.generated.js';
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
      } satisfies UpdateRetentionPolicyByIdOptionalsInput,
    );
  if (!(updatedRetentionPolicy.policyName == updatedRetentionPolicyName)) {
    throw new Error('Assertion failed');
  }
  await client.retentionPolicies.deleteRetentionPolicyById(retentionPolicy.id);
});
export {};

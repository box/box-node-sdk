import { serializeStoragePolicyAssignment } from '../schemas/storagePolicyAssignment.generated.js';
import { deserializeStoragePolicyAssignment } from '../schemas/storagePolicyAssignment.generated.js';
import { serializeStoragePolicyAssignments } from '../schemas/storagePolicyAssignments.generated.js';
import { deserializeStoragePolicyAssignments } from '../schemas/storagePolicyAssignments.generated.js';
import { serializeGetStoragePolicyAssignmentsQueryParamsResolvedForTypeField } from '../managers/storagePolicyAssignments.generated.js';
import { deserializeGetStoragePolicyAssignmentsQueryParamsResolvedForTypeField } from '../managers/storagePolicyAssignments.generated.js';
import { serializeCreateStoragePolicyAssignmentRequestBody } from '../managers/storagePolicyAssignments.generated.js';
import { deserializeCreateStoragePolicyAssignmentRequestBody } from '../managers/storagePolicyAssignments.generated.js';
import { serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.generated.js';
import { deserializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.generated.js';
import { serializeCreateStoragePolicyAssignmentRequestBodyAssignedToField } from '../managers/storagePolicyAssignments.generated.js';
import { deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToField } from '../managers/storagePolicyAssignments.generated.js';
import { serializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField } from '../managers/storagePolicyAssignments.generated.js';
import { deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField } from '../managers/storagePolicyAssignments.generated.js';
import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeCreateUserRequestBody } from '../managers/users.generated.js';
import { deserializeCreateUserRequestBody } from '../managers/users.generated.js';
import { serializeStoragePolicies } from '../schemas/storagePolicies.generated.js';
import { deserializeStoragePolicies } from '../schemas/storagePolicies.generated.js';
import { serializeStoragePolicy } from '../schemas/storagePolicy.generated.js';
import { deserializeStoragePolicy } from '../schemas/storagePolicy.generated.js';
import { serializeUpdateStoragePolicyAssignmentByIdRequestBody } from '../managers/storagePolicyAssignments.generated.js';
import { deserializeUpdateStoragePolicyAssignmentByIdRequestBody } from '../managers/storagePolicyAssignments.generated.js';
import { serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.generated.js';
import { deserializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.generated.js';
import { BoxClientInput } from '../client.generated.js';
import { StoragePolicyAssignment } from '../schemas/storagePolicyAssignment.generated.js';
import { StoragePolicyAssignments } from '../schemas/storagePolicyAssignments.generated.js';
import { GetStoragePolicyAssignmentsQueryParams } from '../managers/storagePolicyAssignments.generated.js';
import { GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField } from '../managers/storagePolicyAssignments.generated.js';
import { CreateStoragePolicyAssignmentRequestBody } from '../managers/storagePolicyAssignments.generated.js';
import { CreateStoragePolicyAssignmentRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.generated.js';
import { CreateStoragePolicyAssignmentRequestBodyAssignedToField } from '../managers/storagePolicyAssignments.generated.js';
import { CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField } from '../managers/storagePolicyAssignments.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { CreateUserRequestBody } from '../managers/users.generated.js';
import { StoragePolicies } from '../schemas/storagePolicies.generated.js';
import { StoragePolicy } from '../schemas/storagePolicy.generated.js';
import { UpdateStoragePolicyAssignmentByIdRequestBody } from '../managers/storagePolicyAssignments.generated.js';
import { UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.generated.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { BoxClient } from '../client.generated.js';
import { getUuid } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const adminUserId: string = getEnvVar('USER_ID');
export async function getOrCreateStoragePolicyAssignment(
  clientInput: BoxClientInput,
  policyId: string,
  userId: string,
): Promise<StoragePolicyAssignment> {
  const client: BoxClient = new BoxClient({
    auth: clientInput.auth,
    networkSession: clientInput.networkSession,
  });
  const storagePolicyAssignments: StoragePolicyAssignments =
    await client.storagePolicyAssignments.getStoragePolicyAssignments({
      resolvedForType:
        'user' as GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField,
      resolvedForId: userId,
    } satisfies GetStoragePolicyAssignmentsQueryParams);
  if (storagePolicyAssignments.entries!.length > 0) {
    if (
      (toString(
        storagePolicyAssignments.entries![0].assignedTo!.type,
      ) as string) == 'user'
    ) {
      return storagePolicyAssignments.entries![0];
    }
  }
  const storagePolicyAssignment: StoragePolicyAssignment =
    await client.storagePolicyAssignments.createStoragePolicyAssignment({
      storagePolicy:
        new CreateStoragePolicyAssignmentRequestBodyStoragePolicyField({
          id: policyId,
        }),
      assignedTo: {
        id: userId,
        type: 'user' as CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField,
      } satisfies CreateStoragePolicyAssignmentRequestBodyAssignedToField,
    } satisfies CreateStoragePolicyAssignmentRequestBody);
  return storagePolicyAssignment;
}
test('testGetStoragePolicyAssignments', async function testGetStoragePolicyAssignments(): Promise<any> {
  const client: BoxClient = getDefaultClientWithUserSubject(adminUserId);
  const userName: string = getUuid();
  const newUser: UserFull = await client.users.createUser({
    name: userName,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  const storagePolicies: StoragePolicies =
    await client.storagePolicies.getStoragePolicies();
  const storagePolicy1: StoragePolicy = storagePolicies.entries![0];
  const storagePolicy2: StoragePolicy = storagePolicies.entries![1];
  const storagePolicyAssignment: StoragePolicyAssignment =
    await getOrCreateStoragePolicyAssignment(
      client,
      storagePolicy1.id,
      newUser.id,
    );
  if (
    !(
      (toString(storagePolicyAssignment.type) as string) ==
      'storage_policy_assignment'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(storagePolicyAssignment.assignedTo!.type) as string) == 'user')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(storagePolicyAssignment.assignedTo!.id == newUser.id)) {
    throw new Error('Assertion failed');
  }
  const getStoragePolicyAssignment: StoragePolicyAssignment =
    await client.storagePolicyAssignments.getStoragePolicyAssignmentById(
      storagePolicyAssignment.id,
    );
  if (!(getStoragePolicyAssignment.id == storagePolicyAssignment.id)) {
    throw new Error('Assertion failed');
  }
  const updatedStoragePolicyAssignment: StoragePolicyAssignment =
    await client.storagePolicyAssignments.updateStoragePolicyAssignmentById(
      storagePolicyAssignment.id,
      {
        storagePolicy:
          new UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField({
            id: storagePolicy2.id,
          }),
      } satisfies UpdateStoragePolicyAssignmentByIdRequestBody,
    );
  if (
    !(updatedStoragePolicyAssignment.storagePolicy!.id == storagePolicy2.id)
  ) {
    throw new Error('Assertion failed');
  }
  await client.storagePolicyAssignments.deleteStoragePolicyAssignmentById(
    storagePolicyAssignment.id,
  );
  await client.users.deleteUserById(newUser.id);
});
export {};

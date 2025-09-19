import { serializeStoragePolicyAssignment } from '../schemas/storagePolicyAssignment.js';
import { deserializeStoragePolicyAssignment } from '../schemas/storagePolicyAssignment.js';
import { serializeStoragePolicyAssignments } from '../schemas/storagePolicyAssignments.js';
import { deserializeStoragePolicyAssignments } from '../schemas/storagePolicyAssignments.js';
import { serializeGetStoragePolicyAssignmentsQueryParamsResolvedForTypeField } from '../managers/storagePolicyAssignments.js';
import { deserializeGetStoragePolicyAssignmentsQueryParamsResolvedForTypeField } from '../managers/storagePolicyAssignments.js';
import { serializeCreateStoragePolicyAssignmentRequestBody } from '../managers/storagePolicyAssignments.js';
import { deserializeCreateStoragePolicyAssignmentRequestBody } from '../managers/storagePolicyAssignments.js';
import { serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.js';
import { deserializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.js';
import { serializeCreateStoragePolicyAssignmentRequestBodyAssignedToField } from '../managers/storagePolicyAssignments.js';
import { deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToField } from '../managers/storagePolicyAssignments.js';
import { serializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField } from '../managers/storagePolicyAssignments.js';
import { deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField } from '../managers/storagePolicyAssignments.js';
import { serializeUserFull } from '../schemas/userFull.js';
import { deserializeUserFull } from '../schemas/userFull.js';
import { serializeCreateUserRequestBody } from '../managers/users.js';
import { deserializeCreateUserRequestBody } from '../managers/users.js';
import { serializeStoragePolicies } from '../schemas/storagePolicies.js';
import { deserializeStoragePolicies } from '../schemas/storagePolicies.js';
import { serializeStoragePolicy } from '../schemas/storagePolicy.js';
import { deserializeStoragePolicy } from '../schemas/storagePolicy.js';
import { serializeUpdateStoragePolicyAssignmentByIdRequestBody } from '../managers/storagePolicyAssignments.js';
import { deserializeUpdateStoragePolicyAssignmentByIdRequestBody } from '../managers/storagePolicyAssignments.js';
import { serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.js';
import { deserializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.js';
import { BoxClientInput } from '../client.js';
import { StoragePolicyAssignment } from '../schemas/storagePolicyAssignment.js';
import { StoragePolicyAssignments } from '../schemas/storagePolicyAssignments.js';
import { GetStoragePolicyAssignmentsQueryParams } from '../managers/storagePolicyAssignments.js';
import { GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField } from '../managers/storagePolicyAssignments.js';
import { CreateStoragePolicyAssignmentRequestBody } from '../managers/storagePolicyAssignments.js';
import { CreateStoragePolicyAssignmentRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.js';
import { CreateStoragePolicyAssignmentRequestBodyAssignedToField } from '../managers/storagePolicyAssignments.js';
import { CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField } from '../managers/storagePolicyAssignments.js';
import { UserFull } from '../schemas/userFull.js';
import { CreateUserRequestBody } from '../managers/users.js';
import { StoragePolicies } from '../schemas/storagePolicies.js';
import { StoragePolicy } from '../schemas/storagePolicy.js';
import { UpdateStoragePolicyAssignmentByIdRequestBody } from '../managers/storagePolicyAssignments.js';
import { UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField } from '../managers/storagePolicyAssignments.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClientWithUserSubject } from './commons.js';
import { BoxClient } from '../client.js';
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
  userId: string
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
        storagePolicyAssignments.entries![0].assignedTo!.type
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
      newUser.id
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
      storagePolicyAssignment.id
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
      } satisfies UpdateStoragePolicyAssignmentByIdRequestBody
    );
  if (
    !(updatedStoragePolicyAssignment.storagePolicy!.id == storagePolicy2.id)
  ) {
    throw new Error('Assertion failed');
  }
  await client.storagePolicyAssignments.deleteStoragePolicyAssignmentById(
    storagePolicyAssignment.id
  );
  await client.users.deleteUserById(newUser.id);
});
export {};

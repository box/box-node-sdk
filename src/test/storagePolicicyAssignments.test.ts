import { serializeStoragePolicyAssignment } from '@/schemas/storagePolicyAssignment';
import { deserializeStoragePolicyAssignment } from '@/schemas/storagePolicyAssignment';
import { serializeStoragePolicyAssignments } from '@/schemas/storagePolicyAssignments';
import { deserializeStoragePolicyAssignments } from '@/schemas/storagePolicyAssignments';
import { serializeGetStoragePolicyAssignmentsQueryParamsResolvedForTypeField } from '@/managers/storagePolicyAssignments';
import { deserializeGetStoragePolicyAssignmentsQueryParamsResolvedForTypeField } from '@/managers/storagePolicyAssignments';
import { serializeCreateStoragePolicyAssignmentRequestBody } from '@/managers/storagePolicyAssignments';
import { deserializeCreateStoragePolicyAssignmentRequestBody } from '@/managers/storagePolicyAssignments';
import { serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField } from '@/managers/storagePolicyAssignments';
import { deserializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField } from '@/managers/storagePolicyAssignments';
import { serializeCreateStoragePolicyAssignmentRequestBodyAssignedToField } from '@/managers/storagePolicyAssignments';
import { deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToField } from '@/managers/storagePolicyAssignments';
import { serializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField } from '@/managers/storagePolicyAssignments';
import { deserializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField } from '@/managers/storagePolicyAssignments';
import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeCreateUserRequestBody } from '@/managers/users';
import { deserializeCreateUserRequestBody } from '@/managers/users';
import { serializeStoragePolicies } from '@/schemas/storagePolicies';
import { deserializeStoragePolicies } from '@/schemas/storagePolicies';
import { serializeStoragePolicy } from '@/schemas/storagePolicy';
import { deserializeStoragePolicy } from '@/schemas/storagePolicy';
import { serializeUpdateStoragePolicyAssignmentByIdRequestBody } from '@/managers/storagePolicyAssignments';
import { deserializeUpdateStoragePolicyAssignmentByIdRequestBody } from '@/managers/storagePolicyAssignments';
import { serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField } from '@/managers/storagePolicyAssignments';
import { deserializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField } from '@/managers/storagePolicyAssignments';
import { BoxClientInput } from '@/client';
import { StoragePolicyAssignment } from '@/schemas/storagePolicyAssignment';
import { StoragePolicyAssignments } from '@/schemas/storagePolicyAssignments';
import { GetStoragePolicyAssignmentsQueryParams } from '@/managers/storagePolicyAssignments';
import { GetStoragePolicyAssignmentsQueryParamsResolvedForTypeField } from '@/managers/storagePolicyAssignments';
import { CreateStoragePolicyAssignmentRequestBody } from '@/managers/storagePolicyAssignments';
import { CreateStoragePolicyAssignmentRequestBodyStoragePolicyField } from '@/managers/storagePolicyAssignments';
import { CreateStoragePolicyAssignmentRequestBodyAssignedToField } from '@/managers/storagePolicyAssignments';
import { CreateStoragePolicyAssignmentRequestBodyAssignedToTypeField } from '@/managers/storagePolicyAssignments';
import { UserFull } from '@/schemas/userFull';
import { CreateUserRequestBody } from '@/managers/users';
import { StoragePolicies } from '@/schemas/storagePolicies';
import { StoragePolicy } from '@/schemas/storagePolicy';
import { UpdateStoragePolicyAssignmentByIdRequestBody } from '@/managers/storagePolicyAssignments';
import { UpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField } from '@/managers/storagePolicyAssignments';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClientWithUserSubject } from './commons';
import { BoxClient } from '@/client';
import { getUuid } from '@/internal/utils';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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

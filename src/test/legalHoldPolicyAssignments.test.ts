import { serializeLegalHoldPolicy } from '../schemas/legalHoldPolicy.js';
import { deserializeLegalHoldPolicy } from '../schemas/legalHoldPolicy.js';
import { serializeCreateLegalHoldPolicyRequestBody } from '../managers/legalHoldPolicies.js';
import { deserializeCreateLegalHoldPolicyRequestBody } from '../managers/legalHoldPolicies.js';
import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeLegalHoldPolicyAssignment } from '../schemas/legalHoldPolicyAssignment.js';
import { deserializeLegalHoldPolicyAssignment } from '../schemas/legalHoldPolicyAssignment.js';
import { serializeCreateLegalHoldPolicyAssignmentRequestBody } from '../managers/legalHoldPolicyAssignments.js';
import { deserializeCreateLegalHoldPolicyAssignmentRequestBody } from '../managers/legalHoldPolicyAssignments.js';
import { serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToField } from '../managers/legalHoldPolicyAssignments.js';
import { deserializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToField } from '../managers/legalHoldPolicyAssignments.js';
import { serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/legalHoldPolicyAssignments.js';
import { deserializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/legalHoldPolicyAssignments.js';
import { serializeLegalHoldPolicyAssignments } from '../schemas/legalHoldPolicyAssignments.js';
import { deserializeLegalHoldPolicyAssignments } from '../schemas/legalHoldPolicyAssignments.js';
import { serializeFilesOnHold } from '../schemas/filesOnHold.js';
import { deserializeFilesOnHold } from '../schemas/filesOnHold.js';
import { BoxClient } from '../client.js';
import { LegalHoldPolicy } from '../schemas/legalHoldPolicy.js';
import { CreateLegalHoldPolicyRequestBody } from '../managers/legalHoldPolicies.js';
import { FileFull } from '../schemas/fileFull.js';
import { LegalHoldPolicyAssignment } from '../schemas/legalHoldPolicyAssignment.js';
import { CreateLegalHoldPolicyAssignmentRequestBody } from '../managers/legalHoldPolicyAssignments.js';
import { CreateLegalHoldPolicyAssignmentRequestBodyAssignToField } from '../managers/legalHoldPolicyAssignments.js';
import { CreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/legalHoldPolicyAssignments.js';
import { LegalHoldPolicyAssignments } from '../schemas/legalHoldPolicyAssignments.js';
import { GetLegalHoldPolicyAssignmentsQueryParams } from '../managers/legalHoldPolicyAssignments.js';
import { FilesOnHold } from '../schemas/filesOnHold.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { uploadNewFile } from './commons.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testLegalHoldPolicyAssignments', async function testLegalHoldPolicyAssignments(): Promise<any> {
  const legalHoldPolicyName: string = getUuid();
  const legalHoldDescription: string = 'test description';
  const legalHoldPolicy: LegalHoldPolicy =
    await client.legalHoldPolicies.createLegalHoldPolicy({
      policyName: legalHoldPolicyName,
      description: legalHoldDescription,
      isOngoing: true,
    } satisfies CreateLegalHoldPolicyRequestBody);
  const legalHoldPolicyId: string = legalHoldPolicy.id;
  const file: FileFull = await uploadNewFile();
  const fileId: string = file.id;
  const legalHoldPolicyAssignment: LegalHoldPolicyAssignment =
    await client.legalHoldPolicyAssignments.createLegalHoldPolicyAssignment({
      policyId: legalHoldPolicyId,
      assignTo: {
        type: 'file' as CreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField,
        id: fileId,
      } satisfies CreateLegalHoldPolicyAssignmentRequestBodyAssignToField,
    } satisfies CreateLegalHoldPolicyAssignmentRequestBody);
  if (
    !(
      (toString(legalHoldPolicyAssignment.legalHoldPolicy!.type) as string) ==
      'legal_hold_policy'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!(legalHoldPolicyAssignment.assignedTo!.id == fileId)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(legalHoldPolicyAssignment.assignedTo!.type) as string) == 'file'
    )
  ) {
    throw new Error('Assertion failed');
  }
  const legalHoldPolicyAssignmentId: string = legalHoldPolicyAssignment.id!;
  const legalHoldPolicyAssignmentFromApi: LegalHoldPolicyAssignment =
    await client.legalHoldPolicyAssignments.getLegalHoldPolicyAssignmentById(
      legalHoldPolicyAssignmentId,
    );
  if (!(legalHoldPolicyAssignmentFromApi.id! == legalHoldPolicyAssignmentId)) {
    throw new Error('Assertion failed');
  }
  const legalPolicyAssignments: LegalHoldPolicyAssignments =
    await client.legalHoldPolicyAssignments.getLegalHoldPolicyAssignments({
      policyId: legalHoldPolicyId,
    } satisfies GetLegalHoldPolicyAssignmentsQueryParams);
  if (!(legalPolicyAssignments.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  const filesOnHold: FilesOnHold =
    await client.legalHoldPolicyAssignments.getLegalHoldPolicyAssignmentFileOnHold(
      legalHoldPolicyAssignmentId,
    );
  if (!(filesOnHold.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  if (!(filesOnHold.entries![0].id == fileId)) {
    throw new Error('Assertion failed');
  }
  await client.legalHoldPolicyAssignments.deleteLegalHoldPolicyAssignmentById(
    legalHoldPolicyAssignmentId,
  );
  await expect(async () => {
    await client.legalHoldPolicyAssignments.deleteLegalHoldPolicyAssignmentById(
      legalHoldPolicyAssignmentId,
    );
  }).rejects.toThrow();
  await client.files.deleteFileById(fileId);
  try {
    await client.legalHoldPolicies.deleteLegalHoldPolicyById(legalHoldPolicyId);
  } catch (error) {
    console.log(
      ''.concat(
        'Could not delete Legal Policy with id: ',
        legalHoldPolicyId,
      ) as string,
    );
  } finally {
  }
});
export {};

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
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeCreateFolderRequestBody } from '@/managers/folders';
import { deserializeCreateFolderRequestBody } from '@/managers/folders';
import { serializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { deserializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeUploadFileVersionRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileVersionRequestBodyAttributesField } from '@/managers/uploads';
import { serializeRetentionPolicyAssignment } from '@/schemas/retentionPolicyAssignment';
import { deserializeRetentionPolicyAssignment } from '@/schemas/retentionPolicyAssignment';
import { serializeCreateRetentionPolicyAssignmentRequestBody } from '@/managers/retentionPolicyAssignments';
import { deserializeCreateRetentionPolicyAssignmentRequestBody } from '@/managers/retentionPolicyAssignments';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '@/managers/retentionPolicyAssignments';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '@/managers/retentionPolicyAssignments';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '@/managers/retentionPolicyAssignments';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '@/managers/retentionPolicyAssignments';
import { serializeRetentionPolicyAssignments } from '@/schemas/retentionPolicyAssignments';
import { deserializeRetentionPolicyAssignments } from '@/schemas/retentionPolicyAssignments';
import { serializeFilesUnderRetention } from '@/schemas/filesUnderRetention';
import { deserializeFilesUnderRetention } from '@/schemas/filesUnderRetention';
import { BoxClient } from '@/client';
import { RetentionPolicy } from '@/schemas/retentionPolicy';
import { CreateRetentionPolicyRequestBody } from '@/managers/retentionPolicies';
import { CreateRetentionPolicyRequestBodyPolicyTypeField } from '@/managers/retentionPolicies';
import { CreateRetentionPolicyRequestBodyDispositionActionField } from '@/managers/retentionPolicies';
import { CreateRetentionPolicyRequestBodyRetentionTypeField } from '@/managers/retentionPolicies';
import { FolderFull } from '@/schemas/folderFull';
import { CreateFolderRequestBody } from '@/managers/folders';
import { CreateFolderRequestBodyParentField } from '@/managers/folders';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { UploadFileVersionRequestBody } from '@/managers/uploads';
import { UploadFileVersionRequestBodyAttributesField } from '@/managers/uploads';
import { RetentionPolicyAssignment } from '@/schemas/retentionPolicyAssignment';
import { CreateRetentionPolicyAssignmentRequestBody } from '@/managers/retentionPolicyAssignments';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToField } from '@/managers/retentionPolicyAssignments';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '@/managers/retentionPolicyAssignments';
import { RetentionPolicyAssignments } from '@/schemas/retentionPolicyAssignments';
import { FilesUnderRetention } from '@/schemas/filesUnderRetention';
import { decodeBase64 } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testCreateUpdateGetDeleteRetentionPolicyAssignment', async function testCreateUpdateGetDeleteRetentionPolicyAssignment(): Promise<any> {
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
  const folder: FolderFull = await client.folders.createFolder({
    name: getUuid(),
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  const files: Files = await client.uploads.uploadFile({
    attributes: {
      name: getUuid(),
      parent: {
        id: folder.id,
      } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: generateByteStream(10),
  } satisfies UploadFileRequestBody);
  const file: FileFull = files.entries![0];
  const newVersions: Files = await client.uploads.uploadFileVersion(file.id, {
    attributes: {
      name: getUuid(),
    } satisfies UploadFileVersionRequestBodyAttributesField,
    file: generateByteStream(20),
  } satisfies UploadFileVersionRequestBody);
  const newVersion: FileFull = newVersions.entries![0];
  const retentionPolicyAssignment: RetentionPolicyAssignment =
    await client.retentionPolicyAssignments.createRetentionPolicyAssignment({
      policyId: retentionPolicy.id,
      assignTo: {
        type: 'folder' as CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField,
        id: folder.id,
      } satisfies CreateRetentionPolicyAssignmentRequestBodyAssignToField,
    } satisfies CreateRetentionPolicyAssignmentRequestBody);
  if (!(retentionPolicyAssignment.retentionPolicy!.id == retentionPolicy.id)) {
    throw new Error('Assertion failed');
  }
  if (!(retentionPolicyAssignment.assignedTo!.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  const retentionPolicyAssignmentById: RetentionPolicyAssignment =
    await client.retentionPolicyAssignments.getRetentionPolicyAssignmentById(
      retentionPolicyAssignment.id,
    );
  if (!(retentionPolicyAssignmentById.id == retentionPolicyAssignment.id)) {
    throw new Error('Assertion failed');
  }
  const retentionPolicyAssignments: RetentionPolicyAssignments =
    await client.retentionPolicyAssignments.getRetentionPolicyAssignments(
      retentionPolicy.id,
    );
  if (!(retentionPolicyAssignments.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  const filesUnderRetention: FilesUnderRetention =
    await client.retentionPolicyAssignments.getFilesUnderRetentionPolicyAssignment(
      retentionPolicyAssignment.id,
    );
  if (!(filesUnderRetention.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  await client.retentionPolicyAssignments.deleteRetentionPolicyAssignmentById(
    retentionPolicyAssignment.id,
  );
  const retentionPolicyAssignmentsAfterDelete: RetentionPolicyAssignments =
    await client.retentionPolicyAssignments.getRetentionPolicyAssignments(
      retentionPolicy.id,
    );
  if (!(retentionPolicyAssignmentsAfterDelete.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  await client.retentionPolicies.deleteRetentionPolicyById(retentionPolicy.id);
  await client.files.deleteFileById(file.id);
});
export {};

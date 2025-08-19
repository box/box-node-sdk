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
import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { serializeFiles } from '../schemas/files.js';
import { deserializeFiles } from '../schemas/files.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeUploadFileVersionRequestBodyAttributesField } from '../managers/uploads.js';
import { deserializeUploadFileVersionRequestBodyAttributesField } from '../managers/uploads.js';
import { serializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.js';
import { deserializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.js';
import { serializeCreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.js';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.js';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.js';
import { serializeRetentionPolicyAssignments } from '../schemas/retentionPolicyAssignments.js';
import { deserializeRetentionPolicyAssignments } from '../schemas/retentionPolicyAssignments.js';
import { serializeFilesUnderRetention } from '../schemas/filesUnderRetention.js';
import { deserializeFilesUnderRetention } from '../schemas/filesUnderRetention.js';
import { BoxClient } from '../client.js';
import { RetentionPolicy } from '../schemas/retentionPolicy.js';
import { CreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.js';
import { CreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.js';
import { CreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.js';
import { CreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.js';
import { FolderFull } from '../schemas/folderFull.js';
import { CreateFolderRequestBody } from '../managers/folders.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.js';
import { Files } from '../schemas/files.js';
import { UploadFileRequestBody } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { FileFull } from '../schemas/fileFull.js';
import { UploadFileVersionRequestBody } from '../managers/uploads.js';
import { UploadFileVersionRequestBodyAttributesField } from '../managers/uploads.js';
import { RetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.js';
import { CreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.js';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.js';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.js';
import { RetentionPolicyAssignments } from '../schemas/retentionPolicyAssignments.js';
import { FilesUnderRetention } from '../schemas/filesUnderRetention.js';
import { decodeBase64 } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

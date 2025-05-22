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
import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeUploadFileVersionRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileVersionRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.generated.js';
import { deserializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.generated.js';
import { serializeCreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.generated.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.generated.js';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.generated.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.generated.js';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.generated.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.generated.js';
import { serializeRetentionPolicyAssignments } from '../schemas/retentionPolicyAssignments.generated.js';
import { deserializeRetentionPolicyAssignments } from '../schemas/retentionPolicyAssignments.generated.js';
import { serializeFilesUnderRetention } from '../schemas/filesUnderRetention.generated.js';
import { deserializeFilesUnderRetention } from '../schemas/filesUnderRetention.generated.js';
import { BoxClient } from '../client.generated.js';
import { RetentionPolicy } from '../schemas/retentionPolicy.generated.js';
import { CreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.generated.js';
import { CreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.generated.js';
import { CreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.generated.js';
import { CreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { CreateFolderRequestBody } from '../managers/folders.generated.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { UploadFileVersionRequestBody } from '../managers/uploads.generated.js';
import { UploadFileVersionRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { RetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.generated.js';
import { CreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.generated.js';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.generated.js';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.generated.js';
import { RetentionPolicyAssignments } from '../schemas/retentionPolicyAssignments.generated.js';
import { FilesUnderRetention } from '../schemas/filesUnderRetention.generated.js';
import { decodeBase64 } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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

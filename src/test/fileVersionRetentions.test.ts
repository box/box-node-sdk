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
import { serializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.js';
import { deserializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.js';
import { serializeCreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.js';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.js';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.js';
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
import { serializeFileVersionRetentions } from '../schemas/fileVersionRetentions.js';
import { deserializeFileVersionRetentions } from '../schemas/fileVersionRetentions.js';
import { serializeFileVersionRetention } from '../schemas/fileVersionRetention.js';
import { deserializeFileVersionRetention } from '../schemas/fileVersionRetention.js';
import { DeleteFolderByIdOptionalsInput } from '../managers/folders.js';
import { DeleteFolderByIdOptionals } from '../managers/folders.js';
import { RetentionPolicy } from '../schemas/retentionPolicy.js';
import { CreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.js';
import { CreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.js';
import { CreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.js';
import { CreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.js';
import { FolderFull } from '../schemas/folderFull.js';
import { RetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.js';
import { CreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.js';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.js';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.js';
import { Files } from '../schemas/files.js';
import { UploadFileRequestBody } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { FileFull } from '../schemas/fileFull.js';
import { UploadFileVersionRequestBody } from '../managers/uploads.js';
import { UploadFileVersionRequestBodyAttributesField } from '../managers/uploads.js';
import { FileVersionRetentions } from '../schemas/fileVersionRetentions.js';
import { DeleteFolderByIdQueryParams } from '../managers/folders.js';
import { FileVersionRetention } from '../schemas/fileVersionRetention.js';
import { generateByteStream } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { BoxClient } from '../client.js';
import { createNewFolder } from './commons.js';
import { getDefaultClient } from './commons.js';
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
test('testCreateUpdateGetDeleteRetentionPolicy', async function testCreateUpdateGetDeleteRetentionPolicy(): Promise<any> {
  const description: string = getUuid();
  const retentionPolicy: RetentionPolicy =
    await client.retentionPolicies.createRetentionPolicy({
      policyName: getUuid(),
      policyType: 'finite' as CreateRetentionPolicyRequestBodyPolicyTypeField,
      dispositionAction:
        'remove_retention' as CreateRetentionPolicyRequestBodyDispositionActionField,
      retentionLength: '1',
      description: description,
      canOwnerExtendRetention: false,
      retentionType:
        'modifiable' as CreateRetentionPolicyRequestBodyRetentionTypeField,
    } satisfies CreateRetentionPolicyRequestBody);
  if (!(retentionPolicy.description == description)) {
    throw new Error('Assertion failed');
  }
  if (!(retentionPolicy.canOwnerExtendRetention == false)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(retentionPolicy.retentionType) as string) == 'modifiable')) {
    throw new Error('Assertion failed');
  }
  const folder: FolderFull = await createNewFolder();
  const retentionPolicyAssignment: RetentionPolicyAssignment =
    await client.retentionPolicyAssignments.createRetentionPolicyAssignment({
      policyId: retentionPolicy.id,
      assignTo: {
        id: folder.id,
        type: 'folder' as CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField,
      } satisfies CreateRetentionPolicyAssignmentRequestBodyAssignToField,
    } satisfies CreateRetentionPolicyAssignmentRequestBody);
  if (!(retentionPolicyAssignment.retentionPolicy!.id == retentionPolicy.id)) {
    throw new Error('Assertion failed');
  }
  if (!(retentionPolicyAssignment.assignedTo!.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(retentionPolicyAssignment.assignedTo!.type) as string) ==
      (toString(folder.type) as string)
    )
  ) {
    throw new Error('Assertion failed');
  }
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
  const newFiles: Files = await client.uploads.uploadFileVersion(file.id, {
    attributes: {
      name: file.name!,
    } satisfies UploadFileVersionRequestBodyAttributesField,
    file: generateByteStream(20),
  } satisfies UploadFileVersionRequestBody);
  const newFile: FileFull = newFiles.entries![0];
  if (!(newFile.id == file.id)) {
    throw new Error('Assertion failed');
  }
  const fileVersionRetentions: FileVersionRetentions =
    await client.fileVersionRetentions.getFileVersionRetentions();
  const fileVersionRetentionsCount: number =
    fileVersionRetentions.entries!.length;
  if (!(fileVersionRetentionsCount >= 0)) {
    throw new Error('Assertion failed');
  }
  if (fileVersionRetentionsCount == 0) {
    await client.retentionPolicies.deleteRetentionPolicyById(
      retentionPolicy.id,
    );
    await client.folders.deleteFolderById(folder.id, {
      queryParams: { recursive: true } satisfies DeleteFolderByIdQueryParams,
    } satisfies DeleteFolderByIdOptionalsInput);
    return void 0;
  }
  const fileVersionRetention: FileVersionRetention =
    fileVersionRetentions.entries![0];
  const fileVersionRetentionById: FileVersionRetention =
    await client.fileVersionRetentions.getFileVersionRetentionById(
      fileVersionRetention.id!,
    );
  if (!(fileVersionRetentionById.id == fileVersionRetention.id)) {
    throw new Error('Assertion failed');
  }
  await client.retentionPolicies.deleteRetentionPolicyById(retentionPolicy.id);
  await client.folders.deleteFolderById(folder.id, {
    queryParams: { recursive: true } satisfies DeleteFolderByIdQueryParams,
  } satisfies DeleteFolderByIdOptionalsInput);
});
export {};

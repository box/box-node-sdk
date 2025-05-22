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
import { serializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.generated.js';
import { deserializeRetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.generated.js';
import { serializeCreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.generated.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.generated.js';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.generated.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.generated.js';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.generated.js';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.generated.js';
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
import { serializeFileVersionRetentions } from '../schemas/fileVersionRetentions.generated.js';
import { deserializeFileVersionRetentions } from '../schemas/fileVersionRetentions.generated.js';
import { serializeFileVersionRetention } from '../schemas/fileVersionRetention.generated.js';
import { deserializeFileVersionRetention } from '../schemas/fileVersionRetention.generated.js';
import { DeleteFolderByIdOptionalsInput } from '../managers/folders.generated.js';
import { DeleteFolderByIdOptionals } from '../managers/folders.generated.js';
import { RetentionPolicy } from '../schemas/retentionPolicy.generated.js';
import { CreateRetentionPolicyRequestBody } from '../managers/retentionPolicies.generated.js';
import { CreateRetentionPolicyRequestBodyPolicyTypeField } from '../managers/retentionPolicies.generated.js';
import { CreateRetentionPolicyRequestBodyDispositionActionField } from '../managers/retentionPolicies.generated.js';
import { CreateRetentionPolicyRequestBodyRetentionTypeField } from '../managers/retentionPolicies.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { RetentionPolicyAssignment } from '../schemas/retentionPolicyAssignment.generated.js';
import { CreateRetentionPolicyAssignmentRequestBody } from '../managers/retentionPolicyAssignments.generated.js';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToField } from '../managers/retentionPolicyAssignments.generated.js';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '../managers/retentionPolicyAssignments.generated.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { UploadFileVersionRequestBody } from '../managers/uploads.generated.js';
import { UploadFileVersionRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { FileVersionRetentions } from '../schemas/fileVersionRetentions.generated.js';
import { DeleteFolderByIdQueryParams } from '../managers/folders.generated.js';
import { FileVersionRetention } from '../schemas/fileVersionRetention.generated.js';
import { generateByteStream } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { BoxClient } from '../client.generated.js';
import { createNewFolder } from './commons.generated.js';
import { getDefaultClient } from './commons.generated.js';
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

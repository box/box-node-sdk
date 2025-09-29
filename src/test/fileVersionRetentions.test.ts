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
import { serializeRetentionPolicyAssignment } from '@/schemas/retentionPolicyAssignment';
import { deserializeRetentionPolicyAssignment } from '@/schemas/retentionPolicyAssignment';
import { serializeCreateRetentionPolicyAssignmentRequestBody } from '@/managers/retentionPolicyAssignments';
import { deserializeCreateRetentionPolicyAssignmentRequestBody } from '@/managers/retentionPolicyAssignments';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '@/managers/retentionPolicyAssignments';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToField } from '@/managers/retentionPolicyAssignments';
import { serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '@/managers/retentionPolicyAssignments';
import { deserializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '@/managers/retentionPolicyAssignments';
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
import { serializeFileVersionRetentions } from '@/schemas/fileVersionRetentions';
import { deserializeFileVersionRetentions } from '@/schemas/fileVersionRetentions';
import { serializeFileVersionRetention } from '@/schemas/fileVersionRetention';
import { deserializeFileVersionRetention } from '@/schemas/fileVersionRetention';
import { DeleteFolderByIdOptionalsInput } from '@/managers/folders';
import { DeleteFolderByIdOptionals } from '@/managers/folders';
import { RetentionPolicy } from '@/schemas/retentionPolicy';
import { CreateRetentionPolicyRequestBody } from '@/managers/retentionPolicies';
import { CreateRetentionPolicyRequestBodyPolicyTypeField } from '@/managers/retentionPolicies';
import { CreateRetentionPolicyRequestBodyDispositionActionField } from '@/managers/retentionPolicies';
import { CreateRetentionPolicyRequestBodyRetentionTypeField } from '@/managers/retentionPolicies';
import { FolderFull } from '@/schemas/folderFull';
import { RetentionPolicyAssignment } from '@/schemas/retentionPolicyAssignment';
import { CreateRetentionPolicyAssignmentRequestBody } from '@/managers/retentionPolicyAssignments';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToField } from '@/managers/retentionPolicyAssignments';
import { CreateRetentionPolicyAssignmentRequestBodyAssignToTypeField } from '@/managers/retentionPolicyAssignments';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { UploadFileVersionRequestBody } from '@/managers/uploads';
import { UploadFileVersionRequestBodyAttributesField } from '@/managers/uploads';
import { FileVersionRetentions } from '@/schemas/fileVersionRetentions';
import { DeleteFolderByIdQueryParams } from '@/managers/folders';
import { FileVersionRetention } from '@/schemas/fileVersionRetention';
import { generateByteStream } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { BoxClient } from '@/client';
import { createNewFolder } from './commons';
import { getDefaultClient } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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

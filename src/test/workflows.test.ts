import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeWorkflows } from '@/schemas/workflows';
import { deserializeWorkflows } from '@/schemas/workflows';
import { serializeWorkflow } from '@/schemas/workflow';
import { deserializeWorkflow } from '@/schemas/workflow';
import { serializeStartWorkflowRequestBody } from '@/managers/workflows';
import { deserializeStartWorkflowRequestBody } from '@/managers/workflows';
import { serializeStartWorkflowRequestBodyTypeField } from '@/managers/workflows';
import { deserializeStartWorkflowRequestBodyTypeField } from '@/managers/workflows';
import { serializeStartWorkflowRequestBodyFlowField } from '@/managers/workflows';
import { deserializeStartWorkflowRequestBodyFlowField } from '@/managers/workflows';
import { serializeStartWorkflowRequestBodyFilesField } from '@/managers/workflows';
import { deserializeStartWorkflowRequestBodyFilesField } from '@/managers/workflows';
import { serializeStartWorkflowRequestBodyFilesTypeField } from '@/managers/workflows';
import { deserializeStartWorkflowRequestBodyFilesTypeField } from '@/managers/workflows';
import { serializeStartWorkflowRequestBodyFolderField } from '@/managers/workflows';
import { deserializeStartWorkflowRequestBodyFolderField } from '@/managers/workflows';
import { serializeStartWorkflowRequestBodyFolderTypeField } from '@/managers/workflows';
import { deserializeStartWorkflowRequestBodyFolderTypeField } from '@/managers/workflows';
import { BoxClient } from '@/client';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { Workflows } from '@/schemas/workflows';
import { GetWorkflowsQueryParams } from '@/managers/workflows';
import { Workflow } from '@/schemas/workflow';
import { StartWorkflowRequestBody } from '@/managers/workflows';
import { StartWorkflowRequestBodyTypeField } from '@/managers/workflows';
import { StartWorkflowRequestBodyFlowField } from '@/managers/workflows';
import { StartWorkflowRequestBodyFilesField } from '@/managers/workflows';
import { StartWorkflowRequestBodyFilesTypeField } from '@/managers/workflows';
import { StartWorkflowRequestBodyFolderField } from '@/managers/workflows';
import { StartWorkflowRequestBodyFolderTypeField } from '@/managers/workflows';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { uploadNewFile } from './commons';
import { getDefaultClientWithUserSubject } from './commons';
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
test('testWorkflows', async function testWorkflows(): Promise<any> {
  const adminClient: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID'),
  );
  const workflowFolderId: string = getEnvVar('WORKFLOW_FOLDER_ID');
  const uploadedFiles: Files = await adminClient.uploads.uploadFile({
    attributes: {
      name: getUuid(),
      parent: {
        id: workflowFolderId,
      } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: generateByteStream(1024 * 1024),
  } satisfies UploadFileRequestBody);
  const file: FileFull = uploadedFiles.entries![0];
  const workflowFileId: string = file.id;
  const workflows: Workflows = await adminClient.workflows.getWorkflows({
    folderId: workflowFolderId,
  } satisfies GetWorkflowsQueryParams);
  if (!(workflows.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  const workflowToRun: Workflow = workflows.entries![0];
  if (!((toString(workflowToRun.type!) as string) == 'workflow')) {
    throw new Error('Assertion failed');
  }
  if (!(workflowToRun.isEnabled! == true)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(workflowToRun.flows![0].type!) as string) == 'flow')) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(workflowToRun.flows![0].trigger!.type!) as string) == 'trigger')
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(workflowToRun.flows![0].trigger!.triggerType!) as string) ==
      'WORKFLOW_MANUAL_START'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(workflowToRun.flows![0].outcomes![0].actionType!) as string) ==
      'delete_file'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(workflowToRun.flows![0].outcomes![0].type!) as string) ==
      'outcome'
    )
  ) {
    throw new Error('Assertion failed');
  }
  await adminClient.workflows.startWorkflow(workflowToRun.id!, {
    type: 'workflow_parameters' as StartWorkflowRequestBodyTypeField,
    flow: {
      type: 'flow',
      id: workflowToRun.flows![0].id!,
    } satisfies StartWorkflowRequestBodyFlowField,
    files: [
      {
        type: 'file' as StartWorkflowRequestBodyFilesTypeField,
        id: workflowFileId,
      } satisfies StartWorkflowRequestBodyFilesField,
    ],
    folder: {
      type: 'folder' as StartWorkflowRequestBodyFolderTypeField,
      id: workflowFolderId,
    } satisfies StartWorkflowRequestBodyFolderField,
  } satisfies StartWorkflowRequestBody);
});
export {};

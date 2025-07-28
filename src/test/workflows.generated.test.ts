import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeWorkflows } from '../schemas/workflows.generated.js';
import { deserializeWorkflows } from '../schemas/workflows.generated.js';
import { serializeWorkflow } from '../schemas/workflow.generated.js';
import { deserializeWorkflow } from '../schemas/workflow.generated.js';
import { serializeStartWorkflowRequestBody } from '../managers/workflows.generated.js';
import { deserializeStartWorkflowRequestBody } from '../managers/workflows.generated.js';
import { serializeStartWorkflowRequestBodyTypeField } from '../managers/workflows.generated.js';
import { deserializeStartWorkflowRequestBodyTypeField } from '../managers/workflows.generated.js';
import { serializeStartWorkflowRequestBodyFlowField } from '../managers/workflows.generated.js';
import { deserializeStartWorkflowRequestBodyFlowField } from '../managers/workflows.generated.js';
import { serializeStartWorkflowRequestBodyFilesField } from '../managers/workflows.generated.js';
import { deserializeStartWorkflowRequestBodyFilesField } from '../managers/workflows.generated.js';
import { serializeStartWorkflowRequestBodyFilesTypeField } from '../managers/workflows.generated.js';
import { deserializeStartWorkflowRequestBodyFilesTypeField } from '../managers/workflows.generated.js';
import { serializeStartWorkflowRequestBodyFolderField } from '../managers/workflows.generated.js';
import { deserializeStartWorkflowRequestBodyFolderField } from '../managers/workflows.generated.js';
import { serializeStartWorkflowRequestBodyFolderTypeField } from '../managers/workflows.generated.js';
import { deserializeStartWorkflowRequestBodyFolderTypeField } from '../managers/workflows.generated.js';
import { BoxClient } from '../client.generated.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { Workflows } from '../schemas/workflows.generated.js';
import { GetWorkflowsQueryParams } from '../managers/workflows.generated.js';
import { Workflow } from '../schemas/workflow.generated.js';
import { StartWorkflowRequestBody } from '../managers/workflows.generated.js';
import { StartWorkflowRequestBodyTypeField } from '../managers/workflows.generated.js';
import { StartWorkflowRequestBodyFlowField } from '../managers/workflows.generated.js';
import { StartWorkflowRequestBodyFilesField } from '../managers/workflows.generated.js';
import { StartWorkflowRequestBodyFilesTypeField } from '../managers/workflows.generated.js';
import { StartWorkflowRequestBodyFolderField } from '../managers/workflows.generated.js';
import { StartWorkflowRequestBodyFolderTypeField } from '../managers/workflows.generated.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { uploadNewFile } from './commons.generated.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
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

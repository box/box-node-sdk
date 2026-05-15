import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeAutomateWorkflowsV2026R0 } from '@/schemas/v2026R0/automateWorkflowsV2026R0';
import { deserializeAutomateWorkflowsV2026R0 } from '@/schemas/v2026R0/automateWorkflowsV2026R0';
import { serializeAutomateWorkflowActionV2026R0 } from '@/schemas/v2026R0/automateWorkflowActionV2026R0';
import { deserializeAutomateWorkflowActionV2026R0 } from '@/schemas/v2026R0/automateWorkflowActionV2026R0';
import { serializeAutomateWorkflowStartRequestV2026R0 } from '@/schemas/v2026R0/automateWorkflowStartRequestV2026R0';
import { deserializeAutomateWorkflowStartRequestV2026R0 } from '@/schemas/v2026R0/automateWorkflowStartRequestV2026R0';
import { BoxClient } from '@/client';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { AutomateWorkflowsV2026R0 } from '@/schemas/v2026R0/automateWorkflowsV2026R0';
import { GetAutomateWorkflowsV2026R0QueryParams } from '@/managers/automateWorkflows';
import { AutomateWorkflowActionV2026R0 } from '@/schemas/v2026R0/automateWorkflowActionV2026R0';
import { AutomateWorkflowStartRequestV2026R0 } from '@/schemas/v2026R0/automateWorkflowStartRequestV2026R0';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { getDefaultClient } from './commons';
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
test('testAutomateWorkflows', async function testAutomateWorkflows(): Promise<any> {
  const adminClient: BoxClient = getDefaultClientWithUserSubject(
    getEnvVar('USER_ID')
  );
  const workflowFolderId: string = getEnvVar('AUTOMATE_WORKFLOW_FOLDER_ID');
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
  const automateWorkflows: AutomateWorkflowsV2026R0 =
    await adminClient.automateWorkflows.getAutomateWorkflowsV2026R0({
      folderId: workflowFolderId,
    } satisfies GetAutomateWorkflowsV2026R0QueryParams);
  if (!(automateWorkflows.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  const workflowAction: AutomateWorkflowActionV2026R0 =
    automateWorkflows.entries![0];
  if (!((toString(workflowAction.type) as string) == 'workflow_action')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(workflowAction.actionType) as string) == 'run_workflow')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(workflowAction.workflow.type) as string) == 'workflow')) {
    throw new Error('Assertion failed');
  }
  await adminClient.automateWorkflows.createAutomateWorkflowStartV2026R0(
    workflowAction.workflow.id,
    {
      workflowActionId: workflowAction.id,
      fileIds: [workflowFileId],
    } satisfies AutomateWorkflowStartRequestV2026R0
  );
});
export {};

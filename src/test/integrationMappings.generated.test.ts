import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeCreateCollaborationRequestBody } from '../managers/userCollaborations.generated.js';
import { deserializeCreateCollaborationRequestBody } from '../managers/userCollaborations.generated.js';
import { serializeCreateCollaborationRequestBodyItemField } from '../managers/userCollaborations.generated.js';
import { deserializeCreateCollaborationRequestBodyItemField } from '../managers/userCollaborations.generated.js';
import { serializeCreateCollaborationRequestBodyItemTypeField } from '../managers/userCollaborations.generated.js';
import { deserializeCreateCollaborationRequestBodyItemTypeField } from '../managers/userCollaborations.generated.js';
import { serializeCreateCollaborationRequestBodyAccessibleByField } from '../managers/userCollaborations.generated.js';
import { deserializeCreateCollaborationRequestBodyAccessibleByField } from '../managers/userCollaborations.generated.js';
import { serializeCreateCollaborationRequestBodyAccessibleByTypeField } from '../managers/userCollaborations.generated.js';
import { deserializeCreateCollaborationRequestBodyAccessibleByTypeField } from '../managers/userCollaborations.generated.js';
import { serializeCreateCollaborationRequestBodyRoleField } from '../managers/userCollaborations.generated.js';
import { deserializeCreateCollaborationRequestBodyRoleField } from '../managers/userCollaborations.generated.js';
import { serializeIntegrationMappings } from '../schemas/integrationMappings.generated.js';
import { deserializeIntegrationMappings } from '../schemas/integrationMappings.generated.js';
import { serializeIntegrationMappingSlackCreateRequest } from '../schemas/integrationMappingSlackCreateRequest.generated.js';
import { deserializeIntegrationMappingSlackCreateRequest } from '../schemas/integrationMappingSlackCreateRequest.generated.js';
import { serializeIntegrationMappingPartnerItemSlack } from '../schemas/integrationMappingPartnerItemSlack.generated.js';
import { deserializeIntegrationMappingPartnerItemSlack } from '../schemas/integrationMappingPartnerItemSlack.generated.js';
import { serializeIntegrationMappingBoxItemSlack } from '../schemas/integrationMappingBoxItemSlack.generated.js';
import { deserializeIntegrationMappingBoxItemSlack } from '../schemas/integrationMappingBoxItemSlack.generated.js';
import { serializeIntegrationMapping } from '../schemas/integrationMapping.generated.js';
import { deserializeIntegrationMapping } from '../schemas/integrationMapping.generated.js';
import { serializeUpdateSlackIntegrationMappingByIdRequestBody } from '../managers/integrationMappings.generated.js';
import { deserializeUpdateSlackIntegrationMappingByIdRequestBody } from '../managers/integrationMappings.generated.js';
import { serializeIntegrationMappingTeamsCreateRequest } from '../schemas/integrationMappingTeamsCreateRequest.generated.js';
import { deserializeIntegrationMappingTeamsCreateRequest } from '../schemas/integrationMappingTeamsCreateRequest.generated.js';
import { serializeIntegrationMappingPartnerItemTeamsCreateRequest } from '../schemas/integrationMappingPartnerItemTeamsCreateRequest.generated.js';
import { deserializeIntegrationMappingPartnerItemTeamsCreateRequest } from '../schemas/integrationMappingPartnerItemTeamsCreateRequest.generated.js';
import { serializeIntegrationMappingPartnerItemTeamsCreateRequestTypeField } from '../schemas/integrationMappingPartnerItemTeamsCreateRequest.generated.js';
import { deserializeIntegrationMappingPartnerItemTeamsCreateRequestTypeField } from '../schemas/integrationMappingPartnerItemTeamsCreateRequest.generated.js';
import { serializeFolderReference } from '../schemas/folderReference.generated.js';
import { deserializeFolderReference } from '../schemas/folderReference.generated.js';
import { serializeUpdateTeamsIntegrationMappingByIdRequestBody } from '../managers/integrationMappings.generated.js';
import { deserializeUpdateTeamsIntegrationMappingByIdRequestBody } from '../managers/integrationMappings.generated.js';
import { UpdateSlackIntegrationMappingByIdOptionalsInput } from '../managers/integrationMappings.generated.js';
import { UpdateTeamsIntegrationMappingByIdOptionalsInput } from '../managers/integrationMappings.generated.js';
import { UpdateSlackIntegrationMappingByIdOptionals } from '../managers/integrationMappings.generated.js';
import { UpdateTeamsIntegrationMappingByIdOptionals } from '../managers/integrationMappings.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { CreateFolderRequestBody } from '../managers/folders.generated.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { CreateCollaborationRequestBody } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyItemField } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyItemTypeField } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyAccessibleByField } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyAccessibleByTypeField } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyRoleField } from '../managers/userCollaborations.generated.js';
import { IntegrationMappings } from '../schemas/integrationMappings.generated.js';
import { IntegrationMappingSlackCreateRequest } from '../schemas/integrationMappingSlackCreateRequest.generated.js';
import { IntegrationMappingPartnerItemSlack } from '../schemas/integrationMappingPartnerItemSlack.generated.js';
import { IntegrationMappingBoxItemSlack } from '../schemas/integrationMappingBoxItemSlack.generated.js';
import { IntegrationMapping } from '../schemas/integrationMapping.generated.js';
import { UpdateSlackIntegrationMappingByIdRequestBody } from '../managers/integrationMappings.generated.js';
import { IntegrationMappingTeamsCreateRequest } from '../schemas/integrationMappingTeamsCreateRequest.generated.js';
import { IntegrationMappingPartnerItemTeamsCreateRequest } from '../schemas/integrationMappingPartnerItemTeamsCreateRequest.generated.js';
import { IntegrationMappingPartnerItemTeamsCreateRequestTypeField } from '../schemas/integrationMappingPartnerItemTeamsCreateRequest.generated.js';
import { FolderReference } from '../schemas/folderReference.generated.js';
import { UpdateTeamsIntegrationMappingByIdRequestBody } from '../managers/integrationMappings.generated.js';
import { generateByteStream } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testSlackIntegrationMappings', async function testSlackIntegrationMappings(): Promise<any> {
  const userId: string = getEnvVar('USER_ID');
  const slackAutomationUserId: string = getEnvVar('SLACK_AUTOMATION_USER_ID');
  const slackOrgId: string = getEnvVar('SLACK_ORG_ID');
  const slackPartnerItemId: string = getEnvVar('SLACK_PARTNER_ITEM_ID');
  const userClient: BoxClient = getDefaultClientWithUserSubject(userId);
  const folder: FolderFull = await userClient.folders.createFolder({
    name: getUuid(),
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  await userClient.userCollaborations.createCollaboration({
    item: {
      type: 'folder' as CreateCollaborationRequestBodyItemTypeField,
      id: folder.id,
    } satisfies CreateCollaborationRequestBodyItemField,
    accessibleBy: {
      type: 'user' as CreateCollaborationRequestBodyAccessibleByTypeField,
      id: slackAutomationUserId,
    } satisfies CreateCollaborationRequestBodyAccessibleByField,
    role: 'co-owner' as CreateCollaborationRequestBodyRoleField,
  } satisfies CreateCollaborationRequestBody);
  const slackIntegrations: IntegrationMappings =
    await userClient.integrationMappings.getSlackIntegrationMapping();
  if (slackIntegrations.entries!.length == 0) {
    await userClient.integrationMappings.createSlackIntegrationMapping({
      partnerItem: new IntegrationMappingPartnerItemSlack({
        id: slackPartnerItemId,
        slackOrgId: slackOrgId,
      }),
      boxItem: new IntegrationMappingBoxItemSlack({ id: folder.id }),
    } satisfies IntegrationMappingSlackCreateRequest);
  }
  const slackMappings: IntegrationMappings =
    await userClient.integrationMappings.getSlackIntegrationMapping();
  if (!(slackMappings.entries!.length >= 1)) {
    throw new Error('Assertion failed');
  }
  const slackIntegrationMapping: IntegrationMapping = slackMappings.entries![0];
  if (
    !((toString(slackIntegrationMapping.integrationType) as string) == 'slack')
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(slackIntegrationMapping.type) as string) ==
      'integration_mapping'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(slackIntegrationMapping.boxItem.type) as string) == 'folder')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(slackIntegrationMapping.partnerItem.id == slackPartnerItemId)) {
    throw new Error('Assertion failed');
  }
  if (!(slackIntegrationMapping.partnerItem.slackWorkspaceId == slackOrgId)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      (toString(slackIntegrationMapping.partnerItem.type) as string) ==
      'channel'
    )
  ) {
    throw new Error('Assertion failed');
  }
  const updatedSlackMapping: IntegrationMapping =
    await userClient.integrationMappings.updateSlackIntegrationMappingById(
      slackIntegrationMapping.id,
      {
        requestBody: {
          boxItem: new IntegrationMappingBoxItemSlack({ id: folder.id }),
        } satisfies UpdateSlackIntegrationMappingByIdRequestBody,
      } satisfies UpdateSlackIntegrationMappingByIdOptionalsInput,
    );
  if (!((toString(updatedSlackMapping.boxItem.type) as string) == 'folder')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedSlackMapping.boxItem.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (slackMappings.entries!.length > 2) {
    await userClient.integrationMappings.deleteSlackIntegrationMappingById(
      slackIntegrationMapping.id,
    );
  }
  await userClient.folders.deleteFolderById(folder.id);
});
test('testTeamsIntegrationMappings', async function testTeamsIntegrationMappings(): Promise<any> {
  const folder: FolderFull = await client.folders.createFolder({
    name: getUuid(),
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  const tenantId: string = '1';
  const teamId: string = '2';
  const partnerItemId: string = '3';
  const userId: string = getEnvVar('USER_ID');
  const userClient: BoxClient = getDefaultClientWithUserSubject(userId);
  await expect(async () => {
    await userClient.integrationMappings.createTeamsIntegrationMapping({
      partnerItem: {
        type: 'channel' as IntegrationMappingPartnerItemTeamsCreateRequestTypeField,
        id: partnerItemId,
        tenantId: tenantId,
        teamId: teamId,
      } satisfies IntegrationMappingPartnerItemTeamsCreateRequest,
      boxItem: new FolderReference({ id: folder.id }),
    } satisfies IntegrationMappingTeamsCreateRequest);
  }).rejects.toThrow();
  await expect(async () => {
    await userClient.integrationMappings.getTeamsIntegrationMapping();
  }).rejects.toThrow();
  const integrationMappingId: string = '123456';
  await expect(async () => {
    await userClient.integrationMappings.updateTeamsIntegrationMappingById(
      integrationMappingId,
      {
        requestBody: {
          boxItem: new FolderReference({ id: '1234567' }),
        } satisfies UpdateTeamsIntegrationMappingByIdRequestBody,
      } satisfies UpdateTeamsIntegrationMappingByIdOptionalsInput,
    );
  }).rejects.toThrow();
  await expect(async () => {
    await userClient.integrationMappings.deleteTeamsIntegrationMappingById(
      integrationMappingId,
    );
  }).rejects.toThrow();
  await client.folders.deleteFolderById(folder.id);
});
export {};

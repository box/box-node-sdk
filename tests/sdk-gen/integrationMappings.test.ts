import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeCreateFolderRequestBody } from '@/managers/folders';
import { deserializeCreateFolderRequestBody } from '@/managers/folders';
import { serializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { deserializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { serializeCreateCollaborationRequestBody } from '@/managers/userCollaborations';
import { deserializeCreateCollaborationRequestBody } from '@/managers/userCollaborations';
import { serializeCreateCollaborationRequestBodyItemField } from '@/managers/userCollaborations';
import { deserializeCreateCollaborationRequestBodyItemField } from '@/managers/userCollaborations';
import { serializeCreateCollaborationRequestBodyItemTypeField } from '@/managers/userCollaborations';
import { deserializeCreateCollaborationRequestBodyItemTypeField } from '@/managers/userCollaborations';
import { serializeCreateCollaborationRequestBodyAccessibleByField } from '@/managers/userCollaborations';
import { deserializeCreateCollaborationRequestBodyAccessibleByField } from '@/managers/userCollaborations';
import { serializeCreateCollaborationRequestBodyAccessibleByTypeField } from '@/managers/userCollaborations';
import { deserializeCreateCollaborationRequestBodyAccessibleByTypeField } from '@/managers/userCollaborations';
import { serializeCreateCollaborationRequestBodyRoleField } from '@/managers/userCollaborations';
import { deserializeCreateCollaborationRequestBodyRoleField } from '@/managers/userCollaborations';
import { serializeIntegrationMappings } from '@/schemas/integrationMappings';
import { deserializeIntegrationMappings } from '@/schemas/integrationMappings';
import { serializeIntegrationMappingSlackCreateRequest } from '@/schemas/integrationMappingSlackCreateRequest';
import { deserializeIntegrationMappingSlackCreateRequest } from '@/schemas/integrationMappingSlackCreateRequest';
import { serializeIntegrationMappingPartnerItemSlack } from '@/schemas/integrationMappingPartnerItemSlack';
import { deserializeIntegrationMappingPartnerItemSlack } from '@/schemas/integrationMappingPartnerItemSlack';
import { serializeIntegrationMappingBoxItemSlack } from '@/schemas/integrationMappingBoxItemSlack';
import { deserializeIntegrationMappingBoxItemSlack } from '@/schemas/integrationMappingBoxItemSlack';
import { serializeIntegrationMapping } from '@/schemas/integrationMapping';
import { deserializeIntegrationMapping } from '@/schemas/integrationMapping';
import { serializeUpdateSlackIntegrationMappingByIdRequestBody } from '@/managers/integrationMappings';
import { deserializeUpdateSlackIntegrationMappingByIdRequestBody } from '@/managers/integrationMappings';
import { serializeIntegrationMappingTeamsCreateRequest } from '@/schemas/integrationMappingTeamsCreateRequest';
import { deserializeIntegrationMappingTeamsCreateRequest } from '@/schemas/integrationMappingTeamsCreateRequest';
import { serializeIntegrationMappingPartnerItemTeamsCreateRequest } from '@/schemas/integrationMappingPartnerItemTeamsCreateRequest';
import { deserializeIntegrationMappingPartnerItemTeamsCreateRequest } from '@/schemas/integrationMappingPartnerItemTeamsCreateRequest';
import { serializeIntegrationMappingPartnerItemTeamsCreateRequestTypeField } from '@/schemas/integrationMappingPartnerItemTeamsCreateRequest';
import { deserializeIntegrationMappingPartnerItemTeamsCreateRequestTypeField } from '@/schemas/integrationMappingPartnerItemTeamsCreateRequest';
import { serializeFolderReference } from '@/schemas/folderReference';
import { deserializeFolderReference } from '@/schemas/folderReference';
import { serializeUpdateTeamsIntegrationMappingByIdRequestBody } from '@/managers/integrationMappings';
import { deserializeUpdateTeamsIntegrationMappingByIdRequestBody } from '@/managers/integrationMappings';
import { UpdateSlackIntegrationMappingByIdOptionalsInput } from '@/managers/integrationMappings';
import { UpdateTeamsIntegrationMappingByIdOptionalsInput } from '@/managers/integrationMappings';
import { UpdateSlackIntegrationMappingByIdOptionals } from '@/managers/integrationMappings';
import { UpdateTeamsIntegrationMappingByIdOptionals } from '@/managers/integrationMappings';
import { BoxClient } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { CreateFolderRequestBody } from '@/managers/folders';
import { CreateFolderRequestBodyParentField } from '@/managers/folders';
import { CreateCollaborationRequestBody } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyItemField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyItemTypeField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyAccessibleByField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyAccessibleByTypeField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyRoleField } from '@/managers/userCollaborations';
import { IntegrationMappings } from '@/schemas/integrationMappings';
import { IntegrationMappingSlackCreateRequest } from '@/schemas/integrationMappingSlackCreateRequest';
import { IntegrationMappingPartnerItemSlack } from '@/schemas/integrationMappingPartnerItemSlack';
import { IntegrationMappingBoxItemSlack } from '@/schemas/integrationMappingBoxItemSlack';
import { IntegrationMapping } from '@/schemas/integrationMapping';
import { UpdateSlackIntegrationMappingByIdRequestBody } from '@/managers/integrationMappings';
import { IntegrationMappingTeamsCreateRequest } from '@/schemas/integrationMappingTeamsCreateRequest';
import { IntegrationMappingPartnerItemTeamsCreateRequest } from '@/schemas/integrationMappingPartnerItemTeamsCreateRequest';
import { IntegrationMappingPartnerItemTeamsCreateRequestTypeField } from '@/schemas/integrationMappingPartnerItemTeamsCreateRequest';
import { FolderReference } from '@/schemas/folderReference';
import { UpdateTeamsIntegrationMappingByIdRequestBody } from '@/managers/integrationMappings';
import { generateByteStream } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { toString } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { getDefaultClientWithUserSubject } from './commons';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
      } satisfies UpdateSlackIntegrationMappingByIdOptionalsInput
    );
  if (!((toString(updatedSlackMapping.boxItem.type) as string) == 'folder')) {
    throw new Error('Assertion failed');
  }
  if (!(updatedSlackMapping.boxItem.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (slackMappings.entries!.length > 2) {
    await userClient.integrationMappings.deleteSlackIntegrationMappingById(
      slackIntegrationMapping.id
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
      } satisfies UpdateTeamsIntegrationMappingByIdOptionalsInput
    );
  }).rejects.toThrow();
  await expect(async () => {
    await userClient.integrationMappings.deleteTeamsIntegrationMappingById(
      integrationMappingId
    );
  }).rejects.toThrow();
  await client.folders.deleteFolderById(folder.id);
});
export {};

import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeCollaboration } from '@/schemas/collaboration';
import { deserializeCollaboration } from '@/schemas/collaboration';
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
import { serializeExternalUsersSubmitDeleteJobResponseV2025R0 } from '@/schemas/v2025R0/externalUsersSubmitDeleteJobResponseV2025R0';
import { deserializeExternalUsersSubmitDeleteJobResponseV2025R0 } from '@/schemas/v2025R0/externalUsersSubmitDeleteJobResponseV2025R0';
import { serializeExternalUsersSubmitDeleteJobRequestV2025R0 } from '@/schemas/v2025R0/externalUsersSubmitDeleteJobRequestV2025R0';
import { deserializeExternalUsersSubmitDeleteJobRequestV2025R0 } from '@/schemas/v2025R0/externalUsersSubmitDeleteJobRequestV2025R0';
import { serializeUserReferenceV2025R0 } from '@/schemas/v2025R0/userReferenceV2025R0';
import { deserializeUserReferenceV2025R0 } from '@/schemas/v2025R0/userReferenceV2025R0';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { Collaboration } from '@/schemas/collaboration';
import { CreateCollaborationRequestBody } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyItemField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyItemTypeField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyAccessibleByField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyAccessibleByTypeField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyRoleField } from '@/managers/userCollaborations';
import { ExternalUsersSubmitDeleteJobResponseV2025R0 } from '@/schemas/v2025R0/externalUsersSubmitDeleteJobResponseV2025R0';
import { ExternalUsersSubmitDeleteJobRequestV2025R0 } from '@/schemas/v2025R0/externalUsersSubmitDeleteJobRequestV2025R0';
import { UserReferenceV2025R0 } from '@/schemas/v2025R0/userReferenceV2025R0';
import { getDefaultClientWithUserSubject } from './commons';
import { uploadNewFile } from './commons';
import { getEnvVar } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClientWithUserSubject(
  getEnvVar('USER_ID'),
);
test('testSubmitJobToDeleteExternalUsers', async function testSubmitJobToDeleteExternalUsers(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  const fileCollaboration: Collaboration =
    await client.userCollaborations.createCollaboration({
      item: {
        type: 'file' as CreateCollaborationRequestBodyItemTypeField,
        id: file.id,
      } satisfies CreateCollaborationRequestBodyItemField,
      accessibleBy: {
        type: 'user' as CreateCollaborationRequestBodyAccessibleByTypeField,
        id: getEnvVar('BOX_EXTERNAL_USER_ID'),
      } satisfies CreateCollaborationRequestBodyAccessibleByField,
      role: 'editor' as CreateCollaborationRequestBodyRoleField,
    } satisfies CreateCollaborationRequestBody);
  const externalUsersJobDeleteResponse: ExternalUsersSubmitDeleteJobResponseV2025R0 =
    await client.externalUsers.submitJobToDeleteExternalUsersV2025R0({
      externalUsers: [
        new UserReferenceV2025R0({ id: getEnvVar('BOX_EXTERNAL_USER_ID') }),
      ],
    } satisfies ExternalUsersSubmitDeleteJobRequestV2025R0);
  if (!(externalUsersJobDeleteResponse.entries.length == 1)) {
    throw new Error('Assertion failed');
  }
  if (!(externalUsersJobDeleteResponse.entries[0].status == 202)) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(file.id);
});
export {};

import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeCollaboration } from '../schemas/collaboration.js';
import { deserializeCollaboration } from '../schemas/collaboration.js';
import { serializeCreateCollaborationRequestBody } from '../managers/userCollaborations.js';
import { deserializeCreateCollaborationRequestBody } from '../managers/userCollaborations.js';
import { serializeCreateCollaborationRequestBodyItemField } from '../managers/userCollaborations.js';
import { deserializeCreateCollaborationRequestBodyItemField } from '../managers/userCollaborations.js';
import { serializeCreateCollaborationRequestBodyItemTypeField } from '../managers/userCollaborations.js';
import { deserializeCreateCollaborationRequestBodyItemTypeField } from '../managers/userCollaborations.js';
import { serializeCreateCollaborationRequestBodyAccessibleByField } from '../managers/userCollaborations.js';
import { deserializeCreateCollaborationRequestBodyAccessibleByField } from '../managers/userCollaborations.js';
import { serializeCreateCollaborationRequestBodyAccessibleByTypeField } from '../managers/userCollaborations.js';
import { deserializeCreateCollaborationRequestBodyAccessibleByTypeField } from '../managers/userCollaborations.js';
import { serializeCreateCollaborationRequestBodyRoleField } from '../managers/userCollaborations.js';
import { deserializeCreateCollaborationRequestBodyRoleField } from '../managers/userCollaborations.js';
import { serializeExternalUsersSubmitDeleteJobResponseV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobResponseV2025R0.js';
import { deserializeExternalUsersSubmitDeleteJobResponseV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobResponseV2025R0.js';
import { serializeExternalUsersSubmitDeleteJobRequestV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobRequestV2025R0.js';
import { deserializeExternalUsersSubmitDeleteJobRequestV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobRequestV2025R0.js';
import { serializeUserReferenceV2025R0 } from '../schemas/v2025R0/userReferenceV2025R0.js';
import { deserializeUserReferenceV2025R0 } from '../schemas/v2025R0/userReferenceV2025R0.js';
import { BoxClient } from '../client.js';
import { FileFull } from '../schemas/fileFull.js';
import { Collaboration } from '../schemas/collaboration.js';
import { CreateCollaborationRequestBody } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyItemField } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyItemTypeField } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyAccessibleByField } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyAccessibleByTypeField } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyRoleField } from '../managers/userCollaborations.js';
import { ExternalUsersSubmitDeleteJobResponseV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobResponseV2025R0.js';
import { ExternalUsersSubmitDeleteJobRequestV2025R0 } from '../schemas/v2025R0/externalUsersSubmitDeleteJobRequestV2025R0.js';
import { UserReferenceV2025R0 } from '../schemas/v2025R0/userReferenceV2025R0.js';
import { getDefaultClientWithUserSubject } from './commons.js';
import { uploadNewFile } from './commons.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClientWithUserSubject(
  getEnvVar('USER_ID')
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

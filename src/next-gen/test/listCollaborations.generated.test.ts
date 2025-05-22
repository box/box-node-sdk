import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeGroupFull } from '../schemas/groupFull.generated.js';
import { deserializeGroupFull } from '../schemas/groupFull.generated.js';
import { serializeCreateGroupRequestBody } from '../managers/groups.generated.js';
import { deserializeCreateGroupRequestBody } from '../managers/groups.generated.js';
import { serializeCollaboration } from '../schemas/collaboration.generated.js';
import { deserializeCollaboration } from '../schemas/collaboration.generated.js';
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
import { serializeCollaborations } from '../schemas/collaborations.generated.js';
import { deserializeCollaborations } from '../schemas/collaborations.generated.js';
import { serializeCollaborationsOffsetPaginated } from '../schemas/collaborationsOffsetPaginated.generated.js';
import { deserializeCollaborationsOffsetPaginated } from '../schemas/collaborationsOffsetPaginated.generated.js';
import { serializeGetCollaborationsQueryParamsStatusField } from '../managers/listCollaborations.generated.js';
import { deserializeGetCollaborationsQueryParamsStatusField } from '../managers/listCollaborations.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { GroupFull } from '../schemas/groupFull.generated.js';
import { CreateGroupRequestBody } from '../managers/groups.generated.js';
import { Collaboration } from '../schemas/collaboration.generated.js';
import { CreateCollaborationRequestBody } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyItemField } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyItemTypeField } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyAccessibleByField } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyAccessibleByTypeField } from '../managers/userCollaborations.generated.js';
import { CreateCollaborationRequestBodyRoleField } from '../managers/userCollaborations.generated.js';
import { Collaborations } from '../schemas/collaborations.generated.js';
import { CollaborationsOffsetPaginated } from '../schemas/collaborationsOffsetPaginated.generated.js';
import { GetCollaborationsQueryParams } from '../managers/listCollaborations.generated.js';
import { GetCollaborationsQueryParamsStatusField } from '../managers/listCollaborations.generated.js';
import { getUuid } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { createNewFolder } from './commons.generated.js';
import { uploadNewFile } from './commons.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
test('testListCollaborations', async function testListCollaborations(): Promise<any> {
  const client: BoxClient = getDefaultClient();
  const folder: FolderFull = await createNewFolder();
  const file: FileFull = await uploadNewFile();
  const group: GroupFull = await client.groups.createGroup({
    name: getUuid(),
  } satisfies CreateGroupRequestBody);
  const groupCollaboration: Collaboration =
    await client.userCollaborations.createCollaboration({
      item: {
        type: 'folder' as CreateCollaborationRequestBodyItemTypeField,
        id: folder.id,
      } satisfies CreateCollaborationRequestBodyItemField,
      accessibleBy: {
        type: 'group' as CreateCollaborationRequestBodyAccessibleByTypeField,
        id: group.id,
      } satisfies CreateCollaborationRequestBodyAccessibleByField,
      role: 'editor' as CreateCollaborationRequestBodyRoleField,
    } satisfies CreateCollaborationRequestBody);
  const fileCollaboration: Collaboration =
    await client.userCollaborations.createCollaboration({
      item: {
        type: 'file' as CreateCollaborationRequestBodyItemTypeField,
        id: file.id,
      } satisfies CreateCollaborationRequestBodyItemField,
      accessibleBy: {
        type: 'user' as CreateCollaborationRequestBodyAccessibleByTypeField,
        id: getEnvVar('USER_ID'),
      } satisfies CreateCollaborationRequestBodyAccessibleByField,
      role: 'editor' as CreateCollaborationRequestBodyRoleField,
    } satisfies CreateCollaborationRequestBody);
  if (!((toString(groupCollaboration.role) as string) == 'editor')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(groupCollaboration.type) as string) == 'collaboration')) {
    throw new Error('Assertion failed');
  }
  const fileCollaborations: Collaborations =
    await client.listCollaborations.getFileCollaborations(file.id);
  if (!(fileCollaborations.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const folderCollaborations: Collaborations =
    await client.listCollaborations.getFolderCollaborations(folder.id);
  if (!(folderCollaborations.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const pendingCollaborations: CollaborationsOffsetPaginated =
    await client.listCollaborations.getCollaborations({
      status: 'pending' as GetCollaborationsQueryParamsStatusField,
    } satisfies GetCollaborationsQueryParams);
  if (!(pendingCollaborations.entries!.length >= 0)) {
    throw new Error('Assertion failed');
  }
  const groupCollaborations: CollaborationsOffsetPaginated =
    await client.listCollaborations.getGroupCollaborations(group.id);
  if (!(groupCollaborations.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  await client.userCollaborations.deleteCollaborationById(
    groupCollaboration.id,
  );
  await client.files.deleteFileById(file.id);
  await client.folders.deleteFolderById(folder.id);
  await client.groups.deleteGroupById(group.id);
});
export {};

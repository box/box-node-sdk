import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeGroupFull } from '@/schemas/groupFull';
import { deserializeGroupFull } from '@/schemas/groupFull';
import { serializeCreateGroupRequestBody } from '@/managers/groups';
import { deserializeCreateGroupRequestBody } from '@/managers/groups';
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
import { serializeCollaborations } from '@/schemas/collaborations';
import { deserializeCollaborations } from '@/schemas/collaborations';
import { serializeCollaborationsOffsetPaginated } from '@/schemas/collaborationsOffsetPaginated';
import { deserializeCollaborationsOffsetPaginated } from '@/schemas/collaborationsOffsetPaginated';
import { serializeGetCollaborationsQueryParamsStatusField } from '@/managers/listCollaborations';
import { deserializeGetCollaborationsQueryParamsStatusField } from '@/managers/listCollaborations';
import { BoxClient } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { FileFull } from '@/schemas/fileFull';
import { GroupFull } from '@/schemas/groupFull';
import { CreateGroupRequestBody } from '@/managers/groups';
import { Collaboration } from '@/schemas/collaboration';
import { CreateCollaborationRequestBody } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyItemField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyItemTypeField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyAccessibleByField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyAccessibleByTypeField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyRoleField } from '@/managers/userCollaborations';
import { Collaborations } from '@/schemas/collaborations';
import { CollaborationsOffsetPaginated } from '@/schemas/collaborationsOffsetPaginated';
import { GetCollaborationsQueryParams } from '@/managers/listCollaborations';
import { GetCollaborationsQueryParamsStatusField } from '@/managers/listCollaborations';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { createNewFolder } from './commons';
import { uploadNewFile } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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

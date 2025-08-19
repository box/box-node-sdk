import { serializeUserFull } from '../schemas/userFull.js';
import { deserializeUserFull } from '../schemas/userFull.js';
import { serializeCreateUserRequestBody } from '../managers/users.js';
import { deserializeCreateUserRequestBody } from '../managers/users.js';
import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
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
import { serializeUpdateCollaborationByIdRequestBody } from '../managers/userCollaborations.js';
import { deserializeUpdateCollaborationByIdRequestBody } from '../managers/userCollaborations.js';
import { serializeUpdateCollaborationByIdRequestBodyRoleField } from '../managers/userCollaborations.js';
import { deserializeUpdateCollaborationByIdRequestBodyRoleField } from '../managers/userCollaborations.js';
import { serializeCollaborations } from '../schemas/collaborations.js';
import { deserializeCollaborations } from '../schemas/collaborations.js';
import { BoxClient } from '../client.js';
import { UserFull } from '../schemas/userFull.js';
import { CreateUserRequestBody } from '../managers/users.js';
import { FolderFull } from '../schemas/folderFull.js';
import { Collaboration } from '../schemas/collaboration.js';
import { CreateCollaborationRequestBody } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyItemField } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyItemTypeField } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyAccessibleByField } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyAccessibleByTypeField } from '../managers/userCollaborations.js';
import { CreateCollaborationRequestBodyRoleField } from '../managers/userCollaborations.js';
import { UpdateCollaborationByIdRequestBody } from '../managers/userCollaborations.js';
import { UpdateCollaborationByIdRequestBodyRoleField } from '../managers/userCollaborations.js';
import { Collaborations } from '../schemas/collaborations.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { createNewFolder } from './commons.js';
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
test('testUserCollaborations', async function testUserCollaborations(): Promise<any> {
  const userName: string = getUuid();
  const userLogin: string = ''.concat(getUuid(), '@gmail.com') as string;
  const user: UserFull = await client.users.createUser({
    name: userName,
    login: userLogin,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  const folder: FolderFull = await createNewFolder();
  const collaboration: Collaboration =
    await client.userCollaborations.createCollaboration({
      item: {
        type: 'folder' as CreateCollaborationRequestBodyItemTypeField,
        id: folder.id,
      } satisfies CreateCollaborationRequestBodyItemField,
      accessibleBy: {
        type: 'user' as CreateCollaborationRequestBodyAccessibleByTypeField,
        id: user.id,
      } satisfies CreateCollaborationRequestBodyAccessibleByField,
      role: 'editor' as CreateCollaborationRequestBodyRoleField,
    } satisfies CreateCollaborationRequestBody);
  if (!((toString(collaboration.role!) as string) == 'editor')) {
    throw new Error('Assertion failed');
  }
  const collaborationId: string = collaboration.id;
  const collaborationFromApi: Collaboration =
    await client.userCollaborations.getCollaborationById(collaborationId);
  if (!(collaborationId == collaborationFromApi.id)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(collaborationFromApi.status!) as string) == 'accepted')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(collaborationFromApi.type) as string) == 'collaboration')) {
    throw new Error('Assertion failed');
  }
  if (!(collaborationFromApi.inviteEmail == void 0)) {
    throw new Error('Assertion failed');
  }
  const updatedCollaboration: undefined | Collaboration =
    await client.userCollaborations.updateCollaborationById(collaborationId, {
      role: 'viewer' as UpdateCollaborationByIdRequestBodyRoleField,
    } satisfies UpdateCollaborationByIdRequestBody);
  if (!((toString(updatedCollaboration!.role!) as string) == 'viewer')) {
    throw new Error('Assertion failed');
  }
  await client.userCollaborations.deleteCollaborationById(collaborationId);
  await expect(async () => {
    await client.userCollaborations.getCollaborationById(collaborationId);
  }).rejects.toThrow();
  await client.folders.deleteFolderById(folder.id);
  await client.users.deleteUserById(user.id);
});
test('testConvertingUserCollaborationToOwnership', async function testConvertingUserCollaborationToOwnership(): Promise<any> {
  const userName: string = getUuid();
  const userLogin: string = ''.concat(getUuid(), '@gmail.com') as string;
  const user: UserFull = await client.users.createUser({
    name: userName,
    login: userLogin,
    isPlatformAccessOnly: true,
  } satisfies CreateUserRequestBody);
  const folder: FolderFull = await createNewFolder();
  const collaboration: Collaboration =
    await client.userCollaborations.createCollaboration({
      item: {
        type: 'folder' as CreateCollaborationRequestBodyItemTypeField,
        id: folder.id,
      } satisfies CreateCollaborationRequestBodyItemField,
      accessibleBy: {
        type: 'user' as CreateCollaborationRequestBodyAccessibleByTypeField,
        id: user.id,
      } satisfies CreateCollaborationRequestBodyAccessibleByField,
      role: 'editor' as CreateCollaborationRequestBodyRoleField,
    } satisfies CreateCollaborationRequestBody);
  if (!((toString(collaboration.role!) as string) == 'editor')) {
    throw new Error('Assertion failed');
  }
  const ownerCollaboration: undefined | Collaboration =
    await client.userCollaborations.updateCollaborationById(collaboration.id, {
      role: 'owner' as UpdateCollaborationByIdRequestBodyRoleField,
    } satisfies UpdateCollaborationByIdRequestBody);
  if (!(ownerCollaboration == void 0)) {
    throw new Error('Assertion failed');
  }
  const folderCollaborations: Collaborations =
    await client.listCollaborations.getFolderCollaborations(folder.id);
  const folderCollaboration: Collaboration = folderCollaborations.entries![0];
  await client.userCollaborations.deleteCollaborationById(
    folderCollaboration.id,
  );
  const userClient: BoxClient = client.withAsUserHeader(user.id);
  await userClient.folders.deleteFolderById(folder.id);
  await userClient.trashedFolders.deleteTrashedFolderById(folder.id);
  await client.users.deleteUserById(user.id);
});
test('testExternalUserCollaborations', async function testExternalUserCollaborations(): Promise<any> {
  const userName: string = getUuid();
  const userLogin: string = ''.concat(getUuid(), '@boxdemo.com') as string;
  const folder: FolderFull = await createNewFolder();
  const collaboration: Collaboration =
    await client.userCollaborations.createCollaboration({
      item: {
        type: 'folder' as CreateCollaborationRequestBodyItemTypeField,
        id: folder.id,
      } satisfies CreateCollaborationRequestBodyItemField,
      accessibleBy: {
        type: 'user' as CreateCollaborationRequestBodyAccessibleByTypeField,
        login: userLogin,
      } satisfies CreateCollaborationRequestBodyAccessibleByField,
      role: 'editor' as CreateCollaborationRequestBodyRoleField,
    } satisfies CreateCollaborationRequestBody);
  if (!((toString(collaboration.role!) as string) == 'editor')) {
    throw new Error('Assertion failed');
  }
  const collaborationId: string = collaboration.id;
  const collaborationFromApi: Collaboration =
    await client.userCollaborations.getCollaborationById(collaborationId);
  if (!(collaborationId == collaborationFromApi.id)) {
    throw new Error('Assertion failed');
  }
  if (!((toString(collaborationFromApi.status!) as string) == 'pending')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(collaborationFromApi.type) as string) == 'collaboration')) {
    throw new Error('Assertion failed');
  }
  if (!(collaborationFromApi.inviteEmail == userLogin)) {
    throw new Error('Assertion failed');
  }
  const updatedCollaboration: undefined | Collaboration =
    await client.userCollaborations.updateCollaborationById(collaborationId, {
      role: 'viewer' as UpdateCollaborationByIdRequestBodyRoleField,
    } satisfies UpdateCollaborationByIdRequestBody);
  if (!((toString(updatedCollaboration!.role!) as string) == 'viewer')) {
    throw new Error('Assertion failed');
  }
  await client.userCollaborations.deleteCollaborationById(collaborationId);
  await expect(async () => {
    await client.userCollaborations.getCollaborationById(collaborationId);
  }).rejects.toThrow();
  await client.folders.deleteFolderById(folder.id);
});
export {};

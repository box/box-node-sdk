import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeCreateUserRequestBody } from '@/managers/users';
import { deserializeCreateUserRequestBody } from '@/managers/users';
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
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
import { serializeUpdateCollaborationByIdRequestBody } from '@/managers/userCollaborations';
import { deserializeUpdateCollaborationByIdRequestBody } from '@/managers/userCollaborations';
import { serializeUpdateCollaborationByIdRequestBodyRoleField } from '@/managers/userCollaborations';
import { deserializeUpdateCollaborationByIdRequestBodyRoleField } from '@/managers/userCollaborations';
import { serializeCollaborations } from '@/schemas/collaborations';
import { deserializeCollaborations } from '@/schemas/collaborations';
import { UpdateCollaborationByIdOptionalsInput } from '@/managers/userCollaborations';
import { UpdateCollaborationByIdOptionals } from '@/managers/userCollaborations';
import { BoxClient } from '@/client';
import { UserFull } from '@/schemas/userFull';
import { CreateUserRequestBody } from '@/managers/users';
import { FolderFull } from '@/schemas/folderFull';
import { Collaboration } from '@/schemas/collaboration';
import { CreateCollaborationRequestBody } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyItemField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyItemTypeField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyAccessibleByField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyAccessibleByTypeField } from '@/managers/userCollaborations';
import { CreateCollaborationRequestBodyRoleField } from '@/managers/userCollaborations';
import { UpdateCollaborationByIdRequestBody } from '@/managers/userCollaborations';
import { UpdateCollaborationByIdRequestBodyRoleField } from '@/managers/userCollaborations';
import { Collaborations } from '@/schemas/collaborations';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { createNewFolder } from './commons';
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
      requestBody: {
        role: 'viewer' as UpdateCollaborationByIdRequestBodyRoleField,
      } satisfies UpdateCollaborationByIdRequestBody,
    } satisfies UpdateCollaborationByIdOptionalsInput);
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
      requestBody: {
        role: 'owner' as UpdateCollaborationByIdRequestBodyRoleField,
      } satisfies UpdateCollaborationByIdRequestBody,
    } satisfies UpdateCollaborationByIdOptionalsInput);
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
      requestBody: {
        role: 'viewer' as UpdateCollaborationByIdRequestBodyRoleField,
      } satisfies UpdateCollaborationByIdRequestBody,
    } satisfies UpdateCollaborationByIdOptionalsInput);
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

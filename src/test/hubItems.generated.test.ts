import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeHubV2025R0 } from '../schemas/v2025R0/hubV2025R0.generated.js';
import { deserializeHubV2025R0 } from '../schemas/v2025R0/hubV2025R0.generated.js';
import { serializeHubCreateRequestV2025R0 } from '../schemas/v2025R0/hubCreateRequestV2025R0.generated.js';
import { deserializeHubCreateRequestV2025R0 } from '../schemas/v2025R0/hubCreateRequestV2025R0.generated.js';
import { serializeHubItemsV2025R0 } from '../schemas/v2025R0/hubItemsV2025R0.generated.js';
import { deserializeHubItemsV2025R0 } from '../schemas/v2025R0/hubItemsV2025R0.generated.js';
import { serializeHubItemsManageResponseV2025R0 } from '../schemas/v2025R0/hubItemsManageResponseV2025R0.generated.js';
import { deserializeHubItemsManageResponseV2025R0 } from '../schemas/v2025R0/hubItemsManageResponseV2025R0.generated.js';
import { serializeHubItemsManageRequestV2025R0 } from '../schemas/v2025R0/hubItemsManageRequestV2025R0.generated.js';
import { deserializeHubItemsManageRequestV2025R0 } from '../schemas/v2025R0/hubItemsManageRequestV2025R0.generated.js';
import { serializeHubItemOperationV2025R0 } from '../schemas/v2025R0/hubItemOperationV2025R0.generated.js';
import { deserializeHubItemOperationV2025R0 } from '../schemas/v2025R0/hubItemOperationV2025R0.generated.js';
import { serializeHubItemOperationV2025R0ActionField } from '../schemas/v2025R0/hubItemOperationV2025R0.generated.js';
import { deserializeHubItemOperationV2025R0ActionField } from '../schemas/v2025R0/hubItemOperationV2025R0.generated.js';
import { serializeHubItemOperationResultV2025R0 } from '../schemas/v2025R0/hubItemOperationResultV2025R0.generated.js';
import { deserializeHubItemOperationResultV2025R0 } from '../schemas/v2025R0/hubItemOperationResultV2025R0.generated.js';
import { serializeFolderReferenceV2025R0 } from '../schemas/v2025R0/folderReferenceV2025R0.generated.js';
import { deserializeFolderReferenceV2025R0 } from '../schemas/v2025R0/folderReferenceV2025R0.generated.js';
import { BoxClient } from '../client.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { CreateFolderRequestBody } from '../managers/folders.generated.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { HubV2025R0 } from '../schemas/v2025R0/hubV2025R0.generated.js';
import { HubCreateRequestV2025R0 } from '../schemas/v2025R0/hubCreateRequestV2025R0.generated.js';
import { HubItemsV2025R0 } from '../schemas/v2025R0/hubItemsV2025R0.generated.js';
import { GetHubItemsV2025R0QueryParams } from '../managers/hubItems.generated.js';
import { HubItemsManageResponseV2025R0 } from '../schemas/v2025R0/hubItemsManageResponseV2025R0.generated.js';
import { HubItemsManageRequestV2025R0 } from '../schemas/v2025R0/hubItemsManageRequestV2025R0.generated.js';
import { HubItemOperationV2025R0 } from '../schemas/v2025R0/hubItemOperationV2025R0.generated.js';
import { HubItemOperationV2025R0ActionField } from '../schemas/v2025R0/hubItemOperationV2025R0.generated.js';
import { HubItemOperationResultV2025R0 } from '../schemas/v2025R0/hubItemOperationResultV2025R0.generated.js';
import { getDefaultClientWithUserSubject } from './commons.generated.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { FolderReferenceV2025R0 } from '../schemas/v2025R0/folderReferenceV2025R0.generated.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClientWithUserSubject(
  getEnvVar('USER_ID'),
);
test('testCreateDeleteGetHubItems', async function testCreateDeleteGetHubItems(): Promise<any> {
  const hubTitle: string = getUuid();
  const folder: FolderFull = await client.folders.createFolder({
    name: getUuid(),
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  const createdHub: HubV2025R0 = await client.hubs.createHubV2025R0({
    title: hubTitle,
  } satisfies HubCreateRequestV2025R0);
  const hubItemsBeforeAdd: HubItemsV2025R0 =
    await client.hubItems.getHubItemsV2025R0({
      hubId: createdHub.id,
    } satisfies GetHubItemsV2025R0QueryParams);
  if (!(hubItemsBeforeAdd.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  const addedHubItems: HubItemsManageResponseV2025R0 =
    await client.hubItems.manageHubItemsV2025R0(createdHub.id, {
      operations: [
        {
          action: 'add' as HubItemOperationV2025R0ActionField,
          item: new FolderReferenceV2025R0({ id: folder.id }),
        } satisfies HubItemOperationV2025R0,
      ],
    } satisfies HubItemsManageRequestV2025R0);
  const addedHubItem: HubItemOperationResultV2025R0 =
    addedHubItems.operations[0];
  if (!((toString(addedHubItem.action!) as string) == 'add')) {
    throw new Error('Assertion failed');
  }
  if (!(addedHubItem.status! == 200)) {
    throw new Error('Assertion failed');
  }
  if (!(addedHubItem.item!.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (!(addedHubItem.item!.type == 'folder')) {
    throw new Error('Assertion failed');
  }
  const hubItemsAfterAdd: HubItemsV2025R0 =
    await client.hubItems.getHubItemsV2025R0({
      hubId: createdHub.id,
    } satisfies GetHubItemsV2025R0QueryParams);
  if (!(hubItemsAfterAdd.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
  const removedHubItems: HubItemsManageResponseV2025R0 =
    await client.hubItems.manageHubItemsV2025R0(createdHub.id, {
      operations: [
        {
          action: 'remove' as HubItemOperationV2025R0ActionField,
          item: new FolderReferenceV2025R0({ id: folder.id }),
        } satisfies HubItemOperationV2025R0,
      ],
    } satisfies HubItemsManageRequestV2025R0);
  const removedHubItem: HubItemOperationResultV2025R0 =
    removedHubItems.operations[0];
  if (!((toString(removedHubItem.action!) as string) == 'remove')) {
    throw new Error('Assertion failed');
  }
  if (!(removedHubItem.status! == 200)) {
    throw new Error('Assertion failed');
  }
  if (!(removedHubItem.item!.id == folder.id)) {
    throw new Error('Assertion failed');
  }
  if (!(removedHubItem.item!.type == 'folder')) {
    throw new Error('Assertion failed');
  }
  const hubItemsAfterRemove: HubItemsV2025R0 =
    await client.hubItems.getHubItemsV2025R0({
      hubId: createdHub.id,
    } satisfies GetHubItemsV2025R0QueryParams);
  if (!(hubItemsAfterRemove.entries!.length == 0)) {
    throw new Error('Assertion failed');
  }
  await client.hubs.deleteHubByIdV2025R0(createdHub.id);
  await client.folders.deleteFolderById(folder.id);
});
export {};

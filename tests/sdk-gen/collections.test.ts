import { serializeCollections } from '../schemas/collections.js';
import { deserializeCollections } from '../schemas/collections.js';
import { serializeCollection } from '../schemas/collection.js';
import { deserializeCollection } from '../schemas/collection.js';
import { serializeItemsOffsetPaginated } from '../schemas/itemsOffsetPaginated.js';
import { deserializeItemsOffsetPaginated } from '../schemas/itemsOffsetPaginated.js';
import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { serializeUpdateFolderByIdRequestBody } from '../managers/folders.js';
import { deserializeUpdateFolderByIdRequestBody } from '../managers/folders.js';
import { serializeUpdateFolderByIdRequestBodyCollectionsField } from '../managers/folders.js';
import { deserializeUpdateFolderByIdRequestBodyCollectionsField } from '../managers/folders.js';
import { UpdateFolderByIdOptionalsInput } from '../managers/folders.js';
import { UpdateFolderByIdOptionals } from '../managers/folders.js';
import { BoxClient } from '../client.js';
import { Collections } from '../schemas/collections.js';
import { Collection } from '../schemas/collection.js';
import { ItemsOffsetPaginated } from '../schemas/itemsOffsetPaginated.js';
import { FolderFull } from '../schemas/folderFull.js';
import { CreateFolderRequestBody } from '../managers/folders.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.js';
import { UpdateFolderByIdRequestBody } from '../managers/folders.js';
import { UpdateFolderByIdRequestBodyCollectionsField } from '../managers/folders.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
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
test('testCollections', async function testCollections(): Promise<any> {
  const collections: Collections = await client.collections.getCollections();
  const favouriteCollection: Collection =
    await client.collections.getCollectionById(collections.entries![0].id!);
  if (!((toString(favouriteCollection.type!) as string) == 'collection')) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(favouriteCollection.collectionType!) as string) == 'favorites')
  ) {
    throw new Error('Assertion failed');
  }
  const collectionItems: ItemsOffsetPaginated =
    await client.collections.getCollectionItems(favouriteCollection.id!);
  const folder: FolderFull = await client.folders.createFolder({
    name: getUuid(),
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
  await client.folders.updateFolderById(folder.id, {
    requestBody: {
      collections: [
        {
          id: favouriteCollection.id,
        } satisfies UpdateFolderByIdRequestBodyCollectionsField,
      ],
    } satisfies UpdateFolderByIdRequestBody,
  } satisfies UpdateFolderByIdOptionalsInput);
  const collectionItemsAfterUpdate: ItemsOffsetPaginated =
    await client.collections.getCollectionItems(favouriteCollection.id!);
  if (!(collectionItemsAfterUpdate.totalCount! > 0)) {
    throw new Error('Assertion failed');
  }
  await client.folders.updateFolderById(folder.id, {
    requestBody: { collections: [] } satisfies UpdateFolderByIdRequestBody,
  } satisfies UpdateFolderByIdOptionalsInput);
  await client.folders.deleteFolderById(folder.id);
});
export {};

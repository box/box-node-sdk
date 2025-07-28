import { serializeCollections } from '../schemas/collections.generated.js';
import { deserializeCollections } from '../schemas/collections.generated.js';
import { serializeCollection } from '../schemas/collection.generated.js';
import { deserializeCollection } from '../schemas/collection.generated.js';
import { serializeItemsOffsetPaginated } from '../schemas/itemsOffsetPaginated.generated.js';
import { deserializeItemsOffsetPaginated } from '../schemas/itemsOffsetPaginated.generated.js';
import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.generated.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { serializeUpdateFolderByIdRequestBody } from '../managers/folders.generated.js';
import { deserializeUpdateFolderByIdRequestBody } from '../managers/folders.generated.js';
import { serializeUpdateFolderByIdRequestBodyCollectionsField } from '../managers/folders.generated.js';
import { deserializeUpdateFolderByIdRequestBodyCollectionsField } from '../managers/folders.generated.js';
import { UpdateFolderByIdOptionalsInput } from '../managers/folders.generated.js';
import { UpdateFolderByIdOptionals } from '../managers/folders.generated.js';
import { BoxClient } from '../client.generated.js';
import { Collections } from '../schemas/collections.generated.js';
import { Collection } from '../schemas/collection.generated.js';
import { ItemsOffsetPaginated } from '../schemas/itemsOffsetPaginated.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { CreateFolderRequestBody } from '../managers/folders.generated.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.generated.js';
import { UpdateFolderByIdRequestBody } from '../managers/folders.generated.js';
import { UpdateFolderByIdRequestBodyCollectionsField } from '../managers/folders.generated.js';
import { getUuid } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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

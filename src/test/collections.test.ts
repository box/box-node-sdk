import { serializeCollections } from '@/schemas/collections';
import { deserializeCollections } from '@/schemas/collections';
import { serializeCollection } from '@/schemas/collection';
import { deserializeCollection } from '@/schemas/collection';
import { serializeItemsOffsetPaginated } from '@/schemas/itemsOffsetPaginated';
import { deserializeItemsOffsetPaginated } from '@/schemas/itemsOffsetPaginated';
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeCreateFolderRequestBody } from '@/managers/folders';
import { deserializeCreateFolderRequestBody } from '@/managers/folders';
import { serializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { deserializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { serializeUpdateFolderByIdRequestBody } from '@/managers/folders';
import { deserializeUpdateFolderByIdRequestBody } from '@/managers/folders';
import { serializeUpdateFolderByIdRequestBodyCollectionsField } from '@/managers/folders';
import { deserializeUpdateFolderByIdRequestBodyCollectionsField } from '@/managers/folders';
import { UpdateFolderByIdOptionalsInput } from '@/managers/folders';
import { UpdateFolderByIdOptionals } from '@/managers/folders';
import { BoxClient } from '@/client';
import { Collections } from '@/schemas/collections';
import { Collection } from '@/schemas/collection';
import { ItemsOffsetPaginated } from '@/schemas/itemsOffsetPaginated';
import { FolderFull } from '@/schemas/folderFull';
import { CreateFolderRequestBody } from '@/managers/folders';
import { CreateFolderRequestBodyParentField } from '@/managers/folders';
import { UpdateFolderByIdRequestBody } from '@/managers/folders';
import { UpdateFolderByIdRequestBodyCollectionsField } from '@/managers/folders';
import { getUuid } from '@/internal/utils';
import { getDefaultClient } from './commons';
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

# CollectionsManager

- [List all collections](#list-all-collections)
- [List collection items](#list-collection-items)
- [Get collection by ID](#get-collection-by-id)

## List all collections

Retrieves all collections for a given user.

Currently, only the `favorites` collection
is supported.

This operation is performed by calling function `getCollections`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-collections/).

<!-- sample get_collections -->

```ts
await client.collections.getCollections();
```

### Arguments

- queryParams `GetCollectionsQueryParams`
  - Query parameters of getCollections method
- headersInput `GetCollectionsHeadersInput`
  - Headers of getCollections method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `Collections`.

Returns all collections for the given user.

## List collection items

Retrieves the files and/or folders contained within
this collection.

This operation is performed by calling function `getCollectionItems`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-collections-id-items/).

<!-- sample get_collections_id_items -->

```ts
await client.collections.getCollectionItems(favouriteCollection.id!);
```

### Arguments

- collectionId `string`
  - The ID of the collection. Example: "926489"
- optionalsInput `GetCollectionItemsOptionalsInput`

### Returns

This function returns a value of type `ItemsOffsetPaginated`.

Returns an array of items in the collection.

## Get collection by ID

Retrieves a collection by its ID.

This operation is performed by calling function `getCollectionById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-collections-id/).

<!-- sample get_collections_id -->

```ts
await client.collections.getCollectionById(collections.entries![0].id!);
```

### Arguments

- collectionId `string`
  - The ID of the collection. Example: "926489"
- optionalsInput `GetCollectionByIdOptionalsInput`

### Returns

This function returns a value of type `Collection`.

Returns an array of items in the collection.

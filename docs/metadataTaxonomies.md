# MetadataTaxonomiesManager

- [Create metadata taxonomy](#create-metadata-taxonomy)
- [Get metadata taxonomies for namespace](#get-metadata-taxonomies-for-namespace)
- [Get metadata taxonomy by taxonomy key](#get-metadata-taxonomy-by-taxonomy-key)
- [Update metadata taxonomy](#update-metadata-taxonomy)
- [Remove metadata taxonomy](#remove-metadata-taxonomy)
- [Create metadata taxonomy levels](#create-metadata-taxonomy-levels)
- [Update metadata taxonomy level](#update-metadata-taxonomy-level)
- [Add metadata taxonomy level](#add-metadata-taxonomy-level)
- [Delete metadata taxonomy level](#delete-metadata-taxonomy-level)
- [List metadata taxonomy nodes](#list-metadata-taxonomy-nodes)
- [Create metadata taxonomy node](#create-metadata-taxonomy-node)
- [Get metadata taxonomy node by ID](#get-metadata-taxonomy-node-by-id)
- [Update metadata taxonomy node](#update-metadata-taxonomy-node)
- [Remove metadata taxonomy node](#remove-metadata-taxonomy-node)
- [List metadata template's options for taxonomy field](#list-metadata-templates-options-for-taxonomy-field)

## Create metadata taxonomy

Creates a new metadata taxonomy that can be used in
metadata templates.

This operation is performed by calling function `createMetadataTaxonomy`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-metadata-taxonomies/).

<!-- sample post_metadata_taxonomies -->

```ts
await client.metadataTaxonomies.createMetadataTaxonomy({
  displayName: displayName,
  key: taxonomyKey,
  namespace: namespace,
} satisfies CreateMetadataTaxonomyRequestBody);
```

### Arguments

- requestBody `CreateMetadataTaxonomyRequestBody`
  - Request body of createMetadataTaxonomy method
- optionalsInput `CreateMetadataTaxonomyOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomy`.

The schema representing the metadata taxonomy created.

## Get metadata taxonomies for namespace

Used to retrieve all metadata taxonomies in a namespace.

This operation is performed by calling function `getMetadataTaxonomies`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-metadata-taxonomies-id/).

<!-- sample get_metadata_taxonomies_id -->

```ts
await client.metadataTaxonomies.getMetadataTaxonomies(namespace);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- optionalsInput `GetMetadataTaxonomiesOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomies`.

Returns all of the metadata taxonomies within a namespace
and their corresponding schema.

## Get metadata taxonomy by taxonomy key

Used to retrieve a metadata taxonomy by taxonomy key.

This operation is performed by calling function `getMetadataTaxonomyByKey`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-metadata-taxonomies-id-id/).

<!-- sample get_metadata_taxonomies_id_id -->

```ts
await client.metadataTaxonomies.getMetadataTaxonomyByKey(
  namespace,
  taxonomyKey,
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- optionalsInput `GetMetadataTaxonomyByKeyOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomy`.

Returns the metadata taxonomy identified by the taxonomy key.

## Update metadata taxonomy

Updates an existing metadata taxonomy.

This operation is performed by calling function `updateMetadataTaxonomy`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/patch-metadata-taxonomies-id-id/).

<!-- sample patch_metadata_taxonomies_id_id -->

```ts
await client.metadataTaxonomies.updateMetadataTaxonomy(namespace, taxonomyKey, {
  displayName: updatedDisplayName,
} satisfies UpdateMetadataTaxonomyRequestBody);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- requestBody `UpdateMetadataTaxonomyRequestBody`
  - Request body of updateMetadataTaxonomy method
- optionalsInput `UpdateMetadataTaxonomyOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomy`.

The schema representing the updated metadata taxonomy.

## Remove metadata taxonomy

Delete a metadata taxonomy.
This deletion is permanent and cannot be reverted.

This operation is performed by calling function `deleteMetadataTaxonomy`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-metadata-taxonomies-id-id/).

<!-- sample delete_metadata_taxonomies_id_id -->

```ts
await client.metadataTaxonomies.deleteMetadataTaxonomy(namespace, taxonomyKey);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- optionalsInput `DeleteMetadataTaxonomyOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the metadata taxonomy is successfully deleted.

## Create metadata taxonomy levels

Creates new metadata taxonomy levels.

This operation is performed by calling function `createMetadataTaxonomyLevel`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-metadata-taxonomies-id-id-levels/).

<!-- sample post_metadata_taxonomies_id_id_levels -->

```ts
await client.metadataTaxonomies.createMetadataTaxonomyLevel(
  namespace,
  taxonomyKey,
  [
    {
      displayName: 'Continent',
      description: 'Continent Level',
    } satisfies MetadataTaxonomyLevel,
    {
      displayName: 'Country',
      description: 'Country Level',
    } satisfies MetadataTaxonomyLevel,
  ],
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- requestBody `readonly MetadataTaxonomyLevel[]`
  - Request body of createMetadataTaxonomyLevel method
- optionalsInput `CreateMetadataTaxonomyLevelOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomyLevels`.

Returns an array of all taxonomy levels.

## Update metadata taxonomy level

Updates an existing metadata taxonomy level.

This operation is performed by calling function `updateMetadataTaxonomyLevelById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/patch-metadata-taxonomies-id-id-levels-id/).

<!-- sample patch_metadata_taxonomies_id_id_levels_id -->

```ts
await client.metadataTaxonomies.updateMetadataTaxonomyLevelById(
  namespace,
  taxonomyKey,
  1,
  {
    displayName: 'Continent UPDATED',
    description: 'Continent Level UPDATED',
  } satisfies UpdateMetadataTaxonomyLevelByIdRequestBody,
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- levelIndex `number`
  - The index of the metadata taxonomy level. Example: 1
- requestBody `UpdateMetadataTaxonomyLevelByIdRequestBody`
  - Request body of updateMetadataTaxonomyLevelById method
- optionalsInput `UpdateMetadataTaxonomyLevelByIdOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomyLevel`.

The updated taxonomy level.

## Add metadata taxonomy level

Creates a new metadata taxonomy level and appends it to the existing levels.
If there are no levels defined yet, this will create the first level.

This operation is performed by calling function `addMetadataTaxonomyLevel`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-metadata-taxonomies-id-id-levels:append/).

<!-- sample post_metadata_taxonomies_id_id_levels:append -->

```ts
await client.metadataTaxonomies.addMetadataTaxonomyLevel(
  namespace,
  taxonomyKey,
  {
    displayName: 'Region',
    description: 'Region Description',
  } satisfies AddMetadataTaxonomyLevelRequestBody,
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- requestBody `AddMetadataTaxonomyLevelRequestBody`
  - Request body of addMetadataTaxonomyLevel method
- optionalsInput `AddMetadataTaxonomyLevelOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomyLevels`.

Returns an array of all taxonomy levels.

## Delete metadata taxonomy level

Deletes the last level of the metadata taxonomy.

This operation is performed by calling function `deleteMetadataTaxonomyLevel`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-metadata-taxonomies-id-id-levels:trim/).

<!-- sample post_metadata_taxonomies_id_id_levels:trim -->

```ts
await client.metadataTaxonomies.deleteMetadataTaxonomyLevel(
  namespace,
  taxonomyKey,
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- optionalsInput `DeleteMetadataTaxonomyLevelOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomyLevels`.

Returns an array of all taxonomy levels.

## List metadata taxonomy nodes

Used to retrieve metadata taxonomy nodes based on the parameters specified.
Results are sorted in lexicographic order unless a `query` parameter is passed.
With a `query` parameter specified, results are sorted in order of relevance.

This operation is performed by calling function `getMetadataTaxonomyNodes`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-metadata-taxonomies-id-id-nodes/).

<!-- sample get_metadata_taxonomies_id_id_nodes -->

```ts
await client.metadataTaxonomies.getMetadataTaxonomyNodes(
  namespace,
  taxonomyKey,
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- optionalsInput `GetMetadataTaxonomyNodesOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomyNodes`.

Returns a list of the taxonomy nodes that match the specified parameters.

## Create metadata taxonomy node

Creates a new metadata taxonomy node.

This operation is performed by calling function `createMetadataTaxonomyNode`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-metadata-taxonomies-id-id-nodes/).

<!-- sample post_metadata_taxonomies_id_id_nodes -->

```ts
await client.metadataTaxonomies.createMetadataTaxonomyNode(
  namespace,
  taxonomyKey,
  {
    displayName: 'Europe',
    level: 1,
  } satisfies CreateMetadataTaxonomyNodeRequestBody,
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- requestBody `CreateMetadataTaxonomyNodeRequestBody`
  - Request body of createMetadataTaxonomyNode method
- optionalsInput `CreateMetadataTaxonomyNodeOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomyNode`.

The schema representing the taxonomy node created.

## Get metadata taxonomy node by ID

Retrieves a metadata taxonomy node by its identifier.

This operation is performed by calling function `getMetadataTaxonomyNodeById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-metadata-taxonomies-id-id-nodes-id/).

<!-- sample get_metadata_taxonomies_id_id_nodes_id -->

```ts
await client.metadataTaxonomies.getMetadataTaxonomyNodeById(
  namespace,
  taxonomyKey,
  countryNode.id,
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- nodeId `string`
  - The identifier of the metadata taxonomy node. Example: "14d3d433-c77f-49c5-b146-9dea370f6e32"
- optionalsInput `GetMetadataTaxonomyNodeByIdOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomyNode`.

Returns the metadata taxonomy node that matches the identifier.

## Update metadata taxonomy node

Updates an existing metadata taxonomy node.

This operation is performed by calling function `updateMetadataTaxonomyNode`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/patch-metadata-taxonomies-id-id-nodes-id/).

<!-- sample patch_metadata_taxonomies_id_id_nodes_id -->

```ts
await client.metadataTaxonomies.updateMetadataTaxonomyNode(
  namespace,
  taxonomyKey,
  countryNode.id,
  {
    requestBody: {
      displayName: 'Poland UPDATED',
    } satisfies UpdateMetadataTaxonomyNodeRequestBody,
  } satisfies UpdateMetadataTaxonomyNodeOptionalsInput,
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- nodeId `string`
  - The identifier of the metadata taxonomy node. Example: "14d3d433-c77f-49c5-b146-9dea370f6e32"
- optionalsInput `UpdateMetadataTaxonomyNodeOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomyNode`.

The schema representing the updated taxonomy node.

## Remove metadata taxonomy node

Delete a metadata taxonomy node.
This deletion is permanent and cannot be reverted.
Only metadata taxonomy nodes without any children can be deleted.

This operation is performed by calling function `deleteMetadataTaxonomyNode`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-metadata-taxonomies-id-id-nodes-id/).

<!-- sample delete_metadata_taxonomies_id_id_nodes_id -->

```ts
await client.metadataTaxonomies.deleteMetadataTaxonomyNode(
  namespace,
  taxonomyKey,
  countryNode.id,
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- taxonomyKey `string`
  - The key of the metadata taxonomy. Example: "geography"
- nodeId `string`
  - The identifier of the metadata taxonomy node. Example: "14d3d433-c77f-49c5-b146-9dea370f6e32"
- optionalsInput `DeleteMetadataTaxonomyNodeOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the metadata taxonomy node is successfully deleted.

## List metadata template's options for taxonomy field

Used to retrieve metadata taxonomy nodes which are available for the taxonomy field based
on its configuration and the parameters specified.
Results are sorted in lexicographic order unless a `query` parameter is passed.
With a `query` parameter specified, results are sorted in order of relevance.

This operation is performed by calling function `getMetadataTemplateFieldOptions`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-metadata-templates-id-id-fields-id-options/).

<!-- sample get_metadata_templates_id_id_fields_id_options -->

```ts
await client.metadataTaxonomies.getMetadataTemplateFieldOptions(
  namespace,
  metadataTemplateKey,
  'taxonomy',
);
```

### Arguments

- namespace `string`
  - The namespace of the metadata taxonomy. Example: "enterprise_123456"
- templateKey `string`
  - The name of the metadata template. Example: "properties"
- fieldKey `string`
  - The key of the metadata taxonomy field in the template. Example: "geography"
- optionalsInput `GetMetadataTemplateFieldOptionsOptionalsInput`

### Returns

This function returns a value of type `MetadataTaxonomyNodes`.

Returns a list of the taxonomy nodes that match the specified parameters.

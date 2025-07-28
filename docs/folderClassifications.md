# FolderClassificationsManager

- [Get classification on folder](#get-classification-on-folder)
- [Add classification to folder](#add-classification-to-folder)
- [Update classification on folder](#update-classification-on-folder)
- [Remove classification from folder](#remove-classification-from-folder)

## Get classification on folder

Retrieves the classification metadata instance that
has been applied to a folder.

This API can also be called by including the enterprise ID in the
URL explicitly, for example
`/folders/:id/enterprise_12345/securityClassification-6VMVochwUWo`.

This operation is performed by calling function `getClassificationOnFolder`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-folders-id-metadata-enterprise-securityClassification-6VMVochwUWo/).

<!-- sample get_folders_id_metadata_enterprise_securityClassification-6VMVochwUWo -->

```ts
await client.folderClassifications.getClassificationOnFolder(folder.id);
```

### Arguments

- folderId `string`
  - The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. Example: "12345"
- optionalsInput `GetClassificationOnFolderOptionalsInput`

### Returns

This function returns a value of type `Classification`.

Returns an instance of the `securityClassification` metadata
template, which contains a `Box__Security__Classification__Key`
field that lists all the classifications available to this
enterprise.

## Add classification to folder

Adds a classification to a folder by specifying the label of the
classification to add.

This API can also be called by including the enterprise ID in the
URL explicitly, for example
`/folders/:id/enterprise_12345/securityClassification-6VMVochwUWo`.

This operation is performed by calling function `addClassificationToFolder`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-folders-id-metadata-enterprise-securityClassification-6VMVochwUWo/).

<!-- sample post_folders_id_metadata_enterprise_securityClassification-6VMVochwUWo -->

```ts
await client.folderClassifications.addClassificationToFolder(folder.id, {
  requestBody: {
    boxSecurityClassificationKey: classification.key,
  } satisfies AddClassificationToFolderRequestBody,
} satisfies AddClassificationToFolderOptionalsInput);
```

### Arguments

- folderId `string`
  - The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. Example: "12345"
- optionalsInput `AddClassificationToFolderOptionalsInput`

### Returns

This function returns a value of type `Classification`.

Returns the classification template instance
that was applied to the folder.

## Update classification on folder

Updates a classification on a folder.

The classification can only be updated if a classification has already been
applied to the folder before. When editing classifications, only values are
defined for the enterprise will be accepted.

This operation is performed by calling function `updateClassificationOnFolder`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-folders-id-metadata-enterprise-securityClassification-6VMVochwUWo/).

<!-- sample put_folders_id_metadata_enterprise_securityClassification-6VMVochwUWo -->

```ts
await client.folderClassifications.updateClassificationOnFolder(folder.id, [
  new UpdateClassificationOnFolderRequestBody({
    value: secondClassification.key,
  }),
]);
```

### Arguments

- folderId `string`
  - The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. Example: "12345"
- requestBody `readonly UpdateClassificationOnFolderRequestBody[]`
  - Request body of updateClassificationOnFolder method
- optionalsInput `UpdateClassificationOnFolderOptionalsInput`

### Returns

This function returns a value of type `Classification`.

Returns the updated classification metadata template instance.

## Remove classification from folder

Removes any classifications from a folder.

This API can also be called by including the enterprise ID in the
URL explicitly, for example
`/folders/:id/enterprise_12345/securityClassification-6VMVochwUWo`.

This operation is performed by calling function `deleteClassificationFromFolder`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-folders-id-metadata-enterprise-securityClassification-6VMVochwUWo/).

<!-- sample delete_folders_id_metadata_enterprise_securityClassification-6VMVochwUWo -->

```ts
await client.folderClassifications.deleteClassificationFromFolder(folder.id);
```

### Arguments

- folderId `string`
  - The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. Example: "12345"
- optionalsInput `DeleteClassificationFromFolderOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the classification is
successfully deleted.

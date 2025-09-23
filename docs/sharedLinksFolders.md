# SharedLinksFoldersManager

- [Find folder for shared link](#find-folder-for-shared-link)
- [Get shared link for folder](#get-shared-link-for-folder)
- [Add shared link to folder](#add-shared-link-to-folder)
- [Update shared link on folder](#update-shared-link-on-folder)
- [Remove shared link from folder](#remove-shared-link-from-folder)

## Find folder for shared link

Return the folder represented by a shared link.

A shared folder can be represented by a shared link,
which can originate within the current enterprise or within another.

This endpoint allows an application to retrieve information about a
shared folder when only given a shared link.

This operation is performed by calling function `findFolderForSharedLink`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-shared-items--folders/).

<!-- sample get_shared_items#folders -->

```ts
await userClient.sharedLinksFolders.findFolderForSharedLink(
  {} satisfies FindFolderForSharedLinkQueryParams,
  {
    boxapi: ''.concat(
      'shared_link=',
      folderFromApi.sharedLink!.url,
      '&shared_link_password=Secret123@',
    ) as string,
  } satisfies FindFolderForSharedLinkHeadersInput,
);
```

### Arguments

- queryParams `FindFolderForSharedLinkQueryParams`
  - Query parameters of findFolderForSharedLink method
- headersInput `FindFolderForSharedLinkHeadersInput`
  - Headers of findFolderForSharedLink method
- optionalsInput `FindFolderForSharedLinkOptionalsInput`

### Returns

This function returns a value of type `FolderFull`.

Returns a full folder resource if the shared link is valid and
the user has access to it.

## Get shared link for folder

Gets the information for a shared link on a folder.

This operation is performed by calling function `getSharedLinkForFolder`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-folders-id--get-shared-link/).

<!-- sample get_folders_id#get_shared_link -->

```ts
await client.sharedLinksFolders.getSharedLinkForFolder(folder.id, {
  fields: 'shared_link',
} satisfies GetSharedLinkForFolderQueryParams);
```

### Arguments

- folderId `string`
  - The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. Example: "12345"
- queryParams `GetSharedLinkForFolderQueryParams`
  - Query parameters of getSharedLinkForFolder method
- optionalsInput `GetSharedLinkForFolderOptionalsInput`

### Returns

This function returns a value of type `FolderFull`.

Returns the base representation of a folder with the
additional shared link information.

## Add shared link to folder

Adds a shared link to a folder.

This operation is performed by calling function `addShareLinkToFolder`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-folders-id--add-shared-link/).

<!-- sample put_folders_id#add_shared_link -->

```ts
await client.sharedLinksFolders.addShareLinkToFolder(
  folder.id,
  {
    sharedLink: {
      access: 'open' as AddShareLinkToFolderRequestBodySharedLinkAccessField,
      password: 'Secret123@',
    } satisfies AddShareLinkToFolderRequestBodySharedLinkField,
  } satisfies AddShareLinkToFolderRequestBody,
  { fields: 'shared_link' } satisfies AddShareLinkToFolderQueryParams,
);
```

### Arguments

- folderId `string`
  - The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. Example: "12345"
- requestBody `AddShareLinkToFolderRequestBody`
  - Request body of addShareLinkToFolder method
- queryParams `AddShareLinkToFolderQueryParams`
  - Query parameters of addShareLinkToFolder method
- optionalsInput `AddShareLinkToFolderOptionalsInput`

### Returns

This function returns a value of type `FolderFull`.

Returns the base representation of a folder with a new shared
link attached.

## Update shared link on folder

Updates a shared link on a folder.

This operation is performed by calling function `updateSharedLinkOnFolder`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-folders-id--update-shared-link/).

<!-- sample put_folders_id#update_shared_link -->

```ts
await client.sharedLinksFolders.updateSharedLinkOnFolder(
  folder.id,
  {
    sharedLink: {
      access:
        'collaborators' as UpdateSharedLinkOnFolderRequestBodySharedLinkAccessField,
    } satisfies UpdateSharedLinkOnFolderRequestBodySharedLinkField,
  } satisfies UpdateSharedLinkOnFolderRequestBody,
  { fields: 'shared_link' } satisfies UpdateSharedLinkOnFolderQueryParams,
);
```

### Arguments

- folderId `string`
  - The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. Example: "12345"
- requestBody `UpdateSharedLinkOnFolderRequestBody`
  - Request body of updateSharedLinkOnFolder method
- queryParams `UpdateSharedLinkOnFolderQueryParams`
  - Query parameters of updateSharedLinkOnFolder method
- optionalsInput `UpdateSharedLinkOnFolderOptionalsInput`

### Returns

This function returns a value of type `FolderFull`.

Returns a basic representation of the folder, with the updated shared
link attached.

## Remove shared link from folder

Removes a shared link from a folder.

This operation is performed by calling function `removeSharedLinkFromFolder`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-folders-id--remove-shared-link/).

<!-- sample put_folders_id#remove_shared_link -->

```ts
await client.sharedLinksFolders.removeSharedLinkFromFolder(
  folder.id,
  { sharedLink: createNull() } satisfies RemoveSharedLinkFromFolderRequestBody,
  { fields: 'shared_link' } satisfies RemoveSharedLinkFromFolderQueryParams,
);
```

### Arguments

- folderId `string`
  - The unique identifier that represent a folder. The ID for any folder can be determined by visiting this folder in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/folder/123` the `folder_id` is `123`. The root folder of a Box account is always represented by the ID `0`. Example: "12345"
- requestBody `RemoveSharedLinkFromFolderRequestBody`
  - Request body of removeSharedLinkFromFolder method
- queryParams `RemoveSharedLinkFromFolderQueryParams`
  - Query parameters of removeSharedLinkFromFolder method
- optionalsInput `RemoveSharedLinkFromFolderOptionalsInput`

### Returns

This function returns a value of type `FolderFull`.

Returns a basic representation of a folder, with the shared link removed.

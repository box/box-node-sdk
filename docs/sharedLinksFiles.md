# SharedLinksFilesManager

- [Find file for shared link](#find-file-for-shared-link)
- [Get shared link for file](#get-shared-link-for-file)
- [Add shared link to file](#add-shared-link-to-file)
- [Update shared link on file](#update-shared-link-on-file)
- [Remove shared link from file](#remove-shared-link-from-file)

## Find file for shared link

Returns the file represented by a shared link.

A shared file can be represented by a shared link,
which can originate within the current enterprise or within another.

This endpoint allows an application to retrieve information about a
shared file when only given a shared link.

The `shared_link_permission_options` array field can be returned
by requesting it in the `fields` query parameter.

This operation is performed by calling function `findFileForSharedLink`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-shared-items/).

<!-- sample get_shared_items -->

```ts
await userClient.sharedLinksFiles.findFileForSharedLink(
  {} satisfies FindFileForSharedLinkQueryParams,
  {
    boxapi: ''.concat(
      'shared_link=',
      fileFromApi.sharedLink!.url,
      '&shared_link_password=Secret123@',
    ) as string,
  } satisfies FindFileForSharedLinkHeadersInput,
);
```

### Arguments

- queryParams `FindFileForSharedLinkQueryParams`
  - Query parameters of findFileForSharedLink method
- headersInput `FindFileForSharedLinkHeadersInput`
  - Headers of findFileForSharedLink method
- optionalsInput `FindFileForSharedLinkOptionalsInput`

### Returns

This function returns a value of type `FileFull`.

Returns a full file resource if the shared link is valid and
the user has access to it.

## Get shared link for file

Gets the information for a shared link on a file.

This operation is performed by calling function `getSharedLinkForFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-files-id--get-shared-link/).

<!-- sample get_files_id#get_shared_link -->

```ts
await client.sharedLinksFiles.getSharedLinkForFile(fileId, {
  fields: 'shared_link',
} satisfies GetSharedLinkForFileQueryParams);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- queryParams `GetSharedLinkForFileQueryParams`
  - Query parameters of getSharedLinkForFile method
- optionalsInput `GetSharedLinkForFileOptionalsInput`

### Returns

This function returns a value of type `FileFull`.

Returns the base representation of a file with the
additional shared link information.

## Add shared link to file

Adds a shared link to a file.

This operation is performed by calling function `addShareLinkToFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-files-id--add-shared-link/).

<!-- sample put_files_id#add_shared_link -->

```ts
await client.sharedLinksFiles.addShareLinkToFile(
  fileId,
  {
    sharedLink: {
      access: 'open' as AddShareLinkToFileRequestBodySharedLinkAccessField,
      password: 'Secret123@',
    } satisfies AddShareLinkToFileRequestBodySharedLinkField,
  } satisfies AddShareLinkToFileRequestBody,
  { fields: 'shared_link' } satisfies AddShareLinkToFileQueryParams,
);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- requestBody `AddShareLinkToFileRequestBody`
  - Request body of addShareLinkToFile method
- queryParams `AddShareLinkToFileQueryParams`
  - Query parameters of addShareLinkToFile method
- optionalsInput `AddShareLinkToFileOptionalsInput`

### Returns

This function returns a value of type `FileFull`.

Returns the base representation of a file with a new shared
link attached.

## Update shared link on file

Updates a shared link on a file.

This operation is performed by calling function `updateSharedLinkOnFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-files-id--update-shared-link/).

<!-- sample put_files_id#update_shared_link -->

```ts
await client.sharedLinksFiles.updateSharedLinkOnFile(
  fileId,
  {
    sharedLink: {
      access:
        'collaborators' as UpdateSharedLinkOnFileRequestBodySharedLinkAccessField,
    } satisfies UpdateSharedLinkOnFileRequestBodySharedLinkField,
  } satisfies UpdateSharedLinkOnFileRequestBody,
  { fields: 'shared_link' } satisfies UpdateSharedLinkOnFileQueryParams,
);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- requestBody `UpdateSharedLinkOnFileRequestBody`
  - Request body of updateSharedLinkOnFile method
- queryParams `UpdateSharedLinkOnFileQueryParams`
  - Query parameters of updateSharedLinkOnFile method
- optionalsInput `UpdateSharedLinkOnFileOptionalsInput`

### Returns

This function returns a value of type `FileFull`.

Returns a basic representation of the file, with the updated shared
link attached.

## Remove shared link from file

Removes a shared link from a file.

This operation is performed by calling function `removeSharedLinkFromFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-files-id--remove-shared-link/).

<!-- sample put_files_id#remove_shared_link -->

```ts
await client.sharedLinksFiles.removeSharedLinkFromFile(
  fileId,
  { sharedLink: createNull() } satisfies RemoveSharedLinkFromFileRequestBody,
  { fields: 'shared_link' } satisfies RemoveSharedLinkFromFileQueryParams,
);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- requestBody `RemoveSharedLinkFromFileRequestBody`
  - Request body of removeSharedLinkFromFile method
- queryParams `RemoveSharedLinkFromFileQueryParams`
  - Query parameters of removeSharedLinkFromFile method
- optionalsInput `RemoveSharedLinkFromFileOptionalsInput`

### Returns

This function returns a value of type `FileFull`.

Returns a basic representation of a file, with the shared link removed.

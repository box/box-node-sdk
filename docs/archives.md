# ArchivesManager

- [List archives](#list-archives)
- [Create archive](#create-archive)
- [Delete archive](#delete-archive)

## List archives

Retrieves archives for an enterprise.

This operation is performed by calling function `getArchivesV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-archives/).

<!-- sample get_archives_v2025.0 -->

```ts
await client.archives.getArchivesV2025R0({
  limit: 100,
} satisfies GetArchivesV2025R0QueryParams);
```

### Arguments

- queryParams `GetArchivesV2025R0QueryParams`
  - Query parameters of getArchivesV2025R0 method
- headersInput `GetArchivesV2025R0HeadersInput`
  - Headers of getArchivesV2025R0 method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `ArchivesV2025R0`.

Returns a list of archives in the enterprise.

## Create archive

Creates an archive.

This operation is performed by calling function `createArchiveV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/post-archives/).

<!-- sample post_archives_v2025.0 -->

```ts
await client.archives.createArchiveV2025R0({
  name: archiveName,
} satisfies CreateArchiveV2025R0RequestBody);
```

### Arguments

- requestBody `CreateArchiveV2025R0RequestBody`
  - Request body of createArchiveV2025R0 method
- optionalsInput `CreateArchiveV2025R0OptionalsInput`

### Returns

This function returns a value of type `ArchiveV2025R0`.

Returns a new archive object.

## Delete archive

Permanently deletes an archive.

This operation is performed by calling function `deleteArchiveByIdV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/delete-archives-id/).

<!-- sample delete_archives_id_v2025.0 -->

```ts
await client.archives.deleteArchiveByIdV2025R0(archive.id);
```

### Arguments

- archiveId `string`
  - The ID of the archive. Example: "982312"
- optionalsInput `DeleteArchiveByIdV2025R0OptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the archive has been deleted.

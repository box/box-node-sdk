# FolderLocksManager

- [List folder locks](#list-folder-locks)
- [Create folder lock](#create-folder-lock)
- [Delete folder lock](#delete-folder-lock)

## List folder locks

Retrieves folder lock details for a given folder.

You must be authenticated as the owner or co-owner of the folder to
use this endpoint.

This operation is performed by calling function `getFolderLocks`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-folder-locks/).

<!-- sample get_folder_locks -->

```ts
await client.folderLocks.getFolderLocks({
  folderId: folder.id,
} satisfies GetFolderLocksQueryParams);
```

### Arguments

- queryParams `GetFolderLocksQueryParams`
  - Query parameters of getFolderLocks method
- optionalsInput `GetFolderLocksOptionalsInput`

### Returns

This function returns a value of type `FolderLocks`.

Returns details for all folder locks applied to the folder, including the
lock type and user that applied the lock.

## Create folder lock

Creates a folder lock on a folder, preventing it from being moved and/or
deleted.

You must be authenticated as the owner or co-owner of the folder to
use this endpoint.

This operation is performed by calling function `createFolderLock`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-folder-locks/).

<!-- sample post_folder_locks -->

```ts
await client.folderLocks.createFolderLock({
  folder: {
    id: folder.id,
    type: 'folder',
  } satisfies CreateFolderLockRequestBodyFolderField,
  lockedOperations: {
    move: true,
    delete: true,
  } satisfies CreateFolderLockRequestBodyLockedOperationsField,
} satisfies CreateFolderLockRequestBody);
```

### Arguments

- requestBody `CreateFolderLockRequestBody`
  - Request body of createFolderLock method
- optionalsInput `CreateFolderLockOptionalsInput`

### Returns

This function returns a value of type `FolderLock`.

Returns the instance of the folder lock that was applied to the folder,
including the user that applied the lock and the operations set.

## Delete folder lock

Deletes a folder lock on a given folder.

You must be authenticated as the owner or co-owner of the folder to
use this endpoint.

This operation is performed by calling function `deleteFolderLockById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-folder-locks-id/).

<!-- sample delete_folder_locks_id -->

```ts
await client.folderLocks.deleteFolderLockById(folderLock.id!);
```

### Arguments

- folderLockId `string`
  - The ID of the folder lock. Example: "12345"
- optionalsInput `DeleteFolderLockByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the folder lock is successfully deleted.

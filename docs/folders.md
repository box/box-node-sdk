Folders
=======

Folder objects represent a folder from a user's account. They can be used to
iterate through a folder's contents, collaborate a folder with another user or
group, and perform other common folder operations (move, copy, delete, etc.).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Folders](#folders)
  - [Get a Folder's Information](#get-a-folders-information)
  - [Get a Folder's Items](#get-a-folders-items)
  - [Update a Folder's Information](#update-a-folders-information)
  - [Create a Folder](#create-a-folder)
  - [Copy a Folder](#copy-a-folder)
  - [Move a Folder](#move-a-folder)
  - [Rename a Folder](#rename-a-folder)
  - [Delete a Folder](#delete-a-folder)
  - [Lock a folder](#lock)
  - [Get All Locks on a Folder](#get-all-locks)
  - [Delete a Lock on a Folder](#delete-lock)
  - [Find a Folder for a Shared Link](#find-a-folder-for-a-shared-link)
  - [Create a Shared Link](#create-a-shared-link)
  - [Update a Shared Link](#update-a-shared-link)
  - [Get a Shared Link](#get-a-shared-link)
  - [Remove a Shared Link](#remove-a-shared-link)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get a Folder's Information
--------------------------

Folder information can be retrieved by calling the
[`folders.get(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#get)
method. Use the `fields` option to specify the desired fields. 

<!-- sample get_folders_id -->
```js
client.folders.get('11111')
    .then(folder => {
        /* folder -> {
            type: 'folder',
            id: '11111',
            sequence_id: '1',
            etag: '1',
            name: 'Pictures',
            created_at: '2012-12-12T10:53:43-08:00',
            modified_at: '2012-12-12T11:15:04-08:00',
            description: 'Some pictures I took',
            size: 629644,
            path_collection: 
            { total_count: 1,
                entries: 
                [ { type: 'folder',
                    id: '0',
                    sequence_id: null,
                    etag: null,
                    name: 'All Files' } ] },
            created_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User'
                login: 'user@example.com' },
            modified_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            owned_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            shared_link: null,
            parent: 
            { type: 'folder',
                id: '0',
                sequence_id: null,
                etag: null,
                name: 'All Files' },
            item_status: 'active',
            item_collection: 
            { total_count: 1,
                entries: 
                [ { type: 'file',
                    id: '33333',
                    sequence_id: '3',
                    etag: '3',
                    sha1: '134b65991ed521fcfe4724b7d814ab8ded5185dc',
                    name: 'tigers.jpeg' } ],
                offset: 0,
                limit: 100 } }
        */
    });
```

Requesting
information for only the fields you need can improve performance and reduce the
size of the network request.

<!-- sample get_folders_id with_fields -->
```js
client.folders.get(
    '12345',
    { fields: 'name,shared_link,permissions,collections,sync_state' }
).then(folder => {
    // ...
});
```

The user's root folder can be accessed by calling the
[`folders.get(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#get)
method with the `folderID` value of `'0'`.

<!-- sample get_folders_id for_root_folder -->
```js
client.folders.get('0')
    .then(rootFolder => {
        // ...
    });
```

Get a Folder's Items
--------------------

Folder items can be retrieved by calling the
[`folders.getItems(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getItems)
method. This method supports offset-based pagination and marker-based pagination. To use offset-based pagination, do not pass in the `usemarker` parameter or set it to `false`. To use marker-based pagination, pass in the `usemarker` parameter as `true`. Use the `fields` option to specify the desired fields, and `limit` and (`offset` or `marker`) to control result set paging. Requesting information for only the fields you need can improve performance by reducing the size of the network response.

<!-- sample get_folders_id_items -->
```js
client.folders.getItems(
    '12345',
    {
        usemarker: 'false',
        fields: 'name',
        offset: 0,
        limit: 25
    })
    .then(items => {
        /* items -> {
            total_count: 2,
            entries: 
            [ { type: 'folder',
                id: '11111',
                sequence_id: '1',
                etag: '1',
                name: 'Personal Documents' },
                { type: 'file',
                id: '22222',
                sequence_id: '0',
                etag: '0',
                name: 'Q2 Strategy.pptx' } ],
            offset: 0,
            limit: 25,
            order: 
            [ { by: 'type', direction: 'ASC' },
                { by: 'name', direction: 'ASC' } ] }
        */
    });
```

Update a Folder's Information
-----------------------------

Updating a folder's information is done by calling the 
[`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#update)
method. Use the `updates` parameter to specify the fields to update and their new values.

<!-- sample put_folders_id -->
```js
client.folders.update('11111', {name: 'Pictures from 2017'})
    .then(updatedFolder => {
        /* updatedFolder -> {
            type: 'folder',
            id: '11111',
            sequence_id: '1',
            etag: '1',
            name: 'Pictures from 2017',
            created_at: '2012-12-12T10:53:43-08:00',
            modified_at: '2012-12-12T11:15:04-08:00',
            description: 'Some pictures I took',
            size: 629644,
            path_collection: 
            { total_count: 1,
                entries: 
                [ { type: 'folder',
                    id: '0',
                    sequence_id: null,
                    etag: null,
                    name: 'All Files' } ] },
            created_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User'
                login: 'user@example.com' },
            modified_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            owned_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            shared_link: null,
            parent: 
            { type: 'folder',
                id: '0',
                sequence_id: null,
                etag: null,
                name: 'All Files' },
            item_status: 'active',
            item_collection: 
            { total_count: 1,
                entries: 
                [ { type: 'file',
                    id: '33333',
                    sequence_id: '3',
                    etag: '3',
                    sha1: '134b65991ed521fcfe4724b7d814ab8ded5185dc',
                    name: 'tigers.jpeg' } ],
                offset: 0,
                limit: 100 } }
        */
    });
```

If you want to ensure that your update does not overwrite any other updates (i.e. to prevent against possible race
conditions), you can pass the last known value of the folder's `etag` field via the `etag` option; this will generate
an error if the folder was modified between when you read that `etag` value and when your updates are processed by the
API.

<!-- sample put_folders_id with_etag -->
```js
client.folders.update('22222', { name: 'Renamed Folder', etag: '5', fields: 'name' })
	.then(updatedFolder => {
        /* updatedFolder -> {
            type: 'folder',
            id: '22222',
            sequence_id: '1',
            etag: '6',
            name: 'Renamed Folder' }
        */
	})
	.catch(err => {
		if (err.statusCode === 412) {
			// Precondition failed — the folder was modified before the update was processed
			// Read the folder again to ensure it is safe to update and then retry
		}
	});
```

Create a Folder
---------------

Create a child folder by calling the [`folders.create(parentFolderID, newFolderName, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#create) method.

<!-- sample post_folders -->
```js
client.folders.create('0', 'New Folder')
    .then(folder => {
        /* folder -> {
            type: 'folder',
            id: '123456',
            sequence_id: '0',
            etag: '0',
            name: 'New Folder',
            created_at: '2012-12-12T10:53:43-08:00',
            modified_at: '2012-12-12T11:15:04-08:00',
            description: '',
            size: 0,
            path_collection: 
            { total_count: 1,
                entries: 
                [ { type: 'folder',
                    id: '0',
                    sequence_id: null,
                    etag: null,
                    name: 'All Files' } ] },
            created_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User'
                login: 'user@example.com' },
            modified_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            owned_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            shared_link: null,
            parent: 
            { type: 'folder',
                id: '0',
                sequence_id: null,
                etag: null,
                name: 'All Files' },
            item_status: 'active',
            item_collection: 
            { total_count: 0,
                entries: [],
                offset: 0,
                limit: 100 } }
        */
    });
```


Copy a Folder
-------------

Call the
[`folders.copy(sourceFolderID, destinationFolderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#copy)
method to copy a folder into another folder.

<!-- sample post_folders_id_copy -->
```js
client.folders.copy('11111', '22222')
    .then(folderCopy => {
       /* folderCopy -> {
            type: 'folder',
            id: '1234567',
            sequence_id: '0',
            etag: '0',
            name: 'Pictures from 2017',
            created_at: '2012-12-12T10:53:43-08:00',
            modified_at: '2012-12-12T11:15:04-08:00',
            description: 'Some pictures I took',
            size: 629644,
            path_collection: 
            { total_count: 1,
                entries: 
                [ { type: 'folder',
                    id: '0',
                    sequence_id: null,
                    etag: null,
                    name: 'All Files' },
                  { type: 'folder',
                    id: '22222',
                    sequence_id: '3',
                    etag: '3',
                    name: 'Archives' } ] },
            created_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User'
                login: 'user@example.com' },
            modified_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            owned_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            shared_link: null,
            parent: 
            { type: 'folder',
                id: '22222',
                sequence_id: '3',
                etag: '3',
                name: 'Archives' },
            item_status: 'active',
            item_collection: 
            { total_count: 1,
                entries: 
                [ { type: 'file',
                    id: '44444',
                    sequence_id: '0',
                    etag: '0',
                    sha1: '134b65991ed521fcfe4724b7d814ab8ded5185dc',
                    name: 'tigers.jpeg' } ],
                offset: 0,
                limit: 100 } }
        */
    });
```

An optional `name` parameter can also be passed to rename the folder on copy.  This can be
used to avoid a name conflict when there is already an item with the same name in the
target folder.

<!-- sample post_folders_id_copy with_name -->
```js
client.folders.copy('12345', '0', {name: 'Renamed folder'})
    .then(folderCopy => {
        // ...
    });
```

Move a Folder
-------------

Call the [`folders.move(sourceFolderID, destinationFolderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#move) method with the destination you want the folder moved to.

<!-- sample put_folders_id move -->
```js
var folderID = '11111';
var destinationFolderID = '22222';
client.folders.move(folderID, destinationfolderID)
    .then(folder => {
       /* folder -> {
            type: 'folder',
            id: '11111',
            sequence_id: '1',
            etag: '1',
            name: 'Pictures from 2017',
            created_at: '2012-12-12T10:53:43-08:00',
            modified_at: '2012-12-12T11:15:04-08:00',
            description: 'Some pictures I took',
            size: 629644,
            path_collection: 
            { total_count: 1,
                entries: 
                [ { type: 'folder',
                    id: '0',
                    sequence_id: null,
                    etag: null,
                    name: 'All Files' },
                  { type: 'folder',
                    id: '22222',
                    sequence_id: '3',
                    etag: '3',
                    name: 'Archives' } ] },
            created_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User'
                login: 'user@example.com' },
            modified_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            owned_by: 
            { type: 'user',
                id: '22222',
                name: 'Example User',
                login: 'user@example.com' },
            shared_link: null,
            parent: 
            { type: 'folder',
                id: '22222',
                sequence_id: '3',
                etag: '3',
                name: 'Archives' },
            item_status: 'active',
            item_collection: 
            { total_count: 1,
                entries: 
                [ { type: 'file',
                    id: '33333',
                    sequence_id: '3',
                    etag: '3',
                    sha1: '134b65991ed521fcfe4724b7d814ab8ded5185dc',
                    name: 'tigers.jpeg' } ],
                offset: 0,
                limit: 100 } }
        */
    });
```

Rename a Folder
---------------

Use the [`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#update) method to rename a folder by passing a new name for the folder in `updates.name`.

<!-- sample put_folders_id rename -->
```js
client.folders.update('12345', {name: 'New Name'}, callback);
```


Delete a Folder
---------------

A folder can be deleted with the [`folders.delete(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#delete) method.

<!-- sample delete_folders_id -->
```js
client.folders.delete('12345', {recursive: true})
    .then(() => {
        // deletion succeeded — no value returned
    });
```

Lock a Folder
-------------

Use the [`folders.lock(folderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#lock) to lock a folder

```js
var folderID = '11111';
client.folders.lock(folderID)
    .then(folderLock => {
       /* folderLock -> {
            "id": "12345678",
            "type": "folder_lock",
            "created_at": "2020-09-14T23:12:53Z",
            "created_by": {
                "id": "11446498",
                "type": "user"
            },
            "folder": {
                "id": "12345",
                "type": "folder",
                "etag": "1",
                "name": "Contracts",
                "sequence_id": "3"
            },
            "lock_type": "freeze",
            "locked_operations": {
                "delete": true,
                "move": true
            }
        }
        */
    });
```

Get All Locks on a Folder
-------------------------

Use the [`folders.getLocks(folderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#lock) to get all locks on a folder.

```js
var folderID = '11111';
client.folders.getLocks(folderID)
    .then(folderLocks => {
       /* folderLocks -> {
            "entries": [
                {
                    "folder": {
                        "id": "12345",
                        "etag": "1",
                        "type": "folder",
                        "sequence_id": "3",
                        "name": "Contracts"
                    },
                    "id": "12345678",
                    "type": "folder_lock",
                    "created_by": {
                        "id": "11446498",
                        "type": "user"
                    },
                    "created_at": "2020-09-14T23:12:53Z",
                    "locked_operations": {
                        "move": true,
                        "delete": true
                    },
                    "lock_type": "freeze"
                }
            ],
            "limit": 1000,
            "next_marker": null
        }
        */
    });
```

Delete a Lock on a Folder
-------------------------

Use the [`folders.deleteLock(folderLockID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#deleteLock) method to delete a folder lock.

```js
var folderLockID = '12345';
client.folders.deleteLock(folderLockID)
    .then(() => {
        // deletion succeeded — no value returned
    });
```

Find a Folder for a Shared Link
-----------------------------

To find a folder given a shared link, use the
[`sharedItems.get(url, password, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/SharedItems.html#get)
method.

<!-- sample get_shared_items folders -->
```js
client.sharedItems.get(
  'https://app.box.com/s/gjasdasjhasd',
  'letmein'
),then(folder => {
  //...
});
```

Create a Shared Link
--------------------

You can create a shared link for a folder by calling the
[`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#update)
method, passing a new `shared_link` value in the `updates` parameter.

<!-- sample put_files_id add_shared_link -->
```js
client.folders.update('12345', {
  shared_link: {
    access: client.accessLevels.OPEN,
    permissions: {
      can_download: false
    }
  }
}).then(folder => {
  // ...
})
```

A set of shared link access level constants are available through the SDK for convenience:

* `accessLevels.OPEN`
* `accessLevels.COLLABORATORS`
* `accessLevels.COMPANY`
* `accessLevels.DEFAULT`
* `accessLevels.DISABLED`

Update a Shared Link
--------------------

You can update a shared link for a folder by calling the
[`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#update)
method, passing a new `shared_link` value in the `updates` parameter.

<!-- sample put_files_id add_shared_link -->
```js
client.folders.update('12345', {
  shared_link: {
    access: client.accessLevels.COMPANY,
    permissions: {
      can_download: true
    }
  }
}).then(folder => {
  // ...
})
```

Get a Shared Link
--------------------

To check for an existing shared link on a folder, inspect the
`shared_link` field on a folder object.

This object, when present, contains a `unicode` string containing the shared
link URL.

<!-- sample get_folders_id get_shared_link -->
```js
client.folders.get('11111', { fields: 'shared_link' })
  .then(folder => {
    let url = folder.shared_link.download_url
    //...
  })
```

Remove a Shared Link
--------------------

A shared link for a folder can be removed calling
[`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#update)
with `null` for the `shared_link` value.

<!-- sample put_folders_id remove_shared_link -->
```js
client.folders.update('12345', {
  shared_link: null
}).then(folder => {
  // ...
})
```

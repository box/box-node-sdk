Folders
=======

Folder objects represent a folder from a user's account. They can be used to
iterate through a folder's contents, collaborate a folder with another user or
group, and perform other common folder operations (move, copy, delete, etc.).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get a Folder's Information](#get-a-folders-information)
- [Get a Folder's Items](#get-a-folders-items)
- [Update a Folder's Information](#update-a-folders-information)
- [Create a Folder](#create-a-folder)
- [Copy a Folder](#copy-a-folder)
- [Move a Folder](#move-a-folder)
- [Rename a Folder](#rename-a-folder)
- [Delete a Folder](#delete-a-folder)
- [Create a Shared Link for a Folder](#create-a-shared-link-for-a-folder)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get a Folder's Information
--------------------------

Folder information can be retrieved by calling the
[`folders.get(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#get)
method. Use the `fields` option to specify the desired fields. Requesting
information for only the fields you need can improve performance and reduce the
size of the network request.

```js
client.folders.get(
    '12345',
    {fields: 'name,shared_link,permissions,collections,sync_state'},
    callback
);
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

The user's root folder can be accessed by calling the
[`folders.get(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#get)
method with the `folderID` value of `'0'`.

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
method. Use the `fields` option to specify the desired fields, and `limit` and `offset` to control result set paging.
Requesting information for only the fields you need can improve performance and reduce the size of the network request.

```js
client.folders.getItems(
    '12345',
    {
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

```js
client.folders.update('22222', { name: 'Renamed Folder', etag: '5', fields: 'name })
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

```js
client.folders.copy('12345', '0', {name: 'Renamed folder'})
    .then(folderCopy => {
        // ...
    });
```

Move a Folder
-------------

Call the [`folders.move(sourceFolderID, destinationFolderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#move) method with the destination you want the folder moved to.

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

```js
client.folders.update('12345', {name: 'New Name'}, callback);
```


Delete a Folder
---------------

A folder can be deleted with the [`folders.delete(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#delete) method.

```js
client.folders.delete('12345', {recursive: true})
    .then(() => {
        // deletion succeeded — no value returned
    });
```

Create a Shared Link for a Folder
---------------------------------

You can create a shared link for a folder by calling the
[`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#update)
method, passing a new `shared_link` value in the `updates` parameter.

```js
client.folders.update('12345', {shared_link: client.accessLevels.OPEN})
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
            shared_link: {
                url: 'https://app.box.com/s/31uw1b0dxr2swzbv1qu8d4ixz1v727dl',
                download_url: null,
                vanity_url: null,
                effective_access: 'open',
                is_password_enabled: false,
                unshared_at: null,
                download_count: 0,
                preview_count: 0,
                access: 'open',
                permissions: {
                    can_download: true,
                    can_preview: true
                },
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

A set of shared link access level constants are available through the SDK for convenience:
* accessLevels.OPEN
* accessLevels.COLLABORATORS
* accessLevels.COMPANY
* accessLevels.DEFAULT
* accessLevels.DISABLED

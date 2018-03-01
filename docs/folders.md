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
```

The user's root folder can be accessed by calling the
[`folders.get(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#get)
method with the `folderID` value of 0.

```js
client.folders.get(
    '0',
    {fields: 'name,shared_link,permissions,collections,sync_state'},
    callback
);
```

Get a Folder's Items
--------------------

Folder items can be retrieved by calling the
[`folders.getItems(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getItems)
method. Use the `fields` option to specify the desired fields and control the result set paging.
Requesting information for only the fields you need can improve performance and reduce the size of the network request.

```js
client.folders.getItems(
    '12345',
    {
        fields: 'name,modified_at,size,url,permissions,sync_state',
        offset: 0,
        limit: 25
    },
    callback
);
```

Update a Folder's Information
-----------------------------

Updating a folder's information is done by calling the 
[`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#update)
method. Use the `updates` parameter to specify the fields to update and their new values.

```js
client.folders.update('12345', {sync_state: 'synced'}, callback);
```


Create a Folder
---------------

Create a child folder by calling the [`folders.create(parentFolderID, newFolderName, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#create) method.

```js
client.folders.create('12345', 'New Folder', callback);
```


Copy a Folder
-------------

Call the [`folders.copy(sourceFolderID, destinationFolderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#create) method to copy a folder to another folder.

```js
client.folders.copy('12345', '67890', callback);
```

An optional `name` parameter can also be passed to rename the folder on copy.  This can be
used to avoid a name conflict when there is already an item with the same name in the
target folder.

```js
client.folders.copy('12345', '0', {name: 'Renamed folder'}, callback);
```

Move a Folder
-------------

Call the [`folders.move(sourceFolderID, destinationFolderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#move) method with the destination you want the folder moved to.

```js
client.folders.move('12345', '67890', callback);
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
client.folders.delete('12345', {recursive: true}, callback);
```

Create a Shared Link for a Folder
---------------------------------

You can create a shared link for a folder by calling the
[`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#update) method, passing a new `shared_link` value in the `updates` parameter.

```js
client.folders.update(
    '12345',
    {shared_link: client.accessLevels.OPEN},
    callback
);
```

A set of shared link access level constants are available through the SDK for convenience:
* accessLevels.OPEN
* accessLevels.COLLABORATORS
* accessLevels.COMPANY
* accessLevels.DEFAULT
* accessLevels.DISABLED

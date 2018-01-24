Folders
=======

Folder objects represent a folder from a user's account. They can be used to
iterate through a folder's contents, collaborate a folder with another user or
group, and perform other common folder operations (move, copy, delete, etc.).

* [Get a Folder's Information](#get-a-folders-information)
* [Get a Folder's Items](#get-a-folders-items)
* [Update a Folder's Information](#update-a-folders-information)
* [Create a Folder](#create-a-folder)
* [Copy a Folder](#copy-a-folder)
* [Move a Folder](#move-a-folder)
* [Rename a Folder](#rename-a-folder)
* [Delete a Folder](#delete-a-folder)
* [Get a Trashed Folder](#get-a-trashed-folder)
* [Restore a Folder from Trash](#restore-a-folder-from-trash)
* [Delete Permanently](#delete-permanently)
* [Create a Shared Link for a Folder](#create-a-shared-link-for-a-folder)
* [Get Collaborations for a Folder](#get-collaborations-for-a-folder)
* [Add Folder to a Collection](#add-folder-to-a-collection)
* [Remove Folder from a Collection](#remove-folder-from-a-collection)
* [Create Metadata](#create-metadata)
* [Get Metadata](#get-metadata)
* [Update Metadata](#update-metadata)
* [Delete Metadata](#delete-metadata)
* [Get Watermark](#get-watermark)
* [Apply Watermark](#apply-watermark)
* [Remove Watermark](#remove-watermark)

Get a Folder's Information
--------------------------

Folder information can be retrieved by calling the
[`folders.get(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#get)
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
[`folders.get(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#get)
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
[`folders.getItems(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#getItems)
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
[`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#update)
method. Use the `updates` parameter to specify the fields to update and their new values.

```js
client.folders.update('12345', {sync_state: 'synced'}, callback);
```


Create a Folder
---------------

Create a child folder by calling the [`folders.create(parentFolderID, newFolderName, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#create) method.

```js
client.folders.create('12345', 'New Folder', callback);
```


Copy a Folder
-------------

Call the [`folders.copy(sourceFolderID, destinationFolderID, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#create) method to copy a folder to another folder.

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

Call the [`folders.move(sourceFolderID, destinationFolderID, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#move) method with the destination you want the folder moved to.

```js
client.folders.move('12345', '67890', callback);
```


Rename a Folder
---------------

Use the [`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#update) method to rename a folder by passing a new name for the folder in `updates.name`.

```js
client.folders.update('12345', {name: 'New Name'}, callback);
```


Delete a Folder
---------------

A folder can be deleted with the [`folders.delete(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#delete) method.

```js
client.folders.delete('12345', {recursive: true}, callback);
```


Get a Trashed Folder
---------------

Information about a folder in the trash can be retrieved with the [`folders.getTrashedFolder(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#getTrashedFolder) method.

```js
client.folders.getTrashedFolder('12345', {fields: 'name,shared_link,permissions,collections,sync_state'},
, callback);
```

Restore a Folder from Trash
---------------------------

A folder can be restored from the trash with the
[`folders.restoreFromTrash(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#restoreFromTrash)
method.  Default behavior is to restore the item to the folder it was in before
it was moved to the trash.  Options are available to handle possible failure
cases: if an item with the same name already exists in folder's old location, the
restored folder can be given an alternate name with the `name` option.  If the
folder's old location no longer exists, it can be placed inside a new parent
folder with the `parent_id` option.

```js
client.folders.restoreFromTrash(
	'12345',
	{
		name: 'New Name',
		parent_id: '0'
	},
	callback
);
```

Delete Permanently
---------------
A folder can be removed permanently from trash by calling
[`folders.deletePermanently(folderID, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#deletePermanently).

```js
client.folders.deletePermanently('12345', callback);
```


Create a Shared Link for a Folder
---------------------------------

You can create a shared link for a folder by calling the
[`folders.update(folderID, updates, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#update) method, passing a new `shared_link` value in the `updates` parameter.

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


Get Collaborations for a Folder
-----------------------------------

The [`folders.getCollaborations(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#getCollaborations) method will return a collection of collaboration objects for a folder. Use the `options` parameter to specify the desired collaboration fields and control the result set paging.

```js
client.folders.getCollaborations(
    '12345',
    {
        fields: 'accessible_by,role',
        offset: 0,
        limit: 25
    },
    callback
);
```

All collaborations can be returned by passing `null` for the `options` parameter.

```js
client.folders.getCollaborations('12345', null, callback);
```

Add Folder to a Collection
--------------------------

To add a folder to a collection, call the
[`folders.addToCollection(folderID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#addToCollection)
method with the IDs of the folder and collection.

```js
client.folders.addToCollection('87263', '235747', callback);
```

Remove Folder from a Collection
-------------------------------

To remove a folder from a collection, call the
[`folders.removeFromCollection(folderID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#removeFromCollection)
method with the IDs of the folder and collection.

```js
client.folders.removeFromCollection('87263', '235747', callback);
```

Create Metadata
---------------

Metadata can be created on a folder by calling
[`folders.addMetadata(folderID, scope, template, metadata, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#addMetadata)
with a metadata template and an object of key/value pairs to add as metadata.

```js
var metadata = {foo: 'bar'};
client.folders.addMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, metadata, callback);
```

Get Metadata
------------

Retrieve a folder's metadata by calling
[`folders.getAllMetadata(folderID, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#getAllMetadata),
to retrieve all metadata, or
[`folders.getMetadata(folderID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#getMetadata)
to retrieve a single template.

```js
client.folders.getMetadata('67890', client.metadata.scopes.ENTERPRISE, 'productSpec', callback);
```

Update Metadata
---------------

Update a folder's metadata by calling
[`folders.updateMetadata(folderID, scope, template, patch, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#updateMetadata)
with an array of [JSON Patch](http://jsonpatch.com/) formatted operations.

```js
var patch = [{
	op: 'add',
	path: '/baz',
	value: 'quux'
}];
client.folders.updateMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, patch, callback);
```

Delete Metadata
---------------

A folder's metadata can be removed by calling
[`folders.deleteMetadata(folderID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#deleteMetadata).

```js
client.folders.deleteMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, callback);
```

Get Watermark
-------------
To get watermark information for a folder call the
[`folders.getWatermark(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#getWatermark)
method.

```js
client.folders.getWatermark('75937', null, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
// Only get information about a few specific fields.
client.folders.getWatermark('75937', {fields: 'created_at'}, callback);
```

Apply Watermark
---------------

To apply or update the watermark for a folder call the
[`folders.applyWatermark(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/Folders.html#applyWatermark)
method.

```js
client.folders.applyWatermark('67890', null, callback);
```

Remove Watermark
----------------

A folder's watermark can be removed by calling
[`folders.removeWatermark(folderID, callback)`](http://opensource.box.com/box-node-sdk/Folder.html#removeWatermark).

```js
client.folders.removeWatermark('67890', callback);
```

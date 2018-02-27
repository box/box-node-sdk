Trash
=====

Under normal circumstances, when an item in Box is deleted, it is not actually
erased immediately.  Instead, it is moved to the Trash.  The Trash allows you to
recover files and folders that have been deleted. By default, items in the Trash
will be purged after 30 days.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get Trashed Items](#get-trashed-items)
- [Restore a File From Trash](#restore-a-file-from-trash)
- [Delete a File from the Trash](#delete-a-file-from-the-trash)
- [Get a Trashed File](#get-a-trashed-file)
- [Get a Trashed Folder](#get-a-trashed-folder)
- [Restore a Folder from Trash](#restore-a-folder-from-trash)
- [Delete a Folder from the Trash](#delete-a-folder-from-the-trash)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get Trashed Items
-----------------

To retrieve files and folders that have been moved to the Trash, call the
[`trash.get(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Trash.html#get)
method.

```js
client.trash.get({fields: 'name,id'}, callback);
```

Restore a File From Trash
-------------------------

Calling the
[`files.restoreFromTrash(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#restoreFromTrash)
will restore an item from the user's trash.  Default behavior is to restore the item
to the folder it was in before it was moved to the trash. Options are available
to handle possible failure cases: if an item with the same name already exists in
folder's old location, the restored folder can be given an alternate name with
the `name` option.  If the folder's old location no longer exists, it can be
placed inside a new parent folder with the `parent_id` option.

```js
client.files.restoreFromTrash(
		'12345',
		{
			name: 'New Name',
			parent_id: 0
		},
		callback
	);
```

Delete a File from the Trash
----------------------------

Calling the
[`files.deletePermanently(fileID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#deletePermanently)
method will remove the file permanently from the user's trash.

```js
client.files.deletePermanently('12345', callback);
```

Get a Trashed File
------------------

Information about a file in the trash can be retrieved with the [`files.getTrashedFile(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getTrashedFile) method.
```js
client.files.getTrashedFile('12345', {}, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
// Only get information about a few specific fields.
client.files.getTrashedFile('12345', {fields: 'size,owned_by'}, callback);
```

Get a Trashed Folder
--------------------

Information about a folder in the trash can be retrieved with the [`folders.getTrashedFolder(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getTrashedFolder) method.

```js
client.folders.getTrashedFolder('12345', {fields: 'name,shared_link,permissions,collections,sync_state'},
, callback);
```

Restore a Folder from Trash
---------------------------

A folder can be restored from the trash with the
[`folders.restoreFromTrash(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#restoreFromTrash)
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

Delete a Folder from the Trash
------------------------------
A folder can be removed permanently from trash by calling
[`folders.deletePermanently(folderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#deletePermanently).

```js
client.folders.deletePermanently('12345', callback);
```

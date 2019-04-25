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

<!-- sample get_folders_trash_items -->
```js
client.trash.get()
	.then(trashedItems => {
		/* trashedItems -> {
			total_count: 2,
			entries: 
			[ { type: 'file',
				id: '11111',
				sequence_id: '1',
				etag: '1',
				sha1: '9d976863fc849f6061ecf9736710bd9c2bce488c',
				name: 'file Tue Jul 24 145436 2012KWPX5S.csv' },
				{ type: 'file',
				id: '22222',
				sequence_id: '1',
				etag: '1',
				sha1: '09b0e2e9760caf7448c702db34ea001f356f1197',
				name: 'file Tue Jul 24 010055 20129Z6GS3.csv' } ],
			offset: 0,
			limit: 100 }
		*/
	});
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


<!-- sample post_files_id -->
```js
client.files.restoreFromTrash(
	'11111',
	{
		// New name in case of conflict
		name: 'New Name',
		// File will be placed in this folder if original location no longer exists
		parent_id: '0'
	})
	.then(restoredFile => {
		/* trashedFile -> {
			type: 'file',
			id: '11111',
			sequence_id: '2',
			etag: '2',
			sha1: '4bd9e98652799fc57cf9423e13629c151152ce6c',
			name: 'Screenshot_1_30_13_6_37_PM.png',
			description: '',
			size: 163265,
			path_collection: 
			{ total_count: 1,
				entries: 
				[ { type: 'folder',
					id: '0',
					sequence_id: null,
					etag: null,
					name: 'All Files' } ] },
			created_at: '2013-01-30T18:43:56-08:00',
			modified_at: '2013-01-30T18:44:00-08:00',
			trashed_at: null,
			purged_at: null,
			content_created_at: '2013-01-30T18:43:56-08:00',
			content_modified_at: '2013-01-30T18:44:00-08:00',
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			modified_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			owned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			shared_link: null,
			parent: 
			{ type: 'folder',
				id: '0',
				sequence_id: null,
				etag: null,
				name: 'All Files' },
			item_status: 'active' }
		*/
	});
```

Delete a File from the Trash
----------------------------

Calling the
[`files.deletePermanently(fileID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#deletePermanently)
method will remove the file permanently from the user's trash.

<!-- sample delete_files_id_trash -->
```js
client.files.deletePermanently('11111')
	.then(() => {
		// deletion succeeded — no value returned
	});
```

If you want to ensure that your deletion does not overwrite any other updates (i.e. to prevent against possible race
conditions), you can pass the last known value of the file's `etag` field via the `etag` option; this will generate
an error if the file was modified between when you read that `etag` value and when the deletion is processed by the
API.

```js
client.files.deletePermanently('11111', { etag: '5' })
	.then(() => {
		// File successfully deleted
	})
	.catch(err => {
		if (err.statusCode === 412) {
			// Precondition failed — the file was modified before the deletion was processed
			// Read the file again to ensure it is safe to delete and then retry
		}
	});
```

Get a Trashed File
------------------

Information about a file in the trash can be retrieved with the [`files.getTrashedFile(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getTrashedFile) method.

<!-- sample get_files_id_trash -->
```js
client.files.getTrashedFile('11111')
	.then(trashedFile => {
		/* trashedFile -> {
			type: 'file',
			id: '11111',
			sequence_id: '2',
			etag: '2',
			sha1: '4bd9e98652799fc57cf9423e13629c151152ce6c',
			name: 'Screenshot_1_30_13_6_37_PM.png',
			description: '',
			size: 163265,
			path_collection: 
			{ total_count: 1,
				entries: 
				[ { type: 'folder',
					id: '1',
					sequence_id: null,
					etag: null,
					name: 'Trash' } ] },
			created_at: '2013-01-30T18:43:56-08:00',
			modified_at: '2013-01-30T18:44:00-08:00',
			trashed_at: '2013-02-07T10:49:34-08:00',
			purged_at: '2013-03-09T10:49:34-08:00',
			content_created_at: '2013-01-30T18:43:56-08:00',
			content_modified_at: '2013-01-30T18:44:00-08:00',
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			modified_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			owned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			shared_link: null,
			parent: 
			{ type: 'folder',
				id: '0',
				sequence_id: null,
				etag: null,
				name: 'All Files' },
			item_status: 'trashed' }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
// Only get information about a few specific fields.
client.files.getTrashedFile('11111', {fields: 'size,owned_by'})
	.then(trashedFile => {
		/* trashedFile -> { type: 'file',
			id: '11111',
			sequence_id: '2',
			etag: '2',
			sha1: '4bd9e98652799fc57cf9423e13629c151152ce6c',
			size: 163265,
			owned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' } }
		*/
	});
```

Get a Trashed Folder
--------------------

Information about a folder in the trash can be retrieved with the [`folders.getTrashedFolder(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getTrashedFolder) method.

<!-- sample get_folders_id_trash -->
```js
client.folders.getTrashedFolder('22222')
	.then(trashedFolder => {
		/* trashedFolder -> {
			type: 'folder',
			id: '22222',
			sequence_id: '1',
			etag: '1',
			name: 'Old Files',
			created_at: '2013-05-06T22:37:30-07:00',
			modified_at: '2013-05-06T22:39:08-07:00',
			description: '',
			size: 18482,
			path_collection: 
			{ total_count: 1,
				entries: 
				[ { type: 'folder',
					id: '1',
					sequence_id: null,
					etag: null,
					name: 'Trash' } ] },
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			modified_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			trashed_at: '2013-05-29T09:37:13-07:00',
			purged_at: null,
			content_created_at: '2013-05-06T22:37:30-07:00',
			content_modified_at: '2013-05-06T22:39:08-07:00',
			owned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			shared_link: null,
			folder_upload_email: null,
			parent: 
			{ type: 'folder',
				id: '0',
				sequence_id: null,
				etag: null,
				name: 'All Files' },
			item_status: 'trashed' }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.folders.getTrashedFolder('22222', {fields: 'name,trashed_at,purged_at'})
	.then(trashedFolder => {
		/* trashedFolder -> {
			type: 'folder',
			id: '22222',
			sequence_id: '1',
			etag: '1',
			trashed_at: '2013-05-29T09:37:13-07:00',
			purged_at: null }
		*/
	});
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

<!-- sample post_folders_id -->
```js
client.folders.restoreFromTrash(
	'22222',
	{
		// New name in case of conflict
		name: 'New Name',
		// Folder will be placed in this parent folder if the original parent no longer exists
		parent_id: '0'
	})
	.then(restoredFolder => {
		/* trashedFolder -> {
			type: 'folder',
			id: '22222',
			sequence_id: '1',
			etag: '1',
			name: 'Old Files',
			created_at: '2013-05-06T22:37:30-07:00',
			modified_at: '2013-05-06T22:39:08-07:00',
			description: '',
			size: 18482,
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
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			modified_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			trashed_at: null,
			purged_at: null,
			content_created_at: '2013-05-06T22:37:30-07:00',
			content_modified_at: '2013-05-06T22:39:08-07:00',
			owned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			shared_link: null,
			folder_upload_email: null,
			parent: 
			{ type: 'folder',
				id: '0',
				sequence_id: null,
				etag: null,
				name: 'All Files' },
			item_status: 'active' }
		*/
	});
```

Delete a Folder from the Trash
------------------------------
A folder can be removed permanently from trash by calling
[`folders.deletePermanently(folderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#deletePermanently).

<!-- sample delete_folders_id_trash -->
```js
client.folders.deletePermanently('22222')
	.then(() => {
		// deletion succeeded — no value returned
	});
```

If you want to ensure that your deletion does not overwrite any other updates (i.e. to prevent against possible race
conditions), you can pass the last known value of the folder's `etag` field via the `etag` option; this will generate
an error if the folder was modified between when you read that `etag` value and when the deletion is processed by the
API.

```js
client.folders.deletePermanently('22222', { etag: '5' })
	.then(() => {
		// Folder successfully deleted
	})
	.catch(err => {
		if (err.statusCode === 412) {
			// Precondition failed — the folder was modified before the deletion was processed
			// Read the folder again to ensure it is safe to delete and then retry
		}
	});
```

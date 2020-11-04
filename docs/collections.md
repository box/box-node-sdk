Collections
===========

Collections are used to store a custom user-defined set of items that may not
all be in the same folder.

Currently, the only collection available is the `favorites` collection ([source](https://box.dev/reference/resources/collection/)).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get a User's Collections](#get-a-users-collections)
- [Get the Items in a Collection](#get-the-items-in-a-collection)
- [Add File to a Collection](#add-file-to-a-collection)
- [Remove File from a Collection](#remove-file-from-a-collection)
- [Add Folder to a Collection](#add-folder-to-a-collection)
- [Remove Folder from a Collection](#remove-folder-from-a-collection)
- [Add Web Link to a Collection](#add-web-link-to-a-collection)
- [Remove Web Link from a Collection](#remove-web-link-from-a-collection)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get a User's Collections
------------------------

Get a list of all collections the user has defined by calling [`collections.getAll(callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collections.html#getAll).
A user always has a default collection called "Favorites" which they can add
items to.

<!-- sample get_collections -->
```js
client.collections.getAll()
	.then(collections => {
		/* collections -> { total_count: 1,
			entries: 
			[ { type: 'collection',
				id: '11111',
				name: 'Favorites',
				collection_type: 'favorites' } ],
			limit: 100,
			offset: 0 }
		*/
	});
```

Get the Items in a Collection
-----------------------------

Get a list of the items in a collection by passing the ID of the collection to
[`collections.getItems(collectionID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collections.html#getItems).

<!-- sample get_collections_id_items -->
```js
client.collections.getItems('81934', {fields: 'name', limit: 2})
	.then(items => {
		/* items -> { total_count: 24,
			entries: 
			[ { type: 'folder',
				id: '192429928',
				sequence_id: '1',
				etag: '1',
				name: 'Stephen Curry Three Pointers' },
				{ type: 'file',
				id: '818853862',
				sequence_id: '0',
				etag: '0',
				name: 'Warriors.jpg' } ],
			offset: 0,
			limit: 2 }
		*/
	});
```

Add File to a Collection
------------------------

To add a file to a collection, call the
[`files.addToCollection(fileID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#addToCollection)
method with the IDs of the file and collection.

<!-- sample put_files_id add_to_collection -->
```js
client.files.addToCollection('87263', '235747', callback);
```

Remove File from a Collection
-----------------------------

To remove a file from a collection, call the
[`files.removeFromCollection(fileID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#removeFromCollection)
method with the IDs of the file and collection.

<!-- sample put_files_id remove_from_collection -->
```js
client.files.removeFromCollection('87263', '235747', callback);
```

Add Folder to a Collection
--------------------------

To add a folder to a collection, call the
[`folders.addToCollection(folderID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#addToCollection)
method with the IDs of the folder and collection.

<!-- sample put_folders_id add_to_collection -->
```js
client.folders.addToCollection('87263', '235747', callback);
```

Remove Folder from a Collection
-------------------------------

To remove a folder from a collection, call the
[`folders.removeFromCollection(folderID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#removeFromCollection)
method with the IDs of the folder and collection.

<!-- sample put_folders_id remove_from_collection -->
```js
client.folders.removeFromCollection('87263', '235747', callback);
```

Add Web Link to a Collection
----------------------------

To add a web link to a collection, call the
[`weblinks.addToCollection(webLinkID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/WebLinks.html#addToCollection)
method with the IDs of the web link and collection.

<!-- sample put_web_links_id add_to_collection -->
```js
client.weblinks.addToCollection('87263', '235747', callback);
```

Remove Web Link from a Collection
---------------------------------

To remove a web link from a collection, call the
[`weblinks.removeFromCollection(webLinkID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/WebLinks.html#removeFromCollection)
method with the IDs of the web link and collection.

<!-- sample put_web_links_id remove_from_collection -->
```js
client.weblinks.removeFromCollection('87263', '235747', callback);
```

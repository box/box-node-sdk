Collections
===========

Collections are used to store a custom user-defined set of items that may not
all be in the same folder.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get a User's Collections](#get-a-users-collections)
- [Get the Items in a Collection](#get-the-items-in-a-collection)
- [Add File to a Collection](#add-file-to-a-collection)
- [Remove File from a Collection](#remove-file-from-a-collection)
- [Add Folder to a Collection](#add-folder-to-a-collection)
- [Remove Folder from a Collection](#remove-folder-from-a-collection)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get a User's Collections
------------------------

Get a list of all collections the user has defined by calling [`collections.getAll(callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collections.html#getAll).
A user always has a default collection called "Favorites" which they can add
items to.

```js
client.collections.getAll(callback);
```

Get the Items in a Collection
-----------------------------

Get a list of the items in a collection by passing the ID of the collection to
[`collections.getItems(collectionID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collections.html#getItems).

```js
client.collections.getItems('81934', {fields: 'name'}, callback);
```

Add File to a Collection
------------------------

To add a file to a collection, call the
[`files.addToCollection(fileID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#addToCollection)
method with the IDs of the file and collection.

```js
client.files.addToCollection('87263', '235747', callback);
```

Remove File from a Collection
-----------------------------

To remove a file from a collection, call the
[`files.removeFromCollection(fileID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#removeFromCollection)
method with the IDs of the file and collection.

```js
client.files.removeFromCollection('87263', '235747', callback);
```

Add Folder to a Collection
--------------------------

To add a folder to a collection, call the
[`folders.addToCollection(folderID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#addToCollection)
method with the IDs of the folder and collection.

```js
client.folders.addToCollection('87263', '235747', callback);
```

Remove Folder from a Collection
-------------------------------

To remove a folder from a collection, call the
[`folders.removeFromCollection(folderID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#removeFromCollection)
method with the IDs of the folder and collection.

```js
client.folders.removeFromCollection('87263', '235747', callback);
```

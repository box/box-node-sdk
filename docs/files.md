Files
=====

File objects represent individual files in Box. They can be used to download a
file's contents, upload new versions, and perform other common file operations
(move, copy, delete, etc.).

* [Get a File's Information](#get-a-files-information)
* [Update a File's Information](#update-a-files-information)
* [Get a File's Tasks](#get-a-files-tasks)
* [Download a File](#download-a-file)
* [Upload a File](#upload-a-file)
* [Copy a File](#copy-a-file)
* [Delete a File](#delete-a-file)
* [Delete Permanently](#delete-permanently)
* [Get a Trashed File](#get-a-trashed-file)
* [Get File Versions](#get-file-versions)
* [Upload a New Version of a File](#upload-a-new-version-of-a-file)
* [Download a Previous Version of a File](#download-a-previous-version-of-a-file)
* [Delete a Previous File Version](#delete-a-previous-file-version)
* [Create a Shared Link](#create-a-shared-link)
* [Promote Version](#promote-version)
* [Get Thumbnail](#get-thumbnail)
* [Get Embed Link](#get-embed-link)
* [Add File to a Collection](#add-file-to-a-collection)
* [Remove File from a Collection](#remove-file-from-a-collection)
* [Lock a File](#lock-a-file)
* [Unlock a File](#unlock-a-file)
* [Restore a File From Trash](#restore-a-file-from-trash)
* [Create Metadata](#create-metadata)
* [Get Metadata](#get-metadata)
* [Update Metadata](#update-metadata)
* [Delete Metadata](#delete-metadata)
* [Get Watermark](#get-watermark)

Get a File's Information
------------------------

Calling
[`files.get(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#get)
on a file returns a snapshot of the file's info.

```js
client.files.get('75937', null, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
// Only get information about a few specific fields.
client.files.get('75937', {fields: 'size,owned_by'}, callback);
```

Update a File's Information
---------------------------

Updating a file's information is done by calling
[`files.update(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#update)
with the fields to be updated.

```js
client.files.update('75937', {name : 'New Name'}, callback);
```

Get a File's Tasks
------------------
Calling the
[`files.getTasks(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getTasks)
method will retrieve all of the tasks for given file.

```js
client.files.getTasks('75937', null, callback);
```
Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
// Only get information about a few specific fields.
client.files.getTasks('75937', {fields: 'type,item'}, callback);
```

Download a File
---------------

A file can be downloaded by calling
[`files.getReadStream(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getReadStream),
which provides an instance of `stream.Readable` that will yield the file's contents.

```js
var fs = require('fs');
client.files.getReadStream('12345', null, function(error, stream) {

	if (error) {
		// handle error
	}

	// write the file to disk
	var output = fs.createWriteStream('/path/to/file');
	stream.pipe(output);
});
```

Upload a File
-------------

Files are uploaded to a folder by calling the
[`files.uploadFile(parentFolderID, filename, content, callback)`](http://opensource.box.com/box-node-sdk/Files.html#uploadFile)
method with a `stream.Readable` of the file to upload.

```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/file');
client.files.uploadFile('98768', 'New File', stream, callback);
```

A file can also be uploaded from a `Buffer`:

```js
var buffer = new Buffer(50);
client.files.uploadFile('98768', 'New File', buffer, callback);
```

Copy a File
-----------

A file can be copied to a new folder with the
[`files.copy(fileID, newParentID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#copy)
method.

```js
client.files.copy('12345', '0', callback);
```

An optional `name` parameter can also be passed to rename the file on copy.  This can be
used to avoid a name conflict when there is already an item with the same name in the
target folder.

```js
client.files.copy('12345', '0', {name: 'Renamed file.png'}, callback);
```

Delete a File
-------------

Calling the
[`files.delete(fileID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#delete)
method will move the file to the user's trash.

```js
client.files.delete('12345', callback);
```

Delete Permanently
-------------

Calling the
[`files.deletePermanently(fileID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#deletePermanently)
method will remove the file permanently from the user's trash.

```js
client.files.deletePermanently('12345', callback);
```

Get a Trashed File
------------------

Information about a file in the trash can be retrieved with the [`files.getTrashedFile(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getTrashedFile) method.
```js
client.files.getTrashedFile('12345', qs, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
// Only get information about a few specific fields.
client.files.getTrashedFile('12345', {fields: 'size,owned_by'}, callback);
```

Get File Versions
-----------------

Retrieve a list of previous versions of a file by calling the
[`files.getVersions(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getVersions).

```js
client.files.getVersions('12345', null, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
// Only get information about a few specific fields.
client.files.getVersions('12345', {fields: 'name,size,sha1'}, callback);
```

Upload a New Version of a File
------------------------------

New versions of a file can be uploaded with the
[`files.uploadNewFileVersion(fileID, content, callback)`](http://opensource.box.com/box-node-sdk/Files.html#uploadNewFileVersion) method.

```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/file');
client.files.uploadFile('98768', stream, callback);
```

Download a Previous Version of a File
-------------------------------------

For users with premium accounts, previous versions of a file can be downloaded
by calling
[`files.getReadStream(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getReadStream)
with a `version` query string parameter.

```js
var fs = require('fs');
client.files.getReadStream('12345', {version: '2'}, function(error, stream) {

	if (error) {
		// handle error
	}

	// write the file version to disk
	var output = fs.createWriteStream('/path/to/file');
	stream.pipe(output);
});
```

Delete a Previous File Version
------------------------------

An old version of a file can be moved to the trash by calling the
[`files.deleteVersion(fileID, versionID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#deleteVersion)
method.

```js
client.files.deleteVersion('12345', '98768', callback)
```

Create a Shared Link
--------------------

A shared link for a file can be generated by passing shared link parameters to
[`files.update(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#update).

```js
client.files.update('93745', {shared_link: client.accessLevels.DEFAULT}, callback)
```

Promote Version
---------------

Promote file version to the top of the stack by calling the [`files.promoteVersion(fileID, versionID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#promoteVersion) method.

```js
client.files.promoteVersion('12345', '98768', callback);
```

Get Thumbnail
-------------

A thumbnail for a file can be retrieved by calling
[`files.getThumbnail(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getThumbnail).

```js
client.files.getThumbnail('12345', null, function(error, response) {

	if (error) {
		// handle error
	}

	if (response.location) {
		// fetch thumbnail from URL
	} else if (response.file) {
		// use response.file contents as thumbnail
	} else {
		// no thumbnail available
	}
});
```

Get Embed Link
--------------

An embed link for a file can be generated by calling the
[`files.getEmbedLink(fileID,callback)`](http://opensource.box.com/box-node-sdk/Files.html#getEmbedLink)
method. Embed link is an expiring URL for embedding a Box file preview into a webpage,
usually via an `<iframe>` element.

For more information, see the [API documentation](https://docs.box.com/reference#get-embed-link).

```js
client.files.getEmbedLink('12345', callback);
```

Add File to a Collection
------------------------

To add a file to a collection, call the
[`files.addToCollection(fileID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#addToCollection)
method with the IDs of the file and collection.

```js
client.files.addToCollection('87263', '235747', callback);
```

Remove File from a Collection
-----------------------------

To remove a file from a collection, call the
[`files.removeFromCollection(fileID, collectionID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#removeFromCollection)
method with the IDs of the file and collection.

```js
client.files.removeFromCollection('87263', '235747', callback);
```

Lock a File
-----------

A file can be locked, which prevents other users from editing the file, by calling the
[`files.lock(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#lock)
method  You may optionally prevent other users from downloading the file, as well as set
an expiration time for the lock.

```js
client.files.lock(
		'12345',
		{
			expires_at: '2018-12-12T10:55:30-08:00',
			is_download_prevented: false
		},
		callback
	);
```

Unlock a File
-------------

A file can be unlocked by calling the
[`files.unlock(fileID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#unlock)
method.

```js
client.files.unlock('12345', callback);
```

Restore a File From Trash
-------------------------

Calling the
[`files.restoreFromTrash(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#restoreFromTrash)
will restore an item from the user's trash.  Default behavior is to restore the item
to the folder it was in before it was moved to the trash. If that parent folder
no longer exists or if there is now an item with the same name in that parent
folder, the new parent folder and/or new name will need to be included.

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

Create Metadata
---------------

Metadata can be created on a file by calling
[`files.addMetadata(fileID, scope, template, metadata, callback)`](http://opensource.box.com/box-node-sdk/Files.html#addMetadata)
with a metadata template and an object of key/value pairs to add as metadata.

```js
var metadata = {foo: 'bar'};
client.files.addMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, metadata, callback);
```

Get Metadata
------------

Retrieve a file's metadata by calling
[`files.getAllMetadata(fileID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getAllMetadata),
to retrieve all metadata, or
[`files.getMetadata(fileID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getMetadata)
to retrieve a single template.

```js
client.files.getMetadata('67890', client.metadata.scopes.ENTERPRISE, 'productSpec', callback);
```

Update Metadata
---------------

Update a file's metadata by calling
[`files.updateMetadata(fileID, scope, template, patch, callback)`](http://opensource.box.com/box-node-sdk/Files.html#updateMetadata)
with an array of [JSON Patch](http://jsonpatch.com/) formatted operations.

```js
var patch = [{
	op: 'add',
	path: '/baz',
	value: 'quux'
}];
client.files.updateMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, patch, callback);
```

Delete Metadata
---------------

A file's metadata can be removed by calling
[`files.deleteMetadata(fileID, scope, template, callback)`](http://opensource.box.com/box-node-sdk/Files.html#deleteMetadata).

```js
client.files.deleteMetadata('67890', client.metadata.scopes.GLOBAL, client.metadata.templates.PROPERTIES, callback);
```

Get Watermark
-------------
To get watermark information for a file call the [`files.getWatermark(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getWatermark) method.

```js
client.files.getWatermark('75937', null, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
// Only get information about a few specific fields.
client.files.getWatermark('75937', {fields: 'created_at'}, callback);
```

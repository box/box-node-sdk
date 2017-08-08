Files
=====

File objects represent individual files in Box. They can be used to download a
file's contents, upload new versions, and perform other common file operations
(move, copy, delete, etc.).

* [Get a File's Information](#get-a-files-information)
* [Update a File's Information](#update-a-files-information)
* [Get a File's Tasks](#get-a-files-tasks)
* [Download a File](#download-a-file)
* [Get a File's Download URL](#get-download-url)
* [Upload a File](#upload-a-file)
* [Upload Preflight Check](#upload-preflight-check)
* [Chunked Upload](#chunked-upload)
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
* [Apply Watermark](#apply-watermark)
* [Remove Watermark](#remove-watermark)
* [Get Representation](#get-representation)

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

Get a File's Download URL
-------------------------

The download URL of a file an be retrieved by calling
[`files.getDownloadURL(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getDownloadURL).
It returns the URL as a string.

```js
client.files.getDownloadURL('12345', null, function(error, downloadURL) {
	if (error) {
		//handle error
	}

	//process the downloadURL
}
});
```

Upload a File
-------------

The simplest way to upload a file to a folder is by calling the
[`files.uploadFile(parentFolderID, filename, content, callback)`](http://opensource.box.com/box-node-sdk/Files.html#uploadFile)
method with a `stream.Readable` or `Buffer` of the file to upload.

Stream:
```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/file');
client.files.uploadFile('98768', 'New File', stream, callback);
```

Buffer:
```js
var buffer = new Buffer(50);
client.files.uploadFile('98768', 'New File', buffer, callback);
```

Chunked Upload
--------------

For large files or in cases where the network connection is less reliable,
you may want to upload the file in parts.  This allows a single part to fail
without aborting the entire upload, and failed parts can then be retried.

### Automatic Uploader

The SDK provides a method of automatically handling a chunked upload; simply call
[`files.getChunkedUploader(folderID, size, name, file, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getChunkedUploader)
with the ID of the destination folder, the size and file name of the file to be
uploaded, and a `Buffer` or `ReadableStream` of the file to be uploaded.

```js
// Upload a 2GB file "huge.pdf" into folder 12345
var stream = fs.createReadStream('huge.pdf');
client.files.getChunkedUploader(
	'12345',
	2147483648,
	'huge.pdf',
	stream,
	null,
	function(err, uploader) {

		if (err) {
			// handle error
			return;
		}

		uploader.on('error', function(err) {
			// handle unrecoverable upload error
		});

		uploader.on('uploadComplete', function(file) {
			console.log('File upload complete!', file);
		});

		uploader.start();
	}
);
```

A new version of a file can be uploaded in the same way by calling
[`files.getNewVersionChunkedUploader(fileID, size, file, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getNewVersionChunkedUploader)
with the ID of the file to upload a new version of, along with the size of the new
version and a `Buffer` or `ReadableStream` of the new version.

```js
// Upload a new 2GB version of file 98765
var stream = fs.createReadStream('huge.pdf');
client.files.getChunkedUploader(
	'98765',
	2147483648,
	stream,
	null,
	function(err, uploader) {

		if (err) {
			// handle error
			return;
		}

		uploader.on('error', function(err) {
			// handle unrecoverable upload error
		});

		uploader.on('uploadComplete', function(file) {
			console.log('Version upload complete!', file);
		});

		uploader.start();
	}
);
```

### Manual Process

For more complicated upload scenarios, such as those being coordinated across
multiple processes or when an unrecoverable error occurs with the automatic
uploader, the endpoints for chunked upload operations are also exposed directly.

For example, this is roughly how a chunked upload is done manually:
```js
// Upload a 2GB file "huge.pdf" into folder 12345
var parts = [];
var hash = crypto.createHash('sha1');
client.files.createUploadSession(
	'12345',
	2147483648,
	'huge.pdf',
	function(err, session) {

		if (err) {
			// handle error
			return;
		}

		var sessionID = session.upload_session_id;

		// for each part in order, given `part` and `offset`...
		hash.update(part);
		client.files.uploadPart(
			sessionID,
			part,
			offset,
			2147483648,
			null,
			function(err, partData) {

				if (err) {
					// handle error
					return;
				}

				parts.push(partData);
			}
		);

		// once all parts have been uploaded...
		client.files.commitUploadSession(sessionID, hash.digest('base64'), parts, null, callback);
	}
);
```

The individual endpoint methods are detailed below:

#### Create Upload Session

To start a chunked upload, create an upload session for the file by calling
[`files.createUploadSession(folderID, size, name, callback)`](http://opensource.box.com/box-node-sdk/Files.html#createUploadSession)
with the ID of the folder to upload into, as well as the size and file name of
file being uploaded.  This will check the destination folder for conflicts before
starting the upload and pass the information for the upload session back to the callback.

```js
// Create a session to upload a 2GB file "huge.pdf" into folder 12345
client.files.createUploadSession('12345', 2147483648, 'huge.pdf', callback);
```

#### Upload Part

Parts are then uploaded by calling
[`files.uploadPart(sessionID, part, offset, totalSize, callback)`](http://opensource.box.com/box-node-sdk/Files.html#uploadPart)
with the ID of the upload session that was created, a `Buffer` containing the part
of the file starting at `offset`, and the total size of the file being uploaded.
When the upload of a part succeeds, the callback will be called with a part record,
which should be stored for later integrity checking.

```js
// Upload the part starting at byte offset 8388608 to upload session '93D9A837B45F' with part ID 'feedbeef'
client.files.uploadPart('93D9A837B45F', part, 8388608, 2147483648, {part_id: 'feedbeef'}, callback);
```

#### Commit Upload Session

Once all parts of the file have been uploaded, finalize the upload by calling
[`files.commitUploadSession(sessionID, fileHash, parts, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#commitUploadSession)
with the upload session ID, the base64-encoded SHA1 hash of the entire file, and the list of
successfully-uploaded part records.  This will complete the upload and create the
full file in the destination folder.

Any valid file object attributes you want to assign to the newly-created file may
be passed via the `options` parameter.  See the [File object documentation](https://docs.box.com/reference#file-object)
for more details.

If you stored a list of part records for each uploaded part, you can pass them via
`options.parts` for additional integrity checking.  Otherwise, the API will assume that the list
of parts is has received is the intended set.

```js
// Finalize upload session 93D9A837B45F
client.files.commitUploadSession(
	'93D9A837B45F',
	fileHash.digest('base64'),
	parts,
	{description: 'A file I uploaded in chunks!'},
	callback
);
```

#### Abort Upload Session

An in-progress upload session may be destroyed, along with all parts already uploaded,
by calling
[`files.abortUploadSession(sessionID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#abortUploadSession).
This operation cannot be undone.

```js
// Cancel upload session 93D9A837B45F
client.files.abortUploadSession('93D9A837B45F', callback);
```

#### Get Upload Session Parts

The list of parts successfully uploaded to an in-progress upload session can be
retrieved by calling
[`files.getUploadSessionParts(sessionID, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getUploadSessionParts).
The list is returned as a paged collection using the `limit` and `offset` options.

```js
// Get the list of parts already uploaded
client.files.getUploadSessionParts('93D9A837B45F', {limit: 100}, callback);
```

#### Get Upload Session Status

Information about an in-progress upload session can be retrieved by calling
[`files.getUploadSession(sessionID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getUploadSession).

```js
// Get info about upload session 93D9A837B45F
client.files.getUploadSessionStatus('93D9A837B45F', callback);
```

Upload Preflight Check
----------------------

The Preflight Check in the
[`files.preflightUploadFile(parentFolderID, fileData, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#preflightUploadFile)
method will verify that a file will be accepted by Box before
you send all the bytes over the wire.  Preflight checks verify all permissions
as if the file was actually uploaded including:

* Folder upload permission
* File name collisions
* File size caps
* Folder and file name restrictions
* Folder and account storage quota

A successful response does not guarantee that your upload call will succeed, but in practice
it has been shown to reduce failed uploads by more than 99%. Highly active folders,
common filenames, and accounts near their quota limits may get a success for the preflight,
and then have a real conflict during the actual upload.

```js
// Verify that uploading a 200MB file named "Preso.ppt" to folder 12345 would succeed
client.files.preflightUploadFile(
		'12345',
		{
			name: 'Preso.ppt',
			size: 200000000
		},
		null,
		callback
	);
```

For uploading a new version of a file, use the
[`files.preflightUploadNewFileVersion(fileID, fileData, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#preflightUploadNewFileVersion)
method.

```js
// Check if uploading a larger version of this file will succeed
client.files.preflightUploadNewFileVersion('87646', {size: 300000000}, null, callback);
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
To get watermark information for a file call the
[`files.getWatermark(fileID, qs, callback)`](http://opensource.box.com/box-node-sdk/Files.html#getWatermark)
method.

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

Apply Watermark
---------------

To apply or update the watermark to a file call the
[`files.applyWatermark(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/Files.html#applyWatermark)
method.

```js
client.files.applyWatermark('67890', null, callback);
```

Remove Watermark
----------------

A file's watermark can be removed by calling
[`files.removeWatermark(fileID, callback)`](http://opensource.box.com/box-node-sdk/Files.html#removeWatermark).

```js
client.files.removeWatermark('67890', callback);
```

Get Representation
------------------

A file's representation can be retrieved by calling
[`files.getRepresentations(fileID, [representationTypes], options,
callback)`](https://opensource.box.com/box-node-sdk/Files.html#getRepresentation).

```js
client.files.getRepresentations('67890', [jpg?dimensions=32x32], {set_content_disposition_filename: 'New Name'}, callback);
```

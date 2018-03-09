Files
=====

File objects represent individual files in Box. They can be used to download a
file's contents, upload new versions, and perform other common file operations
(move, copy, delete, etc.).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get a File's Information](#get-a-files-information)
- [Update a File's Information](#update-a-files-information)
- [Download a File](#download-a-file)
- [Get a File's Download URL](#get-a-files-download-url)
- [Upload a File](#upload-a-file)
- [Chunked Upload](#chunked-upload)
  - [Automatic Uploader](#automatic-uploader)
  - [Manual Process](#manual-process)
    - [Create Upload Session](#create-upload-session)
    - [Upload Part](#upload-part)
    - [Commit Upload Session](#commit-upload-session)
    - [Abort Upload Session](#abort-upload-session)
    - [Get Upload Session Parts](#get-upload-session-parts)
    - [Get Upload Session Status](#get-upload-session-status)
- [Upload Preflight Check](#upload-preflight-check)
- [Move a File](#move-a-file)
- [Copy a File](#copy-a-file)
- [Delete a File](#delete-a-file)
- [Get File Versions](#get-file-versions)
- [Upload a New Version of a File](#upload-a-new-version-of-a-file)
- [Download a Previous Version of a File](#download-a-previous-version-of-a-file)
- [Delete a Previous File Version](#delete-a-previous-file-version)
- [Create a Shared Link](#create-a-shared-link)
- [Promote Version](#promote-version)
- [Get Thumbnail](#get-thumbnail)
- [Get Embed Link](#get-embed-link)
- [Lock a File](#lock-a-file)
- [Unlock a File](#unlock-a-file)
- [Get Representation Info](#get-representation-info)
- [Get Representation Content](#get-representation-content)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get a File's Information
------------------------

Calling
[`files.get(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#get)
on a file returns a snapshot of the file's info.

```js
client.files.get('75937', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
// Only get information about a few specific fields.
client.files.get('75937', {fields: 'size,owned_by'}, callback);
```

Update a File's Information
---------------------------

Updating a file's information is done by calling
[`files.update(fileID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#update)
with the fields to be updated.

```js
client.files.update('75937', {name : 'New Name'}, callback);
```

Download a File
---------------

A file can be downloaded by calling
[`files.getReadStream(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getReadStream),
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

To download a previous version of the file, pass the `version` option:
```js
client.files.getReadStream('123456', { version: '98765' }, callback);
```

To download only a subset of the file's contents, pass a byte range as an array
of the byte indices to start and stop at to the `byteRange` option.

> __Note:__ Byte indices are inclusive; for example, `[0, 99]` would download the first 100 bytes of the file.

```js
client.files.getReadStream('12345', {byteRange: [0, 99] }, callback);
```

Get a File's Download URL
-------------------------

The download URL of a file an be retrieved by calling
[`files.getDownloadURL(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getDownloadURL).
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
[`files.uploadFile(parentFolderID, filename, content, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#uploadFile)
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

To preserve file timestamps, you may pass the created and modified times as optional parameters:
```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/file');
var options = {
	content_created_at: '2015-05-12T17:38:14-0600',
	content_modified_at: '2016-02-15T22:42:09-0600'
};
client.files.uploadFile('98768', 'New File', stream, options, callback);
```

Chunked Upload
--------------

For large files or in cases where the network connection is less reliable,
you may want to upload the file in parts.  This allows a single part to fail
without aborting the entire upload, and failed parts can then be retried.

### Automatic Uploader

The SDK provides a method of automatically handling a chunked upload; simply call
[`files.getChunkedUploader(folderID, size, name, file, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getChunkedUploader)
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
[`files.getNewVersionChunkedUploader(fileID, size, file, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getNewVersionChunkedUploader)
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
[`files.createUploadSession(folderID, size, name, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#createUploadSession)
with the ID of the folder to upload into, as well as the size and file name of
file being uploaded.  This will check the destination folder for conflicts before
starting the upload and pass the information for the upload session back to the callback.

```js
// Create a session to upload a 2GB file "huge.pdf" into folder 12345
client.files.createUploadSession('12345', 2147483648, 'huge.pdf', callback);
```

#### Upload Part

Parts are then uploaded by calling
[`files.uploadPart(sessionID, part, offset, totalSize, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#uploadPart)
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
[`files.commitUploadSession(sessionID, fileHash, parts, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#commitUploadSession)
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
[`files.abortUploadSession(sessionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#abortUploadSession).
This operation cannot be undone.

```js
// Cancel upload session 93D9A837B45F
client.files.abortUploadSession('93D9A837B45F', callback);
```

#### Get Upload Session Parts

The list of parts successfully uploaded to an in-progress upload session can be
retrieved by calling
[`files.getUploadSessionParts(sessionID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getUploadSessionParts).
The list is returned as a paged collection using the `limit` and `offset` options.

```js
// Get the list of parts already uploaded
client.files.getUploadSessionParts('93D9A837B45F', {limit: 100}, callback);
```

#### Get Upload Session Status

Information about an in-progress upload session can be retrieved by calling
[`files.getUploadSession(sessionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getUploadSession).

```js
// Get info about upload session 93D9A837B45F
client.files.getUploadSessionStatus('93D9A837B45F', callback);
```

Upload Preflight Check
----------------------

The Preflight Check in the
[`files.preflightUploadFile(parentFolderID, fileData, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#preflightUploadFile)
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
[`files.preflightUploadNewFileVersion(fileID, fileData, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#preflightUploadNewFileVersion)
method.

```js
// Check if uploading a larger version of this file will succeed
client.files.preflightUploadNewFileVersion('87646', {size: 300000000}, null, callback);
```

Move a File
-----------

To move a file from one folder to another, call
[`files.move(fileID, newParentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#move)
with the ID of the file to move and the ID of the folder to move it to.

```js
// Move file 12345 to folder 9876
client.files.move('12345', '9876', callback);
```

Copy a File
-----------

A file can be copied to a new folder with the
[`files.copy(fileID, newParentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#copy)
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
[`files.delete(fileID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#delete)
method will move the file to the user's trash.

```js
client.files.delete('12345', callback);
```

Get File Versions
-----------------

Retrieve a list of previous versions of a file by calling the
[`files.getVersions(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getVersions).

```js
client.files.getVersions('12345', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
// Only get information about a few specific fields.
client.files.getVersions('12345', {fields: 'name,size,sha1'}, callback);
```

Upload a New Version of a File
------------------------------

New versions of a file can be uploaded with the
[`files.uploadNewFileVersion(fileID, content, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#uploadNewFileVersion) method.

```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/file');
client.files.uploadFile('98768', stream, callback);
```

To rename the file on upload or manually specify a modification timestamp for the file, pass the corresponding optional
parameter:
```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/file');
var options = {
	name: 'New filename.docx',
	content_modified_at: '2016-02-15T22:42:09-0600'
};
client.files.uploadFile('98768', stream, options, callback);
```

Download a Previous Version of a File
-------------------------------------

For users with premium accounts, previous versions of a file can be downloaded
by calling
[`files.getReadStream(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getReadStream)
with `options.version` specified.

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
[`files.deleteVersion(fileID, versionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#deleteVersion)
method.

```js
client.files.deleteVersion('12345', '98768', callback)
```

Create a Shared Link
--------------------

A shared link for a file can be generated by passing an object containing the desired
shared link access level to
[`files.update(fileID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#update)
in the `updates` parameter.

```js
client.files.update('93745', {shared_link: client.accessLevels.DEFAULT}, callback)
```

Promote Version
---------------

Promote file version to the top of the stack by calling the [`files.promoteVersion(fileID, versionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#promoteVersion) method.

```js
client.files.promoteVersion('12345', '98768', callback);
```

Get Thumbnail
-------------

A thumbnail for a file can be retrieved by calling
[`files.getThumbnail(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getThumbnail).

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
[`files.getEmbedLink(fileID,callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getEmbedLink)
method. Embed link is an expiring URL for embedding a Box file preview into a webpage,
usually via an `<iframe>` element.

For more information, see the [API documentation](https://docs.box.com/reference#get-embed-link).

```js
client.files.getEmbedLink('12345', callback);
```


Lock a File
-----------

A file can be locked, which prevents other users from editing the file, by calling the
[`files.lock(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#lock)
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
[`files.unlock(fileID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#unlock)
method.

```js
client.files.unlock('12345', callback);
```

Get Representation Info
-----------------------

A file's representation info can be retrieved by calling
[`files.getRepresentationInfo(fileID, representationTypes, callback)`][get-rep-info].
You will be able to fetch information regarding pdf representation, thumbnail representation, multi-page images
representation, and extracted text representation.

You can retrieve information regarding the generated representations by calling. This will retrieve information
for a 2048x2048 jpg representation and a 2048x2048 png representation generated for your Box file.
```js
client.files.getRepresentationInfo('67890', client.files.representation.IMAGE_LARGE, callback);
```

You can specify your own set of representations to get info for by manually constructing the
[X-Rep-Hints value][x-rep-hints] and passing it as `representationTypes`.

```js
client.files.getRepresentationInfo('67890', '[pdf][extracted_text]', callback);
```

[get-rep-info]: https://opensource.box.com/box-node-sdk/Files.html#getRepresentationInfo
[x-rep-hints]: https://developer.box.com/reference#section-x-rep-hints-header

Get Representation Content
--------------------------

To get a stream over the contents of a single file representation, call the
[`files.getRepresentationContent(fileID, representationType, options, callback)`][get-rep-content]
method with the ID of the file and an [X-Rep-Hints value][x-rep-hints] specifying the representation
you want.

> __Note:__ This method only supports getting the contents of a single representation; if your
> X-Rep-Hints value specifies multiple representations, the stream will be for an arbitrary one
> of them.

```js
client.files.getRepresentationContent('12345', client.files.representation.PDF)
	.then(function(stream) {

		stream.on('data', function(chunk) {
			// read data from the stream
		});
	});
```

For representations with multiple files, e.g. multi-page images, you will need to pass an `assetPath` option
to specify which file you want to fetch.

```js
// If file 12345 is a document, its PNG representation will consist of one image per page of the document
// Get the image of the first page of the document
client.files.getRepresentationContent('12345', '[png?dimensions=1024x1024]', { assetPath: '1.png' })
	.then(function(stream) {

		stream.on('data', function(chunk) {
			// read data from the stream
		});
	});
```

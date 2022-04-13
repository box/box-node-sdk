# Files

File objects represent individual files in Box. They can be used to download a
file's contents, upload new versions, and perform other common file operations
(move, copy, delete, etc.).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Files](#files)
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
    - [Find a File for a Shared Link](#find-a-file-for-a-shared-link)
    - [Create or update a Shared Link](#create-or-update-a-shared-link)
    - [Get a Shared Link](#get-a-shared-link)
    - [Get information about Shared Link Permissions Options](#get-information-about-shared-link-permissions-options)
    - [Remove a Shared Link](#remove-a-shared-link)
    - [Promote Version](#promote-version)
    - [Get Thumbnail](#get-thumbnail-deprecated)
    - [Get Embed Link](#get-embed-link)
    - [Lock a File](#lock-a-file)
    - [Unlock a File](#unlock-a-file)
    - [Get Representation Info](#get-representation-info)
    - [Get Representation Content](#get-representation-content)
    - [Create a Zip File](#create-a-zip-file)
    - [Download a Zip File](#download-a-zip-file)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Get a File's Information

Calling
[`files.get(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#get)
on a file returns a snapshot of the file's info.

<!-- sample get_files_id -->
```js
client.files.get('11111')
	.then(file => {
		/* file -> {
			type: 'file',
			id: '11111',
			file_version: 
			{ type: 'file_version',
				id: '22222',
				sha1: '97b3dbba6eab7ad0f058240744c8636b7c7bea93' },
			sequence_id: '1',
			etag: '1',
			sha1: '97b3dbba6eab7ad0f058240744c8636b7c7bea93',
			name: 'Puppy.png',
			description: '',
			size: 106833,
			path_collection: 
			{ total_count: 2,
				entries: 
				[ { type: 'folder',
					id: '0',
					sequence_id: null,
					etag: null,
					name: 'All Files' },
					{ type: 'folder',
					id: '33333',
					sequence_id: '0',
					etag: '0',
					name: 'Collaborated Folder' } ] },
			created_at: '2016-11-16T22:01:44-08:00',
			modified_at: '2016-11-16T22:01:51-08:00',
			trashed_at: null,
			purged_at: null,
			content_created_at: '2016-10-29T18:33:50-07:00',
			content_modified_at: '2016-10-29T18:33:50-07:00',
			created_by: 
			{ type: 'user',
				id: '44444',
				name: 'Owner',
				login: 'owner@example.com' },
			modified_by: 
			{ type: 'user',
				id: '44444',
				name: 'Owner',
				login: 'owner@example.com' },
			owned_by: 
			{ type: 'user',
				id: '44444',
				name: 'Owner',
				login: 'owner@example.com' },
			shared_link: null,
			parent: 
			{ type: 'folder',
				id: '33333',
				sequence_id: '0',
				etag: '0',
				name: 'Collaborated Folder' },
			item_status: 'active' }

		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
// Only get information about a few specific fields.
client.files.get('11111', { fields: 'size,owned_by' })
	.then(file => {
		/* file -> {
			type: 'file',
			id: '11111',
			size: 106833,
			owned_by: {
				type: 'user',
				id: '44444',
				name: 'Owner',
				login: 'owner@example.com'
			}
		}
		*/
	});
```

## Update a File's Information

Updating a file's information is done by calling
[`files.update(fileID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#update)
with the fields to be updated.

<!-- sample put_files_id -->
```js
client.files.update('75937', { name : 'New name.pdf', fields: 'name' })
	.then(updatedFile => {
		/* updatedFile => {
			type: 'file',
			id: '11111',
			name: 'New name.pdf'
		}
		*/
	});
```

If you want to ensure that your updates do not overwrite any other updates (i.e. to prevent against possible race
conditions), you can pass the last known value of the file's `etag` field via the `etag` option; this will generate
an error if the file was modified between when you read that `etag` value and when your updates were processed by the
API.

```js
client.files.update('11111', { name: 'New name.pdf', etag: '5', fields: 'name' })
	.then(updatedFile => {
		// ...
	})
	.catch(err => {
		if (err.statusCode === 412) {
			// Precondition failed — the file was modified before our updates were processed
			// We should read the file again to ensure our updates are safe and retry
		}
	});
```

## Download a File

A file can be downloaded by calling
[`files.getReadStream(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getReadStream),
which provides an instance of `stream.Readable` that will yield the file's contents.

<!-- sample get_files_id_content -->
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

<!-- sample get_files_id_content for_version -->
```js
client.files.getReadStream('123456', { version: '98765' }, callback);
```

To download only a subset of the file's contents, pass a byte range as an array
of the byte indices to start and stop at to the `byteRange` option.

> __Note:__ Byte indices are inclusive; for example, `[0, 99]` would download the first 100 bytes of the file.

```js
client.files.getReadStream('12345', {byteRange: [0, 99] }, callback);
```

## Get a File's Download URL

The download URL of a file an be retrieved by calling
[`files.getDownloadURL(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getDownloadURL).
It returns the URL as a string.

<!-- sample get_files_id_content get_url -->
```js
client.files.getDownloadURL('12345')
	.then(downloadURL => {
		// downloadURL -> 'https://dl.boxcloud.com/...'
	});
```

## Upload a File

The simplest way to upload a file to a folder is by calling the
[`files.uploadFile(parentFolderID, filename, content, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#uploadFile)
method with a `stream.Readable` or `Buffer` of the file to upload.

<!-- sample post_files_content -->
```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/My File.pdf');
var folderID = '0'
client.files.uploadFile(folderID, 'My File.pdf', stream)
	.then(file => {
		/* file -> {
			total_count: 1,
			entries: 
			[ { type: 'file',
				id: '11111',
				file_version: 
					{ type: 'file_version',
					id: '22222',
					sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33' },
				sequence_id: '0',
				etag: '0',
				sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33',
				name: 'My File.pdf',
				description: '',
				size: 68431,
				path_collection: 
					{ total_count: 1,
					entries: 
					[ { type: 'folder',
						id: '0',
						sequence_id: null,
						etag: null,
						name: 'All Files' } ] },
				created_at: '2017-05-16T15:18:02-07:00',
				modified_at: '2017-05-16T15:18:02-07:00',
				trashed_at: null,
				purged_at: null,
				content_created_at: '2017-05-16T15:18:02-07:00',
				content_modified_at: '2017-05-16T15:18:02-07:00',
				created_by: 
					{ type: 'user',
					id: '33333',
					name: 'Test User',
					login: 'test@example.com' },
				modified_by: 
					{ type: 'user',
					id: '33333',
					name: 'Test User',
					login: 'test@example.com' },
				owned_by: 
					{ type: 'user',
					id: '33333',
					name: 'Test User',
					login: 'test@example.com' },
				shared_link: null,
				parent: 
					{ type: 'folder',
					id: '0',
					sequence_id: null,
					etag: null,
					name: 'All Files' }
				item_status: 'active' } ] }
		*/
	});
```

To preserve file timestamps, you may pass the created and modified times as optional parameters:
```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/file');
var options = {
	content_created_at: '2015-05-12T17:38:14-0600',
	content_modified_at: '2016-02-15T22:42:09-0600',
};
client.files.uploadFile('98768', 'New File', stream, options)
	.then(file => {
		// ...
	});
```

If you want to pass a Readable you must pass the content length as an optional parameter.
Here is an example of passing Base64 String as file content:
```js
var {Readable} = require('stream');

var base64Content = 'TXkgY29udGVudAo='; // your base64 content
var base64Buffer = Buffer.from(base64Content, 'base64');
// we are using just Readable to create a stream, but you can use any library you want
var stream = new Readable()
stream._read = () => {
	stream.push(base64Buffer);
	stream.push(null);
};
// you have to pass options and define content length
var options = {
	content_length: Buffer.byteLength(base64Content, 'base64')
};
client.files.uploadFile('0', 'My Base64 File.txt', stream, options);
```

## Chunked Upload

For large files or in cases where the network connection is less reliable,
you may want to upload the file in parts.  This allows a single part to fail
without aborting the entire upload, and failed parts can then be retried.

### Automatic Uploader

The SDK provides a method of automatically handling a chunked upload; simply call
[`files.getChunkedUploader(folderID, size, name, file, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getChunkedUploader)
with the ID of the destination folder, the size and file name of the file to be
uploaded, and a `Buffer` or `ReadableStream` of the file to be uploaded.

<!-- samples x_chunked_uploads automatic -->
```js
// Upload a 2GB file "huge.pdf" into folder 12345
var stream = fs.createReadStream('huge.pdf');
client.files.getChunkedUploader('12345', 2147483648, 'huge.pdf', stream)
	.then(uploader => uploader.start())
	.then(file => {
		/* file -> {
			total_count: 1,
			entries: 
			[ { type: 'file',
				id: '11111',
				file_version: 
					{ type: 'file_version',
					id: '22222',
					sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33' },
				sequence_id: '0',
				etag: '0',
				sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33',
				name: 'huge.pdf',
				description: '',
				size: 2147483648,
				path_collection: 
					{ total_count: 1,
					entries: 
					[ { type: 'folder',
						id: '12345',
						sequence_id: null,
						etag: null,
						name: 'My Folder' } ] },
				created_at: '2017-05-16T15:18:02-07:00',
				modified_at: '2017-05-16T15:18:02-07:00',
				trashed_at: null,
				purged_at: null,
				content_created_at: '2017-05-16T15:18:02-07:00',
				content_modified_at: '2017-05-16T15:18:02-07:00',
				created_by: 
					{ type: 'user',
					id: '33333',
					name: 'Test User',
					login: 'test@example.com' },
				modified_by: 
					{ type: 'user',
					id: '33333',
					name: 'Test User',
					login: 'test@example.com' },
				owned_by: 
					{ type: 'user',
					id: '33333',
					name: 'Test User',
					login: 'test@example.com' },
				shared_link: null,
				parent: 
					{ type: 'folder',
					id: '12345',
					sequence_id: null,
					etag: null,
					name: 'My Folder' }
				item_status: 'active' } ] }
		*/
	});
```

A new version of a file can be uploaded in the same way by calling
[`files.getNewVersionChunkedUploader(fileID, size, file, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getNewVersionChunkedUploader)
with the ID of the file to upload a new version of, along with the size of the new
version and a `Buffer` or `ReadableStream` of the new version.

<!-- samples x_chunked_uploads automatic_new_version -->
```js
// Upload a new 2GB version of file 98765
var stream = fs.createReadStream('huge.pdf');
client.files.getNewVersionChunkedUploader('11111', 2147483648, stream)
	.then(uploader => uploader.start())
	.then(file => {
		/* file -> {
			total_count: 1,
			entries: 
			[ { type: 'file',
				id: '11111',
				file_version: 
					{ type: 'file_version',
					id: '22222',
					sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33' },
				sequence_id: '0',
				etag: '0',
				sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33',
				name: 'huge.pdf',
				description: '',
				size: 2147483648,
				path_collection: 
					{ total_count: 1,
					entries: 
					[ { type: 'folder',
						id: '12345',
						sequence_id: null,
						etag: null,
						name: 'My Folder' } ] },
				created_at: '2017-05-16T15:18:02-07:00',
				modified_at: '2017-05-21T15:18:02-07:00',
				trashed_at: null,
				purged_at: null,
				content_created_at: '2017-05-16T15:18:02-07:00',
				content_modified_at: '2017-05-21:18:02-07:00',
				created_by: 
					{ type: 'user',
					id: '33333',
					name: 'Test User',
					login: 'test@example.com' },
				modified_by: 
					{ type: 'user',
					id: '33333',
					name: 'Test User',
					login: 'test@example.com' },
				owned_by: 
					{ type: 'user',
					id: '33333',
					name: 'Test User',
					login: 'test@example.com' },
				shared_link: null,
				parent: 
					{ type: 'folder',
					id: '12345',
					sequence_id: null,
					etag: null,
					name: 'My Folder' }
				item_status: 'active' } ] }
		*/
	});
```

File attributes can be set on the newly uploaded file by passing the via the `options.fileAttributes` parameter:

```js
// Upload a new file and prepopulate the description field
var stream = fs.createReadStream('huge.pdf');
var options = {
	fileAttributes: {
		description: 'A very large PDF'
	}
};
client.files.getChunkedUploader('12345', 2147483648, 'huge.pdf', stream, options)
	.then(uploader => uploader.start())
	.then(file => {
		// ...
	});
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

				parts.push(partData.part);
			}
		);

		// once all parts have been uploaded...
		client.files.commitUploadSession(sessionID, hash.digest('base64'), {parts: parts}, callback);
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

<!-- sample post_files_upload_sessions -->
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

<!-- sample put_files_upload_sessions_id -->
```js
// Upload the part starting at byte offset 8388608 to upload session '93D9A837B45F' with part ID 'feedbeef'
client.files.uploadPart('93D9A837B45F', part, 8388608, 2147483648, {part_id: 'feedbeef'}, callback);
```

#### Commit Upload Session

Once all parts of the file have been uploaded, finalize the upload by calling
[`files.commitUploadSession(sessionID, fileHash, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#commitUploadSession)
with the upload session ID and the base64-encoded SHA1 hash of the entire file.  This will complete the upload and create the
full file in the destination folder.

Any valid file object attributes you want to assign to the newly-created file may
be passed via the `options` parameter.  See the [File object documentation](https://developer.box.com/en/reference/resources/file/)
for more details.

If you stored a list of part records for each uploaded part, you can pass them via
`options.parts` for additional integrity checking.  Otherwise, the API will assume that the list
of parts is has received is the intended set.

<!-- sample post_files_upload_sessions_id_commit -->
```js
// Finalize upload session 93D9A837B45F
client.files.commitUploadSession(
	'93D9A837B45F',
	fileHash.digest('base64'),
	{description: 'A file I uploaded in chunks!'},
	callback
);
```

#### Abort Upload Session

An in-progress upload session may be destroyed, along with all parts already uploaded,
by calling
[`files.abortUploadSession(sessionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#abortUploadSession).
This operation cannot be undone.

<!-- sample delete_files_upload_sessions_id -->
```js
// Cancel upload session 93D9A837B45F
client.files.abortUploadSession('93D9A837B45F', callback);
```

#### Get Upload Session Parts

The list of parts successfully uploaded to an in-progress upload session can be
retrieved by calling
[`files.getUploadSessionParts(sessionID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getUploadSessionParts).
The list is returned as a paged collection using the `limit` and `offset` options.

<!-- sample get_files_upload_sessions_id_parts -->
```js
// Get the list of parts already uploaded
client.files.getUploadSessionParts('93D9A837B45F', {limit: 100}, callback);
```

#### Get Upload Session Status

Information about an in-progress upload session can be retrieved by calling
[`files.getUploadSession(sessionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getUploadSession).

<!-- sample get_files_upload_sessions_id -->
```js
// Get info about upload session 93D9A837B45F
client.files.getUploadSessionStatus('93D9A837B45F', callback);
```

## Upload Preflight Check

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

<!-- sample options_files_content -->
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

<!-- sample options_files_id_content -->
```js
// Check if uploading a larger version of this file will succeed
client.files.preflightUploadNewFileVersion('87646', {size: 300000000}, null, callback);
```

## Move a File

To move a file from one folder to another, call
[`files.move(fileID, newParentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#move)
with the ID of the file to move and the ID of the folder to move it to.

```js
// Move file 12345 to folder 9876
client.files.move('12345', '9876', callback);
```

## Copy a File

A file can be copied to a new folder with the
[`files.copy(fileID, newParentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#copy)
method.

<!-- sample post_files_id_copy -->
```js
var fileID = '11111';
var destinationFolderID = '22222';
client.files.copy(fileID, destinationFolderID)
	.then(fileCopy => {
		/* fileCopy -> {
			type: 'file',
			id: '11112',
			file_version: 
				{ type: 'file_version',
				id: '99999',
				sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33' },
			sequence_id: '0',
			etag: '0',
			sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33',
			name: 'My File.pdf',
			description: '',
			size: 68431,
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
					sequence_id: null,
					etag: null,
					name: 'Personal Files' } ] },
			created_at: '2017-05-16T15:18:02-07:00',
			modified_at: '2017-05-16T15:18:02-07:00',
			trashed_at: null,
			purged_at: null,
			content_created_at: '2017-05-16T15:18:02-07:00',
			content_modified_at: '2017-05-16T15:18:02-07:00',
			created_by: 
				{ type: 'user',
				id: '33333',
				name: 'Test User',
				login: 'test@example.com' },
			modified_by: 
				{ type: 'user',
				id: '33333',
				name: 'Test User',
				login: 'test@example.com' },
			owned_by: 
				{ type: 'user',
				id: '33333',
				name: 'Test User',
				login: 'test@example.com' },
			shared_link: null,
			parent: 
				{ type: 'folder',
				id: '22222',
				sequence_id: null,
				etag: null,
				name: 'Personal Files' }
			item_status: 'active' }
		*/
	});
```

An optional `name` parameter can also be passed to rename the file on copy.  This can be
used to avoid a name conflict when there is already an item with the same name in the
target folder.

```js
client.files.copy('12345', '0', {name: 'Renamed file.png'}, callback);
```

## Delete a File

Calling the
[`files.delete(fileID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#delete)
method will move the file to the user's trash.

```js
client.files.delete('12345')
	.then(() => {
		// deletion succeeded — no value returned
	});
```

If you want to ensure that your deletion does not overwrite any other updates (i.e. to prevent against possible race
conditions), you can pass the last known value of the file's `etag` field via the `etag` option; this will generate
an error if the file was modified between when you read that `etag` value and when the deletion is processed by the
API.

<!-- sample delete_files_id -->
```js
client.files.delete('11111', { etag: '5' })
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

## Get File Versions

Retrieve a list of previous versions of a file by calling the
[`files.getVersions(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getVersions).

<!-- sample get_files_id_versions -->
```js
client.files.getVersions('12345')
	.then(versions => {
		/* versions -> {
			total_count: 1,
			entries: 
			[ { type: 'file_version',
				id: '22222',
				sha1: '359c6c1ed98081b9a69eb3513b9deced59c957f9',
				name: 'script.js',
				size: 92556,
				created_at: '2012-08-20T10:20:30-07:00',
				modified_at: '2012-11-28T13:14:58-08:00',
				modified_by: 
					{ type: 'user',
					id: '33333',
					name: 'Example User',
					login: 'user@example.com' } } ] }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
// Only get information about a few specific fields.
client.files.getVersions('12345', {fields: 'name,size,sha1'})
	.then(versions => {
		/* versions -> {
			total_count: 1,
			entries: 
			[ { type: 'file_version',
				id: '22222',
				sha1: '359c6c1ed98081b9a69eb3513b9deced59c957f9',
				name: 'script.js',
				size: 92556 } ] }
		*/
	});
```

## Upload a New Version of a File

New versions of a file can be uploaded with the
[`files.uploadNewFileVersion(fileID, content, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#uploadNewFileVersion) method.

<!-- sample post_files_id_content -->
```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/file.pdf');
client.files.uploadNewFileVersion('11111', stream)
	.then(file => {
        /* file -> {
            total_count: 1,
            entries: 
            [ { type: 'file',
                id: '11111',
                file_version: 
                    { type: 'file_version',
                    id: '22222',
                    sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33' },
                sequence_id: '0',
                etag: '0',
                sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33',
                name: 'My File.pdf',
                description: '',
                size: 68431,
                path_collection: 
                    { total_count: 1,
                    entries: 
                    [ { type: 'folder',
                        id: '0',
                        sequence_id: null,
                        etag: null,
                        name: 'All Files' } ] },
                created_at: '2017-05-16T15:18:02-07:00',
                modified_at: '2017-05-16T15:18:02-07:00',
                trashed_at: null,
                purged_at: null,
                content_created_at: '2017-05-16T15:18:02-07:00',
                content_modified_at: '2017-05-16T15:18:02-07:00',
                created_by: 
                    { type: 'user',
                    id: '33333',
                    name: 'Test User',
                    login: 'test@example.com' },
                modified_by: 
                    { type: 'user',
                    id: '33333',
                    name: 'Test User',
                    login: 'test@example.com' },
                owned_by: 
                    { type: 'user',
                    id: '33333',
                    name: 'Test User',
                    login: 'test@example.com' },
                shared_link: null,
                parent: 
                    { type: 'folder',
                    id: '0',
                    sequence_id: null,
                    etag: null,
                    name: 'All Files' }
                item_status: 'active' } ] }
        */
    })
```
If the stream passed in is not an fs stream, you must pass the stream length as an optional parameter as shown below.
To rename the file on upload or manually specify a modification timestamp for the file, pass the corresponding optional parameter:
```js
var fs = require('fs');
var stream = fs.createReadStream('/path/to/file.pdf');
var options = {
	name: 'New filename.pdf',
	content_modified_at: '2016-02-15T22:42:09-0600',
	content_length: 5
};
client.files.uploadNewFileVersion('11111', stream, options)
	.then(file => {
        /* file -> {
            total_count: 1,
            entries: 
            [ { type: 'file',
                id: '11111',
                file_version: 
                    { type: 'file_version',
                    id: '22222',
                    sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33' },
                sequence_id: '0',
                etag: '0',
                sha1: '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33',
                name: 'New filename.pdf',
                description: '',
                size: 68431,
                path_collection: 
                    { total_count: 1,
                    entries: 
                    [ { type: 'folder',
                        id: '0',
                        sequence_id: null,
                        etag: null,
                        name: 'All Files' } ] },
                created_at: '2017-05-16T15:18:02-07:00',
                modified_at: '2017-05-16T15:18:02-07:00',
                trashed_at: null,
                purged_at: null,
                content_created_at: '2017-05-16T15:18:02-07:00',
                content_modified_at: '2016-02-15T22:42:09-0600',
                created_by: 
                    { type: 'user',
                    id: '33333',
                    name: 'Test User',
                    login: 'test@example.com' },
                modified_by: 
                    { type: 'user',
                    id: '33333',
                    name: 'Test User',
                    login: 'test@example.com' },
                owned_by: 
                    { type: 'user',
                    id: '33333',
                    name: 'Test User',
                    login: 'test@example.com' },
                shared_link: null,
                parent: 
                    { type: 'folder',
                    id: '0',
                    sequence_id: null,
                    etag: null,
                    name: 'All Files' }
                item_status: 'active' } ] }
        */
    })
```

## Download a Previous Version of a File

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

## Delete a Previous File Version

An old version of a file can be moved to the trash by calling the
[`files.deleteVersion(fileID, versionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#deleteVersion)
method.

<!-- sample delete_files_id_versions_id -->
```js
var fileID = '11111';
var versionID = '22222';
client.files.deleteVersion(fileID, versionID)
	.then(() => {
		// deletion succeeded — no value returned
	});
```

If you want to ensure that your deletion does not overwrite any other updates (i.e. to prevent against possible race
conditions), you can pass the last known value of the file's `etag` field via the `etag` option; this will generate
an error if the file was modified between when you read that `etag` value and when the deletion is processed by the
API.

```js
var fileID = '11111';
var versionID = '22222';
client.files.deleteVersion(fileID, versionID, { etag: '5' })
	.then(() => {
		// File version successfully deleted
	})
	.catch(err => {
		if (err.statusCode === 412) {
			// Precondition failed — the file was modified before the deletion was processed
			// Read the file again to ensure it is safe to delete and then retry
		}
	});
```


## Find a File for a Shared Link

To find a file given a shared link, use the
[`sharedItems.get(url, password, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/SharedItems.html#get)
method.

<!-- sample get_shared_items -->
```js
client.sharedItems.get(
  'https://app.box.com/s/gjasdasjhasd',
  'letmein'
),then(file => {
  //...
});
```

## Create or update a Shared Link

To create or update a shared link for a file use 
[`files.update(fileID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#update)
method, passing a new `shared_link` value in the `updates` parameter:

<!-- sample put_files_id shared_link_create -->
```js
client.files.update('12345', {
  shared_link: {
    access: "open",
    password: "do-not-use-this-password", 
    unshared_at: "2022-12-12T10:53:43-08:00",
    vanity_name: "my-shared-link",
    permissions: {
	  can_view: true,
	  can_download: true,
	  can_edit: true
    }
  }
}).then(file => {
  // ...
})
```
This will make a shared link to be `open` to everyone, but users will need to provide `password` to access the file.
This link will be unshared at `"2022-12-12T10:53:43-08:00"`. By setting `vanity_name` we create custom URL 
`https://app.box.com/v/my-shared-link`. Custom URLs should not be used when sharing sensitive content as vanity URLs are 
a lot easier to guess than regular shared links.
Additionally, everyone who has this link can `view`, `download` and `edit` the file.

You can create shared link using default values
```js
client.files.update('12345', {
  shared_link: {}
}).then(file => {
  // ...
})
```
 - Default `access` value comes from the access level specified by the enterprise admin.
 - Default `password`, `unshared_at`, `vanity_name` will be empty.
 - Default `permissions` comes from the values specified by the enterprise admin.

You can remove any field set on a link by sending value `null` (or empty object when it comes to `permissions`).
This will cause it's value to be default. For example, let's remove `access` and `permissions`:
```js
client.files.update('12345', {
  shared_link: {
    access: null,
    permissions: {}
  }
}).then(file => {
  // ...
})
```
This will remove `open` access, and it will fall back to default value set by the enterprise admin.
The `permissions` we set on a shared link will be removed and default permissions defined by the enterprise admin will be applied.
Other properties of the shared link will not be changed as we are not sending them.

## Get a Shared Link

To check for an existing shared link on a file, inspect the
`shared_link` field on a file object.

This object, when present, contains a `unicode` string containing the shared
link URL.

<!-- sample get_files_id get_shared_link -->
```js
client.files.get('11111', { fields: 'shared_link' })
  .then(file => {
    let url = file.shared_link.download_url
    //...
  })
```

## Get information about Shared Link Permissions Options

To check what permissions can be set on a shared link you can ask for `shared_link_permission_options`:

```js
client.files.get('11111', { fields: 'shared_link_permission_options' })
  .then(file => {
    let options = file.shared_link_permission_options
    // options = [ "can_download", "can_preview", "can_edit" ]
  })
```

Allowed values are defined by the enterprise admin in "Enterprise Settings -> Content & Sharing -> Actions link recipients can take",
possible values are `["can_preview"]`, `["can_preview", "can_download"]` or `["can_preview", "can_download", "can_edit"]`.

## Remove a Shared Link

A shared link for a file can be removed calling
[`files.update(fileID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#update)
with `null` for the `shared_link` value.

<!-- sample put_files_id remove_shared_link -->
```js
client.files.update('12345', {
  shared_link: null
}).then(file => {
  // ...
})
```


## Promote Version

Promote file version to the top of the stack by calling the [`files.promoteVersion(fileID, versionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#promoteVersion) method.

<!-- sample post_files_id_versions_current -->
```js
var fileID = '11111';
var versionID = '22222';
client.files.promoteVersion(fileID, versionID)
	.then(version => {
		/* version -> {
			type: 'file_version',
			id: '33333',
			sha1: '12039d6dd9a7e6eefc78846802e',
			name: 'Stark Family Lineage.pptx',
			size: 37934912,
			created_at: '2013-11-20T13:20:50-08:00',
			modified_at: '2013-11-20T13:26:48-08:00',
			modified_by: 
			{ type: 'user',
				id: '44444',
				name: 'Eddard Stark',
				login: 'ned@winterfell.example.com' } }
		*/
	});
```

## Get Thumbnail (deprecated)

This method has been deprecated. Use [Get Representation Content](#get-representation-content) instead.

A thumbnail for a file can be retrieved by calling
[`files.getThumbnail(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getThumbnail).

<!-- sample get_files_id_thumbnail_id -->
```js
client.files.getThumbnail('12345')
	.then(thumbnailInfo => {
		if (thumbnailInfo.location) {
			// fetch thumbnail from location URL
		} else if (thumbnailInfo.file) {
			// use response.file Buffer contents as thumbnail
		} else {
			// no thumbnail available
		}
	});
```

## Get Embed Link

An embed link for a file can be generated by calling the
[`files.getEmbedLink(fileID,callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getEmbedLink)
method. Embed link is an expiring URL for embedding a Box file preview into a webpage,
usually via an `<iframe>` element.

For more information, see the [API documentation](https://developer.box.com/en/reference/resources/file/#param-expiring_embed_link).

```js
client.files.getEmbedLink('12345')
	.then(embedURL => {
		// embedURL -> "https://app.box.com/preview/expiring_embed/..."
	});
```


## Lock a File

A file can be locked, which prevents other users from editing the file, by calling the
[`files.lock(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#lock)
method  You may optionally prevent other users from downloading the file, as well as set
an expiration time for the lock.

```js
var options = {
	expires_at: '2018-12-12T10:55:30-08:00',
	is_download_prevented: false
}
client.files.lock('11111', options)
	.then(file => {
		/* file -> {
			type: 'file',
			id: '11111',
			etag: '2',
			lock: 
			{ type: 'lock',
				id: '22222',
				created_by: 
				{ type: 'user',
					id: '33333',
					name: 'Example User',
					login: 'user@example.com' },
				created_at: '2017-03-06T22:00:53-08:00',
				expires_at: '2018-12-12T10:55:30-08:00',
				is_download_prevented: false } }
		*/
	});
```

## Unlock a File

A file can be unlocked by calling the
[`files.unlock(fileID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#unlock)
method.

```js
client.files.unlock('11111')
	.then(file => {
		/* file -> {
			type: 'file',
			id: '11111',
			etag: '2',
			lock: null }
		*/
	});
```

## Get Representation Info

A file's representation info can be retrieved by calling
[`files.getRepresentationInfo(fileID, representationTypes, callback)`][get-rep-info].
You will be able to fetch information regarding PDF representation, thumbnail representation, multi-page images
representation, and extracted text representation.

```js
client.files.getRepresentationInfo('67890', client.files.representation.THUMBNAIL)
	.then(representations => {
		/* representations -> {
			entries: 
			[ { content: { url_template: 'https://dl.boxcloud.com/.../{+asset_path}' },
				info: { url: 'https://api.box.com/2.0/...' },
				properties: { dimensions: '320x320', paged: 'false', thumb: 'true' },
				representation: 'jpg',
				status: { state: 'success' } } ] }
		*/
	});
```

You can specify your own set of representations to get info for by manually constructing the
[X-Rep-Hints value][x-rep-hints] and passing it as `representationTypes`.

```js
client.files.getRepresentationInfo('67890', '[pdf][extracted_text]')
	.then(representations => {
		// ...
	});
```

Setting the `generateRepresentations` option to `true` will automatically poll the status of
all specified representations to generate them.

```js
client.files.getRepresentationInfo('67890', '[pdf][extracted_text]', { generateRepresentations: true })
	.then(representations => {
		// All representations should be generated
		// ...
	});
```


[get-rep-info]: http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getRepresentationInfo
[x-rep-hints]: https://developer.box.com/en/reference/get-files-id/#param-X-Rep-Hints

## Get Representation Content

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

[get-rep-content]: http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getRepresentationContent

## Create a Zip File

Calling [`files.createZip(name, items, callback)`][create-a-zip-file] will let you create a new zip file with the specified name and 
with the specified items and will return a response with the download and status link. This file does not show up in your Box account, but will be temporarily available for download.

<!-- sample post_zip_downloads -->
```js
var name = 'test',
items = [
	{
		type: 'file',
		id: '466239504569'
	},
	{
		type: 'folder',
		id: '466239504580'
	}
];
client.files.createZip(name, items)
	.then(zip => {
		/* zip -> {
				"download_url": "https://api.box.com/2.0/zip_downloads/124hfiowk3fa8kmrwh/content",
				"status_url": "https://api.box.com/2.0/zip_downloads/124hfiowk3fa8kmrwh/status",
				"expires_at": "2018-04-25T11:00:18-07:00",
				"name_conflicts": [
					[
						{
							"id": "100",
							"type": "file",
							"original_name": "salary.pdf",
							"download_name": "aqc823.pdf"
						},
						{
							"id": "200",
							"type": "file",
							"original_name": "salary.pdf",
							"download_name": "aci23s.pdf"
						}
					],
					[
						{
							"id": "1000",
							"type": "folder",
							"original_name": "employees",
							"download_name": "3d366a_employees"
						},
						{
							"id": "2000",
							"type": "folder",
							"original_name": "employees",
							"download_name": "3aa6a7_employees"
						}
					]
				]
			}
		*/
	});
```
[create-a-zip-file]: http://opensource.box.com/box-node-sdk/jsdoc/Files.html#createZip

## Download a Zip File

Calling [`file.downloadZip(name, items, stream, callback)`][download-a-zip-file] will let you create a new zip file 
with the specified name and with the specified items and download it to the stream that is passed in. The return object is status
object that contains information about the download, including whether it was successful. The created zip file does not show up in your Box account.

<!-- sample get_zip_downloads_id_content -->
```js
var name = 'test',
items = [
	{
		type: 'file',
		id: '466239504569'
	},
	{
		type: 'folder',
		id: '466239504580'
	}
],
stream = new Readable();
client.files.downloadZip(name, items, stream)
	.then(status => {
		/* status -> {
				"total_file_count": 20,
				"downloaded_file_count": 10,
				"skipped_file_count": 10,
				"skipped_folder_count": 10,
				"state": "succeeded"
			}
		*/
	});
```
[download-a-zip-file]: http://opensource.box.com/box-node-sdk/jsdoc/Files.html#downloadZip

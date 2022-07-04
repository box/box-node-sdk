File Requests
=============

File request objects represent a file request associated with a folder.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Get a File Request's Information](#get-a-file-requests-information)
- [Copy a File Request's Information](#copy-a-file-requests-information)
- [Update a File Request's Information](#update-a-file-requests-information)
- [Delete a File Request](#delete-a-file-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get a File Request's Information
------------------------

Calling [`fileRequests.getById(fileRequestId: string)`][get-info] returns information on a file request 
[FileRequest][file-request-response].

<!-- sample get_file_requests_id -->
```js
client.fileRequests.getById(fileRequestId)
```

[get-info]: http://opensource.box.com/box-node-sdk/jsdoc/FileRequestsManager.html#getById

Copy a File Request's Information
---------------------------

Calling [`fileRequests.copy(fileRequestId: string, copyBody: FileRequestCopyBody)`][copy-info] copies an existing file request that is already present 
on one folder, and applies it to another folder. If you want to set certain fields of the newly copied file request when
it is created, set those fields in the [`FileRequestCopyBody`][copy-body] that you pass into copy method.

<!-- sample post_file_requests_id_copy -->
```js
client.fileRequests.copy(fileRequestId, {
  folder: {
    id: '157979815648',
    type: 'folder'
  }
}).then((r: FileRequest) => {
  // do something with the copied file request 
  console.log(r)
});
```

[copy-info]: http://opensource.box.com/box-node-sdk/jsdoc/FileRequestsManager.html#copy
[copy-body]: http://opensource.box.com/box-node-sdk/jsdoc/FileRequestCopyBody.html

Update a File Request's Information
---------------------------

Calling [`fileRequests.update(fileRequestId: string, updateBody: FileRequestUpdateBody)`][update-info] 
updates a file request. This can be used to activate or deactivate a file request using
[`FileRequestUpdateBody`][update-body] that you pass into update method.

<!-- sample put_file_requests_id -->
```js
client.fileRequests.update(fileRequestId, {
  title: 'Updated title'
}).then((r: FileRequest) => {
  // do something with the updated file request 
  console.log(r)
});
```

[update-info]: http://opensource.box.com/box-java-sdk/javadoc/com/box/sdk/BoxFileRequest.html#updateInfo
[update-body]: http://opensource.box.com/box-node-sdk/jsdoc/FileRequestUpdateBody.html

Delete a File Request
-------------

Calling `fileRequests.delete(fileRequestId: string)`][delete] deletes a file request permanently.

<!-- sample delete_file_requests_id -->
```js
client.fileRequests.delete('2484517969').then(() => console.log('Removed file request'));
```

[delete]: http://opensource.box.com/box-node-sdk/jsdoc/FileRequestsManager.html#delete

[file-request-response]: http://opensource.box.com/box-node-sdk/jsdoc/FileRequest.html

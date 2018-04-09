Watermarking
============

Watermarking allows you to place a semi-transparent overlay on an embedded file preview that displays a viewer's email address or user ID and the time of access over a file's content. Once a watermark is applied to a file or folder via the API, the watermark will be displayed on any file preview.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get Watermark on a File](#get-watermark-on-a-file)
- [Apply Watermark to a File](#apply-watermark-to-a-file)
- [Remove Watermark from a File](#remove-watermark-from-a-file)
- [Get Watermark on a Folder](#get-watermark-on-a-folder)
- [Apply Watermark to a Folder](#apply-watermark-to-a-folder)
- [Remove Watermark from a Folder](#remove-watermark-from-a-folder)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Get Watermark on a File
-----------------------

To get watermark information for a file call the
[`files.getWatermark(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getWatermark)
method.

```js
client.files.getWatermark('75937', null, callback);
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
// Only get information about a few specific fields.
client.files.getWatermark('75937', {fields: 'created_at'}, callback);
```

Apply Watermark to a File
-------------------------

To apply or update the watermark to a file call the
[`files.applyWatermark(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#applyWatermark)
method.

```js
client.files.applyWatermark('67890', null, callback);
```

Remove Watermark from a File
----------------------------

A file's watermark can be removed by calling
[`files.removeWatermark(fileID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#removeWatermark).

```js
client.files.removeWatermark('67890', callback);
```

Get Watermark on a Folder
-------------------------
To get watermark information for a folder call the
[`folders.getWatermark(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#getWatermark)
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

Apply Watermark to a Folder
---------------------------

To apply or update the watermark for a folder call the
[`folders.applyWatermark(folderID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folders.html#applyWatermark)
method.

```js
client.folders.applyWatermark('67890', null, callback);
```

Remove Watermark from a Folder
------------------------------

A folder's watermark can be removed by calling
[`folders.removeWatermark(folderID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Folder.html#removeWatermark).

```js
client.folders.removeWatermark('67890', callback);
```

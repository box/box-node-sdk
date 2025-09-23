# Downloads

Downloads module is used to download files from Box.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Downloads](#downloads)
  - [Download a File](#download-a-file)
  - [Get download URL](#get-download-url)
    - [Arguments](#arguments)
    - [Returns](#returns)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Download a File

To get the entire contents of the file as `ArrayBuffer`, call `downloadFile` method.
This method returns a `ArrayBuffer` object which contains the file content.

<!-- sample get_files_id_content -->

```js
const fs = require('fs');

const fileContent = await client.downloads.downloadFile('123456789');
const fileWriteStream = fs.createWriteStream('file.pdf');
fileContent.pipe(fileWriteStream);
```

## Get download URL

Get a URL to download a file

This operation is performed by calling function `getDownloadFileUrl`.

```ts
await client.downloads.getDownloadFileUrl(uploadedFile.id);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- ## optionalsInput `GetDownloadFileUrlOptionalsInput`

### Returns

This function returns a value of type `string`.

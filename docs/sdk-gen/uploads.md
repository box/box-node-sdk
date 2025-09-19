# UploadsManager

- [Upload file version](#upload-file-version)
- [Preflight check before upload](#preflight-check-before-upload)
- [Upload file](#upload-file)

## Upload file version

Update a file's content. For file sizes over 50MB we recommend
using the Chunk Upload APIs.

The `attributes` part of the body must come **before** the
`file` part. Requests that do not follow this format when
uploading the file will receive a HTTP `400` error with a
`metadata_after_file_contents` error code.

This operation is performed by calling function `uploadFileVersion`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-files-id-content/).

<!-- sample post_files_id_content -->

```ts
await client.uploads.uploadFileVersion(file.id, {
  attributes: {
    name: file.name!,
  } satisfies UploadFileVersionRequestBodyAttributesField,
  file: generateByteStream(20),
} satisfies UploadFileVersionRequestBody);
```

### Arguments

- fileId `string`
  - The unique identifier that represents a file. The ID for any file can be determined by visiting a file in the web application and copying the ID from the URL. For example, for the URL `https://*.app.box.com/files/123` the `file_id` is `123`. Example: "12345"
- requestBody `UploadFileVersionRequestBody`
  - Request body of uploadFileVersion method
- optionalsInput `UploadFileVersionOptionalsInput`

### Returns

This function returns a value of type `Files`.

Returns the new file object in a list.

## Preflight check before upload

Performs a check to verify that a file will be accepted by Box
before you upload the entire file.

This operation is performed by calling function `preflightFileUploadCheck`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/options-files-content/).

<!-- sample options_files_content -->

```ts
await client.uploads.preflightFileUploadCheck({
  name: newFileName,
  size: 1024 * 1024,
  parent: { id: '0' } satisfies PreflightFileUploadCheckRequestBodyParentField,
} satisfies PreflightFileUploadCheckRequestBody);
```

### Arguments

- requestBody `PreflightFileUploadCheckRequestBody`
  - Request body of preflightFileUploadCheck method
- headersInput `PreflightFileUploadCheckHeadersInput`
  - Headers of preflightFileUploadCheck method
- cancellationToken `undefined | CancellationToken`
  - Token used for request cancellation.

### Returns

This function returns a value of type `UploadUrl`.

If the check passed, the response will include a session URL that
can be used to upload the file to.

## Upload file

Uploads a small file to Box. For file sizes over 50MB we recommend
using the Chunk Upload APIs.

The `attributes` part of the body must come **before** the
`file` part. Requests that do not follow this format when
uploading the file will receive a HTTP `400` error with a
`metadata_after_file_contents` error code.

This operation is performed by calling function `uploadFile`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-files-content/).

<!-- sample post_files_content -->

```js
const fs = require('fs');

const attrs = { name: 'filename.txt', parent: { id: '0' } };
const body = {
  attributes: attrs,
  file: fs.createReadStream('filename.txt'),
};
const files = await client.uploads.uploadFile(body);
const file = files.entries[0];
console.log(`File uploaded with id ${file.id}, name ${file.name}`);
```

### Arguments

- requestBody `UploadFileRequestBody`
  - Request body of uploadFile method
- ## optionalsInput `UploadFileOptionalsInput`

### Returns

This function returns a value of type `Files`.

Returns the new file object in a list.

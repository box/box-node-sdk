# Changelog

## 1.18.0

- Updated dependencies to resolve potential security issues:
    - `request@2.87.0`
    - Transitive dependencies of `jsonwebtoken@8.2.1`
- Added a static `BoxSDK.getBasicClient()` method to enable creating a client without needing
to specify a client ID and secret (thanks to @cbetta)

## 1.17.0

- Updated dependencies: `request@2.85.0`, `jsonwebtoken@8.2.1`
- Added support for [Storage Policies](./docs/storage-policies.md)
- Added the option to use a Token Store for caching tokens with App Auth using JWT

## 1.16.1

- Fixed a bug where metadata template deletion would not properly return results via callback

## 1.16.0

- Added support for [assigning Retention Policies to Metadata Templates](https://github.com/box/box-node-sdk/blob/master/docs/retention-policies.md#assign-retention-policy)

## 1.15.0

- Fixed [`client.webhooks.validateMessage() and `sdk.validateWebhookMessage()`](https://github.com/box/box-node-sdk/blob/master/docs/webhooks.md#validate-a-webhook-message)
to accept the request body as an `Object`
- Fixed `sdk.configure()` to correct reconfigure all options
- Improved error messages for API errors and added the request object as `error.request` for easier debugging

## 1.14.1

- Fixed a bug when `files.getReadStream()` was called with null options

## 1.14.0

- Added support for [getting a metadata template by ID](./docs/metadata.md#get-by-id)
- Added a `byteRange` option to [file download](./docs/files.md#download-a-file) to support partial file download
- Improved error messages when using promises and in authentication flows

## 1.13.0

- Added support for getting a [stream of file representation contents](./docs/files.md#get-representation-content)
- Switched to using exponential backoff for request retries

## 1.12.1
- Fixed an issue where chunked uploader would not work with response streams from the request library
(0e7014561f9cd0f7f38f98536b3f0c3946231d2e)

## 1.12.0

- Added support for [metadata template deletion](./docs/metadata.md#delete-metadata-template)

## 1.11.0

- Added options to preserve file timestamps on [file upload](./docs/files.md#upload-a-file)
and to rename a file or preserve modification timestamp on [new version upload](./docs/files.md#upload-a-new-version-of-a-file)
- Added [Collaboration Whitelist](./docs/collaboration-whitelist.md) functionality to allow enterprise admins
to control which external users can collaborate on their content
- Added an option to Token Exchange to generate [annotator tokens](./docs/authentication.md#annotator-tokens) for use with Box View

## 1.10.1

- Updated to jsonwebtoken@8.1.0 to fix an issue where some users were getting
an error when using App Auth

## 1.10.0

- Added support for [Terms of Service](./docs/terms-of-service.md) endpoints
- Fixed a bug where receiving a collection without paging parameters from the API
would cause the SDK to throw an exception when using the `iterators` SDK option.
Now, this will return an iterator over the items returned by the API.
- Fixed a bug in Token Exchange where passing multiple scopes would result in an error
- Added support for [getting Representations info on a file](./docs/files.md#get-representation-info)

## 1.9.0

- Fixed token methods to return bluebird Promises instead of native Promises
- Added support for the `notify` and `can_view_path` options on Collaborations

## 1.8.0

- Added support for [Batch API](./docs/client.md#batch-api)
- Fixed a bug where the Event Stream would make more API calls than necessary,
potentially hitting Box API rate limits
- Added Promise support to methods on the SDK object
- Added Node.js version to the User-Agent header that the SDK sends
- Fixed a bug where using multiple Persistent Clients instances could cause some
clients to end up with expired tokens

## 1.7.0

- Add support for passing IP to all token methods, and fixed a bug where a client's IP was not being correctly reported on token refreshes

## 1.6.0

- Added [Recent Items](./docs/recent-items.md) support
- Updated app auth expiration time default value and validation

## 1.5.1

- Revert deep-freezing Config properties, since it was causing errors

## 1.5.0

- Added support for [Token Exchange](./docs/authentication.md#token-exchange),
which allows a client to get downscoped tokens suitable for passing to a browser
app or worker process.
- Ensured deeply-nested Config properties are immutable

## 1.4.2

- Fixed `BoxSDK.getPreconfiguredInstance()` to configure webhook keys

## 1.4.1

- Fixed `BoxSDK.getPreconfiguredInstance()` when app auth setttings are not populated

## 1.4.0

- Added support for [file collaborations](./docs/collaborations.md#add-a-collaboration).
Users can now invite others to collaborate on single files.
See [the blog post](https://blog.box.com/blog/file-collaboration-api/) for more information.
- Fixed an issue where users were unable to use JWT Server Auth when their computers' clocks
were not synchronized with the Box API servers.
- All asynchronous client methods now return Promises in addition to taking a
(now-optional) callback parameter, so you can write more modern JS with the SDK.
- The SDK can now be preconfigured using a JSON blob that can be downloaded in the
Box Dev Console for JWT Server Authentication apps, making it easier to get started
developing!
- Added support for [chunked upload](./docs/files.md#chunked-upload), where a large
file can be uploaded one piece at a time.  This makes large file uploads much faster
and more reliable, since parts can be uploaded in parallel and failed parts can be
retried in isolation.
- Added an `is_confirmed` option to [email alias creation](./docs/users.md#add-email-alias) for
admins to auto-confirm the alias.
- Added support for the [Enterprise Events stream](./docs/events.md#enterprise-events).
- Added an option to have collections methods (e.g. `folders.getItems()`, 
`enterprise.getUsers()`, etc) return [async iterators](./README.md#iterators) that will automatically
page through the collection.  This conforms to the [proposed async iteration spec](https://github.com/tc39/proposal-async-iteration),
which will eventually allow them to be used in ergonomic for-await-of loop syntax.

## 1.3.0

- Added `BoxSDK.validateWebhookMessage()` and `client.webhooks.validateMessage()` for validating webhook messages from Box

## 1.2.0

- Added methods for all API endpoints; we now have full API coverage :tada:
- Added support for renaming a file or folder on copy
- Added `client.asUser(userID)` and `client.asSelf()` to support making calls on behalf of managed users
- Fixed event streams so they don't go into an infinite error loop when auth expires
- Fixed an error where App Auth clients would not be able to authorize due to clock skew
- Fixed the `mdfilters` parameter in `client.search.query()` to support metadata search
- Cloned options objects to prevent modification of passed-in objects by the SDK
- Added better error messaging to the sample app

## 1.1.0

- Added endpoint to get a file's tasks
- Fixed issues with stream uploads
- Improved performance of file uploads
- Added endpoints to delete files and folders from trash
- Added endpoint to get a trashed folder
- Upgraded request dependency to fix ReDoS vulnerability

## 1.0.0

Initial release.

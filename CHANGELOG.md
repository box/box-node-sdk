# Changelog

## Next Release

**New Features and Enhancements:**

- Add support for copyInstanceOnItemCopy field for metadata templates ([#572](https://github.com/box/box-node-sdk/pull/572))

**Bug Fixes:**

- Fix webhook signature validation ([#568](https://github.com/box/box-node-sdk/pull/568))

## 1.36.0 (2020-01-27)

**New Features and Enhancements:**

- Add folder lock functionality ([#560](https://github.com/box/box-node-sdk/pull/560))
- Add support for filtering groups by name ([#561](https://github.com/box/box-node-sdk/pull/561))

**Bug Fixes:**

- Update proxy-agent to patch proxy support issue ([#563](https://github.com/box/box-node-sdk/pull/563))
- Update dependencies to patch security vulnerabilities ([#566](https://github.com/box/box-node-sdk/pull/566))

## 1.35.0 (2020-11-02)

**New Features and Enhancements:**

- Add support for search param to get shared link items ([#547](https://github.com/box/box-node-sdk/pull/547))

## 1.34.3 (2020-10-02)

**Bug Fixes:**

- Upgrade ajv dependency ([#545](https://github.com/box/box-node-sdk/pull/545))

## 1.34.2 [2020-08-20]

- Make iterator bug fix for uploading files non breaking ([#534](https://github.com/box/box-node-sdk/pull/534))

## 1.34.1 [2020-08-17]

- Fix iterator bug for uploading new file versions ([#531](https://github.com/box/box-node-sdk/pull/531))

## 1.34.0 [2020-08-04]

- Add zip functionality ([#525](https://github.com/box/box-node-sdk/pull/525))
- Add proxy support for `http`, `https`, `socks` and `pac` protocols ([#529](https://github.com/box/box-node-sdk/pull/529))

## 1.33.0 [2020-06-25]

- Add path parameter sanitization ([#505](https://github.com/box/box-node-sdk/pull/505))
- Add support for all streams for uploading files ([#519](https://github.com/box/box-node-sdk/pull/519))

## 1.32.0 [2020-04-01]

- Temporarily removed Node 4 and Node 5 builds from Travis, due to tests not passing.  Will investigate, going forward ([#495](https://github.com/box/box-node-sdk/pull/495)).
- Fixed an issue where an error is thrown during a retry when a response is not returned by the previous call  ([#477](https://github.com/box/box-node-sdk/pull/477)).
- Added the ability to [query](./docs/metadata.md#query) Box items based on their metadata ([#487](https://github.com/box/box-node-sdk/pull/487)).

## 1.31.0 [2020-02-13]

- Fixed Authentication Request Retries
- Added marker-based paging for users endpoints
- Added `getNextMarker()` to PagingIterator to get the next marker

## 1.30.0 [2019-11-21]

- Deprecated Batch API methods
- Added support for [token exchange](./lib/box-client.js#L495) using shared links

## 1.29.1 [2019-08-22]

- Fixed an issue where JWT authentication requests could fail after being rate limited

## 1.29.0 [2019-04-25]

- Added convenience methods for setting metadata on [files](./docs/metadata.md#set-metadata-on-a-file)
  and [folders](./docs/metadata.md#set-metadata-on-a-folder) ([#376](https://github.com/box/box-node-sdk/pull/376))

## 1.28.0 [2019-03-28]

- Added methods for [moving](./docs/web-links.md#move-a-web-link) and [copying](./docs/web-links.md#move-a-web-link)
  weblinks, as well as [adding or removing from a collection](./docs/web-links.md#add-web-link-to-a-collection)

## 1.27.0 [2019-02-28]

- Added the trace ID from API response headers to error messages for easier debugging
- Added more safety checks in the error flow to protect against throwing when handling a malformed request
- Added support for [retrieving a user's avatar image](./docs/users.md#get-user-avatar)

## 1.26.2 [2019-02-22]

- Fixed an error where under high request rates, code in the error handling logic could throw when handling a
  malformed request

## 1.26.1 [2019-02-12]

- Fixed an error where some methods could throw an error when constructing an iterator

## 1.26.0 [2019-02-12]

- Added support for [replying to a comment](./docs/comments.md#reply-to-a-comment) (thanks @jpan-box!)
- Fixed an issue where calling `client.events.get()` could return an iterator that would only iterate over
  the first chunk of events.  This method will now always return the raw JSON data in order to enable manual
  paging.  For automatic paging through events, `client.events.getEventStream()` or
  `client.events.getEnterpriseEventStream()` should be used instead.

## 1.25.0 [2019-01-24]

- Added the `retryStrategy` config parameter to allow customizing how the SDK retries failing requests

## 1.24.1 [2019-01-11]

- Fixed an issue where token expiration was not being correctly handled

## 1.24.0 [2018-12-10]

- Added a configuration option for populating the first-party client analytics header information

## 1.23.0 [2018-11-21]

- Added an `etag` option to common file and folder methods to allow handling race conditions
    - [`client.files.update()`](./docs/files.md#update-a-files-information)
    - [`client.files.delete()`](./docs/files.md#delete-a-file)
    - [`client.files.deletePermanently()`](./docs/trash.md#delete-a-file-from-the-trash)
    - [`client.files.deleteVersion()`](./docs/files.md#delete-a-previous-file-version)
    - [`client.folders.update()`](./docs/folders.md#update-a-folders-information)
    - [`client.folders.delete()`](./docs/folders.md#delete-a-folder)
    - [`client.folders.deletePermanently()`](./docs/trash.md#delete-a-folder-from-the-trash)

## 1.22.1 [2018-11-15]

- Fixed an issue where retrying JWT auth token requests would sometimes fail due to a non-unique `jti` claim

## 1.22.0 [2018-09-17]

- Chunked Uploader methods now return promises for [simpler handling of chunked uploads](./docs/files.md#automatic-uploader)
- File attributes to set on the newly-uploaded file can now be
[passed via `options.fileAttributes`](./docs/files.md#automatic-uploader) when creating a Chunked Uploader

## 1.21.0 [2018-09-13]

- Added the ability to close an Event Stream by calling `eventStream.destroy()` (thanks @boneskull!)
- Improved error messages related to certain authentication failure cases

## 1.20.0 [2018-08-09]

- Added missing values to the `client.webhooks.triggerTypes` enum (thanks @MathersMax!)
- Added support for [Metadata Cascade Policies](./docs/metadata.md#create-cascade-policy)

## 1.19.0 [2018-06-14]

- Added `generateRepresentations` option to [`files.getRepresentationContent()`](./docs/files.md#get-representation-content)

## 1.18.0 [2018-05-24]

- Updated dependencies to resolve potential security issues:
    - `request@2.87.0`
    - Transitive dependencies of `jsonwebtoken@8.2.1`
- Added a static `BoxSDK.getBasicClient()` method to enable creating a client without needing
to specify a client ID and secret (thanks to @cbetta)

## 1.17.0 [2018-05-10]

- Updated dependencies: `request@2.85.0`, `jsonwebtoken@8.2.1`
- Added support for [Storage Policies](./docs/storage-policies.md)
- Added the option to use a Token Store for caching tokens with App Auth using JWT

## 1.16.1 [2018-04-26]

- Fixed a bug where metadata template deletion would not properly return results via callback

## 1.16.0 [2018-04-10]

- Added support for [assigning Retention Policies to Metadata Templates](https://github.com/box/box-node-sdk/blob/main/docs/retention-policies.md#assign-retention-policy)

## 1.15.0 [2018-03-29]

- Fixed [`client.webhooks.validateMessage() and `sdk.validateWebhookMessage()`](https://github.com/box/box-node-sdk/blob/main/docs/webhooks.md#validate-a-webhook-message)
to accept the request body as an `Object`
- Fixed `sdk.configure()` to correct reconfigure all options
- Improved error messages for API errors and added the request object as `error.request` for easier debugging

## 1.14.1 [2018-03-13]

- Fixed a bug when `files.getReadStream()` was called with null options

## 1.14.0 [2018-03-12]

- Added support for [getting a metadata template by ID](./docs/metadata.md#get-by-id)
- Added a `byteRange` option to [file download](./docs/files.md#download-a-file) to support partial file download
- Improved error messages when using promises and in authentication flows

## 1.13.0 [2018-03-01]

- Added support for getting a [stream of file representation contents](./docs/files.md#get-representation-content)
- Switched to using exponential backoff for request retries

## 1.12.1 [2018-01-25]

- Fixed an issue where chunked uploader would not work with response streams from the request library
(0e7014561f9cd0f7f38f98536b3f0c3946231d2e)

## 1.12.0 [2018-01-11]

- Added support for [metadata template deletion](./docs/metadata.md#delete-metadata-template)

## 1.11.0 [2017-12-12]

- Added options to preserve file timestamps on [file upload](./docs/files.md#upload-a-file)
and to rename a file or preserve modification timestamp on [new version upload](./docs/files.md#upload-a-new-version-of-a-file)
- Added [Collaboration Whitelist](./docs/collaboration-whitelist.md) functionality to allow enterprise admins
to control which external users can collaborate on their content
- Added an option to Token Exchange to generate [annotator tokens](./docs/authentication.md#annotator-tokens) for use with Box View

## 1.10.1 [2017-11-28]

- Updated to jsonwebtoken@8.1.0 to fix an issue where some users were getting
an error when using App Auth

## 1.10.0 [2017-01-14]

- Added support for [Terms of Service](./docs/terms-of-service.md) endpoints
- Fixed a bug where receiving a collection without paging parameters from the API
would cause the SDK to throw an exception when using the `iterators` SDK option.
Now, this will return an iterator over the items returned by the API.
- Fixed a bug in Token Exchange where passing multiple scopes would result in an error
- Added support for [getting Representations info on a file](./docs/files.md#get-representation-info)

## 1.9.0 [2017-09-12]

- Fixed token methods to return bluebird Promises instead of native Promises
- Added support for the `notify` and `can_view_path` options on Collaborations

## 1.8.0 [2017-08-21]

- Added support for [Batch API](./docs/client.md#batch-api)
- Fixed a bug where the Event Stream would make more API calls than necessary,
potentially hitting Box API rate limits
- Added Promise support to methods on the SDK object
- Added Node.js version to the User-Agent header that the SDK sends
- Fixed a bug where using multiple Persistent Clients instances could cause some
clients to end up with expired tokens

## 1.7.0 [2017-07-19]

- Add support for passing IP to all token methods, and fixed a bug where a client's IP was not being correctly reported on token refreshes

## 1.6.0 [2017-06-23]

- Added [Recent Items](./docs/recent-items.md) support
- Updated app auth expiration time default value and validation

## 1.5.1 [2017-06-15]

- Revert deep-freezing Config properties, since it was causing errors

## 1.5.0 [2017-06-15]

- Added support for [Token Exchange](./docs/authentication.md#token-exchange),
which allows a client to get downscoped tokens suitable for passing to a browser
app or worker process.
- Ensured deeply-nested Config properties are immutable

## 1.4.2 [2017-05-22]

- Fixed `BoxSDK.getPreconfiguredInstance()` to configure webhook keys

## 1.4.1 [2017-05-22]

- Fixed `BoxSDK.getPreconfiguredInstance()` when app auth setttings are not populated

## 1.4.0 [2017-05-19]

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

## 1.3.0 [2017-01-24]

- Added `BoxSDK.validateWebhookMessage()` and `client.webhooks.validateMessage()` for validating webhook messages from Box

## 1.2.0 [2016-12-12]

- Added methods for all API endpoints; we now have full API coverage :tada:
- Added support for renaming a file or folder on copy
- Added `client.asUser(userID)` and `client.asSelf()` to support making calls on behalf of managed users
- Fixed event streams so they don't go into an infinite error loop when auth expires
- Fixed an error where App Auth clients would not be able to authorize due to clock skew
- Fixed the `mdfilters` parameter in `client.search.query()` to support metadata search
- Cloned options objects to prevent modification of passed-in objects by the SDK
- Added better error messaging to the sample app

## 1.1.0 [2016-09-27]

- Added endpoint to get a file's tasks
- Fixed issues with stream uploads
- Improved performance of file uploads
- Added endpoints to delete files and folders from trash
- Added endpoint to get a trashed folder
- Upgraded request dependency to fix ReDoS vulnerability

## 1.0.0 [2016-07-13]

Initial release.

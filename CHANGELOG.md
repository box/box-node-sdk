# Changelog

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

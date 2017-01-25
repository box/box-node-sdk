# Changelog

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

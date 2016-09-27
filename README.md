Box SDK for Node.js
===================

[![Project Status](http://opensource.box.com/badges/active.svg)](http://opensource.box.com/badges)

A JavaScript interface to the [Box Content API](https://developers.box.com/docs/).
Includes:

- Token management and refreshing
- Easy access to get/modify/delete your content on Box
- File uploads and downloads
- App Users
- Events stream
- A lot more...

```
npm install --save box-node-sdk
```

[JSDocs](https://rawgit.com/box/box-node-sdk/master/docs/jsdoc/index.html)


Basic Usage
-----------

```js
// Initialize SDK
var BoxSDK = require('box-node-sdk');

var sdk = new BoxSDK({
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET'
});

// Create a basic API client
var box = sdk.getBasicClient('USER_ACCESS_TOKEN');

// Get some of that sweet, sweet data!
box.users.get(box.CURRENT_USER_ID, null, function(err, currentUser) {
  if(err) throw err;
  console.log('Hello, ' + currentUser.name + '!');
});
```


Initializing the SDK
--------------------

The first thing you'll need to do is initialize the SDK with your client credentials. Client ID and secret are required, and the SDK will throw if they're not provided.

```js
var BoxSDK = require('box-node-sdk');

var sdk = new BoxSDK({
  clientID: 'CLIENT_ID', // required
  clientSecret: 'CLIENT_SECRET' // required
});
```

In addition, the SDK constructor accepts options for configuring your instance of the SDK. Here is where you can set things like strictSSL, retry intervals, and more. See [config.js](https://github.com/box/box-node-sdk/blob/master/lib/util/config.js#L19) for a list of all supported properties.

OAuth2
------

### Getting Tokens

Acquires token info using an authorization code.

```js
sdk.getTokensAuthorizationCodeGrant(authCode, null, function(err, tokenInfo) {
	// tokenInfo: {
	//  accessToken: 'ACCESS_TOKEN',
	//  refreshToken: 'REFRESH_TOKEN',
	//  acquiredAtMS: 1464129218402,
	//  accessTokenTTLMS: 3600000,
	// }
});
```

### Refreshing Tokens

Refreshes the access and refresh tokens for a given refresh token.

```js
sdk.getTokensRefreshGrant('ACCESS_TOKEN_OR_REFRESH_TOKEN', function(err, tokenInfo) {
	// ...
});
```

### Revoking Tokens

Revokes a token pair associated with a given access or refresh token.

> Note: Revoking the access token revokes the refresh token as well, and vice versa.

```js
sdk.revokeTokens('ACCESS_TOKEN_OR_REFRESH_TOKEN', function(err) {
	// ...
});
```

Creating API Clients
--------------------

Clients are used to communicate with the API on behalf of a user. All endpoints require some sort of authentication, which can be either as a user or an anonymous user via client credentials.

Box supports four different types of client:

- **Basic Client:** Simple, makes calls via the given access token
- **Persistent Client:** More advanced, will refresh its tokens as needed and persist them via some token store
- **Anonymous Client:** Uses shared client tokens, use for logged out users
- **App Auth Client:** Uses the app auth JWT grant to act on behalf of app-managed users.

### Basic Client

Returns a Box Client with a Basic API Session. The client is able to make requests on behalf of a user. A basic session has no access to a user's refresh token. Because of this, once the session's tokens expire the client cannot recover and a new session will need to be generated.

```js
var box = sdk.getBasicClient('ACCESS_TOKEN');
```

### Persistent Client

Returns a Box Client with a persistent API session. A persistent API session helps manage the user's tokens, and can refresh them automatically if the access token expires. If a central data-store is given, the session can read & write tokens to it.

> NOTE: If tokenInfo or tokenStore are formatted incorrectly, this method will throw an error. If you haven't explicitly created either of these objects or are otherwise not completely confident in their validity, you should wrap your call to getPersistentClient in a try-catch to handle any potential errors.

```js
var box = sdk.getPersistentClient(tokenInfo[, tokenStore]);
```

#### Optional: Token Store

The token store is the interface used by persistent clients to interact with the consumer app's central storage layer. For a token store to be valid, it must have the following three methods:

```js
store.read(function(err, data) {}); // read TokenInfo from app central store.
store.write(tokenInfo, function(err, data) {}); // write TokenInfo to the app's central store.
store.clear(function(err, data) {}); // delete TokenInfo from the app's central store.
```

Notice that these methods don't pass in identifying information as arguments. You'll most likely need to create them on-demand for each client.

### Anonymous Client

Returns a Box Client with an Anonymous API Session. An Anonymous API Session has access to an anonymous client-credentials token, which isn't tied to any specific user. Because of this, the client will only have access to endpoints that allow client-credential tokens. All Anonymous API Sessions share the same tokens, which allows them to refresh them efficiently and reduce load on both the application and the API.

```js
var box = sdk.getAnonymousClient();
```

### App Auth Client

App Auth allows an app to fully manage the Box accounts of its users; they do not
have direct login credentials to Box and all operations are performed through the API
using a JWT grant.

```js
var sdk = new BoxSDK({
	clientID: 'CLIENT_ID',
	clientSecret: 'CLIENT_SECRET',
	appAuth: {
		keyID: 'PUBLIC_KEY_ID',
		privateKey: 'PRIVATE_KEY',
		passphrase: 'PRIVATE_KEY_PASSPHRASE'
	}
});

// Get the enterprise client, used to create and manage app user accounts
sdk.getAppAuthClient('enterprise', 'APP_ENTERPRISE_ID');
```

Accessing Data on Box
---------------------

### Resource Managers

```js
box.users.get(box.CURRENT_USER_ID, null, function(err, currentUser) {});
box.folders.update('123', { name: 'New Folder Name' }, function(err, folder) {});
box.files.uploadFile('123', 'bicycle.png', fileData, function(err, file) {});
box.comments.delete('456', function(err) {});
```

The following resources are supported by the SDK:

- [Collaborations](https://github.com/box/box-node-sdk/blob/master/docs/collaborations.md)
- [Collections](https://github.com/box/box-node-sdk/blob/master/docs/collections.md)
- [Comments](https://github.com/box/box-node-sdk/blob/master/docs/comments.md)
- [Events](https://github.com/box/box-node-sdk/blob/master/docs/events.md)
- [Files](https://github.com/box/box-node-sdk/blob/master/docs/files.md)
- [Folders](https://github.com/box/box-node-sdk/blob/master/docs/folders.md)
- Metadata
- [Search](https://github.com/box/box-node-sdk/blob/master/docs/search.md)
- [Shared Items](https://github.com/box/box-node-sdk/blob/master/docs/shared-items.md)
- [Users](https://github.com/box/box-node-sdk/blob/master/docs/users.md)

### Helpers

#### Get/Post/Update/Delete

Box exposes some bare request methods for constructing your own API calls. These can be useful for adding your own API calls that aren't yet explicitly supported by the SDK.

```js
box.get('/files/123', {qs: {fields: 'id,name'}}, function(err, response) {});
box.put('/files/123', {body: {name: 'New File Name'}}, function(err, response) {});
box.del('/files/123', null, function(err, response) {});
```

#### Collaboration Roles

All valid collaboration roles. These are helpful when creating & updating collaborators.

```js
BoxClient.prototype.collaborationRoles = {
	EDITOR: 'editor',
	VIEWER: 'viewer',
	PREVIEWER: 'previewer',
	UPLOADER: 'uploader',
	PREVIEWER_UPLOADER: 'previewer uploader',
	VIEWER_UPLOADER: 'viewer uploader',
	CO_OWNER: 'co-owner'
};
```

#### Shared Access Levels

All valid values that the API accepts for setting shared access levels. To be used when creating and editing shared links, upload emails, etc.

```js
BoxClient.prototype.accessLevels = {
	OPEN: {access: 'open'},
	COLLABORATORS: {access: 'collaborators'},
	COMPANY: {access: 'company'},
	DEFAULT: {},
	DISABLED: null
};
```

#### Current User ID

An easy reference when accessing/modifying the current user.

```js
BoxClient.prototype.CURRENT_USER_ID = 'me';
```

Events
------

The SDK currently emits the following events:

### 'response'

The response event is fired anytime the SDK receives a response from the API. This includes requests made for both resources and tokens. The event is fired with an `err` object (populated when there is a request/response error) and a `response` object (populated when there was a response), similar to our API request callbacks.


Questions, Bugs, and Feature Requests?
--------------------------------------

[Browse the issues tickets](https://github.com/box/box-node-sdk/issues)! Or, if that doesn't work, [file a new one](https://github.com/box/box-node-sdk/issues/new) and someone will get back to you.


Developing Box SDK for Node.js
------------------------------

1. Clone this repo.
1. Run `npm install`.
1. Run `npm test` to ensure everything is working.
1. Make some changes.

The following commands are available:

* `npm test` - runs linting and unit tests (plus code coverage)
* `npm run lint` - runs just linting
* `npm run docs` - creates JSDoc documentation
* `npm run deps` - updates remote dependencies


Support
-------

Need to contact us directly? You can post to the
[Box Developer Forum](https://community.box.com/t5/Developer-Forum/bd-p/DeveloperForum);
please be sure to mention the Node.js SDK in the subject.

Copyright and License
---------------------

Copyright 2016 Box, Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Authentication
==============

The Box API uses OAuth2 for authentication, which can be difficult to implement.
The SDK makes it easier by providing classes that handle obtaining tokens and
automatically refreshing them when possible. See the
[OAuth 2 overview](https://docs.box.com/reference#oauth-2-overview) for a detailed
overview of how the Box API handles authentication.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Ways to Authenticate](#ways-to-authenticate)
  - [Developer Token](#developer-token)
  - [Server Auth with JWT](#server-auth-with-jwt)
  - [Traditional 3-Legged OAuth2](#traditional-3-legged-oauth2)
    - [Token Store](#token-store)
  - [Box View Authentication with App Tokens](#box-view-authentication-with-app-tokens)
  - [Anonymous Authentication](#anonymous-authentication)
- [As-User](#as-user)
- [Token Exchange](#token-exchange)
    - [Annotator Tokens](#annotator-tokens)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Ways to Authenticate
--------------------

### Developer Token

The fastest way to get started using the API is with developer tokens. A
developer token is simply a short-lived access token that cannot be refreshed
and can only be used with your own account. Therefore, they're only useful for
testing an app and aren't suitable for production. You can obtain a developer
token from your application's
[developer console][dev-console] page.

The following example creates an API client with a developer token:

```js
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
	clientID: 'YOUR-CLIENT-ID',
	clientSecret: 'YOUR-CLIENT_SECRET'
});

var client = sdk.getBasicClient('YOUR-DEVELOPER-TOKEN');
```

[dev-console]: https://app.box.com/developers/console

### Server Auth with JWT

Server auth allows your application to authenticate itself with the Box API
for a given enterprise.  By default, your application has a
[Service Account](https://developer.box.com/docs/service-account)
that represents it and can perform API calls.  The Service Account is separate
from the Box accounts of the application developer and the enterprise admin of
any enterprise that has authorized the app — files stored in that account are
not accessible in any other account by default, and vice versa.

If you generated your public and private keys automatically through the
[Box Developer Console][dev-console], you can use the JSON file created there
to configure your SDK instance and create a client to make calls as the
Service Account:

```js
var BoxSDK = require('box-node-sdk');
var jsonConfig = require('/path/to/config.json');
var sdk = BoxSDK.getPreconfiguredInstance(jsonConfig);

var serviceAccountClient = sdk.getAppAuthClient('enterprise');
```

Otherwise, you'll need to provide the necessary configuration fields directly
to the SDK constructor:

```js
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
	clientID: 'YOUR-CLIENT-ID',
	clientSecret: 'YOUR-CLIENT_SECRET',
	appAuth: {
		keyID: 'YOUR-KEY-ID',
		privateKey: 'YOUR-PRIVATE_KEY',
		passphrase: 'YOUR-PRIVATE-KEY-PASSPHRASE'
	}
});

var serviceAccountClient = sdk.getAppAuthClient('enterprise', 'YOUR-ENTERPRISE-ID');
```

App auth applications also often have associated App Users, which are
[created and managed directly by the application](https://developer.box.com/docs/app-users)
— they do not have normal login credentials, and can only be accessed through
the Box API by the application that created them.  You may authenticate as the
Service Account to provision and manage users, or as an individual app user to
make calls as that user.  See the [API documentation](https://docs.box.com/docs/getting-started-box-platform)
and [sample app](https://github.com/box/box-node-sdk/blob/master/examples/app-auth)
for detailed instructions on how to use app auth.

Clients for making calls as an App User can be created with the same SDK
instance as in the above examples, similarly to creating a Service Account client:

```js
var appUserClient = sdk.getAppAuthClient('user', 'YOUR-APP-USER-ID');
```

### Traditional 3-Legged OAuth2

If your application needs to integrate with existing Box users who will provide
their login credentials to grant your application access to their account, you
will need to go through the standard OAuth2 login flow.  A detailed guide for
this process is available in the
[Authentication with OAuth API documentation](https://developer.box.com/docs/oauth-20).

Using an auth code is the most common way of authenticating with the Box API for
existing Box users, to integrate with their accounts.
Your application must provide a way for the user to login to Box (usually with a
browser or web view) in order to obtain an auth code.

After a user logs in and grants your application access to their Box account,
they will be redirected to your application's `redirect_uri` which will contain
an auth code. This auth code can then be used along with your client ID and
client secret to establish an API connection.  A `PersistentClient` will
automatically refresh the access token as needed.

```js
var BoxSDK = require('box-node-sdk');
var TokenStore = require('TOKEN-STORE-IMPLEMENTATION');
var sdk = new BoxSDK({
	clientID: 'YOUR-CLIENT-ID',
	clientSecret: 'YOUR-CLIENT_SECRET'
});

sdk.getTokensAuthorizationCodeGrant('YOUR-AUTH-CODE', null, function(err, tokenInfo) {

	if (err) {
		// handle error
	}

	var tokenStore = new TokenStore();
	tokenStore.write(tokenInfo, function(storeErr) {

		if (storeErr) {
			// handle token write error
		}

		var client = sdk.getPersistentClient(tokenInfo, tokenStore);
	});
});
```

#### Token Store

In order to maintain authentication and ensure that your users do not need to
log in again every time they use your application, you should persist their
token information to some sort of durable store (e.g. a database).  The SDK
provides a `TokenStore` interface that allows you to read and write tokens to
whatever store your application uses at the correct points in the SDK's token
logic.  The interface requires three methods:

```js
function TokenStore() {
	// The token store constructor should create a specific store instance
	// for the user in question — it may need to take in a user ID or other
	// identifier.
}

TokenStore.prototype.read = function(callback) {
	// Read the user's tokens from your data store and
	// call the callback.
	// callback(error) if some error occured
	// callback(null, tokenInfo) if the read succeeded
};

TokenStore.prototype.write = function(tokenInfo, callback) {
	// Write the token information to the store.
	// The tokenInfo argument is an Object, and can be
	// serialized as JSON for storage.
	// Call the callback after the write.
	// callback(error) if some error occured
	// callback(null) if the write succeeded
};

TokenStore.prototype.clear = function(callback) {
	// Delete the user's token information from the store,
	// and call the callback after the write.
	// callback(error) if some error occured
	// callback(null) if the deletion succeeded
};
```

### Box View Authentication with App Tokens

[Box View](https://developer.box.com/docs/getting-started-box-view)
uses a long-lived access token that is generated from the
[Box Developer Console][dev-console] to make API calls.  These access tokens
cannot be automatically refreshed from the SDK, and must be manually changed in
your application code.

To use the primary or secondary access token generated in the Developer Console,
simply create a basic client with that token:

```js
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
	clientID: 'YOUR-CLIENT-ID',
	clientSecret: 'unused'
});

var client = sdk.getBasicClient('YOUR-APP-TOKEN');
```

### Anonymous Authentication

Additionally, you may authenticate as a client without an attached user,
which can be used to make API calls that do not require a logged-in user (e.g.
open shared links).  This functionality is only available to approved applications.

```js
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
	clientID: 'YOUR-CLIENT-ID',
	clientSecret: 'YOUR-CLIENT_SECRET'
});

var client = sdk.getAnonymousClient();
```

As-User
-------

The As-User header is used by enterprise admins to make API calls on behalf of
their enterprise's users. This requires the API request to pass an
`As-User: USER-ID` header. For more details see the
[documentation on As-User](https://developer.box.com/reference#as-user-1).

The following examples assume that the `client` has been instantiated with an
access token belonging to an admin-level user or Service Account with appropriate
privileges to make As-User calls.

The `asUser(userID)` method sets up the client to impersonate a given user.
All calls made with this instance of client will be made in context of the
impersonated user.

```js
client.asUser('USER-ID');
client.folders.getItems('0')
	.then(items => {
		// items contains the collection of files and folders
		// in the root folder of the user with USER-ID
	});
```

The `asSelf()` method removes the As-User header and returns the client to
making calls as the admin user or Service Account it was initialized as.

```js
client.asSelf();
```

Token Exchange
--------------

You can exchange a client's access token for one with a lower scope, in order
to restrict the permissions for a child client or to pass to a less secure
location (e.g. a browser-based app).  This is useful if you want to use the
[Box UI Kits](https://developer.box.com/docs/box-ui-kit), since they generally
do not need full read/write permissions to run.

To exchange the token held by a client for a new token with only `item_preview`
scope, restricted to a single file, suitable for the
[Content Preview UI Kit](https://developer.box.com/docs/box-content-preview):

```js
client.exchangeToken('item_preview', 'https://api.box.com/2.0/files/123456789')
	.then(tokenInfo => {
		// tokenInfo.accessToken contains the new downscoped access token
	});
```

To exchange the client's token for one with scopes to upload and delete items, but not to view their contents,
which would be suitable for an less-trusted server-side process;
```js
client.exchangeToken(['item_upload', 'item_delete'])
	.then(tokenInfo => {
		// tokenInfo.accessToken contains the new downscoped access token
	});
```

#### Annotator Tokens

To generate an annotator token for use with
[Box View annotations](https://developer.box.com/docs/getting-started-with-new-box-view#section-annotations),
pass the `actor` options to the token exchange method:

```js
var options = {
	actor: {
		id: 'EXTERNAL_IDENTIFIER',
		name: 'Jane Doe'
	}
};
client.exchangeToken('item_preview', 'https://api.box.com/2.0/files/123456', options)
	.then(tokenInfo => {
		// tokenInfo.accessToken contains the new annotator token
	});
```

This will attach an external user name and ID to annotations made with the token,
in order to attribute them to someone who does not have a Box account.

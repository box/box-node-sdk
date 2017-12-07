Authentication
==============

The Box API uses OAuth2 for authentication, which can be difficult to implement.
The SDK makes it easier by providing classes that handle obtaining tokens and
automatically refreshing them. See the [OAuth 2 overview](https://docs.box.com/reference#oauth-2-overview) for detailed
overview of authentication.

* [Developer Tokens](#developer-tokens)
* [OAuth2 Authentication](#oauth2-authentication)
* [App User Authentication](#app-user-authentication)
* [As-User](#as-user)
* [Token Exchange](#token-exchange)
* [Anonymous Authentication](#anonymous-authentication)

Developer Tokens
----------------

The fastest way to get started using the API is with developer tokens. A
developer token is simply a short-lived access token that cannot be refreshed
and can only be used with your own account. Therefore, they're only useful for
testing an app and aren't suitable for production. You can obtain a developer
token from your application's
[developer console](https://app.box.com/developers/console).

The following example creates an API client with a developer token:

```js
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
	clientID: 'YOUR-CLIENT-ID',
	clientSecret: 'YOUR-CLIENT_SECRET'
});
var client = sdk.getBasicClient('YOUR-DEVELOPER-TOKEN');
```

OAuth2 Authentication
---------------------

Using an auth code is the most common way of authenticating with the Box API for
existing Box users, for integrating with their accounts.
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

App User Authentication
-----------------------

App Users allows your application to provision and control Box accounts that do
not have an associated login and can only be accessed through the Content API by
the controlling application.  You may authenticate as the service account to
provision and manage users, or as an individual app user to make calls as that
user.  See the [API documentation](https://docs.box.com/docs/getting-started-box-platform)
and [sample app](https://github.com/box/box-node-sdk/blob/master/examples/app-auth)
for detailed instructions on how to use app auth.

Service account client example:
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

App User client example:
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
var appUserClient = sdk.getAppAuthClient('user', 'YOUR-APP-USER-ID');
```

To use the JSON provided by the developer console:
```js
var BoxSDK = require('box-node-sdk');
var sdk = BoxSDK.getPreconfiguredInstance(jsonFromDeveloperConsole);
```

As-User
-------

The As-User header is used by enterprise admins to make API calls on behalf of their enterprise's users. This requires the API request to pass an `As-User: USER-ID` header. For more details see the [documentation on As-User](https://developer.box.com/v2.0/reference#as-user-1).

The following examples assumes that the `client` has been instantiated with an access token belonging to an admin level user.

As-User Example:
```js
client.asUser('USER-ID');
```
This method sets up the client to impersonate their user. All calls made with this instance of client will be made in context of the impersonated user.

Removing the As-User Context:
```js
client.asSelf();
```
This method revokes the As-User context and returns to making calls as the user who owns the client's access token.

Token Exchange
--------------

You can exchange a client's access token for one with a lower scope, in order to restrict the permissions for
a child client or to pass to a less secure location (e.g. a browser-based app).  This is useful if you want
to use the [Box UI Kits](https://developer.box.com/docs/box-ui-kit), since they generally do not need full
read/write permissions to run.

To exchange the token held by a client for a new token with only `item_preview` scope, restricted to a single file,
suitable for the [Content Preview UI Kit](https://developer.box.com/docs/box-content-preview):
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

Anonymous Authentication
------------------------

Additionally, you may authenticate as a client without an attached user,
which can be used to make API calls that do not require a logged-in user (e.g.
open shared links).

```js
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
	clientID: 'YOUR-CLIENT-ID',
	clientSecret: 'YOUR-CLIENT_SECRET'
});
var client = sdk.getAnonymousClient();
```

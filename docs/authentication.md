Authentication
==============

The Box API uses OAuth2 for authentication, which can be difficult to implement.
The SDK makes it easier by providing classes that handle obtaining tokens and
automatically refreshing them. See the [OAuth 2 overview](https://docs.box.com/reference#oauth-2-overview) for detailed
overview of authentication.

Ways to Authenticate
--------------------

### Developer Tokens

The fastest way to get started using the API is with developer tokens. A
developer token is simply a short-lived access token that cannot be refreshed
and can only be used with your own account. Therefore, they're only useful for
testing an app and aren't suitable for production. You can obtain a developer
token from your application's [developer
console](https://cloud.app.box.com/developers/services).

The following example creates an API client with a developer token:

```js
var BoxSDK = require('box-node-sdk');
var sdk = new BoxSDK({
	clientID: 'YOUR-CLIENT-ID',
	clientSecret: 'YOUR-CLIENT_SECRET'
});
var client = sdk.getBasicClient('YOUR-DEVELOPER-TOKEN');
```

### Normal Authentication

Using an auth code is the most common way of authenticating with the Box API.
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

### Anonymous Authentication

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

### App User Authentication

App Users allows your application to provision and control Box accounts that do
not have an associated login and can only be accessed through the Content API by
the controlling application.  You may authenticate as the app enterprise to
provision and manage users, or as an individual app user to make calls as that
user.  See the [API documentation](https://docs.box.com/docs/getting-started-box-platform)
and [sample app](https://github.com/box/box-node-sdk/blob/master/examples/app-auth)
for detailed instructions on how to use app auth.

Enterprise admin client example:
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
var adminClient = sdk.getAppAuthClient('enterprise', 'YOUR-ENTERPRISE-ID');
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

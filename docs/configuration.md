# Configuration

The `BoxSDKNode` is the base object used to configure [client](./client.md).

## Configure Proxy 

To set up your proxy, add your proxy settings to the `BoxSDK` object as shown below. You must include the proxy url, which should contain the `protocol`, `url`, and `port`, which in the case below are `http`, `sample.proxyurl.com` and `80` respectively. While the port, username and password are optional, the protocol and url are required. If your proxy does not require authentication, you can set the username and password to null or omit the parameters completely. The supported proxy protocols are `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http` and `pac+https`.

```javascript
let sdk = new BoxSDK({
    clientID: 'YOUR-CLIENT-ID',
    clientSecret: 'YOUR-CLIENT_SECRET',
    proxy: {
        url: 'http://sample.proxyurl.com:80',
        username: 'sample-username',
        password: 'sample-password',
    }
});
```

## Configure how client retries calls and handles timeouts

You can confugure how many retries, how long to wait between retries or upload timeout:

```javascript
sdk = BoxSDKNode.getPreconfiguredInstance(APP_SETTINGS);
var additonalParams = {
	numMaxRetries: 3,
	retryIntervalMS: 3000,
	uploadRequestTimeoutMS: 90000
};
sdk.configure(additonalParams);
```

The `numMaxRetries` sets the maximum  number of retries when API request fails. Default value is `5`.

The `retryIntervalMS` is used to calculate the wait time between retries. It is a number of miliseconds. SDK uses `Exponential backoff` algorithm 
to calculate the wait time. Default value is `2000` ms.

The `uploadRequestTimeoutMS` sets the timeout after which an upload request is aborted Default value is `60000` ms.

The `configure` method appends config values to existing configuration. So if you want you can configure sdk in several steps:

```javascript
sdk = BoxSDKNode.getPreconfiguredInstance(APP_SETTINGS);
sdk.configure({
	retryIntervalMS: 3000
});

// you need to extend number of retires in some scenario
sdk.configure({
    numMaxRetries: 10
});
```

## Configure Base URL

The Base Url is the URL that is used by the SDK to access Box. The default base URL are already defined
for the `BoxSDKNode` but if you want to change default behaviour use the `configure` method on
the sdk instance:

```javascript
sdk = BoxSDKNode.getPreconfiguredInstance(APP_SETTINGS);
var additonalParams = {
	apiRootURL: 'https://my.company.url.com',
	uploadAPIRootURL: 'https://my.company.url.com/upload',
	authorizeRootURL: 'https://my.company.url.com/authorize'
};
sdk.configure(additonalParams);
```

The `apiRootURL` sets to what URL all API calls will be directed.
Final URL used to access Box is built using `apiRootURL` and the API Version (`2.0`). For example by default the `apiRootURL`
is set to `https://api.box.com` so after appending currently supported API version the URL is : `https://api.box.com/2.0`.

The `uploadAPIRootURL` is used to configure the base URL used while uploading files.
Final URL used to access Box is built using `uploadAPIRootURL` and API Version (`2.0`). For example by default the `uploadAPIRootURL`
is set to `https://upload.box.com/api` so after appending currently supported API version the URL is : `https://upload.box.com/api/2.0`.

The `authorizeRootURL` is used to configure the base URL used to obtain OAuth2 authorization tokens.


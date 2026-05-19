# Configuration

The `BoxSDKNode` is the base object used to configure [client](./client.md).

- [Configure Proxy](#configure-proxy)
- [Network timeouts](#network-timeouts)
  - [Default behavior](#default-behavior)
  - [Timeout for API calls](#timeout-for-api-calls)
  - [Upload request timeout](#upload-request-timeout)
- [Configure retries](#configure-retries)
- [Disable stream PassThrough for streaming responses](#disable-stream-passthrough-for-streaming-responses)
- [Configure Base URL](#configure-base-url)

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

## Network timeouts

The legacy manual SDK uses the [`@cypress/request`](https://www.npmjs.com/package/@cypress/request) library for HTTP calls.

### Default behavior

> **Important:** The legacy manual SDK does **not** apply a default timeout for most API calls. Unless you configure a timeout, requests can wait indefinitely for a connection and response.

The only SDK-specific timeout setting is for **file uploads** (see [Upload request timeout](#upload-request-timeout) below). For all other API calls, use the `request` options described in the next section.

When a configured timeout is exceeded, the request is aborted and the promise rejects with a request error.

### Timeout for API calls

Non-upload API calls use the underlying `@cypress/request` options from the SDK `request` configuration. Set `timeout` (milliseconds) on that object to apply it to every API call made by clients created from this SDK instance.

**At SDK initialization:**

```javascript
var sdk = new BoxSDK({
  clientID: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  request: {
    timeout: 30000, // 30 seconds
  },
});
```

**Or after initialization with `configure`:**

```javascript
sdk.configure({
  request: {
    timeout: 30000,
  },
});
```

`timeout` follows the [request library `timeout` option](https://github.com/request/request#requestoptions-callback) (a single number is the maximum time to wait for the full request; you can also use an object with `connect` and `socket` limits).

This is separate from `uploadRequestTimeoutMS`, which applies only to upload requests.

### Upload request timeout

Use `uploadRequestTimeoutMS` on the SDK instance via [`configure`](https://github.com/box/box-node-sdk/blob/main/src/box-sdk-node.ts) to limit how long an upload request may run. The default is **`60000` ms** (60 seconds).

```javascript
sdk = BoxSDKNode.getPreconfiguredInstance(APP_SETTINGS);
sdk.configure({
  uploadRequestTimeoutMS: 90000,
});
```

## Configure retries

You can configure how many retries and how long to wait between retries:

```javascript
sdk = BoxSDKNode.getPreconfiguredInstance(APP_SETTINGS);
var additonalParams = {
  numMaxRetries: 3,
  retryIntervalMS: 3000,
};
sdk.configure(additonalParams);
```

The `numMaxRetries` sets the maximum number of retries when an API request fails. Default value is `5`.

The `retryIntervalMS` is used to calculate the wait time between retries. It is a number of milliseconds. The SDK uses an exponential backoff algorithm to calculate the wait time. Default value is `2000` ms.

The `configure` method appends config values to existing configuration. You can configure the SDK in several steps:

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

## Disable stream PassThrough for streaming responses

By default the SDK uses `PassThrough` stream to handle streaming responses. It helps to support delayed reading of the response body, but in some cases it can cause memory leaks or not fully works. To disable `PassThrough` stream use the `disableStreamPassThrough` method:

```javascript
sdk = BoxSDKNode.getPreconfiguredInstance(APP_SETTINGS);
sdk.configure({
    disableStreamPassThrough: true
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


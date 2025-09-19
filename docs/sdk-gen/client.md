# Client

This is the central entrypoint for all SDK interaction. The BoxClient houses all the API endpoints
divided across resource managers.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Make custom HTTP request](#make-custom-http-request)
  - [JSON request](#json-request)
  - [Multi-part request](#multi-part-request)
  - [Binary response](#binary-response)
- [Additional headers](#additional-headers)
  - [As-User header](#as-user-header)
  - [Suppress notifications](#suppress-notifications)
  - [Custom headers](#custom-headers)
- [Custom Base URLs](#custom-base-urls)
- [Custom Agent Options](#custom-agent-options)
- [Interceptors](#interceptors)
- [Use Proxy for API calls](#use-proxy-for-api-calls)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Make custom HTTP request

You can make custom HTTP requests using the `client.makeRequest()` method.
This method allows you to make any HTTP request to the Box API. It will automatically use authentication and
network configuration settings from the client.
The method accepts a `FetchOptions` object as an argument and returns a `FetchResponse` object.

## JSON request

The following example demonstrates how to make a custom POST request to create a new folder in the root folder.

```js
const response: FetchResponse = await client.makeRequest(
    { method: "POST",
      url: "https://api.box.com/2.0/folders",
      data: {name: newFolderName, parent: {id: "0"}}
    } satisfies FetchOptionsInput
);
console.log('Received status code: ', response.status)
console.log('Created folder name: ', getSdValueByKey(response.content, "name"))
```

## Multi-part request

The following example demonstrates how to make a custom multipart request that uploads a file to a folder.

```js
const multipartAttributes = {name: "newFileName", parent: { id: "0" }};
const uploadFileResponse: FetchResponse = await client.makeRequest({ method: "POST", url: "https://upload.box.com/api/2.0/files/content", contentType: "multipart/form-data", multipartData: [{ partName: "attributes", data: multipartAttributes } satisfies MultipartItem, { partName: "file", fileStream: fileContentStream } satisfies MultipartItem] } satisfies FetchOptionsInput);

console.log('Received status code: ', response.status)
```

## Binary response

The following example demonstrates how to make a custom request that expects a binary response.
It is required to specify the `responseFormat` parameter in the `FetchOptions` object to "binary".

```js
const response: FetchResponse = await client.makeRequest({ method: "GET", url: "".concat("https://api.box.com/2.0/files/", uploadedFile.id, "/content") as string, responseFormat: "binary" as ResponseFormat } satisfies FetchOptionsInput);
console.log('Received status code: ', response.status)
const fileWriteStream = fs.createWriteStream('file.pdf');
response.content.pipe(fileWriteStream);
```

# Additional headers

BoxClient provides a convenient methods, which allow passing additional headers, which will be included
in every API call made by the client.

## As-User header

The As-User header is used by enterprise admins to make API calls on behalf of their enterprise's users.
This requires the API request to pass an As-User: USER-ID header. For more details see the [documentation on As-User](https://developer.box.com/en/guides/authentication/oauth2/as-user/).

The following example assume that the client has been instantiated with an access token belonging to an admin-level user
or Service Account with appropriate privileges to make As-User calls.

Calling the `client.withAsUserHeader()` method creates a new client to impersonate user with the provided ID.
All calls made with the new client will be made in context of the impersonated user, leaving the original client unmodified.

<!-- sample x_auth init_with_as_user_header -->

```js
const userClient = client.withAsUserHeader('1234567');
```

## Suppress notifications

If you are making administrative API calls (that is, your application has “Manage an Enterprise”
scope, and the user signing in is a co-admin with the correct "Edit settings for your company"
permission) then you can suppress both email and webhook notifications. This can be used, for
example, for a virus-scanning tool to download copies of everyone’s files in an enterprise,
without every collaborator on the file getting an email. All actions will still appear in users'
updates feed and audit logs.

> **Note:** This functionality is only available for approved applications.

Calling the `client.withSuppressedNotifications()` method creates a new client.
For all calls made with the new client the notifications will be suppressed.

```js
const newClient = client.withSuppressedNotifications();
```

## Custom headers

You can also specify the custom set of headers, which will be included in every API call made by client.
Calling the `client.withExtraHeaders()` method creates a new client, leaving the original client unmodified.

```js
const newClient = client.withExtraHeaders({ ['customHeader']: 'customValue' });
```

# Custom Base URLs

You can also specify the custom base URLs, which will be used for API calls made by client.
Calling the `client.withCustomBaseUrls()` method creates a new client, leaving the original client unmodified.

```js
const newClient = client.withCustomBaseUrls({
  baseUrl: 'https://api.box.com',
  uploadUrl: 'https://upload.box.com/api',
  oauth2Url: 'https://account.box.com/api/oauth2',
});
```

# Custom Agent Options

You can also specify the custom agent options, which will be used for API calls made by client.
Calling the `client.withCustomAgentOptions()` method creates a new client, leaving the original client unmodified.

```js
const options: AgentOptions = {};

const newClient = client.withCustomAgentOptions(options);
```

# Interceptors

You can specify custom interceptors - methods that will be called just before making a request and right after
receiving a response from the server. Using these function allows you to modify the request payload and response.
Interceptor interface accepts two methods with the following signatures:

```js
beforeRequest(options: FetchOptions): FetchOptions;
afterRequest(response: FetchResponse): FetchResponse;
```

You can apply more than one interceptor to the client by passing a list of interceptors to apply.
Calling the `client.withInterceptors()` method creates a new client, leaving the original client unmodified.

```js
function beforeRequest(options: FetchOptions): FetchOptions {
  return {
    method: options.method,
    headers: options.headers,
    params: { ...options.params, ...{ ['fields']: 'role' } },
    data: options.data,
    fileStream: options.fileStream,
    multipartData: options.multipartData,
    contentType: options.contentType,
    responseFormat: options.responseFormat,
    auth: options.auth,
    networkSession: options.networkSession,
    cancellationToken: options.cancellationToken,
  };
}
function emptyAfterRequest(response: FetchResponse): FetchResponse {
  return response;
}

const clientWithInterceptor: BoxClient = client.withInterceptors([
  {
    beforeRequest: beforeRequest,
    afterRequest: emptyAfterRequest,
  },
]);
```

# Use Proxy for API calls

In order to use a proxy for API calls, calling the `client.withProxy(proxyConfig)` method creates a new client, leaving the original client unmodified, with the username and password being optional.

If both custom agent options and proxy are provided, the proxy will take precedence.

**Note:** We are only supporting http/s proxies with basic authentication. NTLM and other authentication methods are not supported.

```js
newClient = client.withProxy({
  url: 'http://127.0.0.1:1234/',
  username: 'user',
  password: 'password',
});
```

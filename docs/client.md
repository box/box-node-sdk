Client
======

The client object is the primary interface for making API calls through the SDK.
It automatically manages API access token upkeep when possible, and has a number of
options for altering the way calls are made.  The various ways of creating an authenticated
client are described in the [Authentication documentation](authentication.md).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Custom API Calls](#custom-api-calls)
  - [GET](#get)
  - [POST](#post)
  - [PUT](#put)
  - [DELETE](#delete)
  - [OPTIONS](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Custom API Calls
----------------

The client allows users to make API calls to any arbitrary API endpoint or URL,
in order to provide flexibility for developers who may want to make calls not directly
supported by the convenience methods provided by the managers (e.g. `client.folders.get()`).

These API calls will be sent with the client's access token and any other client settings,
but requires passing in the URL, full request parameters, and handling the full response
manually.

The URL argument for custom calls can be either an API endpoint path (e.g. `'/files/1234'`)
or a full URL (e.g. `'https://api.box.com/2.0/files/1234'`).

The `params` object contains
[request parameters](https://github.com/request/request#requestoptions-callback)
and is often useful for passing query string, request body, or header parameters.

The response object that results from the call is an instance of
[http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage).
By default the entire response will have already been read and the body will be attached
as `response.body`.

### GET

To make a GET call, call the
[`client.get(url, params, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/BoxClient.html#get)
method with the URL of the endpoint and the request params.

```js
var params = {
    qs: {
        fields: 'name,id'
    }
};

client.get('/files/1234', params, function(err, response) {

    if (err) {
        // handle error
    }

    console.log(response.body);
});
```

### POST

To make a POST call, call the
[`client.post(url, params, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/BoxClient.html#post)
method with the URL of the endpoint and the request params.

```js
var params = {
    body: {
        name: 'My New Folder',
        parent: {
            id: '0'
        }
    }
};

client.post('/folders', params, function(err, response) {

    if (err) {
        // handle error
    }

    console.log(response.body);
});
```

### PUT

To make a PUT call, call the
[`client.put(url, params, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/BoxClient.html#put)
method with the URL of the endpoint and the request params.

```js
var params = {
    body: {
        name: 'Changed Folder Name'
    }
};

client.put('/folders/1234', params, function(err, response) {

    if (err) {
        // handle error
    }

    console.log(response.body);
});
```

### DELETE

To make a DELETE call, call the
[`client.del(url, params, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/BoxClient.html#del)
method with the URL of the endpoint and the request params.

```js
client.del('/folders/1234', null, function(err, response) {

    if (err) {
        // handle error
    }

    console.log(response.body);
});
```

### OPTIONS

To make an OPTIONS call, call the
[`client.options(url, params, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/BoxClient.html#options)
method with the URL of the endpoint and the request params.

```js
client.options('/files/content', null, function(err, response) {

    if (err) {
        // handle error
    }

    console.log(response.body);
});
```

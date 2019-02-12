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
- [Batch API](#batch-api)

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
        name: 'My New Folder'
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

Batch API
---------

The client allows calls to be batched so that they will be sent over the network
as a single request, processed by the API, and sent back as a single response containing the results of all batched
calls.  The individual calls in a batch can still be handled normally, or you can operate on the entire batch response:

> __NOTE:__ Batch API does not support upload or download requests.

```js
client.batch();

client.folders.get('0', null, function(err, folder) { // call not made immediately
    // handle the response for folder 0
});
client.files.get('1234', null, function(err, file) { // call not made immediately
    // handle the response for file 1234
});

client.batchExec(); // make the batch call
```

__OR__

```js
client.batch();

client.folders.get('0') // call not made immediately
client.files.get('1234') // call not made immediately

client.batchExec(function(err, results) { // make the batch call

    if (err) {
        // handle error
    }

    console.log(results); // Outputs:
    /*
        {
            responses: [
                {
                    status: 200,
                    headers: {},
                    response: {
                        ... folder 0 data
                    }
                },
                {
                    status: 200,
                    headers: {},
                    response: {
                        ... file 1234 data
                    }
                }
            ]
        }
    */
});
```

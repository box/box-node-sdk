Enterprise Events
======

The Box API has an enterprise events endpoint that is available to admin users and service accounts.
The SDK includes an `EnterpriseEventStream` class (which implements
[stream.Readable](https://nodejs.org/api/stream.html#stream_readable_streams)) that automatically
handles polling for events and delivering them to the application.

* [Listening to the Enterprise Event Stream](#listening-to-the-enterprise-event-stream)
* [Handling errors](#handling-errors)
* [Get the Stream Position](#get-the-stream-position)
* [Get Enterprise Events](#get-enterprise-events)

Listening to the Enterprise Event Stream
----------------------------------------

When the `EnterpriseEventStream` is started, it will begin polling asynchronously.
Events received from the API are then forwarded to any listeners.

```js
const stream = client.enterpriseEvents.getEventStream();

stream.on('data', function(event) {
    // handle the event
});
```

By default, the stream will start at the current time.  You can start the stream
at a specific date or at a previous stream position.  You can also filter the event stream to
only receive specific event types.

```js
const stream = client.enterpriseEvents.getEventStream({
    streamPosition: ...,
    startDate: new Date(...),
    eventTypeFilterArray: [client.enterpriseEvents.types.UPLOAD, client.enterpriseEvents.types.DOWNLOAD, ...]
});
```

When you're done listening for events, you can call `stream.pause()` to stop polling.

If you pass `pollingInterval = 0`, then the stream will not use polling, but will close when
all of the currently available events have been delivered.

```js
const stream = client.enterpriseEvents.getEventStream({
    startDate: new Date(...),
    endDate: new Date(...),
    pollingInterval: 0
});

stream.on('end', function(event) {
    // Reached the end of the stream
});
```

Handling errors
---------------
You can handle errors as follows:

```js
stream.on('error', function(event) {
    // handle the error
});
```

If an error occurs, the stream will continue polling as usual until the connection can be re-established.

Get the Stream Position
-----------------------

You can get the stream position, which can be used later to
fetch events from that point in time forward.

```js
const streamPosition = stream.getStreamPosition();
```

Get Enterprise Events
---------------------

To get a specific set of enterprise events, you can call
[`enterpriseEvents.get(options, callback)`](http://opensource.box.com/box-node-sdk/EnterpriseEvents.html#get)

```js
client.enterpriseEvents.get({
    limit: ...,
    streamPosition: ...,
    eventTypeFilterArray: [client.enterpriseEvents.types.UPLOAD, client.enterpriseEvents.types.DOWNLOAD, ...],
    createdAfterDate: new Date('Jan 1, 2017'),
    createdBeforeDate: new Date('Dec 31, 2017')
}, callback);
```

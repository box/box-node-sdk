Enterprise Events
======

The Box API has an enterprise events endpoint that is available to admin users and service accounts.
The SDK includes an `EnterpriseEventStream` class (which implements
[stream.Readable](https://nodejs.org/api/stream.html#stream_readable_streams)) that automatically
handles polling for events and delivering them to the application.

* [Listening to the Enterprise Event Stream](#listening-to-the-enterprise-event-stream)
* [Handling errors](#handling-errors)
* [Get the Stream Position](#get-the-stream-position)

Listening to the Enterprise Event Stream
----------------------------------------

When you attach a `'data'` event listener to an `EnterpriseEventStream`, it will begin fetching events from Box.
Events received from the API are then forwarded to the listener.

```js
const stream = client.events.getEnterpriseEventStream();

stream.on('data', function(event) {
    // Handle the event.
});
```

By default, the stream will start at the current time.  You can also start the stream
from a specific date or from a previous stream position.  To start from the earliest available events (~1 year),
pass `streamPosition = '0'`.  The stream will fetch all past events as quickly as your listener consumes them.
Once the stream catches up to the current time, it will begin polling for new events every `pollingInterval` seconds
(default = 60).

```js
const stream = client.events.getEnterpriseEventStream({
    startDate: '2016-01-01T00:00:00-08:00',
    pollingInterval: 60
});
```

Note that Box buffers enterprise events for ~60 seconds before making them available to the `/events` API
(to ensure that events are delivered in-order and without duplicates), so polling with an inerval of less than
60 seconds is not normally needed.

If you pass `pollingInterval = 0`, then the stream will not use polling, but will end when all of the currently
available events have been delivered.

```js
const stream = client.events.getEnterpriseEventStream({
    startDate: '2016-01-01T00:00:00-08:00',
    endDate: '2017-01-01T00:00:00-08:00',
    pollingInterval: 0
});

stream.on('end', function(event) {
    // Reached the end of the stream.
});
```

You can also filter the event stream to only receive specific event types.  The set of enterprise event types
is available in `client.events.enterpriseEventTypes`.

```js
const stream = client.events.getEnterpriseEventStream({
    eventTypeFilter: 'UPLOAD,DOWNLOAD'
});
```

Since `EnterpriseEventStream` implements [stream.Readable](https://nodejs.org/api/stream.html#stream_readable_streams),
you can use the usual flow-control mechanisms on the stream:

```js
stream.pause();
stream.resume();
stream.isPaused();
```

You can also pipe the output to a [stream.Writable](https://nodejs.org/api/stream.html#stream_writable_streams) stream
(it must be an "object mode" stream):

```js
stream.pipe(writableObjectModeStream);
```

Handling errors
---------------
If an API or network error occurs, the stream will ignore the error and continue polling at the usual rate until
the connection can be re-established.  You can respond to errors with an `'error'` event listener:

```js
stream.on('error', function(event) {
    // Handle the error.
});
```

Persisting the Stream Position
------------------------------

In many applications, you may need to persist the stream position so that you can resume processing events from the
same point if your application is interrupted and restarted.  You can attach a `'streamPosition'` event listener
to be notified each time the stream position changes. `EnterpriseEventStream` also provides utility functions to
store and retrieve the stream position from a file.

```js
const streamPositionFile = 'streamPosition.json';

const stream = client.events.getEnterpriseEventStream(options);

// Restore the stream position from the filesystem.
stream.readStreamPositionFromFile(streamPositionFile, function() {

    stream.on('streamPosition', function() {
        // Persist the stream position in the filesystem.
        stream.writeStreamPositionToFile(streamPositionFile);
    });

    stream.on('data', function(event) {
        // Handle the event.
    });
});
```

You can also directly access the stream position:

```js
const streamPosition = stream.getStreamPosition();
```

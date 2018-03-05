Events
======

The Box API supports two types of event streams -- one for the events specific to a particular user
 and one for all of the events in an enterprise.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [User Events](#user-events)
  - [Listening to the EventStream](#listening-to-the-eventstream)
  - [Deduplicating Events](#deduplicating-events)
  - [Get the Current Stream Position](#get-the-current-stream-position)
  - [Get Events](#get-events)
- [Enterprise Events](#enterprise-events)
  - [Listening to the Enterprise Event Stream](#listening-to-the-enterprise-event-stream)
  - [Handling errors](#handling-errors)
  - [Persisting the Stream State](#persisting-the-stream-state)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


User Events
-----------

The Box API provides an events endpoint that utilizes long-polling to send
events in real-time. The SDK provides an `EventStream` class (which implements
[stream.Readable](https://nodejs.org/api/stream.html#stream_readable_streams)) that automatically
handles long-polling and deduplicating events.

* [Listening to the EventStream](#listening-to-the-eventstream)
* [Get the Current Stream Position](#get-the-current-stream-position)
* [Get Events](#get-events)

### Listening to the EventStream

When the `EventStream` is started, it will begin long-polling asynchronously.
Events received from the API are then forwarded to any listeners.

```js
client.events.getEventStream(function(err, stream) {

	if (err) {
		// handle error
	}

	stream.on('data', function(event) {
		// handle the event
	});
});
```

By default, the stream will start at the current time.  You can start the stream
at a past stream position by passing a position marker:

```js
client.events.getEventStream('1408838928446360', function(err, stream) { /* ... */ });
```

When you're done listening for events, call `stream.pause()` to stop long-polling.

### Deduplicating Events

Since the Box API [may send duplicate events](https://developers.box.com/docs/#events), the `EventStream` will remember the last 5000 received events and automatically ignore them.

### Get the Current Stream Position

It is possible to get the current stream position, which can later be used to
fetch events from that point in time forward.

```js
client.events.getCurrentStreamPosition(callback);
```

### Get Events

To get the latest chunk of events, you can call
[`events.get(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Events.html#get).

```js
client.events.get(null, callback);
```

You can also pass in a `stream_position` parameter to get events from a specific
point in time:

```js
client.events.get({stream_position: '1408838928446360'}, callback);
```

Enterprise Events
-----------------

The Box API has an enterprise events endpoint that is available to admin users and service accounts.
The SDK includes an `EnterpriseEventStream` class (which implements
[stream.Readable](https://nodejs.org/api/stream.html#stream_readable_streams)) that automatically
handles polling for events and delivering them to the application.

* [Listening to the Enterprise Event Stream](#listening-to-the-enterprise-event-stream)
* [Handling errors](#handling-errors)
* [Get the Stream Position](#get-the-stream-position)

### Listening to the Enterprise Event Stream

When you attach a `'data'` event listener to an `EnterpriseEventStream`, it will begin fetching events from Box.
Events received from the API are then forwarded to the listener.

```js
client.events.getEnterpriseEventStream(function(err, stream) {
	
	if (err) { // Handle error }

	stream.on('data', function(event) {
		// Handle the event
	});
});
```

By default, the stream will start at the current time.  You can also start the stream
from a specific date or from a previous stream position.  To start from the earliest available events (~1 year),
pass `streamPosition = '0'`.  The stream will fetch all past events as quickly as your listener consumes them.
Once the stream catches up to the current time, it will begin polling for new events every `pollingInterval` seconds
(default = 60).

```js
client.events.getEnterpriseEventStream({
    startDate: '2016-01-01T00:00:00-08:00',
    pollingInterval: 60
}, callback);
```

Note that Box buffers enterprise events for ~60 seconds before making them available to the `/events` API
(to ensure that events are delivered in-order and without duplicates), so polling with an interval of less than
60 seconds is not normally needed.

If you pass `pollingInterval = 0`, then the stream will not use polling, but will end when all of the currently
available events have been delivered.

```js
client.events.getEnterpriseEventStream({
        startDate: '2016-01-01T00:00:00-08:00',
        endDate: '2017-01-01T00:00:00-08:00',
        pollingInterval: 0
    }, function(err, stream) {
	
    if (err) { // Handle error }

    stream.on('end', function() {
        // Reached the end of the stream.
    });
});
```

You can also filter the event stream to only receive specific event types.  The set of enterprise event types
is available in `client.events.enterpriseEventTypes`.

```js
client.events.getEnterpriseEventStream({
    eventTypeFilter: [client.events.enterpriseEventTypes.UPLOAD, client.events.enterpriseEventTypes.DOWNLOAD]
}, callback);
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

### Handling errors

If an API or network error occurs, the stream will ignore the error and continue polling at the usual rate until
the connection can be re-established.  You can respond to errors with an `'error'` event listener:

```js
stream.on('error', function(err) {
    // Handle the error.
});
```

### Persisting the Stream State

In many applications, you may need to persist the stream state so that you can resume processing events from the
same point if your application is interrupted and restarted.  You can attach a `newStreamState` event listener
to be notified each time the stream position changes.

```js
client.events.getEnterpriseEventStream(function(err, stream) {
	
    if (err) { // Handle error }

    // Restore the stream state from the previous run.
    stream.setStreamState(readState());

    stream.on('newStreamState', function(streamState) {
        // Persist the stream state each time the stream position changes.
        writeState(streamState);
    });

    stream.on('data', function(event) {
        // Handle the event.
    });
});
```

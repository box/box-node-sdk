Events
======

The Box API provides an events endpoint that utilizes long-polling to send
events in real-time. The SDK provides an `EventStream` class (which implements
[stream.Readable](https://nodejs.org/api/stream.html#stream_readable_streams)) that automatically
handles long-polling and deduplicating events.

* [Listening to the EventStream](#listening-to-the-eventstream)
* [Get the Current Stream Position](#get-the-current-stream-position)
* [Get Events](#get-events)

Listening to the EventStream
----------------------------

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

Get the Current Stream Position
-------------------------------

It is possible to get the current stream position, which can later be used to
fetch events from that point in time forward.

```js
client.events.getCurrentStreamPosition(callback);
```

Get Events
----------

To get the latest chunk of events, you can call
[`events.get(qs, callback)`](http://opensource.box.com/box-node-sdk/Events.html#get).

```js
client.events.get(null, callback);
```

You can also pass in a `stream_position` parameter to get events from a specific
point in time:

```js
client.events.get({stream_position: '1408838928446360'}, callback);
```

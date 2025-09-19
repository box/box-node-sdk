# Event Stream

The Event Stream class utilizes long-polling to receive real-time events from Box. The SDK provides an easy way to set up and manage the event stream which is extended from the stream.Readable class.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Event Stream](#event-stream)
  - [Listening to the Event Stream](#listening-to-the-event-stream)
  - [Deduplication](#deduplication)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Listening to the Event Stream

When the `EventStream` is started, it will begin long-polling asynchronously. Events received from the API are then forwarded to all listeners.

You can also listen for errors and the end of the stream using the `error` and `end` events respectively.

```ts
const eventsStream = await client.events.getEventStream();
eventsStream.on('data', (event) => {
  console.log('Received event:', event);
});
eventsStream.on('error', (error) => {
  console.error('Error in events stream:', error);
});
eventsStream.on('end', () => {
  console.log('Events stream ended');
});
```

## Deduplication

The `EventStream` class automatically deduplicates events based on their `event_id`. This means that if the same event is received multiple times, it will only be emitted once to the listeners.

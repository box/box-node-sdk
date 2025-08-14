import { serializeEvents } from '../schemas/events.generated.js';
import { deserializeEvents } from '../schemas/events.generated.js';
import { serializeEvent } from '../schemas/event.generated.js';
import { deserializeEvent } from '../schemas/event.generated.js';
import { serializeGetEventStreamQueryParamsStreamTypeField } from '../managers/events.generated.js';
import { deserializeGetEventStreamQueryParamsStreamTypeField } from '../managers/events.generated.js';
import { serializeGetEventStreamQueryParamsEventTypeField } from '../managers/events.generated.js';
import { deserializeGetEventStreamQueryParamsEventTypeField } from '../managers/events.generated.js';
import { serializeRealtimeServers } from '../schemas/realtimeServers.generated.js';
import { deserializeRealtimeServers } from '../schemas/realtimeServers.generated.js';
import { serializeRealtimeServer } from '../schemas/realtimeServer.generated.js';
import { deserializeRealtimeServer } from '../schemas/realtimeServer.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { serializeEventSource } from '../schemas/eventSource.generated.js';
import { deserializeEventSource } from '../schemas/eventSource.generated.js';
import { serializeFile } from '../schemas/file.generated.js';
import { deserializeFile } from '../schemas/file.generated.js';
import { serializeFolder } from '../schemas/folder.generated.js';
import { deserializeFolder } from '../schemas/folder.generated.js';
import { serializeUser } from '../schemas/user.generated.js';
import { deserializeUser } from '../schemas/user.generated.js';
import { BoxClient } from '../client.generated.js';
import { Events } from '../schemas/events.generated.js';
import { Event } from '../schemas/event.generated.js';
import { GetEventsQueryParams } from '../managers/events.generated.js';
import { GetEventStreamQueryParamsStreamTypeField } from '../managers/events.generated.js';
import { GetEventStreamQueryParamsEventTypeField } from '../managers/events.generated.js';
import { RealtimeServers } from '../schemas/realtimeServers.generated.js';
import { RealtimeServer } from '../schemas/realtimeServer.generated.js';
import { DateTime } from '../internal/utils.js';
import { EventStream } from '../box/eventStream.js';
import { getDefaultClient } from './commons.generated.js';
import { EventSource } from '../schemas/eventSource.generated.js';
import { File } from '../schemas/file.generated.js';
import { Folder } from '../schemas/folder.generated.js';
import { User } from '../schemas/user.generated.js';
import { dateTimeFromString } from '../internal/utils.js';
import { getEpochTimeInSeconds } from '../internal/utils.js';
import { epochSecondsToDateTime } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testEvents', async function testEvents(): Promise<any> {
  const events: Events = await client.events.getEvents();
  if (!(events.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const firstEvent: Event = events.entries![0];
  if (!((toString(firstEvent.createdBy!.type) as string) == 'user')) {
    throw new Error('Assertion failed');
  }
  if (!!((toString(firstEvent.eventType!) as string) == '')) {
    throw new Error('Assertion failed');
  }
});
test('testEventUpload', async function testEventUpload(): Promise<any> {
  const events: Events = await client.events.getEvents({
    streamType: 'admin_logs' as GetEventStreamQueryParamsStreamTypeField,
    eventType: ['UPLOAD' as GetEventStreamQueryParamsEventTypeField],
  } satisfies GetEventsQueryParams);
  if (!(events.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const firstEvent: Event = events.entries![0];
  if (!((toString(firstEvent.eventType!) as string) == 'UPLOAD')) {
    throw new Error('Assertion failed');
  }
  const source: EventSource = firstEvent.source! as EventSource;
  if (
    !(
      (toString(source.itemType) as string) == 'file' ||
      (toString(source.itemType) as string) == 'folder'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!!(source.itemId == '')) {
    throw new Error('Assertion failed');
  }
  if (!!(source.itemName == '')) {
    throw new Error('Assertion failed');
  }
});
test('testEventDeleteUser', async function testEventDeleteUser(): Promise<any> {
  const events: Events = await client.events.getEvents({
    streamType: 'admin_logs' as GetEventStreamQueryParamsStreamTypeField,
    eventType: ['DELETE_USER' as GetEventStreamQueryParamsEventTypeField],
  } satisfies GetEventsQueryParams);
  if (!(events.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const firstEvent: Event = events.entries![0];
  if (!((toString(firstEvent.eventType!) as string) == 'DELETE_USER')) {
    throw new Error('Assertion failed');
  }
  const source: User = firstEvent.source! as User;
  if (!((toString(source.type) as string) == 'user')) {
    throw new Error('Assertion failed');
  }
  if (!!(source.id == '')) {
    throw new Error('Assertion failed');
  }
});
test('testEventSourceFileOrFolder', async function testEventSourceFileOrFolder(): Promise<any> {
  const events: Events = await client.events.getEvents({
    streamType: 'changes' as GetEventStreamQueryParamsStreamTypeField,
  } satisfies GetEventsQueryParams);
  if (!(events.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
});
test('testGetEventsWithLongPolling', async function testGetEventsWithLongPolling(): Promise<any> {
  const servers: RealtimeServers =
    await client.events.getEventsWithLongPolling();
  if (!(servers.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const server: RealtimeServer = servers.entries![0];
  if (!((toString(server.type!) as string) == 'realtime_server')) {
    throw new Error('Assertion failed');
  }
  if (!!(server.url! == '')) {
    throw new Error('Assertion failed');
  }
});
test('testGetEventsWithDateFilters', async function testGetEventsWithDateFilters(): Promise<any> {
  const currentEpochTimeInSeconds: number = getEpochTimeInSeconds();
  const epochTimeInSecondsAWeekAgo: number =
    currentEpochTimeInSeconds - 7 * 24 * 60 * 60;
  const createdAfterDate: DateTime = epochSecondsToDateTime(
    epochTimeInSecondsAWeekAgo,
  );
  const createdBeforeDate: DateTime = epochSecondsToDateTime(
    currentEpochTimeInSeconds,
  );
  const servers: Events = await client.events.getEvents({
    streamType: 'admin_logs' as GetEventStreamQueryParamsStreamTypeField,
    limit: 1,
    createdAfter: createdAfterDate,
    createdBefore: createdBeforeDate,
  } satisfies GetEventsQueryParams);
  if (!(servers.entries!.length == 1)) {
    throw new Error('Assertion failed');
  }
});
test('testGetEventStream', function testGetEventStream(): any {
  const eventStream: EventStream = client.events.getEventStream();
  if (!!(eventStream == void 0)) {
    throw new Error('Assertion failed');
  }
});
export {};

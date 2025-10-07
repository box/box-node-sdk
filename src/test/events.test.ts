import { serializeEvents } from '@/schemas/events';
import { deserializeEvents } from '@/schemas/events';
import { serializeEvent } from '@/schemas/event';
import { deserializeEvent } from '@/schemas/event';
import { serializeGetEventsQueryParamsStreamTypeField } from '@/managers/events';
import { deserializeGetEventsQueryParamsStreamTypeField } from '@/managers/events';
import { serializeGetEventsQueryParamsEventTypeField } from '@/managers/events';
import { deserializeGetEventsQueryParamsEventTypeField } from '@/managers/events';
import { serializeRealtimeServers } from '@/schemas/realtimeServers';
import { deserializeRealtimeServers } from '@/schemas/realtimeServers';
import { serializeRealtimeServer } from '@/schemas/realtimeServer';
import { deserializeRealtimeServer } from '@/schemas/realtimeServer';
import { serializeDateTime } from '@/internal/utils';
import { deserializeDateTime } from '@/internal/utils';
import { serializeEventSource } from '@/schemas/eventSource';
import { deserializeEventSource } from '@/schemas/eventSource';
import { serializeFile } from '@/schemas/file';
import { deserializeFile } from '@/schemas/file';
import { serializeFolder } from '@/schemas/folder';
import { deserializeFolder } from '@/schemas/folder';
import { serializeUser } from '@/schemas/user';
import { deserializeUser } from '@/schemas/user';
import { BoxClient } from '@/client';
import { Events } from '@/schemas/events';
import { Event } from '@/schemas/event';
import { GetEventsQueryParams } from '@/managers/events';
import { GetEventsQueryParamsStreamTypeField } from '@/managers/events';
import { GetEventsQueryParamsEventTypeField } from '@/managers/events';
import { RealtimeServers } from '@/schemas/realtimeServers';
import { RealtimeServer } from '@/schemas/realtimeServer';
import { DateTime } from '@/internal/utils';
import { EventStream } from '@/box/eventStream';
import { getDefaultClient } from './commons';
import { EventSource } from '@/schemas/eventSource';
import { File } from '@/schemas/file';
import { Folder } from '@/schemas/folder';
import { User } from '@/schemas/user';
import { dateTimeFromString } from '@/internal/utils';
import { getEpochTimeInSeconds } from '@/internal/utils';
import { epochSecondsToDateTime } from '@/internal/utils';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
    streamType: 'admin_logs' as GetEventsQueryParamsStreamTypeField,
    eventType: ['UPLOAD' as GetEventsQueryParamsEventTypeField],
  } satisfies GetEventsQueryParams);
  if (!(events.entries!.length > 0)) {
    throw new Error('Assertion failed');
  }
  const firstEvent: Event = events.entries![0];
  if (!((toString(firstEvent.eventType!) as string) == 'UPLOAD')) {
    throw new Error('Assertion failed');
  }
  if (
    !!((toString(firstEvent.additionalDetails!.service_id) as string) == '')
  ) {
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
    streamType: 'admin_logs' as GetEventsQueryParamsStreamTypeField,
    eventType: ['DELETE_USER' as GetEventsQueryParamsEventTypeField],
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
    streamType: 'changes' as GetEventsQueryParamsStreamTypeField,
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
    streamType: 'admin_logs' as GetEventsQueryParamsStreamTypeField,
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

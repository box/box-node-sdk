import { serializeEvent } from './event.generated.js';
import { deserializeEvent } from './event.generated.js';
import { Event } from './event.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type EventsNextStreamPositionField = string | number;
export interface Events {
  /**
   * The number of events returned in this response. */
  readonly chunkSize?: number;
  /**
   * The stream position of the start of the next page (chunk)
   * of events. */
  readonly nextStreamPosition?: EventsNextStreamPositionField;
  /**
   * A list of events */
  readonly entries?: readonly Event[];
  readonly rawData?: SerializedData;
}
export function serializeEventsNextStreamPositionField(
  val: any,
): SerializedData {
  return val;
}
export function deserializeEventsNextStreamPositionField(
  val: SerializedData,
): EventsNextStreamPositionField {
  if (sdIsString(val)) {
    return val;
  }
  if (sdIsNumber(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize EventsNextStreamPositionField",
  });
}
export function serializeEvents(val: Events): SerializedData {
  return {
    ['chunk_size']: val.chunkSize,
    ['next_stream_position']:
      val.nextStreamPosition == void 0
        ? val.nextStreamPosition
        : serializeEventsNextStreamPositionField(val.nextStreamPosition),
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: Event): SerializedData {
            return serializeEvent(item);
          }) as readonly any[]),
  };
}
export function deserializeEvents(val: SerializedData): Events {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Events"' });
  }
  if (!(val.chunk_size == void 0) && !sdIsNumber(val.chunk_size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "chunk_size" of type "Events"',
    });
  }
  const chunkSize: undefined | number =
    val.chunk_size == void 0 ? void 0 : val.chunk_size;
  const nextStreamPosition: undefined | EventsNextStreamPositionField =
    val.next_stream_position == void 0
      ? void 0
      : deserializeEventsNextStreamPositionField(val.next_stream_position);
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "Events"',
    });
  }
  const entries: undefined | readonly Event[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): Event {
            return deserializeEvent(itm);
          }) as readonly any[])
        : [];
  return {
    chunkSize: chunkSize,
    nextStreamPosition: nextStreamPosition,
    entries: entries,
  } satisfies Events;
}

import { serializeRealtimeServer } from './realtimeServer';
import { deserializeRealtimeServer } from './realtimeServer';
import { RealtimeServer } from './realtimeServer';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface RealtimeServers {
  /**
   * The number of items in this response. */
  readonly chunkSize?: number;
  /**
   * A list of real-time servers. */
  readonly entries?: readonly RealtimeServer[];
  readonly rawData?: SerializedData;
}
export function serializeRealtimeServers(val: RealtimeServers): SerializedData {
  return {
    ['chunk_size']: val.chunkSize,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: RealtimeServer): SerializedData {
            return serializeRealtimeServer(item);
          }) as readonly any[]),
  };
}
export function deserializeRealtimeServers(
  val: SerializedData,
): RealtimeServers {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "RealtimeServers"' });
  }
  if (!(val.chunk_size == void 0) && !sdIsNumber(val.chunk_size)) {
    throw new BoxSdkError({
      message: 'Expecting number for "chunk_size" of type "RealtimeServers"',
    });
  }
  const chunkSize: undefined | number =
    val.chunk_size == void 0 ? void 0 : val.chunk_size;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "RealtimeServers"',
    });
  }
  const entries: undefined | readonly RealtimeServer[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): RealtimeServer {
            return deserializeRealtimeServer(itm);
          }) as readonly any[])
        : [];
  return { chunkSize: chunkSize, entries: entries } satisfies RealtimeServers;
}

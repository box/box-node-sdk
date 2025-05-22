import { serializeRealtimeServer } from './realtimeServer.generated.js';
import { deserializeRealtimeServer } from './realtimeServer.generated.js';
import { RealtimeServer } from './realtimeServer.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface RealtimeServers {
  /**
   * The number of items in this response. */
  readonly chunkSize?: number;
  /**
   * A list of real-time servers */
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

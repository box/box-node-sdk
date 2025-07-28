import { serializeHubV2025R0 } from './hubV2025R0.generated.js';
import { deserializeHubV2025R0 } from './hubV2025R0.generated.js';
import { HubV2025R0 } from './hubV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface HubsV2025R0 {
  /**
   * A list of hubs. */
  readonly entries?: readonly HubV2025R0[];
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeHubsV2025R0(val: HubsV2025R0): SerializedData {
  return {
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: HubV2025R0): SerializedData {
            return serializeHubV2025R0(item);
          }) as readonly any[]),
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
  };
}
export function deserializeHubsV2025R0(val: SerializedData): HubsV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "HubsV2025R0"' });
  }
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "HubsV2025R0"',
    });
  }
  const entries: undefined | readonly HubV2025R0[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): HubV2025R0 {
            return deserializeHubV2025R0(itm);
          }) as readonly any[])
        : [];
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "HubsV2025R0"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "next_marker" of type "HubsV2025R0"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  return {
    entries: entries,
    limit: limit,
    nextMarker: nextMarker,
  } satisfies HubsV2025R0;
}

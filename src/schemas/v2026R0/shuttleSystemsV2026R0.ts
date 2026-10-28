import { serializeShuttleSystemV2026R0 } from './shuttleSystemV2026R0';
import { deserializeShuttleSystemV2026R0 } from './shuttleSystemV2026R0';
import { ShuttleSystemV2026R0 } from './shuttleSystemV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ShuttleSystemsV2026R0 {
  /**
   * A list of shuttle systems. */
  readonly entries: readonly ShuttleSystemV2026R0[];
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  /**
   * The marker for the start of the previous page of results. */
  readonly prevMarker?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeShuttleSystemsV2026R0(
  val: ShuttleSystemsV2026R0,
): SerializedData {
  return {
    ['entries']: val.entries.map(function (
      item: ShuttleSystemV2026R0,
    ): SerializedData {
      return serializeShuttleSystemV2026R0(item);
    }) as readonly any[],
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['prev_marker']: val.prevMarker,
  };
}
export function deserializeShuttleSystemsV2026R0(
  val: SerializedData,
): ShuttleSystemsV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSystemsV2026R0"',
    });
  }
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "ShuttleSystemsV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "ShuttleSystemsV2026R0"',
    });
  }
  const entries: readonly ShuttleSystemV2026R0[] = sdIsList(val.entries)
    ? (val.entries.map(function (itm: SerializedData): ShuttleSystemV2026R0 {
        return deserializeShuttleSystemV2026R0(itm);
      }) as readonly any[])
    : [];
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "ShuttleSystemsV2026R0"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "ShuttleSystemsV2026R0"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.prev_marker == void 0) && !sdIsString(val.prev_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prev_marker" of type "ShuttleSystemsV2026R0"',
    });
  }
  const prevMarker: undefined | string =
    val.prev_marker == void 0 ? void 0 : val.prev_marker;
  return {
    entries: entries,
    limit: limit,
    nextMarker: nextMarker,
    prevMarker: prevMarker,
  } satisfies ShuttleSystemsV2026R0;
}

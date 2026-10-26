import { serializeShuttleSubjectMappingV2026R0 } from './shuttleSubjectMappingV2026R0';
import { deserializeShuttleSubjectMappingV2026R0 } from './shuttleSubjectMappingV2026R0';
import { ShuttleSubjectMappingV2026R0 } from './shuttleSubjectMappingV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ShuttleSubjectMappingsV2026R0 {
  /**
   * A list of shuttle subject mappings. */
  readonly entries: readonly ShuttleSubjectMappingV2026R0[];
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
export function serializeShuttleSubjectMappingsV2026R0(
  val: ShuttleSubjectMappingsV2026R0
): SerializedData {
  return {
    ['entries']: val.entries.map(function (
      item: ShuttleSubjectMappingV2026R0
    ): SerializedData {
      return serializeShuttleSubjectMappingV2026R0(item);
    }) as readonly any[],
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['prev_marker']: val.prevMarker,
  };
}
export function deserializeShuttleSubjectMappingsV2026R0(
  val: SerializedData
): ShuttleSubjectMappingsV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSubjectMappingsV2026R0"',
    });
  }
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "ShuttleSubjectMappingsV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "ShuttleSubjectMappingsV2026R0"',
    });
  }
  const entries: readonly ShuttleSubjectMappingV2026R0[] = sdIsList(val.entries)
    ? (val.entries.map(function (
        itm: SerializedData
      ): ShuttleSubjectMappingV2026R0 {
        return deserializeShuttleSubjectMappingV2026R0(itm);
      }) as readonly any[])
    : [];
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "limit" of type "ShuttleSubjectMappingsV2026R0"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "ShuttleSubjectMappingsV2026R0"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.prev_marker == void 0) && !sdIsString(val.prev_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prev_marker" of type "ShuttleSubjectMappingsV2026R0"',
    });
  }
  const prevMarker: undefined | string =
    val.prev_marker == void 0 ? void 0 : val.prev_marker;
  return {
    entries: entries,
    limit: limit,
    nextMarker: nextMarker,
    prevMarker: prevMarker,
  } satisfies ShuttleSubjectMappingsV2026R0;
}

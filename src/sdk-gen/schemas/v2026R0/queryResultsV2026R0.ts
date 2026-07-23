import { serializeQueryResultEntryV2026R0 } from './queryResultEntryV2026R0';
import { deserializeQueryResultEntryV2026R0 } from './queryResultEntryV2026R0';
import { QueryResultEntryV2026R0 } from './queryResultEntryV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface QueryResultsV2026R0 {
  /**
   * The list of items matching the query predicate. */
  readonly entries: readonly QueryResultEntryV2026R0[];
  /**
   * The marker for the start of the next page of results. When `null`, there
   * are no further results available. */
  readonly nextMarker?: string | null;
  /**
   * The limit that was used for this request. This will be the same as the limit query
   * parameter unless that value exceeded the maximum value allowed. */
  readonly limit: number;
  readonly rawData?: SerializedData;
}
export function serializeQueryResultsV2026R0(
  val: QueryResultsV2026R0
): SerializedData {
  return {
    ['entries']: val.entries.map(function (
      item: QueryResultEntryV2026R0
    ): SerializedData {
      return serializeQueryResultEntryV2026R0(item);
    }) as readonly any[],
    ['next_marker']: val.nextMarker,
    ['limit']: val.limit,
  };
}
export function deserializeQueryResultsV2026R0(
  val: SerializedData
): QueryResultsV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryResultsV2026R0"',
    });
  }
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "QueryResultsV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "QueryResultsV2026R0"',
    });
  }
  const entries: readonly QueryResultEntryV2026R0[] = sdIsList(val.entries)
    ? (val.entries.map(function (itm: SerializedData): QueryResultEntryV2026R0 {
        return deserializeQueryResultEntryV2026R0(itm);
      }) as readonly any[])
    : [];
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "QueryResultsV2026R0"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (val.limit == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "limit" of type "QueryResultsV2026R0" to be defined',
    });
  }
  if (!sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "QueryResultsV2026R0"',
    });
  }
  const limit: number = val.limit;
  return {
    entries: entries,
    nextMarker: nextMarker,
    limit: limit,
  } satisfies QueryResultsV2026R0;
}

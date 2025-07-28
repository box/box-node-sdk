import { serializeDocGenJobV2025R0 } from './docGenJobV2025R0.generated.js';
import { deserializeDocGenJobV2025R0 } from './docGenJobV2025R0.generated.js';
import { DocGenJobV2025R0 } from './docGenJobV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface DocGenJobsV2025R0 {
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
  /**
   * List of jobs. */
  readonly entries?: readonly DocGenJobV2025R0[];
  readonly rawData?: SerializedData;
}
export function serializeDocGenJobsV2025R0(
  val: DocGenJobsV2025R0,
): SerializedData {
  return {
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['prev_marker']: val.prevMarker,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (item: DocGenJobV2025R0): SerializedData {
            return serializeDocGenJobV2025R0(item);
          }) as readonly any[]),
  };
}
export function deserializeDocGenJobsV2025R0(
  val: SerializedData,
): DocGenJobsV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "DocGenJobsV2025R0"',
    });
  }
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "DocGenJobsV2025R0"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "next_marker" of type "DocGenJobsV2025R0"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.prev_marker == void 0) && !sdIsString(val.prev_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "prev_marker" of type "DocGenJobsV2025R0"',
    });
  }
  const prevMarker: undefined | string =
    val.prev_marker == void 0 ? void 0 : val.prev_marker;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "DocGenJobsV2025R0"',
    });
  }
  const entries: undefined | readonly DocGenJobV2025R0[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (itm: SerializedData): DocGenJobV2025R0 {
            return deserializeDocGenJobV2025R0(itm);
          }) as readonly any[])
        : [];
  return {
    limit: limit,
    nextMarker: nextMarker,
    prevMarker: prevMarker,
    entries: entries,
  } satisfies DocGenJobsV2025R0;
}

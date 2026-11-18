import { serializeAiSessionV2026R0 } from './aiSessionV2026R0';
import { deserializeAiSessionV2026R0 } from './aiSessionV2026R0';
import { AiSessionV2026R0 } from './aiSessionV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface AiSessionsV2026R0 {
  /**
   * A list of AI sessions. The list is empty when there are no results. */
  readonly entries: readonly AiSessionV2026R0[];
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeAiSessionsV2026R0(
  val: AiSessionsV2026R0
): SerializedData {
  return {
    ['entries']: val.entries.map(function (
      item: AiSessionV2026R0
    ): SerializedData {
      return serializeAiSessionV2026R0(item);
    }) as readonly any[],
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
  };
}
export function deserializeAiSessionsV2026R0(
  val: SerializedData
): AiSessionsV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiSessionsV2026R0"',
    });
  }
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "entries" of type "AiSessionsV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message: 'Expecting array for "entries" of type "AiSessionsV2026R0"',
    });
  }
  const entries: readonly AiSessionV2026R0[] = sdIsList(val.entries)
    ? (val.entries.map(function (itm: SerializedData): AiSessionV2026R0 {
        return deserializeAiSessionV2026R0(itm);
      }) as readonly any[])
    : [];
  if (val.limit == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "limit" of type "AiSessionsV2026R0" to be defined',
    });
  }
  if (!sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "AiSessionsV2026R0"',
    });
  }
  const limit: number = val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message: 'Expecting string for "next_marker" of type "AiSessionsV2026R0"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  return {
    entries: entries,
    limit: limit,
    nextMarker: nextMarker,
  } satisfies AiSessionsV2026R0;
}

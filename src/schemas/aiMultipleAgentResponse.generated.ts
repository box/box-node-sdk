import { serializeAiSingleAgentResponseFull } from './aiSingleAgentResponseFull.generated.js';
import { deserializeAiSingleAgentResponseFull } from './aiSingleAgentResponseFull.generated.js';
import { AiSingleAgentResponseFull } from './aiSingleAgentResponseFull.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface AiMultipleAgentResponse {
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
   * The list of AI Agents. */
  readonly entries: readonly AiSingleAgentResponseFull[];
  readonly rawData?: SerializedData;
}
export function serializeAiMultipleAgentResponse(
  val: AiMultipleAgentResponse,
): SerializedData {
  return {
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['prev_marker']: val.prevMarker,
    ['entries']: val.entries.map(function (
      item: AiSingleAgentResponseFull,
    ): SerializedData {
      return serializeAiSingleAgentResponseFull(item);
    }) as readonly any[],
  };
}
export function deserializeAiMultipleAgentResponse(
  val: SerializedData,
): AiMultipleAgentResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiMultipleAgentResponse"',
    });
  }
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message: 'Expecting number for "limit" of type "AiMultipleAgentResponse"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "AiMultipleAgentResponse"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.prev_marker == void 0) && !sdIsString(val.prev_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prev_marker" of type "AiMultipleAgentResponse"',
    });
  }
  const prevMarker: undefined | string =
    val.prev_marker == void 0 ? void 0 : val.prev_marker;
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "AiMultipleAgentResponse" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "AiMultipleAgentResponse"',
    });
  }
  const entries: readonly AiSingleAgentResponseFull[] = sdIsList(val.entries)
    ? (val.entries.map(function (
        itm: SerializedData,
      ): AiSingleAgentResponseFull {
        return deserializeAiSingleAgentResponseFull(itm);
      }) as readonly any[])
    : [];
  return {
    limit: limit,
    nextMarker: nextMarker,
    prevMarker: prevMarker,
    entries: entries,
  } satisfies AiMultipleAgentResponse;
}

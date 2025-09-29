import { serializeShieldInformationBarrierSegment } from './shieldInformationBarrierSegment';
import { deserializeShieldInformationBarrierSegment } from './shieldInformationBarrierSegment';
import { ShieldInformationBarrierSegment } from './shieldInformationBarrierSegment';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface ShieldInformationBarrierSegments {
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  /**
   * A list of shield information barrier
   * segments. */
  readonly entries?: readonly ShieldInformationBarrierSegment[];
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierSegments(
  val: ShieldInformationBarrierSegments,
): SerializedData {
  return {
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: ShieldInformationBarrierSegment,
          ): SerializedData {
            return serializeShieldInformationBarrierSegment(item);
          }) as readonly any[]),
  };
}
export function deserializeShieldInformationBarrierSegments(
  val: SerializedData,
): ShieldInformationBarrierSegments {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierSegments"',
    });
  }
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "limit" of type "ShieldInformationBarrierSegments"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "ShieldInformationBarrierSegments"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "ShieldInformationBarrierSegments"',
    });
  }
  const entries: undefined | readonly ShieldInformationBarrierSegment[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): ShieldInformationBarrierSegment {
            return deserializeShieldInformationBarrierSegment(itm);
          }) as readonly any[])
        : [];
  return {
    limit: limit,
    nextMarker: nextMarker,
    entries: entries,
  } satisfies ShieldInformationBarrierSegments;
}

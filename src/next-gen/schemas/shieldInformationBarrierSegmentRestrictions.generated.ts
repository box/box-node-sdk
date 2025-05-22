import { serializeShieldInformationBarrierSegmentRestriction } from './shieldInformationBarrierSegmentRestriction.generated.js';
import { deserializeShieldInformationBarrierSegmentRestriction } from './shieldInformationBarrierSegmentRestriction.generated.js';
import { ShieldInformationBarrierSegmentRestriction } from './shieldInformationBarrierSegmentRestriction.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface ShieldInformationBarrierSegmentRestrictions {
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
   * segment restriction objects */
  readonly entries?: readonly ShieldInformationBarrierSegmentRestriction[];
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierSegmentRestrictions(
  val: ShieldInformationBarrierSegmentRestrictions,
): SerializedData {
  return {
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: ShieldInformationBarrierSegmentRestriction,
          ): SerializedData {
            return serializeShieldInformationBarrierSegmentRestriction(item);
          }) as readonly any[]),
  };
}
export function deserializeShieldInformationBarrierSegmentRestrictions(
  val: SerializedData,
): ShieldInformationBarrierSegmentRestrictions {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentRestrictions"',
    });
  }
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "limit" of type "ShieldInformationBarrierSegmentRestrictions"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "ShieldInformationBarrierSegmentRestrictions"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "ShieldInformationBarrierSegmentRestrictions"',
    });
  }
  const entries:
    | undefined
    | readonly ShieldInformationBarrierSegmentRestriction[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): ShieldInformationBarrierSegmentRestriction {
            return deserializeShieldInformationBarrierSegmentRestriction(itm);
          }) as readonly any[])
        : [];
  return {
    limit: limit,
    nextMarker: nextMarker,
    entries: entries,
  } satisfies ShieldInformationBarrierSegmentRestrictions;
}

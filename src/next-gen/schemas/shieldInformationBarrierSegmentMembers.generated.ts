import { serializeShieldInformationBarrierSegmentMember } from './shieldInformationBarrierSegmentMember.generated.js';
import { deserializeShieldInformationBarrierSegmentMember } from './shieldInformationBarrierSegmentMember.generated.js';
import { ShieldInformationBarrierSegmentMember } from './shieldInformationBarrierSegmentMember.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface ShieldInformationBarrierSegmentMembers {
  /**
   * The limit that was used for these entries. This will be the same as the
   * `limit` query parameter unless that value exceeded the maximum value
   * allowed. The maximum value varies by API. */
  readonly limit?: number;
  /**
   * The marker for the start of the next page of results. */
  readonly nextMarker?: string | null;
  /**
   * A list of shield information
   * barrier segment members */
  readonly entries?: readonly ShieldInformationBarrierSegmentMember[];
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierSegmentMembers(
  val: ShieldInformationBarrierSegmentMembers,
): SerializedData {
  return {
    ['limit']: val.limit,
    ['next_marker']: val.nextMarker,
    ['entries']:
      val.entries == void 0
        ? val.entries
        : (val.entries.map(function (
            item: ShieldInformationBarrierSegmentMember,
          ): SerializedData {
            return serializeShieldInformationBarrierSegmentMember(item);
          }) as readonly any[]),
  };
}
export function deserializeShieldInformationBarrierSegmentMembers(
  val: SerializedData,
): ShieldInformationBarrierSegmentMembers {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierSegmentMembers"',
    });
  }
  if (!(val.limit == void 0) && !sdIsNumber(val.limit)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "limit" of type "ShieldInformationBarrierSegmentMembers"',
    });
  }
  const limit: undefined | number = val.limit == void 0 ? void 0 : val.limit;
  if (!(val.next_marker == void 0) && !sdIsString(val.next_marker)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "next_marker" of type "ShieldInformationBarrierSegmentMembers"',
    });
  }
  const nextMarker: undefined | string =
    val.next_marker == void 0 ? void 0 : val.next_marker;
  if (!(val.entries == void 0) && !sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "ShieldInformationBarrierSegmentMembers"',
    });
  }
  const entries: undefined | readonly ShieldInformationBarrierSegmentMember[] =
    val.entries == void 0
      ? void 0
      : sdIsList(val.entries)
        ? (val.entries.map(function (
            itm: SerializedData,
          ): ShieldInformationBarrierSegmentMember {
            return deserializeShieldInformationBarrierSegmentMember(itm);
          }) as readonly any[])
        : [];
  return {
    limit: limit,
    nextMarker: nextMarker,
    entries: entries,
  } satisfies ShieldInformationBarrierSegmentMembers;
}

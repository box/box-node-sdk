import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type ShieldInformationBarrierSegmentRestrictionBaseTypeField =
  'shield_information_barrier_segment_restriction';
export interface ShieldInformationBarrierSegmentRestrictionBase {
  /**
   * Shield information barrier segment restriction. */
  readonly type?: ShieldInformationBarrierSegmentRestrictionBaseTypeField;
  /**
   * The unique identifier for the
   * shield information barrier segment restriction. */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierSegmentRestrictionBaseTypeField(
  val: ShieldInformationBarrierSegmentRestrictionBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierSegmentRestrictionBaseTypeField(
  val: SerializedData,
): ShieldInformationBarrierSegmentRestrictionBaseTypeField {
  if (val == 'shield_information_barrier_segment_restriction') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShieldInformationBarrierSegmentRestrictionBaseTypeField",
  });
}
export function serializeShieldInformationBarrierSegmentRestrictionBase(
  val: ShieldInformationBarrierSegmentRestrictionBase,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldInformationBarrierSegmentRestrictionBaseTypeField(
            val.type,
          ),
    ['id']: val.id,
  };
}
export function deserializeShieldInformationBarrierSegmentRestrictionBase(
  val: SerializedData,
): ShieldInformationBarrierSegmentRestrictionBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentRestrictionBase"',
    });
  }
  const type:
    | undefined
    | ShieldInformationBarrierSegmentRestrictionBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierSegmentRestrictionBaseTypeField(
          val.type,
        );
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierSegmentRestrictionBase"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return {
    type: type,
    id: id,
  } satisfies ShieldInformationBarrierSegmentRestrictionBase;
}

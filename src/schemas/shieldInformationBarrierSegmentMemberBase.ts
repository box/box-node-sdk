import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type ShieldInformationBarrierSegmentMemberBaseTypeField =
  'shield_information_barrier_segment_member';
export interface ShieldInformationBarrierSegmentMemberBase {
  /**
   * The unique identifier for the
   * shield information barrier segment member. */
  readonly id?: string;
  /**
   * The type of the shield information barrier segment member. */
  readonly type?: ShieldInformationBarrierSegmentMemberBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierSegmentMemberBaseTypeField(
  val: ShieldInformationBarrierSegmentMemberBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierSegmentMemberBaseTypeField(
  val: SerializedData,
): ShieldInformationBarrierSegmentMemberBaseTypeField {
  if (val == 'shield_information_barrier_segment_member') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShieldInformationBarrierSegmentMemberBaseTypeField",
  });
}
export function serializeShieldInformationBarrierSegmentMemberBase(
  val: ShieldInformationBarrierSegmentMemberBase,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldInformationBarrierSegmentMemberBaseTypeField(val.type),
  };
}
export function deserializeShieldInformationBarrierSegmentMemberBase(
  val: SerializedData,
): ShieldInformationBarrierSegmentMemberBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentMemberBase"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierSegmentMemberBase"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ShieldInformationBarrierSegmentMemberBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierSegmentMemberBaseTypeField(val.type);
  return {
    id: id,
    type: type,
  } satisfies ShieldInformationBarrierSegmentMemberBase;
}

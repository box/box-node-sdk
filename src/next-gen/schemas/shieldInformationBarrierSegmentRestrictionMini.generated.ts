import { serializeShieldInformationBarrierSegmentRestrictionBaseTypeField } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { deserializeShieldInformationBarrierSegmentRestrictionBaseTypeField } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { serializeShieldInformationBarrierSegmentRestrictionBase } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { deserializeShieldInformationBarrierSegmentRestrictionBase } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { ShieldInformationBarrierSegmentRestrictionBaseTypeField } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { ShieldInformationBarrierSegmentRestrictionBase } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField =
  'shield_information_barrier_segment';
export interface ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField {
  /**
   * The ID reference of the
   * requesting shield information barrier segment. */
  readonly id?: string;
  /**
   * The type of the shield information barrier segment */
  readonly type?: ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField;
  readonly rawData?: SerializedData;
}
export type ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField =
  'shield_information_barrier_segment';
export interface ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField {
  /**
   * The ID reference of the
   * restricted shield information barrier segment. */
  readonly id?: string;
  /**
   * The type of the shield information segment */
  readonly type?: ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField;
  readonly rawData?: SerializedData;
}
export type ShieldInformationBarrierSegmentRestrictionMini =
  ShieldInformationBarrierSegmentRestrictionBase & {
    /**
     * The `type` and `id` of the
     * requested shield information barrier segment. */
    readonly shieldInformationBarrierSegment: ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField;
    /**
     * The `type` and `id` of the
     * restricted shield information barrier segment. */
    readonly restrictedSegment: ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField;
  };
export function serializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField(
  val: ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField(
  val: SerializedData,
): ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField {
  if (val == 'shield_information_barrier_segment') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField",
  });
}
export function serializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField(
  val: ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField(
            val.type,
          ),
  };
}
export function deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField(
  val: SerializedData,
): ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type:
    | undefined
    | ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField(
          val.type,
        );
  return {
    id: id,
    type: type,
  } satisfies ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField;
}
export function serializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField(
  val: ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField(
  val: SerializedData,
): ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField {
  if (val == 'shield_information_barrier_segment') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField",
  });
}
export function serializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField(
  val: ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField(
            val.type,
          ),
  };
}
export function deserializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField(
  val: SerializedData,
): ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type:
    | undefined
    | ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField(
          val.type,
        );
  return {
    id: id,
    type: type,
  } satisfies ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField;
}
export function serializeShieldInformationBarrierSegmentRestrictionMini(
  val: ShieldInformationBarrierSegmentRestrictionMini,
): SerializedData {
  const base: any =
    serializeShieldInformationBarrierSegmentRestrictionBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentRestrictionMini"',
    });
  }
  return {
    ...base,
    ...{
      ['shield_information_barrier_segment']:
        serializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField(
          val.shieldInformationBarrierSegment,
        ),
      ['restricted_segment']:
        serializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField(
          val.restrictedSegment,
        ),
    },
  };
}
export function deserializeShieldInformationBarrierSegmentRestrictionMini(
  val: SerializedData,
): ShieldInformationBarrierSegmentRestrictionMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentRestrictionMini"',
    });
  }
  if (val.shield_information_barrier_segment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "shield_information_barrier_segment" of type "ShieldInformationBarrierSegmentRestrictionMini" to be defined',
    });
  }
  const shieldInformationBarrierSegment: ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField =
    deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField(
      val.shield_information_barrier_segment,
    );
  if (val.restricted_segment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "restricted_segment" of type "ShieldInformationBarrierSegmentRestrictionMini" to be defined',
    });
  }
  const restrictedSegment: ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField =
    deserializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField(
      val.restricted_segment,
    );
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
        'Expecting string for "id" of type "ShieldInformationBarrierSegmentRestrictionMini"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return {
    shieldInformationBarrierSegment: shieldInformationBarrierSegment,
    restrictedSegment: restrictedSegment,
    type: type,
    id: id,
  } satisfies ShieldInformationBarrierSegmentRestrictionMini;
}

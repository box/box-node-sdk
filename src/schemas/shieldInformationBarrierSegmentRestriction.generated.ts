import { serializeShieldInformationBarrierSegmentRestrictionBaseTypeField } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { deserializeShieldInformationBarrierSegmentRestrictionBaseTypeField } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { serializeShieldInformationBarrierSegmentRestrictionBase } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { deserializeShieldInformationBarrierSegmentRestrictionBase } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { serializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField } from './shieldInformationBarrierSegmentRestrictionMini.generated.js';
import { deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField } from './shieldInformationBarrierSegmentRestrictionMini.generated.js';
import { serializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField } from './shieldInformationBarrierSegmentRestrictionMini.generated.js';
import { deserializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField } from './shieldInformationBarrierSegmentRestrictionMini.generated.js';
import { serializeShieldInformationBarrierSegmentRestrictionMini } from './shieldInformationBarrierSegmentRestrictionMini.generated.js';
import { deserializeShieldInformationBarrierSegmentRestrictionMini } from './shieldInformationBarrierSegmentRestrictionMini.generated.js';
import { serializeShieldInformationBarrierBase } from './shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBase } from './shieldInformationBarrierBase.generated.js';
import { serializeUserBase } from './userBase.generated.js';
import { deserializeUserBase } from './userBase.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ShieldInformationBarrierSegmentRestrictionBaseTypeField } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { ShieldInformationBarrierSegmentRestrictionBase } from './shieldInformationBarrierSegmentRestrictionBase.generated.js';
import { ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField } from './shieldInformationBarrierSegmentRestrictionMini.generated.js';
import { ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField } from './shieldInformationBarrierSegmentRestrictionMini.generated.js';
import { ShieldInformationBarrierSegmentRestrictionMini } from './shieldInformationBarrierSegmentRestrictionMini.generated.js';
import { ShieldInformationBarrierBase } from './shieldInformationBarrierBase.generated.js';
import { UserBase } from './userBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ShieldInformationBarrierSegmentRestriction =
  ShieldInformationBarrierSegmentRestrictionMini & {
    readonly shieldInformationBarrier?: ShieldInformationBarrierBase;
    /**
     * ISO date time string when this
     * shield information barrier
     * Segment Restriction object was created. */
    readonly createdAt?: DateTime;
    readonly createdBy?: UserBase;
    /**
     * ISO date time string when this
     * shield information barrier segment
     * Restriction was updated. */
    readonly updatedAt?: DateTime;
    readonly updatedBy?: UserBase;
  };
export function serializeShieldInformationBarrierSegmentRestriction(
  val: ShieldInformationBarrierSegmentRestriction,
): SerializedData {
  const base: any =
    serializeShieldInformationBarrierSegmentRestrictionMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentRestriction"',
    });
  }
  return {
    ...base,
    ...{
      ['shield_information_barrier']:
        val.shieldInformationBarrier == void 0
          ? val.shieldInformationBarrier
          : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
      ['created_at']:
        val.createdAt == void 0
          ? val.createdAt
          : serializeDateTime(val.createdAt),
      ['created_by']:
        val.createdBy == void 0
          ? val.createdBy
          : serializeUserBase(val.createdBy),
      ['updated_at']:
        val.updatedAt == void 0
          ? val.updatedAt
          : serializeDateTime(val.updatedAt),
      ['updated_by']:
        val.updatedBy == void 0
          ? val.updatedBy
          : serializeUserBase(val.updatedBy),
    },
  };
}
export function deserializeShieldInformationBarrierSegmentRestriction(
  val: SerializedData,
): ShieldInformationBarrierSegmentRestriction {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentRestriction"',
    });
  }
  const shieldInformationBarrier: undefined | ShieldInformationBarrierBase =
    val.shield_information_barrier == void 0
      ? void 0
      : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "ShieldInformationBarrierSegmentRestriction"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const createdBy: undefined | UserBase =
    val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
  if (!(val.updated_at == void 0) && !sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "updated_at" of type "ShieldInformationBarrierSegmentRestriction"',
    });
  }
  const updatedAt: undefined | DateTime =
    val.updated_at == void 0 ? void 0 : deserializeDateTime(val.updated_at);
  const updatedBy: undefined | UserBase =
    val.updated_by == void 0 ? void 0 : deserializeUserBase(val.updated_by);
  if (val.shield_information_barrier_segment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "shield_information_barrier_segment" of type "ShieldInformationBarrierSegmentRestriction" to be defined',
    });
  }
  const shieldInformationBarrierSegment: ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField =
    deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField(
      val.shield_information_barrier_segment,
    );
  if (val.restricted_segment == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "restricted_segment" of type "ShieldInformationBarrierSegmentRestriction" to be defined',
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
        'Expecting string for "id" of type "ShieldInformationBarrierSegmentRestriction"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return {
    shieldInformationBarrier: shieldInformationBarrier,
    createdAt: createdAt,
    createdBy: createdBy,
    updatedAt: updatedAt,
    updatedBy: updatedBy,
    shieldInformationBarrierSegment: shieldInformationBarrierSegment,
    restrictedSegment: restrictedSegment,
    type: type,
    id: id,
  } satisfies ShieldInformationBarrierSegmentRestriction;
}

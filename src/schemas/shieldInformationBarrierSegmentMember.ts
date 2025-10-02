import { serializeShieldInformationBarrierSegmentMemberBaseTypeField } from './shieldInformationBarrierSegmentMemberBase';
import { deserializeShieldInformationBarrierSegmentMemberBaseTypeField } from './shieldInformationBarrierSegmentMemberBase';
import { serializeShieldInformationBarrierSegmentMemberBase } from './shieldInformationBarrierSegmentMemberBase';
import { deserializeShieldInformationBarrierSegmentMemberBase } from './shieldInformationBarrierSegmentMemberBase';
import { serializeShieldInformationBarrierSegmentMemberMini } from './shieldInformationBarrierSegmentMemberMini';
import { deserializeShieldInformationBarrierSegmentMemberMini } from './shieldInformationBarrierSegmentMemberMini';
import { serializeShieldInformationBarrierBase } from './shieldInformationBarrierBase';
import { deserializeShieldInformationBarrierBase } from './shieldInformationBarrierBase';
import { serializeUserBase } from './userBase';
import { deserializeUserBase } from './userBase';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { ShieldInformationBarrierSegmentMemberBaseTypeField } from './shieldInformationBarrierSegmentMemberBase';
import { ShieldInformationBarrierSegmentMemberBase } from './shieldInformationBarrierSegmentMemberBase';
import { ShieldInformationBarrierSegmentMemberMini } from './shieldInformationBarrierSegmentMemberMini';
import { ShieldInformationBarrierBase } from './shieldInformationBarrierBase';
import { UserBase } from './userBase';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField =
  'shield_information_barrier_segment';
export interface ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField {
  /**
   * The ID reference of the requesting
   * shield information barrier segment. */
  readonly id?: string;
  /**
   * The type of the shield information barrier segment. */
  readonly type?: ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField;
  readonly rawData?: SerializedData;
}
export type ShieldInformationBarrierSegmentMember =
  ShieldInformationBarrierSegmentMemberMini & {
    readonly shieldInformationBarrier?: ShieldInformationBarrierBase;
    /**
     * The `type` and `id` of the requested
     * shield information barrier segment. */
    readonly shieldInformationBarrierSegment?: ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField;
    /**
     * ISO date time string when this shield
     * information barrier object was created. */
    readonly createdAt?: DateTime;
    readonly createdBy?: UserBase;
    /**
     * ISO date time string when this
     * shield information barrier segment Member was updated. */
    readonly updatedAt?: DateTime;
    readonly updatedBy?: UserBase;
  };
export function serializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField(
  val: ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField(
  val: SerializedData,
): ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField {
  if (val == 'shield_information_barrier_segment') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField",
  });
}
export function serializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField(
  val: ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField(
            val.type,
          ),
  };
}
export function deserializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField(
  val: SerializedData,
): ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type:
    | undefined
    | ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField(
          val.type,
        );
  return {
    id: id,
    type: type,
  } satisfies ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField;
}
export function serializeShieldInformationBarrierSegmentMember(
  val: ShieldInformationBarrierSegmentMember,
): SerializedData {
  const base: any = serializeShieldInformationBarrierSegmentMemberMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierSegmentMember"',
    });
  }
  return {
    ...base,
    ...{
      ['shield_information_barrier']:
        val.shieldInformationBarrier == void 0
          ? val.shieldInformationBarrier
          : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
      ['shield_information_barrier_segment']:
        val.shieldInformationBarrierSegment == void 0
          ? val.shieldInformationBarrierSegment
          : serializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField(
              val.shieldInformationBarrierSegment,
            ),
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
export function deserializeShieldInformationBarrierSegmentMember(
  val: SerializedData,
): ShieldInformationBarrierSegmentMember {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierSegmentMember"',
    });
  }
  const shieldInformationBarrier: undefined | ShieldInformationBarrierBase =
    val.shield_information_barrier == void 0
      ? void 0
      : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
  const shieldInformationBarrierSegment:
    | undefined
    | ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField =
    val.shield_information_barrier_segment == void 0
      ? void 0
      : deserializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField(
          val.shield_information_barrier_segment,
        );
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "ShieldInformationBarrierSegmentMember"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const createdBy: undefined | UserBase =
    val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
  if (!(val.updated_at == void 0) && !sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "updated_at" of type "ShieldInformationBarrierSegmentMember"',
    });
  }
  const updatedAt: undefined | DateTime =
    val.updated_at == void 0 ? void 0 : deserializeDateTime(val.updated_at);
  const updatedBy: undefined | UserBase =
    val.updated_by == void 0 ? void 0 : deserializeUserBase(val.updated_by);
  const user: undefined | UserBase =
    val.user == void 0 ? void 0 : deserializeUserBase(val.user);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierSegmentMember"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ShieldInformationBarrierSegmentMemberBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierSegmentMemberBaseTypeField(val.type);
  return {
    shieldInformationBarrier: shieldInformationBarrier,
    shieldInformationBarrierSegment: shieldInformationBarrierSegment,
    createdAt: createdAt,
    createdBy: createdBy,
    updatedAt: updatedAt,
    updatedBy: updatedBy,
    user: user,
    id: id,
    type: type,
  } satisfies ShieldInformationBarrierSegmentMember;
}

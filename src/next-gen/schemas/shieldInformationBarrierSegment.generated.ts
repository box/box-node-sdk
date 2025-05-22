import { serializeShieldInformationBarrierBase } from './shieldInformationBarrierBase.generated.js';
import { deserializeShieldInformationBarrierBase } from './shieldInformationBarrierBase.generated.js';
import { serializeUserBase } from './userBase.generated.js';
import { deserializeUserBase } from './userBase.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
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
export type ShieldInformationBarrierSegmentTypeField =
  'shield_information_barrier_segment';
export interface ShieldInformationBarrierSegment {
  /**
   * The unique identifier for the shield information barrier segment */
  readonly id?: string;
  /**
   * The type of the shield information barrier segment */
  readonly type?: ShieldInformationBarrierSegmentTypeField;
  readonly shieldInformationBarrier?: ShieldInformationBarrierBase;
  /**
   * Name of the shield information barrier segment */
  readonly name?: string;
  /**
   * Description of the shield information barrier segment */
  readonly description?: string;
  /**
   * ISO date time string when this shield information
   * barrier object was created. */
  readonly createdAt?: DateTime;
  readonly createdBy?: UserBase;
  /**
   * ISO date time string when this
   * shield information barrier segment was updated. */
  readonly updatedAt?: DateTime;
  readonly updatedBy?: UserBase;
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierSegmentTypeField(
  val: ShieldInformationBarrierSegmentTypeField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierSegmentTypeField(
  val: SerializedData,
): ShieldInformationBarrierSegmentTypeField {
  if (val == 'shield_information_barrier_segment') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldInformationBarrierSegmentTypeField",
  });
}
export function serializeShieldInformationBarrierSegment(
  val: ShieldInformationBarrierSegment,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldInformationBarrierSegmentTypeField(val.type),
    ['shield_information_barrier']:
      val.shieldInformationBarrier == void 0
        ? val.shieldInformationBarrier
        : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
    ['name']: val.name,
    ['description']: val.description,
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
  };
}
export function deserializeShieldInformationBarrierSegment(
  val: SerializedData,
): ShieldInformationBarrierSegment {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierSegment"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierSegment"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ShieldInformationBarrierSegmentTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierSegmentTypeField(val.type);
  const shieldInformationBarrier: undefined | ShieldInformationBarrierBase =
    val.shield_information_barrier == void 0
      ? void 0
      : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShieldInformationBarrierSegment"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "ShieldInformationBarrierSegment"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "ShieldInformationBarrierSegment"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const createdBy: undefined | UserBase =
    val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
  if (!(val.updated_at == void 0) && !sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "updated_at" of type "ShieldInformationBarrierSegment"',
    });
  }
  const updatedAt: undefined | DateTime =
    val.updated_at == void 0 ? void 0 : deserializeDateTime(val.updated_at);
  const updatedBy: undefined | UserBase =
    val.updated_by == void 0 ? void 0 : deserializeUserBase(val.updated_by);
  return {
    id: id,
    type: type,
    shieldInformationBarrier: shieldInformationBarrier,
    name: name,
    description: description,
    createdAt: createdAt,
    createdBy: createdBy,
    updatedAt: updatedAt,
    updatedBy: updatedBy,
  } satisfies ShieldInformationBarrierSegment;
}

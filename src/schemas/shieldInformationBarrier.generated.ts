import { serializeEnterpriseBase } from './enterpriseBase.generated.js';
import { deserializeEnterpriseBase } from './enterpriseBase.generated.js';
import { serializeUserBase } from './userBase.generated.js';
import { deserializeUserBase } from './userBase.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { EnterpriseBase } from './enterpriseBase.generated.js';
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
export type ShieldInformationBarrierTypeField = 'shield_information_barrier';
export type ShieldInformationBarrierStatusField =
  | 'draft'
  | 'pending'
  | 'disabled'
  | 'enabled'
  | 'invalid'
  | string;
export interface ShieldInformationBarrier {
  /**
   * The unique identifier for the shield information barrier. */
  readonly id?: string;
  /**
   * The type of the shield information barrier. */
  readonly type?: ShieldInformationBarrierTypeField;
  /**
   * The `type` and `id` of enterprise this barrier is under. */
  readonly enterprise?: EnterpriseBase;
  /**
   * Status of the shield information barrier. */
  readonly status?: ShieldInformationBarrierStatusField;
  /**
   * ISO date time string when this
   * shield information barrier object was created. */
  readonly createdAt?: DateTime;
  /**
   * The user who created this shield information barrier. */
  readonly createdBy?: UserBase;
  /**
   * ISO date time string when this shield information barrier was updated. */
  readonly updatedAt?: DateTime;
  /**
   * The user that updated this shield information barrier. */
  readonly updatedBy?: UserBase;
  /**
   * ISO date time string when this shield information barrier was enabled. */
  readonly enabledAt?: DateTime;
  readonly enabledBy?: UserBase;
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierTypeField(
  val: ShieldInformationBarrierTypeField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierTypeField(
  val: SerializedData,
): ShieldInformationBarrierTypeField {
  if (val == 'shield_information_barrier') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldInformationBarrierTypeField",
  });
}
export function serializeShieldInformationBarrierStatusField(
  val: ShieldInformationBarrierStatusField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierStatusField(
  val: SerializedData,
): ShieldInformationBarrierStatusField {
  if (val == 'draft') {
    return val;
  }
  if (val == 'pending') {
    return val;
  }
  if (val == 'disabled') {
    return val;
  }
  if (val == 'enabled') {
    return val;
  }
  if (val == 'invalid') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldInformationBarrierStatusField",
  });
}
export function serializeShieldInformationBarrier(
  val: ShieldInformationBarrier,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldInformationBarrierTypeField(val.type),
    ['enterprise']:
      val.enterprise == void 0
        ? val.enterprise
        : serializeEnterpriseBase(val.enterprise),
    ['status']:
      val.status == void 0
        ? val.status
        : serializeShieldInformationBarrierStatusField(val.status),
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
    ['enabled_at']:
      val.enabledAt == void 0
        ? val.enabledAt
        : serializeDateTime(val.enabledAt),
    ['enabled_by']:
      val.enabledBy == void 0
        ? val.enabledBy
        : serializeUserBase(val.enabledBy),
  };
}
export function deserializeShieldInformationBarrier(
  val: SerializedData,
): ShieldInformationBarrier {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrier"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShieldInformationBarrier"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ShieldInformationBarrierTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierTypeField(val.type);
  const enterprise: undefined | EnterpriseBase =
    val.enterprise == void 0
      ? void 0
      : deserializeEnterpriseBase(val.enterprise);
  const status: undefined | ShieldInformationBarrierStatusField =
    val.status == void 0
      ? void 0
      : deserializeShieldInformationBarrierStatusField(val.status);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "ShieldInformationBarrier"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const createdBy: undefined | UserBase =
    val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
  if (!(val.updated_at == void 0) && !sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "updated_at" of type "ShieldInformationBarrier"',
    });
  }
  const updatedAt: undefined | DateTime =
    val.updated_at == void 0 ? void 0 : deserializeDateTime(val.updated_at);
  const updatedBy: undefined | UserBase =
    val.updated_by == void 0 ? void 0 : deserializeUserBase(val.updated_by);
  if (!(val.enabled_at == void 0) && !sdIsString(val.enabled_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "enabled_at" of type "ShieldInformationBarrier"',
    });
  }
  const enabledAt: undefined | DateTime =
    val.enabled_at == void 0 ? void 0 : deserializeDateTime(val.enabled_at);
  const enabledBy: undefined | UserBase =
    val.enabled_by == void 0 ? void 0 : deserializeUserBase(val.enabled_by);
  return {
    id: id,
    type: type,
    enterprise: enterprise,
    status: status,
    createdAt: createdAt,
    createdBy: createdBy,
    updatedAt: updatedAt,
    updatedBy: updatedBy,
    enabledAt: enabledAt,
    enabledBy: enabledBy,
  } satisfies ShieldInformationBarrier;
}

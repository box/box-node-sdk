import { serializeShieldInformationBarrierReportBaseTypeField } from './shieldInformationBarrierReportBase.generated.js';
import { deserializeShieldInformationBarrierReportBaseTypeField } from './shieldInformationBarrierReportBase.generated.js';
import { serializeShieldInformationBarrierReportBase } from './shieldInformationBarrierReportBase.generated.js';
import { deserializeShieldInformationBarrierReportBase } from './shieldInformationBarrierReportBase.generated.js';
import { serializeShieldInformationBarrierReference } from './shieldInformationBarrierReference.generated.js';
import { deserializeShieldInformationBarrierReference } from './shieldInformationBarrierReference.generated.js';
import { serializeShieldInformationBarrierReportDetails } from './shieldInformationBarrierReportDetails.generated.js';
import { deserializeShieldInformationBarrierReportDetails } from './shieldInformationBarrierReportDetails.generated.js';
import { serializeUserBase } from './userBase.generated.js';
import { deserializeUserBase } from './userBase.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { ShieldInformationBarrierReportBaseTypeField } from './shieldInformationBarrierReportBase.generated.js';
import { ShieldInformationBarrierReportBase } from './shieldInformationBarrierReportBase.generated.js';
import { ShieldInformationBarrierReference } from './shieldInformationBarrierReference.generated.js';
import { ShieldInformationBarrierReportDetails } from './shieldInformationBarrierReportDetails.generated.js';
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
export type ShieldInformationBarrierReportStatusField =
  | 'pending'
  | 'error'
  | 'done'
  | 'cancelled'
  | string;
export type ShieldInformationBarrierReport =
  ShieldInformationBarrierReportBase & {
    readonly shieldInformationBarrier?: ShieldInformationBarrierReference;
    /**
     * Status of the shield information report. */
    readonly status?: ShieldInformationBarrierReportStatusField;
    readonly details?: ShieldInformationBarrierReportDetails;
    /**
     * ISO date time string when this
     * shield information barrier report object was created. */
    readonly createdAt?: DateTime;
    readonly createdBy?: UserBase;
    /**
     * ISO date time string when this
     * shield information barrier report was updated. */
    readonly updatedAt?: DateTime;
  };
export function serializeShieldInformationBarrierReportStatusField(
  val: ShieldInformationBarrierReportStatusField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierReportStatusField(
  val: SerializedData,
): ShieldInformationBarrierReportStatusField {
  if (val == 'pending') {
    return val;
  }
  if (val == 'error') {
    return val;
  }
  if (val == 'done') {
    return val;
  }
  if (val == 'cancelled') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldInformationBarrierReportStatusField",
  });
}
export function serializeShieldInformationBarrierReport(
  val: ShieldInformationBarrierReport,
): SerializedData {
  const base: any = serializeShieldInformationBarrierReportBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierReport"',
    });
  }
  return {
    ...base,
    ...{
      ['shield_information_barrier']:
        val.shieldInformationBarrier == void 0
          ? val.shieldInformationBarrier
          : serializeShieldInformationBarrierReference(
              val.shieldInformationBarrier,
            ),
      ['status']:
        val.status == void 0
          ? val.status
          : serializeShieldInformationBarrierReportStatusField(val.status),
      ['details']:
        val.details == void 0
          ? val.details
          : serializeShieldInformationBarrierReportDetails(val.details),
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
    },
  };
}
export function deserializeShieldInformationBarrierReport(
  val: SerializedData,
): ShieldInformationBarrierReport {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierReport"',
    });
  }
  const shieldInformationBarrier:
    | undefined
    | ShieldInformationBarrierReference =
    val.shield_information_barrier == void 0
      ? void 0
      : deserializeShieldInformationBarrierReference(
          val.shield_information_barrier,
        );
  const status: undefined | ShieldInformationBarrierReportStatusField =
    val.status == void 0
      ? void 0
      : deserializeShieldInformationBarrierReportStatusField(val.status);
  const details: undefined | ShieldInformationBarrierReportDetails =
    val.details == void 0
      ? void 0
      : deserializeShieldInformationBarrierReportDetails(val.details);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "ShieldInformationBarrierReport"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const createdBy: undefined | UserBase =
    val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
  if (!(val.updated_at == void 0) && !sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "updated_at" of type "ShieldInformationBarrierReport"',
    });
  }
  const updatedAt: undefined | DateTime =
    val.updated_at == void 0 ? void 0 : deserializeDateTime(val.updated_at);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierReport"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ShieldInformationBarrierReportBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierReportBaseTypeField(val.type);
  return {
    shieldInformationBarrier: shieldInformationBarrier,
    status: status,
    details: details,
    createdAt: createdAt,
    createdBy: createdBy,
    updatedAt: updatedAt,
    id: id,
    type: type,
  } satisfies ShieldInformationBarrierReport;
}

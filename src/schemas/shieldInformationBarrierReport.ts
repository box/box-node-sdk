import { serializeShieldInformationBarrierReportBaseTypeField } from './shieldInformationBarrierReportBase';
import { deserializeShieldInformationBarrierReportBaseTypeField } from './shieldInformationBarrierReportBase';
import { serializeShieldInformationBarrierReportBase } from './shieldInformationBarrierReportBase';
import { deserializeShieldInformationBarrierReportBase } from './shieldInformationBarrierReportBase';
import { serializeShieldInformationBarrierReference } from './shieldInformationBarrierReference';
import { deserializeShieldInformationBarrierReference } from './shieldInformationBarrierReference';
import { serializeShieldInformationBarrierReportDetails } from './shieldInformationBarrierReportDetails';
import { deserializeShieldInformationBarrierReportDetails } from './shieldInformationBarrierReportDetails';
import { serializeUserBase } from './userBase';
import { deserializeUserBase } from './userBase';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { ShieldInformationBarrierReportBaseTypeField } from './shieldInformationBarrierReportBase';
import { ShieldInformationBarrierReportBase } from './shieldInformationBarrierReportBase';
import { ShieldInformationBarrierReference } from './shieldInformationBarrierReference';
import { ShieldInformationBarrierReportDetails } from './shieldInformationBarrierReportDetails';
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

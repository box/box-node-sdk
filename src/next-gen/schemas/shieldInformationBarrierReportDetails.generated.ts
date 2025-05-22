import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface ShieldInformationBarrierReportDetailsDetailsField {
  /**
   * Folder ID for locating this report */
  readonly folderId?: string;
  readonly rawData?: SerializedData;
}
export interface ShieldInformationBarrierReportDetails {
  readonly details?: ShieldInformationBarrierReportDetailsDetailsField;
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierReportDetailsDetailsField(
  val: ShieldInformationBarrierReportDetailsDetailsField,
): SerializedData {
  return { ['folder_id']: val.folderId };
}
export function deserializeShieldInformationBarrierReportDetailsDetailsField(
  val: SerializedData,
): ShieldInformationBarrierReportDetailsDetailsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShieldInformationBarrierReportDetailsDetailsField"',
    });
  }
  if (!(val.folder_id == void 0) && !sdIsString(val.folder_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "folder_id" of type "ShieldInformationBarrierReportDetailsDetailsField"',
    });
  }
  const folderId: undefined | string =
    val.folder_id == void 0 ? void 0 : val.folder_id;
  return {
    folderId: folderId,
  } satisfies ShieldInformationBarrierReportDetailsDetailsField;
}
export function serializeShieldInformationBarrierReportDetails(
  val: ShieldInformationBarrierReportDetails,
): SerializedData {
  return {
    ['details']:
      val.details == void 0
        ? val.details
        : serializeShieldInformationBarrierReportDetailsDetailsField(
            val.details,
          ),
  };
}
export function deserializeShieldInformationBarrierReportDetails(
  val: SerializedData,
): ShieldInformationBarrierReportDetails {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierReportDetails"',
    });
  }
  const details: undefined | ShieldInformationBarrierReportDetailsDetailsField =
    val.details == void 0
      ? void 0
      : deserializeShieldInformationBarrierReportDetailsDetailsField(
          val.details,
        );
  return { details: details } satisfies ShieldInformationBarrierReportDetails;
}

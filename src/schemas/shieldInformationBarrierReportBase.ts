import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ShieldInformationBarrierReportBaseTypeField =
  'shield_information_barrier_report';
export interface ShieldInformationBarrierReportBase {
  /**
   * The unique identifier for the shield information barrier report. */
  readonly id?: string;
  /**
   * The type of the shield information barrier report. */
  readonly type?: ShieldInformationBarrierReportBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierReportBaseTypeField(
  val: ShieldInformationBarrierReportBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierReportBaseTypeField(
  val: SerializedData,
): ShieldInformationBarrierReportBaseTypeField {
  if (val == 'shield_information_barrier_report') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldInformationBarrierReportBaseTypeField",
  });
}
export function serializeShieldInformationBarrierReportBase(
  val: ShieldInformationBarrierReportBase,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldInformationBarrierReportBaseTypeField(val.type),
  };
}
export function deserializeShieldInformationBarrierReportBase(
  val: SerializedData,
): ShieldInformationBarrierReportBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierReportBase"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierReportBase"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ShieldInformationBarrierReportBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierReportBaseTypeField(val.type);
  return { id: id, type: type } satisfies ShieldInformationBarrierReportBase;
}

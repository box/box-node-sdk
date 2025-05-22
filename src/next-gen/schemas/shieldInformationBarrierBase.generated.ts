import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ShieldInformationBarrierBaseTypeField =
  'shield_information_barrier';
export interface ShieldInformationBarrierBase {
  /**
   * The unique identifier for the shield information barrier */
  readonly id?: string;
  /**
   * The type of the shield information barrier */
  readonly type?: ShieldInformationBarrierBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeShieldInformationBarrierBaseTypeField(
  val: ShieldInformationBarrierBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeShieldInformationBarrierBaseTypeField(
  val: SerializedData,
): ShieldInformationBarrierBaseTypeField {
  if (val == 'shield_information_barrier') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShieldInformationBarrierBaseTypeField",
  });
}
export function serializeShieldInformationBarrierBase(
  val: ShieldInformationBarrierBase,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShieldInformationBarrierBaseTypeField(val.type),
  };
}
export function deserializeShieldInformationBarrierBase(
  val: SerializedData,
): ShieldInformationBarrierBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShieldInformationBarrierBase"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShieldInformationBarrierBase"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | ShieldInformationBarrierBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeShieldInformationBarrierBaseTypeField(val.type);
  return { id: id, type: type } satisfies ShieldInformationBarrierBase;
}

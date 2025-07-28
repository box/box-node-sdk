import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { UserMini } from './userMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type DevicePinnerTypeField = 'device_pinner';
export interface DevicePinner {
  /**
   * The unique identifier for this device pin. */
  readonly id?: string;
  /**
   * The value will always be `device_pinner`. */
  readonly type?: DevicePinnerTypeField;
  readonly ownedBy?: UserMini;
  /**
   * The type of device being pinned. */
  readonly productName?: string;
  readonly rawData?: SerializedData;
}
export function serializeDevicePinnerTypeField(
  val: DevicePinnerTypeField,
): SerializedData {
  return val;
}
export function deserializeDevicePinnerTypeField(
  val: SerializedData,
): DevicePinnerTypeField {
  if (val == 'device_pinner') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize DevicePinnerTypeField" });
}
export function serializeDevicePinner(val: DevicePinner): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeDevicePinnerTypeField(val.type),
    ['owned_by']:
      val.ownedBy == void 0 ? val.ownedBy : serializeUserMini(val.ownedBy),
    ['product_name']: val.productName,
  };
}
export function deserializeDevicePinner(val: SerializedData): DevicePinner {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "DevicePinner"' });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "DevicePinner"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | DevicePinnerTypeField =
    val.type == void 0 ? void 0 : deserializeDevicePinnerTypeField(val.type);
  const ownedBy: undefined | UserMini =
    val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
  if (!(val.product_name == void 0) && !sdIsString(val.product_name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "product_name" of type "DevicePinner"',
    });
  }
  const productName: undefined | string =
    val.product_name == void 0 ? void 0 : val.product_name;
  return {
    id: id,
    type: type,
    ownedBy: ownedBy,
    productName: productName,
  } satisfies DevicePinner;
}

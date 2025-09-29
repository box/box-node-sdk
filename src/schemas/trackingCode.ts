import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type TrackingCodeTypeField = 'tracking_code';
export interface TrackingCode {
  /**
   * The value will always be `tracking_code`. */
  readonly type?: TrackingCodeTypeField;
  /**
   * The name of the tracking code, which must be preconfigured in
   * the Admin Console. */
  readonly name?: string;
  /**
   * The value of the tracking code. */
  readonly value?: string;
  readonly rawData?: SerializedData;
}
export function serializeTrackingCodeTypeField(
  val: TrackingCodeTypeField,
): SerializedData {
  return val;
}
export function deserializeTrackingCodeTypeField(
  val: SerializedData,
): TrackingCodeTypeField {
  if (val == 'tracking_code') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize TrackingCodeTypeField" });
}
export function serializeTrackingCode(val: TrackingCode): SerializedData {
  return {
    ['type']:
      val.type == void 0 ? val.type : serializeTrackingCodeTypeField(val.type),
    ['name']: val.name,
    ['value']: val.value,
  };
}
export function deserializeTrackingCode(val: SerializedData): TrackingCode {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "TrackingCode"' });
  }
  const type: undefined | TrackingCodeTypeField =
    val.type == void 0 ? void 0 : deserializeTrackingCodeTypeField(val.type);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "TrackingCode"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.value == void 0) && !sdIsString(val.value)) {
    throw new BoxSdkError({
      message: 'Expecting string for "value" of type "TrackingCode"',
    });
  }
  const value: undefined | string = val.value == void 0 ? void 0 : val.value;
  return { type: type, name: name, value: value } satisfies TrackingCode;
}

import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type EnterpriseReferenceV2025R0TypeField = 'enterprise';
export interface EnterpriseReferenceV2025R0 {
  /**
   * The unique identifier for this enterprise. */
  readonly id?: string;
  /**
   * The value will always be `enterprise`. */
  readonly type?: EnterpriseReferenceV2025R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseReferenceV2025R0TypeField(
  val: EnterpriseReferenceV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeEnterpriseReferenceV2025R0TypeField(
  val: SerializedData,
): EnterpriseReferenceV2025R0TypeField {
  if (val == 'enterprise') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize EnterpriseReferenceV2025R0TypeField",
  });
}
export function serializeEnterpriseReferenceV2025R0(
  val: EnterpriseReferenceV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeEnterpriseReferenceV2025R0TypeField(val.type),
  };
}
export function deserializeEnterpriseReferenceV2025R0(
  val: SerializedData,
): EnterpriseReferenceV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseReferenceV2025R0"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "EnterpriseReferenceV2025R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | EnterpriseReferenceV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeEnterpriseReferenceV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies EnterpriseReferenceV2025R0;
}

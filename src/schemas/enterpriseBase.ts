import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type EnterpriseBaseTypeField = 'enterprise';
export interface EnterpriseBase {
  /**
   * The unique identifier for this enterprise. */
  readonly id?: string;
  /**
   * The value will always be `enterprise`. */
  readonly type?: EnterpriseBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseBaseTypeField(
  val: EnterpriseBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeEnterpriseBaseTypeField(
  val: SerializedData,
): EnterpriseBaseTypeField {
  if (val == 'enterprise') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize EnterpriseBaseTypeField",
  });
}
export function serializeEnterpriseBase(val: EnterpriseBase): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeEnterpriseBaseTypeField(val.type),
  };
}
export function deserializeEnterpriseBase(val: SerializedData): EnterpriseBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "EnterpriseBase"' });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "EnterpriseBase"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | EnterpriseBaseTypeField =
    val.type == void 0 ? void 0 : deserializeEnterpriseBaseTypeField(val.type);
  return { id: id, type: type } satisfies EnterpriseBase;
}

import { serializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { deserializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { EnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type EnterpriseConfigurationItemStringV2025R0 =
  EnterpriseConfigurationItemV2025R0 & {
    /**
     * The value of the enterprise configuration as a string. */
    readonly value?: string | null;
  };
export function serializeEnterpriseConfigurationItemStringV2025R0(
  val: EnterpriseConfigurationItemStringV2025R0,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseConfigurationItemStringV2025R0"',
    });
  }
  return { ...base, ...{ ['value']: val.value } };
}
export function deserializeEnterpriseConfigurationItemStringV2025R0(
  val: SerializedData,
): EnterpriseConfigurationItemStringV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseConfigurationItemStringV2025R0"',
    });
  }
  if (!(val.value == void 0) && !sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "EnterpriseConfigurationItemStringV2025R0"',
    });
  }
  const value: undefined | string = val.value == void 0 ? void 0 : val.value;
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationItemStringV2025R0"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationItemStringV2025R0;
}

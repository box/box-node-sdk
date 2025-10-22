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
export type EnterpriseConfigurationItemBooleanV2025R0 =
  EnterpriseConfigurationItemV2025R0 & {
    /**
     * The value of the enterprise configuration as a boolean. */
    readonly value?: boolean | null;
  };
export function serializeEnterpriseConfigurationItemBooleanV2025R0(
  val: EnterpriseConfigurationItemBooleanV2025R0,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationItemBooleanV2025R0"',
    });
  }
  return { ...base, ...{ ['value']: val.value } };
}
export function deserializeEnterpriseConfigurationItemBooleanV2025R0(
  val: SerializedData,
): EnterpriseConfigurationItemBooleanV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "EnterpriseConfigurationItemBooleanV2025R0"',
    });
  }
  if (!(val.value == void 0) && !sdIsBoolean(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "value" of type "EnterpriseConfigurationItemBooleanV2025R0"',
    });
  }
  const value: undefined | boolean = val.value == void 0 ? void 0 : val.value;
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationItemBooleanV2025R0"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseConfigurationItemBooleanV2025R0;
}

import { serializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { deserializeEnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { serializeEnterpriseFeatureSettingV2025R0 } from './enterpriseFeatureSettingV2025R0';
import { deserializeEnterpriseFeatureSettingV2025R0 } from './enterpriseFeatureSettingV2025R0';
import { EnterpriseConfigurationItemV2025R0 } from './enterpriseConfigurationItemV2025R0';
import { EnterpriseFeatureSettingV2025R0 } from './enterpriseFeatureSettingV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type EnterpriseFeatureSettingsItemV2025R0 =
  EnterpriseConfigurationItemV2025R0 & {
    readonly value?: EnterpriseFeatureSettingV2025R0;
  };
export function serializeEnterpriseFeatureSettingsItemV2025R0(
  val: EnterpriseFeatureSettingsItemV2025R0,
): SerializedData {
  const base: any = serializeEnterpriseConfigurationItemV2025R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseFeatureSettingsItemV2025R0"',
    });
  }
  return {
    ...base,
    ...{
      ['value']:
        val.value == void 0
          ? val.value
          : serializeEnterpriseFeatureSettingV2025R0(val.value),
    },
  };
}
export function deserializeEnterpriseFeatureSettingsItemV2025R0(
  val: SerializedData,
): EnterpriseFeatureSettingsItemV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseFeatureSettingsItemV2025R0"',
    });
  }
  const value: undefined | EnterpriseFeatureSettingV2025R0 =
    val.value == void 0
      ? void 0
      : deserializeEnterpriseFeatureSettingV2025R0(val.value);
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseFeatureSettingsItemV2025R0"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return {
    value: value,
    isUsed: isUsed,
  } satisfies EnterpriseFeatureSettingsItemV2025R0;
}

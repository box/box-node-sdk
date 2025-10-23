import { serializeShieldRuleItemV2025R0 } from './shieldRuleItemV2025R0';
import { deserializeShieldRuleItemV2025R0 } from './shieldRuleItemV2025R0';
import { ShieldRuleItemV2025R0 } from './shieldRuleItemV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface EnterpriseConfigurationShieldV2025R0 {
  /**
   * The shield rules configuration for the enterprise. */
  readonly shieldRules?: readonly ShieldRuleItemV2025R0[];
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseConfigurationShieldV2025R0(
  val: EnterpriseConfigurationShieldV2025R0,
): SerializedData {
  return {
    ['shield_rules']:
      val.shieldRules == void 0
        ? val.shieldRules
        : (val.shieldRules.map(function (
            item: ShieldRuleItemV2025R0,
          ): SerializedData {
            return serializeShieldRuleItemV2025R0(item);
          }) as readonly any[]),
  };
}
export function deserializeEnterpriseConfigurationShieldV2025R0(
  val: SerializedData,
): EnterpriseConfigurationShieldV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseConfigurationShieldV2025R0"',
    });
  }
  if (!(val.shield_rules == void 0) && !sdIsList(val.shield_rules)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "shield_rules" of type "EnterpriseConfigurationShieldV2025R0"',
    });
  }
  const shieldRules: undefined | readonly ShieldRuleItemV2025R0[] =
    val.shield_rules == void 0
      ? void 0
      : sdIsList(val.shield_rules)
        ? (val.shield_rules.map(function (
            itm: SerializedData,
          ): ShieldRuleItemV2025R0 {
            return deserializeShieldRuleItemV2025R0(itm);
          }) as readonly any[])
        : [];
  return {
    shieldRules: shieldRules,
  } satisfies EnterpriseConfigurationShieldV2025R0;
}

import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface EnterpriseConfigurationItemV2025R0 {
  /**
   * Indicates whether a configuration is used for a given enterprise. */
  readonly isUsed?: boolean;
  readonly rawData?: SerializedData;
}
export function serializeEnterpriseConfigurationItemV2025R0(
  val: EnterpriseConfigurationItemV2025R0,
): SerializedData {
  return { ['is_used']: val.isUsed };
}
export function deserializeEnterpriseConfigurationItemV2025R0(
  val: SerializedData,
): EnterpriseConfigurationItemV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EnterpriseConfigurationItemV2025R0"',
    });
  }
  if (!(val.is_used == void 0) && !sdIsBoolean(val.is_used)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_used" of type "EnterpriseConfigurationItemV2025R0"',
    });
  }
  const isUsed: undefined | boolean =
    val.is_used == void 0 ? void 0 : val.is_used;
  return { isUsed: isUsed } satisfies EnterpriseConfigurationItemV2025R0;
}

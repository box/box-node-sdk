import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface IntegrationMappingSlackOptions {
  /**
   * Indicates whether or not channel member
   * access to the underlying box item
   * should be automatically managed.
   * Depending on type of channel, access is managed
   * through creating collaborations or shared links. */
  readonly isAccessManagementDisabled?: boolean;
  readonly rawData?: SerializedData;
}
export function serializeIntegrationMappingSlackOptions(
  val: IntegrationMappingSlackOptions,
): SerializedData {
  return { ['is_access_management_disabled']: val.isAccessManagementDisabled };
}
export function deserializeIntegrationMappingSlackOptions(
  val: SerializedData,
): IntegrationMappingSlackOptions {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "IntegrationMappingSlackOptions"',
    });
  }
  if (
    !(val.is_access_management_disabled == void 0) &&
    !sdIsBoolean(val.is_access_management_disabled)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_access_management_disabled" of type "IntegrationMappingSlackOptions"',
    });
  }
  const isAccessManagementDisabled: undefined | boolean =
    val.is_access_management_disabled == void 0
      ? void 0
      : val.is_access_management_disabled;
  return {
    isAccessManagementDisabled: isAccessManagementDisabled,
  } satisfies IntegrationMappingSlackOptions;
}

import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface KeysafeSettingsV2025R0 {
  /**
   * Whether KeySafe addon is enabled for the enterprise. */
  readonly keysafeEnabled?: boolean;
  /**
   * The cloud provider. */
  readonly cloudProvider?: string | null;
  /**
   * The key ID. */
  readonly keyId?: string | null;
  /**
   * The account ID. */
  readonly accountId?: string | null;
  /**
   * The location ID. */
  readonly locationId?: string | null;
  /**
   * The project ID. */
  readonly projectId?: string | null;
  /**
   * The key ring ID. */
  readonly keyringId?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeKeysafeSettingsV2025R0(
  val: KeysafeSettingsV2025R0,
): SerializedData {
  return {
    ['keysafe_enabled']: val.keysafeEnabled,
    ['cloud_provider']: val.cloudProvider,
    ['key_id']: val.keyId,
    ['account_id']: val.accountId,
    ['location_id']: val.locationId,
    ['project_id']: val.projectId,
    ['keyring_id']: val.keyringId,
  };
}
export function deserializeKeysafeSettingsV2025R0(
  val: SerializedData,
): KeysafeSettingsV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "KeysafeSettingsV2025R0"',
    });
  }
  if (!(val.keysafe_enabled == void 0) && !sdIsBoolean(val.keysafe_enabled)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "keysafe_enabled" of type "KeysafeSettingsV2025R0"',
    });
  }
  const keysafeEnabled: undefined | boolean =
    val.keysafe_enabled == void 0 ? void 0 : val.keysafe_enabled;
  if (!(val.cloud_provider == void 0) && !sdIsString(val.cloud_provider)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "cloud_provider" of type "KeysafeSettingsV2025R0"',
    });
  }
  const cloudProvider: undefined | string =
    val.cloud_provider == void 0 ? void 0 : val.cloud_provider;
  if (!(val.key_id == void 0) && !sdIsString(val.key_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "key_id" of type "KeysafeSettingsV2025R0"',
    });
  }
  const keyId: undefined | string = val.key_id == void 0 ? void 0 : val.key_id;
  if (!(val.account_id == void 0) && !sdIsString(val.account_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "account_id" of type "KeysafeSettingsV2025R0"',
    });
  }
  const accountId: undefined | string =
    val.account_id == void 0 ? void 0 : val.account_id;
  if (!(val.location_id == void 0) && !sdIsString(val.location_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "location_id" of type "KeysafeSettingsV2025R0"',
    });
  }
  const locationId: undefined | string =
    val.location_id == void 0 ? void 0 : val.location_id;
  if (!(val.project_id == void 0) && !sdIsString(val.project_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "project_id" of type "KeysafeSettingsV2025R0"',
    });
  }
  const projectId: undefined | string =
    val.project_id == void 0 ? void 0 : val.project_id;
  if (!(val.keyring_id == void 0) && !sdIsString(val.keyring_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "keyring_id" of type "KeysafeSettingsV2025R0"',
    });
  }
  const keyringId: undefined | string =
    val.keyring_id == void 0 ? void 0 : val.keyring_id;
  return {
    keysafeEnabled: keysafeEnabled,
    cloudProvider: cloudProvider,
    keyId: keyId,
    accountId: accountId,
    locationId: locationId,
    projectId: projectId,
    keyringId: keyringId,
  } satisfies KeysafeSettingsV2025R0;
}

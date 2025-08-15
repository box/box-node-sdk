import { serializeUserReferenceV2025R0 } from './userReferenceV2025R0.generated.js';
import { deserializeUserReferenceV2025R0 } from './userReferenceV2025R0.generated.js';
import { UserReferenceV2025R0 } from './userReferenceV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface ExternalUsersSubmitDeleteJobRequestV2025R0 {
  /**
   * List of external users to delete. */
  readonly externalUsers: readonly UserReferenceV2025R0[];
  readonly rawData?: SerializedData;
}
export function serializeExternalUsersSubmitDeleteJobRequestV2025R0(
  val: ExternalUsersSubmitDeleteJobRequestV2025R0,
): SerializedData {
  return {
    ['external_users']: val.externalUsers.map(function (
      item: UserReferenceV2025R0,
    ): SerializedData {
      return serializeUserReferenceV2025R0(item);
    }) as readonly any[],
  };
}
export function deserializeExternalUsersSubmitDeleteJobRequestV2025R0(
  val: SerializedData,
): ExternalUsersSubmitDeleteJobRequestV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ExternalUsersSubmitDeleteJobRequestV2025R0"',
    });
  }
  if (val.external_users == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "external_users" of type "ExternalUsersSubmitDeleteJobRequestV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.external_users)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "external_users" of type "ExternalUsersSubmitDeleteJobRequestV2025R0"',
    });
  }
  const externalUsers: readonly UserReferenceV2025R0[] = sdIsList(
    val.external_users,
  )
    ? (val.external_users.map(function (
        itm: SerializedData,
      ): UserReferenceV2025R0 {
        return deserializeUserReferenceV2025R0(itm);
      }) as readonly any[])
    : [];
  return {
    externalUsers: externalUsers,
  } satisfies ExternalUsersSubmitDeleteJobRequestV2025R0;
}

import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface ExternalUserDeletionResultV2025R0 {
  /**
   * The ID of the external user. */
  readonly userId: string;
  /**
   * HTTP status code for a specific user's deletion request. */
  readonly status: number;
  /**
   * Deletion request status details. */
  readonly detail?: string;
  readonly rawData?: SerializedData;
}
export function serializeExternalUserDeletionResultV2025R0(
  val: ExternalUserDeletionResultV2025R0,
): SerializedData {
  return {
    ['user_id']: val.userId,
    ['status']: val.status,
    ['detail']: val.detail,
  };
}
export function deserializeExternalUserDeletionResultV2025R0(
  val: SerializedData,
): ExternalUserDeletionResultV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ExternalUserDeletionResultV2025R0"',
    });
  }
  if (val.user_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "user_id" of type "ExternalUserDeletionResultV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.user_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "user_id" of type "ExternalUserDeletionResultV2025R0"',
    });
  }
  const userId: string = val.user_id;
  if (val.status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "status" of type "ExternalUserDeletionResultV2025R0" to be defined',
    });
  }
  if (!sdIsNumber(val.status)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "status" of type "ExternalUserDeletionResultV2025R0"',
    });
  }
  const status: number = val.status;
  if (!(val.detail == void 0) && !sdIsString(val.detail)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "detail" of type "ExternalUserDeletionResultV2025R0"',
    });
  }
  const detail: undefined | string = val.detail == void 0 ? void 0 : val.detail;
  return {
    userId: userId,
    status: status,
    detail: detail,
  } satisfies ExternalUserDeletionResultV2025R0;
}

import { serializeExternalUserDeletionResultV2025R0 } from './externalUserDeletionResultV2025R0.generated.js';
import { deserializeExternalUserDeletionResultV2025R0 } from './externalUserDeletionResultV2025R0.generated.js';
import { ExternalUserDeletionResultV2025R0 } from './externalUserDeletionResultV2025R0.generated.js';
import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface ExternalUsersSubmitDeleteJobResponseV2025R0 {
  /**
   * Array of results of each external user deletion request. */
  readonly entries: readonly ExternalUserDeletionResultV2025R0[];
  readonly rawData?: SerializedData;
}
export function serializeExternalUsersSubmitDeleteJobResponseV2025R0(
  val: ExternalUsersSubmitDeleteJobResponseV2025R0,
): SerializedData {
  return {
    ['entries']: val.entries.map(function (
      item: ExternalUserDeletionResultV2025R0,
    ): SerializedData {
      return serializeExternalUserDeletionResultV2025R0(item);
    }) as readonly any[],
  };
}
export function deserializeExternalUsersSubmitDeleteJobResponseV2025R0(
  val: SerializedData,
): ExternalUsersSubmitDeleteJobResponseV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ExternalUsersSubmitDeleteJobResponseV2025R0"',
    });
  }
  if (val.entries == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "entries" of type "ExternalUsersSubmitDeleteJobResponseV2025R0" to be defined',
    });
  }
  if (!sdIsList(val.entries)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "entries" of type "ExternalUsersSubmitDeleteJobResponseV2025R0"',
    });
  }
  const entries: readonly ExternalUserDeletionResultV2025R0[] = sdIsList(
    val.entries,
  )
    ? (val.entries.map(function (
        itm: SerializedData,
      ): ExternalUserDeletionResultV2025R0 {
        return deserializeExternalUserDeletionResultV2025R0(itm);
      }) as readonly any[])
    : [];
  return {
    entries: entries,
  } satisfies ExternalUsersSubmitDeleteJobResponseV2025R0;
}

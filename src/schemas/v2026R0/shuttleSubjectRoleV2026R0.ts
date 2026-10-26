import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleSubjectRoleV2026R0 =
  | 'owner'
  | 'creator'
  | 'updater'
  | 'namespace_account'
  | 'sharee'
  | 'account_holder'
  | 'unknown'
  | string;
export function serializeShuttleSubjectRoleV2026R0(
  val: ShuttleSubjectRoleV2026R0,
): SerializedData {
  return val;
}
export function deserializeShuttleSubjectRoleV2026R0(
  val: SerializedData,
): ShuttleSubjectRoleV2026R0 {
  if (val == 'owner') {
    return val;
  }
  if (val == 'creator') {
    return val;
  }
  if (val == 'updater') {
    return val;
  }
  if (val == 'namespace_account') {
    return val;
  }
  if (val == 'sharee') {
    return val;
  }
  if (val == 'account_holder') {
    return val;
  }
  if (val == 'unknown') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleSubjectRoleV2026R0",
  });
}

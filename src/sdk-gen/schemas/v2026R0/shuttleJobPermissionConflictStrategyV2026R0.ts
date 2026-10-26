import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleJobPermissionConflictStrategyV2026R0 =
  | 'preserve_structure_restrict_sharing'
  | 'preserve_structure_expand_sharing'
  | 'preserve_sharing_modify_structure'
  | 'warn_permissions_conflicts'
  | string;
export function serializeShuttleJobPermissionConflictStrategyV2026R0(
  val: ShuttleJobPermissionConflictStrategyV2026R0
): SerializedData {
  return val;
}
export function deserializeShuttleJobPermissionConflictStrategyV2026R0(
  val: SerializedData
): ShuttleJobPermissionConflictStrategyV2026R0 {
  if (val == 'preserve_structure_restrict_sharing') {
    return val;
  }
  if (val == 'preserve_structure_expand_sharing') {
    return val;
  }
  if (val == 'preserve_sharing_modify_structure') {
    return val;
  }
  if (val == 'warn_permissions_conflicts') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleJobPermissionConflictStrategyV2026R0",
  });
}

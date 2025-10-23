import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type CollaborationRestrictionV2025R0 = 'internal' | 'external' | string;
export function serializeCollaborationRestrictionV2025R0(
  val: CollaborationRestrictionV2025R0
): SerializedData {
  return val;
}
export function deserializeCollaborationRestrictionV2025R0(
  val: SerializedData
): CollaborationRestrictionV2025R0 {
  if (val == 'internal') {
    return val;
  }
  if (val == 'external') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollaborationRestrictionV2025R0",
  });
}

import { serializeGroupMini } from './groupMini.generated.js';
import { deserializeGroupMini } from './groupMini.generated.js';
import { serializeUserCollaborations } from './userCollaborations.generated.js';
import { deserializeUserCollaborations } from './userCollaborations.generated.js';
import { GroupMini } from './groupMini.generated.js';
import { UserCollaborations } from './userCollaborations.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type GroupMiniOrUserCollaborations = GroupMini | UserCollaborations;
export function serializeGroupMiniOrUserCollaborations(
  val: any,
): SerializedData {
  if (val.type == 'group') {
    return serializeGroupMini(val);
  }
  if (val.type == 'user') {
    return serializeUserCollaborations(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeGroupMiniOrUserCollaborations(
  val: SerializedData,
): GroupMiniOrUserCollaborations {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "GroupMiniOrUserCollaborations"',
    });
  }
  if (val.type == 'group') {
    return deserializeGroupMini(val);
  }
  if (val.type == 'user') {
    return deserializeUserCollaborations(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize GroupMiniOrUserCollaborations",
  });
}

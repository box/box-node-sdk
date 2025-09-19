import { serializeUserCollaborations } from './userCollaborations.js';
import { deserializeUserCollaborations } from './userCollaborations.js';
import { serializeGroupMini } from './groupMini.js';
import { deserializeGroupMini } from './groupMini.js';
import { UserCollaborations } from './userCollaborations.js';
import { GroupMini } from './groupMini.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type CollaborationAccessGrantee = UserCollaborations | GroupMini;
export function serializeCollaborationAccessGrantee(val: any): SerializedData {
  if (val.type == 'user') {
    return serializeUserCollaborations(val);
  }
  if (val.type == 'group') {
    return serializeGroupMini(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeCollaborationAccessGrantee(
  val: SerializedData
): CollaborationAccessGrantee {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CollaborationAccessGrantee"',
    });
  }
  if (val.type == 'user') {
    return deserializeUserCollaborations(val);
  }
  if (val.type == 'group') {
    return deserializeGroupMini(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize CollaborationAccessGrantee",
  });
}

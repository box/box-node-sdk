import { serializeUserCollaborations } from './userCollaborations';
import { deserializeUserCollaborations } from './userCollaborations';
import { serializeGroupMini } from './groupMini';
import { deserializeGroupMini } from './groupMini';
import { UserCollaborations } from './userCollaborations';
import { GroupMini } from './groupMini';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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
  val: SerializedData,
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

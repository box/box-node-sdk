import { serializeHubCollaborationUserV2025R0 } from './hubCollaborationUserV2025R0';
import { deserializeHubCollaborationUserV2025R0 } from './hubCollaborationUserV2025R0';
import { serializeGroupMiniV2025R0 } from './groupMiniV2025R0';
import { deserializeGroupMiniV2025R0 } from './groupMiniV2025R0';
import { HubCollaborationUserV2025R0 } from './hubCollaborationUserV2025R0';
import { GroupMiniV2025R0 } from './groupMiniV2025R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type HubAccessGranteeV2025R0 =
  | HubCollaborationUserV2025R0
  | GroupMiniV2025R0;
export function serializeHubAccessGranteeV2025R0(val: any): SerializedData {
  if (val.type == 'user') {
    return serializeHubCollaborationUserV2025R0(val);
  }
  if (val.type == 'group') {
    return serializeGroupMiniV2025R0(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeHubAccessGranteeV2025R0(
  val: SerializedData,
): HubAccessGranteeV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubAccessGranteeV2025R0"',
    });
  }
  if (val.type == 'user') {
    return deserializeHubCollaborationUserV2025R0(val);
  }
  if (val.type == 'group') {
    return deserializeGroupMiniV2025R0(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize HubAccessGranteeV2025R0",
  });
}

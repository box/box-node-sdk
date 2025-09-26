import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface HubCollaborationUpdateRequestV2025R0 {
  /**
   * The level of access granted to a Box Hub.
   * Possible values are `editor`, `viewer`, and `co-owner`. */
  readonly role?: string;
  readonly rawData?: SerializedData;
}
export function serializeHubCollaborationUpdateRequestV2025R0(
  val: HubCollaborationUpdateRequestV2025R0,
): SerializedData {
  return { ['role']: val.role };
}
export function deserializeHubCollaborationUpdateRequestV2025R0(
  val: SerializedData,
): HubCollaborationUpdateRequestV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "HubCollaborationUpdateRequestV2025R0"',
    });
  }
  if (!(val.role == void 0) && !sdIsString(val.role)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "role" of type "HubCollaborationUpdateRequestV2025R0"',
    });
  }
  const role: undefined | string = val.role == void 0 ? void 0 : val.role;
  return { role: role } satisfies HubCollaborationUpdateRequestV2025R0;
}

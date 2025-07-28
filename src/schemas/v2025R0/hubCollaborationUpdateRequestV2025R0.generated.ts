import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export interface HubCollaborationUpdateRequestV2025R0 {
  /**
   * The level of access granted to hub.
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

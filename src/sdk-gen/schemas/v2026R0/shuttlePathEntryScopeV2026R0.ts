import { serializeShuttlePathEntryAccountScopeV2026R0 } from './shuttlePathEntryAccountScopeV2026R0';
import { deserializeShuttlePathEntryAccountScopeV2026R0 } from './shuttlePathEntryAccountScopeV2026R0';
import { serializeShuttlePathEntrySharedSpaceScopeV2026R0 } from './shuttlePathEntrySharedSpaceScopeV2026R0';
import { deserializeShuttlePathEntrySharedSpaceScopeV2026R0 } from './shuttlePathEntrySharedSpaceScopeV2026R0';
import { ShuttlePathEntryAccountScopeV2026R0 } from './shuttlePathEntryAccountScopeV2026R0';
import { ShuttlePathEntrySharedSpaceScopeV2026R0 } from './shuttlePathEntrySharedSpaceScopeV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathEntryScopeV2026R0 =
  | ShuttlePathEntryAccountScopeV2026R0
  | ShuttlePathEntrySharedSpaceScopeV2026R0;
export function serializeShuttlePathEntryScopeV2026R0(
  val: any
): SerializedData {
  if (val.type == 'account') {
    return serializeShuttlePathEntryAccountScopeV2026R0(val);
  }
  if (val.type == 'shared_space') {
    return serializeShuttlePathEntrySharedSpaceScopeV2026R0(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeShuttlePathEntryScopeV2026R0(
  val: SerializedData
): ShuttlePathEntryScopeV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathEntryScopeV2026R0"',
    });
  }
  if (val.type == 'account') {
    return deserializeShuttlePathEntryAccountScopeV2026R0(val);
  }
  if (val.type == 'shared_space') {
    return deserializeShuttlePathEntrySharedSpaceScopeV2026R0(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttlePathEntryScopeV2026R0",
  });
}

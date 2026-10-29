import { serializeShuttlePathMappingAccountLocationTargetInputV2026R0 } from './shuttlePathMappingAccountLocationTargetInputV2026R0';
import { deserializeShuttlePathMappingAccountLocationTargetInputV2026R0 } from './shuttlePathMappingAccountLocationTargetInputV2026R0';
import { serializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationTargetInputV2026R0';
import { deserializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationTargetInputV2026R0';
import { ShuttlePathMappingAccountLocationTargetInputV2026R0 } from './shuttlePathMappingAccountLocationTargetInputV2026R0';
import { ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationTargetInputV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathMappingTargetLocationInputV2026R0 =
  | ShuttlePathMappingAccountLocationTargetInputV2026R0
  | ShuttlePathMappingSharedSpaceLocationTargetInputV2026R0;
export function serializeShuttlePathMappingTargetLocationInputV2026R0(
  val: any
): SerializedData {
  if (val.type == 'account') {
    return serializeShuttlePathMappingAccountLocationTargetInputV2026R0(val);
  }
  if (val.type == 'shared_space') {
    return serializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0(
      val
    );
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeShuttlePathMappingTargetLocationInputV2026R0(
  val: SerializedData
): ShuttlePathMappingTargetLocationInputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttlePathMappingTargetLocationInputV2026R0"',
    });
  }
  if (val.type == 'account') {
    return deserializeShuttlePathMappingAccountLocationTargetInputV2026R0(val);
  }
  if (val.type == 'shared_space') {
    return deserializeShuttlePathMappingSharedSpaceLocationTargetInputV2026R0(
      val
    );
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttlePathMappingTargetLocationInputV2026R0",
  });
}

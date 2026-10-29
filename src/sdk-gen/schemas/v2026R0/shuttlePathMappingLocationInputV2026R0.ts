import { serializeShuttlePathMappingAccountLocationInputV2026R0 } from './shuttlePathMappingAccountLocationInputV2026R0';
import { deserializeShuttlePathMappingAccountLocationInputV2026R0 } from './shuttlePathMappingAccountLocationInputV2026R0';
import { serializeShuttlePathMappingSharedSpaceLocationInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationInputV2026R0';
import { deserializeShuttlePathMappingSharedSpaceLocationInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationInputV2026R0';
import { ShuttlePathMappingAccountLocationInputV2026R0 } from './shuttlePathMappingAccountLocationInputV2026R0';
import { ShuttlePathMappingSharedSpaceLocationInputV2026R0 } from './shuttlePathMappingSharedSpaceLocationInputV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathMappingLocationInputV2026R0 =
  | ShuttlePathMappingAccountLocationInputV2026R0
  | ShuttlePathMappingSharedSpaceLocationInputV2026R0;
export function serializeShuttlePathMappingLocationInputV2026R0(
  val: any
): SerializedData {
  if (val.type == 'account') {
    return serializeShuttlePathMappingAccountLocationInputV2026R0(val);
  }
  if (val.type == 'shared_space') {
    return serializeShuttlePathMappingSharedSpaceLocationInputV2026R0(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeShuttlePathMappingLocationInputV2026R0(
  val: SerializedData
): ShuttlePathMappingLocationInputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathMappingLocationInputV2026R0"',
    });
  }
  if (val.type == 'account') {
    return deserializeShuttlePathMappingAccountLocationInputV2026R0(val);
  }
  if (val.type == 'shared_space') {
    return deserializeShuttlePathMappingSharedSpaceLocationInputV2026R0(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttlePathMappingLocationInputV2026R0",
  });
}

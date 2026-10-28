import { serializeShuttlePathMappingAccountLocationV2026R0 } from './shuttlePathMappingAccountLocationV2026R0';
import { deserializeShuttlePathMappingAccountLocationV2026R0 } from './shuttlePathMappingAccountLocationV2026R0';
import { serializeShuttlePathMappingSharedSpaceLocationV2026R0 } from './shuttlePathMappingSharedSpaceLocationV2026R0';
import { deserializeShuttlePathMappingSharedSpaceLocationV2026R0 } from './shuttlePathMappingSharedSpaceLocationV2026R0';
import { ShuttlePathMappingAccountLocationV2026R0 } from './shuttlePathMappingAccountLocationV2026R0';
import { ShuttlePathMappingSharedSpaceLocationV2026R0 } from './shuttlePathMappingSharedSpaceLocationV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttlePathMappingLocationV2026R0 =
  | ShuttlePathMappingAccountLocationV2026R0
  | ShuttlePathMappingSharedSpaceLocationV2026R0;
export function serializeShuttlePathMappingLocationV2026R0(
  val: any
): SerializedData {
  if (val.type == 'account') {
    return serializeShuttlePathMappingAccountLocationV2026R0(val);
  }
  if (val.type == 'shared_space') {
    return serializeShuttlePathMappingSharedSpaceLocationV2026R0(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeShuttlePathMappingLocationV2026R0(
  val: SerializedData
): ShuttlePathMappingLocationV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathMappingLocationV2026R0"',
    });
  }
  if (val.type == 'account') {
    return deserializeShuttlePathMappingAccountLocationV2026R0(val);
  }
  if (val.type == 'shared_space') {
    return deserializeShuttlePathMappingSharedSpaceLocationV2026R0(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttlePathMappingLocationV2026R0",
  });
}

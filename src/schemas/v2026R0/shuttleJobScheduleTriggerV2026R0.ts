import { serializeShuttleJobScheduleTriggerByTimeV2026R0 } from './shuttleJobScheduleTriggerByTimeV2026R0';
import { deserializeShuttleJobScheduleTriggerByTimeV2026R0 } from './shuttleJobScheduleTriggerByTimeV2026R0';
import { serializeShuttleJobScheduleTriggerByJobV2026R0 } from './shuttleJobScheduleTriggerByJobV2026R0';
import { deserializeShuttleJobScheduleTriggerByJobV2026R0 } from './shuttleJobScheduleTriggerByJobV2026R0';
import { ShuttleJobScheduleTriggerByTimeV2026R0 } from './shuttleJobScheduleTriggerByTimeV2026R0';
import { ShuttleJobScheduleTriggerByJobV2026R0 } from './shuttleJobScheduleTriggerByJobV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleJobScheduleTriggerV2026R0 =
  | ShuttleJobScheduleTriggerByTimeV2026R0
  | ShuttleJobScheduleTriggerByJobV2026R0;
export function serializeShuttleJobScheduleTriggerV2026R0(
  val: any,
): SerializedData {
  if (val.type == 'by_time') {
    return serializeShuttleJobScheduleTriggerByTimeV2026R0(val);
  }
  if (val.type == 'by_job') {
    return serializeShuttleJobScheduleTriggerByJobV2026R0(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeShuttleJobScheduleTriggerV2026R0(
  val: SerializedData,
): ShuttleJobScheduleTriggerV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobScheduleTriggerV2026R0"',
    });
  }
  if (val.type == 'by_time') {
    return deserializeShuttleJobScheduleTriggerByTimeV2026R0(val);
  }
  if (val.type == 'by_job') {
    return deserializeShuttleJobScheduleTriggerByJobV2026R0(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleJobScheduleTriggerV2026R0",
  });
}

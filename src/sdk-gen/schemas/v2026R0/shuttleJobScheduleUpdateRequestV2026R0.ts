import { serializeShuttleJobScheduleTriggerByTimeV2026R0 } from './shuttleJobScheduleTriggerByTimeV2026R0';
import { deserializeShuttleJobScheduleTriggerByTimeV2026R0 } from './shuttleJobScheduleTriggerByTimeV2026R0';
import { serializeShuttleJobScheduleTriggerByJobV2026R0 } from './shuttleJobScheduleTriggerByJobV2026R0';
import { deserializeShuttleJobScheduleTriggerByJobV2026R0 } from './shuttleJobScheduleTriggerByJobV2026R0';
import { serializeShuttleJobScheduleTriggerV2026R0 } from './shuttleJobScheduleTriggerV2026R0';
import { deserializeShuttleJobScheduleTriggerV2026R0 } from './shuttleJobScheduleTriggerV2026R0';
import { ShuttleJobScheduleTriggerByTimeV2026R0 } from './shuttleJobScheduleTriggerByTimeV2026R0';
import { ShuttleJobScheduleTriggerByJobV2026R0 } from './shuttleJobScheduleTriggerByJobV2026R0';
import { ShuttleJobScheduleTriggerV2026R0 } from './shuttleJobScheduleTriggerV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleJobScheduleUpdateRequestV2026R0StateField =
  'enabled' | 'paused' | string;
export type ShuttleJobScheduleUpdateRequestV2026R0RunModeField =
  'transfer' | 'simulation' | 'analysis' | string;
export interface ShuttleJobScheduleUpdateRequestV2026R0 {
  /**
   * Whether the schedule is active. */
  readonly state?: ShuttleJobScheduleUpdateRequestV2026R0StateField;
  /**
   * The kind of run the schedule starts. `scan` is not a valid schedule
   * run mode. */
  readonly runMode?: ShuttleJobScheduleUpdateRequestV2026R0RunModeField;
  /**
   * An optional human-readable description of the schedule. */
  readonly description?: string | null;
  readonly trigger?: ShuttleJobScheduleTriggerV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttleJobScheduleUpdateRequestV2026R0StateField(
  val: ShuttleJobScheduleUpdateRequestV2026R0StateField
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleUpdateRequestV2026R0StateField(
  val: SerializedData
): ShuttleJobScheduleUpdateRequestV2026R0StateField {
  if (val == 'enabled') {
    return val;
  }
  if (val == 'paused') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttleJobScheduleUpdateRequestV2026R0StateField",
  });
}
export function serializeShuttleJobScheduleUpdateRequestV2026R0RunModeField(
  val: ShuttleJobScheduleUpdateRequestV2026R0RunModeField
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleUpdateRequestV2026R0RunModeField(
  val: SerializedData
): ShuttleJobScheduleUpdateRequestV2026R0RunModeField {
  if (val == 'transfer') {
    return val;
  }
  if (val == 'simulation') {
    return val;
  }
  if (val == 'analysis') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttleJobScheduleUpdateRequestV2026R0RunModeField",
  });
}
export function serializeShuttleJobScheduleUpdateRequestV2026R0(
  val: ShuttleJobScheduleUpdateRequestV2026R0
): SerializedData {
  return {
    ['state']:
      val.state == void 0
        ? val.state
        : serializeShuttleJobScheduleUpdateRequestV2026R0StateField(val.state),
    ['run_mode']:
      val.runMode == void 0
        ? val.runMode
        : serializeShuttleJobScheduleUpdateRequestV2026R0RunModeField(
            val.runMode
          ),
    ['description']: val.description,
    ['trigger']:
      val.trigger == void 0
        ? val.trigger
        : serializeShuttleJobScheduleTriggerV2026R0(val.trigger),
  };
}
export function deserializeShuttleJobScheduleUpdateRequestV2026R0(
  val: SerializedData
): ShuttleJobScheduleUpdateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobScheduleUpdateRequestV2026R0"',
    });
  }
  const state: undefined | ShuttleJobScheduleUpdateRequestV2026R0StateField =
    val.state == void 0
      ? void 0
      : deserializeShuttleJobScheduleUpdateRequestV2026R0StateField(val.state);
  const runMode:
    undefined | ShuttleJobScheduleUpdateRequestV2026R0RunModeField =
    val.run_mode == void 0
      ? void 0
      : deserializeShuttleJobScheduleUpdateRequestV2026R0RunModeField(
          val.run_mode
        );
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "ShuttleJobScheduleUpdateRequestV2026R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const trigger: undefined | ShuttleJobScheduleTriggerV2026R0 =
    val.trigger == void 0
      ? void 0
      : deserializeShuttleJobScheduleTriggerV2026R0(val.trigger);
  return {
    state: state,
    runMode: runMode,
    description: description,
    trigger: trigger,
  } satisfies ShuttleJobScheduleUpdateRequestV2026R0;
}

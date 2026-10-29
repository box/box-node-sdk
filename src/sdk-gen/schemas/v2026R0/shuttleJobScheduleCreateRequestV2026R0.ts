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
export type ShuttleJobScheduleCreateRequestV2026R0RunModeField =
  | 'transfer'
  | 'simulation'
  | 'analysis'
  | string;
export type ShuttleJobScheduleCreateRequestV2026R0StateField =
  | 'enabled'
  | 'paused'
  | string;
export interface ShuttleJobScheduleCreateRequestV2026R0 {
  /**
   * The unique identifier of the shuttle job this schedule belongs to. */
  readonly jobId: string;
  /**
   * The kind of run the schedule starts. `scan` is not a valid schedule
   * run mode. */
  readonly runMode: ShuttleJobScheduleCreateRequestV2026R0RunModeField;
  /**
   * Whether the schedule is active. When omitted, defaults to `enabled`. */
  readonly state?: ShuttleJobScheduleCreateRequestV2026R0StateField;
  /**
   * An optional human-readable description of the schedule. */
  readonly description?: string | null;
  readonly trigger: ShuttleJobScheduleTriggerV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttleJobScheduleCreateRequestV2026R0RunModeField(
  val: ShuttleJobScheduleCreateRequestV2026R0RunModeField
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleCreateRequestV2026R0RunModeField(
  val: SerializedData
): ShuttleJobScheduleCreateRequestV2026R0RunModeField {
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
      "Can't deserialize ShuttleJobScheduleCreateRequestV2026R0RunModeField",
  });
}
export function serializeShuttleJobScheduleCreateRequestV2026R0StateField(
  val: ShuttleJobScheduleCreateRequestV2026R0StateField
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleCreateRequestV2026R0StateField(
  val: SerializedData
): ShuttleJobScheduleCreateRequestV2026R0StateField {
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
      "Can't deserialize ShuttleJobScheduleCreateRequestV2026R0StateField",
  });
}
export function serializeShuttleJobScheduleCreateRequestV2026R0(
  val: ShuttleJobScheduleCreateRequestV2026R0
): SerializedData {
  return {
    ['job_id']: val.jobId,
    ['run_mode']: serializeShuttleJobScheduleCreateRequestV2026R0RunModeField(
      val.runMode
    ),
    ['state']:
      val.state == void 0
        ? val.state
        : serializeShuttleJobScheduleCreateRequestV2026R0StateField(val.state),
    ['description']: val.description,
    ['trigger']: serializeShuttleJobScheduleTriggerV2026R0(val.trigger),
  };
}
export function deserializeShuttleJobScheduleCreateRequestV2026R0(
  val: SerializedData
): ShuttleJobScheduleCreateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobScheduleCreateRequestV2026R0"',
    });
  }
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleJobScheduleCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleJobScheduleCreateRequestV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (val.run_mode == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "run_mode" of type "ShuttleJobScheduleCreateRequestV2026R0" to be defined',
    });
  }
  const runMode: ShuttleJobScheduleCreateRequestV2026R0RunModeField =
    deserializeShuttleJobScheduleCreateRequestV2026R0RunModeField(val.run_mode);
  const state: undefined | ShuttleJobScheduleCreateRequestV2026R0StateField =
    val.state == void 0
      ? void 0
      : deserializeShuttleJobScheduleCreateRequestV2026R0StateField(val.state);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "ShuttleJobScheduleCreateRequestV2026R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (val.trigger == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "trigger" of type "ShuttleJobScheduleCreateRequestV2026R0" to be defined',
    });
  }
  const trigger: ShuttleJobScheduleTriggerV2026R0 =
    deserializeShuttleJobScheduleTriggerV2026R0(val.trigger);
  return {
    jobId: jobId,
    runMode: runMode,
    state: state,
    description: description,
    trigger: trigger,
  } satisfies ShuttleJobScheduleCreateRequestV2026R0;
}

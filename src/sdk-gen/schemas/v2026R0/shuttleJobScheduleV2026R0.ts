import { serializeShuttleJobScheduleTriggerByTimeV2026R0 } from './shuttleJobScheduleTriggerByTimeV2026R0';
import { deserializeShuttleJobScheduleTriggerByTimeV2026R0 } from './shuttleJobScheduleTriggerByTimeV2026R0';
import { serializeShuttleJobScheduleTriggerByJobV2026R0 } from './shuttleJobScheduleTriggerByJobV2026R0';
import { deserializeShuttleJobScheduleTriggerByJobV2026R0 } from './shuttleJobScheduleTriggerByJobV2026R0';
import { serializeShuttleJobScheduleTriggerV2026R0 } from './shuttleJobScheduleTriggerV2026R0';
import { deserializeShuttleJobScheduleTriggerV2026R0 } from './shuttleJobScheduleTriggerV2026R0';
import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { ShuttleJobScheduleTriggerByTimeV2026R0 } from './shuttleJobScheduleTriggerByTimeV2026R0';
import { ShuttleJobScheduleTriggerByJobV2026R0 } from './shuttleJobScheduleTriggerByJobV2026R0';
import { ShuttleJobScheduleTriggerV2026R0 } from './shuttleJobScheduleTriggerV2026R0';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleJobScheduleV2026R0TypeField = 'shuttle_job_schedule';
export type ShuttleJobScheduleV2026R0StateField = 'enabled' | 'paused' | string;
export type ShuttleJobScheduleV2026R0RunModeField =
  | 'transfer'
  | 'simulation'
  | 'analysis'
  | string;
export class ShuttleJobScheduleV2026R0 {
  /**
   * The unique identifier for the shuttle job schedule. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_job_schedule`. */
  readonly type: ShuttleJobScheduleV2026R0TypeField =
    'shuttle_job_schedule' as ShuttleJobScheduleV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this schedule belongs to. */
  readonly jobId!: string;
  /**
   * Whether the schedule is active. */
  readonly state!: ShuttleJobScheduleV2026R0StateField;
  /**
   * The kind of run the schedule starts. `scan` is not a valid schedule
   * run mode. */
  readonly runMode!: ShuttleJobScheduleV2026R0RunModeField;
  /**
   * An optional human-readable description of the schedule. */
  readonly description?: string | null;
  /**
   * When the schedule last attempted to start a run. `null` when the
   * schedule has never started a run. */
  readonly lastAttemptAt?: DateTime | null;
  readonly trigger!: ShuttleJobScheduleTriggerV2026R0;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleJobScheduleV2026R0, 'type'> &
      Partial<Pick<ShuttleJobScheduleV2026R0, 'type'>>
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.jobId !== undefined) {
      this.jobId = fields.jobId;
    }
    if (fields.state !== undefined) {
      this.state = fields.state;
    }
    if (fields.runMode !== undefined) {
      this.runMode = fields.runMode;
    }
    if (fields.description !== undefined) {
      this.description = fields.description;
    }
    if (fields.lastAttemptAt !== undefined) {
      this.lastAttemptAt = fields.lastAttemptAt;
    }
    if (fields.trigger !== undefined) {
      this.trigger = fields.trigger;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleJobScheduleV2026R0Input {
  /**
   * The unique identifier for the shuttle job schedule. */
  readonly id: string;
  /**
   * The value will always be `shuttle_job_schedule`. */
  readonly type?: ShuttleJobScheduleV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this schedule belongs to. */
  readonly jobId: string;
  /**
   * Whether the schedule is active. */
  readonly state: ShuttleJobScheduleV2026R0StateField;
  /**
   * The kind of run the schedule starts. `scan` is not a valid schedule
   * run mode. */
  readonly runMode: ShuttleJobScheduleV2026R0RunModeField;
  /**
   * An optional human-readable description of the schedule. */
  readonly description?: string | null;
  /**
   * When the schedule last attempted to start a run. `null` when the
   * schedule has never started a run. */
  readonly lastAttemptAt?: DateTime | null;
  readonly trigger: ShuttleJobScheduleTriggerV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeShuttleJobScheduleV2026R0TypeField(
  val: ShuttleJobScheduleV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleV2026R0TypeField(
  val: SerializedData
): ShuttleJobScheduleV2026R0TypeField {
  if (val == 'shuttle_job_schedule') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleJobScheduleV2026R0TypeField",
  });
}
export function serializeShuttleJobScheduleV2026R0StateField(
  val: ShuttleJobScheduleV2026R0StateField
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleV2026R0StateField(
  val: SerializedData
): ShuttleJobScheduleV2026R0StateField {
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
    message: "Can't deserialize ShuttleJobScheduleV2026R0StateField",
  });
}
export function serializeShuttleJobScheduleV2026R0RunModeField(
  val: ShuttleJobScheduleV2026R0RunModeField
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleV2026R0RunModeField(
  val: SerializedData
): ShuttleJobScheduleV2026R0RunModeField {
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
    message: "Can't deserialize ShuttleJobScheduleV2026R0RunModeField",
  });
}
export function serializeShuttleJobScheduleV2026R0(
  val: ShuttleJobScheduleV2026R0
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttleJobScheduleV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['state']: serializeShuttleJobScheduleV2026R0StateField(val.state),
    ['run_mode']: serializeShuttleJobScheduleV2026R0RunModeField(val.runMode),
    ['description']: val.description,
    ['last_attempt_at']:
      val.lastAttemptAt == void 0
        ? val.lastAttemptAt
        : serializeDateTime(val.lastAttemptAt),
    ['trigger']: serializeShuttleJobScheduleTriggerV2026R0(val.trigger),
  };
}
export function deserializeShuttleJobScheduleV2026R0(
  val: SerializedData
): ShuttleJobScheduleV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobScheduleV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleJobScheduleV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleJobScheduleV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleJobScheduleV2026R0" to be defined',
    });
  }
  const type: ShuttleJobScheduleV2026R0TypeField =
    deserializeShuttleJobScheduleV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleJobScheduleV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleJobScheduleV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (val.state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "state" of type "ShuttleJobScheduleV2026R0" to be defined',
    });
  }
  const state: ShuttleJobScheduleV2026R0StateField =
    deserializeShuttleJobScheduleV2026R0StateField(val.state);
  if (val.run_mode == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "run_mode" of type "ShuttleJobScheduleV2026R0" to be defined',
    });
  }
  const runMode: ShuttleJobScheduleV2026R0RunModeField =
    deserializeShuttleJobScheduleV2026R0RunModeField(val.run_mode);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "ShuttleJobScheduleV2026R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.last_attempt_at == void 0) && !sdIsString(val.last_attempt_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "last_attempt_at" of type "ShuttleJobScheduleV2026R0"',
    });
  }
  const lastAttemptAt: undefined | DateTime =
    val.last_attempt_at == void 0
      ? void 0
      : deserializeDateTime(val.last_attempt_at);
  if (val.trigger == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "trigger" of type "ShuttleJobScheduleV2026R0" to be defined',
    });
  }
  const trigger: ShuttleJobScheduleTriggerV2026R0 =
    deserializeShuttleJobScheduleTriggerV2026R0(val.trigger);
  return {
    id: id,
    type: type,
    jobId: jobId,
    state: state,
    runMode: runMode,
    description: description,
    lastAttemptAt: lastAttemptAt,
    trigger: trigger,
  } satisfies ShuttleJobScheduleV2026R0;
}
export function serializeShuttleJobScheduleV2026R0Input(
  val: ShuttleJobScheduleV2026R0Input
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleJobScheduleV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['state']: serializeShuttleJobScheduleV2026R0StateField(val.state),
    ['run_mode']: serializeShuttleJobScheduleV2026R0RunModeField(val.runMode),
    ['description']: val.description,
    ['last_attempt_at']:
      val.lastAttemptAt == void 0
        ? val.lastAttemptAt
        : serializeDateTime(val.lastAttemptAt),
    ['trigger']: serializeShuttleJobScheduleTriggerV2026R0(val.trigger),
  };
}
export function deserializeShuttleJobScheduleV2026R0Input(
  val: SerializedData
): ShuttleJobScheduleV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobScheduleV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleJobScheduleV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleJobScheduleV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttleJobScheduleV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleJobScheduleV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleJobScheduleV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "job_id" of type "ShuttleJobScheduleV2026R0Input"',
    });
  }
  const jobId: string = val.job_id;
  if (val.state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "state" of type "ShuttleJobScheduleV2026R0Input" to be defined',
    });
  }
  const state: ShuttleJobScheduleV2026R0StateField =
    deserializeShuttleJobScheduleV2026R0StateField(val.state);
  if (val.run_mode == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "run_mode" of type "ShuttleJobScheduleV2026R0Input" to be defined',
    });
  }
  const runMode: ShuttleJobScheduleV2026R0RunModeField =
    deserializeShuttleJobScheduleV2026R0RunModeField(val.run_mode);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "ShuttleJobScheduleV2026R0Input"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.last_attempt_at == void 0) && !sdIsString(val.last_attempt_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "last_attempt_at" of type "ShuttleJobScheduleV2026R0Input"',
    });
  }
  const lastAttemptAt: undefined | DateTime =
    val.last_attempt_at == void 0
      ? void 0
      : deserializeDateTime(val.last_attempt_at);
  if (val.trigger == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "trigger" of type "ShuttleJobScheduleV2026R0Input" to be defined',
    });
  }
  const trigger: ShuttleJobScheduleTriggerV2026R0 =
    deserializeShuttleJobScheduleTriggerV2026R0(val.trigger);
  return {
    id: id,
    type: type,
    jobId: jobId,
    state: state,
    runMode: runMode,
    description: description,
    lastAttemptAt: lastAttemptAt,
    trigger: trigger,
  } satisfies ShuttleJobScheduleV2026R0Input;
}

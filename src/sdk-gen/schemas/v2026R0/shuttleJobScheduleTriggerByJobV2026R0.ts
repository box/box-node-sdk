import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleJobScheduleTriggerByJobV2026R0TypeField = 'by_job';
export type ShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField =
  | 'always'
  | 'on_success'
  | 'on_finish'
  | string;
export class ShuttleJobScheduleTriggerByJobV2026R0 {
  /**
   * The value will always be `by_job`. */
  readonly type: ShuttleJobScheduleTriggerByJobV2026R0TypeField =
    'by_job' as ShuttleJobScheduleTriggerByJobV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job whose run starts this
   * schedule. */
  readonly triggeredByJobId!: string;
  /**
   * When this schedule should start a run relative to the last run of
   * the triggering job. */
  readonly lastRunCondition!: ShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleJobScheduleTriggerByJobV2026R0, 'type'> &
      Partial<Pick<ShuttleJobScheduleTriggerByJobV2026R0, 'type'>>
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.triggeredByJobId !== undefined) {
      this.triggeredByJobId = fields.triggeredByJobId;
    }
    if (fields.lastRunCondition !== undefined) {
      this.lastRunCondition = fields.lastRunCondition;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleJobScheduleTriggerByJobV2026R0Input {
  /**
   * The value will always be `by_job`. */
  readonly type?: ShuttleJobScheduleTriggerByJobV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job whose run starts this
   * schedule. */
  readonly triggeredByJobId: string;
  /**
   * When this schedule should start a run relative to the last run of
   * the triggering job. */
  readonly lastRunCondition: ShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField;
  readonly rawData?: SerializedData;
}
export function serializeShuttleJobScheduleTriggerByJobV2026R0TypeField(
  val: ShuttleJobScheduleTriggerByJobV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleTriggerByJobV2026R0TypeField(
  val: SerializedData
): ShuttleJobScheduleTriggerByJobV2026R0TypeField {
  if (val == 'by_job') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleJobScheduleTriggerByJobV2026R0TypeField",
  });
}
export function serializeShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField(
  val: ShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField(
  val: SerializedData
): ShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField {
  if (val == 'always') {
    return val;
  }
  if (val == 'on_success') {
    return val;
  }
  if (val == 'on_finish') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField",
  });
}
export function serializeShuttleJobScheduleTriggerByJobV2026R0(
  val: ShuttleJobScheduleTriggerByJobV2026R0
): SerializedData {
  return {
    ['type']: serializeShuttleJobScheduleTriggerByJobV2026R0TypeField(val.type),
    ['triggered_by_job_id']: val.triggeredByJobId,
    ['last_run_condition']:
      serializeShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField(
        val.lastRunCondition
      ),
  };
}
export function deserializeShuttleJobScheduleTriggerByJobV2026R0(
  val: SerializedData
): ShuttleJobScheduleTriggerByJobV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobScheduleTriggerByJobV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleJobScheduleTriggerByJobV2026R0" to be defined',
    });
  }
  const type: ShuttleJobScheduleTriggerByJobV2026R0TypeField =
    deserializeShuttleJobScheduleTriggerByJobV2026R0TypeField(val.type);
  if (val.triggered_by_job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "triggered_by_job_id" of type "ShuttleJobScheduleTriggerByJobV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.triggered_by_job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "triggered_by_job_id" of type "ShuttleJobScheduleTriggerByJobV2026R0"',
    });
  }
  const triggeredByJobId: string = val.triggered_by_job_id;
  if (val.last_run_condition == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "last_run_condition" of type "ShuttleJobScheduleTriggerByJobV2026R0" to be defined',
    });
  }
  const lastRunCondition: ShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField =
    deserializeShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField(
      val.last_run_condition
    );
  return {
    type: type,
    triggeredByJobId: triggeredByJobId,
    lastRunCondition: lastRunCondition,
  } satisfies ShuttleJobScheduleTriggerByJobV2026R0;
}
export function serializeShuttleJobScheduleTriggerByJobV2026R0Input(
  val: ShuttleJobScheduleTriggerByJobV2026R0Input
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleJobScheduleTriggerByJobV2026R0TypeField(val.type),
    ['triggered_by_job_id']: val.triggeredByJobId,
    ['last_run_condition']:
      serializeShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField(
        val.lastRunCondition
      ),
  };
}
export function deserializeShuttleJobScheduleTriggerByJobV2026R0Input(
  val: SerializedData
): ShuttleJobScheduleTriggerByJobV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttleJobScheduleTriggerByJobV2026R0Input"',
    });
  }
  const type: undefined | ShuttleJobScheduleTriggerByJobV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleJobScheduleTriggerByJobV2026R0TypeField(val.type);
  if (val.triggered_by_job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "triggered_by_job_id" of type "ShuttleJobScheduleTriggerByJobV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.triggered_by_job_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "triggered_by_job_id" of type "ShuttleJobScheduleTriggerByJobV2026R0Input"',
    });
  }
  const triggeredByJobId: string = val.triggered_by_job_id;
  if (val.last_run_condition == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "last_run_condition" of type "ShuttleJobScheduleTriggerByJobV2026R0Input" to be defined',
    });
  }
  const lastRunCondition: ShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField =
    deserializeShuttleJobScheduleTriggerByJobV2026R0LastRunConditionField(
      val.last_run_condition
    );
  return {
    type: type,
    triggeredByJobId: triggeredByJobId,
    lastRunCondition: lastRunCondition,
  } satisfies ShuttleJobScheduleTriggerByJobV2026R0Input;
}

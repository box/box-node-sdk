import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleJobScheduleTriggerByTimeV2026R0TypeField = 'by_time';
export type ShuttleJobScheduleTriggerByTimeV2026R0RepeatField =
  'none' | 'daily' | 'weekly' | 'weekdays' | 'weekends' | string;
export class ShuttleJobScheduleTriggerByTimeV2026R0 {
  /**
   * The value will always be `by_time`. */
  readonly type: ShuttleJobScheduleTriggerByTimeV2026R0TypeField =
    'by_time' as ShuttleJobScheduleTriggerByTimeV2026R0TypeField;
  /**
   * The local wall-clock time when the schedule should first start a
   * run, without an offset or `Z` suffix. Combined with `time_zone` to
   * determine the instant, including DST. */
  readonly startAt!: string;
  /**
   * The IANA time zone that gives `start_at` its calendar meaning (for
   * example `America/Los_Angeles`). Recurrence and DST transitions are
   * evaluated in this zone. */
  readonly timeZone!: string;
  /**
   * How often the schedule repeats after `start_at`. */
  readonly repeat!: ShuttleJobScheduleTriggerByTimeV2026R0RepeatField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleJobScheduleTriggerByTimeV2026R0, 'type'> &
      Partial<Pick<ShuttleJobScheduleTriggerByTimeV2026R0, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.startAt !== undefined) {
      this.startAt = fields.startAt;
    }
    if (fields.timeZone !== undefined) {
      this.timeZone = fields.timeZone;
    }
    if (fields.repeat !== undefined) {
      this.repeat = fields.repeat;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleJobScheduleTriggerByTimeV2026R0Input {
  /**
   * The value will always be `by_time`. */
  readonly type?: ShuttleJobScheduleTriggerByTimeV2026R0TypeField;
  /**
   * The local wall-clock time when the schedule should first start a
   * run, without an offset or `Z` suffix. Combined with `time_zone` to
   * determine the instant, including DST. */
  readonly startAt: string;
  /**
   * The IANA time zone that gives `start_at` its calendar meaning (for
   * example `America/Los_Angeles`). Recurrence and DST transitions are
   * evaluated in this zone. */
  readonly timeZone: string;
  /**
   * How often the schedule repeats after `start_at`. */
  readonly repeat: ShuttleJobScheduleTriggerByTimeV2026R0RepeatField;
  readonly rawData?: SerializedData;
}
export function serializeShuttleJobScheduleTriggerByTimeV2026R0TypeField(
  val: ShuttleJobScheduleTriggerByTimeV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleTriggerByTimeV2026R0TypeField(
  val: SerializedData,
): ShuttleJobScheduleTriggerByTimeV2026R0TypeField {
  if (val == 'by_time') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttleJobScheduleTriggerByTimeV2026R0TypeField",
  });
}
export function serializeShuttleJobScheduleTriggerByTimeV2026R0RepeatField(
  val: ShuttleJobScheduleTriggerByTimeV2026R0RepeatField,
): SerializedData {
  return val;
}
export function deserializeShuttleJobScheduleTriggerByTimeV2026R0RepeatField(
  val: SerializedData,
): ShuttleJobScheduleTriggerByTimeV2026R0RepeatField {
  if (val == 'none') {
    return val;
  }
  if (val == 'daily') {
    return val;
  }
  if (val == 'weekly') {
    return val;
  }
  if (val == 'weekdays') {
    return val;
  }
  if (val == 'weekends') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize ShuttleJobScheduleTriggerByTimeV2026R0RepeatField",
  });
}
export function serializeShuttleJobScheduleTriggerByTimeV2026R0(
  val: ShuttleJobScheduleTriggerByTimeV2026R0,
): SerializedData {
  return {
    ['type']: serializeShuttleJobScheduleTriggerByTimeV2026R0TypeField(
      val.type,
    ),
    ['start_at']: val.startAt,
    ['time_zone']: val.timeZone,
    ['repeat']: serializeShuttleJobScheduleTriggerByTimeV2026R0RepeatField(
      val.repeat,
    ),
  };
}
export function deserializeShuttleJobScheduleTriggerByTimeV2026R0(
  val: SerializedData,
): ShuttleJobScheduleTriggerByTimeV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleJobScheduleTriggerByTimeV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleJobScheduleTriggerByTimeV2026R0" to be defined',
    });
  }
  const type: ShuttleJobScheduleTriggerByTimeV2026R0TypeField =
    deserializeShuttleJobScheduleTriggerByTimeV2026R0TypeField(val.type);
  if (val.start_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "start_at" of type "ShuttleJobScheduleTriggerByTimeV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.start_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "start_at" of type "ShuttleJobScheduleTriggerByTimeV2026R0"',
    });
  }
  const startAt: string = val.start_at;
  if (val.time_zone == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "time_zone" of type "ShuttleJobScheduleTriggerByTimeV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.time_zone)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "time_zone" of type "ShuttleJobScheduleTriggerByTimeV2026R0"',
    });
  }
  const timeZone: string = val.time_zone;
  if (val.repeat == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "repeat" of type "ShuttleJobScheduleTriggerByTimeV2026R0" to be defined',
    });
  }
  const repeat: ShuttleJobScheduleTriggerByTimeV2026R0RepeatField =
    deserializeShuttleJobScheduleTriggerByTimeV2026R0RepeatField(val.repeat);
  return {
    type: type,
    startAt: startAt,
    timeZone: timeZone,
    repeat: repeat,
  } satisfies ShuttleJobScheduleTriggerByTimeV2026R0;
}
export function serializeShuttleJobScheduleTriggerByTimeV2026R0Input(
  val: ShuttleJobScheduleTriggerByTimeV2026R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleJobScheduleTriggerByTimeV2026R0TypeField(val.type),
    ['start_at']: val.startAt,
    ['time_zone']: val.timeZone,
    ['repeat']: serializeShuttleJobScheduleTriggerByTimeV2026R0RepeatField(
      val.repeat,
    ),
  };
}
export function deserializeShuttleJobScheduleTriggerByTimeV2026R0Input(
  val: SerializedData,
): ShuttleJobScheduleTriggerByTimeV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "ShuttleJobScheduleTriggerByTimeV2026R0Input"',
    });
  }
  const type: undefined | ShuttleJobScheduleTriggerByTimeV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleJobScheduleTriggerByTimeV2026R0TypeField(val.type);
  if (val.start_at == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "start_at" of type "ShuttleJobScheduleTriggerByTimeV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.start_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "start_at" of type "ShuttleJobScheduleTriggerByTimeV2026R0Input"',
    });
  }
  const startAt: string = val.start_at;
  if (val.time_zone == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "time_zone" of type "ShuttleJobScheduleTriggerByTimeV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.time_zone)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "time_zone" of type "ShuttleJobScheduleTriggerByTimeV2026R0Input"',
    });
  }
  const timeZone: string = val.time_zone;
  if (val.repeat == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "repeat" of type "ShuttleJobScheduleTriggerByTimeV2026R0Input" to be defined',
    });
  }
  const repeat: ShuttleJobScheduleTriggerByTimeV2026R0RepeatField =
    deserializeShuttleJobScheduleTriggerByTimeV2026R0RepeatField(val.repeat);
  return {
    type: type,
    startAt: startAt,
    timeZone: timeZone,
    repeat: repeat,
  } satisfies ShuttleJobScheduleTriggerByTimeV2026R0Input;
}

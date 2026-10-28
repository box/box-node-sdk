import { serializeUserBaseV2026R0 } from './userBaseV2026R0';
import { deserializeUserBaseV2026R0 } from './userBaseV2026R0';
import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { UserBaseV2026R0 } from './userBaseV2026R0';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleRunV2026R0TypeField = 'shuttle_run';
export interface ShuttleRunV2026R0StatsField {
  /**
   * Bytes transferred during the run. */
  readonly bytesSent?: number;
  /**
   * Files transferred during the run. */
  readonly filesSent?: number;
  /**
   * Folders created on the destination during the run. */
  readonly foldersCreated?: number;
  /**
   * Whether these figures are estimates rather than final counts. */
  readonly isEstimated?: boolean;
  readonly rawData?: SerializedData;
}
export class ShuttleRunV2026R0 {
  /**
   * The unique identifier for the shuttle run, in the form
   * `{job_id}:{run_number}`. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_run`. */
  readonly type: ShuttleRunV2026R0TypeField =
    'shuttle_run' as ShuttleRunV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this run belongs to. */
  readonly jobId!: string;
  /**
   * The mode the run was started in. This is an open string whose set of
   * values is expected to grow; the currently documented values include
   * `transfer`, `simulation`, `analysis`, `scan`, and `unknown`. Clients
   * should treat any value they do not recognize as `unknown`. */
  readonly runMode!: string;
  /**
   * The current state of the shuttle run. This is an open string whose set
   * of values is expected to grow; the currently documented values include
   * `running`, `stopping`, `completed`, `completed_with_errors`, `stopped`,
   * `failed`, `timed_out`, and `unknown`. Clients should treat any value
   * they do not recognize as `unknown`. */
  readonly state!: string;
  /**
   * When the run started. */
  readonly startedAt?: DateTime;
  /**
   * When the run ended. `null` while the run is still in progress. */
  readonly endedAt?: DateTime | null;
  /**
   * Total duration of the run in seconds. `null` while the run is still in
   * progress. */
  readonly durationSeconds?: number | null;
  /**
   * Transfer statistics collected during the run. */
  readonly stats?: ShuttleRunV2026R0StatsField;
  /**
   * The user who started the run. `null` for schedule- or system-initiated
   * runs. */
  readonly createdBy?: UserBaseV2026R0;
  /**
   * Report sections that can be requested for this run. This is an open
   * list whose set of values is expected to grow; the currently documented
   * values include `files_and_folders`, `event_log`, `transfer_overview`,
   * `source_users`, `target_users`, `source_collaborators`,
   * `target_collaborators`, `source_collaborations`, and
   * `target_collaborations`. */
  readonly availableReportSections?: readonly string[];
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleRunV2026R0, 'type'> &
      Partial<Pick<ShuttleRunV2026R0, 'type'>>,
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
    if (fields.runMode !== undefined) {
      this.runMode = fields.runMode;
    }
    if (fields.state !== undefined) {
      this.state = fields.state;
    }
    if (fields.startedAt !== undefined) {
      this.startedAt = fields.startedAt;
    }
    if (fields.endedAt !== undefined) {
      this.endedAt = fields.endedAt;
    }
    if (fields.durationSeconds !== undefined) {
      this.durationSeconds = fields.durationSeconds;
    }
    if (fields.stats !== undefined) {
      this.stats = fields.stats;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.availableReportSections !== undefined) {
      this.availableReportSections = fields.availableReportSections;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleRunV2026R0Input {
  /**
   * The unique identifier for the shuttle run, in the form
   * `{job_id}:{run_number}`. */
  readonly id: string;
  /**
   * The value will always be `shuttle_run`. */
  readonly type?: ShuttleRunV2026R0TypeField;
  /**
   * The unique identifier of the shuttle job this run belongs to. */
  readonly jobId: string;
  /**
   * The mode the run was started in. This is an open string whose set of
   * values is expected to grow; the currently documented values include
   * `transfer`, `simulation`, `analysis`, `scan`, and `unknown`. Clients
   * should treat any value they do not recognize as `unknown`. */
  readonly runMode: string;
  /**
   * The current state of the shuttle run. This is an open string whose set
   * of values is expected to grow; the currently documented values include
   * `running`, `stopping`, `completed`, `completed_with_errors`, `stopped`,
   * `failed`, `timed_out`, and `unknown`. Clients should treat any value
   * they do not recognize as `unknown`. */
  readonly state: string;
  /**
   * When the run started. */
  readonly startedAt?: DateTime;
  /**
   * When the run ended. `null` while the run is still in progress. */
  readonly endedAt?: DateTime | null;
  /**
   * Total duration of the run in seconds. `null` while the run is still in
   * progress. */
  readonly durationSeconds?: number | null;
  /**
   * Transfer statistics collected during the run. */
  readonly stats?: ShuttleRunV2026R0StatsField;
  /**
   * The user who started the run. `null` for schedule- or system-initiated
   * runs. */
  readonly createdBy?: UserBaseV2026R0;
  /**
   * Report sections that can be requested for this run. This is an open
   * list whose set of values is expected to grow; the currently documented
   * values include `files_and_folders`, `event_log`, `transfer_overview`,
   * `source_users`, `target_users`, `source_collaborators`,
   * `target_collaborators`, `source_collaborations`, and
   * `target_collaborations`. */
  readonly availableReportSections?: readonly string[];
  readonly rawData?: SerializedData;
}
export function serializeShuttleRunV2026R0TypeField(
  val: ShuttleRunV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleRunV2026R0TypeField(
  val: SerializedData,
): ShuttleRunV2026R0TypeField {
  if (val == 'shuttle_run') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleRunV2026R0TypeField",
  });
}
export function serializeShuttleRunV2026R0StatsField(
  val: ShuttleRunV2026R0StatsField,
): SerializedData {
  return {
    ['bytes_sent']: val.bytesSent,
    ['files_sent']: val.filesSent,
    ['folders_created']: val.foldersCreated,
    ['is_estimated']: val.isEstimated,
  };
}
export function deserializeShuttleRunV2026R0StatsField(
  val: SerializedData,
): ShuttleRunV2026R0StatsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleRunV2026R0StatsField"',
    });
  }
  if (!(val.bytes_sent == void 0) && !sdIsNumber(val.bytes_sent)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "bytes_sent" of type "ShuttleRunV2026R0StatsField"',
    });
  }
  const bytesSent: undefined | number =
    val.bytes_sent == void 0 ? void 0 : val.bytes_sent;
  if (!(val.files_sent == void 0) && !sdIsNumber(val.files_sent)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "files_sent" of type "ShuttleRunV2026R0StatsField"',
    });
  }
  const filesSent: undefined | number =
    val.files_sent == void 0 ? void 0 : val.files_sent;
  if (!(val.folders_created == void 0) && !sdIsNumber(val.folders_created)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "folders_created" of type "ShuttleRunV2026R0StatsField"',
    });
  }
  const foldersCreated: undefined | number =
    val.folders_created == void 0 ? void 0 : val.folders_created;
  if (!(val.is_estimated == void 0) && !sdIsBoolean(val.is_estimated)) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "is_estimated" of type "ShuttleRunV2026R0StatsField"',
    });
  }
  const isEstimated: undefined | boolean =
    val.is_estimated == void 0 ? void 0 : val.is_estimated;
  return {
    bytesSent: bytesSent,
    filesSent: filesSent,
    foldersCreated: foldersCreated,
    isEstimated: isEstimated,
  } satisfies ShuttleRunV2026R0StatsField;
}
export function serializeShuttleRunV2026R0(
  val: ShuttleRunV2026R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttleRunV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['run_mode']: val.runMode,
    ['state']: val.state,
    ['started_at']:
      val.startedAt == void 0
        ? val.startedAt
        : serializeDateTime(val.startedAt),
    ['ended_at']:
      val.endedAt == void 0 ? val.endedAt : serializeDateTime(val.endedAt),
    ['duration_seconds']: val.durationSeconds,
    ['stats']:
      val.stats == void 0
        ? val.stats
        : serializeShuttleRunV2026R0StatsField(val.stats),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserBaseV2026R0(val.createdBy),
    ['available_report_sections']:
      val.availableReportSections == void 0
        ? val.availableReportSections
        : (val.availableReportSections.map(function (
            item: string,
          ): SerializedData {
            return item;
          }) as readonly any[]),
  };
}
export function deserializeShuttleRunV2026R0(
  val: SerializedData,
): ShuttleRunV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleRunV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ShuttleRunV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleRunV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "ShuttleRunV2026R0" to be defined',
    });
  }
  const type: ShuttleRunV2026R0TypeField =
    deserializeShuttleRunV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "job_id" of type "ShuttleRunV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "job_id" of type "ShuttleRunV2026R0"',
    });
  }
  const jobId: string = val.job_id;
  if (val.run_mode == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "run_mode" of type "ShuttleRunV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.run_mode)) {
    throw new BoxSdkError({
      message: 'Expecting string for "run_mode" of type "ShuttleRunV2026R0"',
    });
  }
  const runMode: string = val.run_mode;
  if (val.state == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "state" of type "ShuttleRunV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.state)) {
    throw new BoxSdkError({
      message: 'Expecting string for "state" of type "ShuttleRunV2026R0"',
    });
  }
  const state: string = val.state;
  if (!(val.started_at == void 0) && !sdIsString(val.started_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "started_at" of type "ShuttleRunV2026R0"',
    });
  }
  const startedAt: undefined | DateTime =
    val.started_at == void 0 ? void 0 : deserializeDateTime(val.started_at);
  if (!(val.ended_at == void 0) && !sdIsString(val.ended_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "ended_at" of type "ShuttleRunV2026R0"',
    });
  }
  const endedAt: undefined | DateTime =
    val.ended_at == void 0 ? void 0 : deserializeDateTime(val.ended_at);
  if (!(val.duration_seconds == void 0) && !sdIsNumber(val.duration_seconds)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "duration_seconds" of type "ShuttleRunV2026R0"',
    });
  }
  const durationSeconds: undefined | number =
    val.duration_seconds == void 0 ? void 0 : val.duration_seconds;
  const stats: undefined | ShuttleRunV2026R0StatsField =
    val.stats == void 0
      ? void 0
      : deserializeShuttleRunV2026R0StatsField(val.stats);
  const createdBy: UserBaseV2026R0 | undefined =
    val.created_by == void 0
      ? void 0
      : deserializeUserBaseV2026R0(val.created_by);
  if (
    !(val.available_report_sections == void 0) &&
    !sdIsList(val.available_report_sections)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "available_report_sections" of type "ShuttleRunV2026R0"',
    });
  }
  const availableReportSections: undefined | readonly string[] =
    val.available_report_sections == void 0
      ? void 0
      : sdIsList(val.available_report_sections)
        ? (val.available_report_sections.map(function (
            itm: SerializedData,
          ): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "ShuttleRunV2026R0"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  return {
    id: id,
    type: type,
    jobId: jobId,
    runMode: runMode,
    state: state,
    startedAt: startedAt,
    endedAt: endedAt,
    durationSeconds: durationSeconds,
    stats: stats,
    createdBy: createdBy,
    availableReportSections: availableReportSections,
  } satisfies ShuttleRunV2026R0;
}
export function serializeShuttleRunV2026R0Input(
  val: ShuttleRunV2026R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleRunV2026R0TypeField(val.type),
    ['job_id']: val.jobId,
    ['run_mode']: val.runMode,
    ['state']: val.state,
    ['started_at']:
      val.startedAt == void 0
        ? val.startedAt
        : serializeDateTime(val.startedAt),
    ['ended_at']:
      val.endedAt == void 0 ? val.endedAt : serializeDateTime(val.endedAt),
    ['duration_seconds']: val.durationSeconds,
    ['stats']:
      val.stats == void 0
        ? val.stats
        : serializeShuttleRunV2026R0StatsField(val.stats),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserBaseV2026R0(val.createdBy),
    ['available_report_sections']:
      val.availableReportSections == void 0
        ? val.availableReportSections
        : (val.availableReportSections.map(function (
            item: string,
          ): SerializedData {
            return item;
          }) as readonly any[]),
  };
}
export function deserializeShuttleRunV2026R0Input(
  val: SerializedData,
): ShuttleRunV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleRunV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ShuttleRunV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleRunV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttleRunV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleRunV2026R0TypeField(val.type);
  if (val.job_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "job_id" of type "ShuttleRunV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.job_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "job_id" of type "ShuttleRunV2026R0Input"',
    });
  }
  const jobId: string = val.job_id;
  if (val.run_mode == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "run_mode" of type "ShuttleRunV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.run_mode)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "run_mode" of type "ShuttleRunV2026R0Input"',
    });
  }
  const runMode: string = val.run_mode;
  if (val.state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "state" of type "ShuttleRunV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.state)) {
    throw new BoxSdkError({
      message: 'Expecting string for "state" of type "ShuttleRunV2026R0Input"',
    });
  }
  const state: string = val.state;
  if (!(val.started_at == void 0) && !sdIsString(val.started_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "started_at" of type "ShuttleRunV2026R0Input"',
    });
  }
  const startedAt: undefined | DateTime =
    val.started_at == void 0 ? void 0 : deserializeDateTime(val.started_at);
  if (!(val.ended_at == void 0) && !sdIsString(val.ended_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "ended_at" of type "ShuttleRunV2026R0Input"',
    });
  }
  const endedAt: undefined | DateTime =
    val.ended_at == void 0 ? void 0 : deserializeDateTime(val.ended_at);
  if (!(val.duration_seconds == void 0) && !sdIsNumber(val.duration_seconds)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "duration_seconds" of type "ShuttleRunV2026R0Input"',
    });
  }
  const durationSeconds: undefined | number =
    val.duration_seconds == void 0 ? void 0 : val.duration_seconds;
  const stats: undefined | ShuttleRunV2026R0StatsField =
    val.stats == void 0
      ? void 0
      : deserializeShuttleRunV2026R0StatsField(val.stats);
  const createdBy: UserBaseV2026R0 | undefined =
    val.created_by == void 0
      ? void 0
      : deserializeUserBaseV2026R0(val.created_by);
  if (
    !(val.available_report_sections == void 0) &&
    !sdIsList(val.available_report_sections)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "available_report_sections" of type "ShuttleRunV2026R0Input"',
    });
  }
  const availableReportSections: undefined | readonly string[] =
    val.available_report_sections == void 0
      ? void 0
      : sdIsList(val.available_report_sections)
        ? (val.available_report_sections.map(function (
            itm: SerializedData,
          ): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "ShuttleRunV2026R0Input"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  return {
    id: id,
    type: type,
    jobId: jobId,
    runMode: runMode,
    state: state,
    startedAt: startedAt,
    endedAt: endedAt,
    durationSeconds: durationSeconds,
    stats: stats,
    createdBy: createdBy,
    availableReportSections: availableReportSections,
  } satisfies ShuttleRunV2026R0Input;
}

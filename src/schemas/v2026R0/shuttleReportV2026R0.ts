import { serializeShuttleReportOutputV2026R0 } from './shuttleReportOutputV2026R0';
import { deserializeShuttleReportOutputV2026R0 } from './shuttleReportOutputV2026R0';
import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { ShuttleReportOutputV2026R0 } from './shuttleReportOutputV2026R0';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleReportV2026R0TypeField = 'shuttle_report';
export type ShuttleReportV2026R0FormatField = 'xlsx' | 'csv' | string;
export type ShuttleReportV2026R0UsersScopeField = 'migrated' | 'all' | string;
export class ShuttleReportV2026R0 {
  /**
   * The unique identifier for the shuttle report. */
  readonly id!: string;
  /**
   * The value will always be `shuttle_report`. */
  readonly type: ShuttleReportV2026R0TypeField =
    'shuttle_report' as ShuttleReportV2026R0TypeField;
  /**
   * The unique identifier of the shuttle run this report was generated
   * for. */
  readonly runId!: string;
  /**
   * The generation status of the report. This is an open string whose set
   * of values is expected to grow; the currently documented values include
   * `pending`, `processing`, `complete`, `failed`, `canceled`, and
   * `unknown`. Keep polling `pending` and `processing`. Stop on
   * `complete`, `failed`, `canceled`, and `unknown`. Treat any value that
   * is not recognized the same as `unknown`: do not fail parsing, and do
   * not keep polling. */
  readonly status!: string;
  /**
   * The output file format of the report. */
  readonly format!: ShuttleReportV2026R0FormatField;
  /**
   * The sections included in the report. Echoes the sections requested on
   * create. This is an open list whose set of values is expected to grow;
   * the currently documented values include `files_and_folders`,
   * `event_log`, `transfer_overview`, `source_users`, `target_users`,
   * `source_collaborators`, `target_collaborators`,
   * `source_collaborations`, and `target_collaborations`. Omitted on
   * older reports that have no stored section list. New reports always
   * include this field. */
  readonly sections?: readonly string[];
  /**
   * Which users are included in user-related report sections. */
  readonly usersScope?: ShuttleReportV2026R0UsersScopeField;
  /**
   * The generated Box file or folder. Always present; `null` until
   * `status` is `complete`. */
  readonly output?: ShuttleReportOutputV2026R0;
  /**
   * When report generation was requested. */
  readonly createdAt?: DateTime;
  /**
   * When report generation finished. Always present; `null` while
   * generation is still in progress. */
  readonly completedAt?: DateTime | null;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<ShuttleReportV2026R0, 'type'> &
      Partial<Pick<ShuttleReportV2026R0, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.runId !== undefined) {
      this.runId = fields.runId;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
    }
    if (fields.format !== undefined) {
      this.format = fields.format;
    }
    if (fields.sections !== undefined) {
      this.sections = fields.sections;
    }
    if (fields.usersScope !== undefined) {
      this.usersScope = fields.usersScope;
    }
    if (fields.output !== undefined) {
      this.output = fields.output;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.completedAt !== undefined) {
      this.completedAt = fields.completedAt;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface ShuttleReportV2026R0Input {
  /**
   * The unique identifier for the shuttle report. */
  readonly id: string;
  /**
   * The value will always be `shuttle_report`. */
  readonly type?: ShuttleReportV2026R0TypeField;
  /**
   * The unique identifier of the shuttle run this report was generated
   * for. */
  readonly runId: string;
  /**
   * The generation status of the report. This is an open string whose set
   * of values is expected to grow; the currently documented values include
   * `pending`, `processing`, `complete`, `failed`, `canceled`, and
   * `unknown`. Keep polling `pending` and `processing`. Stop on
   * `complete`, `failed`, `canceled`, and `unknown`. Treat any value that
   * is not recognized the same as `unknown`: do not fail parsing, and do
   * not keep polling. */
  readonly status: string;
  /**
   * The output file format of the report. */
  readonly format: ShuttleReportV2026R0FormatField;
  /**
   * The sections included in the report. Echoes the sections requested on
   * create. This is an open list whose set of values is expected to grow;
   * the currently documented values include `files_and_folders`,
   * `event_log`, `transfer_overview`, `source_users`, `target_users`,
   * `source_collaborators`, `target_collaborators`,
   * `source_collaborations`, and `target_collaborations`. Omitted on
   * older reports that have no stored section list. New reports always
   * include this field. */
  readonly sections?: readonly string[];
  /**
   * Which users are included in user-related report sections. */
  readonly usersScope?: ShuttleReportV2026R0UsersScopeField;
  /**
   * The generated Box file or folder. Always present; `null` until
   * `status` is `complete`. */
  readonly output?: ShuttleReportOutputV2026R0;
  /**
   * When report generation was requested. */
  readonly createdAt?: DateTime;
  /**
   * When report generation finished. Always present; `null` while
   * generation is still in progress. */
  readonly completedAt?: DateTime | null;
  readonly rawData?: SerializedData;
}
export function serializeShuttleReportV2026R0TypeField(
  val: ShuttleReportV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleReportV2026R0TypeField(
  val: SerializedData,
): ShuttleReportV2026R0TypeField {
  if (val == 'shuttle_report') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleReportV2026R0TypeField",
  });
}
export function serializeShuttleReportV2026R0FormatField(
  val: ShuttleReportV2026R0FormatField,
): SerializedData {
  return val;
}
export function deserializeShuttleReportV2026R0FormatField(
  val: SerializedData,
): ShuttleReportV2026R0FormatField {
  if (val == 'xlsx') {
    return val;
  }
  if (val == 'csv') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleReportV2026R0FormatField",
  });
}
export function serializeShuttleReportV2026R0UsersScopeField(
  val: ShuttleReportV2026R0UsersScopeField,
): SerializedData {
  return val;
}
export function deserializeShuttleReportV2026R0UsersScopeField(
  val: SerializedData,
): ShuttleReportV2026R0UsersScopeField {
  if (val == 'migrated') {
    return val;
  }
  if (val == 'all') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleReportV2026R0UsersScopeField",
  });
}
export function serializeShuttleReportV2026R0(
  val: ShuttleReportV2026R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttleReportV2026R0TypeField(val.type),
    ['run_id']: val.runId,
    ['status']: val.status,
    ['format']: serializeShuttleReportV2026R0FormatField(val.format),
    ['sections']:
      val.sections == void 0
        ? val.sections
        : (val.sections.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['users_scope']:
      val.usersScope == void 0
        ? val.usersScope
        : serializeShuttleReportV2026R0UsersScopeField(val.usersScope),
    ['output']:
      val.output == void 0
        ? val.output
        : serializeShuttleReportOutputV2026R0(val.output),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['completed_at']:
      val.completedAt == void 0
        ? val.completedAt
        : serializeDateTime(val.completedAt),
  };
}
export function deserializeShuttleReportV2026R0(
  val: SerializedData,
): ShuttleReportV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleReportV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "ShuttleReportV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleReportV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "ShuttleReportV2026R0" to be defined',
    });
  }
  const type: ShuttleReportV2026R0TypeField =
    deserializeShuttleReportV2026R0TypeField(val.type);
  if (val.run_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "run_id" of type "ShuttleReportV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.run_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "run_id" of type "ShuttleReportV2026R0"',
    });
  }
  const runId: string = val.run_id;
  if (val.status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "status" of type "ShuttleReportV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.status)) {
    throw new BoxSdkError({
      message: 'Expecting string for "status" of type "ShuttleReportV2026R0"',
    });
  }
  const status: string = val.status;
  if (val.format == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "format" of type "ShuttleReportV2026R0" to be defined',
    });
  }
  const format: ShuttleReportV2026R0FormatField =
    deserializeShuttleReportV2026R0FormatField(val.format);
  if (!(val.sections == void 0) && !sdIsList(val.sections)) {
    throw new BoxSdkError({
      message: 'Expecting array for "sections" of type "ShuttleReportV2026R0"',
    });
  }
  const sections: undefined | readonly string[] =
    val.sections == void 0
      ? void 0
      : sdIsList(val.sections)
        ? (val.sections.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "ShuttleReportV2026R0"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  const usersScope: undefined | ShuttleReportV2026R0UsersScopeField =
    val.users_scope == void 0
      ? void 0
      : deserializeShuttleReportV2026R0UsersScopeField(val.users_scope);
  const output: ShuttleReportOutputV2026R0 | undefined =
    val.output == void 0
      ? void 0
      : deserializeShuttleReportOutputV2026R0(val.output);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "ShuttleReportV2026R0"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.completed_at == void 0) && !sdIsString(val.completed_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "completed_at" of type "ShuttleReportV2026R0"',
    });
  }
  const completedAt: undefined | DateTime =
    val.completed_at == void 0 ? void 0 : deserializeDateTime(val.completed_at);
  return {
    id: id,
    type: type,
    runId: runId,
    status: status,
    format: format,
    sections: sections,
    usersScope: usersScope,
    output: output,
    createdAt: createdAt,
    completedAt: completedAt,
  } satisfies ShuttleReportV2026R0;
}
export function serializeShuttleReportV2026R0Input(
  val: ShuttleReportV2026R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeShuttleReportV2026R0TypeField(val.type),
    ['run_id']: val.runId,
    ['status']: val.status,
    ['format']: serializeShuttleReportV2026R0FormatField(val.format),
    ['sections']:
      val.sections == void 0
        ? val.sections
        : (val.sections.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['users_scope']:
      val.usersScope == void 0
        ? val.usersScope
        : serializeShuttleReportV2026R0UsersScopeField(val.usersScope),
    ['output']:
      val.output == void 0
        ? val.output
        : serializeShuttleReportOutputV2026R0(val.output),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['completed_at']:
      val.completedAt == void 0
        ? val.completedAt
        : serializeDateTime(val.completedAt),
  };
}
export function deserializeShuttleReportV2026R0Input(
  val: SerializedData,
): ShuttleReportV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleReportV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleReportV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleReportV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | ShuttleReportV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeShuttleReportV2026R0TypeField(val.type);
  if (val.run_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "run_id" of type "ShuttleReportV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.run_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "run_id" of type "ShuttleReportV2026R0Input"',
    });
  }
  const runId: string = val.run_id;
  if (val.status == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "status" of type "ShuttleReportV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.status)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "status" of type "ShuttleReportV2026R0Input"',
    });
  }
  const status: string = val.status;
  if (val.format == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "format" of type "ShuttleReportV2026R0Input" to be defined',
    });
  }
  const format: ShuttleReportV2026R0FormatField =
    deserializeShuttleReportV2026R0FormatField(val.format);
  if (!(val.sections == void 0) && !sdIsList(val.sections)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "sections" of type "ShuttleReportV2026R0Input"',
    });
  }
  const sections: undefined | readonly string[] =
    val.sections == void 0
      ? void 0
      : sdIsList(val.sections)
        ? (val.sections.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "ShuttleReportV2026R0Input"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  const usersScope: undefined | ShuttleReportV2026R0UsersScopeField =
    val.users_scope == void 0
      ? void 0
      : deserializeShuttleReportV2026R0UsersScopeField(val.users_scope);
  const output: ShuttleReportOutputV2026R0 | undefined =
    val.output == void 0
      ? void 0
      : deserializeShuttleReportOutputV2026R0(val.output);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "ShuttleReportV2026R0Input"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.completed_at == void 0) && !sdIsString(val.completed_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "completed_at" of type "ShuttleReportV2026R0Input"',
    });
  }
  const completedAt: undefined | DateTime =
    val.completed_at == void 0 ? void 0 : deserializeDateTime(val.completed_at);
  return {
    id: id,
    type: type,
    runId: runId,
    status: status,
    format: format,
    sections: sections,
    usersScope: usersScope,
    output: output,
    createdAt: createdAt,
    completedAt: completedAt,
  } satisfies ShuttleReportV2026R0Input;
}

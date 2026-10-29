import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleReportCreateRequestV2026R0FormatField =
  'xlsx' | 'csv' | string;
export type ShuttleReportCreateRequestV2026R0UsersScopeField =
  'migrated' | 'all' | string;
export interface ShuttleReportCreateRequestV2026R0 {
  /**
   * The unique identifier of the shuttle run to generate a report for. */
  readonly runId: string;
  /**
   * The output file format of the report. */
  readonly format: ShuttleReportCreateRequestV2026R0FormatField;
  /**
   * The sections to include in the report. Must be a non-empty subset of
   * the run's `available_report_sections`. This is an open list whose set
   * of values is expected to grow; the currently documented values include
   * `files_and_folders`, `event_log`, `transfer_overview`, `source_users`,
   * `target_users`, `source_collaborators`, `target_collaborators`,
   * `source_collaborations`, and `target_collaborations`. */
  readonly sections: readonly string[];
  /**
   * Which users to include in user-related report sections. Defaults to
   * `migrated` when omitted. */
  readonly usersScope?: ShuttleReportCreateRequestV2026R0UsersScopeField;
  readonly rawData?: SerializedData;
}
export function serializeShuttleReportCreateRequestV2026R0FormatField(
  val: ShuttleReportCreateRequestV2026R0FormatField,
): SerializedData {
  return val;
}
export function deserializeShuttleReportCreateRequestV2026R0FormatField(
  val: SerializedData,
): ShuttleReportCreateRequestV2026R0FormatField {
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
    message: "Can't deserialize ShuttleReportCreateRequestV2026R0FormatField",
  });
}
export function serializeShuttleReportCreateRequestV2026R0UsersScopeField(
  val: ShuttleReportCreateRequestV2026R0UsersScopeField,
): SerializedData {
  return val;
}
export function deserializeShuttleReportCreateRequestV2026R0UsersScopeField(
  val: SerializedData,
): ShuttleReportCreateRequestV2026R0UsersScopeField {
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
    message:
      "Can't deserialize ShuttleReportCreateRequestV2026R0UsersScopeField",
  });
}
export function serializeShuttleReportCreateRequestV2026R0(
  val: ShuttleReportCreateRequestV2026R0,
): SerializedData {
  return {
    ['run_id']: val.runId,
    ['format']: serializeShuttleReportCreateRequestV2026R0FormatField(
      val.format,
    ),
    ['sections']: val.sections.map(function (item: string): SerializedData {
      return item;
    }) as readonly any[],
    ['users_scope']:
      val.usersScope == void 0
        ? val.usersScope
        : serializeShuttleReportCreateRequestV2026R0UsersScopeField(
            val.usersScope,
          ),
  };
}
export function deserializeShuttleReportCreateRequestV2026R0(
  val: SerializedData,
): ShuttleReportCreateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleReportCreateRequestV2026R0"',
    });
  }
  if (val.run_id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "run_id" of type "ShuttleReportCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.run_id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "run_id" of type "ShuttleReportCreateRequestV2026R0"',
    });
  }
  const runId: string = val.run_id;
  if (val.format == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "format" of type "ShuttleReportCreateRequestV2026R0" to be defined',
    });
  }
  const format: ShuttleReportCreateRequestV2026R0FormatField =
    deserializeShuttleReportCreateRequestV2026R0FormatField(val.format);
  if (val.sections == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "sections" of type "ShuttleReportCreateRequestV2026R0" to be defined',
    });
  }
  if (!sdIsList(val.sections)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "sections" of type "ShuttleReportCreateRequestV2026R0"',
    });
  }
  const sections: readonly string[] = sdIsList(val.sections)
    ? (val.sections.map(function (itm: SerializedData): string {
        if (!sdIsString(itm)) {
          throw new BoxSdkError({
            message: 'Expecting string for "ShuttleReportCreateRequestV2026R0"',
          });
        }
        return itm;
      }) as readonly any[])
    : [];
  const usersScope:
    undefined | ShuttleReportCreateRequestV2026R0UsersScopeField =
    val.users_scope == void 0
      ? void 0
      : deserializeShuttleReportCreateRequestV2026R0UsersScopeField(
          val.users_scope,
        );
  return {
    runId: runId,
    format: format,
    sections: sections,
    usersScope: usersScope,
  } satisfies ShuttleReportCreateRequestV2026R0;
}

import { serializeFileVersionMini } from './fileVersionMini.generated.js';
import { deserializeFileVersionMini } from './fileVersionMini.generated.js';
import { serializeFileMini } from './fileMini.generated.js';
import { deserializeFileMini } from './fileMini.generated.js';
import { serializeRetentionPolicyMini } from './retentionPolicyMini.generated.js';
import { deserializeRetentionPolicyMini } from './retentionPolicyMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { FileVersionMini } from './fileVersionMini.generated.js';
import { FileMini } from './fileMini.generated.js';
import { RetentionPolicyMini } from './retentionPolicyMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FileVersionRetentionTypeField = 'file_version_retention';
export interface FileVersionRetention {
  /**
   * The unique identifier for this file version retention. */
  readonly id?: string;
  /**
   * `file_version_retention` */
  readonly type?: FileVersionRetentionTypeField;
  readonly fileVersion?: FileVersionMini;
  readonly file?: FileMini;
  /**
   * When this file version retention object was
   * created */
  readonly appliedAt?: DateTime;
  /**
   * When the retention expires on this file
   * version retention */
  readonly dispositionAt?: DateTime;
  readonly winningRetentionPolicy?: RetentionPolicyMini;
  readonly rawData?: SerializedData;
}
export function serializeFileVersionRetentionTypeField(
  val: FileVersionRetentionTypeField,
): SerializedData {
  return val;
}
export function deserializeFileVersionRetentionTypeField(
  val: SerializedData,
): FileVersionRetentionTypeField {
  if (val == 'file_version_retention') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileVersionRetentionTypeField",
  });
}
export function serializeFileVersionRetention(
  val: FileVersionRetention,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeFileVersionRetentionTypeField(val.type),
    ['file_version']:
      val.fileVersion == void 0
        ? val.fileVersion
        : serializeFileVersionMini(val.fileVersion),
    ['file']: val.file == void 0 ? val.file : serializeFileMini(val.file),
    ['applied_at']:
      val.appliedAt == void 0
        ? val.appliedAt
        : serializeDateTime(val.appliedAt),
    ['disposition_at']:
      val.dispositionAt == void 0
        ? val.dispositionAt
        : serializeDateTime(val.dispositionAt),
    ['winning_retention_policy']:
      val.winningRetentionPolicy == void 0
        ? val.winningRetentionPolicy
        : serializeRetentionPolicyMini(val.winningRetentionPolicy),
  };
}
export function deserializeFileVersionRetention(
  val: SerializedData,
): FileVersionRetention {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileVersionRetention"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileVersionRetention"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | FileVersionRetentionTypeField =
    val.type == void 0
      ? void 0
      : deserializeFileVersionRetentionTypeField(val.type);
  const fileVersion: undefined | FileVersionMini =
    val.file_version == void 0
      ? void 0
      : deserializeFileVersionMini(val.file_version);
  const file: undefined | FileMini =
    val.file == void 0 ? void 0 : deserializeFileMini(val.file);
  if (!(val.applied_at == void 0) && !sdIsString(val.applied_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "applied_at" of type "FileVersionRetention"',
    });
  }
  const appliedAt: undefined | DateTime =
    val.applied_at == void 0 ? void 0 : deserializeDateTime(val.applied_at);
  if (!(val.disposition_at == void 0) && !sdIsString(val.disposition_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "disposition_at" of type "FileVersionRetention"',
    });
  }
  const dispositionAt: undefined | DateTime =
    val.disposition_at == void 0
      ? void 0
      : deserializeDateTime(val.disposition_at);
  const winningRetentionPolicy: undefined | RetentionPolicyMini =
    val.winning_retention_policy == void 0
      ? void 0
      : deserializeRetentionPolicyMini(val.winning_retention_policy);
  return {
    id: id,
    type: type,
    fileVersion: fileVersion,
    file: file,
    appliedAt: appliedAt,
    dispositionAt: dispositionAt,
    winningRetentionPolicy: winningRetentionPolicy,
  } satisfies FileVersionRetention;
}

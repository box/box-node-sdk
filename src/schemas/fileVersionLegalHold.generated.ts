import { serializeFileVersionMini } from './fileVersionMini.generated.js';
import { deserializeFileVersionMini } from './fileVersionMini.generated.js';
import { serializeFileMini } from './fileMini.generated.js';
import { deserializeFileMini } from './fileMini.generated.js';
import { serializeLegalHoldPolicyAssignment } from './legalHoldPolicyAssignment.generated.js';
import { deserializeLegalHoldPolicyAssignment } from './legalHoldPolicyAssignment.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { FileVersionMini } from './fileVersionMini.generated.js';
import { FileMini } from './fileMini.generated.js';
import { LegalHoldPolicyAssignment } from './legalHoldPolicyAssignment.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FileVersionLegalHoldTypeField = 'file_version_legal_hold';
export interface FileVersionLegalHold {
  /**
   * The unique identifier for this file version legal hold. */
  readonly id?: string;
  /**
   * The value will always be `file_version_legal_hold`. */
  readonly type?: FileVersionLegalHoldTypeField;
  readonly fileVersion?: FileVersionMini;
  readonly file?: FileMini;
  /**
   * List of assignments contributing to this Hold. */
  readonly legalHoldPolicyAssignments?: readonly LegalHoldPolicyAssignment[];
  /**
   * Time that this File-Version-Legal-Hold was
   * deleted. */
  readonly deletedAt?: DateTime;
  readonly rawData?: SerializedData;
}
export function serializeFileVersionLegalHoldTypeField(
  val: FileVersionLegalHoldTypeField,
): SerializedData {
  return val;
}
export function deserializeFileVersionLegalHoldTypeField(
  val: SerializedData,
): FileVersionLegalHoldTypeField {
  if (val == 'file_version_legal_hold') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileVersionLegalHoldTypeField",
  });
}
export function serializeFileVersionLegalHold(
  val: FileVersionLegalHold,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeFileVersionLegalHoldTypeField(val.type),
    ['file_version']:
      val.fileVersion == void 0
        ? val.fileVersion
        : serializeFileVersionMini(val.fileVersion),
    ['file']: val.file == void 0 ? val.file : serializeFileMini(val.file),
    ['legal_hold_policy_assignments']:
      val.legalHoldPolicyAssignments == void 0
        ? val.legalHoldPolicyAssignments
        : (val.legalHoldPolicyAssignments.map(function (
            item: LegalHoldPolicyAssignment,
          ): SerializedData {
            return serializeLegalHoldPolicyAssignment(item);
          }) as readonly any[]),
    ['deleted_at']:
      val.deletedAt == void 0
        ? val.deletedAt
        : serializeDateTime(val.deletedAt),
  };
}
export function deserializeFileVersionLegalHold(
  val: SerializedData,
): FileVersionLegalHold {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileVersionLegalHold"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileVersionLegalHold"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | FileVersionLegalHoldTypeField =
    val.type == void 0
      ? void 0
      : deserializeFileVersionLegalHoldTypeField(val.type);
  const fileVersion: undefined | FileVersionMini =
    val.file_version == void 0
      ? void 0
      : deserializeFileVersionMini(val.file_version);
  const file: undefined | FileMini =
    val.file == void 0 ? void 0 : deserializeFileMini(val.file);
  if (
    !(val.legal_hold_policy_assignments == void 0) &&
    !sdIsList(val.legal_hold_policy_assignments)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "legal_hold_policy_assignments" of type "FileVersionLegalHold"',
    });
  }
  const legalHoldPolicyAssignments:
    | undefined
    | readonly LegalHoldPolicyAssignment[] =
    val.legal_hold_policy_assignments == void 0
      ? void 0
      : sdIsList(val.legal_hold_policy_assignments)
        ? (val.legal_hold_policy_assignments.map(function (
            itm: SerializedData,
          ): LegalHoldPolicyAssignment {
            return deserializeLegalHoldPolicyAssignment(itm);
          }) as readonly any[])
        : [];
  if (!(val.deleted_at == void 0) && !sdIsString(val.deleted_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "deleted_at" of type "FileVersionLegalHold"',
    });
  }
  const deletedAt: undefined | DateTime =
    val.deleted_at == void 0 ? void 0 : deserializeDateTime(val.deleted_at);
  return {
    id: id,
    type: type,
    fileVersion: fileVersion,
    file: file,
    legalHoldPolicyAssignments: legalHoldPolicyAssignments,
    deletedAt: deletedAt,
  } satisfies FileVersionLegalHold;
}

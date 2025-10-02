import { serializeFileVersionMini } from './fileVersionMini';
import { deserializeFileVersionMini } from './fileVersionMini';
import { serializeFileMini } from './fileMini';
import { deserializeFileMini } from './fileMini';
import { serializeLegalHoldPolicyAssignment } from './legalHoldPolicyAssignment';
import { deserializeLegalHoldPolicyAssignment } from './legalHoldPolicyAssignment';
import { serializeDateTime } from '../internal/utils';
import { deserializeDateTime } from '../internal/utils';
import { FileVersionMini } from './fileVersionMini';
import { FileMini } from './fileMini';
import { LegalHoldPolicyAssignment } from './legalHoldPolicyAssignment';
import { BoxSdkError } from '../box/errors';
import { DateTime } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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

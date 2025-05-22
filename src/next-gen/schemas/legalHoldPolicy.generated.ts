import { serializeLegalHoldPolicyMiniTypeField } from './legalHoldPolicyMini.generated.js';
import { deserializeLegalHoldPolicyMiniTypeField } from './legalHoldPolicyMini.generated.js';
import { serializeLegalHoldPolicyMini } from './legalHoldPolicyMini.generated.js';
import { deserializeLegalHoldPolicyMini } from './legalHoldPolicyMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { LegalHoldPolicyMiniTypeField } from './legalHoldPolicyMini.generated.js';
import { LegalHoldPolicyMini } from './legalHoldPolicyMini.generated.js';
import { UserMini } from './userMini.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type LegalHoldPolicyStatusField =
  | 'active'
  | 'applying'
  | 'releasing'
  | 'released'
  | string;
export interface LegalHoldPolicyAssignmentCountsField {
  /**
   * The number of users this policy is applied to */
  readonly user?: number;
  /**
   * The number of folders this policy is applied to */
  readonly folder?: number;
  /**
   * The number of files this policy is applied to */
  readonly file?: number;
  /**
   * The number of file versions this policy is applied to */
  readonly fileVersion?: number;
  readonly rawData?: SerializedData;
}
export class LegalHoldPolicy extends LegalHoldPolicyMini {
  readonly policyName?: string;
  readonly description?: string;
  readonly status?: LegalHoldPolicyStatusField;
  readonly assignmentCounts?: LegalHoldPolicyAssignmentCountsField;
  readonly createdBy?: UserMini;
  readonly createdAt?: DateTime;
  readonly modifiedAt?: DateTime;
  readonly deletedAt?: DateTime;
  readonly filterStartedAt?: DateTime;
  readonly filterEndedAt?: DateTime;
  readonly releaseNotes?: string;
  constructor(fields: LegalHoldPolicy) {
    super(fields);
    if (fields.policyName !== undefined) {
      this.policyName = fields.policyName;
    }
    if (fields.description !== undefined) {
      this.description = fields.description;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
    }
    if (fields.assignmentCounts !== undefined) {
      this.assignmentCounts = fields.assignmentCounts;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.modifiedAt !== undefined) {
      this.modifiedAt = fields.modifiedAt;
    }
    if (fields.deletedAt !== undefined) {
      this.deletedAt = fields.deletedAt;
    }
    if (fields.filterStartedAt !== undefined) {
      this.filterStartedAt = fields.filterStartedAt;
    }
    if (fields.filterEndedAt !== undefined) {
      this.filterEndedAt = fields.filterEndedAt;
    }
    if (fields.releaseNotes !== undefined) {
      this.releaseNotes = fields.releaseNotes;
    }
  }
}
export function serializeLegalHoldPolicyStatusField(
  val: LegalHoldPolicyStatusField,
): SerializedData {
  return val;
}
export function deserializeLegalHoldPolicyStatusField(
  val: SerializedData,
): LegalHoldPolicyStatusField {
  if (val == 'active') {
    return val;
  }
  if (val == 'applying') {
    return val;
  }
  if (val == 'releasing') {
    return val;
  }
  if (val == 'released') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize LegalHoldPolicyStatusField",
  });
}
export function serializeLegalHoldPolicyAssignmentCountsField(
  val: LegalHoldPolicyAssignmentCountsField,
): SerializedData {
  return {
    ['user']: val.user,
    ['folder']: val.folder,
    ['file']: val.file,
    ['file_version']: val.fileVersion,
  };
}
export function deserializeLegalHoldPolicyAssignmentCountsField(
  val: SerializedData,
): LegalHoldPolicyAssignmentCountsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "LegalHoldPolicyAssignmentCountsField"',
    });
  }
  if (!(val.user == void 0) && !sdIsNumber(val.user)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "user" of type "LegalHoldPolicyAssignmentCountsField"',
    });
  }
  const user: undefined | number = val.user == void 0 ? void 0 : val.user;
  if (!(val.folder == void 0) && !sdIsNumber(val.folder)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "folder" of type "LegalHoldPolicyAssignmentCountsField"',
    });
  }
  const folder: undefined | number = val.folder == void 0 ? void 0 : val.folder;
  if (!(val.file == void 0) && !sdIsNumber(val.file)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "file" of type "LegalHoldPolicyAssignmentCountsField"',
    });
  }
  const file: undefined | number = val.file == void 0 ? void 0 : val.file;
  if (!(val.file_version == void 0) && !sdIsNumber(val.file_version)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "file_version" of type "LegalHoldPolicyAssignmentCountsField"',
    });
  }
  const fileVersion: undefined | number =
    val.file_version == void 0 ? void 0 : val.file_version;
  return {
    user: user,
    folder: folder,
    file: file,
    fileVersion: fileVersion,
  } satisfies LegalHoldPolicyAssignmentCountsField;
}
export function serializeLegalHoldPolicy(val: LegalHoldPolicy): SerializedData {
  const base: any = serializeLegalHoldPolicyMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "LegalHoldPolicy"' });
  }
  return {
    ...base,
    ...{
      ['policy_name']: val.policyName,
      ['description']: val.description,
      ['status']:
        val.status == void 0
          ? val.status
          : serializeLegalHoldPolicyStatusField(val.status),
      ['assignment_counts']:
        val.assignmentCounts == void 0
          ? val.assignmentCounts
          : serializeLegalHoldPolicyAssignmentCountsField(val.assignmentCounts),
      ['created_by']:
        val.createdBy == void 0
          ? val.createdBy
          : serializeUserMini(val.createdBy),
      ['created_at']:
        val.createdAt == void 0
          ? val.createdAt
          : serializeDateTime(val.createdAt),
      ['modified_at']:
        val.modifiedAt == void 0
          ? val.modifiedAt
          : serializeDateTime(val.modifiedAt),
      ['deleted_at']:
        val.deletedAt == void 0
          ? val.deletedAt
          : serializeDateTime(val.deletedAt),
      ['filter_started_at']:
        val.filterStartedAt == void 0
          ? val.filterStartedAt
          : serializeDateTime(val.filterStartedAt),
      ['filter_ended_at']:
        val.filterEndedAt == void 0
          ? val.filterEndedAt
          : serializeDateTime(val.filterEndedAt),
      ['release_notes']: val.releaseNotes,
    },
  };
}
export function deserializeLegalHoldPolicy(
  val: SerializedData,
): LegalHoldPolicy {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "LegalHoldPolicy"' });
  }
  if (!(val.policy_name == void 0) && !sdIsString(val.policy_name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "policy_name" of type "LegalHoldPolicy"',
    });
  }
  const policyName: undefined | string =
    val.policy_name == void 0 ? void 0 : val.policy_name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "LegalHoldPolicy"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const status: undefined | LegalHoldPolicyStatusField =
    val.status == void 0
      ? void 0
      : deserializeLegalHoldPolicyStatusField(val.status);
  const assignmentCounts: undefined | LegalHoldPolicyAssignmentCountsField =
    val.assignment_counts == void 0
      ? void 0
      : deserializeLegalHoldPolicyAssignmentCountsField(val.assignment_counts);
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "LegalHoldPolicy"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "LegalHoldPolicy"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (!(val.deleted_at == void 0) && !sdIsString(val.deleted_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "deleted_at" of type "LegalHoldPolicy"',
    });
  }
  const deletedAt: undefined | DateTime =
    val.deleted_at == void 0 ? void 0 : deserializeDateTime(val.deleted_at);
  if (
    !(val.filter_started_at == void 0) &&
    !sdIsString(val.filter_started_at)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "filter_started_at" of type "LegalHoldPolicy"',
    });
  }
  const filterStartedAt: undefined | DateTime =
    val.filter_started_at == void 0
      ? void 0
      : deserializeDateTime(val.filter_started_at);
  if (!(val.filter_ended_at == void 0) && !sdIsString(val.filter_ended_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "filter_ended_at" of type "LegalHoldPolicy"',
    });
  }
  const filterEndedAt: undefined | DateTime =
    val.filter_ended_at == void 0
      ? void 0
      : deserializeDateTime(val.filter_ended_at);
  if (!(val.release_notes == void 0) && !sdIsString(val.release_notes)) {
    throw new BoxSdkError({
      message: 'Expecting string for "release_notes" of type "LegalHoldPolicy"',
    });
  }
  const releaseNotes: undefined | string =
    val.release_notes == void 0 ? void 0 : val.release_notes;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "LegalHoldPolicy" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "LegalHoldPolicy"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "LegalHoldPolicy" to be defined',
    });
  }
  const type: LegalHoldPolicyMiniTypeField =
    deserializeLegalHoldPolicyMiniTypeField(val.type);
  return {
    policyName: policyName,
    description: description,
    status: status,
    assignmentCounts: assignmentCounts,
    createdBy: createdBy,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    deletedAt: deletedAt,
    filterStartedAt: filterStartedAt,
    filterEndedAt: filterEndedAt,
    releaseNotes: releaseNotes,
    id: id,
    type: type,
  } satisfies LegalHoldPolicy;
}

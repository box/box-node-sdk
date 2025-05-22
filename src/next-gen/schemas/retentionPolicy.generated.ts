import { serializeRetentionPolicyBaseTypeField } from './retentionPolicyBase.generated.js';
import { deserializeRetentionPolicyBaseTypeField } from './retentionPolicyBase.generated.js';
import { serializeRetentionPolicyBase } from './retentionPolicyBase.generated.js';
import { deserializeRetentionPolicyBase } from './retentionPolicyBase.generated.js';
import { serializeRetentionPolicyMiniDispositionActionField } from './retentionPolicyMini.generated.js';
import { deserializeRetentionPolicyMiniDispositionActionField } from './retentionPolicyMini.generated.js';
import { serializeRetentionPolicyMini } from './retentionPolicyMini.generated.js';
import { deserializeRetentionPolicyMini } from './retentionPolicyMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { RetentionPolicyBaseTypeField } from './retentionPolicyBase.generated.js';
import { RetentionPolicyBase } from './retentionPolicyBase.generated.js';
import { RetentionPolicyMiniDispositionActionField } from './retentionPolicyMini.generated.js';
import { RetentionPolicyMini } from './retentionPolicyMini.generated.js';
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
export type RetentionPolicyPolicyTypeField = 'finite' | 'indefinite' | string;
export type RetentionPolicyRetentionTypeField =
  | 'modifiable'
  | 'non_modifiable'
  | string;
export type RetentionPolicyStatusField = 'active' | 'retired' | string;
export interface RetentionPolicyAssignmentCountsField {
  /**
   * The number of enterprise assignments this policy has. The maximum value is 1. */
  readonly enterprise?: number;
  /**
   * The number of folder assignments this policy has. */
  readonly folder?: number;
  /**
   * The number of metadata template assignments this policy has. */
  readonly metadataTemplate?: number;
  readonly rawData?: SerializedData;
}
export class RetentionPolicy extends RetentionPolicyMini {
  readonly description?: string;
  readonly policyType?: RetentionPolicyPolicyTypeField;
  readonly retentionType?: RetentionPolicyRetentionTypeField;
  readonly status?: RetentionPolicyStatusField;
  readonly createdBy?: UserMini;
  readonly createdAt?: DateTime;
  readonly modifiedAt?: DateTime;
  readonly canOwnerExtendRetention?: boolean;
  readonly areOwnersNotified?: boolean;
  readonly customNotificationRecipients?: readonly UserMini[];
  readonly assignmentCounts?: RetentionPolicyAssignmentCountsField;
  constructor(fields: RetentionPolicy) {
    super(fields);
    if (fields.description !== undefined) {
      this.description = fields.description;
    }
    if (fields.policyType !== undefined) {
      this.policyType = fields.policyType;
    }
    if (fields.retentionType !== undefined) {
      this.retentionType = fields.retentionType;
    }
    if (fields.status !== undefined) {
      this.status = fields.status;
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
    if (fields.canOwnerExtendRetention !== undefined) {
      this.canOwnerExtendRetention = fields.canOwnerExtendRetention;
    }
    if (fields.areOwnersNotified !== undefined) {
      this.areOwnersNotified = fields.areOwnersNotified;
    }
    if (fields.customNotificationRecipients !== undefined) {
      this.customNotificationRecipients = fields.customNotificationRecipients;
    }
    if (fields.assignmentCounts !== undefined) {
      this.assignmentCounts = fields.assignmentCounts;
    }
  }
}
export function serializeRetentionPolicyPolicyTypeField(
  val: RetentionPolicyPolicyTypeField,
): SerializedData {
  return val;
}
export function deserializeRetentionPolicyPolicyTypeField(
  val: SerializedData,
): RetentionPolicyPolicyTypeField {
  if (val == 'finite') {
    return val;
  }
  if (val == 'indefinite') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RetentionPolicyPolicyTypeField",
  });
}
export function serializeRetentionPolicyRetentionTypeField(
  val: RetentionPolicyRetentionTypeField,
): SerializedData {
  return val;
}
export function deserializeRetentionPolicyRetentionTypeField(
  val: SerializedData,
): RetentionPolicyRetentionTypeField {
  if (val == 'modifiable') {
    return val;
  }
  if (val == 'non_modifiable') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RetentionPolicyRetentionTypeField",
  });
}
export function serializeRetentionPolicyStatusField(
  val: RetentionPolicyStatusField,
): SerializedData {
  return val;
}
export function deserializeRetentionPolicyStatusField(
  val: SerializedData,
): RetentionPolicyStatusField {
  if (val == 'active') {
    return val;
  }
  if (val == 'retired') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RetentionPolicyStatusField",
  });
}
export function serializeRetentionPolicyAssignmentCountsField(
  val: RetentionPolicyAssignmentCountsField,
): SerializedData {
  return {
    ['enterprise']: val.enterprise,
    ['folder']: val.folder,
    ['metadata_template']: val.metadataTemplate,
  };
}
export function deserializeRetentionPolicyAssignmentCountsField(
  val: SerializedData,
): RetentionPolicyAssignmentCountsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RetentionPolicyAssignmentCountsField"',
    });
  }
  if (!(val.enterprise == void 0) && !sdIsNumber(val.enterprise)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "enterprise" of type "RetentionPolicyAssignmentCountsField"',
    });
  }
  const enterprise: undefined | number =
    val.enterprise == void 0 ? void 0 : val.enterprise;
  if (!(val.folder == void 0) && !sdIsNumber(val.folder)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "folder" of type "RetentionPolicyAssignmentCountsField"',
    });
  }
  const folder: undefined | number = val.folder == void 0 ? void 0 : val.folder;
  if (
    !(val.metadata_template == void 0) &&
    !sdIsNumber(val.metadata_template)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "metadata_template" of type "RetentionPolicyAssignmentCountsField"',
    });
  }
  const metadataTemplate: undefined | number =
    val.metadata_template == void 0 ? void 0 : val.metadata_template;
  return {
    enterprise: enterprise,
    folder: folder,
    metadataTemplate: metadataTemplate,
  } satisfies RetentionPolicyAssignmentCountsField;
}
export function serializeRetentionPolicy(val: RetentionPolicy): SerializedData {
  const base: any = serializeRetentionPolicyMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "RetentionPolicy"' });
  }
  return {
    ...base,
    ...{
      ['description']: val.description,
      ['policy_type']:
        val.policyType == void 0
          ? val.policyType
          : serializeRetentionPolicyPolicyTypeField(val.policyType),
      ['retention_type']:
        val.retentionType == void 0
          ? val.retentionType
          : serializeRetentionPolicyRetentionTypeField(val.retentionType),
      ['status']:
        val.status == void 0
          ? val.status
          : serializeRetentionPolicyStatusField(val.status),
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
      ['can_owner_extend_retention']: val.canOwnerExtendRetention,
      ['are_owners_notified']: val.areOwnersNotified,
      ['custom_notification_recipients']:
        val.customNotificationRecipients == void 0
          ? val.customNotificationRecipients
          : (val.customNotificationRecipients.map(function (
              item: UserMini,
            ): SerializedData {
              return serializeUserMini(item);
            }) as readonly any[]),
      ['assignment_counts']:
        val.assignmentCounts == void 0
          ? val.assignmentCounts
          : serializeRetentionPolicyAssignmentCountsField(val.assignmentCounts),
    },
  };
}
export function deserializeRetentionPolicy(
  val: SerializedData,
): RetentionPolicy {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "RetentionPolicy"' });
  }
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "RetentionPolicy"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  const policyType: undefined | RetentionPolicyPolicyTypeField =
    val.policy_type == void 0
      ? void 0
      : deserializeRetentionPolicyPolicyTypeField(val.policy_type);
  const retentionType: undefined | RetentionPolicyRetentionTypeField =
    val.retention_type == void 0
      ? void 0
      : deserializeRetentionPolicyRetentionTypeField(val.retention_type);
  const status: undefined | RetentionPolicyStatusField =
    val.status == void 0
      ? void 0
      : deserializeRetentionPolicyStatusField(val.status);
  const createdBy: undefined | UserMini =
    val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "RetentionPolicy"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.modified_at == void 0) && !sdIsString(val.modified_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "modified_at" of type "RetentionPolicy"',
    });
  }
  const modifiedAt: undefined | DateTime =
    val.modified_at == void 0 ? void 0 : deserializeDateTime(val.modified_at);
  if (
    !(val.can_owner_extend_retention == void 0) &&
    !sdIsBoolean(val.can_owner_extend_retention)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "can_owner_extend_retention" of type "RetentionPolicy"',
    });
  }
  const canOwnerExtendRetention: undefined | boolean =
    val.can_owner_extend_retention == void 0
      ? void 0
      : val.can_owner_extend_retention;
  if (
    !(val.are_owners_notified == void 0) &&
    !sdIsBoolean(val.are_owners_notified)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting boolean for "are_owners_notified" of type "RetentionPolicy"',
    });
  }
  const areOwnersNotified: undefined | boolean =
    val.are_owners_notified == void 0 ? void 0 : val.are_owners_notified;
  if (
    !(val.custom_notification_recipients == void 0) &&
    !sdIsList(val.custom_notification_recipients)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "custom_notification_recipients" of type "RetentionPolicy"',
    });
  }
  const customNotificationRecipients: undefined | readonly UserMini[] =
    val.custom_notification_recipients == void 0
      ? void 0
      : sdIsList(val.custom_notification_recipients)
        ? (val.custom_notification_recipients.map(function (
            itm: SerializedData,
          ): UserMini {
            return deserializeUserMini(itm);
          }) as readonly any[])
        : [];
  const assignmentCounts: undefined | RetentionPolicyAssignmentCountsField =
    val.assignment_counts == void 0
      ? void 0
      : deserializeRetentionPolicyAssignmentCountsField(val.assignment_counts);
  if (!(val.policy_name == void 0) && !sdIsString(val.policy_name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "policy_name" of type "RetentionPolicy"',
    });
  }
  const policyName: undefined | string =
    val.policy_name == void 0 ? void 0 : val.policy_name;
  if (!(val.retention_length == void 0) && !sdIsString(val.retention_length)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "retention_length" of type "RetentionPolicy"',
    });
  }
  const retentionLength: undefined | string =
    val.retention_length == void 0 ? void 0 : val.retention_length;
  const dispositionAction:
    | undefined
    | RetentionPolicyMiniDispositionActionField =
    val.disposition_action == void 0
      ? void 0
      : deserializeRetentionPolicyMiniDispositionActionField(
          val.disposition_action,
        );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "RetentionPolicy" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "RetentionPolicy"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "RetentionPolicy" to be defined',
    });
  }
  const type: RetentionPolicyBaseTypeField =
    deserializeRetentionPolicyBaseTypeField(val.type);
  return {
    description: description,
    policyType: policyType,
    retentionType: retentionType,
    status: status,
    createdBy: createdBy,
    createdAt: createdAt,
    modifiedAt: modifiedAt,
    canOwnerExtendRetention: canOwnerExtendRetention,
    areOwnersNotified: areOwnersNotified,
    customNotificationRecipients: customNotificationRecipients,
    assignmentCounts: assignmentCounts,
    policyName: policyName,
    retentionLength: retentionLength,
    dispositionAction: dispositionAction,
    id: id,
    type: type,
  } satisfies RetentionPolicy;
}

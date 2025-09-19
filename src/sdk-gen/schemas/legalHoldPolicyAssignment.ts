import { serializeLegalHoldPolicyAssignmentBaseTypeField } from './legalHoldPolicyAssignmentBase.js';
import { deserializeLegalHoldPolicyAssignmentBaseTypeField } from './legalHoldPolicyAssignmentBase.js';
import { serializeFile } from './file.js';
import { deserializeFile } from './file.js';
import { serializeFolder } from './folder.js';
import { deserializeFolder } from './folder.js';
import { serializeWebLink } from './webLink.js';
import { deserializeWebLink } from './webLink.js';
import { serializeLegalHoldPolicyAssignmentBase } from './legalHoldPolicyAssignmentBase.js';
import { deserializeLegalHoldPolicyAssignmentBase } from './legalHoldPolicyAssignmentBase.js';
import { serializeLegalHoldPolicyMini } from './legalHoldPolicyMini.js';
import { deserializeLegalHoldPolicyMini } from './legalHoldPolicyMini.js';
import { serializeLegalHoldPolicyAssignedItem } from './legalHoldPolicyAssignedItem.js';
import { deserializeLegalHoldPolicyAssignedItem } from './legalHoldPolicyAssignedItem.js';
import { serializeUserMini } from './userMini.js';
import { deserializeUserMini } from './userMini.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { LegalHoldPolicyAssignmentBaseTypeField } from './legalHoldPolicyAssignmentBase.js';
import { File } from './file.js';
import { Folder } from './folder.js';
import { WebLink } from './webLink.js';
import { LegalHoldPolicyAssignmentBase } from './legalHoldPolicyAssignmentBase.js';
import { LegalHoldPolicyMini } from './legalHoldPolicyMini.js';
import { LegalHoldPolicyAssignedItem } from './legalHoldPolicyAssignedItem.js';
import { UserMini } from './userMini.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type LegalHoldPolicyAssignment = LegalHoldPolicyAssignmentBase & {
  readonly legalHoldPolicy?: LegalHoldPolicyMini;
  readonly assignedTo?: LegalHoldPolicyAssignedItem;
  readonly assignedBy?: UserMini;
  /**
   * When the legal hold policy assignment object was
   * created. */
  readonly assignedAt?: DateTime;
  /**
   * When the assignment release request was sent.
   * (Because it can take time for an assignment to fully
   * delete, this isn't quite the same time that the
   * assignment is fully deleted). If null, Assignment
   * was not deleted. */
  readonly deletedAt?: DateTime;
};
export function serializeLegalHoldPolicyAssignment(
  val: LegalHoldPolicyAssignment
): SerializedData {
  const base: any = serializeLegalHoldPolicyAssignmentBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "LegalHoldPolicyAssignment"',
    });
  }
  return {
    ...base,
    ...{
      ['legal_hold_policy']:
        val.legalHoldPolicy == void 0
          ? val.legalHoldPolicy
          : serializeLegalHoldPolicyMini(val.legalHoldPolicy),
      ['assigned_to']:
        val.assignedTo == void 0
          ? val.assignedTo
          : serializeLegalHoldPolicyAssignedItem(val.assignedTo),
      ['assigned_by']:
        val.assignedBy == void 0
          ? val.assignedBy
          : serializeUserMini(val.assignedBy),
      ['assigned_at']:
        val.assignedAt == void 0
          ? val.assignedAt
          : serializeDateTime(val.assignedAt),
      ['deleted_at']:
        val.deletedAt == void 0
          ? val.deletedAt
          : serializeDateTime(val.deletedAt),
    },
  };
}
export function deserializeLegalHoldPolicyAssignment(
  val: SerializedData
): LegalHoldPolicyAssignment {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "LegalHoldPolicyAssignment"',
    });
  }
  const legalHoldPolicy: undefined | LegalHoldPolicyMini =
    val.legal_hold_policy == void 0
      ? void 0
      : deserializeLegalHoldPolicyMini(val.legal_hold_policy);
  const assignedTo: undefined | LegalHoldPolicyAssignedItem =
    val.assigned_to == void 0
      ? void 0
      : deserializeLegalHoldPolicyAssignedItem(val.assigned_to);
  const assignedBy: undefined | UserMini =
    val.assigned_by == void 0 ? void 0 : deserializeUserMini(val.assigned_by);
  if (!(val.assigned_at == void 0) && !sdIsString(val.assigned_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "assigned_at" of type "LegalHoldPolicyAssignment"',
    });
  }
  const assignedAt: undefined | DateTime =
    val.assigned_at == void 0 ? void 0 : deserializeDateTime(val.assigned_at);
  if (!(val.deleted_at == void 0) && !sdIsString(val.deleted_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "deleted_at" of type "LegalHoldPolicyAssignment"',
    });
  }
  const deletedAt: undefined | DateTime =
    val.deleted_at == void 0 ? void 0 : deserializeDateTime(val.deleted_at);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "LegalHoldPolicyAssignment"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | LegalHoldPolicyAssignmentBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeLegalHoldPolicyAssignmentBaseTypeField(val.type);
  return {
    legalHoldPolicy: legalHoldPolicy,
    assignedTo: assignedTo,
    assignedBy: assignedBy,
    assignedAt: assignedAt,
    deletedAt: deletedAt,
    id: id,
    type: type,
  } satisfies LegalHoldPolicyAssignment;
}

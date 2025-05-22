import { serializeFileMini } from './fileMini.generated.js';
import { deserializeFileMini } from './fileMini.generated.js';
import { serializeUserMini } from './userMini.generated.js';
import { deserializeUserMini } from './userMini.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { FileMini } from './fileMini.generated.js';
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
export type TaskAssignmentTypeField = 'task_assignment';
export type TaskAssignmentResolutionStateField =
  | 'completed'
  | 'incomplete'
  | 'approved'
  | 'rejected'
  | string;
export interface TaskAssignment {
  /**
   * The unique identifier for this task assignment */
  readonly id?: string;
  /**
   * `task_assignment` */
  readonly type?: TaskAssignmentTypeField;
  readonly item?: FileMini;
  readonly assignedTo?: UserMini;
  /**
   * A message that will is included with the task
   * assignment. This is visible to the assigned user in the web and mobile
   * UI. */
  readonly message?: string;
  /**
   * The date at which this task assignment was
   * completed. This will be `null` if the task is not completed yet. */
  readonly completedAt?: DateTime;
  /**
   * The date at which this task was assigned to the user. */
  readonly assignedAt?: DateTime;
  /**
   * The date at which the assigned user was reminded of this task
   * assignment. */
  readonly remindedAt?: DateTime;
  /**
   * The current state of the assignment. The available states depend on
   * the `action` value of the task object. */
  readonly resolutionState?: TaskAssignmentResolutionStateField;
  readonly assignedBy?: UserMini;
  readonly rawData?: SerializedData;
}
export function serializeTaskAssignmentTypeField(
  val: TaskAssignmentTypeField,
): SerializedData {
  return val;
}
export function deserializeTaskAssignmentTypeField(
  val: SerializedData,
): TaskAssignmentTypeField {
  if (val == 'task_assignment') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TaskAssignmentTypeField",
  });
}
export function serializeTaskAssignmentResolutionStateField(
  val: TaskAssignmentResolutionStateField,
): SerializedData {
  return val;
}
export function deserializeTaskAssignmentResolutionStateField(
  val: SerializedData,
): TaskAssignmentResolutionStateField {
  if (val == 'completed') {
    return val;
  }
  if (val == 'incomplete') {
    return val;
  }
  if (val == 'approved') {
    return val;
  }
  if (val == 'rejected') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TaskAssignmentResolutionStateField",
  });
}
export function serializeTaskAssignment(val: TaskAssignment): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTaskAssignmentTypeField(val.type),
    ['item']: val.item == void 0 ? val.item : serializeFileMini(val.item),
    ['assigned_to']:
      val.assignedTo == void 0
        ? val.assignedTo
        : serializeUserMini(val.assignedTo),
    ['message']: val.message,
    ['completed_at']:
      val.completedAt == void 0
        ? val.completedAt
        : serializeDateTime(val.completedAt),
    ['assigned_at']:
      val.assignedAt == void 0
        ? val.assignedAt
        : serializeDateTime(val.assignedAt),
    ['reminded_at']:
      val.remindedAt == void 0
        ? val.remindedAt
        : serializeDateTime(val.remindedAt),
    ['resolution_state']:
      val.resolutionState == void 0
        ? val.resolutionState
        : serializeTaskAssignmentResolutionStateField(val.resolutionState),
    ['assigned_by']:
      val.assignedBy == void 0
        ? val.assignedBy
        : serializeUserMini(val.assignedBy),
  };
}
export function deserializeTaskAssignment(val: SerializedData): TaskAssignment {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "TaskAssignment"' });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "TaskAssignment"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | TaskAssignmentTypeField =
    val.type == void 0 ? void 0 : deserializeTaskAssignmentTypeField(val.type);
  const item: undefined | FileMini =
    val.item == void 0 ? void 0 : deserializeFileMini(val.item);
  const assignedTo: undefined | UserMini =
    val.assigned_to == void 0 ? void 0 : deserializeUserMini(val.assigned_to);
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "message" of type "TaskAssignment"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  if (!(val.completed_at == void 0) && !sdIsString(val.completed_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "completed_at" of type "TaskAssignment"',
    });
  }
  const completedAt: undefined | DateTime =
    val.completed_at == void 0 ? void 0 : deserializeDateTime(val.completed_at);
  if (!(val.assigned_at == void 0) && !sdIsString(val.assigned_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "assigned_at" of type "TaskAssignment"',
    });
  }
  const assignedAt: undefined | DateTime =
    val.assigned_at == void 0 ? void 0 : deserializeDateTime(val.assigned_at);
  if (!(val.reminded_at == void 0) && !sdIsString(val.reminded_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "reminded_at" of type "TaskAssignment"',
    });
  }
  const remindedAt: undefined | DateTime =
    val.reminded_at == void 0 ? void 0 : deserializeDateTime(val.reminded_at);
  const resolutionState: undefined | TaskAssignmentResolutionStateField =
    val.resolution_state == void 0
      ? void 0
      : deserializeTaskAssignmentResolutionStateField(val.resolution_state);
  const assignedBy: undefined | UserMini =
    val.assigned_by == void 0 ? void 0 : deserializeUserMini(val.assigned_by);
  return {
    id: id,
    type: type,
    item: item,
    assignedTo: assignedTo,
    message: message,
    completedAt: completedAt,
    assignedAt: assignedAt,
    remindedAt: remindedAt,
    resolutionState: resolutionState,
    assignedBy: assignedBy,
  } satisfies TaskAssignment;
}

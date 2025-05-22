import { serializeWorkflowMiniTypeField } from './workflowMini.generated.js';
import { deserializeWorkflowMiniTypeField } from './workflowMini.generated.js';
import { serializeWorkflowMini } from './workflowMini.generated.js';
import { deserializeWorkflowMini } from './workflowMini.generated.js';
import { serializeUserBase } from './userBase.generated.js';
import { deserializeUserBase } from './userBase.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { WorkflowMiniTypeField } from './workflowMini.generated.js';
import { WorkflowMini } from './workflowMini.generated.js';
import { UserBase } from './userBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { DateTime } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type WorkflowFlowsTypeField = 'flow';
export type WorkflowFlowsTriggerTypeField = 'trigger';
export type WorkflowFlowsTriggerTriggerTypeField =
  | 'WORKFLOW_MANUAL_START'
  | string;
export type WorkflowFlowsTriggerScopeTypeField = 'trigger_scope';
export type WorkflowFlowsTriggerScopeObjectTypeField = 'folder';
export interface WorkflowFlowsTriggerScopeObjectField {
  /**
   * The type of the object */
  readonly type?: WorkflowFlowsTriggerScopeObjectTypeField;
  /**
   * The id of the object */
  readonly id?: string;
  readonly rawData?: SerializedData;
}
export interface WorkflowFlowsTriggerScopeField {
  /**
   * The trigger scope's resource type */
  readonly type?: WorkflowFlowsTriggerScopeTypeField;
  /**
   * Indicates the path of the condition value to check */
  readonly ref?: string;
  /**
   * The object the `ref` points to */
  readonly object?: WorkflowFlowsTriggerScopeObjectField;
  readonly rawData?: SerializedData;
}
export interface WorkflowFlowsTriggerField {
  /**
   * The trigger's resource type */
  readonly type?: WorkflowFlowsTriggerTypeField;
  /**
   * The type of trigger selected for this flow */
  readonly triggerType?: WorkflowFlowsTriggerTriggerTypeField;
  /**
   * List of trigger scopes */
  readonly scope?: readonly WorkflowFlowsTriggerScopeField[];
  readonly rawData?: SerializedData;
}
export type WorkflowFlowsOutcomesTypeField = 'outcome';
export type WorkflowFlowsOutcomesActionTypeField =
  | 'add_metadata'
  | 'assign_task'
  | 'copy_file'
  | 'copy_folder'
  | 'create_folder'
  | 'delete_file'
  | 'delete_folder'
  | 'lock_file'
  | 'move_file'
  | 'move_folder'
  | 'remove_watermark_file'
  | 'rename_folder'
  | 'restore_folder'
  | 'share_file'
  | 'share_folder'
  | 'unlock_file'
  | 'upload_file'
  | 'wait_for_task'
  | 'watermark_file'
  | 'go_back_to_step'
  | 'apply_file_classification'
  | 'apply_folder_classification'
  | 'send_notification'
  | string;
export type WorkflowFlowsOutcomesIfRejectedTypeField = 'outcome';
export type WorkflowFlowsOutcomesIfRejectedActionTypeField =
  | 'add_metadata'
  | 'assign_task'
  | 'copy_file'
  | 'copy_folder'
  | 'create_folder'
  | 'delete_file'
  | 'delete_folder'
  | 'lock_file'
  | 'move_file'
  | 'move_folder'
  | 'remove_watermark_file'
  | 'rename_folder'
  | 'restore_folder'
  | 'share_file'
  | 'share_folder'
  | 'unlock_file'
  | 'upload_file'
  | 'wait_for_task'
  | 'watermark_file'
  | 'go_back_to_step'
  | 'apply_file_classification'
  | 'apply_folder_classification'
  | 'send_notification'
  | string;
export interface WorkflowFlowsOutcomesIfRejectedField {
  /**
   * The identifier of the outcome */
  readonly id?: string;
  /**
   * The outcomes resource type */
  readonly type?: WorkflowFlowsOutcomesIfRejectedTypeField;
  /**
   * The name of the outcome */
  readonly name?: string;
  readonly actionType?: WorkflowFlowsOutcomesIfRejectedActionTypeField;
  readonly rawData?: SerializedData;
}
export interface WorkflowFlowsOutcomesField {
  /**
   * The identifier of the outcome */
  readonly id?: string;
  /**
   * The outcomes resource type */
  readonly type?: WorkflowFlowsOutcomesTypeField;
  /**
   * The name of the outcome */
  readonly name?: string;
  readonly actionType?: WorkflowFlowsOutcomesActionTypeField;
  /**
   * If `action_type` is `assign_task` and the task is rejected, returns a
   * list of outcomes to complete */
  readonly ifRejected?: readonly WorkflowFlowsOutcomesIfRejectedField[];
  readonly rawData?: SerializedData;
}
export interface WorkflowFlowsField {
  /**
   * The identifier of the flow */
  readonly id?: string;
  /**
   * The flow's resource type */
  readonly type?: WorkflowFlowsTypeField;
  readonly trigger?: WorkflowFlowsTriggerField;
  readonly outcomes?: readonly WorkflowFlowsOutcomesField[];
  /**
   * When this flow was created */
  readonly createdAt?: DateTime;
  readonly createdBy?: UserBase;
  readonly rawData?: SerializedData;
}
export type Workflow = WorkflowMini & {
  /**
   * A list of flows assigned to a workflow. */
  readonly flows?: readonly WorkflowFlowsField[];
};
export function serializeWorkflowFlowsTypeField(
  val: WorkflowFlowsTypeField,
): SerializedData {
  return val;
}
export function deserializeWorkflowFlowsTypeField(
  val: SerializedData,
): WorkflowFlowsTypeField {
  if (val == 'flow') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WorkflowFlowsTypeField",
  });
}
export function serializeWorkflowFlowsTriggerTypeField(
  val: WorkflowFlowsTriggerTypeField,
): SerializedData {
  return val;
}
export function deserializeWorkflowFlowsTriggerTypeField(
  val: SerializedData,
): WorkflowFlowsTriggerTypeField {
  if (val == 'trigger') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WorkflowFlowsTriggerTypeField",
  });
}
export function serializeWorkflowFlowsTriggerTriggerTypeField(
  val: WorkflowFlowsTriggerTriggerTypeField,
): SerializedData {
  return val;
}
export function deserializeWorkflowFlowsTriggerTriggerTypeField(
  val: SerializedData,
): WorkflowFlowsTriggerTriggerTypeField {
  if (val == 'WORKFLOW_MANUAL_START') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WorkflowFlowsTriggerTriggerTypeField",
  });
}
export function serializeWorkflowFlowsTriggerScopeTypeField(
  val: WorkflowFlowsTriggerScopeTypeField,
): SerializedData {
  return val;
}
export function deserializeWorkflowFlowsTriggerScopeTypeField(
  val: SerializedData,
): WorkflowFlowsTriggerScopeTypeField {
  if (val == 'trigger_scope') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WorkflowFlowsTriggerScopeTypeField",
  });
}
export function serializeWorkflowFlowsTriggerScopeObjectTypeField(
  val: WorkflowFlowsTriggerScopeObjectTypeField,
): SerializedData {
  return val;
}
export function deserializeWorkflowFlowsTriggerScopeObjectTypeField(
  val: SerializedData,
): WorkflowFlowsTriggerScopeObjectTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WorkflowFlowsTriggerScopeObjectTypeField",
  });
}
export function serializeWorkflowFlowsTriggerScopeObjectField(
  val: WorkflowFlowsTriggerScopeObjectField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeWorkflowFlowsTriggerScopeObjectTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeWorkflowFlowsTriggerScopeObjectField(
  val: SerializedData,
): WorkflowFlowsTriggerScopeObjectField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WorkflowFlowsTriggerScopeObjectField"',
    });
  }
  const type: undefined | WorkflowFlowsTriggerScopeObjectTypeField =
    val.type == void 0
      ? void 0
      : deserializeWorkflowFlowsTriggerScopeObjectTypeField(val.type);
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "WorkflowFlowsTriggerScopeObjectField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  return { type: type, id: id } satisfies WorkflowFlowsTriggerScopeObjectField;
}
export function serializeWorkflowFlowsTriggerScopeField(
  val: WorkflowFlowsTriggerScopeField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeWorkflowFlowsTriggerScopeTypeField(val.type),
    ['ref']: val.ref,
    ['object']:
      val.object == void 0
        ? val.object
        : serializeWorkflowFlowsTriggerScopeObjectField(val.object),
  };
}
export function deserializeWorkflowFlowsTriggerScopeField(
  val: SerializedData,
): WorkflowFlowsTriggerScopeField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WorkflowFlowsTriggerScopeField"',
    });
  }
  const type: undefined | WorkflowFlowsTriggerScopeTypeField =
    val.type == void 0
      ? void 0
      : deserializeWorkflowFlowsTriggerScopeTypeField(val.type);
  if (!(val.ref == void 0) && !sdIsString(val.ref)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "ref" of type "WorkflowFlowsTriggerScopeField"',
    });
  }
  const ref: undefined | string = val.ref == void 0 ? void 0 : val.ref;
  const object: undefined | WorkflowFlowsTriggerScopeObjectField =
    val.object == void 0
      ? void 0
      : deserializeWorkflowFlowsTriggerScopeObjectField(val.object);
  return {
    type: type,
    ref: ref,
    object: object,
  } satisfies WorkflowFlowsTriggerScopeField;
}
export function serializeWorkflowFlowsTriggerField(
  val: WorkflowFlowsTriggerField,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeWorkflowFlowsTriggerTypeField(val.type),
    ['trigger_type']:
      val.triggerType == void 0
        ? val.triggerType
        : serializeWorkflowFlowsTriggerTriggerTypeField(val.triggerType),
    ['scope']:
      val.scope == void 0
        ? val.scope
        : (val.scope.map(function (
            item: WorkflowFlowsTriggerScopeField,
          ): SerializedData {
            return serializeWorkflowFlowsTriggerScopeField(item);
          }) as readonly any[]),
  };
}
export function deserializeWorkflowFlowsTriggerField(
  val: SerializedData,
): WorkflowFlowsTriggerField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WorkflowFlowsTriggerField"',
    });
  }
  const type: undefined | WorkflowFlowsTriggerTypeField =
    val.type == void 0
      ? void 0
      : deserializeWorkflowFlowsTriggerTypeField(val.type);
  const triggerType: undefined | WorkflowFlowsTriggerTriggerTypeField =
    val.trigger_type == void 0
      ? void 0
      : deserializeWorkflowFlowsTriggerTriggerTypeField(val.trigger_type);
  if (!(val.scope == void 0) && !sdIsList(val.scope)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "scope" of type "WorkflowFlowsTriggerField"',
    });
  }
  const scope: undefined | readonly WorkflowFlowsTriggerScopeField[] =
    val.scope == void 0
      ? void 0
      : sdIsList(val.scope)
        ? (val.scope.map(function (
            itm: SerializedData,
          ): WorkflowFlowsTriggerScopeField {
            return deserializeWorkflowFlowsTriggerScopeField(itm);
          }) as readonly any[])
        : [];
  return {
    type: type,
    triggerType: triggerType,
    scope: scope,
  } satisfies WorkflowFlowsTriggerField;
}
export function serializeWorkflowFlowsOutcomesTypeField(
  val: WorkflowFlowsOutcomesTypeField,
): SerializedData {
  return val;
}
export function deserializeWorkflowFlowsOutcomesTypeField(
  val: SerializedData,
): WorkflowFlowsOutcomesTypeField {
  if (val == 'outcome') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WorkflowFlowsOutcomesTypeField",
  });
}
export function serializeWorkflowFlowsOutcomesActionTypeField(
  val: WorkflowFlowsOutcomesActionTypeField,
): SerializedData {
  return val;
}
export function deserializeWorkflowFlowsOutcomesActionTypeField(
  val: SerializedData,
): WorkflowFlowsOutcomesActionTypeField {
  if (val == 'add_metadata') {
    return val;
  }
  if (val == 'assign_task') {
    return val;
  }
  if (val == 'copy_file') {
    return val;
  }
  if (val == 'copy_folder') {
    return val;
  }
  if (val == 'create_folder') {
    return val;
  }
  if (val == 'delete_file') {
    return val;
  }
  if (val == 'delete_folder') {
    return val;
  }
  if (val == 'lock_file') {
    return val;
  }
  if (val == 'move_file') {
    return val;
  }
  if (val == 'move_folder') {
    return val;
  }
  if (val == 'remove_watermark_file') {
    return val;
  }
  if (val == 'rename_folder') {
    return val;
  }
  if (val == 'restore_folder') {
    return val;
  }
  if (val == 'share_file') {
    return val;
  }
  if (val == 'share_folder') {
    return val;
  }
  if (val == 'unlock_file') {
    return val;
  }
  if (val == 'upload_file') {
    return val;
  }
  if (val == 'wait_for_task') {
    return val;
  }
  if (val == 'watermark_file') {
    return val;
  }
  if (val == 'go_back_to_step') {
    return val;
  }
  if (val == 'apply_file_classification') {
    return val;
  }
  if (val == 'apply_folder_classification') {
    return val;
  }
  if (val == 'send_notification') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WorkflowFlowsOutcomesActionTypeField",
  });
}
export function serializeWorkflowFlowsOutcomesIfRejectedTypeField(
  val: WorkflowFlowsOutcomesIfRejectedTypeField,
): SerializedData {
  return val;
}
export function deserializeWorkflowFlowsOutcomesIfRejectedTypeField(
  val: SerializedData,
): WorkflowFlowsOutcomesIfRejectedTypeField {
  if (val == 'outcome') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WorkflowFlowsOutcomesIfRejectedTypeField",
  });
}
export function serializeWorkflowFlowsOutcomesIfRejectedActionTypeField(
  val: WorkflowFlowsOutcomesIfRejectedActionTypeField,
): SerializedData {
  return val;
}
export function deserializeWorkflowFlowsOutcomesIfRejectedActionTypeField(
  val: SerializedData,
): WorkflowFlowsOutcomesIfRejectedActionTypeField {
  if (val == 'add_metadata') {
    return val;
  }
  if (val == 'assign_task') {
    return val;
  }
  if (val == 'copy_file') {
    return val;
  }
  if (val == 'copy_folder') {
    return val;
  }
  if (val == 'create_folder') {
    return val;
  }
  if (val == 'delete_file') {
    return val;
  }
  if (val == 'delete_folder') {
    return val;
  }
  if (val == 'lock_file') {
    return val;
  }
  if (val == 'move_file') {
    return val;
  }
  if (val == 'move_folder') {
    return val;
  }
  if (val == 'remove_watermark_file') {
    return val;
  }
  if (val == 'rename_folder') {
    return val;
  }
  if (val == 'restore_folder') {
    return val;
  }
  if (val == 'share_file') {
    return val;
  }
  if (val == 'share_folder') {
    return val;
  }
  if (val == 'unlock_file') {
    return val;
  }
  if (val == 'upload_file') {
    return val;
  }
  if (val == 'wait_for_task') {
    return val;
  }
  if (val == 'watermark_file') {
    return val;
  }
  if (val == 'go_back_to_step') {
    return val;
  }
  if (val == 'apply_file_classification') {
    return val;
  }
  if (val == 'apply_folder_classification') {
    return val;
  }
  if (val == 'send_notification') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize WorkflowFlowsOutcomesIfRejectedActionTypeField",
  });
}
export function serializeWorkflowFlowsOutcomesIfRejectedField(
  val: WorkflowFlowsOutcomesIfRejectedField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeWorkflowFlowsOutcomesIfRejectedTypeField(val.type),
    ['name']: val.name,
    ['action_type']:
      val.actionType == void 0
        ? val.actionType
        : serializeWorkflowFlowsOutcomesIfRejectedActionTypeField(
            val.actionType,
          ),
  };
}
export function deserializeWorkflowFlowsOutcomesIfRejectedField(
  val: SerializedData,
): WorkflowFlowsOutcomesIfRejectedField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WorkflowFlowsOutcomesIfRejectedField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "WorkflowFlowsOutcomesIfRejectedField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | WorkflowFlowsOutcomesIfRejectedTypeField =
    val.type == void 0
      ? void 0
      : deserializeWorkflowFlowsOutcomesIfRejectedTypeField(val.type);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "WorkflowFlowsOutcomesIfRejectedField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  const actionType: undefined | WorkflowFlowsOutcomesIfRejectedActionTypeField =
    val.action_type == void 0
      ? void 0
      : deserializeWorkflowFlowsOutcomesIfRejectedActionTypeField(
          val.action_type,
        );
  return {
    id: id,
    type: type,
    name: name,
    actionType: actionType,
  } satisfies WorkflowFlowsOutcomesIfRejectedField;
}
export function serializeWorkflowFlowsOutcomesField(
  val: WorkflowFlowsOutcomesField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeWorkflowFlowsOutcomesTypeField(val.type),
    ['name']: val.name,
    ['action_type']:
      val.actionType == void 0
        ? val.actionType
        : serializeWorkflowFlowsOutcomesActionTypeField(val.actionType),
    ['if_rejected']:
      val.ifRejected == void 0
        ? val.ifRejected
        : (val.ifRejected.map(function (
            item: WorkflowFlowsOutcomesIfRejectedField,
          ): SerializedData {
            return serializeWorkflowFlowsOutcomesIfRejectedField(item);
          }) as readonly any[]),
  };
}
export function deserializeWorkflowFlowsOutcomesField(
  val: SerializedData,
): WorkflowFlowsOutcomesField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WorkflowFlowsOutcomesField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WorkflowFlowsOutcomesField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | WorkflowFlowsOutcomesTypeField =
    val.type == void 0
      ? void 0
      : deserializeWorkflowFlowsOutcomesTypeField(val.type);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "WorkflowFlowsOutcomesField"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  const actionType: undefined | WorkflowFlowsOutcomesActionTypeField =
    val.action_type == void 0
      ? void 0
      : deserializeWorkflowFlowsOutcomesActionTypeField(val.action_type);
  if (!(val.if_rejected == void 0) && !sdIsList(val.if_rejected)) {
    throw new BoxSdkError({
      message:
        'Expecting array for "if_rejected" of type "WorkflowFlowsOutcomesField"',
    });
  }
  const ifRejected:
    | undefined
    | readonly WorkflowFlowsOutcomesIfRejectedField[] =
    val.if_rejected == void 0
      ? void 0
      : sdIsList(val.if_rejected)
        ? (val.if_rejected.map(function (
            itm: SerializedData,
          ): WorkflowFlowsOutcomesIfRejectedField {
            return deserializeWorkflowFlowsOutcomesIfRejectedField(itm);
          }) as readonly any[])
        : [];
  return {
    id: id,
    type: type,
    name: name,
    actionType: actionType,
    ifRejected: ifRejected,
  } satisfies WorkflowFlowsOutcomesField;
}
export function serializeWorkflowFlowsField(
  val: WorkflowFlowsField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeWorkflowFlowsTypeField(val.type),
    ['trigger']:
      val.trigger == void 0
        ? val.trigger
        : serializeWorkflowFlowsTriggerField(val.trigger),
    ['outcomes']:
      val.outcomes == void 0
        ? val.outcomes
        : (val.outcomes.map(function (
            item: WorkflowFlowsOutcomesField,
          ): SerializedData {
            return serializeWorkflowFlowsOutcomesField(item);
          }) as readonly any[]),
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserBase(val.createdBy),
  };
}
export function deserializeWorkflowFlowsField(
  val: SerializedData,
): WorkflowFlowsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "WorkflowFlowsField"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "WorkflowFlowsField"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | WorkflowFlowsTypeField =
    val.type == void 0 ? void 0 : deserializeWorkflowFlowsTypeField(val.type);
  const trigger: undefined | WorkflowFlowsTriggerField =
    val.trigger == void 0
      ? void 0
      : deserializeWorkflowFlowsTriggerField(val.trigger);
  if (!(val.outcomes == void 0) && !sdIsList(val.outcomes)) {
    throw new BoxSdkError({
      message: 'Expecting array for "outcomes" of type "WorkflowFlowsField"',
    });
  }
  const outcomes: undefined | readonly WorkflowFlowsOutcomesField[] =
    val.outcomes == void 0
      ? void 0
      : sdIsList(val.outcomes)
        ? (val.outcomes.map(function (
            itm: SerializedData,
          ): WorkflowFlowsOutcomesField {
            return deserializeWorkflowFlowsOutcomesField(itm);
          }) as readonly any[])
        : [];
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message: 'Expecting string for "created_at" of type "WorkflowFlowsField"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  const createdBy: undefined | UserBase =
    val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
  return {
    id: id,
    type: type,
    trigger: trigger,
    outcomes: outcomes,
    createdAt: createdAt,
    createdBy: createdBy,
  } satisfies WorkflowFlowsField;
}
export function serializeWorkflow(val: Workflow): SerializedData {
  const base: any = serializeWorkflowMini(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Workflow"' });
  }
  return {
    ...base,
    ...{
      ['flows']:
        val.flows == void 0
          ? val.flows
          : (val.flows.map(function (item: WorkflowFlowsField): SerializedData {
              return serializeWorkflowFlowsField(item);
            }) as readonly any[]),
    },
  };
}
export function deserializeWorkflow(val: SerializedData): Workflow {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Workflow"' });
  }
  if (!(val.flows == void 0) && !sdIsList(val.flows)) {
    throw new BoxSdkError({
      message: 'Expecting array for "flows" of type "Workflow"',
    });
  }
  const flows: undefined | readonly WorkflowFlowsField[] =
    val.flows == void 0
      ? void 0
      : sdIsList(val.flows)
        ? (val.flows.map(function (itm: SerializedData): WorkflowFlowsField {
            return deserializeWorkflowFlowsField(itm);
          }) as readonly any[])
        : [];
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "Workflow"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | WorkflowMiniTypeField =
    val.type == void 0 ? void 0 : deserializeWorkflowMiniTypeField(val.type);
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "Workflow"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "Workflow"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.is_enabled == void 0) && !sdIsBoolean(val.is_enabled)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_enabled" of type "Workflow"',
    });
  }
  const isEnabled: undefined | boolean =
    val.is_enabled == void 0 ? void 0 : val.is_enabled;
  return {
    flows: flows,
    id: id,
    type: type,
    name: name,
    description: description,
    isEnabled: isEnabled,
  } satisfies Workflow;
}

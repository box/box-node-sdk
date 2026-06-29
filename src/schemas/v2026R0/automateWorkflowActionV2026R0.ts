import { serializeUserMiniV2026R0 } from './userMiniV2026R0';
import { deserializeUserMiniV2026R0 } from './userMiniV2026R0';
import { serializeAutomateWorkflowReferenceV2026R0 } from './automateWorkflowReferenceV2026R0';
import { deserializeAutomateWorkflowReferenceV2026R0 } from './automateWorkflowReferenceV2026R0';
import { serializeDateTime } from '../../internal/utils';
import { deserializeDateTime } from '../../internal/utils';
import { UserMiniV2026R0 } from './userMiniV2026R0';
import { AutomateWorkflowReferenceV2026R0 } from './automateWorkflowReferenceV2026R0';
import { BoxSdkError } from '../../box/errors';
import { DateTime } from '../../internal/utils';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type AutomateWorkflowActionV2026R0TypeField = 'workflow_action';
export type AutomateWorkflowActionV2026R0ActionTypeField =
  'run_workflow' | string;
export class AutomateWorkflowActionV2026R0 {
  /**
   * The identifier for the Automate action. */
  readonly id!: string;
  /**
   * The object type for this workflow action wrapper. */
  readonly type: AutomateWorkflowActionV2026R0TypeField =
    'workflow_action' as AutomateWorkflowActionV2026R0TypeField;
  /**
   * The type that defines the behavior of this action. */
  readonly actionType: AutomateWorkflowActionV2026R0ActionTypeField =
    'run_workflow' as AutomateWorkflowActionV2026R0ActionTypeField;
  /**
   * A human-readable description of the workflow action. */
  readonly description?: string;
  /**
   * The date and time when the action was created. */
  readonly createdAt?: DateTime;
  /**
   * The date and time when the action was last updated. */
  readonly updatedAt?: DateTime;
  readonly createdBy?: UserMiniV2026R0;
  readonly updatedBy?: UserMiniV2026R0;
  readonly workflow!: AutomateWorkflowReferenceV2026R0;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AutomateWorkflowActionV2026R0, 'type' | 'actionType'> &
      Partial<Pick<AutomateWorkflowActionV2026R0, 'type' | 'actionType'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.actionType !== undefined) {
      this.actionType = fields.actionType;
    }
    if (fields.description !== undefined) {
      this.description = fields.description;
    }
    if (fields.createdAt !== undefined) {
      this.createdAt = fields.createdAt;
    }
    if (fields.updatedAt !== undefined) {
      this.updatedAt = fields.updatedAt;
    }
    if (fields.createdBy !== undefined) {
      this.createdBy = fields.createdBy;
    }
    if (fields.updatedBy !== undefined) {
      this.updatedBy = fields.updatedBy;
    }
    if (fields.workflow !== undefined) {
      this.workflow = fields.workflow;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AutomateWorkflowActionV2026R0Input {
  /**
   * The identifier for the Automate action. */
  readonly id: string;
  /**
   * The object type for this workflow action wrapper. */
  readonly type?: AutomateWorkflowActionV2026R0TypeField;
  /**
   * The type that defines the behavior of this action. */
  readonly actionType?: AutomateWorkflowActionV2026R0ActionTypeField;
  /**
   * A human-readable description of the workflow action. */
  readonly description?: string;
  /**
   * The date and time when the action was created. */
  readonly createdAt?: DateTime;
  /**
   * The date and time when the action was last updated. */
  readonly updatedAt?: DateTime;
  readonly createdBy?: UserMiniV2026R0;
  readonly updatedBy?: UserMiniV2026R0;
  readonly workflow: AutomateWorkflowReferenceV2026R0;
  readonly rawData?: SerializedData;
}
export function serializeAutomateWorkflowActionV2026R0TypeField(
  val: AutomateWorkflowActionV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeAutomateWorkflowActionV2026R0TypeField(
  val: SerializedData,
): AutomateWorkflowActionV2026R0TypeField {
  if (val == 'workflow_action') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AutomateWorkflowActionV2026R0TypeField",
  });
}
export function serializeAutomateWorkflowActionV2026R0ActionTypeField(
  val: AutomateWorkflowActionV2026R0ActionTypeField,
): SerializedData {
  return val;
}
export function deserializeAutomateWorkflowActionV2026R0ActionTypeField(
  val: SerializedData,
): AutomateWorkflowActionV2026R0ActionTypeField {
  if (val == 'run_workflow') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AutomateWorkflowActionV2026R0ActionTypeField",
  });
}
export function serializeAutomateWorkflowActionV2026R0(
  val: AutomateWorkflowActionV2026R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeAutomateWorkflowActionV2026R0TypeField(val.type),
    ['action_type']: serializeAutomateWorkflowActionV2026R0ActionTypeField(
      val.actionType,
    ),
    ['description']: val.description,
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['updated_at']:
      val.updatedAt == void 0
        ? val.updatedAt
        : serializeDateTime(val.updatedAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMiniV2026R0(val.createdBy),
    ['updated_by']:
      val.updatedBy == void 0
        ? val.updatedBy
        : serializeUserMiniV2026R0(val.updatedBy),
    ['workflow']: serializeAutomateWorkflowReferenceV2026R0(val.workflow),
  };
}
export function deserializeAutomateWorkflowActionV2026R0(
  val: SerializedData,
): AutomateWorkflowActionV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AutomateWorkflowActionV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "AutomateWorkflowActionV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "AutomateWorkflowActionV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "AutomateWorkflowActionV2026R0" to be defined',
    });
  }
  const type: AutomateWorkflowActionV2026R0TypeField =
    deserializeAutomateWorkflowActionV2026R0TypeField(val.type);
  if (val.action_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "action_type" of type "AutomateWorkflowActionV2026R0" to be defined',
    });
  }
  const actionType: AutomateWorkflowActionV2026R0ActionTypeField =
    deserializeAutomateWorkflowActionV2026R0ActionTypeField(val.action_type);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AutomateWorkflowActionV2026R0"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "AutomateWorkflowActionV2026R0"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.updated_at == void 0) && !sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "updated_at" of type "AutomateWorkflowActionV2026R0"',
    });
  }
  const updatedAt: undefined | DateTime =
    val.updated_at == void 0 ? void 0 : deserializeDateTime(val.updated_at);
  const createdBy: undefined | UserMiniV2026R0 =
    val.created_by == void 0
      ? void 0
      : deserializeUserMiniV2026R0(val.created_by);
  const updatedBy: undefined | UserMiniV2026R0 =
    val.updated_by == void 0
      ? void 0
      : deserializeUserMiniV2026R0(val.updated_by);
  if (val.workflow == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "workflow" of type "AutomateWorkflowActionV2026R0" to be defined',
    });
  }
  const workflow: AutomateWorkflowReferenceV2026R0 =
    deserializeAutomateWorkflowReferenceV2026R0(val.workflow);
  return {
    id: id,
    type: type,
    actionType: actionType,
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
    createdBy: createdBy,
    updatedBy: updatedBy,
    workflow: workflow,
  } satisfies AutomateWorkflowActionV2026R0;
}
export function serializeAutomateWorkflowActionV2026R0Input(
  val: AutomateWorkflowActionV2026R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAutomateWorkflowActionV2026R0TypeField(val.type),
    ['actionType']:
      val.actionType == void 0
        ? val.actionType
        : serializeAutomateWorkflowActionV2026R0ActionTypeField(val.actionType),
    ['description']: val.description,
    ['created_at']:
      val.createdAt == void 0
        ? val.createdAt
        : serializeDateTime(val.createdAt),
    ['updated_at']:
      val.updatedAt == void 0
        ? val.updatedAt
        : serializeDateTime(val.updatedAt),
    ['created_by']:
      val.createdBy == void 0
        ? val.createdBy
        : serializeUserMiniV2026R0(val.createdBy),
    ['updated_by']:
      val.updatedBy == void 0
        ? val.updatedBy
        : serializeUserMiniV2026R0(val.updatedBy),
    ['workflow']: serializeAutomateWorkflowReferenceV2026R0(val.workflow),
  };
}
export function deserializeAutomateWorkflowActionV2026R0Input(
  val: SerializedData,
): AutomateWorkflowActionV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AutomateWorkflowActionV2026R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "AutomateWorkflowActionV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "AutomateWorkflowActionV2026R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | AutomateWorkflowActionV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeAutomateWorkflowActionV2026R0TypeField(val.type);
  const actionType: undefined | AutomateWorkflowActionV2026R0ActionTypeField =
    val.actionType == void 0
      ? void 0
      : deserializeAutomateWorkflowActionV2026R0ActionTypeField(val.actionType);
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AutomateWorkflowActionV2026R0Input"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  if (!(val.created_at == void 0) && !sdIsString(val.created_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "created_at" of type "AutomateWorkflowActionV2026R0Input"',
    });
  }
  const createdAt: undefined | DateTime =
    val.created_at == void 0 ? void 0 : deserializeDateTime(val.created_at);
  if (!(val.updated_at == void 0) && !sdIsString(val.updated_at)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "updated_at" of type "AutomateWorkflowActionV2026R0Input"',
    });
  }
  const updatedAt: undefined | DateTime =
    val.updated_at == void 0 ? void 0 : deserializeDateTime(val.updated_at);
  const createdBy: undefined | UserMiniV2026R0 =
    val.created_by == void 0
      ? void 0
      : deserializeUserMiniV2026R0(val.created_by);
  const updatedBy: undefined | UserMiniV2026R0 =
    val.updated_by == void 0
      ? void 0
      : deserializeUserMiniV2026R0(val.updated_by);
  if (val.workflow == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "workflow" of type "AutomateWorkflowActionV2026R0Input" to be defined',
    });
  }
  const workflow: AutomateWorkflowReferenceV2026R0 =
    deserializeAutomateWorkflowReferenceV2026R0(val.workflow);
  return {
    id: id,
    type: type,
    actionType: actionType,
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
    createdBy: createdBy,
    updatedBy: updatedBy,
    workflow: workflow,
  } satisfies AutomateWorkflowActionV2026R0Input;
}

import { serializeCollaboratorVariable } from './collaboratorVariable.generated.js';
import { deserializeCollaboratorVariable } from './collaboratorVariable.generated.js';
import { serializeCompletionRuleVariable } from './completionRuleVariable.generated.js';
import { deserializeCompletionRuleVariable } from './completionRuleVariable.generated.js';
import { serializeRoleVariable } from './roleVariable.generated.js';
import { deserializeRoleVariable } from './roleVariable.generated.js';
import { CollaboratorVariable } from './collaboratorVariable.generated.js';
import { CompletionRuleVariable } from './completionRuleVariable.generated.js';
import { RoleVariable } from './roleVariable.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface Outcome {
  /**
   * ID of a specific outcome. */
  readonly id: string;
  readonly collaborators?: CollaboratorVariable;
  readonly completionRule?: CompletionRuleVariable;
  readonly fileCollaboratorRole?: RoleVariable;
  readonly taskCollaborators?: CollaboratorVariable;
  readonly role?: RoleVariable;
  readonly rawData?: SerializedData;
}
export function serializeOutcome(val: Outcome): SerializedData {
  return {
    ['id']: val.id,
    ['collaborators']:
      val.collaborators == void 0
        ? val.collaborators
        : serializeCollaboratorVariable(val.collaborators),
    ['completion_rule']:
      val.completionRule == void 0
        ? val.completionRule
        : serializeCompletionRuleVariable(val.completionRule),
    ['file_collaborator_role']:
      val.fileCollaboratorRole == void 0
        ? val.fileCollaboratorRole
        : serializeRoleVariable(val.fileCollaboratorRole),
    ['task_collaborators']:
      val.taskCollaborators == void 0
        ? val.taskCollaborators
        : serializeCollaboratorVariable(val.taskCollaborators),
    ['role']: val.role == void 0 ? val.role : serializeRoleVariable(val.role),
  };
}
export function deserializeOutcome(val: SerializedData): Outcome {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "Outcome"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "Outcome" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "Outcome"',
    });
  }
  const id: string = val.id;
  const collaborators: undefined | CollaboratorVariable =
    val.collaborators == void 0
      ? void 0
      : deserializeCollaboratorVariable(val.collaborators);
  const completionRule: undefined | CompletionRuleVariable =
    val.completion_rule == void 0
      ? void 0
      : deserializeCompletionRuleVariable(val.completion_rule);
  const fileCollaboratorRole: undefined | RoleVariable =
    val.file_collaborator_role == void 0
      ? void 0
      : deserializeRoleVariable(val.file_collaborator_role);
  const taskCollaborators: undefined | CollaboratorVariable =
    val.task_collaborators == void 0
      ? void 0
      : deserializeCollaboratorVariable(val.task_collaborators);
  const role: undefined | RoleVariable =
    val.role == void 0 ? void 0 : deserializeRoleVariable(val.role);
  return {
    id: id,
    collaborators: collaborators,
    completionRule: completionRule,
    fileCollaboratorRole: fileCollaboratorRole,
    taskCollaborators: taskCollaborators,
    role: role,
  } satisfies Outcome;
}

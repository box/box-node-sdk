import { serializeCollaboratorVariable } from './collaboratorVariable';
import { deserializeCollaboratorVariable } from './collaboratorVariable';
import { serializeCompletionRuleVariable } from './completionRuleVariable';
import { deserializeCompletionRuleVariable } from './completionRuleVariable';
import { serializeRoleVariable } from './roleVariable';
import { deserializeRoleVariable } from './roleVariable';
import { CollaboratorVariable } from './collaboratorVariable';
import { CompletionRuleVariable } from './completionRuleVariable';
import { RoleVariable } from './roleVariable';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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

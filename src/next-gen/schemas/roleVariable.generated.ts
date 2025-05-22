import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type RoleVariableTypeField = 'variable';
export type RoleVariableVariableTypeField = 'collaborator_role' | string;
export type RoleVariableVariableValueField =
  | 'editor'
  | 'viewer'
  | 'previewer'
  | 'uploader'
  | 'previewer uploader'
  | 'viewer uploader'
  | 'co-owner'
  | string;
export class RoleVariable {
  /**
   * Role object type.
   *  */
  readonly type: RoleVariableTypeField = 'variable' as RoleVariableTypeField;
  /**
   * The variable type used
   * by the object.
   *  */
  readonly variableType: RoleVariableVariableTypeField =
    'collaborator_role' as RoleVariableVariableTypeField;
  readonly variableValue!: RoleVariableVariableValueField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<RoleVariable, 'type' | 'variableType'> &
      Partial<Pick<RoleVariable, 'type' | 'variableType'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.variableType !== undefined) {
      this.variableType = fields.variableType;
    }
    if (fields.variableValue !== undefined) {
      this.variableValue = fields.variableValue;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface RoleVariableInput {
  /**
   * Role object type.
   *  */
  readonly type?: RoleVariableTypeField;
  /**
   * The variable type used
   * by the object.
   *  */
  readonly variableType?: RoleVariableVariableTypeField;
  readonly variableValue: RoleVariableVariableValueField;
  readonly rawData?: SerializedData;
}
export function serializeRoleVariableTypeField(
  val: RoleVariableTypeField,
): SerializedData {
  return val;
}
export function deserializeRoleVariableTypeField(
  val: SerializedData,
): RoleVariableTypeField {
  if (val == 'variable') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize RoleVariableTypeField" });
}
export function serializeRoleVariableVariableTypeField(
  val: RoleVariableVariableTypeField,
): SerializedData {
  return val;
}
export function deserializeRoleVariableVariableTypeField(
  val: SerializedData,
): RoleVariableVariableTypeField {
  if (val == 'collaborator_role') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RoleVariableVariableTypeField",
  });
}
export function serializeRoleVariableVariableValueField(
  val: RoleVariableVariableValueField,
): SerializedData {
  return val;
}
export function deserializeRoleVariableVariableValueField(
  val: SerializedData,
): RoleVariableVariableValueField {
  if (val == 'editor') {
    return val;
  }
  if (val == 'viewer') {
    return val;
  }
  if (val == 'previewer') {
    return val;
  }
  if (val == 'uploader') {
    return val;
  }
  if (val == 'previewer uploader') {
    return val;
  }
  if (val == 'viewer uploader') {
    return val;
  }
  if (val == 'co-owner') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RoleVariableVariableValueField",
  });
}
export function serializeRoleVariable(val: RoleVariable): SerializedData {
  return {
    ['type']: serializeRoleVariableTypeField(val.type),
    ['variable_type']: serializeRoleVariableVariableTypeField(val.variableType),
    ['variable_value']: serializeRoleVariableVariableValueField(
      val.variableValue,
    ),
  };
}
export function deserializeRoleVariable(val: SerializedData): RoleVariable {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "RoleVariable"' });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "RoleVariable" to be defined',
    });
  }
  const type: RoleVariableTypeField = deserializeRoleVariableTypeField(
    val.type,
  );
  if (val.variable_type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "variable_type" of type "RoleVariable" to be defined',
    });
  }
  const variableType: RoleVariableVariableTypeField =
    deserializeRoleVariableVariableTypeField(val.variable_type);
  if (val.variable_value == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "variable_value" of type "RoleVariable" to be defined',
    });
  }
  const variableValue: RoleVariableVariableValueField =
    deserializeRoleVariableVariableValueField(val.variable_value);
  return {
    type: type,
    variableType: variableType,
    variableValue: variableValue,
  } satisfies RoleVariable;
}
export function serializeRoleVariableInput(
  val: RoleVariableInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0 ? val.type : serializeRoleVariableTypeField(val.type),
    ['variableType']:
      val.variableType == void 0
        ? val.variableType
        : serializeRoleVariableVariableTypeField(val.variableType),
    ['variable_value']: serializeRoleVariableVariableValueField(
      val.variableValue,
    ),
  };
}
export function deserializeRoleVariableInput(
  val: SerializedData,
): RoleVariableInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RoleVariableInput"',
    });
  }
  const type: undefined | RoleVariableTypeField =
    val.type == void 0 ? void 0 : deserializeRoleVariableTypeField(val.type);
  const variableType: undefined | RoleVariableVariableTypeField =
    val.variableType == void 0
      ? void 0
      : deserializeRoleVariableVariableTypeField(val.variableType);
  if (val.variable_value == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "variable_value" of type "RoleVariableInput" to be defined',
    });
  }
  const variableValue: RoleVariableVariableValueField =
    deserializeRoleVariableVariableValueField(val.variable_value);
  return {
    type: type,
    variableType: variableType,
    variableValue: variableValue,
  } satisfies RoleVariableInput;
}

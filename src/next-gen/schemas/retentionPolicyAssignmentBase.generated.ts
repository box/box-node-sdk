import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type RetentionPolicyAssignmentBaseTypeField =
  'retention_policy_assignment';
export class RetentionPolicyAssignmentBase {
  /**
   * The unique identifier that represents a file version. */
  readonly id!: string;
  /**
   * `retention_policy_assignment` */
  readonly type: RetentionPolicyAssignmentBaseTypeField =
    'retention_policy_assignment' as RetentionPolicyAssignmentBaseTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<RetentionPolicyAssignmentBase, 'type'> &
      Partial<Pick<RetentionPolicyAssignmentBase, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface RetentionPolicyAssignmentBaseInput {
  /**
   * The unique identifier that represents a file version. */
  readonly id: string;
  /**
   * `retention_policy_assignment` */
  readonly type?: RetentionPolicyAssignmentBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeRetentionPolicyAssignmentBaseTypeField(
  val: RetentionPolicyAssignmentBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeRetentionPolicyAssignmentBaseTypeField(
  val: SerializedData,
): RetentionPolicyAssignmentBaseTypeField {
  if (val == 'retention_policy_assignment') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize RetentionPolicyAssignmentBaseTypeField",
  });
}
export function serializeRetentionPolicyAssignmentBase(
  val: RetentionPolicyAssignmentBase,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeRetentionPolicyAssignmentBaseTypeField(val.type),
  };
}
export function deserializeRetentionPolicyAssignmentBase(
  val: SerializedData,
): RetentionPolicyAssignmentBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RetentionPolicyAssignmentBase"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "RetentionPolicyAssignmentBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "RetentionPolicyAssignmentBase"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "RetentionPolicyAssignmentBase" to be defined',
    });
  }
  const type: RetentionPolicyAssignmentBaseTypeField =
    deserializeRetentionPolicyAssignmentBaseTypeField(val.type);
  return { id: id, type: type } satisfies RetentionPolicyAssignmentBase;
}
export function serializeRetentionPolicyAssignmentBaseInput(
  val: RetentionPolicyAssignmentBaseInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeRetentionPolicyAssignmentBaseTypeField(val.type),
  };
}
export function deserializeRetentionPolicyAssignmentBaseInput(
  val: SerializedData,
): RetentionPolicyAssignmentBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "RetentionPolicyAssignmentBaseInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "RetentionPolicyAssignmentBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "RetentionPolicyAssignmentBaseInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | RetentionPolicyAssignmentBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeRetentionPolicyAssignmentBaseTypeField(val.type);
  return { id: id, type: type } satisfies RetentionPolicyAssignmentBaseInput;
}

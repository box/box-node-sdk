import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type LegalHoldPolicyAssignmentBaseTypeField =
  'legal_hold_policy_assignment';
export interface LegalHoldPolicyAssignmentBase {
  /**
   * The unique identifier for this legal hold assignment. */
  readonly id?: string;
  /**
   * The value will always be `legal_hold_policy_assignment`. */
  readonly type?: LegalHoldPolicyAssignmentBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeLegalHoldPolicyAssignmentBaseTypeField(
  val: LegalHoldPolicyAssignmentBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeLegalHoldPolicyAssignmentBaseTypeField(
  val: SerializedData,
): LegalHoldPolicyAssignmentBaseTypeField {
  if (val == 'legal_hold_policy_assignment') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize LegalHoldPolicyAssignmentBaseTypeField",
  });
}
export function serializeLegalHoldPolicyAssignmentBase(
  val: LegalHoldPolicyAssignmentBase,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeLegalHoldPolicyAssignmentBaseTypeField(val.type),
  };
}
export function deserializeLegalHoldPolicyAssignmentBase(
  val: SerializedData,
): LegalHoldPolicyAssignmentBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "LegalHoldPolicyAssignmentBase"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "LegalHoldPolicyAssignmentBase"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  const type: undefined | LegalHoldPolicyAssignmentBaseTypeField =
    val.type == void 0
      ? void 0
      : deserializeLegalHoldPolicyAssignmentBaseTypeField(val.type);
  return { id: id, type: type } satisfies LegalHoldPolicyAssignmentBase;
}

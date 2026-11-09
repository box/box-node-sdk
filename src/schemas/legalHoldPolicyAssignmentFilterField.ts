import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface LegalHoldPolicyAssignmentFilterField {
  /**
   * The ID of the metadata template field to filter on. */
  readonly field: string;
  /**
   * The value of the metadata template field to filter on. */
  readonly value: string;
  readonly rawData?: SerializedData;
}
export function serializeLegalHoldPolicyAssignmentFilterField(
  val: LegalHoldPolicyAssignmentFilterField,
): SerializedData {
  return { ['field']: val.field, ['value']: val.value };
}
export function deserializeLegalHoldPolicyAssignmentFilterField(
  val: SerializedData,
): LegalHoldPolicyAssignmentFilterField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "LegalHoldPolicyAssignmentFilterField"',
    });
  }
  if (val.field == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "field" of type "LegalHoldPolicyAssignmentFilterField" to be defined',
    });
  }
  if (!sdIsString(val.field)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "field" of type "LegalHoldPolicyAssignmentFilterField"',
    });
  }
  const field: string = val.field;
  if (val.value == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "value" of type "LegalHoldPolicyAssignmentFilterField" to be defined',
    });
  }
  if (!sdIsString(val.value)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "value" of type "LegalHoldPolicyAssignmentFilterField"',
    });
  }
  const value: string = val.value;
  return {
    field: field,
    value: value,
  } satisfies LegalHoldPolicyAssignmentFilterField;
}

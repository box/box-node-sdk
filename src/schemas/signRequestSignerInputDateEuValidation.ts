import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputDateEuValidationValidationTypeField =
  | 'date_eu'
  | string;
export interface SignRequestSignerInputDateEuValidation {
  /**
   * Validates that the text input uses the European date format `DD/MM/YYYY`. */
  readonly validationType?: SignRequestSignerInputDateEuValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputDateEuValidationValidationTypeField(
  val: SignRequestSignerInputDateEuValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputDateEuValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputDateEuValidationValidationTypeField {
  if (val == 'date_eu') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputDateEuValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputDateEuValidation(
  val: SignRequestSignerInputDateEuValidation,
): SerializedData {
  return {
    ['validation_type']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputDateEuValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputDateEuValidation(
  val: SerializedData,
): SignRequestSignerInputDateEuValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputDateEuValidation"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputDateEuValidationValidationTypeField =
    val.validation_type == void 0
      ? void 0
      : deserializeSignRequestSignerInputDateEuValidationValidationTypeField(
          val.validation_type,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputDateEuValidation;
}

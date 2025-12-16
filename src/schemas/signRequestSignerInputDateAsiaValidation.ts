import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputDateAsiaValidationValidationTypeField =
  | 'date_asia'
  | string;
export interface SignRequestSignerInputDateAsiaValidation {
  /**
   * Validates that the text input uses the Asian date format `YYYY/MM/DD`. */
  readonly validationType?: SignRequestSignerInputDateAsiaValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputDateAsiaValidationValidationTypeField(
  val: SignRequestSignerInputDateAsiaValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputDateAsiaValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputDateAsiaValidationValidationTypeField {
  if (val == 'date_asia') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputDateAsiaValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputDateAsiaValidation(
  val: SignRequestSignerInputDateAsiaValidation,
): SerializedData {
  return {
    ['validation_type']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputDateAsiaValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputDateAsiaValidation(
  val: SerializedData,
): SignRequestSignerInputDateAsiaValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputDateAsiaValidation"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputDateAsiaValidationValidationTypeField =
    val.validation_type == void 0
      ? void 0
      : deserializeSignRequestSignerInputDateAsiaValidationValidationTypeField(
          val.validation_type,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputDateAsiaValidation;
}

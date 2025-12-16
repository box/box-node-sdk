import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputDateUsValidationValidationTypeField =
  | 'date_us'
  | string;
export interface SignRequestSignerInputDateUsValidation {
  /**
   * Validates that the text input uses the US date format `MM/DD/YYYY`. */
  readonly validationType?: SignRequestSignerInputDateUsValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputDateUsValidationValidationTypeField(
  val: SignRequestSignerInputDateUsValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputDateUsValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputDateUsValidationValidationTypeField {
  if (val == 'date_us') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputDateUsValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputDateUsValidation(
  val: SignRequestSignerInputDateUsValidation,
): SerializedData {
  return {
    ['validation_type']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputDateUsValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputDateUsValidation(
  val: SerializedData,
): SignRequestSignerInputDateUsValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputDateUsValidation"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputDateUsValidationValidationTypeField =
    val.validation_type == void 0
      ? void 0
      : deserializeSignRequestSignerInputDateUsValidationValidationTypeField(
          val.validation_type,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputDateUsValidation;
}

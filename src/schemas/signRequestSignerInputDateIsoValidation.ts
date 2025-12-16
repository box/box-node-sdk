import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputDateIsoValidationValidationTypeField =
  | 'date_iso'
  | string;
export interface SignRequestSignerInputDateIsoValidation {
  /**
   * Validates that the text input uses the ISO date format `YYYY-MM-DD`. */
  readonly validationType?: SignRequestSignerInputDateIsoValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputDateIsoValidationValidationTypeField(
  val: SignRequestSignerInputDateIsoValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputDateIsoValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputDateIsoValidationValidationTypeField {
  if (val == 'date_iso') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputDateIsoValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputDateIsoValidation(
  val: SignRequestSignerInputDateIsoValidation,
): SerializedData {
  return {
    ['validation_type']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputDateIsoValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputDateIsoValidation(
  val: SerializedData,
): SignRequestSignerInputDateIsoValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputDateIsoValidation"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputDateIsoValidationValidationTypeField =
    val.validation_type == void 0
      ? void 0
      : deserializeSignRequestSignerInputDateIsoValidationValidationTypeField(
          val.validation_type,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputDateIsoValidation;
}

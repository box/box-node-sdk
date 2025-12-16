import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputNumberWithCommaValidationValidationTypeField =
  | 'number_with_comma'
  | string;
export interface SignRequestSignerInputNumberWithCommaValidation {
  /**
   * Validates that the text input uses a number format with a comma as the decimal separator (for example, 1,23). */
  readonly validationType?: SignRequestSignerInputNumberWithCommaValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputNumberWithCommaValidationValidationTypeField(
  val: SignRequestSignerInputNumberWithCommaValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputNumberWithCommaValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputNumberWithCommaValidationValidationTypeField {
  if (val == 'number_with_comma') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputNumberWithCommaValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputNumberWithCommaValidation(
  val: SignRequestSignerInputNumberWithCommaValidation,
): SerializedData {
  return {
    ['validation_type']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputNumberWithCommaValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputNumberWithCommaValidation(
  val: SerializedData,
): SignRequestSignerInputNumberWithCommaValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerInputNumberWithCommaValidation"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputNumberWithCommaValidationValidationTypeField =
    val.validation_type == void 0
      ? void 0
      : deserializeSignRequestSignerInputNumberWithCommaValidationValidationTypeField(
          val.validation_type,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputNumberWithCommaValidation;
}

import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputNumberWithPeriodValidationValidationTypeField =
  'number_with_period' | string;
export interface SignRequestSignerInputNumberWithPeriodValidation {
  /**
   * Validates that the text input uses a number format with a period as the decimal separator (for example, 1.23). */
  readonly validationType?: SignRequestSignerInputNumberWithPeriodValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputNumberWithPeriodValidationValidationTypeField(
  val: SignRequestSignerInputNumberWithPeriodValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputNumberWithPeriodValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputNumberWithPeriodValidationValidationTypeField {
  if (val == 'number_with_period') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputNumberWithPeriodValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputNumberWithPeriodValidation(
  val: SignRequestSignerInputNumberWithPeriodValidation,
): SerializedData {
  return {
    ['validation_type']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputNumberWithPeriodValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputNumberWithPeriodValidation(
  val: SerializedData,
): SignRequestSignerInputNumberWithPeriodValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerInputNumberWithPeriodValidation"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputNumberWithPeriodValidationValidationTypeField =
    val.validation_type == void 0
      ? void 0
      : deserializeSignRequestSignerInputNumberWithPeriodValidationValidationTypeField(
          val.validation_type,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputNumberWithPeriodValidation;
}

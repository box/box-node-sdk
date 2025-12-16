import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputCustomValidationValidationTypeField =
  | 'custom'
  | string;
export class SignRequestSignerInputCustomValidation {
  /**
   * Defines the validation format for the text input as custom.
   * A custom regular expression is used for validation. */
  readonly validationType: SignRequestSignerInputCustomValidationValidationTypeField =
    'custom' as SignRequestSignerInputCustomValidationValidationTypeField;
  /**
   * Regular expression used for validation. */
  readonly customRegex?: string | null;
  /**
   * Error message shown if input fails custom regular expression validation. */
  readonly customErrorMessage?: string | null;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SignRequestSignerInputCustomValidation, 'validationType'> &
      Partial<Pick<SignRequestSignerInputCustomValidation, 'validationType'>>,
  ) {
    if (fields.validationType !== undefined) {
      this.validationType = fields.validationType;
    }
    if (fields.customRegex !== undefined) {
      this.customRegex = fields.customRegex;
    }
    if (fields.customErrorMessage !== undefined) {
      this.customErrorMessage = fields.customErrorMessage;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SignRequestSignerInputCustomValidationInput {
  /**
   * Defines the validation format for the text input as custom.
   * A custom regular expression is used for validation. */
  readonly validationType?: SignRequestSignerInputCustomValidationValidationTypeField;
  /**
   * Regular expression used for validation. */
  readonly customRegex?: string | null;
  /**
   * Error message shown if input fails custom regular expression validation. */
  readonly customErrorMessage?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputCustomValidationValidationTypeField(
  val: SignRequestSignerInputCustomValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputCustomValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputCustomValidationValidationTypeField {
  if (val == 'custom') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputCustomValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputCustomValidation(
  val: SignRequestSignerInputCustomValidation,
): SerializedData {
  return {
    ['validation_type']:
      serializeSignRequestSignerInputCustomValidationValidationTypeField(
        val.validationType,
      ),
    ['custom_regex']: val.customRegex,
    ['custom_error_message']: val.customErrorMessage,
  };
}
export function deserializeSignRequestSignerInputCustomValidation(
  val: SerializedData,
): SignRequestSignerInputCustomValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputCustomValidation"',
    });
  }
  if (val.validation_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "validation_type" of type "SignRequestSignerInputCustomValidation" to be defined',
    });
  }
  const validationType: SignRequestSignerInputCustomValidationValidationTypeField =
    deserializeSignRequestSignerInputCustomValidationValidationTypeField(
      val.validation_type,
    );
  if (!(val.custom_regex == void 0) && !sdIsString(val.custom_regex)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_regex" of type "SignRequestSignerInputCustomValidation"',
    });
  }
  const customRegex: undefined | string =
    val.custom_regex == void 0 ? void 0 : val.custom_regex;
  if (
    !(val.custom_error_message == void 0) &&
    !sdIsString(val.custom_error_message)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_error_message" of type "SignRequestSignerInputCustomValidation"',
    });
  }
  const customErrorMessage: undefined | string =
    val.custom_error_message == void 0 ? void 0 : val.custom_error_message;
  return {
    validationType: validationType,
    customRegex: customRegex,
    customErrorMessage: customErrorMessage,
  } satisfies SignRequestSignerInputCustomValidation;
}
export function serializeSignRequestSignerInputCustomValidationInput(
  val: SignRequestSignerInputCustomValidationInput,
): SerializedData {
  return {
    ['validationType']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputCustomValidationValidationTypeField(
            val.validationType,
          ),
    ['custom_regex']: val.customRegex,
    ['custom_error_message']: val.customErrorMessage,
  };
}
export function deserializeSignRequestSignerInputCustomValidationInput(
  val: SerializedData,
): SignRequestSignerInputCustomValidationInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerInputCustomValidationInput"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputCustomValidationValidationTypeField =
    val.validationType == void 0
      ? void 0
      : deserializeSignRequestSignerInputCustomValidationValidationTypeField(
          val.validationType,
        );
  if (!(val.custom_regex == void 0) && !sdIsString(val.custom_regex)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_regex" of type "SignRequestSignerInputCustomValidationInput"',
    });
  }
  const customRegex: undefined | string =
    val.custom_regex == void 0 ? void 0 : val.custom_regex;
  if (
    !(val.custom_error_message == void 0) &&
    !sdIsString(val.custom_error_message)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_error_message" of type "SignRequestSignerInputCustomValidationInput"',
    });
  }
  const customErrorMessage: undefined | string =
    val.custom_error_message == void 0 ? void 0 : val.custom_error_message;
  return {
    validationType: validationType,
    customRegex: customRegex,
    customErrorMessage: customErrorMessage,
  } satisfies SignRequestSignerInputCustomValidationInput;
}

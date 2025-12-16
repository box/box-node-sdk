import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputSsnValidationValidationTypeField =
  | 'ssn'
  | string;
export class SignRequestSignerInputSsnValidation {
  /**
   * Validates that the text input is a Social Security Number (SSN). */
  readonly validationType: SignRequestSignerInputSsnValidationValidationTypeField =
    'ssn' as SignRequestSignerInputSsnValidationValidationTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SignRequestSignerInputSsnValidation, 'validationType'> &
      Partial<Pick<SignRequestSignerInputSsnValidation, 'validationType'>>,
  ) {
    if (fields.validationType !== undefined) {
      this.validationType = fields.validationType;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SignRequestSignerInputSsnValidationInput {
  /**
   * Validates that the text input is a Social Security Number (SSN). */
  readonly validationType?: SignRequestSignerInputSsnValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputSsnValidationValidationTypeField(
  val: SignRequestSignerInputSsnValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputSsnValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputSsnValidationValidationTypeField {
  if (val == 'ssn') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputSsnValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputSsnValidation(
  val: SignRequestSignerInputSsnValidation,
): SerializedData {
  return {
    ['validation_type']:
      serializeSignRequestSignerInputSsnValidationValidationTypeField(
        val.validationType,
      ),
  };
}
export function deserializeSignRequestSignerInputSsnValidation(
  val: SerializedData,
): SignRequestSignerInputSsnValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputSsnValidation"',
    });
  }
  if (val.validation_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "validation_type" of type "SignRequestSignerInputSsnValidation" to be defined',
    });
  }
  const validationType: SignRequestSignerInputSsnValidationValidationTypeField =
    deserializeSignRequestSignerInputSsnValidationValidationTypeField(
      val.validation_type,
    );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputSsnValidation;
}
export function serializeSignRequestSignerInputSsnValidationInput(
  val: SignRequestSignerInputSsnValidationInput,
): SerializedData {
  return {
    ['validationType']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputSsnValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputSsnValidationInput(
  val: SerializedData,
): SignRequestSignerInputSsnValidationInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputSsnValidationInput"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputSsnValidationValidationTypeField =
    val.validationType == void 0
      ? void 0
      : deserializeSignRequestSignerInputSsnValidationValidationTypeField(
          val.validationType,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputSsnValidationInput;
}

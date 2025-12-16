import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputEmailValidationValidationTypeField =
  | 'email'
  | string;
export class SignRequestSignerInputEmailValidation {
  /**
   * Validates that the text input is an email address. */
  readonly validationType: SignRequestSignerInputEmailValidationValidationTypeField =
    'email' as SignRequestSignerInputEmailValidationValidationTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SignRequestSignerInputEmailValidation, 'validationType'> &
      Partial<Pick<SignRequestSignerInputEmailValidation, 'validationType'>>,
  ) {
    if (fields.validationType !== undefined) {
      this.validationType = fields.validationType;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SignRequestSignerInputEmailValidationInput {
  /**
   * Validates that the text input is an email address. */
  readonly validationType?: SignRequestSignerInputEmailValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputEmailValidationValidationTypeField(
  val: SignRequestSignerInputEmailValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputEmailValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputEmailValidationValidationTypeField {
  if (val == 'email') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputEmailValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputEmailValidation(
  val: SignRequestSignerInputEmailValidation,
): SerializedData {
  return {
    ['validation_type']:
      serializeSignRequestSignerInputEmailValidationValidationTypeField(
        val.validationType,
      ),
  };
}
export function deserializeSignRequestSignerInputEmailValidation(
  val: SerializedData,
): SignRequestSignerInputEmailValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputEmailValidation"',
    });
  }
  if (val.validation_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "validation_type" of type "SignRequestSignerInputEmailValidation" to be defined',
    });
  }
  const validationType: SignRequestSignerInputEmailValidationValidationTypeField =
    deserializeSignRequestSignerInputEmailValidationValidationTypeField(
      val.validation_type,
    );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputEmailValidation;
}
export function serializeSignRequestSignerInputEmailValidationInput(
  val: SignRequestSignerInputEmailValidationInput,
): SerializedData {
  return {
    ['validationType']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputEmailValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputEmailValidationInput(
  val: SerializedData,
): SignRequestSignerInputEmailValidationInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerInputEmailValidationInput"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputEmailValidationValidationTypeField =
    val.validationType == void 0
      ? void 0
      : deserializeSignRequestSignerInputEmailValidationValidationTypeField(
          val.validationType,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputEmailValidationInput;
}

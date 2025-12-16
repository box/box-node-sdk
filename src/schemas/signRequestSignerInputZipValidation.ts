import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputZipValidationValidationTypeField =
  | 'zip'
  | string;
export class SignRequestSignerInputZipValidation {
  /**
   * Validates that the text input is a ZIP code. */
  readonly validationType: SignRequestSignerInputZipValidationValidationTypeField =
    'zip' as SignRequestSignerInputZipValidationValidationTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SignRequestSignerInputZipValidation, 'validationType'> &
      Partial<Pick<SignRequestSignerInputZipValidation, 'validationType'>>,
  ) {
    if (fields.validationType !== undefined) {
      this.validationType = fields.validationType;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SignRequestSignerInputZipValidationInput {
  /**
   * Validates that the text input is a ZIP code. */
  readonly validationType?: SignRequestSignerInputZipValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputZipValidationValidationTypeField(
  val: SignRequestSignerInputZipValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputZipValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputZipValidationValidationTypeField {
  if (val == 'zip') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputZipValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputZipValidation(
  val: SignRequestSignerInputZipValidation,
): SerializedData {
  return {
    ['validation_type']:
      serializeSignRequestSignerInputZipValidationValidationTypeField(
        val.validationType,
      ),
  };
}
export function deserializeSignRequestSignerInputZipValidation(
  val: SerializedData,
): SignRequestSignerInputZipValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputZipValidation"',
    });
  }
  if (val.validation_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "validation_type" of type "SignRequestSignerInputZipValidation" to be defined',
    });
  }
  const validationType: SignRequestSignerInputZipValidationValidationTypeField =
    deserializeSignRequestSignerInputZipValidationValidationTypeField(
      val.validation_type,
    );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputZipValidation;
}
export function serializeSignRequestSignerInputZipValidationInput(
  val: SignRequestSignerInputZipValidationInput,
): SerializedData {
  return {
    ['validationType']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputZipValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputZipValidationInput(
  val: SerializedData,
): SignRequestSignerInputZipValidationInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputZipValidationInput"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputZipValidationValidationTypeField =
    val.validationType == void 0
      ? void 0
      : deserializeSignRequestSignerInputZipValidationValidationTypeField(
          val.validationType,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputZipValidationInput;
}

import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputZipjpValidationValidationTypeField =
  'zip_jp' | string;
export class SignRequestSignerInputZipjpValidation {
  /**
   * Validates that the text input is a Japanese ZIP code. */
  readonly validationType: SignRequestSignerInputZipjpValidationValidationTypeField =
    'zip_jp' as SignRequestSignerInputZipjpValidationValidationTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SignRequestSignerInputZipjpValidation, 'validationType'> &
      Partial<Pick<SignRequestSignerInputZipjpValidation, 'validationType'>>,
  ) {
    if (fields.validationType !== undefined) {
      this.validationType = fields.validationType;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SignRequestSignerInputZipjpValidationInput {
  /**
   * Validates that the text input is a Japanese ZIP code. */
  readonly validationType?: SignRequestSignerInputZipjpValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputZipjpValidationValidationTypeField(
  val: SignRequestSignerInputZipjpValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputZipjpValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputZipjpValidationValidationTypeField {
  if (val == 'zip_jp') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputZipjpValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputZipjpValidation(
  val: SignRequestSignerInputZipjpValidation,
): SerializedData {
  return {
    ['validation_type']:
      serializeSignRequestSignerInputZipjpValidationValidationTypeField(
        val.validationType,
      ),
  };
}
export function deserializeSignRequestSignerInputZipjpValidation(
  val: SerializedData,
): SignRequestSignerInputZipjpValidation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputZipjpValidation"',
    });
  }
  if (val.validation_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "validation_type" of type "SignRequestSignerInputZipjpValidation" to be defined',
    });
  }
  const validationType: SignRequestSignerInputZipjpValidationValidationTypeField =
    deserializeSignRequestSignerInputZipjpValidationValidationTypeField(
      val.validation_type,
    );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputZipjpValidation;
}
export function serializeSignRequestSignerInputZipjpValidationInput(
  val: SignRequestSignerInputZipjpValidationInput,
): SerializedData {
  return {
    ['validationType']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputZipjpValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputZipjpValidationInput(
  val: SerializedData,
): SignRequestSignerInputZipjpValidationInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerInputZipjpValidationInput"',
    });
  }
  const validationType:
    undefined | SignRequestSignerInputZipjpValidationValidationTypeField =
    val.validationType == void 0
      ? void 0
      : deserializeSignRequestSignerInputZipjpValidationValidationTypeField(
          val.validationType,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputZipjpValidationInput;
}

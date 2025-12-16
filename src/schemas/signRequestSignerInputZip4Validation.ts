import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerInputZip4ValidationValidationTypeField =
  | 'zip_4'
  | string;
export class SignRequestSignerInputZip4Validation {
  /**
   * Validates that the text input is a ZIP+4 code. */
  readonly validationType: SignRequestSignerInputZip4ValidationValidationTypeField =
    'zip_4' as SignRequestSignerInputZip4ValidationValidationTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SignRequestSignerInputZip4Validation, 'validationType'> &
      Partial<Pick<SignRequestSignerInputZip4Validation, 'validationType'>>,
  ) {
    if (fields.validationType !== undefined) {
      this.validationType = fields.validationType;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SignRequestSignerInputZip4ValidationInput {
  /**
   * Validates that the text input is a ZIP+4 code. */
  readonly validationType?: SignRequestSignerInputZip4ValidationValidationTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerInputZip4ValidationValidationTypeField(
  val: SignRequestSignerInputZip4ValidationValidationTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerInputZip4ValidationValidationTypeField(
  val: SerializedData,
): SignRequestSignerInputZip4ValidationValidationTypeField {
  if (val == 'zip_4') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerInputZip4ValidationValidationTypeField",
  });
}
export function serializeSignRequestSignerInputZip4Validation(
  val: SignRequestSignerInputZip4Validation,
): SerializedData {
  return {
    ['validation_type']:
      serializeSignRequestSignerInputZip4ValidationValidationTypeField(
        val.validationType,
      ),
  };
}
export function deserializeSignRequestSignerInputZip4Validation(
  val: SerializedData,
): SignRequestSignerInputZip4Validation {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerInputZip4Validation"',
    });
  }
  if (val.validation_type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "validation_type" of type "SignRequestSignerInputZip4Validation" to be defined',
    });
  }
  const validationType: SignRequestSignerInputZip4ValidationValidationTypeField =
    deserializeSignRequestSignerInputZip4ValidationValidationTypeField(
      val.validation_type,
    );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputZip4Validation;
}
export function serializeSignRequestSignerInputZip4ValidationInput(
  val: SignRequestSignerInputZip4ValidationInput,
): SerializedData {
  return {
    ['validationType']:
      val.validationType == void 0
        ? val.validationType
        : serializeSignRequestSignerInputZip4ValidationValidationTypeField(
            val.validationType,
          ),
  };
}
export function deserializeSignRequestSignerInputZip4ValidationInput(
  val: SerializedData,
): SignRequestSignerInputZip4ValidationInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerInputZip4ValidationInput"',
    });
  }
  const validationType:
    | undefined
    | SignRequestSignerInputZip4ValidationValidationTypeField =
    val.validationType == void 0
      ? void 0
      : deserializeSignRequestSignerInputZip4ValidationValidationTypeField(
          val.validationType,
        );
  return {
    validationType: validationType,
  } satisfies SignRequestSignerInputZip4ValidationInput;
}

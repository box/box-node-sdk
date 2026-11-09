import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerVerificationMethodPhoneSmsTypeField = 'phone';
export class SignRequestSignerVerificationMethodPhoneSms {
  /**
   * The type of verification method. */
  readonly type: SignRequestSignerVerificationMethodPhoneSmsTypeField =
    'phone' as SignRequestSignerVerificationMethodPhoneSmsTypeField;
  /**
   * The phone number to where the message will be sent. */
  readonly phoneNumber!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SignRequestSignerVerificationMethodPhoneSms, 'type'> &
      Partial<Pick<SignRequestSignerVerificationMethodPhoneSms, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.phoneNumber !== undefined) {
      this.phoneNumber = fields.phoneNumber;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SignRequestSignerVerificationMethodPhoneSmsInput {
  /**
   * The type of verification method. */
  readonly type?: SignRequestSignerVerificationMethodPhoneSmsTypeField;
  /**
   * The phone number to where the message will be sent. */
  readonly phoneNumber: string;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerVerificationMethodPhoneSmsTypeField(
  val: SignRequestSignerVerificationMethodPhoneSmsTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerVerificationMethodPhoneSmsTypeField(
  val: SerializedData,
): SignRequestSignerVerificationMethodPhoneSmsTypeField {
  if (val == 'phone') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerVerificationMethodPhoneSmsTypeField",
  });
}
export function serializeSignRequestSignerVerificationMethodPhoneSms(
  val: SignRequestSignerVerificationMethodPhoneSms,
): SerializedData {
  return {
    ['type']: serializeSignRequestSignerVerificationMethodPhoneSmsTypeField(
      val.type,
    ),
    ['phone_number']: val.phoneNumber,
  };
}
export function deserializeSignRequestSignerVerificationMethodPhoneSms(
  val: SerializedData,
): SignRequestSignerVerificationMethodPhoneSms {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerVerificationMethodPhoneSms"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "SignRequestSignerVerificationMethodPhoneSms" to be defined',
    });
  }
  const type: SignRequestSignerVerificationMethodPhoneSmsTypeField =
    deserializeSignRequestSignerVerificationMethodPhoneSmsTypeField(val.type);
  if (val.phone_number == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "phone_number" of type "SignRequestSignerVerificationMethodPhoneSms" to be defined',
    });
  }
  if (!sdIsString(val.phone_number)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "phone_number" of type "SignRequestSignerVerificationMethodPhoneSms"',
    });
  }
  const phoneNumber: string = val.phone_number;
  return {
    type: type,
    phoneNumber: phoneNumber,
  } satisfies SignRequestSignerVerificationMethodPhoneSms;
}
export function serializeSignRequestSignerVerificationMethodPhoneSmsInput(
  val: SignRequestSignerVerificationMethodPhoneSmsInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeSignRequestSignerVerificationMethodPhoneSmsTypeField(
            val.type,
          ),
    ['phone_number']: val.phoneNumber,
  };
}
export function deserializeSignRequestSignerVerificationMethodPhoneSmsInput(
  val: SerializedData,
): SignRequestSignerVerificationMethodPhoneSmsInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerVerificationMethodPhoneSmsInput"',
    });
  }
  const type: undefined | SignRequestSignerVerificationMethodPhoneSmsTypeField =
    val.type == void 0
      ? void 0
      : deserializeSignRequestSignerVerificationMethodPhoneSmsTypeField(
          val.type,
        );
  if (val.phone_number == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "phone_number" of type "SignRequestSignerVerificationMethodPhoneSmsInput" to be defined',
    });
  }
  if (!sdIsString(val.phone_number)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "phone_number" of type "SignRequestSignerVerificationMethodPhoneSmsInput"',
    });
  }
  const phoneNumber: string = val.phone_number;
  return {
    type: type,
    phoneNumber: phoneNumber,
  } satisfies SignRequestSignerVerificationMethodPhoneSmsInput;
}

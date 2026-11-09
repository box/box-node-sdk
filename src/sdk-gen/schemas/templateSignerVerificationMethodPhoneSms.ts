import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type TemplateSignerVerificationMethodPhoneSmsTypeField = 'phone';
export class TemplateSignerVerificationMethodPhoneSms {
  /**
   * The type of verification method. */
  readonly type: TemplateSignerVerificationMethodPhoneSmsTypeField =
    'phone' as TemplateSignerVerificationMethodPhoneSmsTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TemplateSignerVerificationMethodPhoneSms, 'type'> &
      Partial<Pick<TemplateSignerVerificationMethodPhoneSms, 'type'>>
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface TemplateSignerVerificationMethodPhoneSmsInput {
  /**
   * The type of verification method. */
  readonly type?: TemplateSignerVerificationMethodPhoneSmsTypeField;
  readonly rawData?: SerializedData;
}
export function serializeTemplateSignerVerificationMethodPhoneSmsTypeField(
  val: TemplateSignerVerificationMethodPhoneSmsTypeField
): SerializedData {
  return val;
}
export function deserializeTemplateSignerVerificationMethodPhoneSmsTypeField(
  val: SerializedData
): TemplateSignerVerificationMethodPhoneSmsTypeField {
  if (val == 'phone') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize TemplateSignerVerificationMethodPhoneSmsTypeField",
  });
}
export function serializeTemplateSignerVerificationMethodPhoneSms(
  val: TemplateSignerVerificationMethodPhoneSms
): SerializedData {
  return {
    ['type']: serializeTemplateSignerVerificationMethodPhoneSmsTypeField(
      val.type
    ),
  };
}
export function deserializeTemplateSignerVerificationMethodPhoneSms(
  val: SerializedData
): TemplateSignerVerificationMethodPhoneSms {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TemplateSignerVerificationMethodPhoneSms"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "TemplateSignerVerificationMethodPhoneSms" to be defined',
    });
  }
  const type: TemplateSignerVerificationMethodPhoneSmsTypeField =
    deserializeTemplateSignerVerificationMethodPhoneSmsTypeField(val.type);
  return { type: type } satisfies TemplateSignerVerificationMethodPhoneSms;
}
export function serializeTemplateSignerVerificationMethodPhoneSmsInput(
  val: TemplateSignerVerificationMethodPhoneSmsInput
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTemplateSignerVerificationMethodPhoneSmsTypeField(val.type),
  };
}
export function deserializeTemplateSignerVerificationMethodPhoneSmsInput(
  val: SerializedData
): TemplateSignerVerificationMethodPhoneSmsInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "TemplateSignerVerificationMethodPhoneSmsInput"',
    });
  }
  const type: undefined | TemplateSignerVerificationMethodPhoneSmsTypeField =
    val.type == void 0
      ? void 0
      : deserializeTemplateSignerVerificationMethodPhoneSmsTypeField(val.type);
  return { type: type } satisfies TemplateSignerVerificationMethodPhoneSmsInput;
}

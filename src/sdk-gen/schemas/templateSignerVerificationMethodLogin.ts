import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type TemplateSignerVerificationMethodLoginTypeField = 'login';
export class TemplateSignerVerificationMethodLogin {
  /**
   * The type of verification method. */
  readonly type: TemplateSignerVerificationMethodLoginTypeField =
    'login' as TemplateSignerVerificationMethodLoginTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<TemplateSignerVerificationMethodLogin, 'type'> &
      Partial<Pick<TemplateSignerVerificationMethodLogin, 'type'>>
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface TemplateSignerVerificationMethodLoginInput {
  /**
   * The type of verification method. */
  readonly type?: TemplateSignerVerificationMethodLoginTypeField;
  readonly rawData?: SerializedData;
}
export function serializeTemplateSignerVerificationMethodLoginTypeField(
  val: TemplateSignerVerificationMethodLoginTypeField
): SerializedData {
  return val;
}
export function deserializeTemplateSignerVerificationMethodLoginTypeField(
  val: SerializedData
): TemplateSignerVerificationMethodLoginTypeField {
  if (val == 'login') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize TemplateSignerVerificationMethodLoginTypeField",
  });
}
export function serializeTemplateSignerVerificationMethodLogin(
  val: TemplateSignerVerificationMethodLogin
): SerializedData {
  return {
    ['type']: serializeTemplateSignerVerificationMethodLoginTypeField(val.type),
  };
}
export function deserializeTemplateSignerVerificationMethodLogin(
  val: SerializedData
): TemplateSignerVerificationMethodLogin {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TemplateSignerVerificationMethodLogin"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "TemplateSignerVerificationMethodLogin" to be defined',
    });
  }
  const type: TemplateSignerVerificationMethodLoginTypeField =
    deserializeTemplateSignerVerificationMethodLoginTypeField(val.type);
  return { type: type } satisfies TemplateSignerVerificationMethodLogin;
}
export function serializeTemplateSignerVerificationMethodLoginInput(
  val: TemplateSignerVerificationMethodLoginInput
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeTemplateSignerVerificationMethodLoginTypeField(val.type),
  };
}
export function deserializeTemplateSignerVerificationMethodLoginInput(
  val: SerializedData
): TemplateSignerVerificationMethodLoginInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "TemplateSignerVerificationMethodLoginInput"',
    });
  }
  const type: undefined | TemplateSignerVerificationMethodLoginTypeField =
    val.type == void 0
      ? void 0
      : deserializeTemplateSignerVerificationMethodLoginTypeField(val.type);
  return { type: type } satisfies TemplateSignerVerificationMethodLoginInput;
}

import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerVerificationMethodLoginTypeField = 'login';
export class SignRequestSignerVerificationMethodLogin {
  /**
   * The type of verification method. */
  readonly type: SignRequestSignerVerificationMethodLoginTypeField =
    'login' as SignRequestSignerVerificationMethodLoginTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<SignRequestSignerVerificationMethodLogin, 'type'> &
      Partial<Pick<SignRequestSignerVerificationMethodLogin, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface SignRequestSignerVerificationMethodLoginInput {
  /**
   * The type of verification method. */
  readonly type?: SignRequestSignerVerificationMethodLoginTypeField;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestSignerVerificationMethodLoginTypeField(
  val: SignRequestSignerVerificationMethodLoginTypeField,
): SerializedData {
  return val;
}
export function deserializeSignRequestSignerVerificationMethodLoginTypeField(
  val: SerializedData,
): SignRequestSignerVerificationMethodLoginTypeField {
  if (val == 'login') {
    return val;
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize SignRequestSignerVerificationMethodLoginTypeField",
  });
}
export function serializeSignRequestSignerVerificationMethodLogin(
  val: SignRequestSignerVerificationMethodLogin,
): SerializedData {
  return {
    ['type']: serializeSignRequestSignerVerificationMethodLoginTypeField(
      val.type,
    ),
  };
}
export function deserializeSignRequestSignerVerificationMethodLogin(
  val: SerializedData,
): SignRequestSignerVerificationMethodLogin {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerVerificationMethodLogin"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "SignRequestSignerVerificationMethodLogin" to be defined',
    });
  }
  const type: SignRequestSignerVerificationMethodLoginTypeField =
    deserializeSignRequestSignerVerificationMethodLoginTypeField(val.type);
  return { type: type } satisfies SignRequestSignerVerificationMethodLogin;
}
export function serializeSignRequestSignerVerificationMethodLoginInput(
  val: SignRequestSignerVerificationMethodLoginInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeSignRequestSignerVerificationMethodLoginTypeField(val.type),
  };
}
export function deserializeSignRequestSignerVerificationMethodLoginInput(
  val: SerializedData,
): SignRequestSignerVerificationMethodLoginInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "SignRequestSignerVerificationMethodLoginInput"',
    });
  }
  const type: undefined | SignRequestSignerVerificationMethodLoginTypeField =
    val.type == void 0
      ? void 0
      : deserializeSignRequestSignerVerificationMethodLoginTypeField(val.type);
  return { type: type } satisfies SignRequestSignerVerificationMethodLoginInput;
}

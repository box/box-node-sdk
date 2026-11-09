import { serializeTemplateSignerVerificationMethodLogin } from './templateSignerVerificationMethodLogin';
import { deserializeTemplateSignerVerificationMethodLogin } from './templateSignerVerificationMethodLogin';
import { serializeTemplateSignerVerificationMethodPhoneSms } from './templateSignerVerificationMethodPhoneSms';
import { deserializeTemplateSignerVerificationMethodPhoneSms } from './templateSignerVerificationMethodPhoneSms';
import { serializeTemplateSignerVerificationMethodCacPiv } from './templateSignerVerificationMethodCacPiv';
import { deserializeTemplateSignerVerificationMethodCacPiv } from './templateSignerVerificationMethodCacPiv';
import { TemplateSignerVerificationMethodLogin } from './templateSignerVerificationMethodLogin';
import { TemplateSignerVerificationMethodPhoneSms } from './templateSignerVerificationMethodPhoneSms';
import { TemplateSignerVerificationMethodCacPiv } from './templateSignerVerificationMethodCacPiv';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type TemplateSignerVerificationMethod =
  | TemplateSignerVerificationMethodLogin
  | TemplateSignerVerificationMethodPhoneSms
  | TemplateSignerVerificationMethodCacPiv;
export function serializeTemplateSignerVerificationMethod(
  val: any
): SerializedData {
  if (val.type == 'login') {
    return serializeTemplateSignerVerificationMethodLogin(val);
  }
  if (val.type == 'phone') {
    return serializeTemplateSignerVerificationMethodPhoneSms(val);
  }
  if (val.type == 'cac_piv') {
    return serializeTemplateSignerVerificationMethodCacPiv(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeTemplateSignerVerificationMethod(
  val: SerializedData
): TemplateSignerVerificationMethod {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "TemplateSignerVerificationMethod"',
    });
  }
  if (val.type == 'login') {
    return deserializeTemplateSignerVerificationMethodLogin(val);
  }
  if (val.type == 'phone') {
    return deserializeTemplateSignerVerificationMethodPhoneSms(val);
  }
  if (val.type == 'cac_piv') {
    return deserializeTemplateSignerVerificationMethodCacPiv(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize TemplateSignerVerificationMethod",
  });
}

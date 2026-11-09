import { serializeSignRequestSignerVerificationMethodLogin } from './signRequestSignerVerificationMethodLogin';
import { deserializeSignRequestSignerVerificationMethodLogin } from './signRequestSignerVerificationMethodLogin';
import { serializeSignRequestSignerVerificationMethodPhoneSms } from './signRequestSignerVerificationMethodPhoneSms';
import { deserializeSignRequestSignerVerificationMethodPhoneSms } from './signRequestSignerVerificationMethodPhoneSms';
import { serializeSignRequestSignerVerificationMethodCacPiv } from './signRequestSignerVerificationMethodCacPiv';
import { deserializeSignRequestSignerVerificationMethodCacPiv } from './signRequestSignerVerificationMethodCacPiv';
import { SignRequestSignerVerificationMethodLogin } from './signRequestSignerVerificationMethodLogin';
import { SignRequestSignerVerificationMethodPhoneSms } from './signRequestSignerVerificationMethodPhoneSms';
import { SignRequestSignerVerificationMethodCacPiv } from './signRequestSignerVerificationMethodCacPiv';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type SignRequestSignerVerificationMethod =
  | SignRequestSignerVerificationMethodLogin
  | SignRequestSignerVerificationMethodPhoneSms
  | SignRequestSignerVerificationMethodCacPiv;
export function serializeSignRequestSignerVerificationMethod(
  val: any
): SerializedData {
  if (val.type == 'login') {
    return serializeSignRequestSignerVerificationMethodLogin(val);
  }
  if (val.type == 'phone') {
    return serializeSignRequestSignerVerificationMethodPhoneSms(val);
  }
  if (val.type == 'cac_piv') {
    return serializeSignRequestSignerVerificationMethodCacPiv(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeSignRequestSignerVerificationMethod(
  val: SerializedData
): SignRequestSignerVerificationMethod {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestSignerVerificationMethod"',
    });
  }
  if (val.type == 'login') {
    return deserializeSignRequestSignerVerificationMethodLogin(val);
  }
  if (val.type == 'phone') {
    return deserializeSignRequestSignerVerificationMethodPhoneSms(val);
  }
  if (val.type == 'cac_piv') {
    return deserializeSignRequestSignerVerificationMethodCacPiv(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize SignRequestSignerVerificationMethod",
  });
}

import { serializeUserBaseTypeField } from './userBase.generated.js';
import { deserializeUserBaseTypeField } from './userBase.generated.js';
import { serializeUserBase } from './userBase.generated.js';
import { deserializeUserBase } from './userBase.generated.js';
import { UserBaseTypeField } from './userBase.generated.js';
import { UserBase } from './userBase.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export class UserMini extends UserBase {
  readonly name?: string;
  readonly login?: string;
  constructor(fields: UserMini) {
    super(fields);
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.login !== undefined) {
      this.login = fields.login;
    }
  }
}
export function serializeUserMini(val: UserMini): SerializedData {
  const base: any = serializeUserBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UserMini"' });
  }
  return { ...base, ...{ ['name']: val.name, ['login']: val.login } };
}
export function deserializeUserMini(val: SerializedData): UserMini {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UserMini"' });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "UserMini"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message: 'Expecting string for "login" of type "UserMini"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserMini" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserMini"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "UserMini" to be defined',
    });
  }
  const type: UserBaseTypeField = deserializeUserBaseTypeField(val.type);
  return { name: name, login: login, id: id, type: type } satisfies UserMini;
}

import { serializeUserBaseTypeField } from './userBase';
import { deserializeUserBaseTypeField } from './userBase';
import { serializeUserBase } from './userBase';
import { deserializeUserBase } from './userBase';
import { UserBaseTypeField } from './userBase';
import { UserBase } from './userBase';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export class UserIntegrationMappings extends UserBase {
  readonly name?: string;
  readonly login?: string;
  constructor(fields: UserIntegrationMappings) {
    super(fields);
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.login !== undefined) {
      this.login = fields.login;
    }
  }
}
export function serializeUserIntegrationMappings(
  val: UserIntegrationMappings,
): SerializedData {
  const base: any = serializeUserBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserIntegrationMappings"',
    });
  }
  return { ...base, ...{ ['name']: val.name, ['login']: val.login } };
}
export function deserializeUserIntegrationMappings(
  val: SerializedData,
): UserIntegrationMappings {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserIntegrationMappings"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "UserIntegrationMappings"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message: 'Expecting string for "login" of type "UserIntegrationMappings"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserIntegrationMappings" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserIntegrationMappings"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "UserIntegrationMappings" to be defined',
    });
  }
  const type: UserBaseTypeField = deserializeUserBaseTypeField(val.type);
  return {
    name: name,
    login: login,
    id: id,
    type: type,
  } satisfies UserIntegrationMappings;
}

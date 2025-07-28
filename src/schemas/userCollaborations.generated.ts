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
export class UserCollaborations extends UserBase {
  readonly name?: string;
  readonly login?: string;
  readonly isActive?: boolean;
  constructor(fields: UserCollaborations) {
    super(fields);
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.login !== undefined) {
      this.login = fields.login;
    }
    if (fields.isActive !== undefined) {
      this.isActive = fields.isActive;
    }
  }
}
export function serializeUserCollaborations(
  val: UserCollaborations,
): SerializedData {
  const base: any = serializeUserBase(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserCollaborations"',
    });
  }
  return {
    ...base,
    ...{
      ['name']: val.name,
      ['login']: val.login,
      ['is_active']: val.isActive,
    },
  };
}
export function deserializeUserCollaborations(
  val: SerializedData,
): UserCollaborations {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserCollaborations"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "UserCollaborations"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message: 'Expecting string for "login" of type "UserCollaborations"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  if (!(val.is_active == void 0) && !sdIsBoolean(val.is_active)) {
    throw new BoxSdkError({
      message: 'Expecting boolean for "is_active" of type "UserCollaborations"',
    });
  }
  const isActive: undefined | boolean =
    val.is_active == void 0 ? void 0 : val.is_active;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserCollaborations" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserCollaborations"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "UserCollaborations" to be defined',
    });
  }
  const type: UserBaseTypeField = deserializeUserBaseTypeField(val.type);
  return {
    name: name,
    login: login,
    isActive: isActive,
    id: id,
    type: type,
  } satisfies UserCollaborations;
}

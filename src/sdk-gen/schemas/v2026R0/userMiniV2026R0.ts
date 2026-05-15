import { serializeUserBaseV2026R0TypeField } from './userBaseV2026R0';
import { deserializeUserBaseV2026R0TypeField } from './userBaseV2026R0';
import { serializeUserBaseV2026R0 } from './userBaseV2026R0';
import { deserializeUserBaseV2026R0 } from './userBaseV2026R0';
import { UserBaseV2026R0TypeField } from './userBaseV2026R0';
import { UserBaseV2026R0 } from './userBaseV2026R0';
import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export class UserMiniV2026R0 extends UserBaseV2026R0 {
  readonly name?: string;
  readonly login?: string;
  constructor(fields: UserMiniV2026R0) {
    super(fields);
    if (fields.name !== undefined) {
      this.name = fields.name;
    }
    if (fields.login !== undefined) {
      this.login = fields.login;
    }
  }
}
export function serializeUserMiniV2026R0(val: UserMiniV2026R0): SerializedData {
  const base: any = serializeUserBaseV2026R0(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UserMiniV2026R0"' });
  }
  return { ...base, ...{ ['name']: val.name, ['login']: val.login } };
}
export function deserializeUserMiniV2026R0(
  val: SerializedData
): UserMiniV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UserMiniV2026R0"' });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "UserMiniV2026R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.login == void 0) && !sdIsString(val.login)) {
    throw new BoxSdkError({
      message: 'Expecting string for "login" of type "UserMiniV2026R0"',
    });
  }
  const login: undefined | string = val.login == void 0 ? void 0 : val.login;
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "UserMiniV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "UserMiniV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "UserMiniV2026R0" to be defined',
    });
  }
  const type: UserBaseV2026R0TypeField = deserializeUserBaseV2026R0TypeField(
    val.type
  );
  return {
    name: name,
    login: login,
    id: id,
    type: type,
  } satisfies UserMiniV2026R0;
}

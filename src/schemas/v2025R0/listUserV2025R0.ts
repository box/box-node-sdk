import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ListUserV2025R0 {
  /**
   * The ID of the user. */
  readonly id?: number | null;
  /**
   * The name of the user. */
  readonly name?: string | null;
  /**
   * The email of the user. */
  readonly email?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeListUserV2025R0(val: ListUserV2025R0): SerializedData {
  return { ['id']: val.id, ['name']: val.name, ['email']: val.email };
}
export function deserializeListUserV2025R0(
  val: SerializedData,
): ListUserV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "ListUserV2025R0"' });
  }
  if (!(val.id == void 0) && !sdIsNumber(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting number for "id" of type "ListUserV2025R0"',
    });
  }
  const id: undefined | number = val.id == void 0 ? void 0 : val.id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "ListUserV2025R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message: 'Expecting string for "email" of type "ListUserV2025R0"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  return { id: id, name: name, email: email } satisfies ListUserV2025R0;
}

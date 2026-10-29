import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ShuttlePathMappingAccountV2026R0 {
  /**
   * The platform-native identifier of the account. `null` when the system
   * does not provide one. */
  readonly id?: string | null;
  /**
   * The email address of the account. `null` when unknown. */
  readonly email?: string | null;
  /**
   * The display name of the account. `null` when unknown. */
  readonly name?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingAccountV2026R0(
  val: ShuttlePathMappingAccountV2026R0,
): SerializedData {
  return { ['id']: val.id, ['email']: val.email, ['name']: val.name };
}
export function deserializeShuttlePathMappingAccountV2026R0(
  val: SerializedData,
): ShuttlePathMappingAccountV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathMappingAccountV2026R0"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttlePathMappingAccountV2026R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email" of type "ShuttlePathMappingAccountV2026R0"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttlePathMappingAccountV2026R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return {
    id: id,
    email: email,
    name: name,
  } satisfies ShuttlePathMappingAccountV2026R0;
}

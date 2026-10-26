import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ShuttlePathMappingAccountInputV2026R0 {
  /**
   * The platform-native identifier of the account. */
  readonly id?: string;
  /**
   * The email address of the account. */
  readonly email?: string;
  readonly rawData?: SerializedData;
}
export function serializeShuttlePathMappingAccountInputV2026R0(
  val: ShuttlePathMappingAccountInputV2026R0
): SerializedData {
  return { ['id']: val.id, ['email']: val.email };
}
export function deserializeShuttlePathMappingAccountInputV2026R0(
  val: SerializedData
): ShuttlePathMappingAccountInputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttlePathMappingAccountInputV2026R0"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttlePathMappingAccountInputV2026R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.email == void 0) && !sdIsString(val.email)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "email" of type "ShuttlePathMappingAccountInputV2026R0"',
    });
  }
  const email: undefined | string = val.email == void 0 ? void 0 : val.email;
  return {
    id: id,
    email: email,
  } satisfies ShuttlePathMappingAccountInputV2026R0;
}

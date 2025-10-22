import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface UserTrackingCodeV2025R0 {
  /**
   * The ID of the user tracking code. */
  readonly id?: number | null;
  /**
   * The name of the user tracking code. */
  readonly name?: string | null;
  readonly rawData?: SerializedData;
}
export function serializeUserTrackingCodeV2025R0(
  val: UserTrackingCodeV2025R0,
): SerializedData {
  return { ['id']: val.id, ['name']: val.name };
}
export function deserializeUserTrackingCodeV2025R0(
  val: SerializedData,
): UserTrackingCodeV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserTrackingCodeV2025R0"',
    });
  }
  if (!(val.id == void 0) && !sdIsNumber(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting number for "id" of type "UserTrackingCodeV2025R0"',
    });
  }
  const id: undefined | number = val.id == void 0 ? void 0 : val.id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message: 'Expecting string for "name" of type "UserTrackingCodeV2025R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return { id: id, name: name } satisfies UserTrackingCodeV2025R0;
}

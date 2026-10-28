import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface ShuttleSystemUpdateRequestV2026R0 {
  /**
   * The updated display name for the shuttle system. */
  readonly name?: string;
  readonly rawData?: SerializedData;
}
export function serializeShuttleSystemUpdateRequestV2026R0(
  val: ShuttleSystemUpdateRequestV2026R0
): SerializedData {
  return { ['name']: val.name };
}
export function deserializeShuttleSystemUpdateRequestV2026R0(
  val: SerializedData
): ShuttleSystemUpdateRequestV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleSystemUpdateRequestV2026R0"',
    });
  }
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "ShuttleSystemUpdateRequestV2026R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return { name: name } satisfies ShuttleSystemUpdateRequestV2026R0;
}

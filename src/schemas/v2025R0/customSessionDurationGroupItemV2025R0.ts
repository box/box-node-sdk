import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface CustomSessionDurationGroupItemV2025R0 {
  /**
   * Group ID (numerical). */
  readonly id?: string;
  /**
   * Group Name. */
  readonly name?: string;
  readonly rawData?: SerializedData;
}
export function serializeCustomSessionDurationGroupItemV2025R0(
  val: CustomSessionDurationGroupItemV2025R0,
): SerializedData {
  return { ['id']: val.id, ['name']: val.name };
}
export function deserializeCustomSessionDurationGroupItemV2025R0(
  val: SerializedData,
): CustomSessionDurationGroupItemV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CustomSessionDurationGroupItemV2025R0"',
    });
  }
  if (!(val.id == void 0) && !sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "CustomSessionDurationGroupItemV2025R0"',
    });
  }
  const id: undefined | string = val.id == void 0 ? void 0 : val.id;
  if (!(val.name == void 0) && !sdIsString(val.name)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "name" of type "CustomSessionDurationGroupItemV2025R0"',
    });
  }
  const name: undefined | string = val.name == void 0 ? void 0 : val.name;
  return { id: id, name: name } satisfies CustomSessionDurationGroupItemV2025R0;
}

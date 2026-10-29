import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleTargetSubjectInputV2026R0TypeField = 'user' | 'group';
export interface ShuttleTargetSubjectInputV2026R0 {
  /**
   * Whether the Box target is a user or a group. */
  readonly type: ShuttleTargetSubjectInputV2026R0TypeField;
  /**
   * The identifier of the target Box subject. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeShuttleTargetSubjectInputV2026R0TypeField(
  val: ShuttleTargetSubjectInputV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleTargetSubjectInputV2026R0TypeField(
  val: SerializedData,
): ShuttleTargetSubjectInputV2026R0TypeField {
  if (val == 'user') {
    return val;
  }
  if (val == 'group') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleTargetSubjectInputV2026R0TypeField",
  });
}
export function serializeShuttleTargetSubjectInputV2026R0(
  val: ShuttleTargetSubjectInputV2026R0,
): SerializedData {
  return {
    ['type']: serializeShuttleTargetSubjectInputV2026R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeShuttleTargetSubjectInputV2026R0(
  val: SerializedData,
): ShuttleTargetSubjectInputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleTargetSubjectInputV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleTargetSubjectInputV2026R0" to be defined',
    });
  }
  const type: ShuttleTargetSubjectInputV2026R0TypeField =
    deserializeShuttleTargetSubjectInputV2026R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleTargetSubjectInputV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "ShuttleTargetSubjectInputV2026R0"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies ShuttleTargetSubjectInputV2026R0;
}

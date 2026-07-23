import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export interface QueryAncestorReferenceV2026R0 {
  /**
   * The unique identifier of the ancestor entity. */
  readonly id: string;
  /**
   * The type of the ancestor entity. Possible value: folder. */
  readonly type: string;
  readonly rawData?: SerializedData;
}
export function serializeQueryAncestorReferenceV2026R0(
  val: QueryAncestorReferenceV2026R0,
): SerializedData {
  return { ['id']: val.id, ['type']: val.type };
}
export function deserializeQueryAncestorReferenceV2026R0(
  val: SerializedData,
): QueryAncestorReferenceV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryAncestorReferenceV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "QueryAncestorReferenceV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "QueryAncestorReferenceV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "QueryAncestorReferenceV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.type)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "type" of type "QueryAncestorReferenceV2026R0"',
    });
  }
  const type: string = val.type;
  return { id: id, type: type } satisfies QueryAncestorReferenceV2026R0;
}

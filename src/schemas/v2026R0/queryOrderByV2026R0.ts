import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type QueryOrderByV2026R0DirectionField = 'asc' | 'desc' | string;
export interface QueryOrderByV2026R0 {
  /**
   * The fully qualified field key to sort by. */
  readonly fieldKey: string;
  /**
   * The direction in which results are ordered. */
  readonly direction: QueryOrderByV2026R0DirectionField;
  readonly rawData?: SerializedData;
}
export function serializeQueryOrderByV2026R0DirectionField(
  val: QueryOrderByV2026R0DirectionField,
): SerializedData {
  return val;
}
export function deserializeQueryOrderByV2026R0DirectionField(
  val: SerializedData,
): QueryOrderByV2026R0DirectionField {
  if (val == 'asc') {
    return val;
  }
  if (val == 'desc') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize QueryOrderByV2026R0DirectionField",
  });
}
export function serializeQueryOrderByV2026R0(
  val: QueryOrderByV2026R0,
): SerializedData {
  return {
    ['field_key']: val.fieldKey,
    ['direction']: serializeQueryOrderByV2026R0DirectionField(val.direction),
  };
}
export function deserializeQueryOrderByV2026R0(
  val: SerializedData,
): QueryOrderByV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "QueryOrderByV2026R0"',
    });
  }
  if (val.field_key == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "field_key" of type "QueryOrderByV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.field_key)) {
    throw new BoxSdkError({
      message: 'Expecting string for "field_key" of type "QueryOrderByV2026R0"',
    });
  }
  const fieldKey: string = val.field_key;
  if (val.direction == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "direction" of type "QueryOrderByV2026R0" to be defined',
    });
  }
  const direction: QueryOrderByV2026R0DirectionField =
    deserializeQueryOrderByV2026R0DirectionField(val.direction);
  return {
    fieldKey: fieldKey,
    direction: direction,
  } satisfies QueryOrderByV2026R0;
}

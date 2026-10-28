import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type ShuttleReportOutputV2026R0TypeField = 'file' | 'folder';
export interface ShuttleReportOutputV2026R0 {
  /**
   * The unique identifier of the generated Box file or folder. */
  readonly id: string;
  /**
   * The Box object type of the generated file or folder. */
  readonly type: ShuttleReportOutputV2026R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeShuttleReportOutputV2026R0TypeField(
  val: ShuttleReportOutputV2026R0TypeField,
): SerializedData {
  return val;
}
export function deserializeShuttleReportOutputV2026R0TypeField(
  val: SerializedData,
): ShuttleReportOutputV2026R0TypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ShuttleReportOutputV2026R0TypeField",
  });
}
export function serializeShuttleReportOutputV2026R0(
  val: ShuttleReportOutputV2026R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeShuttleReportOutputV2026R0TypeField(val.type),
  };
}
export function deserializeShuttleReportOutputV2026R0(
  val: SerializedData,
): ShuttleReportOutputV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ShuttleReportOutputV2026R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "ShuttleReportOutputV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "ShuttleReportOutputV2026R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "ShuttleReportOutputV2026R0" to be defined',
    });
  }
  const type: ShuttleReportOutputV2026R0TypeField =
    deserializeShuttleReportOutputV2026R0TypeField(val.type);
  return { id: id, type: type } satisfies ShuttleReportOutputV2026R0;
}

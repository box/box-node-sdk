import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type FileReferenceV2026R0TypeField = 'file';
export class FileReferenceV2026R0 {
  /**
   * The value will always be `file`. */
  readonly type: FileReferenceV2026R0TypeField =
    'file' as FileReferenceV2026R0TypeField;
  /**
   * ID of the file. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<FileReferenceV2026R0, 'type'> &
      Partial<Pick<FileReferenceV2026R0, 'type'>>
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface FileReferenceV2026R0Input {
  /**
   * The value will always be `file`. */
  readonly type?: FileReferenceV2026R0TypeField;
  /**
   * ID of the file. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeFileReferenceV2026R0TypeField(
  val: FileReferenceV2026R0TypeField
): SerializedData {
  return val;
}
export function deserializeFileReferenceV2026R0TypeField(
  val: SerializedData
): FileReferenceV2026R0TypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileReferenceV2026R0TypeField",
  });
}
export function serializeFileReferenceV2026R0(
  val: FileReferenceV2026R0
): SerializedData {
  return {
    ['type']: serializeFileReferenceV2026R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeFileReferenceV2026R0(
  val: SerializedData
): FileReferenceV2026R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileReferenceV2026R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FileReferenceV2026R0" to be defined',
    });
  }
  const type: FileReferenceV2026R0TypeField =
    deserializeFileReferenceV2026R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileReferenceV2026R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileReferenceV2026R0"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies FileReferenceV2026R0;
}
export function serializeFileReferenceV2026R0Input(
  val: FileReferenceV2026R0Input
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeFileReferenceV2026R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeFileReferenceV2026R0Input(
  val: SerializedData
): FileReferenceV2026R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileReferenceV2026R0Input"',
    });
  }
  const type: undefined | FileReferenceV2026R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeFileReferenceV2026R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "FileReferenceV2026R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileReferenceV2026R0Input"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies FileReferenceV2026R0Input;
}

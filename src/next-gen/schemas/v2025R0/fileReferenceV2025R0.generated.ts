import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type FileReferenceV2025R0TypeField = 'file';
export class FileReferenceV2025R0 {
  /**
   * `file` */
  readonly type: FileReferenceV2025R0TypeField =
    'file' as FileReferenceV2025R0TypeField;
  /**
   * ID of the object */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<FileReferenceV2025R0, 'type'> &
      Partial<Pick<FileReferenceV2025R0, 'type'>>,
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
export interface FileReferenceV2025R0Input {
  /**
   * `file` */
  readonly type?: FileReferenceV2025R0TypeField;
  /**
   * ID of the object */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeFileReferenceV2025R0TypeField(
  val: FileReferenceV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeFileReferenceV2025R0TypeField(
  val: SerializedData,
): FileReferenceV2025R0TypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileReferenceV2025R0TypeField",
  });
}
export function serializeFileReferenceV2025R0(
  val: FileReferenceV2025R0,
): SerializedData {
  return {
    ['type']: serializeFileReferenceV2025R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeFileReferenceV2025R0(
  val: SerializedData,
): FileReferenceV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileReferenceV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FileReferenceV2025R0" to be defined',
    });
  }
  const type: FileReferenceV2025R0TypeField =
    deserializeFileReferenceV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileReferenceV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileReferenceV2025R0"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies FileReferenceV2025R0;
}
export function serializeFileReferenceV2025R0Input(
  val: FileReferenceV2025R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeFileReferenceV2025R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeFileReferenceV2025R0Input(
  val: SerializedData,
): FileReferenceV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileReferenceV2025R0Input"',
    });
  }
  const type: undefined | FileReferenceV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeFileReferenceV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "FileReferenceV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileReferenceV2025R0Input"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies FileReferenceV2025R0Input;
}

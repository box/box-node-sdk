import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type FileVersionBaseV2025R0TypeField = 'file_version';
export class FileVersionBaseV2025R0 {
  /**
   * The unique identifier that represent a file version. */
  readonly id!: string;
  /**
   * The value will always be `file_version`. */
  readonly type: FileVersionBaseV2025R0TypeField =
    'file_version' as FileVersionBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<FileVersionBaseV2025R0, 'type'> &
      Partial<Pick<FileVersionBaseV2025R0, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface FileVersionBaseV2025R0Input {
  /**
   * The unique identifier that represent a file version. */
  readonly id: string;
  /**
   * The value will always be `file_version`. */
  readonly type?: FileVersionBaseV2025R0TypeField;
  readonly rawData?: SerializedData;
}
export function serializeFileVersionBaseV2025R0TypeField(
  val: FileVersionBaseV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeFileVersionBaseV2025R0TypeField(
  val: SerializedData,
): FileVersionBaseV2025R0TypeField {
  if (val == 'file_version') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileVersionBaseV2025R0TypeField",
  });
}
export function serializeFileVersionBaseV2025R0(
  val: FileVersionBaseV2025R0,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeFileVersionBaseV2025R0TypeField(val.type),
  };
}
export function deserializeFileVersionBaseV2025R0(
  val: SerializedData,
): FileVersionBaseV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileVersionBaseV2025R0"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileVersionBaseV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileVersionBaseV2025R0"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "FileVersionBaseV2025R0" to be defined',
    });
  }
  const type: FileVersionBaseV2025R0TypeField =
    deserializeFileVersionBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies FileVersionBaseV2025R0;
}
export function serializeFileVersionBaseV2025R0Input(
  val: FileVersionBaseV2025R0Input,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeFileVersionBaseV2025R0TypeField(val.type),
  };
}
export function deserializeFileVersionBaseV2025R0Input(
  val: SerializedData,
): FileVersionBaseV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileVersionBaseV2025R0Input"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "FileVersionBaseV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "FileVersionBaseV2025R0Input"',
    });
  }
  const id: string = val.id;
  const type: undefined | FileVersionBaseV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeFileVersionBaseV2025R0TypeField(val.type);
  return { id: id, type: type } satisfies FileVersionBaseV2025R0Input;
}

import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FileVersionBaseTypeField = 'file_version';
export class FileVersionBase {
  /**
   * The unique identifier that represent a file version. */
  readonly id!: string;
  /**
   * `file_version` */
  readonly type: FileVersionBaseTypeField =
    'file_version' as FileVersionBaseTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<FileVersionBase, 'type'> &
      Partial<Pick<FileVersionBase, 'type'>>,
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
export interface FileVersionBaseInput {
  /**
   * The unique identifier that represent a file version. */
  readonly id: string;
  /**
   * `file_version` */
  readonly type?: FileVersionBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeFileVersionBaseTypeField(
  val: FileVersionBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeFileVersionBaseTypeField(
  val: SerializedData,
): FileVersionBaseTypeField {
  if (val == 'file_version') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FileVersionBaseTypeField",
  });
}
export function serializeFileVersionBase(val: FileVersionBase): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeFileVersionBaseTypeField(val.type),
  };
}
export function deserializeFileVersionBase(
  val: SerializedData,
): FileVersionBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FileVersionBase"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileVersionBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileVersionBase"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FileVersionBase" to be defined',
    });
  }
  const type: FileVersionBaseTypeField = deserializeFileVersionBaseTypeField(
    val.type,
  );
  return { id: id, type: type } satisfies FileVersionBase;
}
export function serializeFileVersionBaseInput(
  val: FileVersionBaseInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeFileVersionBaseTypeField(val.type),
  };
}
export function deserializeFileVersionBaseInput(
  val: SerializedData,
): FileVersionBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FileVersionBaseInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FileVersionBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FileVersionBaseInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | FileVersionBaseTypeField =
    val.type == void 0 ? void 0 : deserializeFileVersionBaseTypeField(val.type);
  return { id: id, type: type } satisfies FileVersionBaseInput;
}

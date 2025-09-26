import { BoxSdkError } from '../../box/errors';
import { SerializedData } from '../../serialization/json';
import { sdIsEmpty } from '../../serialization/json';
import { sdIsBoolean } from '../../serialization/json';
import { sdIsNumber } from '../../serialization/json';
import { sdIsString } from '../../serialization/json';
import { sdIsList } from '../../serialization/json';
import { sdIsMap } from '../../serialization/json';
export type FolderReferenceV2025R0TypeField = 'folder';
export class FolderReferenceV2025R0 {
  /**
   * The value will always be `folder`. */
  readonly type: FolderReferenceV2025R0TypeField =
    'folder' as FolderReferenceV2025R0TypeField;
  /**
   * ID of the folder. */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<FolderReferenceV2025R0, 'type'> &
      Partial<Pick<FolderReferenceV2025R0, 'type'>>,
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
export interface FolderReferenceV2025R0Input {
  /**
   * The value will always be `folder`. */
  readonly type?: FolderReferenceV2025R0TypeField;
  /**
   * ID of the folder. */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeFolderReferenceV2025R0TypeField(
  val: FolderReferenceV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeFolderReferenceV2025R0TypeField(
  val: SerializedData,
): FolderReferenceV2025R0TypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FolderReferenceV2025R0TypeField",
  });
}
export function serializeFolderReferenceV2025R0(
  val: FolderReferenceV2025R0,
): SerializedData {
  return {
    ['type']: serializeFolderReferenceV2025R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeFolderReferenceV2025R0(
  val: SerializedData,
): FolderReferenceV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderReferenceV2025R0"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "FolderReferenceV2025R0" to be defined',
    });
  }
  const type: FolderReferenceV2025R0TypeField =
    deserializeFolderReferenceV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FolderReferenceV2025R0" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FolderReferenceV2025R0"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies FolderReferenceV2025R0;
}
export function serializeFolderReferenceV2025R0Input(
  val: FolderReferenceV2025R0Input,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeFolderReferenceV2025R0TypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeFolderReferenceV2025R0Input(
  val: SerializedData,
): FolderReferenceV2025R0Input {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderReferenceV2025R0Input"',
    });
  }
  const type: undefined | FolderReferenceV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeFolderReferenceV2025R0TypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "FolderReferenceV2025R0Input" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "id" of type "FolderReferenceV2025R0Input"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies FolderReferenceV2025R0Input;
}

import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type FolderReferenceTypeField = 'folder';
export class FolderReference {
  /**
   * `folder` */
  readonly type: FolderReferenceTypeField =
    'folder' as FolderReferenceTypeField;
  /**
   * ID of the folder */
  readonly id!: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<FolderReference, 'type'> &
      Partial<Pick<FolderReference, 'type'>>,
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
export interface FolderReferenceInput {
  /**
   * `folder` */
  readonly type?: FolderReferenceTypeField;
  /**
   * ID of the folder */
  readonly id: string;
  readonly rawData?: SerializedData;
}
export function serializeFolderReferenceTypeField(
  val: FolderReferenceTypeField,
): SerializedData {
  return val;
}
export function deserializeFolderReferenceTypeField(
  val: SerializedData,
): FolderReferenceTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize FolderReferenceTypeField",
  });
}
export function serializeFolderReference(val: FolderReference): SerializedData {
  return {
    ['type']: serializeFolderReferenceTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeFolderReference(
  val: SerializedData,
): FolderReference {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FolderReference"' });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FolderReference" to be defined',
    });
  }
  const type: FolderReferenceTypeField = deserializeFolderReferenceTypeField(
    val.type,
  );
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FolderReference" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FolderReference"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies FolderReference;
}
export function serializeFolderReferenceInput(
  val: FolderReferenceInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeFolderReferenceTypeField(val.type),
    ['id']: val.id,
  };
}
export function deserializeFolderReferenceInput(
  val: SerializedData,
): FolderReferenceInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "FolderReferenceInput"',
    });
  }
  const type: undefined | FolderReferenceTypeField =
    val.type == void 0 ? void 0 : deserializeFolderReferenceTypeField(val.type);
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FolderReferenceInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FolderReferenceInput"',
    });
  }
  const id: string = val.id;
  return { type: type, id: id } satisfies FolderReferenceInput;
}

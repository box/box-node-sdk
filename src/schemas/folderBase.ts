import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type FolderBaseTypeField = 'folder';
export class FolderBase {
  /**
   * The unique identifier that represent a folder.
   *
   * The ID for any folder can be determined
   * by visiting a folder in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/folders/123`
   * the `folder_id` is `123`. */
  readonly id!: string;
  /**
   * The HTTP `etag` of this folder. This can be used within some API
   * endpoints in the `If-Match` and `If-None-Match` headers to only
   * perform changes on the folder if (no) changes have happened. */
  readonly etag?: string | null;
  /**
   * The value will always be `folder`. */
  readonly type: FolderBaseTypeField = 'folder' as FolderBaseTypeField;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<FolderBase, 'type'> & Partial<Pick<FolderBase, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.etag !== undefined) {
      this.etag = fields.etag;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface FolderBaseInput {
  /**
   * The unique identifier that represent a folder.
   *
   * The ID for any folder can be determined
   * by visiting a folder in the web application
   * and copying the ID from the URL. For example,
   * for the URL `https://*.app.box.com/folders/123`
   * the `folder_id` is `123`. */
  readonly id: string;
  /**
   * The HTTP `etag` of this folder. This can be used within some API
   * endpoints in the `If-Match` and `If-None-Match` headers to only
   * perform changes on the folder if (no) changes have happened. */
  readonly etag?: string | null;
  /**
   * The value will always be `folder`. */
  readonly type?: FolderBaseTypeField;
  readonly rawData?: SerializedData;
}
export function serializeFolderBaseTypeField(
  val: FolderBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeFolderBaseTypeField(
  val: SerializedData,
): FolderBaseTypeField {
  if (val == 'folder') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize FolderBaseTypeField" });
}
export function serializeFolderBase(val: FolderBase): SerializedData {
  return {
    ['id']: val.id,
    ['etag']: val.etag,
    ['type']: serializeFolderBaseTypeField(val.type),
  };
}
export function deserializeFolderBase(val: SerializedData): FolderBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FolderBase"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FolderBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FolderBase"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "FolderBase"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "FolderBase" to be defined',
    });
  }
  const type: FolderBaseTypeField = deserializeFolderBaseTypeField(val.type);
  return { id: id, etag: etag, type: type } satisfies FolderBase;
}
export function serializeFolderBaseInput(val: FolderBaseInput): SerializedData {
  return {
    ['id']: val.id,
    ['etag']: val.etag,
    ['type']:
      val.type == void 0 ? val.type : serializeFolderBaseTypeField(val.type),
  };
}
export function deserializeFolderBaseInput(
  val: SerializedData,
): FolderBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "FolderBaseInput"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "FolderBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "FolderBaseInput"',
    });
  }
  const id: string = val.id;
  if (!(val.etag == void 0) && !sdIsString(val.etag)) {
    throw new BoxSdkError({
      message: 'Expecting string for "etag" of type "FolderBaseInput"',
    });
  }
  const etag: undefined | string = val.etag == void 0 ? void 0 : val.etag;
  const type: undefined | FolderBaseTypeField =
    val.type == void 0 ? void 0 : deserializeFolderBaseTypeField(val.type);
  return { id: id, etag: etag, type: type } satisfies FolderBaseInput;
}

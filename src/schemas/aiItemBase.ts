import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiItemBaseTypeField = 'file';
export class AiItemBase {
  /**
   * The ID of the file. */
  readonly id!: string;
  /**
   * The type of the item. Currently the value can be `file` only. */
  readonly type: AiItemBaseTypeField = 'file' as AiItemBaseTypeField;
  /**
   * The content of the item, often the text representation. */
  readonly content?: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiItemBase, 'type'> & Partial<Pick<AiItemBase, 'type'>>,
  ) {
    if (fields.id !== undefined) {
      this.id = fields.id;
    }
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.content !== undefined) {
      this.content = fields.content;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiItemBaseInput {
  /**
   * The ID of the file. */
  readonly id: string;
  /**
   * The type of the item. Currently the value can be `file` only. */
  readonly type?: AiItemBaseTypeField;
  /**
   * The content of the item, often the text representation. */
  readonly content?: string;
  readonly rawData?: SerializedData;
}
export function serializeAiItemBaseTypeField(
  val: AiItemBaseTypeField,
): SerializedData {
  return val;
}
export function deserializeAiItemBaseTypeField(
  val: SerializedData,
): AiItemBaseTypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize AiItemBaseTypeField" });
}
export function serializeAiItemBase(val: AiItemBase): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeAiItemBaseTypeField(val.type),
    ['content']: val.content,
  };
}
export function deserializeAiItemBase(val: SerializedData): AiItemBase {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiItemBase"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AiItemBase" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiItemBase"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AiItemBase" to be defined',
    });
  }
  const type: AiItemBaseTypeField = deserializeAiItemBaseTypeField(val.type);
  if (!(val.content == void 0) && !sdIsString(val.content)) {
    throw new BoxSdkError({
      message: 'Expecting string for "content" of type "AiItemBase"',
    });
  }
  const content: undefined | string =
    val.content == void 0 ? void 0 : val.content;
  return { id: id, type: type, content: content } satisfies AiItemBase;
}
export function serializeAiItemBaseInput(val: AiItemBaseInput): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0 ? val.type : serializeAiItemBaseTypeField(val.type),
    ['content']: val.content,
  };
}
export function deserializeAiItemBaseInput(
  val: SerializedData,
): AiItemBaseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiItemBaseInput"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AiItemBaseInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiItemBaseInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | AiItemBaseTypeField =
    val.type == void 0 ? void 0 : deserializeAiItemBaseTypeField(val.type);
  if (!(val.content == void 0) && !sdIsString(val.content)) {
    throw new BoxSdkError({
      message: 'Expecting string for "content" of type "AiItemBaseInput"',
    });
  }
  const content: undefined | string =
    val.content == void 0 ? void 0 : val.content;
  return { id: id, type: type, content: content } satisfies AiItemBaseInput;
}

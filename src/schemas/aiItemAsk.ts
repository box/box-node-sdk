import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiItemAskTypeField = 'file' | 'hubs';
export interface AiItemAsk {
  /**
   * The ID of the file. */
  readonly id: string;
  /**
   * The type of the item. A `hubs` item must be used as a single item. */
  readonly type: AiItemAskTypeField;
  /**
   * The content of the item, often the text representation. */
  readonly content?: string;
  readonly rawData?: SerializedData;
}
export function serializeAiItemAskTypeField(
  val: AiItemAskTypeField,
): SerializedData {
  return val;
}
export function deserializeAiItemAskTypeField(
  val: SerializedData,
): AiItemAskTypeField {
  if (val == 'file') {
    return val;
  }
  if (val == 'hubs') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize AiItemAskTypeField" });
}
export function serializeAiItemAsk(val: AiItemAsk): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeAiItemAskTypeField(val.type),
    ['content']: val.content,
  };
}
export function deserializeAiItemAsk(val: SerializedData): AiItemAsk {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiItemAsk"' });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AiItemAsk" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiItemAsk"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AiItemAsk" to be defined',
    });
  }
  const type: AiItemAskTypeField = deserializeAiItemAskTypeField(val.type);
  if (!(val.content == void 0) && !sdIsString(val.content)) {
    throw new BoxSdkError({
      message: 'Expecting string for "content" of type "AiItemAsk"',
    });
  }
  const content: undefined | string =
    val.content == void 0 ? void 0 : val.content;
  return { id: id, type: type, content: content } satisfies AiItemAsk;
}

import { serializeAiAgentReference } from './aiAgentReference.generated.js';
import { deserializeAiAgentReference } from './aiAgentReference.generated.js';
import { serializeAiAgentTextGen } from './aiAgentTextGen.generated.js';
import { deserializeAiAgentTextGen } from './aiAgentTextGen.generated.js';
import { serializeAiDialogueHistory } from './aiDialogueHistory.generated.js';
import { deserializeAiDialogueHistory } from './aiDialogueHistory.generated.js';
import { serializeAiAgentReferenceOrAiAgentTextGen } from './aiAgentReferenceOrAiAgentTextGen.generated.js';
import { deserializeAiAgentReferenceOrAiAgentTextGen } from './aiAgentReferenceOrAiAgentTextGen.generated.js';
import { AiAgentReference } from './aiAgentReference.generated.js';
import { AiAgentTextGen } from './aiAgentTextGen.generated.js';
import { AiDialogueHistory } from './aiDialogueHistory.generated.js';
import { AiAgentReferenceOrAiAgentTextGen } from './aiAgentReferenceOrAiAgentTextGen.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiTextGenItemsTypeField = 'file';
export class AiTextGenItemsField {
  /**
   * The ID of the item. */
  readonly id!: string;
  /**
   * The type of the item. */
  readonly type: AiTextGenItemsTypeField = 'file' as AiTextGenItemsTypeField;
  /**
   * The content to use as context for generating new text or editing existing text. */
  readonly content?: string;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiTextGenItemsField, 'type'> &
      Partial<Pick<AiTextGenItemsField, 'type'>>,
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
export interface AiTextGenItemsFieldInput {
  /**
   * The ID of the item. */
  readonly id: string;
  /**
   * The type of the item. */
  readonly type?: AiTextGenItemsTypeField;
  /**
   * The content to use as context for generating new text or editing existing text. */
  readonly content?: string;
  readonly rawData?: SerializedData;
}
export interface AiTextGen {
  /**
   * The prompt provided by the client to be answered by the LLM. The prompt's length is limited to 10000 characters. */
  readonly prompt: string;
  /**
   * The items to be processed by the LLM, often files.
   * The array can include **exactly one** element.
   *
   * **Note**: Box AI handles documents with text representations up to 1MB in size.
   * If the file size exceeds 1MB, the first 1MB of text representation will be processed. */
  readonly items: readonly AiTextGenItemsField[];
  /**
   * The history of prompts and answers previously passed to the LLM. This parameter provides the additional context to the LLM when generating the response. */
  readonly dialogueHistory?: readonly AiDialogueHistory[];
  readonly aiAgent?: AiAgentReferenceOrAiAgentTextGen;
  readonly rawData?: SerializedData;
}
export function serializeAiTextGenItemsTypeField(
  val: AiTextGenItemsTypeField,
): SerializedData {
  return val;
}
export function deserializeAiTextGenItemsTypeField(
  val: SerializedData,
): AiTextGenItemsTypeField {
  if (val == 'file') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiTextGenItemsTypeField",
  });
}
export function serializeAiTextGenItemsField(
  val: AiTextGenItemsField,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']: serializeAiTextGenItemsTypeField(val.type),
    ['content']: val.content,
  };
}
export function deserializeAiTextGenItemsField(
  val: SerializedData,
): AiTextGenItemsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiTextGenItemsField"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "id" of type "AiTextGenItemsField" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiTextGenItemsField"',
    });
  }
  const id: string = val.id;
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AiTextGenItemsField" to be defined',
    });
  }
  const type: AiTextGenItemsTypeField = deserializeAiTextGenItemsTypeField(
    val.type,
  );
  if (!(val.content == void 0) && !sdIsString(val.content)) {
    throw new BoxSdkError({
      message: 'Expecting string for "content" of type "AiTextGenItemsField"',
    });
  }
  const content: undefined | string =
    val.content == void 0 ? void 0 : val.content;
  return { id: id, type: type, content: content } satisfies AiTextGenItemsField;
}
export function serializeAiTextGenItemsFieldInput(
  val: AiTextGenItemsFieldInput,
): SerializedData {
  return {
    ['id']: val.id,
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiTextGenItemsTypeField(val.type),
    ['content']: val.content,
  };
}
export function deserializeAiTextGenItemsFieldInput(
  val: SerializedData,
): AiTextGenItemsFieldInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiTextGenItemsFieldInput"',
    });
  }
  if (val.id == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "id" of type "AiTextGenItemsFieldInput" to be defined',
    });
  }
  if (!sdIsString(val.id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "id" of type "AiTextGenItemsFieldInput"',
    });
  }
  const id: string = val.id;
  const type: undefined | AiTextGenItemsTypeField =
    val.type == void 0 ? void 0 : deserializeAiTextGenItemsTypeField(val.type);
  if (!(val.content == void 0) && !sdIsString(val.content)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content" of type "AiTextGenItemsFieldInput"',
    });
  }
  const content: undefined | string =
    val.content == void 0 ? void 0 : val.content;
  return {
    id: id,
    type: type,
    content: content,
  } satisfies AiTextGenItemsFieldInput;
}
export function serializeAiTextGen(val: AiTextGen): SerializedData {
  return {
    ['prompt']: val.prompt,
    ['items']: val.items.map(function (
      item: AiTextGenItemsField,
    ): SerializedData {
      return serializeAiTextGenItemsField(item);
    }) as readonly any[],
    ['dialogue_history']:
      val.dialogueHistory == void 0
        ? val.dialogueHistory
        : (val.dialogueHistory.map(function (
            item: AiDialogueHistory,
          ): SerializedData {
            return serializeAiDialogueHistory(item);
          }) as readonly any[]),
    ['ai_agent']:
      val.aiAgent == void 0
        ? val.aiAgent
        : serializeAiAgentReferenceOrAiAgentTextGen(val.aiAgent),
  };
}
export function deserializeAiTextGen(val: SerializedData): AiTextGen {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiTextGen"' });
  }
  if (val.prompt == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "prompt" of type "AiTextGen" to be defined',
    });
  }
  if (!sdIsString(val.prompt)) {
    throw new BoxSdkError({
      message: 'Expecting string for "prompt" of type "AiTextGen"',
    });
  }
  const prompt: string = val.prompt;
  if (val.items == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "items" of type "AiTextGen" to be defined',
    });
  }
  if (!sdIsList(val.items)) {
    throw new BoxSdkError({
      message: 'Expecting array for "items" of type "AiTextGen"',
    });
  }
  const items: readonly AiTextGenItemsField[] = sdIsList(val.items)
    ? (val.items.map(function (itm: SerializedData): AiTextGenItemsField {
        return deserializeAiTextGenItemsField(itm);
      }) as readonly any[])
    : [];
  if (!(val.dialogue_history == void 0) && !sdIsList(val.dialogue_history)) {
    throw new BoxSdkError({
      message: 'Expecting array for "dialogue_history" of type "AiTextGen"',
    });
  }
  const dialogueHistory: undefined | readonly AiDialogueHistory[] =
    val.dialogue_history == void 0
      ? void 0
      : sdIsList(val.dialogue_history)
        ? (val.dialogue_history.map(function (
            itm: SerializedData,
          ): AiDialogueHistory {
            return deserializeAiDialogueHistory(itm);
          }) as readonly any[])
        : [];
  const aiAgent: undefined | AiAgentReferenceOrAiAgentTextGen =
    val.ai_agent == void 0
      ? void 0
      : deserializeAiAgentReferenceOrAiAgentTextGen(val.ai_agent);
  return {
    prompt: prompt,
    items: items,
    dialogueHistory: dialogueHistory,
    aiAgent: aiAgent,
  } satisfies AiTextGen;
}

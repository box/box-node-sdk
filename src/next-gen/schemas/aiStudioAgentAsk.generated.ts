import { serializeAiStudioAgentLongTextTool } from './aiStudioAgentLongTextTool.generated.js';
import { deserializeAiStudioAgentLongTextTool } from './aiStudioAgentLongTextTool.generated.js';
import { serializeAiStudioAgentBasicTextTool } from './aiStudioAgentBasicTextTool.generated.js';
import { deserializeAiStudioAgentBasicTextTool } from './aiStudioAgentBasicTextTool.generated.js';
import { AiStudioAgentLongTextTool } from './aiStudioAgentLongTextTool.generated.js';
import { AiStudioAgentBasicTextTool } from './aiStudioAgentBasicTextTool.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiStudioAgentAskTypeField = 'ai_agent_ask';
export class AiStudioAgentAsk {
  /**
   * The type of AI agent used to handle queries. */
  readonly type: AiStudioAgentAskTypeField =
    'ai_agent_ask' as AiStudioAgentAskTypeField;
  /**
   * The state of the AI Agent capability. Possible values are: `enabled` and `disabled`. */
  readonly accessState!: string;
  /**
   * The description of the AI Agent. */
  readonly description!: string;
  /**
   * Custom instructions for the agent. */
  readonly customInstructions?: string | null;
  readonly longText?: AiStudioAgentLongTextTool;
  readonly basicText?: AiStudioAgentBasicTextTool;
  readonly longTextMulti?: AiStudioAgentLongTextTool;
  readonly basicTextMulti?: AiStudioAgentBasicTextTool;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiStudioAgentAsk, 'type'> &
      Partial<Pick<AiStudioAgentAsk, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.accessState !== undefined) {
      this.accessState = fields.accessState;
    }
    if (fields.description !== undefined) {
      this.description = fields.description;
    }
    if (fields.customInstructions !== undefined) {
      this.customInstructions = fields.customInstructions;
    }
    if (fields.longText !== undefined) {
      this.longText = fields.longText;
    }
    if (fields.basicText !== undefined) {
      this.basicText = fields.basicText;
    }
    if (fields.longTextMulti !== undefined) {
      this.longTextMulti = fields.longTextMulti;
    }
    if (fields.basicTextMulti !== undefined) {
      this.basicTextMulti = fields.basicTextMulti;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiStudioAgentAskInput {
  /**
   * The type of AI agent used to handle queries. */
  readonly type?: AiStudioAgentAskTypeField;
  /**
   * The state of the AI Agent capability. Possible values are: `enabled` and `disabled`. */
  readonly accessState: string;
  /**
   * The description of the AI Agent. */
  readonly description: string;
  /**
   * Custom instructions for the agent. */
  readonly customInstructions?: string | null;
  readonly longText?: AiStudioAgentLongTextTool;
  readonly basicText?: AiStudioAgentBasicTextTool;
  readonly longTextMulti?: AiStudioAgentLongTextTool;
  readonly basicTextMulti?: AiStudioAgentBasicTextTool;
  readonly rawData?: SerializedData;
}
export function serializeAiStudioAgentAskTypeField(
  val: AiStudioAgentAskTypeField,
): SerializedData {
  return val;
}
export function deserializeAiStudioAgentAskTypeField(
  val: SerializedData,
): AiStudioAgentAskTypeField {
  if (val == 'ai_agent_ask') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiStudioAgentAskTypeField",
  });
}
export function serializeAiStudioAgentAsk(
  val: AiStudioAgentAsk,
): SerializedData {
  return {
    ['type']: serializeAiStudioAgentAskTypeField(val.type),
    ['access_state']: val.accessState,
    ['description']: val.description,
    ['custom_instructions']: val.customInstructions,
    ['long_text']:
      val.longText == void 0
        ? val.longText
        : serializeAiStudioAgentLongTextTool(val.longText),
    ['basic_text']:
      val.basicText == void 0
        ? val.basicText
        : serializeAiStudioAgentBasicTextTool(val.basicText),
    ['long_text_multi']:
      val.longTextMulti == void 0
        ? val.longTextMulti
        : serializeAiStudioAgentLongTextTool(val.longTextMulti),
    ['basic_text_multi']:
      val.basicTextMulti == void 0
        ? val.basicTextMulti
        : serializeAiStudioAgentBasicTextTool(val.basicTextMulti),
  };
}
export function deserializeAiStudioAgentAsk(
  val: SerializedData,
): AiStudioAgentAsk {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentAsk"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AiStudioAgentAsk" to be defined',
    });
  }
  const type: AiStudioAgentAskTypeField = deserializeAiStudioAgentAskTypeField(
    val.type,
  );
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiStudioAgentAsk" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message: 'Expecting string for "access_state" of type "AiStudioAgentAsk"',
    });
  }
  const accessState: string = val.access_state;
  if (val.description == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "description" of type "AiStudioAgentAsk" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message: 'Expecting string for "description" of type "AiStudioAgentAsk"',
    });
  }
  const description: string = val.description;
  if (
    !(val.custom_instructions == void 0) &&
    !sdIsString(val.custom_instructions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_instructions" of type "AiStudioAgentAsk"',
    });
  }
  const customInstructions: undefined | string =
    val.custom_instructions == void 0 ? void 0 : val.custom_instructions;
  const longText: undefined | AiStudioAgentLongTextTool =
    val.long_text == void 0
      ? void 0
      : deserializeAiStudioAgentLongTextTool(val.long_text);
  const basicText: undefined | AiStudioAgentBasicTextTool =
    val.basic_text == void 0
      ? void 0
      : deserializeAiStudioAgentBasicTextTool(val.basic_text);
  const longTextMulti: undefined | AiStudioAgentLongTextTool =
    val.long_text_multi == void 0
      ? void 0
      : deserializeAiStudioAgentLongTextTool(val.long_text_multi);
  const basicTextMulti: undefined | AiStudioAgentBasicTextTool =
    val.basic_text_multi == void 0
      ? void 0
      : deserializeAiStudioAgentBasicTextTool(val.basic_text_multi);
  return {
    type: type,
    accessState: accessState,
    description: description,
    customInstructions: customInstructions,
    longText: longText,
    basicText: basicText,
    longTextMulti: longTextMulti,
    basicTextMulti: basicTextMulti,
  } satisfies AiStudioAgentAsk;
}
export function serializeAiStudioAgentAskInput(
  val: AiStudioAgentAskInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiStudioAgentAskTypeField(val.type),
    ['access_state']: val.accessState,
    ['description']: val.description,
    ['custom_instructions']: val.customInstructions,
    ['long_text']:
      val.longText == void 0
        ? val.longText
        : serializeAiStudioAgentLongTextTool(val.longText),
    ['basic_text']:
      val.basicText == void 0
        ? val.basicText
        : serializeAiStudioAgentBasicTextTool(val.basicText),
    ['long_text_multi']:
      val.longTextMulti == void 0
        ? val.longTextMulti
        : serializeAiStudioAgentLongTextTool(val.longTextMulti),
    ['basic_text_multi']:
      val.basicTextMulti == void 0
        ? val.basicTextMulti
        : serializeAiStudioAgentBasicTextTool(val.basicTextMulti),
  };
}
export function deserializeAiStudioAgentAskInput(
  val: SerializedData,
): AiStudioAgentAskInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentAskInput"',
    });
  }
  const type: undefined | AiStudioAgentAskTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiStudioAgentAskTypeField(val.type);
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiStudioAgentAskInput" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "AiStudioAgentAskInput"',
    });
  }
  const accessState: string = val.access_state;
  if (val.description == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "description" of type "AiStudioAgentAskInput" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AiStudioAgentAskInput"',
    });
  }
  const description: string = val.description;
  if (
    !(val.custom_instructions == void 0) &&
    !sdIsString(val.custom_instructions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_instructions" of type "AiStudioAgentAskInput"',
    });
  }
  const customInstructions: undefined | string =
    val.custom_instructions == void 0 ? void 0 : val.custom_instructions;
  const longText: undefined | AiStudioAgentLongTextTool =
    val.long_text == void 0
      ? void 0
      : deserializeAiStudioAgentLongTextTool(val.long_text);
  const basicText: undefined | AiStudioAgentBasicTextTool =
    val.basic_text == void 0
      ? void 0
      : deserializeAiStudioAgentBasicTextTool(val.basic_text);
  const longTextMulti: undefined | AiStudioAgentLongTextTool =
    val.long_text_multi == void 0
      ? void 0
      : deserializeAiStudioAgentLongTextTool(val.long_text_multi);
  const basicTextMulti: undefined | AiStudioAgentBasicTextTool =
    val.basic_text_multi == void 0
      ? void 0
      : deserializeAiStudioAgentBasicTextTool(val.basic_text_multi);
  return {
    type: type,
    accessState: accessState,
    description: description,
    customInstructions: customInstructions,
    longText: longText,
    basicText: basicText,
    longTextMulti: longTextMulti,
    basicTextMulti: basicTextMulti,
  } satisfies AiStudioAgentAskInput;
}

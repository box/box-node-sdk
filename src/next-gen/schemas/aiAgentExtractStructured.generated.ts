import { serializeAiAgentLongTextTool } from './aiAgentLongTextTool.generated.js';
import { deserializeAiAgentLongTextTool } from './aiAgentLongTextTool.generated.js';
import { serializeAiAgentBasicTextTool } from './aiAgentBasicTextTool.generated.js';
import { deserializeAiAgentBasicTextTool } from './aiAgentBasicTextTool.generated.js';
import { AiAgentLongTextTool } from './aiAgentLongTextTool.generated.js';
import { AiAgentBasicTextTool } from './aiAgentBasicTextTool.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgentExtractStructuredTypeField = 'ai_agent_extract_structured';
export class AiAgentExtractStructured {
  /**
   * The type of AI agent to be used for extraction. */
  readonly type: AiAgentExtractStructuredTypeField =
    'ai_agent_extract_structured' as AiAgentExtractStructuredTypeField;
  readonly longText?: AiAgentLongTextTool;
  readonly basicText?: AiAgentBasicTextTool;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiAgentExtractStructured, 'type'> &
      Partial<Pick<AiAgentExtractStructured, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.longText !== undefined) {
      this.longText = fields.longText;
    }
    if (fields.basicText !== undefined) {
      this.basicText = fields.basicText;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiAgentExtractStructuredInput {
  /**
   * The type of AI agent to be used for extraction. */
  readonly type?: AiAgentExtractStructuredTypeField;
  readonly longText?: AiAgentLongTextTool;
  readonly basicText?: AiAgentBasicTextTool;
  readonly rawData?: SerializedData;
}
export function serializeAiAgentExtractStructuredTypeField(
  val: AiAgentExtractStructuredTypeField,
): SerializedData {
  return val;
}
export function deserializeAiAgentExtractStructuredTypeField(
  val: SerializedData,
): AiAgentExtractStructuredTypeField {
  if (val == 'ai_agent_extract_structured') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiAgentExtractStructuredTypeField",
  });
}
export function serializeAiAgentExtractStructured(
  val: AiAgentExtractStructured,
): SerializedData {
  return {
    ['type']: serializeAiAgentExtractStructuredTypeField(val.type),
    ['long_text']:
      val.longText == void 0
        ? val.longText
        : serializeAiAgentLongTextTool(val.longText),
    ['basic_text']:
      val.basicText == void 0
        ? val.basicText
        : serializeAiAgentBasicTextTool(val.basicText),
  };
}
export function deserializeAiAgentExtractStructured(
  val: SerializedData,
): AiAgentExtractStructured {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentExtractStructured"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "AiAgentExtractStructured" to be defined',
    });
  }
  const type: AiAgentExtractStructuredTypeField =
    deserializeAiAgentExtractStructuredTypeField(val.type);
  const longText: undefined | AiAgentLongTextTool =
    val.long_text == void 0
      ? void 0
      : deserializeAiAgentLongTextTool(val.long_text);
  const basicText: undefined | AiAgentBasicTextTool =
    val.basic_text == void 0
      ? void 0
      : deserializeAiAgentBasicTextTool(val.basic_text);
  return {
    type: type,
    longText: longText,
    basicText: basicText,
  } satisfies AiAgentExtractStructured;
}
export function serializeAiAgentExtractStructuredInput(
  val: AiAgentExtractStructuredInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiAgentExtractStructuredTypeField(val.type),
    ['long_text']:
      val.longText == void 0
        ? val.longText
        : serializeAiAgentLongTextTool(val.longText),
    ['basic_text']:
      val.basicText == void 0
        ? val.basicText
        : serializeAiAgentBasicTextTool(val.basicText),
  };
}
export function deserializeAiAgentExtractStructuredInput(
  val: SerializedData,
): AiAgentExtractStructuredInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentExtractStructuredInput"',
    });
  }
  const type: undefined | AiAgentExtractStructuredTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiAgentExtractStructuredTypeField(val.type);
  const longText: undefined | AiAgentLongTextTool =
    val.long_text == void 0
      ? void 0
      : deserializeAiAgentLongTextTool(val.long_text);
  const basicText: undefined | AiAgentBasicTextTool =
    val.basic_text == void 0
      ? void 0
      : deserializeAiAgentBasicTextTool(val.basic_text);
  return {
    type: type,
    longText: longText,
    basicText: basicText,
  } satisfies AiAgentExtractStructuredInput;
}

import { serializeAiAgentLongTextTool } from './aiAgentLongTextTool';
import { deserializeAiAgentLongTextTool } from './aiAgentLongTextTool';
import { serializeAiAgentBasicTextTool } from './aiAgentBasicTextTool';
import { deserializeAiAgentBasicTextTool } from './aiAgentBasicTextTool';
import { AiAgentLongTextTool } from './aiAgentLongTextTool';
import { AiAgentBasicTextTool } from './aiAgentBasicTextTool';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiAgentExtractStructuredTypeField = 'ai_agent_extract_structured';
export class AiAgentExtractStructured {
  /**
   * The type of AI agent to be used for extraction. */
  readonly type: AiAgentExtractStructuredTypeField =
    'ai_agent_extract_structured' as AiAgentExtractStructuredTypeField;
  readonly longText?: AiAgentLongTextTool;
  readonly basicText?: AiAgentBasicTextTool;
  readonly basicImage?: AiAgentBasicTextTool;
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
    if (fields.basicImage !== undefined) {
      this.basicImage = fields.basicImage;
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
  readonly basicImage?: AiAgentBasicTextTool;
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
    ['basic_image']:
      val.basicImage == void 0
        ? val.basicImage
        : serializeAiAgentBasicTextTool(val.basicImage),
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
  const basicImage: undefined | AiAgentBasicTextTool =
    val.basic_image == void 0
      ? void 0
      : deserializeAiAgentBasicTextTool(val.basic_image);
  return {
    type: type,
    longText: longText,
    basicText: basicText,
    basicImage: basicImage,
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
    ['basic_image']:
      val.basicImage == void 0
        ? val.basicImage
        : serializeAiAgentBasicTextTool(val.basicImage),
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
  const basicImage: undefined | AiAgentBasicTextTool =
    val.basic_image == void 0
      ? void 0
      : deserializeAiAgentBasicTextTool(val.basic_image);
  return {
    type: type,
    longText: longText,
    basicText: basicText,
    basicImage: basicImage,
  } satisfies AiAgentExtractStructuredInput;
}

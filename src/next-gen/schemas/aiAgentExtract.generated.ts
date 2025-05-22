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
export type AiAgentExtractTypeField = 'ai_agent_extract';
export class AiAgentExtract {
  /**
   * The type of AI agent to be used for extraction. */
  readonly type: AiAgentExtractTypeField =
    'ai_agent_extract' as AiAgentExtractTypeField;
  readonly longText?: AiAgentLongTextTool;
  readonly basicText?: AiAgentBasicTextTool;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiAgentExtract, 'type'> &
      Partial<Pick<AiAgentExtract, 'type'>>,
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
export interface AiAgentExtractInput {
  /**
   * The type of AI agent to be used for extraction. */
  readonly type?: AiAgentExtractTypeField;
  readonly longText?: AiAgentLongTextTool;
  readonly basicText?: AiAgentBasicTextTool;
  readonly rawData?: SerializedData;
}
export function serializeAiAgentExtractTypeField(
  val: AiAgentExtractTypeField,
): SerializedData {
  return val;
}
export function deserializeAiAgentExtractTypeField(
  val: SerializedData,
): AiAgentExtractTypeField {
  if (val == 'ai_agent_extract') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiAgentExtractTypeField",
  });
}
export function serializeAiAgentExtract(val: AiAgentExtract): SerializedData {
  return {
    ['type']: serializeAiAgentExtractTypeField(val.type),
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
export function deserializeAiAgentExtract(val: SerializedData): AiAgentExtract {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiAgentExtract"' });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AiAgentExtract" to be defined',
    });
  }
  const type: AiAgentExtractTypeField = deserializeAiAgentExtractTypeField(
    val.type,
  );
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
  } satisfies AiAgentExtract;
}
export function serializeAiAgentExtractInput(
  val: AiAgentExtractInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiAgentExtractTypeField(val.type),
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
export function deserializeAiAgentExtractInput(
  val: SerializedData,
): AiAgentExtractInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentExtractInput"',
    });
  }
  const type: undefined | AiAgentExtractTypeField =
    val.type == void 0 ? void 0 : deserializeAiAgentExtractTypeField(val.type);
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
  } satisfies AiAgentExtractInput;
}

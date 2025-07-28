import { serializeAiStudioAgentLongTextToolResponse } from './aiStudioAgentLongTextToolResponse.generated.js';
import { deserializeAiStudioAgentLongTextToolResponse } from './aiStudioAgentLongTextToolResponse.generated.js';
import { serializeAiStudioAgentBasicTextToolResponse } from './aiStudioAgentBasicTextToolResponse.generated.js';
import { deserializeAiStudioAgentBasicTextToolResponse } from './aiStudioAgentBasicTextToolResponse.generated.js';
import { AiStudioAgentLongTextToolResponse } from './aiStudioAgentLongTextToolResponse.generated.js';
import { AiStudioAgentBasicTextToolResponse } from './aiStudioAgentBasicTextToolResponse.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiStudioAgentExtractResponseTypeField = 'ai_agent_extract';
export class AiStudioAgentExtractResponse {
  /**
   * The type of AI agent to be used for metadata extraction. */
  readonly type: AiStudioAgentExtractResponseTypeField =
    'ai_agent_extract' as AiStudioAgentExtractResponseTypeField;
  /**
   * The state of the AI Agent capability. Possible values are: `enabled` and `disabled`. */
  readonly accessState!: string;
  /**
   * The description of the AI agent. */
  readonly description!: string;
  /**
   * Custom instructions for the AI agent. */
  readonly customInstructions?: string | null;
  readonly longText?: AiStudioAgentLongTextToolResponse;
  readonly basicText?: AiStudioAgentBasicTextToolResponse;
  readonly basicImage?: AiStudioAgentBasicTextToolResponse;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiStudioAgentExtractResponse, 'type'> &
      Partial<Pick<AiStudioAgentExtractResponse, 'type'>>,
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
    if (fields.basicImage !== undefined) {
      this.basicImage = fields.basicImage;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiStudioAgentExtractResponseInput {
  /**
   * The type of AI agent to be used for metadata extraction. */
  readonly type?: AiStudioAgentExtractResponseTypeField;
  /**
   * The state of the AI Agent capability. Possible values are: `enabled` and `disabled`. */
  readonly accessState: string;
  /**
   * The description of the AI agent. */
  readonly description: string;
  /**
   * Custom instructions for the AI agent. */
  readonly customInstructions?: string | null;
  readonly longText?: AiStudioAgentLongTextToolResponse;
  readonly basicText?: AiStudioAgentBasicTextToolResponse;
  readonly basicImage?: AiStudioAgentBasicTextToolResponse;
  readonly rawData?: SerializedData;
}
export function serializeAiStudioAgentExtractResponseTypeField(
  val: AiStudioAgentExtractResponseTypeField,
): SerializedData {
  return val;
}
export function deserializeAiStudioAgentExtractResponseTypeField(
  val: SerializedData,
): AiStudioAgentExtractResponseTypeField {
  if (val == 'ai_agent_extract') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiStudioAgentExtractResponseTypeField",
  });
}
export function serializeAiStudioAgentExtractResponse(
  val: AiStudioAgentExtractResponse,
): SerializedData {
  return {
    ['type']: serializeAiStudioAgentExtractResponseTypeField(val.type),
    ['access_state']: val.accessState,
    ['description']: val.description,
    ['custom_instructions']: val.customInstructions,
    ['long_text']:
      val.longText == void 0
        ? val.longText
        : serializeAiStudioAgentLongTextToolResponse(val.longText),
    ['basic_text']:
      val.basicText == void 0
        ? val.basicText
        : serializeAiStudioAgentBasicTextToolResponse(val.basicText),
    ['basic_image']:
      val.basicImage == void 0
        ? val.basicImage
        : serializeAiStudioAgentBasicTextToolResponse(val.basicImage),
  };
}
export function deserializeAiStudioAgentExtractResponse(
  val: SerializedData,
): AiStudioAgentExtractResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentExtractResponse"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "AiStudioAgentExtractResponse" to be defined',
    });
  }
  const type: AiStudioAgentExtractResponseTypeField =
    deserializeAiStudioAgentExtractResponseTypeField(val.type);
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiStudioAgentExtractResponse" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "AiStudioAgentExtractResponse"',
    });
  }
  const accessState: string = val.access_state;
  if (val.description == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "description" of type "AiStudioAgentExtractResponse" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AiStudioAgentExtractResponse"',
    });
  }
  const description: string = val.description;
  if (
    !(val.custom_instructions == void 0) &&
    !sdIsString(val.custom_instructions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_instructions" of type "AiStudioAgentExtractResponse"',
    });
  }
  const customInstructions: undefined | string =
    val.custom_instructions == void 0 ? void 0 : val.custom_instructions;
  const longText: undefined | AiStudioAgentLongTextToolResponse =
    val.long_text == void 0
      ? void 0
      : deserializeAiStudioAgentLongTextToolResponse(val.long_text);
  const basicText: undefined | AiStudioAgentBasicTextToolResponse =
    val.basic_text == void 0
      ? void 0
      : deserializeAiStudioAgentBasicTextToolResponse(val.basic_text);
  const basicImage: undefined | AiStudioAgentBasicTextToolResponse =
    val.basic_image == void 0
      ? void 0
      : deserializeAiStudioAgentBasicTextToolResponse(val.basic_image);
  return {
    type: type,
    accessState: accessState,
    description: description,
    customInstructions: customInstructions,
    longText: longText,
    basicText: basicText,
    basicImage: basicImage,
  } satisfies AiStudioAgentExtractResponse;
}
export function serializeAiStudioAgentExtractResponseInput(
  val: AiStudioAgentExtractResponseInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiStudioAgentExtractResponseTypeField(val.type),
    ['access_state']: val.accessState,
    ['description']: val.description,
    ['custom_instructions']: val.customInstructions,
    ['long_text']:
      val.longText == void 0
        ? val.longText
        : serializeAiStudioAgentLongTextToolResponse(val.longText),
    ['basic_text']:
      val.basicText == void 0
        ? val.basicText
        : serializeAiStudioAgentBasicTextToolResponse(val.basicText),
    ['basic_image']:
      val.basicImage == void 0
        ? val.basicImage
        : serializeAiStudioAgentBasicTextToolResponse(val.basicImage),
  };
}
export function deserializeAiStudioAgentExtractResponseInput(
  val: SerializedData,
): AiStudioAgentExtractResponseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentExtractResponseInput"',
    });
  }
  const type: undefined | AiStudioAgentExtractResponseTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiStudioAgentExtractResponseTypeField(val.type);
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiStudioAgentExtractResponseInput" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "AiStudioAgentExtractResponseInput"',
    });
  }
  const accessState: string = val.access_state;
  if (val.description == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "description" of type "AiStudioAgentExtractResponseInput" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AiStudioAgentExtractResponseInput"',
    });
  }
  const description: string = val.description;
  if (
    !(val.custom_instructions == void 0) &&
    !sdIsString(val.custom_instructions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_instructions" of type "AiStudioAgentExtractResponseInput"',
    });
  }
  const customInstructions: undefined | string =
    val.custom_instructions == void 0 ? void 0 : val.custom_instructions;
  const longText: undefined | AiStudioAgentLongTextToolResponse =
    val.long_text == void 0
      ? void 0
      : deserializeAiStudioAgentLongTextToolResponse(val.long_text);
  const basicText: undefined | AiStudioAgentBasicTextToolResponse =
    val.basic_text == void 0
      ? void 0
      : deserializeAiStudioAgentBasicTextToolResponse(val.basic_text);
  const basicImage: undefined | AiStudioAgentBasicTextToolResponse =
    val.basic_image == void 0
      ? void 0
      : deserializeAiStudioAgentBasicTextToolResponse(val.basic_image);
  return {
    type: type,
    accessState: accessState,
    description: description,
    customInstructions: customInstructions,
    longText: longText,
    basicText: basicText,
    basicImage: basicImage,
  } satisfies AiStudioAgentExtractResponseInput;
}

import { serializeAiStudioAgentBasicGenToolResponse } from './aiStudioAgentBasicGenToolResponse.generated.js';
import { deserializeAiStudioAgentBasicGenToolResponse } from './aiStudioAgentBasicGenToolResponse.generated.js';
import { AiStudioAgentBasicGenToolResponse } from './aiStudioAgentBasicGenToolResponse.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiStudioAgentTextGenResponseTypeField = 'ai_agent_text_gen';
export class AiStudioAgentTextGenResponse {
  /**
   * The type of AI agent used for generating text. */
  readonly type: AiStudioAgentTextGenResponseTypeField =
    'ai_agent_text_gen' as AiStudioAgentTextGenResponseTypeField;
  /**
   * The state of the AI Agent capability. Possible values are: `enabled` and `disabled`. */
  readonly accessState!: string;
  /**
   * The description of the AI agent. */
  readonly description!: string;
  /**
   * Custom instructions for the AI agent. */
  readonly customInstructions?: string | null;
  /**
   * Suggested questions for the AI agent. If null, suggested question will be generated. If empty, no suggested questions will be displayed. */
  readonly suggestedQuestions?: readonly string[];
  readonly basicGen?: AiStudioAgentBasicGenToolResponse;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiStudioAgentTextGenResponse, 'type'> &
      Partial<Pick<AiStudioAgentTextGenResponse, 'type'>>,
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
    if (fields.suggestedQuestions !== undefined) {
      this.suggestedQuestions = fields.suggestedQuestions;
    }
    if (fields.basicGen !== undefined) {
      this.basicGen = fields.basicGen;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiStudioAgentTextGenResponseInput {
  /**
   * The type of AI agent used for generating text. */
  readonly type?: AiStudioAgentTextGenResponseTypeField;
  /**
   * The state of the AI Agent capability. Possible values are: `enabled` and `disabled`. */
  readonly accessState: string;
  /**
   * The description of the AI agent. */
  readonly description: string;
  /**
   * Custom instructions for the AI agent. */
  readonly customInstructions?: string | null;
  /**
   * Suggested questions for the AI agent. If null, suggested question will be generated. If empty, no suggested questions will be displayed. */
  readonly suggestedQuestions?: readonly string[];
  readonly basicGen?: AiStudioAgentBasicGenToolResponse;
  readonly rawData?: SerializedData;
}
export function serializeAiStudioAgentTextGenResponseTypeField(
  val: AiStudioAgentTextGenResponseTypeField,
): SerializedData {
  return val;
}
export function deserializeAiStudioAgentTextGenResponseTypeField(
  val: SerializedData,
): AiStudioAgentTextGenResponseTypeField {
  if (val == 'ai_agent_text_gen') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiStudioAgentTextGenResponseTypeField",
  });
}
export function serializeAiStudioAgentTextGenResponse(
  val: AiStudioAgentTextGenResponse,
): SerializedData {
  return {
    ['type']: serializeAiStudioAgentTextGenResponseTypeField(val.type),
    ['access_state']: val.accessState,
    ['description']: val.description,
    ['custom_instructions']: val.customInstructions,
    ['suggested_questions']:
      val.suggestedQuestions == void 0
        ? val.suggestedQuestions
        : (val.suggestedQuestions.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['basic_gen']:
      val.basicGen == void 0
        ? val.basicGen
        : serializeAiStudioAgentBasicGenToolResponse(val.basicGen),
  };
}
export function deserializeAiStudioAgentTextGenResponse(
  val: SerializedData,
): AiStudioAgentTextGenResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentTextGenResponse"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "AiStudioAgentTextGenResponse" to be defined',
    });
  }
  const type: AiStudioAgentTextGenResponseTypeField =
    deserializeAiStudioAgentTextGenResponseTypeField(val.type);
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiStudioAgentTextGenResponse" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "AiStudioAgentTextGenResponse"',
    });
  }
  const accessState: string = val.access_state;
  if (val.description == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "description" of type "AiStudioAgentTextGenResponse" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AiStudioAgentTextGenResponse"',
    });
  }
  const description: string = val.description;
  if (
    !(val.custom_instructions == void 0) &&
    !sdIsString(val.custom_instructions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_instructions" of type "AiStudioAgentTextGenResponse"',
    });
  }
  const customInstructions: undefined | string =
    val.custom_instructions == void 0 ? void 0 : val.custom_instructions;
  if (
    !(val.suggested_questions == void 0) &&
    !sdIsList(val.suggested_questions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "suggested_questions" of type "AiStudioAgentTextGenResponse"',
    });
  }
  const suggestedQuestions: undefined | readonly string[] =
    val.suggested_questions == void 0
      ? void 0
      : sdIsList(val.suggested_questions)
        ? (val.suggested_questions.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message: 'Expecting string for "AiStudioAgentTextGenResponse"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  const basicGen: undefined | AiStudioAgentBasicGenToolResponse =
    val.basic_gen == void 0
      ? void 0
      : deserializeAiStudioAgentBasicGenToolResponse(val.basic_gen);
  return {
    type: type,
    accessState: accessState,
    description: description,
    customInstructions: customInstructions,
    suggestedQuestions: suggestedQuestions,
    basicGen: basicGen,
  } satisfies AiStudioAgentTextGenResponse;
}
export function serializeAiStudioAgentTextGenResponseInput(
  val: AiStudioAgentTextGenResponseInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiStudioAgentTextGenResponseTypeField(val.type),
    ['access_state']: val.accessState,
    ['description']: val.description,
    ['custom_instructions']: val.customInstructions,
    ['suggested_questions']:
      val.suggestedQuestions == void 0
        ? val.suggestedQuestions
        : (val.suggestedQuestions.map(function (item: string): SerializedData {
            return item;
          }) as readonly any[]),
    ['basic_gen']:
      val.basicGen == void 0
        ? val.basicGen
        : serializeAiStudioAgentBasicGenToolResponse(val.basicGen),
  };
}
export function deserializeAiStudioAgentTextGenResponseInput(
  val: SerializedData,
): AiStudioAgentTextGenResponseInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentTextGenResponseInput"',
    });
  }
  const type: undefined | AiStudioAgentTextGenResponseTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiStudioAgentTextGenResponseTypeField(val.type);
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiStudioAgentTextGenResponseInput" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "AiStudioAgentTextGenResponseInput"',
    });
  }
  const accessState: string = val.access_state;
  if (val.description == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "description" of type "AiStudioAgentTextGenResponseInput" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AiStudioAgentTextGenResponseInput"',
    });
  }
  const description: string = val.description;
  if (
    !(val.custom_instructions == void 0) &&
    !sdIsString(val.custom_instructions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_instructions" of type "AiStudioAgentTextGenResponseInput"',
    });
  }
  const customInstructions: undefined | string =
    val.custom_instructions == void 0 ? void 0 : val.custom_instructions;
  if (
    !(val.suggested_questions == void 0) &&
    !sdIsList(val.suggested_questions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting array for "suggested_questions" of type "AiStudioAgentTextGenResponseInput"',
    });
  }
  const suggestedQuestions: undefined | readonly string[] =
    val.suggested_questions == void 0
      ? void 0
      : sdIsList(val.suggested_questions)
        ? (val.suggested_questions.map(function (itm: SerializedData): string {
            if (!sdIsString(itm)) {
              throw new BoxSdkError({
                message:
                  'Expecting string for "AiStudioAgentTextGenResponseInput"',
              });
            }
            return itm;
          }) as readonly any[])
        : [];
  const basicGen: undefined | AiStudioAgentBasicGenToolResponse =
    val.basic_gen == void 0
      ? void 0
      : deserializeAiStudioAgentBasicGenToolResponse(val.basic_gen);
  return {
    type: type,
    accessState: accessState,
    description: description,
    customInstructions: customInstructions,
    suggestedQuestions: suggestedQuestions,
    basicGen: basicGen,
  } satisfies AiStudioAgentTextGenResponseInput;
}

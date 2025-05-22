import { serializeAiStudioAgentBasicGenTool } from './aiStudioAgentBasicGenTool.generated.js';
import { deserializeAiStudioAgentBasicGenTool } from './aiStudioAgentBasicGenTool.generated.js';
import { AiStudioAgentBasicGenTool } from './aiStudioAgentBasicGenTool.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiStudioAgentTextGenTypeField = 'ai_agent_text_gen';
export class AiStudioAgentTextGen {
  /**
   * The type of AI agent used for generating text. */
  readonly type: AiStudioAgentTextGenTypeField =
    'ai_agent_text_gen' as AiStudioAgentTextGenTypeField;
  /**
   * The state of the AI Agent capability. Possible values are: `enabled` and `disabled`. */
  readonly accessState!: string;
  /**
   * The description of the AI Agent. */
  readonly description!: string;
  /**
   * Custom instructions for the agent. */
  readonly customInstructions?: string | null;
  readonly basicGen?: AiStudioAgentBasicGenTool;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiStudioAgentTextGen, 'type'> &
      Partial<Pick<AiStudioAgentTextGen, 'type'>>,
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
    if (fields.basicGen !== undefined) {
      this.basicGen = fields.basicGen;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiStudioAgentTextGenInput {
  /**
   * The type of AI agent used for generating text. */
  readonly type?: AiStudioAgentTextGenTypeField;
  /**
   * The state of the AI Agent capability. Possible values are: `enabled` and `disabled`. */
  readonly accessState: string;
  /**
   * The description of the AI Agent. */
  readonly description: string;
  /**
   * Custom instructions for the agent. */
  readonly customInstructions?: string | null;
  readonly basicGen?: AiStudioAgentBasicGenTool;
  readonly rawData?: SerializedData;
}
export function serializeAiStudioAgentTextGenTypeField(
  val: AiStudioAgentTextGenTypeField,
): SerializedData {
  return val;
}
export function deserializeAiStudioAgentTextGenTypeField(
  val: SerializedData,
): AiStudioAgentTextGenTypeField {
  if (val == 'ai_agent_text_gen') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiStudioAgentTextGenTypeField",
  });
}
export function serializeAiStudioAgentTextGen(
  val: AiStudioAgentTextGen,
): SerializedData {
  return {
    ['type']: serializeAiStudioAgentTextGenTypeField(val.type),
    ['access_state']: val.accessState,
    ['description']: val.description,
    ['custom_instructions']: val.customInstructions,
    ['basic_gen']:
      val.basicGen == void 0
        ? val.basicGen
        : serializeAiStudioAgentBasicGenTool(val.basicGen),
  };
}
export function deserializeAiStudioAgentTextGen(
  val: SerializedData,
): AiStudioAgentTextGen {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentTextGen"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AiStudioAgentTextGen" to be defined',
    });
  }
  const type: AiStudioAgentTextGenTypeField =
    deserializeAiStudioAgentTextGenTypeField(val.type);
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiStudioAgentTextGen" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "AiStudioAgentTextGen"',
    });
  }
  const accessState: string = val.access_state;
  if (val.description == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "description" of type "AiStudioAgentTextGen" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AiStudioAgentTextGen"',
    });
  }
  const description: string = val.description;
  if (
    !(val.custom_instructions == void 0) &&
    !sdIsString(val.custom_instructions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_instructions" of type "AiStudioAgentTextGen"',
    });
  }
  const customInstructions: undefined | string =
    val.custom_instructions == void 0 ? void 0 : val.custom_instructions;
  const basicGen: undefined | AiStudioAgentBasicGenTool =
    val.basic_gen == void 0
      ? void 0
      : deserializeAiStudioAgentBasicGenTool(val.basic_gen);
  return {
    type: type,
    accessState: accessState,
    description: description,
    customInstructions: customInstructions,
    basicGen: basicGen,
  } satisfies AiStudioAgentTextGen;
}
export function serializeAiStudioAgentTextGenInput(
  val: AiStudioAgentTextGenInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiStudioAgentTextGenTypeField(val.type),
    ['access_state']: val.accessState,
    ['description']: val.description,
    ['custom_instructions']: val.customInstructions,
    ['basic_gen']:
      val.basicGen == void 0
        ? val.basicGen
        : serializeAiStudioAgentBasicGenTool(val.basicGen),
  };
}
export function deserializeAiStudioAgentTextGenInput(
  val: SerializedData,
): AiStudioAgentTextGenInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiStudioAgentTextGenInput"',
    });
  }
  const type: undefined | AiStudioAgentTextGenTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiStudioAgentTextGenTypeField(val.type);
  if (val.access_state == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "access_state" of type "AiStudioAgentTextGenInput" to be defined',
    });
  }
  if (!sdIsString(val.access_state)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "access_state" of type "AiStudioAgentTextGenInput"',
    });
  }
  const accessState: string = val.access_state;
  if (val.description == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "description" of type "AiStudioAgentTextGenInput" to be defined',
    });
  }
  if (!sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AiStudioAgentTextGenInput"',
    });
  }
  const description: string = val.description;
  if (
    !(val.custom_instructions == void 0) &&
    !sdIsString(val.custom_instructions)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting string for "custom_instructions" of type "AiStudioAgentTextGenInput"',
    });
  }
  const customInstructions: undefined | string =
    val.custom_instructions == void 0 ? void 0 : val.custom_instructions;
  const basicGen: undefined | AiStudioAgentBasicGenTool =
    val.basic_gen == void 0
      ? void 0
      : deserializeAiStudioAgentBasicGenTool(val.basic_gen);
  return {
    type: type,
    accessState: accessState,
    description: description,
    customInstructions: customInstructions,
    basicGen: basicGen,
  } satisfies AiStudioAgentTextGenInput;
}

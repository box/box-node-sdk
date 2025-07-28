import { serializeAiAgentBasicGenTool } from './aiAgentBasicGenTool.generated.js';
import { deserializeAiAgentBasicGenTool } from './aiAgentBasicGenTool.generated.js';
import { AiAgentBasicGenTool } from './aiAgentBasicGenTool.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgentTextGenTypeField = 'ai_agent_text_gen';
export class AiAgentTextGen {
  /**
   * The type of AI agent used for generating text. */
  readonly type: AiAgentTextGenTypeField =
    'ai_agent_text_gen' as AiAgentTextGenTypeField;
  readonly basicGen?: AiAgentBasicGenTool;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiAgentTextGen, 'type'> &
      Partial<Pick<AiAgentTextGen, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.basicGen !== undefined) {
      this.basicGen = fields.basicGen;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiAgentTextGenInput {
  /**
   * The type of AI agent used for generating text. */
  readonly type?: AiAgentTextGenTypeField;
  readonly basicGen?: AiAgentBasicGenTool;
  readonly rawData?: SerializedData;
}
export function serializeAiAgentTextGenTypeField(
  val: AiAgentTextGenTypeField,
): SerializedData {
  return val;
}
export function deserializeAiAgentTextGenTypeField(
  val: SerializedData,
): AiAgentTextGenTypeField {
  if (val == 'ai_agent_text_gen') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiAgentTextGenTypeField",
  });
}
export function serializeAiAgentTextGen(val: AiAgentTextGen): SerializedData {
  return {
    ['type']: serializeAiAgentTextGenTypeField(val.type),
    ['basic_gen']:
      val.basicGen == void 0
        ? val.basicGen
        : serializeAiAgentBasicGenTool(val.basicGen),
  };
}
export function deserializeAiAgentTextGen(val: SerializedData): AiAgentTextGen {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiAgentTextGen"' });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "type" of type "AiAgentTextGen" to be defined',
    });
  }
  const type: AiAgentTextGenTypeField = deserializeAiAgentTextGenTypeField(
    val.type,
  );
  const basicGen: undefined | AiAgentBasicGenTool =
    val.basic_gen == void 0
      ? void 0
      : deserializeAiAgentBasicGenTool(val.basic_gen);
  return { type: type, basicGen: basicGen } satisfies AiAgentTextGen;
}
export function serializeAiAgentTextGenInput(
  val: AiAgentTextGenInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiAgentTextGenTypeField(val.type),
    ['basic_gen']:
      val.basicGen == void 0
        ? val.basicGen
        : serializeAiAgentBasicGenTool(val.basicGen),
  };
}
export function deserializeAiAgentTextGenInput(
  val: SerializedData,
): AiAgentTextGenInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentTextGenInput"',
    });
  }
  const type: undefined | AiAgentTextGenTypeField =
    val.type == void 0 ? void 0 : deserializeAiAgentTextGenTypeField(val.type);
  const basicGen: undefined | AiAgentBasicGenTool =
    val.basic_gen == void 0
      ? void 0
      : deserializeAiAgentBasicGenTool(val.basic_gen);
  return { type: type, basicGen: basicGen } satisfies AiAgentTextGenInput;
}

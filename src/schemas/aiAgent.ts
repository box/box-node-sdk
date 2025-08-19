import { serializeAiAgentAsk } from './aiAgentAsk.js';
import { deserializeAiAgentAsk } from './aiAgentAsk.js';
import { serializeAiAgentTextGen } from './aiAgentTextGen.js';
import { deserializeAiAgentTextGen } from './aiAgentTextGen.js';
import { serializeAiAgentExtract } from './aiAgentExtract.js';
import { deserializeAiAgentExtract } from './aiAgentExtract.js';
import { serializeAiAgentExtractStructured } from './aiAgentExtractStructured.js';
import { deserializeAiAgentExtractStructured } from './aiAgentExtractStructured.js';
import { AiAgentAsk } from './aiAgentAsk.js';
import { AiAgentTextGen } from './aiAgentTextGen.js';
import { AiAgentExtract } from './aiAgentExtract.js';
import { AiAgentExtractStructured } from './aiAgentExtractStructured.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgent =
  | AiAgentAsk
  | AiAgentTextGen
  | AiAgentExtract
  | AiAgentExtractStructured;
export function serializeAiAgent(val: any): SerializedData {
  if (val.type == 'ai_agent_ask') {
    return serializeAiAgentAsk(val);
  }
  if (val.type == 'ai_agent_text_gen') {
    return serializeAiAgentTextGen(val);
  }
  if (val.type == 'ai_agent_extract') {
    return serializeAiAgentExtract(val);
  }
  if (val.type == 'ai_agent_extract_structured') {
    return serializeAiAgentExtractStructured(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiAgent(val: SerializedData): AiAgent {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiAgent"' });
  }
  if (val.type == 'ai_agent_ask') {
    return deserializeAiAgentAsk(val);
  }
  if (val.type == 'ai_agent_text_gen') {
    return deserializeAiAgentTextGen(val);
  }
  if (val.type == 'ai_agent_extract') {
    return deserializeAiAgentExtract(val);
  }
  if (val.type == 'ai_agent_extract_structured') {
    return deserializeAiAgentExtractStructured(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize AiAgent" });
}

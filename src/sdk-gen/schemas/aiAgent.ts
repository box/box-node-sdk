import { serializeAiAgentAsk } from './aiAgentAsk';
import { deserializeAiAgentAsk } from './aiAgentAsk';
import { serializeAiAgentTextGen } from './aiAgentTextGen';
import { deserializeAiAgentTextGen } from './aiAgentTextGen';
import { serializeAiAgentExtract } from './aiAgentExtract';
import { deserializeAiAgentExtract } from './aiAgentExtract';
import { serializeAiAgentExtractStructured } from './aiAgentExtractStructured';
import { deserializeAiAgentExtractStructured } from './aiAgentExtractStructured';
import { AiAgentAsk } from './aiAgentAsk';
import { AiAgentTextGen } from './aiAgentTextGen';
import { AiAgentExtract } from './aiAgentExtract';
import { AiAgentExtractStructured } from './aiAgentExtractStructured';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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

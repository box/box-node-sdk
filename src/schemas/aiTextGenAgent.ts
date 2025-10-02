import { serializeAiAgentReference } from './aiAgentReference';
import { deserializeAiAgentReference } from './aiAgentReference';
import { serializeAiAgentTextGen } from './aiAgentTextGen';
import { deserializeAiAgentTextGen } from './aiAgentTextGen';
import { AiAgentReference } from './aiAgentReference';
import { AiAgentTextGen } from './aiAgentTextGen';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiTextGenAgent = AiAgentReference | AiAgentTextGen;
export function serializeAiTextGenAgent(val: any): SerializedData {
  if (val.type == 'ai_agent_id') {
    return serializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_text_gen') {
    return serializeAiAgentTextGen(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiTextGenAgent(val: SerializedData): AiTextGenAgent {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiTextGenAgent"' });
  }
  if (val.type == 'ai_agent_id') {
    return deserializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_text_gen') {
    return deserializeAiAgentTextGen(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize AiTextGenAgent" });
}

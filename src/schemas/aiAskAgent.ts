import { serializeAiAgentReference } from './aiAgentReference';
import { deserializeAiAgentReference } from './aiAgentReference';
import { serializeAiAgentAsk } from './aiAgentAsk';
import { deserializeAiAgentAsk } from './aiAgentAsk';
import { AiAgentReference } from './aiAgentReference';
import { AiAgentAsk } from './aiAgentAsk';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiAskAgent = AiAgentReference | AiAgentAsk;
export function serializeAiAskAgent(val: any): SerializedData {
  if (val.type == 'ai_agent_id') {
    return serializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_ask') {
    return serializeAiAgentAsk(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiAskAgent(val: SerializedData): AiAskAgent {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiAskAgent"' });
  }
  if (val.type == 'ai_agent_id') {
    return deserializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_ask') {
    return deserializeAiAgentAsk(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize AiAskAgent" });
}

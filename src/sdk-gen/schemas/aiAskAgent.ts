import { serializeAiAgentReference } from './aiAgentReference.js';
import { deserializeAiAgentReference } from './aiAgentReference.js';
import { serializeAiAgentAsk } from './aiAgentAsk.js';
import { deserializeAiAgentAsk } from './aiAgentAsk.js';
import { AiAgentReference } from './aiAgentReference.js';
import { AiAgentAsk } from './aiAgentAsk.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

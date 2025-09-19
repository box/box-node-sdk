import { serializeAiAgentReference } from './aiAgentReference.js';
import { deserializeAiAgentReference } from './aiAgentReference.js';
import { serializeAiAgentExtract } from './aiAgentExtract.js';
import { deserializeAiAgentExtract } from './aiAgentExtract.js';
import { AiAgentReference } from './aiAgentReference.js';
import { AiAgentExtract } from './aiAgentExtract.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiExtractAgent = AiAgentReference | AiAgentExtract;
export function serializeAiExtractAgent(val: any): SerializedData {
  if (val.type == 'ai_agent_id') {
    return serializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_extract') {
    return serializeAiAgentExtract(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiExtractAgent(val: SerializedData): AiExtractAgent {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiExtractAgent"' });
  }
  if (val.type == 'ai_agent_id') {
    return deserializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_extract') {
    return deserializeAiAgentExtract(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize AiExtractAgent" });
}

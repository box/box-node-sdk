import { serializeAiAgentReference } from './aiAgentReference';
import { deserializeAiAgentReference } from './aiAgentReference';
import { serializeAiAgentExtract } from './aiAgentExtract';
import { deserializeAiAgentExtract } from './aiAgentExtract';
import { AiAgentReference } from './aiAgentReference';
import { AiAgentExtract } from './aiAgentExtract';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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

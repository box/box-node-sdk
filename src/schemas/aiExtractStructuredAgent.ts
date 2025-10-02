import { serializeAiAgentReference } from './aiAgentReference';
import { deserializeAiAgentReference } from './aiAgentReference';
import { serializeAiAgentExtractStructured } from './aiAgentExtractStructured';
import { deserializeAiAgentExtractStructured } from './aiAgentExtractStructured';
import { AiAgentReference } from './aiAgentReference';
import { AiAgentExtractStructured } from './aiAgentExtractStructured';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiExtractStructuredAgent =
  | AiAgentReference
  | AiAgentExtractStructured;
export function serializeAiExtractStructuredAgent(val: any): SerializedData {
  if (val.type == 'ai_agent_id') {
    return serializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_extract_structured') {
    return serializeAiAgentExtractStructured(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiExtractStructuredAgent(
  val: SerializedData,
): AiExtractStructuredAgent {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiExtractStructuredAgent"',
    });
  }
  if (val.type == 'ai_agent_id') {
    return deserializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_extract_structured') {
    return deserializeAiAgentExtractStructured(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiExtractStructuredAgent",
  });
}

import { serializeAiAgentReference } from './aiAgentReference.js';
import { deserializeAiAgentReference } from './aiAgentReference.js';
import { serializeAiAgentExtractStructured } from './aiAgentExtractStructured.js';
import { deserializeAiAgentExtractStructured } from './aiAgentExtractStructured.js';
import { AiAgentReference } from './aiAgentReference.js';
import { AiAgentExtractStructured } from './aiAgentExtractStructured.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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

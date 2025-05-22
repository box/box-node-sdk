import { serializeAiAgentExtractStructured } from './aiAgentExtractStructured.generated.js';
import { deserializeAiAgentExtractStructured } from './aiAgentExtractStructured.generated.js';
import { serializeAiAgentReference } from './aiAgentReference.generated.js';
import { deserializeAiAgentReference } from './aiAgentReference.generated.js';
import { AiAgentExtractStructured } from './aiAgentExtractStructured.generated.js';
import { AiAgentReference } from './aiAgentReference.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgentExtractStructuredOrAiAgentReference =
  | AiAgentExtractStructured
  | AiAgentReference;
export function serializeAiAgentExtractStructuredOrAiAgentReference(
  val: any,
): SerializedData {
  if (val.type == 'ai_agent_extract_structured') {
    return serializeAiAgentExtractStructured(val);
  }
  if (val.type == 'ai_agent_id') {
    return serializeAiAgentReference(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiAgentExtractStructuredOrAiAgentReference(
  val: SerializedData,
): AiAgentExtractStructuredOrAiAgentReference {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AiAgentExtractStructuredOrAiAgentReference"',
    });
  }
  if (val.type == 'ai_agent_extract_structured') {
    return deserializeAiAgentExtractStructured(val);
  }
  if (val.type == 'ai_agent_id') {
    return deserializeAiAgentReference(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiAgentExtractStructuredOrAiAgentReference",
  });
}

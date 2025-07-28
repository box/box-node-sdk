import { serializeAiAgentExtract } from './aiAgentExtract.generated.js';
import { deserializeAiAgentExtract } from './aiAgentExtract.generated.js';
import { serializeAiAgentReference } from './aiAgentReference.generated.js';
import { deserializeAiAgentReference } from './aiAgentReference.generated.js';
import { AiAgentExtract } from './aiAgentExtract.generated.js';
import { AiAgentReference } from './aiAgentReference.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgentExtractOrAiAgentReference =
  | AiAgentExtract
  | AiAgentReference;
export function serializeAiAgentExtractOrAiAgentReference(
  val: any,
): SerializedData {
  if (val.type == 'ai_agent_extract') {
    return serializeAiAgentExtract(val);
  }
  if (val.type == 'ai_agent_id') {
    return serializeAiAgentReference(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiAgentExtractOrAiAgentReference(
  val: SerializedData,
): AiAgentExtractOrAiAgentReference {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentExtractOrAiAgentReference"',
    });
  }
  if (val.type == 'ai_agent_extract') {
    return deserializeAiAgentExtract(val);
  }
  if (val.type == 'ai_agent_id') {
    return deserializeAiAgentReference(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiAgentExtractOrAiAgentReference",
  });
}

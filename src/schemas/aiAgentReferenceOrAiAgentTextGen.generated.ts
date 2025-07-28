import { serializeAiAgentReference } from './aiAgentReference.generated.js';
import { deserializeAiAgentReference } from './aiAgentReference.generated.js';
import { serializeAiAgentTextGen } from './aiAgentTextGen.generated.js';
import { deserializeAiAgentTextGen } from './aiAgentTextGen.generated.js';
import { AiAgentReference } from './aiAgentReference.generated.js';
import { AiAgentTextGen } from './aiAgentTextGen.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgentReferenceOrAiAgentTextGen =
  | AiAgentReference
  | AiAgentTextGen;
export function serializeAiAgentReferenceOrAiAgentTextGen(
  val: any,
): SerializedData {
  if (val.type == 'ai_agent_id') {
    return serializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_text_gen') {
    return serializeAiAgentTextGen(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiAgentReferenceOrAiAgentTextGen(
  val: SerializedData,
): AiAgentReferenceOrAiAgentTextGen {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentReferenceOrAiAgentTextGen"',
    });
  }
  if (val.type == 'ai_agent_id') {
    return deserializeAiAgentReference(val);
  }
  if (val.type == 'ai_agent_text_gen') {
    return deserializeAiAgentTextGen(val);
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiAgentReferenceOrAiAgentTextGen",
  });
}

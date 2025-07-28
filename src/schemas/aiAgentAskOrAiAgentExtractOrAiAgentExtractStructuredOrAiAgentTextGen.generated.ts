import { serializeAiAgentAsk } from './aiAgentAsk.generated.js';
import { deserializeAiAgentAsk } from './aiAgentAsk.generated.js';
import { serializeAiAgentExtract } from './aiAgentExtract.generated.js';
import { deserializeAiAgentExtract } from './aiAgentExtract.generated.js';
import { serializeAiAgentExtractStructured } from './aiAgentExtractStructured.generated.js';
import { deserializeAiAgentExtractStructured } from './aiAgentExtractStructured.generated.js';
import { serializeAiAgentTextGen } from './aiAgentTextGen.generated.js';
import { deserializeAiAgentTextGen } from './aiAgentTextGen.generated.js';
import { AiAgentAsk } from './aiAgentAsk.generated.js';
import { AiAgentExtract } from './aiAgentExtract.generated.js';
import { AiAgentExtractStructured } from './aiAgentExtractStructured.generated.js';
import { AiAgentTextGen } from './aiAgentTextGen.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen =
  AiAgentAsk | AiAgentExtract | AiAgentExtractStructured | AiAgentTextGen;
export function serializeAiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen(
  val: any,
): SerializedData {
  if (val.type == 'ai_agent_ask') {
    return serializeAiAgentAsk(val);
  }
  if (val.type == 'ai_agent_extract') {
    return serializeAiAgentExtract(val);
  }
  if (val.type == 'ai_agent_extract_structured') {
    return serializeAiAgentExtractStructured(val);
  }
  if (val.type == 'ai_agent_text_gen') {
    return serializeAiAgentTextGen(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen(
  val: SerializedData,
): AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen"',
    });
  }
  if (val.type == 'ai_agent_ask') {
    return deserializeAiAgentAsk(val);
  }
  if (val.type == 'ai_agent_extract') {
    return deserializeAiAgentExtract(val);
  }
  if (val.type == 'ai_agent_extract_structured') {
    return deserializeAiAgentExtractStructured(val);
  }
  if (val.type == 'ai_agent_text_gen') {
    return deserializeAiAgentTextGen(val);
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen",
  });
}

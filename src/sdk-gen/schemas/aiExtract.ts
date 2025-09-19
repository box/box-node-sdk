import { serializeAiAgentReference } from './aiAgentReference.js';
import { deserializeAiAgentReference } from './aiAgentReference.js';
import { serializeAiAgentExtract } from './aiAgentExtract.js';
import { deserializeAiAgentExtract } from './aiAgentExtract.js';
import { serializeAiItemBase } from './aiItemBase.js';
import { deserializeAiItemBase } from './aiItemBase.js';
import { serializeAiExtractAgent } from './aiExtractAgent.js';
import { deserializeAiExtractAgent } from './aiExtractAgent.js';
import { AiAgentReference } from './aiAgentReference.js';
import { AiAgentExtract } from './aiAgentExtract.js';
import { AiItemBase } from './aiItemBase.js';
import { AiExtractAgent } from './aiExtractAgent.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface AiExtract {
  /**
   * The prompt provided to a Large Language Model (LLM) in the request. The prompt can be up to 10000 characters long and it can be an XML or a JSON schema. */
  readonly prompt: string;
  /**
   * The items that LLM will process. Currently, you can use files only. */
  readonly items: readonly AiItemBase[];
  readonly aiAgent?: AiExtractAgent;
  readonly rawData?: SerializedData;
}
export function serializeAiExtract(val: AiExtract): SerializedData {
  return {
    ['prompt']: val.prompt,
    ['items']: val.items.map(function (item: AiItemBase): SerializedData {
      return serializeAiItemBase(item);
    }) as readonly any[],
    ['ai_agent']:
      val.aiAgent == void 0
        ? val.aiAgent
        : serializeAiExtractAgent(val.aiAgent),
  };
}
export function deserializeAiExtract(val: SerializedData): AiExtract {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "AiExtract"' });
  }
  if (val.prompt == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "prompt" of type "AiExtract" to be defined',
    });
  }
  if (!sdIsString(val.prompt)) {
    throw new BoxSdkError({
      message: 'Expecting string for "prompt" of type "AiExtract"',
    });
  }
  const prompt: string = val.prompt;
  if (val.items == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "items" of type "AiExtract" to be defined',
    });
  }
  if (!sdIsList(val.items)) {
    throw new BoxSdkError({
      message: 'Expecting array for "items" of type "AiExtract"',
    });
  }
  const items: readonly AiItemBase[] = sdIsList(val.items)
    ? (val.items.map(function (itm: SerializedData): AiItemBase {
        return deserializeAiItemBase(itm);
      }) as readonly any[])
    : [];
  const aiAgent: undefined | AiExtractAgent =
    val.ai_agent == void 0 ? void 0 : deserializeAiExtractAgent(val.ai_agent);
  return { prompt: prompt, items: items, aiAgent: aiAgent } satisfies AiExtract;
}

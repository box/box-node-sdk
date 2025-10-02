import { serializeAiAgentReference } from './aiAgentReference';
import { deserializeAiAgentReference } from './aiAgentReference';
import { serializeAiAgentExtract } from './aiAgentExtract';
import { deserializeAiAgentExtract } from './aiAgentExtract';
import { serializeAiItemBase } from './aiItemBase';
import { deserializeAiItemBase } from './aiItemBase';
import { serializeAiExtractAgent } from './aiExtractAgent';
import { deserializeAiExtractAgent } from './aiExtractAgent';
import { AiAgentReference } from './aiAgentReference';
import { AiAgentExtract } from './aiAgentExtract';
import { AiItemBase } from './aiItemBase';
import { AiExtractAgent } from './aiExtractAgent';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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

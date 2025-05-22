import { serializeAiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi.generated.js';
import { deserializeAiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi.generated.js';
import { serializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.generated.js';
import { deserializeAiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.generated.js';
import { serializeAiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen.generated.js';
import { deserializeAiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen.generated.js';
import { serializeAiAgentLongTextToolTextGenEmbeddingsField } from './aiAgentLongTextToolTextGen.generated.js';
import { deserializeAiAgentLongTextToolTextGenEmbeddingsField } from './aiAgentLongTextToolTextGen.generated.js';
import { serializeAiAgentLongTextToolTextGen } from './aiAgentLongTextToolTextGen.generated.js';
import { deserializeAiAgentLongTextToolTextGen } from './aiAgentLongTextToolTextGen.generated.js';
import { AiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi.generated.js';
import { AiAgentBasicTextToolBase } from './aiAgentBasicTextToolBase.generated.js';
import { AiAgentBasicTextToolTextGen } from './aiAgentBasicTextToolTextGen.generated.js';
import { AiAgentLongTextToolTextGenEmbeddingsField } from './aiAgentLongTextToolTextGen.generated.js';
import { AiAgentLongTextToolTextGen } from './aiAgentLongTextToolTextGen.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiAgentBasicGenTool = AiAgentLongTextToolTextGen & {
  /**
   * How the content should be included in a request to the LLM.
   * Input for `{content}` is optional, depending on the use. */
  readonly contentTemplate?: string;
};
export function serializeAiAgentBasicGenTool(
  val: AiAgentBasicGenTool,
): SerializedData {
  const base: any = serializeAiAgentLongTextToolTextGen(val);
  if (!sdIsMap(base)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentBasicGenTool"',
    });
  }
  return { ...base, ...{ ['content_template']: val.contentTemplate } };
}
export function deserializeAiAgentBasicGenTool(
  val: SerializedData,
): AiAgentBasicGenTool {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiAgentBasicGenTool"',
    });
  }
  if (!(val.content_template == void 0) && !sdIsString(val.content_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "content_template" of type "AiAgentBasicGenTool"',
    });
  }
  const contentTemplate: undefined | string =
    val.content_template == void 0 ? void 0 : val.content_template;
  const embeddings: undefined | AiAgentLongTextToolTextGenEmbeddingsField =
    val.embeddings == void 0
      ? void 0
      : deserializeAiAgentLongTextToolTextGenEmbeddingsField(val.embeddings);
  if (!(val.system_message == void 0) && !sdIsString(val.system_message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "system_message" of type "AiAgentBasicGenTool"',
    });
  }
  const systemMessage: undefined | string =
    val.system_message == void 0 ? void 0 : val.system_message;
  if (!(val.prompt_template == void 0) && !sdIsString(val.prompt_template)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "prompt_template" of type "AiAgentBasicGenTool"',
    });
  }
  const promptTemplate: undefined | string =
    val.prompt_template == void 0 ? void 0 : val.prompt_template;
  if (!(val.model == void 0) && !sdIsString(val.model)) {
    throw new BoxSdkError({
      message: 'Expecting string for "model" of type "AiAgentBasicGenTool"',
    });
  }
  const model: undefined | string = val.model == void 0 ? void 0 : val.model;
  if (
    !(val.num_tokens_for_completion == void 0) &&
    !sdIsNumber(val.num_tokens_for_completion)
  ) {
    throw new BoxSdkError({
      message:
        'Expecting number for "num_tokens_for_completion" of type "AiAgentBasicGenTool"',
    });
  }
  const numTokensForCompletion: undefined | number =
    val.num_tokens_for_completion == void 0
      ? void 0
      : val.num_tokens_for_completion;
  const llmEndpointParams:
    | undefined
    | AiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi =
    val.llm_endpoint_params == void 0
      ? void 0
      : deserializeAiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi(
          val.llm_endpoint_params,
        );
  return {
    contentTemplate: contentTemplate,
    embeddings: embeddings,
    systemMessage: systemMessage,
    promptTemplate: promptTemplate,
    model: model,
    numTokensForCompletion: numTokensForCompletion,
    llmEndpointParams: llmEndpointParams,
  } satisfies AiAgentBasicGenTool;
}

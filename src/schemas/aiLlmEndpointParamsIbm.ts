import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiLlmEndpointParamsIbmTypeField = 'ibm_params';
export class AiLlmEndpointParamsIbm {
  /**
   * The type of the AI LLM endpoint params object for IBM.
   * This parameter is **required**. */
  readonly type: AiLlmEndpointParamsIbmTypeField =
    'ibm_params' as AiLlmEndpointParamsIbmTypeField;
  /**
   * What sampling temperature to use, between 0 and 1. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or `top_p` but not both. */
  readonly temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results
   * of the tokens with `top_p` probability mass. So 0.1 means only the tokens comprising the top 10% probability
   * mass are considered. We generally recommend altering this or temperature but not both. */
  readonly topP?: number | null;
  /**
   * `Top-K` changes how the model selects tokens for output. A low `top-K` means the next selected token is
   * the most probable among all tokens in the model's vocabulary (also called greedy decoding),
   * while a high `top-K` means that the next token is selected from among the three most probable tokens by using temperature. */
  readonly topK?: number | null;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiLlmEndpointParamsIbm, 'type'> &
      Partial<Pick<AiLlmEndpointParamsIbm, 'type'>>,
  ) {
    if (fields.type !== undefined) {
      this.type = fields.type;
    }
    if (fields.temperature !== undefined) {
      this.temperature = fields.temperature;
    }
    if (fields.topP !== undefined) {
      this.topP = fields.topP;
    }
    if (fields.topK !== undefined) {
      this.topK = fields.topK;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiLlmEndpointParamsIbmInput {
  /**
   * The type of the AI LLM endpoint params object for IBM.
   * This parameter is **required**. */
  readonly type?: AiLlmEndpointParamsIbmTypeField;
  /**
   * What sampling temperature to use, between 0 and 1. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   * We generally recommend altering this or `top_p` but not both. */
  readonly temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results
   * of the tokens with `top_p` probability mass. So 0.1 means only the tokens comprising the top 10% probability
   * mass are considered. We generally recommend altering this or temperature but not both. */
  readonly topP?: number | null;
  /**
   * `Top-K` changes how the model selects tokens for output. A low `top-K` means the next selected token is
   * the most probable among all tokens in the model's vocabulary (also called greedy decoding),
   * while a high `top-K` means that the next token is selected from among the three most probable tokens by using temperature. */
  readonly topK?: number | null;
  readonly rawData?: SerializedData;
}
export function serializeAiLlmEndpointParamsIbmTypeField(
  val: AiLlmEndpointParamsIbmTypeField,
): SerializedData {
  return val;
}
export function deserializeAiLlmEndpointParamsIbmTypeField(
  val: SerializedData,
): AiLlmEndpointParamsIbmTypeField {
  if (val == 'ibm_params') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiLlmEndpointParamsIbmTypeField",
  });
}
export function serializeAiLlmEndpointParamsIbm(
  val: AiLlmEndpointParamsIbm,
): SerializedData {
  return {
    ['type']: serializeAiLlmEndpointParamsIbmTypeField(val.type),
    ['temperature']: val.temperature,
    ['top_p']: val.topP,
    ['top_k']: val.topK,
  };
}
export function deserializeAiLlmEndpointParamsIbm(
  val: SerializedData,
): AiLlmEndpointParamsIbm {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiLlmEndpointParamsIbm"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "AiLlmEndpointParamsIbm" to be defined',
    });
  }
  const type: AiLlmEndpointParamsIbmTypeField =
    deserializeAiLlmEndpointParamsIbmTypeField(val.type);
  if (!(val.temperature == void 0) && !sdIsNumber(val.temperature)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "temperature" of type "AiLlmEndpointParamsIbm"',
    });
  }
  const temperature: undefined | number =
    val.temperature == void 0 ? void 0 : val.temperature;
  if (!(val.top_p == void 0) && !sdIsNumber(val.top_p)) {
    throw new BoxSdkError({
      message: 'Expecting number for "top_p" of type "AiLlmEndpointParamsIbm"',
    });
  }
  const topP: undefined | number = val.top_p == void 0 ? void 0 : val.top_p;
  if (!(val.top_k == void 0) && !sdIsNumber(val.top_k)) {
    throw new BoxSdkError({
      message: 'Expecting number for "top_k" of type "AiLlmEndpointParamsIbm"',
    });
  }
  const topK: undefined | number = val.top_k == void 0 ? void 0 : val.top_k;
  return {
    type: type,
    temperature: temperature,
    topP: topP,
    topK: topK,
  } satisfies AiLlmEndpointParamsIbm;
}
export function serializeAiLlmEndpointParamsIbmInput(
  val: AiLlmEndpointParamsIbmInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiLlmEndpointParamsIbmTypeField(val.type),
    ['temperature']: val.temperature,
    ['top_p']: val.topP,
    ['top_k']: val.topK,
  };
}
export function deserializeAiLlmEndpointParamsIbmInput(
  val: SerializedData,
): AiLlmEndpointParamsIbmInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiLlmEndpointParamsIbmInput"',
    });
  }
  const type: undefined | AiLlmEndpointParamsIbmTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiLlmEndpointParamsIbmTypeField(val.type);
  if (!(val.temperature == void 0) && !sdIsNumber(val.temperature)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "temperature" of type "AiLlmEndpointParamsIbmInput"',
    });
  }
  const temperature: undefined | number =
    val.temperature == void 0 ? void 0 : val.temperature;
  if (!(val.top_p == void 0) && !sdIsNumber(val.top_p)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "top_p" of type "AiLlmEndpointParamsIbmInput"',
    });
  }
  const topP: undefined | number = val.top_p == void 0 ? void 0 : val.top_p;
  if (!(val.top_k == void 0) && !sdIsNumber(val.top_k)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "top_k" of type "AiLlmEndpointParamsIbmInput"',
    });
  }
  const topK: undefined | number = val.top_k == void 0 ? void 0 : val.top_k;
  return {
    type: type,
    temperature: temperature,
    topP: topP,
    topK: topK,
  } satisfies AiLlmEndpointParamsIbmInput;
}

import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiLlmEndpointParamsGoogleTypeField = 'google_params';
export class AiLlmEndpointParamsGoogle {
  /**
   * The type of the AI LLM endpoint params object for Google.
   * This parameter is **required**. */
  readonly type: AiLlmEndpointParamsGoogleTypeField =
    'google_params' as AiLlmEndpointParamsGoogleTypeField;
  /**
   * The temperature is used for sampling during response generation, which occurs when `top-P` and `top-K` are applied. Temperature controls the degree of randomness in the token selection. */
  readonly temperature?: number | null;
  /**
   * `Top-P` changes how the model selects tokens for output. Tokens are selected from the most (see `top-K`) to least probable until the sum of their probabilities equals the `top-P` value. */
  readonly topP?: number | null;
  /**
   * `Top-K` changes how the model selects tokens for output. A low `top-K` means the next selected token is
   * the most probable among all tokens in the model's vocabulary (also called greedy decoding),
   * while a high `top-K` means that the next token is selected from among the three most probable tokens by using temperature. */
  readonly topK?: number | null;
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiLlmEndpointParamsGoogle, 'type'> &
      Partial<Pick<AiLlmEndpointParamsGoogle, 'type'>>,
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
export interface AiLlmEndpointParamsGoogleInput {
  /**
   * The type of the AI LLM endpoint params object for Google.
   * This parameter is **required**. */
  readonly type?: AiLlmEndpointParamsGoogleTypeField;
  /**
   * The temperature is used for sampling during response generation, which occurs when `top-P` and `top-K` are applied. Temperature controls the degree of randomness in the token selection. */
  readonly temperature?: number | null;
  /**
   * `Top-P` changes how the model selects tokens for output. Tokens are selected from the most (see `top-K`) to least probable until the sum of their probabilities equals the `top-P` value. */
  readonly topP?: number | null;
  /**
   * `Top-K` changes how the model selects tokens for output. A low `top-K` means the next selected token is
   * the most probable among all tokens in the model's vocabulary (also called greedy decoding),
   * while a high `top-K` means that the next token is selected from among the three most probable tokens by using temperature. */
  readonly topK?: number | null;
  readonly rawData?: SerializedData;
}
export function serializeAiLlmEndpointParamsGoogleTypeField(
  val: AiLlmEndpointParamsGoogleTypeField,
): SerializedData {
  return val;
}
export function deserializeAiLlmEndpointParamsGoogleTypeField(
  val: SerializedData,
): AiLlmEndpointParamsGoogleTypeField {
  if (val == 'google_params') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiLlmEndpointParamsGoogleTypeField",
  });
}
export function serializeAiLlmEndpointParamsGoogle(
  val: AiLlmEndpointParamsGoogle,
): SerializedData {
  return {
    ['type']: serializeAiLlmEndpointParamsGoogleTypeField(val.type),
    ['temperature']: val.temperature,
    ['top_p']: val.topP,
    ['top_k']: val.topK,
  };
}
export function deserializeAiLlmEndpointParamsGoogle(
  val: SerializedData,
): AiLlmEndpointParamsGoogle {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiLlmEndpointParamsGoogle"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "AiLlmEndpointParamsGoogle" to be defined',
    });
  }
  const type: AiLlmEndpointParamsGoogleTypeField =
    deserializeAiLlmEndpointParamsGoogleTypeField(val.type);
  if (!(val.temperature == void 0) && !sdIsNumber(val.temperature)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "temperature" of type "AiLlmEndpointParamsGoogle"',
    });
  }
  const temperature: undefined | number =
    val.temperature == void 0 ? void 0 : val.temperature;
  if (!(val.top_p == void 0) && !sdIsNumber(val.top_p)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "top_p" of type "AiLlmEndpointParamsGoogle"',
    });
  }
  const topP: undefined | number = val.top_p == void 0 ? void 0 : val.top_p;
  if (!(val.top_k == void 0) && !sdIsNumber(val.top_k)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "top_k" of type "AiLlmEndpointParamsGoogle"',
    });
  }
  const topK: undefined | number = val.top_k == void 0 ? void 0 : val.top_k;
  return {
    type: type,
    temperature: temperature,
    topP: topP,
    topK: topK,
  } satisfies AiLlmEndpointParamsGoogle;
}
export function serializeAiLlmEndpointParamsGoogleInput(
  val: AiLlmEndpointParamsGoogleInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiLlmEndpointParamsGoogleTypeField(val.type),
    ['temperature']: val.temperature,
    ['top_p']: val.topP,
    ['top_k']: val.topK,
  };
}
export function deserializeAiLlmEndpointParamsGoogleInput(
  val: SerializedData,
): AiLlmEndpointParamsGoogleInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiLlmEndpointParamsGoogleInput"',
    });
  }
  const type: undefined | AiLlmEndpointParamsGoogleTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiLlmEndpointParamsGoogleTypeField(val.type);
  if (!(val.temperature == void 0) && !sdIsNumber(val.temperature)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "temperature" of type "AiLlmEndpointParamsGoogleInput"',
    });
  }
  const temperature: undefined | number =
    val.temperature == void 0 ? void 0 : val.temperature;
  if (!(val.top_p == void 0) && !sdIsNumber(val.top_p)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "top_p" of type "AiLlmEndpointParamsGoogleInput"',
    });
  }
  const topP: undefined | number = val.top_p == void 0 ? void 0 : val.top_p;
  if (!(val.top_k == void 0) && !sdIsNumber(val.top_k)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "top_k" of type "AiLlmEndpointParamsGoogleInput"',
    });
  }
  const topK: undefined | number = val.top_k == void 0 ? void 0 : val.top_k;
  return {
    type: type,
    temperature: temperature,
    topP: topP,
    topK: topK,
  } satisfies AiLlmEndpointParamsGoogleInput;
}

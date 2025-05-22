import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiLlmEndpointParamsAwsTypeField = 'aws_params';
export class AiLlmEndpointParamsAws {
  /**
   * The type of the AI LLM endpoint params object for AWS.
   * This parameter is **required**. */
  readonly type: AiLlmEndpointParamsAwsTypeField =
    'aws_params' as AiLlmEndpointParamsAwsTypeField;
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
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<AiLlmEndpointParamsAws, 'type'> &
      Partial<Pick<AiLlmEndpointParamsAws, 'type'>>,
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
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface AiLlmEndpointParamsAwsInput {
  /**
   * The type of the AI LLM endpoint params object for AWS.
   * This parameter is **required**. */
  readonly type?: AiLlmEndpointParamsAwsTypeField;
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
  readonly rawData?: SerializedData;
}
export function serializeAiLlmEndpointParamsAwsTypeField(
  val: AiLlmEndpointParamsAwsTypeField,
): SerializedData {
  return val;
}
export function deserializeAiLlmEndpointParamsAwsTypeField(
  val: SerializedData,
): AiLlmEndpointParamsAwsTypeField {
  if (val == 'aws_params') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize AiLlmEndpointParamsAwsTypeField",
  });
}
export function serializeAiLlmEndpointParamsAws(
  val: AiLlmEndpointParamsAws,
): SerializedData {
  return {
    ['type']: serializeAiLlmEndpointParamsAwsTypeField(val.type),
    ['temperature']: val.temperature,
    ['top_p']: val.topP,
  };
}
export function deserializeAiLlmEndpointParamsAws(
  val: SerializedData,
): AiLlmEndpointParamsAws {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiLlmEndpointParamsAws"',
    });
  }
  if (val.type == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "type" of type "AiLlmEndpointParamsAws" to be defined',
    });
  }
  const type: AiLlmEndpointParamsAwsTypeField =
    deserializeAiLlmEndpointParamsAwsTypeField(val.type);
  if (!(val.temperature == void 0) && !sdIsNumber(val.temperature)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "temperature" of type "AiLlmEndpointParamsAws"',
    });
  }
  const temperature: undefined | number =
    val.temperature == void 0 ? void 0 : val.temperature;
  if (!(val.top_p == void 0) && !sdIsNumber(val.top_p)) {
    throw new BoxSdkError({
      message: 'Expecting number for "top_p" of type "AiLlmEndpointParamsAws"',
    });
  }
  const topP: undefined | number = val.top_p == void 0 ? void 0 : val.top_p;
  return {
    type: type,
    temperature: temperature,
    topP: topP,
  } satisfies AiLlmEndpointParamsAws;
}
export function serializeAiLlmEndpointParamsAwsInput(
  val: AiLlmEndpointParamsAwsInput,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeAiLlmEndpointParamsAwsTypeField(val.type),
    ['temperature']: val.temperature,
    ['top_p']: val.topP,
  };
}
export function deserializeAiLlmEndpointParamsAwsInput(
  val: SerializedData,
): AiLlmEndpointParamsAwsInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiLlmEndpointParamsAwsInput"',
    });
  }
  const type: undefined | AiLlmEndpointParamsAwsTypeField =
    val.type == void 0
      ? void 0
      : deserializeAiLlmEndpointParamsAwsTypeField(val.type);
  if (!(val.temperature == void 0) && !sdIsNumber(val.temperature)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "temperature" of type "AiLlmEndpointParamsAwsInput"',
    });
  }
  const temperature: undefined | number =
    val.temperature == void 0 ? void 0 : val.temperature;
  if (!(val.top_p == void 0) && !sdIsNumber(val.top_p)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "top_p" of type "AiLlmEndpointParamsAwsInput"',
    });
  }
  const topP: undefined | number = val.top_p == void 0 ? void 0 : val.top_p;
  return {
    type: type,
    temperature: temperature,
    topP: topP,
  } satisfies AiLlmEndpointParamsAwsInput;
}

import { serializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { deserializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { serializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { deserializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { serializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { deserializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi =

    | AiLlmEndpointParamsAws
    | AiLlmEndpointParamsGoogle
    | AiLlmEndpointParamsOpenAi;
export function serializeAiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi(
  val: any,
): SerializedData {
  if (val.type == 'aws_params') {
    return serializeAiLlmEndpointParamsAws(val);
  }
  if (val.type == 'google_params') {
    return serializeAiLlmEndpointParamsGoogle(val);
  }
  if (val.type == 'openai_params') {
    return serializeAiLlmEndpointParamsOpenAi(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi(
  val: SerializedData,
): AiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "AiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi"',
    });
  }
  if (val.type == 'aws_params') {
    return deserializeAiLlmEndpointParamsAws(val);
  }
  if (val.type == 'google_params') {
    return deserializeAiLlmEndpointParamsGoogle(val);
  }
  if (val.type == 'openai_params') {
    return deserializeAiLlmEndpointParamsOpenAi(val);
  }
  throw new BoxSdkError({
    message:
      "Can't deserialize AiLlmEndpointParamsAwsOrAiLlmEndpointParamsGoogleOrAiLlmEndpointParamsOpenAi",
  });
}

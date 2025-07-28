import { serializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { deserializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { serializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { deserializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { serializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { deserializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { serializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.generated.js';
import { deserializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.generated.js';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.generated.js';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.generated.js';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.generated.js';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type AiLlmEndpointParams =
  | AiLlmEndpointParamsOpenAi
  | AiLlmEndpointParamsGoogle
  | AiLlmEndpointParamsAws
  | AiLlmEndpointParamsIbm;
export function serializeAiLlmEndpointParams(val: any): SerializedData {
  if (val.type == 'openai_params') {
    return serializeAiLlmEndpointParamsOpenAi(val);
  }
  if (val.type == 'google_params') {
    return serializeAiLlmEndpointParamsGoogle(val);
  }
  if (val.type == 'aws_params') {
    return serializeAiLlmEndpointParamsAws(val);
  }
  if (val.type == 'ibm_params') {
    return serializeAiLlmEndpointParamsIbm(val);
  }
  throw new BoxSdkError({ message: 'unknown type' });
}
export function deserializeAiLlmEndpointParams(
  val: SerializedData,
): AiLlmEndpointParams {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiLlmEndpointParams"',
    });
  }
  if (val.type == 'openai_params') {
    return deserializeAiLlmEndpointParamsOpenAi(val);
  }
  if (val.type == 'google_params') {
    return deserializeAiLlmEndpointParamsGoogle(val);
  }
  if (val.type == 'aws_params') {
    return deserializeAiLlmEndpointParamsAws(val);
  }
  if (val.type == 'ibm_params') {
    return deserializeAiLlmEndpointParamsIbm(val);
  }
  throw new BoxSdkError({ message: "Can't deserialize AiLlmEndpointParams" });
}

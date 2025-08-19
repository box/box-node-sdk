import { serializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.js';
import { deserializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.js';
import { serializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.js';
import { deserializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.js';
import { serializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.js';
import { deserializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.js';
import { serializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.js';
import { deserializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.js';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi.js';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle.js';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws.js';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm.js';
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

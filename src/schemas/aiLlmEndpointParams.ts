import { serializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { deserializeAiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { serializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { deserializeAiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { serializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { deserializeAiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { serializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { deserializeAiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { AiLlmEndpointParamsOpenAi } from './aiLlmEndpointParamsOpenAi';
import { AiLlmEndpointParamsGoogle } from './aiLlmEndpointParamsGoogle';
import { AiLlmEndpointParamsAws } from './aiLlmEndpointParamsAws';
import { AiLlmEndpointParamsIbm } from './aiLlmEndpointParamsIbm';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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

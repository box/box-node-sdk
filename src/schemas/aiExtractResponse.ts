import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface AiExtractResponse {
  readonly rawData?: SerializedData;
}
export function serializeAiExtractResponse(
  val: AiExtractResponse,
): SerializedData {
  return {};
}
export function deserializeAiExtractResponse(
  val: SerializedData,
): AiExtractResponse {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AiExtractResponse"',
    });
  }
  return {} satisfies AiExtractResponse;
}

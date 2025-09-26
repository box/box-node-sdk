import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
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

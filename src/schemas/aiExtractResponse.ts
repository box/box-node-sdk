import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type AiExtractResponse = {
  readonly [key: string]: any;
};
export function serializeAiExtractResponse(
  val: AiExtractResponse,
): SerializedData {
  return Object.fromEntries(
    Object.entries(val).map(([k, v]: [string, any]) => [
      k,
      (function (v: any): any {
        return v;
      })(v),
    ]),
  ) as {
    readonly [key: string]: any;
  };
}
export function deserializeAiExtractResponse(
  val: SerializedData,
): AiExtractResponse {
  return sdIsMap(val)
    ? (Object.fromEntries(
        Object.entries(val).map(([k, v]: [string, any]) => [
          k,
          (function (v: any): any {
            return v;
          })(v),
        ]),
      ) as {
        readonly [key: string]: any;
      })
    : {};
}

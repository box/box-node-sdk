import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export interface SignRequestCancelRequest {
  /**
   * An optional reason for cancelling the sign request. */
  readonly reason?: string;
  readonly rawData?: SerializedData;
}
export function serializeSignRequestCancelRequest(
  val: SignRequestCancelRequest,
): SerializedData {
  return { ['reason']: val.reason };
}
export function deserializeSignRequestCancelRequest(
  val: SerializedData,
): SignRequestCancelRequest {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "SignRequestCancelRequest"',
    });
  }
  if (!(val.reason == void 0) && !sdIsString(val.reason)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "reason" of type "SignRequestCancelRequest"',
    });
  }
  const reason: undefined | string = val.reason == void 0 ? void 0 : val.reason;
  return { reason: reason } satisfies SignRequestCancelRequest;
}

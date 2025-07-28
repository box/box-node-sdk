import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface MetadataError {
  /**
   * A Box-specific error code. */
  readonly code?: string;
  /**
   * A short message describing the error. */
  readonly message?: string;
  /**
   * A unique identifier for this response, which can be used
   * when contacting Box support. */
  readonly requestId?: string;
  readonly rawData?: SerializedData;
}
export function serializeMetadataError(val: MetadataError): SerializedData {
  return {
    ['code']: val.code,
    ['message']: val.message,
    ['request_id']: val.requestId,
  };
}
export function deserializeMetadataError(val: SerializedData): MetadataError {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "MetadataError"' });
  }
  if (!(val.code == void 0) && !sdIsString(val.code)) {
    throw new BoxSdkError({
      message: 'Expecting string for "code" of type "MetadataError"',
    });
  }
  const code: undefined | string = val.code == void 0 ? void 0 : val.code;
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "message" of type "MetadataError"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  if (!(val.request_id == void 0) && !sdIsString(val.request_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "request_id" of type "MetadataError"',
    });
  }
  const requestId: undefined | string =
    val.request_id == void 0 ? void 0 : val.request_id;
  return {
    code: code,
    message: message,
    requestId: requestId,
  } satisfies MetadataError;
}

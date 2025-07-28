import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export type ClientErrorTypeField = 'error';
export type ClientErrorCodeField =
  | 'created'
  | 'accepted'
  | 'no_content'
  | 'redirect'
  | 'not_modified'
  | 'bad_request'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'method_not_allowed'
  | 'conflict'
  | 'precondition_failed'
  | 'too_many_requests'
  | 'internal_server_error'
  | 'unavailable'
  | 'item_name_invalid'
  | 'insufficient_scope'
  | string;
export interface ClientError {
  /**
   * The value will always be `error`. */
  readonly type?: ClientErrorTypeField;
  /**
   * The HTTP status of the response. */
  readonly status?: number;
  /**
   * A Box-specific error code. */
  readonly code?: ClientErrorCodeField;
  /**
   * A short message describing the error. */
  readonly message?: string;
  /**
   * A free-form object that contains additional context
   * about the error. The possible fields are defined on
   * a per-endpoint basis. `message` is only one example. */
  readonly contextInfo?: {
    readonly [key: string]: any;
  } | null;
  /**
   * A URL that links to more information about why this error occurred. */
  readonly helpUrl?: string;
  /**
   * A unique identifier for this response, which can be used
   * when contacting Box support. */
  readonly requestId?: string;
  readonly rawData?: SerializedData;
}
export function serializeClientErrorTypeField(
  val: ClientErrorTypeField,
): SerializedData {
  return val;
}
export function deserializeClientErrorTypeField(
  val: SerializedData,
): ClientErrorTypeField {
  if (val == 'error') {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize ClientErrorTypeField" });
}
export function serializeClientErrorCodeField(
  val: ClientErrorCodeField,
): SerializedData {
  return val;
}
export function deserializeClientErrorCodeField(
  val: SerializedData,
): ClientErrorCodeField {
  if (val == 'created') {
    return val;
  }
  if (val == 'accepted') {
    return val;
  }
  if (val == 'no_content') {
    return val;
  }
  if (val == 'redirect') {
    return val;
  }
  if (val == 'not_modified') {
    return val;
  }
  if (val == 'bad_request') {
    return val;
  }
  if (val == 'unauthorized') {
    return val;
  }
  if (val == 'forbidden') {
    return val;
  }
  if (val == 'not_found') {
    return val;
  }
  if (val == 'method_not_allowed') {
    return val;
  }
  if (val == 'conflict') {
    return val;
  }
  if (val == 'precondition_failed') {
    return val;
  }
  if (val == 'too_many_requests') {
    return val;
  }
  if (val == 'internal_server_error') {
    return val;
  }
  if (val == 'unavailable') {
    return val;
  }
  if (val == 'item_name_invalid') {
    return val;
  }
  if (val == 'insufficient_scope') {
    return val;
  }
  if (sdIsString(val)) {
    return val;
  }
  throw new BoxSdkError({ message: "Can't deserialize ClientErrorCodeField" });
}
export function serializeClientError(val: ClientError): SerializedData {
  return {
    ['type']:
      val.type == void 0 ? val.type : serializeClientErrorTypeField(val.type),
    ['status']: val.status,
    ['code']:
      val.code == void 0 ? val.code : serializeClientErrorCodeField(val.code),
    ['message']: val.message,
    ['context_info']:
      val.contextInfo == void 0
        ? val.contextInfo
        : (Object.fromEntries(
            Object.entries(val.contextInfo).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ]),
          ) as {
            readonly [key: string]: any;
          }),
    ['help_url']: val.helpUrl,
    ['request_id']: val.requestId,
  };
}
export function deserializeClientError(val: SerializedData): ClientError {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "ClientError"' });
  }
  const type: undefined | ClientErrorTypeField =
    val.type == void 0 ? void 0 : deserializeClientErrorTypeField(val.type);
  if (!(val.status == void 0) && !sdIsNumber(val.status)) {
    throw new BoxSdkError({
      message: 'Expecting number for "status" of type "ClientError"',
    });
  }
  const status: undefined | number = val.status == void 0 ? void 0 : val.status;
  const code: undefined | ClientErrorCodeField =
    val.code == void 0 ? void 0 : deserializeClientErrorCodeField(val.code);
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "message" of type "ClientError"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  if (!(val.context_info == void 0) && !sdIsMap(val.context_info)) {
    throw new BoxSdkError({
      message: 'Expecting object for "context_info" of type "ClientError"',
    });
  }
  const contextInfo:
    | undefined
    | {
        readonly [key: string]: any;
      } =
    val.context_info == void 0
      ? void 0
      : sdIsMap(val.context_info)
        ? (Object.fromEntries(
            Object.entries(val.context_info).map(([k, v]: [string, any]) => [
              k,
              (function (v: any): any {
                return v;
              })(v),
            ]),
          ) as {
            readonly [key: string]: any;
          })
        : {};
  if (!(val.help_url == void 0) && !sdIsString(val.help_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "help_url" of type "ClientError"',
    });
  }
  const helpUrl: undefined | string =
    val.help_url == void 0 ? void 0 : val.help_url;
  if (!(val.request_id == void 0) && !sdIsString(val.request_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "request_id" of type "ClientError"',
    });
  }
  const requestId: undefined | string =
    val.request_id == void 0 ? void 0 : val.request_id;
  return {
    type: type,
    status: status,
    code: code,
    message: message,
    contextInfo: contextInfo,
    helpUrl: helpUrl,
    requestId: requestId,
  } satisfies ClientError;
}

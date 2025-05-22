import { BoxSdkError } from '../../box/errors.js';
import { SerializedData } from '../../serialization/json.js';
import { sdIsEmpty } from '../../serialization/json.js';
import { sdIsBoolean } from '../../serialization/json.js';
import { sdIsNumber } from '../../serialization/json.js';
import { sdIsString } from '../../serialization/json.js';
import { sdIsList } from '../../serialization/json.js';
import { sdIsMap } from '../../serialization/json.js';
export type ClientErrorV2025R0TypeField = 'error';
export type ClientErrorV2025R0CodeField =
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
export interface ClientErrorV2025R0ContextInfoField {
  /**
   * More details on the error. */
  readonly message?: string;
  readonly rawData?: SerializedData;
}
export interface ClientErrorV2025R0 {
  /**
   * error */
  readonly type?: ClientErrorV2025R0TypeField;
  /**
   * The HTTP status of the response. */
  readonly status?: number;
  /**
   * A Box-specific error code */
  readonly code?: ClientErrorV2025R0CodeField;
  /**
   * A short message describing the error. */
  readonly message?: string;
  /**
   * A free-form object that contains additional context
   * about the error. The possible fields are defined on
   * a per-endpoint basis. `message` is only one example. */
  readonly contextInfo?: ClientErrorV2025R0ContextInfoField | null;
  /**
   * A URL that links to more information about why this error occurred. */
  readonly helpUrl?: string;
  /**
   * A unique identifier for this response, which can be used
   * when contacting Box support. */
  readonly requestId?: string;
  readonly rawData?: SerializedData;
}
export function serializeClientErrorV2025R0TypeField(
  val: ClientErrorV2025R0TypeField,
): SerializedData {
  return val;
}
export function deserializeClientErrorV2025R0TypeField(
  val: SerializedData,
): ClientErrorV2025R0TypeField {
  if (val == 'error') {
    return val;
  }
  throw new BoxSdkError({
    message: "Can't deserialize ClientErrorV2025R0TypeField",
  });
}
export function serializeClientErrorV2025R0CodeField(
  val: ClientErrorV2025R0CodeField,
): SerializedData {
  return val;
}
export function deserializeClientErrorV2025R0CodeField(
  val: SerializedData,
): ClientErrorV2025R0CodeField {
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
  throw new BoxSdkError({
    message: "Can't deserialize ClientErrorV2025R0CodeField",
  });
}
export function serializeClientErrorV2025R0ContextInfoField(
  val: ClientErrorV2025R0ContextInfoField,
): SerializedData {
  return { ['message']: val.message };
}
export function deserializeClientErrorV2025R0ContextInfoField(
  val: SerializedData,
): ClientErrorV2025R0ContextInfoField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ClientErrorV2025R0ContextInfoField"',
    });
  }
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "message" of type "ClientErrorV2025R0ContextInfoField"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  return { message: message } satisfies ClientErrorV2025R0ContextInfoField;
}
export function serializeClientErrorV2025R0(
  val: ClientErrorV2025R0,
): SerializedData {
  return {
    ['type']:
      val.type == void 0
        ? val.type
        : serializeClientErrorV2025R0TypeField(val.type),
    ['status']: val.status,
    ['code']:
      val.code == void 0
        ? val.code
        : serializeClientErrorV2025R0CodeField(val.code),
    ['message']: val.message,
    ['context_info']:
      val.contextInfo == void 0
        ? val.contextInfo
        : serializeClientErrorV2025R0ContextInfoField(val.contextInfo),
    ['help_url']: val.helpUrl,
    ['request_id']: val.requestId,
  };
}
export function deserializeClientErrorV2025R0(
  val: SerializedData,
): ClientErrorV2025R0 {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "ClientErrorV2025R0"',
    });
  }
  const type: undefined | ClientErrorV2025R0TypeField =
    val.type == void 0
      ? void 0
      : deserializeClientErrorV2025R0TypeField(val.type);
  if (!(val.status == void 0) && !sdIsNumber(val.status)) {
    throw new BoxSdkError({
      message: 'Expecting number for "status" of type "ClientErrorV2025R0"',
    });
  }
  const status: undefined | number = val.status == void 0 ? void 0 : val.status;
  const code: undefined | ClientErrorV2025R0CodeField =
    val.code == void 0
      ? void 0
      : deserializeClientErrorV2025R0CodeField(val.code);
  if (!(val.message == void 0) && !sdIsString(val.message)) {
    throw new BoxSdkError({
      message: 'Expecting string for "message" of type "ClientErrorV2025R0"',
    });
  }
  const message: undefined | string =
    val.message == void 0 ? void 0 : val.message;
  const contextInfo: undefined | ClientErrorV2025R0ContextInfoField =
    val.context_info == void 0
      ? void 0
      : deserializeClientErrorV2025R0ContextInfoField(val.context_info);
  if (!(val.help_url == void 0) && !sdIsString(val.help_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "help_url" of type "ClientErrorV2025R0"',
    });
  }
  const helpUrl: undefined | string =
    val.help_url == void 0 ? void 0 : val.help_url;
  if (!(val.request_id == void 0) && !sdIsString(val.request_id)) {
    throw new BoxSdkError({
      message: 'Expecting string for "request_id" of type "ClientErrorV2025R0"',
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
  } satisfies ClientErrorV2025R0;
}

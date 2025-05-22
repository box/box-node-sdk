import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface RealtimeServer {
  /**
   * `realtime_server` */
  readonly type?: string;
  /**
   * The URL for the server. */
  readonly url?: string;
  /**
   * The time in minutes for which this server is available */
  readonly ttl?: string;
  /**
   * The maximum number of retries this server will
   * allow before a new long poll should be started by
   * getting a [new list of server](#options-events). */
  readonly maxRetries?: string;
  /**
   * The maximum number of seconds without a response
   * after which you should retry the long poll connection.
   *
   * This helps to overcome network issues where the long
   * poll looks to be working but no packages are coming
   * through. */
  readonly retryTimeout?: number;
  readonly rawData?: SerializedData;
}
export function serializeRealtimeServer(val: RealtimeServer): SerializedData {
  return {
    ['type']: val.type,
    ['url']: val.url,
    ['ttl']: val.ttl,
    ['max_retries']: val.maxRetries,
    ['retry_timeout']: val.retryTimeout,
  };
}
export function deserializeRealtimeServer(val: SerializedData): RealtimeServer {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "RealtimeServer"' });
  }
  if (!(val.type == void 0) && !sdIsString(val.type)) {
    throw new BoxSdkError({
      message: 'Expecting string for "type" of type "RealtimeServer"',
    });
  }
  const type: undefined | string = val.type == void 0 ? void 0 : val.type;
  if (!(val.url == void 0) && !sdIsString(val.url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "url" of type "RealtimeServer"',
    });
  }
  const url: undefined | string = val.url == void 0 ? void 0 : val.url;
  if (!(val.ttl == void 0) && !sdIsString(val.ttl)) {
    throw new BoxSdkError({
      message: 'Expecting string for "ttl" of type "RealtimeServer"',
    });
  }
  const ttl: undefined | string = val.ttl == void 0 ? void 0 : val.ttl;
  if (!(val.max_retries == void 0) && !sdIsString(val.max_retries)) {
    throw new BoxSdkError({
      message: 'Expecting string for "max_retries" of type "RealtimeServer"',
    });
  }
  const maxRetries: undefined | string =
    val.max_retries == void 0 ? void 0 : val.max_retries;
  if (!(val.retry_timeout == void 0) && !sdIsNumber(val.retry_timeout)) {
    throw new BoxSdkError({
      message: 'Expecting number for "retry_timeout" of type "RealtimeServer"',
    });
  }
  const retryTimeout: undefined | number =
    val.retry_timeout == void 0 ? void 0 : val.retry_timeout;
  return {
    type: type,
    url: url,
    ttl: ttl,
    maxRetries: maxRetries,
    retryTimeout: retryTimeout,
  } satisfies RealtimeServer;
}

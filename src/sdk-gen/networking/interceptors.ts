import { FetchOptions } from './fetchOptions.js';
import { FetchResponse } from './fetchResponse.js';
export interface Interceptor {
  /**
   * @param {FetchOptions} options
   * @returns {FetchOptions}
   */
  beforeRequest(options: FetchOptions): FetchOptions;
  /**
   * @param {FetchResponse} response
   * @returns {FetchResponse}
   */
  afterRequest(response: FetchResponse): FetchResponse;
}

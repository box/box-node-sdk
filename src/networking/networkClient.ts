import { FetchOptionsInput } from './fetchOptions.js';
import { FetchOptions } from './fetchOptions.js';
import { FetchResponse } from './fetchResponse.js';
export interface NetworkClient {
  /**
   * @param {FetchOptionsInput} optionsInput
   * @returns {Promise<FetchResponse>}
   */
  fetch(optionsInput: FetchOptionsInput): Promise<FetchResponse>;
}

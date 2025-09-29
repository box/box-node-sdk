import { FetchOptionsInput } from './fetchOptions';
import { FetchOptions } from './fetchOptions';
import { FetchResponse } from './fetchResponse';
export interface NetworkClient {
  /**
   * @param {FetchOptionsInput} optionsInput
   * @returns {Promise<FetchResponse>}
   */
  fetch(optionsInput: FetchOptionsInput): Promise<FetchResponse>;
}

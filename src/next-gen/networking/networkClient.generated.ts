import { FetchOptionsInput } from './fetchOptions.generated.js';
import { FetchOptions } from './fetchOptions.generated.js';
import { FetchResponse } from './fetchResponse.generated.js';
export interface NetworkClient {
  /**
   * @param {FetchOptionsInput} optionsInput
   * @returns {Promise<FetchResponse>}
   */
  fetch(optionsInput: FetchOptionsInput): Promise<FetchResponse>;
}

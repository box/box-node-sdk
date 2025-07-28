import { FetchOptions } from './fetchOptions.generated.js';
import { FetchResponse } from './fetchResponse.generated.js';
import { random } from '../internal/utils.js';
export interface RetryStrategy {
  /**
   * @param {FetchOptions} fetchOptions
   * @param {FetchResponse} fetchResponse
   * @param {number} attemptNumber
   * @returns {Promise<boolean>}
   */
  shouldRetry(
    fetchOptions: FetchOptions,
    fetchResponse: FetchResponse,
    attemptNumber: number,
  ): Promise<boolean>;
  /**
   * @param {FetchOptions} fetchOptions
   * @param {FetchResponse} fetchResponse
   * @param {number} attemptNumber
   * @returns {number}
   */
  retryAfter(
    fetchOptions: FetchOptions,
    fetchResponse: FetchResponse,
    attemptNumber: number,
  ): number;
}
export class BoxRetryStrategy implements RetryStrategy {
  readonly maxAttempts: number = 5;
  readonly retryRandomizationFactor: number = 0.5;
  readonly retryBaseInterval: number = 1;
  readonly maxRetriesOnException: number = 2;
  constructor(
    fields: Omit<
      BoxRetryStrategy,
      | 'maxAttempts'
      | 'retryRandomizationFactor'
      | 'retryBaseInterval'
      | 'maxRetriesOnException'
      | 'shouldRetry'
      | 'retryAfter'
    > &
      Partial<
        Pick<
          BoxRetryStrategy,
          | 'maxAttempts'
          | 'retryRandomizationFactor'
          | 'retryBaseInterval'
          | 'maxRetriesOnException'
        >
      >,
  ) {
    if (fields.maxAttempts !== undefined) {
      this.maxAttempts = fields.maxAttempts;
    }
    if (fields.retryRandomizationFactor !== undefined) {
      this.retryRandomizationFactor = fields.retryRandomizationFactor;
    }
    if (fields.retryBaseInterval !== undefined) {
      this.retryBaseInterval = fields.retryBaseInterval;
    }
    if (fields.maxRetriesOnException !== undefined) {
      this.maxRetriesOnException = fields.maxRetriesOnException;
    }
  }
  /**
   * @param {FetchOptions} fetchOptions
   * @param {FetchResponse} fetchResponse
   * @param {number} attemptNumber
   * @returns {Promise<boolean>}
   */
  async shouldRetry(
    fetchOptions: FetchOptions,
    fetchResponse: FetchResponse,
    attemptNumber: number,
  ): Promise<boolean> {
    if (fetchResponse.status == 0) {
      return attemptNumber <= this.maxRetriesOnException;
    }
    const isSuccessful: boolean =
      fetchResponse.status >= 200 && fetchResponse.status < 400;
    const retryAfterHeader: string = fetchResponse.headers['Retry-After'];
    const isAcceptedWithRetryAfter: boolean =
      fetchResponse.status == 202 && !(retryAfterHeader == void 0);
    if (attemptNumber >= this.maxAttempts) {
      return false;
    }
    if (isAcceptedWithRetryAfter) {
      return true;
    }
    if (fetchResponse.status >= 500) {
      return true;
    }
    if (fetchResponse.status == 429) {
      return true;
    }
    if (fetchResponse.status == 401 && !(fetchOptions.auth == void 0)) {
      await fetchOptions.auth.refreshToken(fetchOptions.networkSession);
      return true;
    }
    if (isSuccessful) {
      return false;
    }
    return false;
  }
  /**
   * @param {FetchOptions} fetchOptions
   * @param {FetchResponse} fetchResponse
   * @param {number} attemptNumber
   * @returns {number}
   */
  retryAfter(
    fetchOptions: FetchOptions,
    fetchResponse: FetchResponse,
    attemptNumber: number,
  ): number {
    const retryAfterHeader: string = fetchResponse.headers['Retry-After'];
    if (!(retryAfterHeader == void 0)) {
      return parseFloat(retryAfterHeader) as number;
    }
    const randomization: number = random(
      1 - this.retryRandomizationFactor,
      1 + this.retryRandomizationFactor,
    );
    const exponential: number = 2 ** attemptNumber;
    return exponential * this.retryBaseInterval * randomization;
  }
}

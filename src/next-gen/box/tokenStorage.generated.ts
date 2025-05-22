import { AccessToken } from '../schemas/accessToken.generated.js';
export interface TokenStorage {
  /**
   * @param {AccessToken} token
   * @returns {Promise<undefined>}
   */
  store(token: AccessToken): Promise<undefined>;
  /**
   * @returns {Promise<undefined | AccessToken>}
   */
  get(): Promise<undefined | AccessToken>;
  /**
   * @returns {Promise<undefined>}
   */
  clear(): Promise<undefined>;
}
export class InMemoryTokenStorage implements TokenStorage {
  token?: AccessToken = void 0;
  constructor(
    fields: Omit<InMemoryTokenStorage, 'token' | 'store' | 'get' | 'clear'> &
      Partial<Pick<InMemoryTokenStorage, 'token'>>,
  ) {
    if (fields.token !== undefined) {
      this.token = fields.token;
    }
  }
  /**
   * @param {AccessToken} token
   * @returns {Promise<undefined>}
   */
  async store(token: AccessToken): Promise<undefined> {
    this.token = token;
    return void 0;
  }
  /**
   * @returns {Promise<undefined | AccessToken>}
   */
  async get(): Promise<undefined | AccessToken> {
    return this.token;
  }
  /**
   * @returns {Promise<undefined>}
   */
  async clear(): Promise<undefined> {
    this.token = void 0;
    return void 0;
  }
}
